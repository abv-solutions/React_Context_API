import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';
import ContextProvider from './context';

const App = () => {
  return (
    <ContextProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/lyrics/track/:id' component={Lyrics} />
            </Switch>
          </div>
        </>
      </Router>
    </ContextProvider>
  );
};

export default App;
