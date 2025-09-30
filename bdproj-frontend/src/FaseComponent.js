import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/fases';

function FaseComponent() {
  const [fases, setFases] = useState([]);
  const [formData, setFormData] = useState({
    numero_da_fase: '',
    vidas_iniciais: '',
    rodadas: '',
    moedas_iniciais: '',
    numero_da_Fase_Liberada: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFases();
  }, []);

  const fetchFases = async () => {
    try {
      setError('');
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Falha ao carregar fases.');
      const data = await response.json();
      setFases(data);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    
    const faseData = {
      numero_da_fase: parseInt(formData.numero_da_fase, 10),
      vidas_iniciais: parseInt(formData.vidas_iniciais, 10),
      rodadas: parseInt(formData.rodadas, 10),
      moedas_iniciais: parseInt(formData.moedas_iniciais, 10),
      numero_da_Fase_Liberada: formData.numero_da_Fase_Liberada 
        ? parseInt(formData.numero_da_Fase_Liberada, 10) 
        : null
    };

    try {
      setError('');
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faseData),
      });
      if (!response.ok) throw new Error(`Falha ao ${editId ? 'atualizar' : 'salvar'} fase.`);
      resetForm();
      fetchFases();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (fase) => {
    setEditId(fase.numero_da_fase);
    setFormData({
        numero_da_fase: fase.numero_da_fase,
        vidas_iniciais: fase.vidas_iniciais,
        rodadas: fase.rodadas,
        moedas_iniciais: fase.moedas_iniciais,
        numero_da_Fase_Liberada: fase.numero_da_Fase_Liberada
    });
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao deletar fase.');
      fetchFases();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      numero_da_fase: '', vidas_iniciais: '', rodadas: '',
      moedas_iniciais: '', numero_da_Fase_Liberada: '',
    });
  };

  return (
    <div className="card">
      <h2>Gerenciamento de Fases</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
            <input type="number" name="numero_da_fase" value={formData.numero_da_fase} onChange={handleInputChange} placeholder="Nº da Fase" required disabled={!!editId} />
            <input type="number" name="vidas_iniciais" value={formData.vidas_iniciais} onChange={handleInputChange} placeholder="Vidas Iniciais" required/>
            <input type="number" name="rodadas" value={formData.rodadas} onChange={handleInputChange} placeholder="Rodadas" required/>
            <input type="number" name="moedas_iniciais" value={formData.moedas_iniciais} onChange={handleInputChange} placeholder="Moedas Iniciais" required/>
            <input type="number" name="numero_da_Fase_Liberada" value={formData.numero_da_Fase_Liberada} onChange={handleInputChange} placeholder="Fase Liberada" required/>
        </div>
        <div className="form-group">
            <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
            {editId && <button type="button" onClick={resetForm}>Cancelar</button>}
        </div>
      </form>

      <h3>Lista de Fases</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nº Fase</th>
            <th>Vidas</th>
            <th>Rodadas</th>
            <th>Moedas</th>
            <th>Libera</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fases.map((f) => (
            <tr key={f.numero_da_fase}>
              <td>{f.numero_da_fase}</td>
              <td>{f.vidas_iniciais}</td>
              <td>{f.rodadas}</td>
              <td>{f.moedas_iniciais}</td>
              <td>{f.numero_da_Fase_Liberada}</td>
              <td className="actions">
                <button onClick={() => handleEdit(f)}>Alterar</button>
                <button onClick={() => handleDelete(f.numero_da_fase)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FaseComponent;
