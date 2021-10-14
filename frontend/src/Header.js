import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import "./style.css";

const Header = () => {
    const ctx = useContext(AppContext);
    const [dateInfo, setDateInfo] = useState(JSON.parse(ctx.accessSessionStorage("dateInfo")));

    const monthStringConversions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const endingConversions = ["st", "nd", "rd"];

    const addDayEnding = (day) => {
        if (day) {
            const attempt = endingConversions[day-1];
            return (attempt ? attempt : "th");
        }
    }


    return (
        <div className="header">
            <div className="title-section">
                <h1>Calendar</h1>
                <h2>{`${`${dateInfo.day}${addDayEnding(dateInfo.day)}`} ${monthStringConversions[dateInfo.month]}, ${dateInfo.year}`}</h2>
            </div>
            <div className="navigation">
                <a href="/login"><h1>Login</h1></a>
                <a href="/add-event"><h1>Add Events</h1></a>
            </div>
        </div>
    );
}

export default Header;