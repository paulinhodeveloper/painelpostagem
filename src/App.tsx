import React, { useState } from "react";
import "./index.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [postsCount, setPostsCount] = useState(0); // começa em 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert("Preencha título e descrição.");
      return;
    }

    console.log("Título:", titulo);
    console.log("Descrição:", descricao);

    alert("Post criado com sucesso!");
    setTitulo("");
    setDescricao("");
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

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default App;
