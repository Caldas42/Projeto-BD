import React, { useState } from 'react';

const API_URL = 'http://localhost:8080/api/consultas';
/*aa*/
function ConsultasComponent() {
  const [resultados, setResultados] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [error, setError] = useState('');

  const executarConsulta = async (endpoint, tituloConsulta) => {
    try {
      setResultados([]);
      setHeaders([]);
      setError('');
      setTitulo(`Carregando: ${tituloConsulta}...`);

      const response = await fetch(`${API_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.length > 0) {
        setHeaders(Object.keys(data[0]));
        setResultados(data);
      } else {
        setHeaders(['Resultado']);
        setResultados([{'Resultado': 'A consulta não retornou resultados.'}]);
      }
      setTitulo(tituloConsulta);

    } catch (e) {
      console.error("Erro ao executar consulta:", e);
      setError(`Falha ao executar a consulta. Verifique o console.`);
      setTitulo(tituloConsulta);
    }
  };

  return (
    <div className="component-container">
      <h2>Consultas Especiais</h2>
      <div className="consultas-botoes">
        <button onClick={() => executarConsulta('jogadores-pvz-clash', 'Jogadores de PVZ ou Clash Royale')}>Consulta 1</button>
        <button onClick={() => executarConsulta('contagem-jogos-pessoa', 'Contagem de Jogos por Pessoa')}>Consulta 2</button>
        <button onClick={() => executarConsulta('jogos-de-cada-pessoa', 'Jogos de Cada Pessoa')}>Consulta 3</button>
        <button onClick={() => executarConsulta('proxima-fase', 'Sequência de Fases')}>Consulta 4</button>
        <button onClick={() => executarConsulta('inimigos-fase', 'Inimigos na fase')}>View 1</button>
        <button onClick={() => executarConsulta('resumo-financeiro-jogador', 'Resumo financeiro do jogador')}>View 2</button>
      </div>

      {titulo && <h3>{titulo}</h3>}
      {error && <p className="error-message">{error}</p>}

      {resultados.length > 0 && (
  <div className="tabela-container">
    <table className="data-table">
      <thead>
        <tr>
          {headers.map(header => <th key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {resultados.map((linha, index) => (
          <tr key={index}>
            {headers.map(header => (
              <td key={header}>
                {linha[header] === null ? 'N/A' : String(linha[header])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
}

export default ConsultasComponent;
