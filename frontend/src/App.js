import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";
import Calendar from "./Calendar";
import EventAdder from "./EventAdder";
import { LoginContext } from "./Context";
import "./style.css";

function App() {
  const [currentDateInfo, setCurrentDateInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState("");
  //
  const ctx = useContext(LoginContext);

  return (
    <div className="App">    
      <BrowserRouter>
        <LoginContext.Provider value={{setIsAuthenticated, setUserLoggedIn, setCurrentDateInfo, userLoggedIn, currentDateInfo}}>
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
        </LoginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;