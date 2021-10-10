import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import BlockContainer from "./BlockContainer";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";
import { LoginContext } from "./Context";
import "./style.css";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [currentDateInfo, setCurrentDateInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState("");

  const ctx = useContext(LoginContext);

  const monthStringConversions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthDayConversions = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const populateDateInfo = async () => {
    //sets date info state (for header)
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    setCurrentDateInfo({day, month:monthStringConversions[month], year});
    //sets date block state (for calendar display)
    let newDateBlocks = [];
    for (let i = 1; i <= monthDayConversions[month]; i++) {
      const fullDate = `${i}/${month+1}/${year}`;
      let activities = await fetchActivities(fullDate);
      newDateBlocks.push({
        id: i,
        date: fullDate,
        activities,
        isToday: i === day
      });
    }
    setBlocks([...blocks, ...newDateBlocks]);
  }

  const fetchActivities = async date => {
    let response = await fetch("http://localhost:8000/getactivities", {
      method: "POST",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, username:userLoggedIn })
    });
    let data = await response.json();
    return data;
  }

  useEffect(() => {
    populateDateInfo();
  }, []);

  return (
    <div className="App">    
      <BrowserRouter>
        <LoginContext.Provider value={{setIsAuthenticated, setUserLoggedIn}}>
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
            <Header todayInfo={currentDateInfo}/>
            <BlockContainer blocks={blocks}/>
          </Route>
        </LoginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;