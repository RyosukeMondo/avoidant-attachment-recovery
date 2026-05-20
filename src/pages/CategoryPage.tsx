import { useParams, Link } from "react-router-dom";
import { getSummariesByCategory, getAllCategories, getCategorySlug } from "../lib/data";
import { BookCard } from "../components/BookCard";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const categories = getAllCategories();
  const catName = categories.find((c) => getCategorySlug(c) === category);

  if (!catName) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-accent-900 mb-4">Category Not Found</h1>
        <Link to="/categories" className="text-accent-700 hover:text-accent-900">← All categories</Link>
      </div>
    );
  }

  const books = getSummariesByCategory(catName);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-sm text-stone-400 mb-6">
        <Link to="/" className="hover:text-accent-700">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/categories" className="hover:text-accent-700">Categories</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-600">{catName}</span>
      </div>

      <h1 className="text-2xl font-bold text-accent-900 mb-2">{catName}</h1>
      <p className="text-stone-500 mb-8">
        {books.length} book{books.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </div>
  );
}
