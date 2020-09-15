import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import NavBar from './components/views/NavBar/NavBar.js';
import Footer from './components/views/Footer/Footer.js';

function App() {
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path='/' component={LandingPage} />
          <Route exact path='/LoginPage' component={LoginPage} />
          <Route exact path='/RegisterPage' component={RegisterPage} />
          <Route exact path='/NavBar' component={NavBar} />
          
          <Route exact path='/Footer' component={Footer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
