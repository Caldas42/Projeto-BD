import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/pessoas';

function PessoaComponent() {
  const [pessoas, setPessoas] = useState([]);
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  const fetchPessoas = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPessoas(data);
      setError(null);
    } catch (e) {
      console.error("Erro ao buscar pessoas:", e);
      setError("Não foi possível carregar os dados.");
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!idade || !sexo) return;

    const pessoa = { 
        idade: parseInt(idade, 10),
        sexo: sexo 
    };
    
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? 'PUT' : 'POST';

    try {
      setError(null);
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoa),
      });

      if (response.ok) {
        fetchPessoas();
        resetForm();
      } else {
        const errText = await response.text();
        console.error("Falha do servidor:", errText);
        throw new Error('Falha ao salvar. Verifique o console do servidor.');
      }
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
      setError("Não foi possível salvar os dados.");
    }
  };

  const handleEdit = (pessoa) => {
    setEditId(pessoa.cod);
    setIdade(pessoa.idade);
    setSexo(pessoa.sexo);
  };

  const handleDelete = async (cod) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${cod}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPessoas();
      } else {
         const errText = await response.text();
         console.error("Falha do servidor:", errText);
         throw new Error('Falha ao deletar. Verifique o console do servidor.');
      }
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
      setError("Não foi possível deletar o registro.");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setIdade('');
    setSexo('');
  };

  return (
    <div className="component-container">
      <h2>Gerenciamento das Pessoas</h2>
      
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade da pessoa"
          required
        />
        <input
          type="text"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          placeholder="Sexo"
          maxLength="10"
          required
        />
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
        {editId && <button type="button" onClick={resetForm} className="cancel-button">Cancelar</button>}
      </form>

      <h3>Lista de Pessoas</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.cod}>
              <td>{pessoa.cod}</td>
              <td>{pessoa.idade}</td>
              <td>{pessoa.sexo}</td>
              <td className="actions-cell">
                <button onClick={() => handleEdit(pessoa)}>Alterar</button>
                <button onClick={() => handleDelete(pessoa.cod)} className="delete-button">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PessoaComponent;

