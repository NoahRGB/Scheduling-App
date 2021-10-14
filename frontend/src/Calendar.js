import Header from "./Header";
import BlockContainer from "./BlockContainer";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Context";
import { useHistory } from "react-router";

const Calendar = ({ todayInfo }) => {
    const [blocks, setBlocks] = useState([]);

    const monthStringConversions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthDayConversions = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const ctx = useContext(AppContext);
    const history = useHistory();
  
    const populateDateInfo = async () => {
        //sets date info state (for header)
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        ctx.setSessionStorage("dateInfo", JSON.stringify({day, month, year}));
        //sets date block state (for calendar display)
        let newDateBlocks = [];
        for (let i = 1; i <= monthDayConversions[month]; i++) {
            let activities = await fetchActivities(`${month+1}/${i}/${year}`);
            newDateBlocks.push({
            id: i,
            date: `${i}/${month+1}/${year}`,
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
        body: JSON.stringify({ 
          date, 
          username:ctx.accessSessionStorage("username"), 
        })
      });
      let data = await response.json();
      return data;
    }
  
    useEffect(() => {
      populateDateInfo();
    }, []);

    if (!ctx.accessSessionStorage("username")) {
      history.push("/login");
    }

    return (
        <>
        {console.log(ctx.accessSessionStorage("username"))}
            <Header/>
            <BlockContainer blocks={blocks}/>
        </>
    );
}

export default Calendar;