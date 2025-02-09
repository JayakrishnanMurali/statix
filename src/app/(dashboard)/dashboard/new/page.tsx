"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function NewWebsitePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create website
      const { error } = await supabase.from("websites").insert({
        user_id: user.id,
        name,
        subdomain,
        config: {
          title: name,
        },
      });

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Create New Website</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Website Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium">
              Subdomain
            </label>
            <div className="mt-1 flex rounded-md">
              <input
                id="subdomain"
                type="text"
                required
                className="block w-full rounded-l-md border px-3 py-2"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 px-3 text-gray-500">
                .statix.com
              </span>
            </div>
          </div>
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
    </div>
  );
}
