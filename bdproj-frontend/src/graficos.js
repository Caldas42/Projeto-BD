import React from "react";
import "./App.css"; 

const importAll = (r) => r.keys().map(r);
const graficos = importAll(require.context("./assets", false, /\.png$/));

const Graficos = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Meus Gráficos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {graficos.map((grafico, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center"
          >
            <img 
              src={grafico} 
              alt={`Gráfico ${index + 1}`} 
              className="grafico-fixo" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graficos;
