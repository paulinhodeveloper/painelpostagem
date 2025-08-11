import React, { useState } from "react";
import "./index.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [postsCount, setPostsCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert("Preencha título e descrição.");
      return;
    }

    console.log({
      titulo,
      descricao,
      imagemUrl,
      dataPublicacao,
    });

    alert("Post criado com sucesso!");
    setTitulo("");
    setDescricao("");
    setImagemUrl("");
    setDataPublicacao("");
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
          type="text"
          placeholder="Digite o título do post"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          placeholder="Escreva a descrição do post"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label htmlFor="imagemUrl">URL da imagem de capa</label>
        <input
          id="imagemUrl"
          type="url"
          placeholder="URL da imagem de capa"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
        />

        <label htmlFor="dataPublicacao">Data de publicação</label>
        <input
          id="dataPublicacao"
          type="date"
          value={dataPublicacao}
          onChange={(e) => setDataPublicacao(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default App;
