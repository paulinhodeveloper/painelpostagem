import { useEffect, useState } from "react";
import "./index.css";

type SavedPost = {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  dataPublicacao: string;
  tipoPost: string;
};

const STORAGE_KEY = "posts";

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const readPosts = (): SavedPost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? (arr as SavedPost[]) : [];
  } catch {
    return [];
  }
};

export default function PostsList() {
  const [posts, setPosts] = useState<SavedPost[]>([]);

  const refresh = () => {
    const data = readPosts();
    data.sort((a, b) => (a.dataPublicacao < b.dataPublicacao ? 1 : -1));
    setPosts(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const onUpdated = () => refresh();
    window.addEventListener("posts-updated", onUpdated);
    return () => window.removeEventListener("posts-updated", onUpdated);
  }, []);

  const handleDelete = (idx: number) => {
    const updated = posts.filter((_, i) => i !== idx);
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("posts-updated"));
  };

  if (!posts.length) {
    return <div style={{ color: "#64748b" }}>Nenhum post encontrado.</div>;
  }

  return (
    <div className="posts-wrap">
      {posts.map((p, i) => (
        <article key={`${p.titulo}-${i}`} className="post-card">
          <div className="thumb">
            <img
              src={p.imagemUrl || "https://via.placeholder.com/320x180?text=Sem+imagem"}
              alt={p.titulo}
            />
          </div>
          <div className="content">
            <span className="badge">{p.tipoPost?.toUpperCase()}</span>
            <h3 className="title">{p.titulo}</h3>
            {p.descricao && <p className="excerpt">{p.descricao}</p>}
            <div className="meta">
              Publicado em: <time>{formatDate(p.dataPublicacao)}</time>
            </div>

            <button className="link-delete" onClick={() => handleDelete(i)}>
              Excluir
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
