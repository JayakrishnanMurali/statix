"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Website } from "@/lib/types";
import { getWebsites } from "@/server/actions/websites";

export default function DashboardPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      const result = await getWebsites();

      if (result.success && result.data) {
        setWebsites(result.data);
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
          <p className="mt-2 text-muted-foreground">
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
              className="group relative rounded-lg border p-4 hover:border-foreground"
            >
              <h3 className="font-semibold">{website.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {website.subdomain}.statix.com
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
