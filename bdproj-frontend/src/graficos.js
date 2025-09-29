import React from "react";

const Graficos = () => {
  const graficos = Array.from({ length: 15 }, (_, i) =>
    require(`./assets/grafico${i + 1}.png`)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Meus Gráficos</h1>
      <div className="grid grid-cols-3 gap-6">
        {graficos.map((grafico, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-center"
          >
            <img
              src={grafico}
              alt={`Gráfico ${index + 1}`}
              className="w-48 h-48 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graficos;
