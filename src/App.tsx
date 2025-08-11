import React, { useState } from "react";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Errors = {
  titulo?: string;
  descricao?: string;
  imagemUrl?: string;
  dataPublicacao?: string;
  tipoPost?: string;
};

const FormField: React.FC<{
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, htmlFor, error, required, children }) => (
  <div className="field">
    <div className="label-row">
      <label htmlFor={htmlFor} className={required ? "required" : ""}>
        {label}
      </label>
      {error && (
        <span className="error-badge" role="alert" aria-live="polite">
          {error}
        </span>
      )}
    </div>
    {children}
  </div>
);

function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [tipoPost, setTipoPost] = useState("");
  const [postsCount, setPostsCount] = useState(0);
  const [errors, setErrors] = useState<Errors>({});

  const isFutureOrToday = (value: string) => {
    if (!value) return false;
    const picked = new Date(value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return picked >= today;
  };

  const validate = () => {
    const e: Errors = {};
    if (!titulo.trim()) e.titulo = "Informe um título.";
    if (!descricao.trim()) e.descricao = "Informe a descrição.";
    if (!imagemUrl.trim()) e.imagemUrl = "Informe a URL de capa.";
    else if (!/^https?:\/\//i.test(imagemUrl.trim()))
      e.imagemUrl = "A URL deve começar com http(s).";
    if (!dataPublicacao) e.dataPublicacao = "Selecione a data.";
    else if (!isFutureOrToday(dataPublicacao))
      e.dataPublicacao = "Use hoje ou uma data futura.";
    if (!tipoPost) e.tipoPost = "Selecione uma categoria.";
    setErrors(e);
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      toast.error(Object.values(e)[0]!);
      return;
    }
    toast.success("Post criado com sucesso!");
    console.log({ titulo, descricao, imagemUrl, dataPublicacao, tipoPost });
    setTitulo(""); setDescricao(""); setImagemUrl(""); setDataPublicacao(""); setTipoPost("");
    setErrors({});
    setPostsCount((c) => c + 1);
  };

  const blurValidate = (field: keyof Errors) => {
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="container">
        <header className="header">
          <h1>Painel de Gerenciamento</h1>
          <span className="stat"><strong>{postsCount}</strong> posts</span>
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <h3>Novo Post</h3>

          <FormField
            label="Título"
            htmlFor="titulo"
            required
            error={errors.titulo}
          >
            <input
              id="titulo"
              className={`input ${errors.titulo ? "error" : ""}`}
              type="text"
              placeholder="Digite o título do post"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              onBlur={() => blurValidate("titulo")}
              aria-invalid={!!errors.titulo}
            />
          </FormField>

          <FormField
            label="Descrição"
            htmlFor="descricao"
            required
            error={errors.descricao}
          >
            <textarea
              id="descricao"
              className={`input ${errors.descricao ? "error" : ""}`}
              placeholder="Escreva a descrição do post"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              onBlur={() => blurValidate("descricao")}
              aria-invalid={!!errors.descricao}
            />
          </FormField>

          <FormField
            label="URL da imagem de capa"
            htmlFor="imagemUrl"
            required
            error={errors.imagemUrl}
          >
            <input
              id="imagemUrl"
              className={`input ${errors.imagemUrl ? "error" : ""}`}
              type="url"
              placeholder="https://…"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              onBlur={() => blurValidate("imagemUrl")}
              aria-invalid={!!errors.imagemUrl}
            />
          </FormField>

          <FormField
            label="Data de publicação"
            htmlFor="dataPublicacao"
            required
            error={errors.dataPublicacao}
          >
            <input
              id="dataPublicacao"
              className={`input ${errors.dataPublicacao ? "error" : ""}`}
              type="date"
              value={dataPublicacao}
              onChange={(e) => setDataPublicacao(e.target.value)}
              onBlur={() => blurValidate("dataPublicacao")}
              aria-invalid={!!errors.dataPublicacao}
            />
          </FormField>

          <div className="row">
            <FormField
              label="Tipo do post"
              htmlFor="tipoPost"
              required
              error={errors.tipoPost}
            >
              <select
                id="tipoPost"
                className={`input select ${errors.tipoPost ? "error" : ""}`}
                value={tipoPost}
                onChange={(e) => setTipoPost(e.target.value)}
                onBlur={() => blurValidate("tipoPost")}
                aria-invalid={!!errors.tipoPost}
              >
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
    </>
  );
}

export default App;
