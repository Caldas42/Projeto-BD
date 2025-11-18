import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/inimigos';

function InimigosComponent() {
  const [inimigos, setInimigos] = useState([]);
  const [nome, setNome] = useState('');
  const [vida, setVida] = useState('');
  const [velocidade, setVelocidade] = useState('');
  const [numero_da_Fase, setNumero_da_Fase] = useState('');
  const [almanaque_Cod, setAlmanaque_Cod] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState(null);

  const [total, setTotal] = useState(0);
  const [vidaMedia, setVidaMedia] = useState(0);
  const [velMedia, setVelMedia] = useState(0);
  
  // Estado para o filtro
  const [filtroFase, setFiltroFase] = useState('');

  const fetchInimigos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setInimigos(data);
      setError(null);
    } catch {
      setError("Não foi possível carregar os dados.");
    }
  };

  const fetchStats = async () => {
    try {
      const r1 = await fetch(`${API_URL}/count`);
      const r2 = await fetch(`${API_URL}/media-vida`);
      const r3 = await fetch(`${API_URL}/media-velocidade`);

      setTotal(await r1.json());
      setVidaMedia(await r2.json());
      setVelMedia(await r3.json());
    } catch {}
  };

  useEffect(() => {
    fetchInimigos();
    fetchStats();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usados = inimigos
      .map(i => i.almanaque_Cod ?? i.Almanaque_Cod)
      .filter(a => a != null);

    const almInt = parseInt(almanaque_Cod, 10);

    if (!editItem && usados.includes(almInt)) {
      setError("Este Almanaque_Cod já está sendo usado por outro inimigo!");
      return;
    }

    if (editItem) {
      const atual = editItem.almanaque_Cod ?? editItem.Almanaque_Cod;
      if (almInt !== atual && usados.includes(almInt)) {
        setError("Este Almanaque_Cod já está sendo usado por outro inimigo!");
        return;
      }
    }

    const inimigo = {
      nome,
      vida: parseInt(vida, 10),
      velocidade: parseFloat(velocidade),
      numero_da_Fase: numero_da_Fase === '' ? null : parseInt(numero_da_Fase, 10),
      almanaque_Cod: almInt
    };

    const method = editItem ? 'PUT' : 'POST';
    const url = editItem
      ? `${API_URL}/${encodeURIComponent(editItem.nome ?? editItem.Nome)}`
      : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inimigo),
      });

      if (response.ok) {
        await fetchInimigos();
        await fetchStats();
        resetForm();
      } else {
        setError("Falha ao salvar (verifique Nome, Fase ou Almanaque).");
      }
    } catch {
      setError("Erro de conexão com o servidor.");
    }
  };

  const handleEdit = (inimigo) => {
    setEditItem(inimigo);
    setNome(inimigo.nome ?? inimigo.Nome);
    setVida(inimigo.vida ?? inimigo.Vida);
    setVelocidade(inimigo.velocidade ?? inimigo.Velocidade);
    setNumero_da_Fase(inimigo.numero_da_Fase ?? inimigo.Numero_da_Fase ?? '');
    setAlmanaque_Cod(inimigo.almanaque_Cod ?? inimigo.Almanaque_Cod ?? '');
  };

  const handleDelete = async (nomeParam) => {
    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(nomeParam)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchInimigos();
        await fetchStats();
      } else {
        setError("Falha ao deletar.");
      }
    } catch {
      setError("Erro de conexão com o servidor.");
    }
  };

  const resetForm = () => {
    setEditItem(null);
    setNome('');
    setVida('');
    setVelocidade('');
    setNumero_da_Fase('');
    setAlmanaque_Cod('');
    setError(null);
  };

  const inimigosFiltrados = inimigos.filter((inimigo) => {
    if (filtroFase === '') return true;
    
    const fase = inimigo.numero_da_Fase ?? inimigo.Numero_da_Fase;
    
    if (fase === null || fase === undefined) return false;

    return fase.toString() === filtroFase;
  });

  return (
    <div className="component-container">
      <h2>Gerenciamento de Inimigos</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
          <input type="number" value={vida} onChange={(e) => setVida(e.target.value)} placeholder="Vida" required />
          <input type="number" step="0.1" value={velocidade} onChange={(e) => setVelocidade(e.target.value)} placeholder="Velocidade" required />
          <input type="number" value={numero_da_Fase} onChange={(e) => setNumero_da_Fase(e.target.value)} placeholder="Número da Fase" />
          <input type="number" value={almanaque_Cod} onChange={(e) => setAlmanaque_Cod(e.target.value)} placeholder="Almanaque Cod" required />
          <button type="submit">{editItem ? 'Atualizar' : 'Adicionar'}</button>
          {editItem && (
            <button type="button" onClick={resetForm} className="cancel-button">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="stats-container">
        <div className="stat-item">
            <h4>Total</h4>
            <p>{total}</p>
        </div>
        <div className="stat-item">
            <h4>Vida Média</h4>
            <p>{vidaMedia}</p>
        </div>
        <div className="stat-item">
            <h4>Velocidade Média</h4>
            <p>{velMedia}</p>
        </div>
      </div>

      <div className="list-header">
        <h3>Lista de Inimigos</h3>
        <div className="filter-container">
            <label>Filtrar por Fase:</label>
            <input 
                type="number" 
                value={filtroFase} 
                onChange={(e) => setFiltroFase(e.target.value)}
                placeholder="Nº da Fase"
                style={{ padding: '8px' }}
            />
        </div>
      </div>

      <div className="tabela-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Vida</th>
              <th>Velocidade</th>
              <th>Número da Fase</th>
              <th>Almanaque Cod</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {inimigosFiltrados.map((ini) => {
              const nomeKey = ini.nome ?? ini.Nome;
              return (
                <tr key={nomeKey}>
                  <td>{nomeKey}</td>
                  <td>{ini.vida ?? ini.Vida}</td>
                  <td>{ini.velocidade ?? ini.Velocidade}</td>
                  <td>{ini.numero_da_Fase ?? ini.Numero_da_Fase ?? ''}</td>
                  <td>{ini.almanaque_Cod ?? ini.Almanaque_Cod ?? ''}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(ini)}>Alterar</button>
                    <button onClick={() => handleDelete(nomeKey)} className="delete-button">Deletar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InimigosComponent;