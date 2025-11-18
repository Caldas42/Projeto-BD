import React, { useState } from 'react';

const API_URL = 'http://localhost:8080/api/classificar-inimigo';

function ClassificarInimigoComponent() {
  const [formData, setFormData] = useState({ vida: '', velocidade: '' });
  const [classificacao, setClassificacao] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setClassificacao('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vida: parseInt(formData.vida, 10),
          velocidade: parseFloat(formData.velocidade)
        }),
      });

      if (!response.ok) throw new Error('Falha ao classificar inimigo.');

      const data = await response.json();
      setClassificacao(data.classificacao);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="component-container"> 
      <h2>Classificar Inimigo</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <input
            type="number"
            name="vida"
            value={formData.vida}
            onChange={handleInputChange}
            placeholder="Vida do inimigo"
            required
          />
          <input
            type="number"
            step="0.1"
            name="velocidade"
            value={formData.velocidade}
            onChange={handleInputChange}
            placeholder="Velocidade"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Classificar</button>
        </div>
      </form>

      {classificacao && (
        <div className="result-box">
          <h3>Resultado:</h3>
          <p><strong>{classificacao}</strong></p>
        </div>
      )}
    </div>
  );
}

export default ClassificarInimigoComponent;
