import Header from "./Header";
import BlockContainer from "./BlockContainer";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "./Context";

const Calendar = ({ todayInfo }) => {
    const [blocks, setBlocks] = useState([]);

    const monthStringConversions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthDayConversions = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const ctx = useContext(LoginContext);
  
    const populateDateInfo = async () => {
        //sets date info state (for header)
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        ctx.setCurrentDateInfo({day, month:monthStringConversions[month], year});
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
        body: JSON.stringify({ date, username:ctx.userLoggedIn })
      });
      let data = await response.json();
      return data;
    }
  
    useEffect(() => {
      populateDateInfo();
    }, []);

    return (
        <>
            {console.log(ctx.userLoggedIn)}
            <Header/>
            <BlockContainer blocks={blocks}/>
        </>
    );
}

export default Calendar;