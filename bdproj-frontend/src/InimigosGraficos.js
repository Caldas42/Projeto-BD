import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://localhost:8080/api/inimigos";

const InimigosGraficos = () => {
  const [inimigos, setInimigos] = useState([]);
  const [error, setError] = useState(null);

  const fetchDados = async () => {
    try {
      const response = await axios.get(API_URL);
      setInimigos(response.data);
    } catch (e) {
      setError("Erro ao carregar dados dos gráficos.");
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!inimigos.length) return <p>Carregando gráficos...</p>;


  const scatterPoints = inimigos.map((ini) => ({
    x: ini.velocidade ?? ini.Velocidade,
    y: ini.vida ?? ini.Vida,
  }));

  const scatterData = {
    datasets: [
      {
        label: "Inimigos (Vida x Velocidade)",
        data: scatterPoints,
        pointRadius: 6,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  };

  const fasesMap = inimigos.reduce((acc, curr) => {
    const fase = curr.numero_da_Fase ?? curr.Numero_da_Fase ?? "Sem Fase";
    acc[fase] = (acc[fase] || 0) + 1;
    return acc;
  }, {});

  const fasesOrdenadas = Object.keys(fasesMap).sort((a, b) => {
    if (a === "Sem Fase") return 1;
    if (b === "Sem Fase") return -1;
    return Number(a) - Number(b);
  });

  const fasesValores = fasesOrdenadas.map((f) => fasesMap[f]);

  const histogramData = {
    labels: fasesOrdenadas.map(f => `Fase ${f}`),
    datasets: [
      {
        label: "Quantidade de Inimigos",
        data: fasesValores,
        backgroundColor: "#FF6384B3", 
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#FFF" } },
      title: {
        display: true,
        color: "#FFF",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#FFF" },
        grid: { color: "#444" } 
      },
      y: {
        ticks: { color: "#FFF" },
        grid: { color: "#444" },
        beginAtZero: true,
      },
    },
  };

  const scatterOptions = {
    ...commonOptions,
    scales: {
      x: {
        ...commonOptions.scales.x,
        title: { display: true, text: "Velocidade", color: "#FFF" },
      },
      y: {
        ...commonOptions.scales.y,
        title: { display: true, text: "Vida", color: "#FFF" },
      },
    },
    plugins: {
        ...commonOptions.plugins,
        title: { ...commonOptions.plugins.title, text: "Dispersão: Vida vs Velocidade" }
    }
  };

  const histogramOptions = {
    ...commonOptions,
    plugins: {
        ...commonOptions.plugins,
        title: { ...commonOptions.plugins.title, text: "Histograma: Inimigos por Fase" }
    }
  };

  return (
    <div style={{ width: "90%", margin: "40px auto" }}>
      
      {/* GRÁFICO 1: SCATTER */}
      <div style={{ height: "400px", marginBottom: "80px" }}>
        <Scatter data={scatterData} options={scatterOptions} />
      </div>

      {/* GRÁFICO 2: HISTOGRAMA (BARRAS) */}
      <div style={{ height: "400px", marginBottom: "40px" }}>
        <Bar data={histogramData} options={histogramOptions} />
      </div>

    </div>
  );
};

export default InimigosGraficos;