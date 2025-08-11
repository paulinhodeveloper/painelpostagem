import { useEffect, useState } from "react";

type SavedPost = {
  tipoPost: "Artigo" | "Notícia" | "Tutorial" | "Entrevista" | string;
};

const STORAGE_KEY = "posts";
const CATEGORIES = ["Artigo", "Notícia", "Tutorial", "Entrevista"] as const;

function readPosts(): SavedPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? (arr as SavedPost[]) : [];
  } catch {
    return [];
  }
}

export default function CategoryCounters() {
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const refresh = () => {
    const posts = readPosts();
    const map: Record<string, number> = {};
    for (const p of posts) {
      const k = p.tipoPost || "Outros";
      map[k] = (map[k] || 0) + 1;
    }
    setTotal(posts.length);
    setCounts(map);
  };

  useEffect(() => {
    refresh(); // ao montar
  }, []);

  // atualiza entre abas e na mesma aba
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) refresh(); };
    const onUpdated = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("posts-updated", onUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("posts-updated", onUpdated);
    };
  }, []);

  return (
    <div className="category-counts">
      <p>Atualmente, você tem <strong>{total} posts</strong> cadastrados</p>
      <ul>
        {CATEGORIES.map((c) =>
          counts[c] ? (
            <li key={c}>
              <strong>{c}:</strong> {counts[c]}
            </li>
          ) : null
        )}
        {/* Se quiser mostrar categorias mesmo com 0, remova o ternário acima */}
      </ul>
    </div>
  );
}
