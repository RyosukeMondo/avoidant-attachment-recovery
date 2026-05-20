import { useParams, Link } from "react-router-dom";
import { getSummaryBySlug, getCategorySlug } from "../lib/data";

function renderContent(raw: string): React.ReactNode[] {
  const lines = raw.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-semibold text-accent-900 mt-8 mb-3">
          {line.slice(3)}
        </h2>
      );
      i++; continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-medium text-accent-700 mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
      i++; continue;
    }

    if (/^={10,}$/.test(line) || /^-{3,}$/.test(line)) {
      i++; continue;
    }

    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc pl-5 space-y-1 my-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-stone-700">{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      let num = 1;
      while (i < lines.length && lines[i].trim().startsWith(`${num}. `)) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        num++; i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal pl-5 space-y-1 my-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-stone-700">{item}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (line.trim() && !line.startsWith("#")) {
      const parts = line.split(/(\*\*.+?\*\*)/g);
      const jsxParts = parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={idx} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={idx}>{part}</span>;
      });
      elements.push(<p key={key++} className="my-2 leading-relaxed">{jsxParts}</p>);
    }

    i++;
  }

  return elements;
}

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const book = getSummaryBySlug(slug || "");

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-accent-900 mb-4">Book Not Found</h1>
        <Link to="/" className="text-accent-700 hover:text-accent-900">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-sm text-stone-400 mb-6">
        <Link to="/" className="hover:text-accent-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-600">{book.title}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-accent-900 mb-3">{book.title}</h1>
        <div className="flex flex-wrap gap-1.5">
          {book.categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${getCategorySlug(cat)}`}
              className="px-2 py-0.5 text-xs rounded-full bg-accent-50 text-accent-700 font-medium hover:bg-accent-100"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <article className="bg-white border border-stone-200 rounded-xl p-6 md:p-8">
        {renderContent(book.content)}
      </article>

      <div className="mt-8 text-center">
        <Link to="/" className="text-sm text-accent-700 hover:text-accent-900">
          ← Back to all summaries
        </Link>
      </div>
    </div>
  );
}
