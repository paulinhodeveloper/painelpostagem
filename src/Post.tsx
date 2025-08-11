import React from "react";

export type PostProps = {
    tipo: string;
    titulo: string;
    descricao?: string;
    data: string;
    imagemUrl?: string;
    onDelete?: () => void;
};

function formatDate(input: string) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
        const [y, m, d] = input.split("-");
        return `${d}/${m}/${y}`;
    }
    return input;
}

const Post: React.FC<PostProps> = ({
    tipo,
    titulo,
    descricao,
    data,
    imagemUrl,
    onDelete,
}) => {
    return (
        <article className="post-card">
            {/* Thumb */}
            <div className="thumb">
                <img
                    src={imagemUrl || "https://via.placeholder.com/320x180?text=Sem+imagem"}
                    alt={titulo}
                />
            </div>

            {/* Conteúdo */}
            <div className="content">
                <span className="badge">{(tipo || "").toUpperCase()}</span>

                <h3 className="title">{titulo}</h3>

                {descricao && <p className="excerpt">{descricao}</p>}

                <div className="meta">
                    Publicado em: <time>{formatDate(data)}</time>
                </div>

                {onDelete && (
                    <button className="link-delete" onClick={onDelete}>
                        Excluir
                    </button>
                )}
            </div>
        </article>
    );
};

export default Post;
