import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = "http://localhost:8080/api/defesas-torres";

const JogadosGraficos = () => {
  const [dados, setDados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setDados(res.data);
      })
      .catch(() => setError("Erro ao carregar dados do gráfico."));
  }, []);

  if (error) return <p>{error}</p>;
  if (dados.length === 0) return <p>Carregando dados...</p>;

  // -----------------------------
  // AGRUPAR JOGOS POR QUANTIDADE
  // -----------------------------
  const contagem = {};

  dados.forEach(item => {
    contagem[item.jogo] = (contagem[item.jogo] || 0) + 1;
  });

  const nomes = Object.keys(contagem);
  const qtd = Object.values(contagem);

  const data = {
    labels: nomes,
    datasets: [
      {
        label: "Vezes jogado",
        data: qtd,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)"
        ]
      }
    ]
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <h2>Jogos Mais Jogados</h2>
      <Pie data={data} />
    </div>
  );
};

export default JogadosGraficos;
