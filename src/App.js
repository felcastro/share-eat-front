import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Toolbar from './Navbar/Navbar';
import Places from './Places/Places';
import Place from './Place/Place';
import Plate from './Plate/Plate';

const App = () => (
  <Router>
    <div className="App">
      <Toolbar />
      <Switch>
        <Route exact path="/" component={Places}/>
        <Route path="/place/:id/new" component={Plate}/>
        <Route path="/place/:id/plate/:plateId" component={Plate}/>
        <Route path="/place/:id" component={Place}/>
      </Switch>
    </div>
  </Router>
);

export default App;
