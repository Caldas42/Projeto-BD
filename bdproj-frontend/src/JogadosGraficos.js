import React, { useEffect, useState } from "react";
import axios from "axios";

<<<<<<< HEAD
=======
// Imports do Chart.js
>>>>>>> d7ee5258f99097cb81474e580b75f365cad66ac4
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

<<<<<<< HEAD
ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = "http://localhost:8080/api/defesas-torres";
=======
// Registrar plugins necessários
ChartJS.register(ArcElement, Tooltip, Legend);

// URL da API
const API_URL = "http://localhost:8080/api/jogos";
>>>>>>> d7ee5258f99097cb81474e580b75f365cad66ac4

const JogadosGraficos = () => {
  const [dados, setDados] = useState([]);
  const [error, setError] = useState(null);

<<<<<<< HEAD
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
=======
  const fetchDados = async () => {
    try {
      const response = await axios.get(API_URL);
      setDados(response.data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados do gráfico.");
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (dados.length === 0) {
    return <p>Carregando dados...</p>;
  }

  // -------------------------------
  // PROCESSAMENTO DOS DADOS
  // -------------------------------
  // Exemplo da API esperada:
  // [
  //   { nomeJogo: "Minecraft", jogadores: 12 },
  //   { nomeJogo: "Valorant", jogadores: 8 },
  //   ...
  // ]

  const nomes = dados.map(item => item.nomeJogo);
  const qtd = dados.map(item => item.jogadores);
>>>>>>> d7ee5258f99097cb81474e580b75f365cad66ac4

  const data = {
    labels: nomes,
    datasets: [
      {
<<<<<<< HEAD
        label: "Vezes jogado",
=======
        label: "Quantidade de Jogadores",
>>>>>>> d7ee5258f99097cb81474e580b75f365cad66ac4
        data: qtd,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)"
<<<<<<< HEAD
        ]
=======
        ],
        borderWidth: 1
>>>>>>> d7ee5258f99097cb81474e580b75f365cad66ac4
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
