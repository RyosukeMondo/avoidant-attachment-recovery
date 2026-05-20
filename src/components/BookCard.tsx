import { Link } from "react-router-dom";
import type { BookSummary } from "../lib/data";

export function BookCard({ book }: { book: BookSummary }) {
  const overview = book.content
    .replace(/^#{1,3} .*$/gm, "")
    .trim()
    .slice(0, 200);

  return (
    <Link
      to={`/books/${book.slug}`}
      className="block bg-white border border-stone-200 rounded-xl p-5 hover:border-accent-200 hover:shadow-sm transition-all"
    >
      <h3 className="font-semibold text-accent-900 mb-2 leading-snug">
        {book.title}
      </h3>
      <p className="text-sm text-stone-500 line-clamp-3 mb-3">{overview}</p>
      <div className="flex flex-wrap gap-1.5">
        {book.categories.map((cat) => (
          <span
            key={cat}
            className="px-2 py-0.5 text-xs rounded-full bg-accent-50 text-accent-700 font-medium"
          >
            {cat}
          </span>
        ))}
      </div>
    </Link>
  );
}
