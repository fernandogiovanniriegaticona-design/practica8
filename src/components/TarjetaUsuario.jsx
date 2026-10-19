import React from 'react';

function TarjetaUsuario({ usuario }) {
  return (
    <div className="tarjeta-usuario">
      <img src={usuario.avatar_url} alt={usuario.login} className="avatar" />
      <h3>{usuario.name || `@${usuario.login}`}</h3>
      <p className="alias">@{usuario.login}</p>
      <p className="bio">
        {usuario.bio ? usuario.bio : "Este usuario no tiene biografía."}
      </p>
      {usuario.html_url && (
        <a 
          href={usuario.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-perfil"
        >
          Ver perfil en GitHub
        </a>
      )}
    </div>
  );
}

export default TarjetaUsuario;