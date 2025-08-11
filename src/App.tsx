import React, { useState } from "react";
import "./index.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [tipoPost, setTipoPost] = useState("");
  const [postsCount, setPostsCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert("Preencha título e descrição.");
      return;
    }
    console.log({ titulo, descricao, imagemUrl, dataPublicacao, tipoPost });
    alert("Post criado com sucesso!");
    setTitulo("");
    setDescricao("");
    setImagemUrl("");
    setDataPublicacao("");
    setTipoPost("");
    setPostsCount((c) => c + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Painel de Gerenciamento</h1>
        <div className="stats">
          <span className="stat">
            <strong>{postsCount}</strong> posts
          </span>
        </div>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <h3>Novo Post</h3>

        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          className="input"
          type="text"
          placeholder="Digite o título do post"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          className="input"
          placeholder="Escreva a descrição do post"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label htmlFor="imagemUrl">URL da imagem de capa</label>
        <input
          id="imagemUrl"
          className="input"
          type="url"
          placeholder="URL da imagem de capa"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
        />

        <label htmlFor="dataPublicacao">Data de publicação</label>
        <input
          id="dataPublicacao"
          className="input"
          type="date"
          value={dataPublicacao}
          onChange={(e) => setDataPublicacao(e.target.value)}
        />

        {/* Select e botão lado a lado */}
        <div className="row">
          <div className="field">
            <label htmlFor="tipoPost">Tipo do post</label>
            <select
              id="tipoPost"
              className="input select"
              value={tipoPost}
              onChange={(e) => setTipoPost(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Artigo">Artigo</option>
              <option value="Notícia">Notícia</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Entrevista">Entrevista</option>
            </select>
          </div>

          <div className="field align-end">
            <button type="submit" className="btn btn-primary small">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
