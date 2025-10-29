import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/defesas-torres';

function DefesaDeTorresComponent() {
  const [defesas, setDefesas] = useState([]);
  const [jogo, setJogo] = useState('');
  const [cod_Pessoa, setCodPessoa] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState(null);

  // Buscar registros da API
  const fetchDefesas = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDefesas(data);
      setError(null);
    } catch (e) {
      console.error("Erro ao buscar defesas:", e);
      setError("Não foi possível carregar os dados.");
    }
  };

  useEffect(() => {
    fetchDefesas();
  }, []);

  // Enviar formulário (criar ou atualizar)
  const handleSubmit = async (event) => {
  event.preventDefault();
  if (!jogo || !cod_Pessoa) return;

  const defesa = { jogo, cod_Pessoa: parseInt(cod_Pessoa, 10) };
  const method = editItem ? 'PUT' : 'POST';

  try {
    const response = await fetch(API_URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defesa),
    });

    if (response.ok) {
      await fetchDefesas();
      resetForm();
    } else {
      const errText = await response.text();
      console.error("Erro do servidor:", errText);
      setError("Falha ao salvar.");
    }
  } catch (error) {
    console.error("Erro ao salvar:", error);
    setError("Erro de conexão com o servidor.");
  }
};


  // Edição
  const handleEdit = (defesa) => {
    setEditItem(defesa);
    setJogo(defesa.jogo);
    setCodPessoa(defesa.cod_Pessoa);
  };

  // Exclusão
  const handleDelete = async (jogo, cod_Pessoa) => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(jogo)}/${cod_Pessoa}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      await fetchDefesas();
    } else {
      const errText = await response.text();
      console.error("Erro ao deletar:", errText);
      setError("Falha ao deletar.");
    }
  } catch (error) {
    console.error("Erro ao deletar:", error);
    setError("Erro de conexão com o servidor.");
  }
};


  const resetForm = () => {
    setEditItem(null);
    setJogo('');
    setCodPessoa('');
  };

  return (
    <div className="component-container">
      <h2>Gerenciamento das Defesas de Torres Jogadas</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-container">
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
          <button
            type="button"
            onClick={resetForm}
            className="cancel-button"
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Defesas de Torres Jogadas</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Jogo</th>
            <th>Código da Pessoa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {defesas.map((defesa) => (
            <tr key={`${defesa.jogo}-${defesa.cod_Pessoa}`}>
              <td>{defesa.jogo}</td>
              <td>{defesa.cod_Pessoa}</td>
              <td className="actions-cell">
                <button onClick={() => handleEdit(defesa)}>Alterar</button>
                <button onClick={() => handleDelete(defesa.jogo, defesa.cod_Pessoa)} className="delete-button">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DefesaDeTorresComponent;
