import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        "en-us": `https://autorepairdirectories.com/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: `${post.title} | AutoRepairDirectories.com`,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "AutoRepairDirectories.com",
      type: "article",
    },
  };
}

function formatPostDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const siteUrl = "https://autorepairdirectories.com";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <p className="mb-6">
        <Link
          href="/blog"
          className="text-sm font-medium text-teal underline underline-offset-2 hover:text-teal-soft"
        >
          ← Back to Blog
        </Link>
      </p>

      <article>
        <header className="space-y-3 border-b border-navy/10 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            {formatPostDate(post.date)}
          </p>
          <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
            {post.title}
          </h1>
          <p className="max-w-3xl text-sm text-slate-600">{post.description}</p>
        </header>

        <div
          className="max-w-3xl pt-8 text-sm leading-relaxed text-foreground/90 [&_a]:text-teal [&_a]:underline [&_blockquote]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gold-soft [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_h2]:first:mt-0 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-navy [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  );
}
