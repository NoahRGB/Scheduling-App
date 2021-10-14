import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"

import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";
import Calendar from "./Calendar";
import EventAdder from "./EventAdder";
import { AppContext } from "./Context";
import "./style.css";

function App() {
  const accessSessionStorage = (name) => {
    return sessionStorage.getItem(name);
  }

  const setSessionStorage = (name, value) => {
    sessionStorage.setItem(name, value);
  }
  
  const ctx = useContext(AppContext);

  return (
    <div className="App">    
      <BrowserRouter>
        <AppContext.Provider value={{setSessionStorage, accessSessionStorage}}>
          <Switch>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/">
              <Homepage/>
            </Route>
          </Switch>
          <Route exact path="/calendar">
            <Calendar/>
          </Route>
          <Route exact path="/add-event">
            <EventAdder/>
          </Route>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;