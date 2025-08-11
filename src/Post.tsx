import React from "react";

export interface PostProps {
  tipo: string;          // ex.: "NOTÍCIA"
  titulo: string;
  descricao: string;
  data: string;          // ex.: "09/07/2025"
  imagem?: string;       // opcional
}

export default function Post({ tipo, titulo, descricao, data, imagem }: PostProps) {
  return (
    <article className="post-card">
      {/** Thumb */}
      <div className="thumb">
        <img
          src={imagem || "https://via.placeholder.com/320x180?text=Sem+imagem"}
          alt={titulo}
        />
      </div>

      {/** Conteúdo */}
      <div className="content">
        <span className="badge">{tipo.toUpperCase()}</span>
        <h3 className="title">{titulo}</h3>
        {descricao && <p className="excerpt">{descricao}</p>}
        <div className="meta">
          Publicado em: <time>{data}</time>
        </div>
      </div>
    </article>
  );
}
