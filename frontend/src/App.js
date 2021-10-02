import { useState, useEffect } from "react";
import BlockContainer from "./BlockContainer";
import Header from "./Header";
import "./style.css";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [currentDateInfo, setCurrentDateInfo] = useState({});

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
        isToday: i == day
      });
    }
    setBlocks([...blocks, ...newDateBlocks]);
  }



  const fetchActivities = async date => {
    let response = await fetch("http://localhost:8000/getactivities", {
      method: "POST",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    });
    let data = await response.json();
    return data;
  }

  useEffect(() => {
    populateDateInfo();

  }, []);

  return (
    <div className="App">
      <Header todayInfo={currentDateInfo}/>
      <BlockContainer blocks={blocks}/>
    </div>
  );
}

export default App;
