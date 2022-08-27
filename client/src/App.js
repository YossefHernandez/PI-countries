import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from './components/Landingpage';
import Homepage from './components/Homepage'
import Detail from './components/Countrydetail';
import createActivity from './components/Createactivity';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
<Route exact path="/" component={LandingPage}/>
<Route exact path="/home" component={Homepage}/>
<Route exact path="/createActivity" component={createActivity}/>
<Route exact path="/home/:id" component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
