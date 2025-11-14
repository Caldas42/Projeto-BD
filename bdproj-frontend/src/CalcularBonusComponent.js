import React, { useState } from 'react';

const API_URL = 'http://localhost:8080/api/CalcularBonus';

function CalcularBonusComponent() {
  const [formData, setFormData] = useState({
    dificuldade: '',
    tempo: ''
  });
  const [bonus, setBonus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBonus('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro ao calcular bônus.');
      const data = await response.json();
      setBonus(data.bonus);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="tabela-container">
      <h2>Calcular Bônus</h2>

      <form onSubmit={handleSubmit} className="tabela-form">
        <label>Dificuldade:</label>
        <select
          name="dificuldade"
          value={formData.dificuldade}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          <option value="Muito fácil">Muito fácil</option>
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>

        <label>Tempo de Jogo:</label>
        <input
          type="time"
          name="tempo"
          value={formData.tempo}
          onChange={handleChange}
          required
        />
        <button type="submit">Calcular</button>
      </form>

      {error && <p className="erro">{error}</p>}

      {bonus && (
        <table className="tabela-resultado">
          <thead>
            <tr>
              <th>Dificuldade</th>
              <th>Tempo</th>
              <th>Bônus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.dificuldade}</td>
              <td>{formData.tempo}</td>
              <td>{bonus}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CalcularBonusComponent;
