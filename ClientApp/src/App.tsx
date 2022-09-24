import { useState } from 'react';

// components
import Home from './component/body/Home'
import Header from './component/header/Header';
import Automator from './component/body/Automator';

// css
import './App.css';

function App() {
  const [nav, setNav] = useState<number>(0);



  const renderSwitch = ()=>{
    switch(nav){
      case 0:
        return <Home/>
      case 1:
        return <Automator/>
    }
  }

  return (
    <div className="App">
      <Header nav={nav} setNav={(value)=>setNav(value)}/>
      {renderSwitch()}
    </div>
  );
}

export default App;
