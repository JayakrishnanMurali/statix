"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { type Website } from "@/lib/types";

export default function DashboardPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      const supabase = createClient();
      const { data: websites, error } = await supabase
        .from("websites")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && websites) {
        setWebsites(websites);
      }
      setLoading(false);
    };

    void fetchWebsites();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Websites</h1>
        <Link href="/dashboard/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Website
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : websites.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-semibold">No websites yet</h3>
          <p className="text-muted-foreground mt-2">
            Create your first website to get started.
          </p>
          <Link href="/dashboard/new">
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create New Website
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {websites.map((website) => (
            <Link
              key={website.id}
              href={`/dashboard/${website.id}`}
              className="hover:border-foreground group relative rounded-lg border p-4"
            >
              <h3 className="font-semibold">{website.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {website.subdomain}.statix.com
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
