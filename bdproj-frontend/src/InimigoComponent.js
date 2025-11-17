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

  // Buscar registros da API
  const fetchInimigos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

      const data = await response.json();
      setInimigos(data);
      setError(null);
    } catch (e) {
      console.error("Erro ao buscar inimigos:", e);
      setError("Não foi possível carregar os dados.");
    }
  };

  useEffect(() => {
    fetchInimigos();
  }, []);

  // Enviar formulário (criar ou atualizar)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Lista de Almanaques já usados
    const usados = inimigos
      .map(i => i.almanaque_Cod ?? i.Almanaque_Cod)
      .filter(a => a != null);

    const almInt = parseInt(almanaque_Cod, 10);

    // Verificar duplicidade de Almanaque_Cod
    if (!editItem && usados.includes(almInt)) {
      setError("Este Almanaque_Cod já está sendo usado por outro inimigo!");
      return;
    }

    // Durante a edição, aceita o mesmo Almanaque_Cod do item atual
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
        resetForm();
      } else {
        const errText = await response.text();
        console.error("Erro do servidor:", errText);
        setError("Falha ao salvar (verifique Nome, Fase ou Almanaque).");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setError("Erro de conexão com o servidor.");
    }
  };

  // Edição
  const handleEdit = (inimigo) => {
    setEditItem(inimigo);
    setNome(inimigo.nome ?? inimigo.Nome);
    setVida(inimigo.vida ?? inimigo.Vida);
    setVelocidade(inimigo.velocidade ?? inimigo.Velocidade);
    setNumero_da_Fase(inimigo.numero_da_Fase ?? inimigo.Numero_da_Fase ?? '');
    setAlmanaque_Cod(inimigo.almanaque_Cod ?? inimigo.Almanaque_Cod ?? '');
  };

  // Exclusão
  const handleDelete = async (nomeParam) => {
    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(nomeParam)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchInimigos();
      } else {
        setError("Falha ao deletar.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
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

  return (
    <div className="component-container">
      <h2>Gerenciamento de Inimigos</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome (único)"
            required
          />

          <input
            type="number"
            value={vida}
            onChange={(e) => setVida(e.target.value)}
            placeholder="Vida"
            required
          />

          <input
            type="number"
            step="0.1"
            value={velocidade}
            onChange={(e) => setVelocidade(e.target.value)}
            placeholder="Velocidade"
            required
          />

          <input
            type="number"
            value={numero_da_Fase}
            onChange={(e) => setNumero_da_Fase(e.target.value)}
            placeholder="Número da Fase (FK)"
          />

          <input
            type="number"
            value={almanaque_Cod}
            onChange={(e) => setAlmanaque_Cod(e.target.value)}
            placeholder="Almanaque Cod (único)"
            required
          />

          <button type="submit">{editItem ? 'Atualizar' : 'Adicionar'}</button>

          {editItem && (
            <button type="button" onClick={resetForm} className="cancel-button">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Lista de Inimigos</h3>
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
          {inimigos.map((ini) => {
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
                  <button
                    onClick={() =>
                      handleDelete(ini.nome ?? ini.Nome)
                    }
                    className="delete-button"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InimigosComponent;
