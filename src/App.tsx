import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-stone-200 py-8 text-center text-sm text-stone-500">
        <p>
          Summaries generated via AI analysis of book excerpts. For educational
          purposes only.
        </p>
      </footer>
    </div>
  );
}
