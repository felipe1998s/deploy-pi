import './App.css';
import {Landing,Home,Form,Detail} from './views';
import { BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import NotFound from './views/NotFound/NotFound';
import axios from "axios";
axios.defaults.baseURL = "deploy-pi-production-c2d1.up.railway.app"; 

function App() {

  const location=useLocation();
  console.log(location);
  
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path ="/home" render={()=><Home/>}></Route>
            <Route exact path ="/create" component={Form}></Route>
            <Route exact path ="/pokemon/:name/:id" component={Detail} ></Route>
            <Route path='*' component={NotFound} ></Route>
          </Switch>
      </Router>      
    </div>
  );
}

export default App;
