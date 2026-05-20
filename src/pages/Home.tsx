import { Link } from "react-router-dom";
import { getAllCategories, getSummaries, getCategorySlug } from "../lib/data";
import { BookCard } from "../components/BookCard";

export default function Home() {
  const summaries = getSummaries();
  const categories = getAllCategories();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="text-center py-12 mb-8">
        <h1 className="text-3xl font-bold text-accent-900 mb-3">
          Avoidant Attachment Recovery
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto text-lg">
          AI-summarized insights from {summaries.length} books on attachment
          theory, trauma healing, and evidence-based therapeutic approaches.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-medium text-stone-400 uppercase tracking-wide mb-3">
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${getCategorySlug(cat)}`}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent-50 text-accent-700 hover:bg-accent-100 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-stone-400 uppercase tracking-wide mb-3">
          All Summaries ({summaries.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaries.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
