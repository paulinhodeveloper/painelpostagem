import { useEffect, useState } from "react";

const STORAGE_KEY = "posts";

type Post = {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  dataPublicacao: string; // yyyy-mm-dd
  tipoPost: string;
};

function formatDate(isoDate?: string) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      const parsed = stored ? (JSON.parse(stored) as unknown) : [];
      setPosts(Array.isArray(parsed) ? (parsed as Post[]) : []);
    } catch {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const parsed = e.newValue ? (JSON.parse(e.newValue) as unknown) : [];
          setPosts(Array.isArray(parsed) ? (parsed as Post[]) : []);
        } catch {
          setPosts([]);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleDelete = (idx: number) => {
    const updated = posts.filter((_, i) => i !== idx);
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  if (!posts.length) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: "#64748b" }}>
        Nenhum post encontrado.
      </div>
    );
  }

  return (
    <div className="posts-wrap">
      {posts.map((p, idx) => (
        <article key={`${p.titulo}-${idx}`} className="post-card">
          <div className="thumb">
            <img
              src={
                p.imagemUrl || "https://via.placeholder.com/320x180?text=Sem+imagem"
              }
              alt={p.titulo}
            />
          </div>

          <div className="content">
            <span className="badge">{p.tipoPost?.toUpperCase()}</span>
            <h3 className="title">{p.titulo}</h3>
            {p.descricao && <p className="excerpt">{p.descricao}</p>}
            <div className="meta">Publicado em: <time>{formatDate(p.dataPublicacao)}</time></div>

            <button
              className="link-delete"
              onClick={() => handleDelete(idx)}
              aria-label={`Excluir ${p.titulo}`}
            >
              Excluir
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
