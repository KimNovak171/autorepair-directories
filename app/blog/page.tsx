import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Auto Repair Tips & Guides",
  description:
    "Practical auto repair and maintenance guides to help you care for your vehicle and work confidently with repair shops.",
  alternates: {
    canonical: "/blog",
    languages: {
      "en-us": "https://autorepairdirectories.com/blog",
    },
  },
  openGraph: {
    title: "Auto Repair Tips & Guides | AutoRepairDirectories.com",
    description:
      "Practical auto repair and maintenance articles for drivers.",
    url: "/blog",
    siteName: "AutoRepairDirectories.com",
    type: "website",
  },
};

const siteUrl = "https://autorepairdirectories.com";

function formatPostDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AutoRepairDirectories.com",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Blog
        </p>
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
          Auto Repair Tips &amp; Guides
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Maintenance advice, warning signs, and shop-smart tips — written for
          everyday drivers.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-slate-600">
          New articles are coming soon. Check back shortly.
        </p>
      ) : (
        <ul className="mt-10 space-y-8 border-t border-navy/10 pt-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="space-y-2">
                <p className="text-xs text-slate-500">
                  {formatPostDate(post.date)}
                </p>
                <h2 className="text-xl font-semibold text-navy">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-teal-soft transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block text-xs font-medium text-teal underline underline-offset-2 hover:text-teal-soft"
                >
                  Read article
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
