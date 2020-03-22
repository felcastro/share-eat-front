import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './Navbar/Navbar';
import PlaceList from './PlaceList/PlaceList';
import Place from './Place/Place';
import Plate from './Plate/Plate';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={PlaceList}/>
        <Route path="/place/:id/new" component={Plate}/>
        <Route path="/place/:id/plate/:plateId" component={Plate}/>
        <Route path="/place/:id" component={Place}/>
      </Switch>
      </div>
      
    </div>
  </Router>
  );
}

export default App;
