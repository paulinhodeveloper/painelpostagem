import React, { useEffect, useState } from "react";
import "./index.css";

type Post = {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  dataPublicacao: string;
  tipoPost: string;
};

type Errors = Partial<Record<keyof Omit<Post, "id">, string>>;
const STORAGE_KEY = "posts";

const FormField: React.FC<{
  label: string; htmlFor: string; required?: boolean; error?: string; children: React.ReactNode;
}> = ({ label, htmlFor, required, error, children }) => (
  <div className="field">
    <div className="label-row">
      <label htmlFor={htmlFor} className={required ? "required" : ""}>{label}</label>
      {error && <span className="error-badge">{error}</span>}
    </div>
    {children}
  </div>
);

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [tipoPost, setTipoPost] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr: Post[] = raw ? JSON.parse(raw) : [];
      setPostsCount(Array.isArray(arr) ? arr.length : 0);
    } catch { setPostsCount(0); }
  }, []);

  const isFutureOrToday = (value: string) => {
    if (!value) return false;
    const picked = new Date(value + "T00:00:00");
    const today = new Date(); today.setHours(0,0,0,0);
    return picked >= today;
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!titulo.trim()) e.titulo = "Informe um título.";
    if (!descricao.trim()) e.descricao = "Informe a descrição.";
    if (!imagemUrl.trim()) e.imagemUrl = "Informe a URL de capa.";
    else if (!/^https?:\/\//i.test(imagemUrl)) e.imagemUrl = "A URL deve começar com http(s).";
    if (!dataPublicacao) e.dataPublicacao = "Selecione a data.";
    else if (!isFutureOrToday(dataPublicacao)) e.dataPublicacao = "Use hoje ou uma data futura.";
    if (!tipoPost) e.tipoPost = "Selecione uma categoria.";
    setErrors(e);
    return e;
  };

  const resetForm = () => {
    setTitulo(""); setDescricao(""); setImagemUrl(""); setDataPublicacao(""); setTipoPost(""); setErrors({});
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return;

    const id = (globalThis as any).crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2,8)}`; // 👈 id único
    const newPost: Post = { id, titulo, descricao, imagemUrl, dataPublicacao, tipoPost };

    let posts: Post[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      posts = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(posts)) posts = [];
    } catch { posts = []; }

    posts.push(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    setPostsCount(posts.length);

    window.dispatchEvent(new Event("posts-updated"));

    resetForm();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Painel de Gerenciamento</h1>
        <span className="stat">Total de posts: <strong>{postsCount}</strong></span>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <h3>Novo Post</h3>

        <FormField label="Título" htmlFor="titulo" required error={errors.titulo}>
          <input id="titulo" className={`input ${errors.titulo?"error":""}`} value={titulo} onChange={e=>setTitulo(e.target.value)} />
        </FormField>

        <FormField label="Descrição" htmlFor="descricao" required error={errors.descricao}>
          <textarea id="descricao" className={`input ${errors.descricao?"error":""}`} value={descricao} onChange={e=>setDescricao(e.target.value)} />
        </FormField>

        <FormField label="URL da imagem de capa" htmlFor="imagemUrl" required error={errors.imagemUrl}>
          <input id="imagemUrl" className={`input ${errors.imagemUrl?"error":""}`} placeholder="https://…" value={imagemUrl} onChange={e=>setImagemUrl(e.target.value)} />
        </FormField>

        <FormField label="Data de publicação" htmlFor="dataPublicacao" required error={errors.dataPublicacao}>
          <input id="dataPublicacao" type="date" className={`input ${errors.dataPublicacao?"error":""}`} value={dataPublicacao} onChange={e=>setDataPublicacao(e.target.value)} />
        </FormField>

        <div className="row">
          <FormField label="Tipo do post" htmlFor="tipoPost" required error={errors.tipoPost}>
            <select id="tipoPost" className={`input select ${errors.tipoPost?"error":""}`} value={tipoPost} onChange={e=>setTipoPost(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="Artigo">Artigo</option>
              <option value="Notícia">Notícia</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Entrevista">Entrevista</option>
            </select>
          </FormField>

          <div className="field align-end">
            <button type="submit" className="btn btn-primary small">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
