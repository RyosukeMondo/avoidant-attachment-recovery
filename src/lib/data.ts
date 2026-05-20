import summariesRaw from "@data/summaries.json";

export interface BookSummary {
  slug: string;
  title: string;
  content: string;
  categories: string[];
}

const summaries: BookSummary[] = summariesRaw as BookSummary[];

export function getSummaries(): BookSummary[] {
  return summaries;
}

export function getSummaryBySlug(slug: string): BookSummary | undefined {
  return summaries.find((s) => s.slug === slug);
}

export function getSummariesByCategory(category: string): BookSummary[] {
  return summaries.filter((s) =>
    s.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  for (const s of summaries) {
    for (const c of s.categories) {
      cats.add(c);
    }
  }
  return Array.from(cats).sort();
}

export function getCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
