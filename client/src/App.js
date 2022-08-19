import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from './components/Landingpage';
import Homepage from './components/Homepage'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
<Route exact path="/" component={LandingPage}/>
<Route exact path="/home" component={Homepage}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
