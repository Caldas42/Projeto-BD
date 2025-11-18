import React from 'react';
import PessoaComponent from './PessoaComponent';
import FaseComponent from './FaseComponent';
import ConsultasComponent from './ConsultasComponent';
import DefesaDeTorresComponent from './DefesaDeTorresComponent';
import InimigoComponent from './InimigoComponent';
import ClassificarInimigoComponent from './ClassificarInimigoComponent';
<<<<<<< HEAD
import PessoasGraficos from './PessoasGraficos';
import JogadosGraficos from './JogadosGraficos';
import InimigosGraficos from './InimigosGraficos';
=======
import PessoasGraficos from "./PessoasGraficos";
import JogadosGraficos from "./JogadosGraficos";

>>>>>>> d7ee5258f99097cb81474e580b75f365cad66ac4
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
<<<<<<< HEAD
        <PessoasGraficos />
        <JogadosGraficos />
        <InimigosGraficos />
      </main> 
=======
        <PessoasGraficos/>
        <JogadosGraficos/>
      </main>
>>>>>>> d7ee5258f99097cb81474e580b75f365cad66ac4
    </div>
  );
}

export default App;

