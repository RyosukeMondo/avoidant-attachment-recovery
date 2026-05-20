#!/usr/bin/env node
/** Prebuild: reads data/summaries/*.txt → generates src/data/summaries.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUMMARIES_DIR = path.join(__dirname, "..", "data", "summaries");
const OUT_DIR = path.join(__dirname, "..", "src", "data");
const OUT_FILE = path.join(OUT_DIR, "summaries.json");

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function extractTitle(fileName) {
  let title = fileName.replace(/_summary\.txt$/, "");
  title = title.replace(/_$/, "");
  title = title.replace(/_+/g, " ");
  return title.trim();
}

function categorize(title, content) {
  // Match Python summarize script's categorize() — title-based with content fallback
  const cats = [];
  const t = (title + " " + content.slice(0, 500)).toLowerCase();
  if (/attach|avoidant|anxious|insecure/.test(t)) cats.push("Attachment Theory");
  if (/trauma|body keeps|nervous system|polyvagal|somatic|ptsd/.test(t))
    cats.push("Trauma & Nervous System");
  if (/emotionally focused|hold me tight|couples/.test(t))
    cats.push("EFT & Couples Therapy");
  if (/schema|maladaptive/.test(t)) cats.push("Schema Therapy");
  if (/internal family|parts work|reparent/.test(t))
    cats.push("Internal Family Systems");
  if (/\bact\b|acceptance.?commitment|\bdbt\b|dialectical|regulation/.test(t))
    cats.push("ACT / DBT");
  if (/interpersonal neuro|siegel|mindful/.test(t))
    cats.push("Interpersonal Neurobiology");
  if (/intimacy|fear.*intimacy|emotional unavail|commitment/.test(t))
    cats.push("Intimacy & Connection");
  if (/workbook|self.help|healing|recovery|repair/.test(t))
    cats.push("Self-Help & Recovery");
  if (/codepend|boundar/.test(t)) cats.push("Attachment Theory");
  if (cats.length === 0) cats.push("Psychology");
  return cats;
}

const files = fs
  .readdirSync(SUMMARIES_DIR)
  .filter((f) => f.endsWith("_summary.txt"));

const summaries = files.map((file) => {
  const content = fs.readFileSync(path.join(SUMMARIES_DIR, file), "utf-8");
  const title = extractTitle(file);
  return {
    slug: slugify(title),
    title,
    content,
    categories: categorize(title, content),
  };
});

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(summaries, null, 2));
console.log(`Generated ${OUT_FILE} with ${summaries.length} summaries`);
