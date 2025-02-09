import { WebsiteBuilder } from "@/components/website-builder";
import { getWebsiteById } from "@/server/actions/websites";

export default async function WebsiteBuilderPage({
  params,
}: {
  params: { websiteId: string };
}) {
  const result = await getWebsiteById(params.websiteId);

  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  const website = result.data;

  if (!website) {
    return <div>Website not found</div>;
  }

  return <WebsiteBuilder website={website} />;
}
