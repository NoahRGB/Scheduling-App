import React, { useContext } from "react";
import { LoginContext } from "./Context";
import "./style.css";

const Header = () => {
    const endingConversions = ["st", "nd", "rd"];

    const ctx = useContext(LoginContext);

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
                <h2>{`${`${ctx.currentDateInfo.day}${addDayEnding(ctx.currentDateInfo.day)}`} ${ctx.currentDateInfo.month}, ${ctx.currentDateInfo.year}`}</h2>
            </div>
            <div className="navigation">
                <a href="/login"><h1>Login</h1></a>
                <a href="/add-event"><h1>Add Events</h1></a>
            </div>
        </div>
    );
}

export default Header;