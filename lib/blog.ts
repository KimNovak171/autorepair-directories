import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPostSummary = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export type BlogPost = BlogPostSummary & {
  html: string;
};

async function listMarkdownFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(postsDirectory);
    return entries.filter((name) => name.endsWith(".md"));
  } catch {
    return [];
  }
}

type ParsedPostFile = BlogPostSummary & { content: string };

async function parsePostFile(filename: string): Promise<ParsedPostFile | null> {
  const fullPath = path.join(postsDirectory, filename);
  const raw = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(raw);

  const title = data.title;
  const date = data.date;
  const description = data.description;
  if (title == null || date == null || description == null) {
    return null;
  }

  const slugFromFile = filename.replace(/\.md$/, "");
  const slug =
    typeof data.slug === "string" && data.slug.length > 0
      ? data.slug
      : slugFromFile;

  return {
    title: String(title),
    date: String(date),
    description: String(description),
    slug,
    content,
  };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkHtml).process(markdown);
  return String(file);
}

function toSummary(parsed: ParsedPostFile): BlogPostSummary {
  return {
    title: parsed.title,
    date: parsed.date,
    description: parsed.description,
    slug: parsed.slug,
  };
}

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const files = await listMarkdownFiles();
  const parsed = await Promise.all(files.map((f) => parsePostFile(f)));
  const posts = parsed.filter((p): p is ParsedPostFile => p !== null);

  return posts
    .map(toSummary)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const files = await listMarkdownFiles();
  for (const filename of files) {
    const parsed = await parsePostFile(filename);
    if (!parsed || parsed.slug !== slug) continue;
    const html = await markdownToHtml(parsed.content);
    return { ...toSummary(parsed), html };
  }
  return null;
}
