import { Link } from "react-router-dom";
import { getAllCategories, getSummaries, getCategorySlug } from "../lib/data";

export default function CategoriesPage() {
  const categories = getAllCategories();
  const summaries = getSummaries();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-sm text-stone-400 mb-6">
        <Link to="/" className="hover:text-accent-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-600">Categories</span>
      </div>

      <h1 className="text-2xl font-bold text-accent-900 mb-8">Categories</h1>

      <div className="space-y-4">
        {categories.map((cat) => {
          const count = summaries.filter((s) => s.categories.includes(cat)).length;
          return (
            <Link
              key={cat}
              to={`/category/${getCategorySlug(cat)}`}
              className="block bg-white border border-stone-200 rounded-xl p-5 hover:border-accent-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-accent-900 text-lg">{cat}</h2>
                <span className="text-sm text-stone-400">
                  {count} book{count !== 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
