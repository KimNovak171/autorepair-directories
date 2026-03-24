import type { Metadata } from "next";

type RegionPageProps = {
  params: {
    region: string;
  };
};

export function generateMetadata({
  params,
}: RegionPageProps): Metadata {
  const regionCode = params.region.toUpperCase();

  return {
    title: `Auto repair shops in ${regionCode}`,
    description: `Explore auto repair shop options and services in ${regionCode} with AutoRepairDirectories.com.`,
    openGraph: {
      title: `Auto repair shops in ${regionCode} | AutoRepairDirectories.com`,
      description: `Browse auto repair shop options and services in ${regionCode}.`,
      url: `/locations/${params.region}`,
      type: "website",
    },
  };
}

export default function RegionPage({ params }: RegionPageProps) {
  const regionCode = params.region.toUpperCase();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">
          Auto Repair Shops by Region
        </p>
        <h1 className="text-3xl font-semibold text-navy">
          Auto repair shop options in {regionCode}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          This is a placeholder view for{" "}
          <span className="font-semibold">{regionCode}</span>. Here drivers
          will be able to browse auto repair services in this state or
          province.
        </p>
        <div className="mt-6 rounded-xl border border-surface-muted bg-surface px-4 py-6 text-sm text-slate-500">
          Shop data will be loaded from your data model. This template
          ships with an empty `data/` folder (no JSON files).
          <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">
            /data
          </code>{" "}
          directory.
        </div>
      </div>
    </main>
  );
}
