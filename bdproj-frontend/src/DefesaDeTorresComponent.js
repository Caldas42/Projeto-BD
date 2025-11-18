import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/defesas-torres';

function DefesaDeTorresComponent() {
  const [defesas, setDefesas] = useState([]);
  const [jogo, setJogo] = useState('');
  const [cod_Pessoa, setCodPessoa] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState(null);
  const [totalDefesas, setTotalDefesas] = useState(0);
  const [filtroJogo, setFiltroJogo] = useState('');

  const fetchDefesas = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDefesas(data);
      setError(null);
    } catch {
      setError("Não foi possível carregar os dados.");
    }
  };

  const fetchEstatisticas = async () => {
    try {
      const countRes = await fetch(`${API_URL}/count`);
      const total = await countRes.json();
      setTotalDefesas(total);
    } catch {}
  };

  useEffect(() => {
    fetchDefesas();
    fetchEstatisticas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!jogo || !cod_Pessoa) return;

    const defesa = { jogo, cod_Pessoa: parseInt(cod_Pessoa) };
    const method = editItem ? 'PUT' : 'POST';

    try {
      const response = await fetch(API_URL, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defesa),
      });

      if (response.ok) {
        fetchDefesas();
        fetchEstatisticas();
        resetForm();
      } else {
        setError("Falha ao salvar.");
      }
    } catch {
      setError("Erro de conexão com o servidor.");
    }
  };

  const handleEdit = (defesa) => {
    setEditItem(defesa);
    setJogo(defesa.jogo);
    setCodPessoa(defesa.cod_Pessoa);
  };

  const handleDelete = async (jogo, cod_Pessoa) => {
    try {
      await fetch(`${API_URL}/${encodeURIComponent(jogo)}/${cod_Pessoa}`, {
        method: 'DELETE',
      });
      fetchDefesas();
      fetchEstatisticas();
    } catch {
      setError("Erro ao deletar.");
    }
  };

  const resetForm = () => {
    setEditItem(null);
    setJogo('');
    setCodPessoa('');
  };

  const defesasFiltradas = defesas.filter((defesa) => {
    if (filtroJogo === '') return true;
    return defesa.jogo.toLowerCase().includes(filtroJogo.toLowerCase());
  });

  return (
    <div className="component-container">
      <h2>Gerenciamento das Defesas de Torres Jogadas</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <input
            type="text"
            value={jogo}
            onChange={(e) => setJogo(e.target.value)}
            placeholder="Nome do jogo"
            required
          />
          <input
            type="number"
            value={cod_Pessoa}
            onChange={(e) => setCodPessoa(e.target.value)}
            placeholder="Código da pessoa"
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

      <div className="stats-container">
        <div className="stat-item">
            <h4>Total de Registros</h4>
            <p>{totalDefesas}</p>
        </div>
      </div>

      <div className="list-header">
        <h3>Lista de Defesas de Torres Jogadas</h3>
        <div className="filter-container">
            <label>Filtrar por Jogo:</label>
            <input 
                type="text" 
                value={filtroJogo} 
                onChange={(e) => setFiltroJogo(e.target.value)}
                placeholder="Diga o nome do jogo"
                style={{ padding: '8px' }}
            />
        </div>
      </div>

      <div className="tabela-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Jogo</th>
              <th>Código da Pessoa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {defesasFiltradas.map((defesa) => (
              <tr key={`${defesa.jogo}-${defesa.cod_Pessoa}`}>
                <td>{defesa.jogo}</td>
                <td>{defesa.cod_Pessoa}</td>
                <td className="actions-cell">
                  <button onClick={() => handleEdit(defesa)}>Alterar</button>
                  <button
                    onClick={() => handleDelete(defesa.jogo, defesa.cod_Pessoa)}
                    className="delete-button"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DefesaDeTorresComponent;