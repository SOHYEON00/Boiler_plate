import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import Auth from './hoc/auth.js';
// import NavBar from './components/views/NavBar/NavBar.js';
// import Footer from './components/views/Footer/Footer.js';

function App() {
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/LoginPage' component={Auth(LoginPage, false)} />
          <Route exact path='/RegisterPage' component={Auth(RegisterPage, false)} />
          {/* <Route exact path='/NavBar' component={Auth()NavBar} />
          
          <Route exact path='/Footer' component={Auth()Footer} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
