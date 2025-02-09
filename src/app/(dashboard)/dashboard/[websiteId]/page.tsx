import { type Website } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { WebsiteBuilder } from "@/components/website-builder";

export default async function WebsiteBuilderPage({
  params,
}: {
  params: { websiteId: string };
}) {
  const supabase = createClient();
  const { data: website } = await supabase
    .from("websites")
    .select("*")
    .eq("id", params.websiteId)
    .single();

  if (!website) {
    return <div>Website not found</div>;
  }

  return <WebsiteBuilder website={website} />;
}
