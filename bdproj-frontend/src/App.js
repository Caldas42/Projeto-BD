import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PessoaComponent from "./PessoaComponent";
import FaseComponent from "./FaseComponent";
import ConsultasComponent from "./ConsultasComponent";
import DefesaDeTorresComponent from "./DefesaDeTorresComponent";
import InimigoComponent from "./InimigoComponent";
import Graficos from "./graficos";
import Menu from "./Menu";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>TimeFall Banco de Dados</h1>
        </header>

        <div className="layout">
          <Menu />

          <main className="content">
            <Routes>
              <Route path="/" element={<h2>Bem-vindo ao TimeFall</h2>} />
              <Route path="/pessoas" element={<PessoaComponent />} />
              <Route path="/fases" element={<FaseComponent />} />
              <Route path="/defesa" element={<DefesaDeTorresComponent />} />
              <Route path="/inimigos" element={<InimigoComponent />} />
              <Route path="/consultas" element={<ConsultasComponent />} />
              <Route path="/graficos" element={<Graficos />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
