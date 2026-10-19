import React, { useState } from 'react';
import TarjetaUsuario from './TarjetaUsuario';

function BuscadorGitHub() {
  const [busqueda, setBusqueda] = useState('');
  const [usuarioData, setUsuarioData] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga nativa de la página

    // Validación: No ejecutar petición si el input está vacío o solo tiene espacios
    if (!busqueda.trim()) {
      setError('Por favor, ingresa un nombre de usuario válido.');
      return;
    }

    setCargando(true);
    setError('');
    setUsuarioData(null); // Oculta la tarjeta anterior si la hubiera

    try {
      const respuesta = await fetch(`https://api.github.com/users/${busqueda.trim()}`);
      
      // Manejo de error 404 u otros códigos de error HTTP
      if (!respuesta.ok) {
        if (respuesta.status === 404) {
          throw new Error('El usuario no existe en GitHub.');
        } else {
          throw new Error('Ocurrió un error al realizar la consulta.');
        }
      }

      const datos = await respuesta.json();
      setUsuarioData(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="buscador-container">
      <h1>BUSCADOR</h1>
      <p className="subtitulo">Consumiendo la API pública de GitHub con React</p>
      
      <form onSubmit={handleSubmit} className="buscador-form">
        <input 
          type="text" 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
          placeholder="ej. tejadaeder"
        />
        <button type="submit">Buscar Perfil</button>
      </form>

      {/* Escenario 1: Cargando */}
      {cargando && <p className="mensaje-carga">Buscando en GitHub...</p>}

      {/* Escenario 2: Error (Mensaje rojo y claro) */}
      {error && <p className="mensaje-error">{error}</p>}

      {/* Escenario 3: Éxito (Renderizado del componente TarjetaUsuario) */}
      {usuarioData && <TarjetaUsuario usuario={usuarioData} />}
    </div>
  );
}

export default BuscadorGitHub;