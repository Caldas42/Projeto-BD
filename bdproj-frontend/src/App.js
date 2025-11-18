import React from 'react';
import PessoaComponent from './PessoaComponent';
import FaseComponent from './FaseComponent';
import ConsultasComponent from './ConsultasComponent';
import DefesaDeTorresComponent from './DefesaDeTorresComponent';
import InimigoComponent from './InimigoComponent';
import ClassificarInimigoComponent from './ClassificarInimigoComponent';
import PessoasGraficos from './PessoasGraficos';
import JogadosGraficos from './JogadosGraficos';
import InimigosGraficos from './InimigosGraficos';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>TimeFall Banco de Dados</h1>
      </header>
      <main>
        <PessoaComponent />
        <FaseComponent />
        <DefesaDeTorresComponent/>
        <InimigoComponent/>
        <ConsultasComponent />
        <ClassificarInimigoComponent/>
        <PessoasGraficos />
        <JogadosGraficos />
        <InimigosGraficos />
      </main> 
    </div>
  );
}

export default App;

