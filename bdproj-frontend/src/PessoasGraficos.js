import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://localhost:8080/api/pessoas";

const PessoasGraficos = () => {
  const [pessoas, setPessoas] = useState([]);
  const [error, setError] = useState(null);

  const fetchPessoas = async () => {
    try {
      const resp = await axios.get(API_URL);
      setPessoas(resp.data);
    } catch (e) {
      setError("Erro ao buscar dados para gráficos.");
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!pessoas.length) return <p>Carregando gráficos...</p>;

  // ======= GRÁFICO 1: QUANTIDADE POR SEXO ========
  const grupos = pessoas.reduce((acc, pessoa) => {
    const sexo = pessoa.sexo.toUpperCase();
    acc[sexo] = (acc[sexo] || 0) + 1;
    return acc;
  }, {});

  const sexoLabels = Object.keys(grupos);
  const sexoValores = Object.values(grupos);

  const sexoData = {
    labels: sexoLabels,
    datasets: [
      {
        label: "Quantidade por Sexo",
        data: sexoValores,
        backgroundColor: ["#9C27B0B3", "#7E57C2B3", "#5E35B1B3"],
        borderColor: ["#9C27B0", "#7E57C2", "#5E35B1"],
        borderWidth: 1,
      },
    ],
  };

  // ======= GRÁFICO 2: MÉDIA DE IDADE POR SEXO ========
  const mediaPorSexo = pessoas.reduce((acc, pessoa) => {
    const sexo = pessoa.sexo.toUpperCase();
    if (!acc[sexo]) acc[sexo] = { total: 0, count: 0 };
    acc[sexo].total += pessoa.idade;
    acc[sexo].count++;
    return acc;
  }, {});

  const mediaLabels = Object.keys(mediaPorSexo);
  const mediaValores = mediaLabels.map(
    (s) => mediaPorSexo[s].total / mediaPorSexo[s].count
  );

  const mediaData = {
    labels: mediaLabels,
    datasets: [
      {
        label: "Média de Idade",
        data: mediaValores,
        backgroundColor: ["#1DB954B3", "#00A86BB3", "#3CB371B3"],
        borderColor: ["#1DB954", "#00A86B", "#3CB371"],
        borderWidth: 1,
      },
    ],
  };

  // ========= GRÁFICO 3: PIZZA - QUANTIDADE POR IDADE =========
  const idadeAgrupada = pessoas.reduce((acc, pessoa) => {
    acc[pessoa.idade] = (acc[pessoa.idade] || 0) + 1;
    return acc;
  }, {});

  const idadeLabels = Object.keys(idadeAgrupada);
  const idadeValores = Object.values(idadeAgrupada);

  const idadeData = {
    labels: idadeLabels,
    datasets: [
      {
        label: "Quantidade por Idade",
        data: idadeValores,
        backgroundColor: [
          "#FF6384B3",
          "#36A2EBB3",
          "#FFCE56B3",
          "#4BC0C0B3",
          "#9966FFB3",
          "#FF9F40B3"
        ],
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#FFF" } },
      title: {
        display: true,
        color: "#FFF",
        font: { size: 16 },
      }
    },
    scales: {
      x: { ticks: { color: "#FFF" } },
      y: { ticks: { color: "#FFF" }, beginAtZero: true }
    }
  };

  return (
    <div style={{ width: "90%", margin: "40px auto" }}>

      {/* GRÁFICO 1 */}
      <div style={{ height: "300px", marginBottom: "60px" }}>
        <Bar
          data={sexoData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: {
                display: true,
                text: "Quantidade de Pessoas por Sexo",
                color: "#FFF",
                font: { size: 16 }
              }
            }
          }}
        />
      </div>

      {/* GRÁFICO 2 */}
      <div style={{ height: "300px", marginBottom: "60px" }}>
        <Bar
          data={mediaData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: {
                display: true,
                text: "Média de Idade por Sexo",
                color: "#FFF",
                font: { size: 16 }
              }
            }
          }}
        />
      </div>

      {/* GRÁFICO 3 - PIZZA */}
      <div style={{ width: "400px", margin: "40px auto" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>
          Quantidade de Pessoas por Idade
        </h2>
        <Pie data={idadeData} />
      </div>

    </div>
  );
};

export default PessoasGraficos;