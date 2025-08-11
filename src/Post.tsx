import React from "react";

export type PostProps = {
  id: string;
  tipo: string;
  titulo: string;
  descricao?: string;
  data: string;
  imagemUrl?: string;
  handleDelete?: (id: string) => void;
};

function formatDate(input: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(input)
    ? (() => { const [y,m,d]=input.split("-"); return `${d}/${m}/${y}`; })()
    : input;
}

const Post: React.FC<PostProps> = ({ id, tipo, titulo, descricao, data, imagemUrl, handleDelete }) => {
  return (
    <article className="post-card">
      <div className="thumb">
        <img
          src={imagemUrl || "https://via.placeholder.com/320x180?text=Sem+imagem"}
          alt={titulo}
        />
      </div>

      <div className="content">
        <span className="badge">{(tipo || "").toUpperCase()}</span>
        <h3 className="title">{titulo}</h3>
        {descricao && <p className="excerpt">{descricao}</p>}
        <div className="meta">
          Publicado em: <time>{formatDate(data)}</time>
        </div>

        {handleDelete && (
          <button className="link-delete" onClick={() => handleDelete(id)}>
            Excluir
          </button>
        )}
      </div>
    </article>
  );
};

export default Post;
