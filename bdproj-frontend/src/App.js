import React from 'react';
import PessoaComponent from './PessoaComponent';
import FaseComponent from './FaseComponent';
import ConsultasComponent from './ConsultasComponent';
import DefesaDeTorresComponent from './DefesaDeTorresComponent';
import InimigoComponent from './InimigoComponent';
import Graficos from './graficos';
import CalcularBonusComponent from './CalcularBonusComponent';
import ClassificarInimigoComponent from './ClassificarInimigoComponent';
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
        <CalcularBonusComponent/>
        <ClassificarInimigoComponent/>
        <Graficos/>
      </main>
    </div>
  );
}

export default App;

