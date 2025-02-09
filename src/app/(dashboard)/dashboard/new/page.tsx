"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getUser } from "@/server/actions/auth";
import { createWebsite } from "@/server/actions/websites";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Website name is required"),
  subdomain: z
    .string()
    .min(1, "Subdomain is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens are allowed",
    )
    .min(3, "Subdomain must be at least 3 characters"),
});

export default function NewWebsitePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subdomain: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const userResult = await getUser();
      if (!userResult.success) {
        throw new Error(userResult.error);
      }
      const user = userResult.data;
      if (!user) throw new Error("Not authenticated");

      const websiteResult = await createWebsite({
        name: values.name,
        subdomain: values.subdomain,
        config: {
          title: values.name,
        },
        userId: user.id,
      });

      if (!websiteResult.success) {
        throw new Error(websiteResult.error);
      }

      const website = websiteResult.data;
      if (!website) throw new Error("Failed to create website");

      router.push(`/dashboard/${website.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Create New Website</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subdomain</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input {...field} className="rounded-r-none" />
                      <div className="ml-0.5 inline-flex items-center rounded-r-md border border-l-0 bg-muted px-3 text-muted-foreground">
                        .statix.com
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Website"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
