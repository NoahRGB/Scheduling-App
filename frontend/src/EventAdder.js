import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"; 
import { AppContext } from "./Context";

const EventAdder = ({ dateInfo }) => {
    const [newEvent, setNewEvent] = useState("");

    const ctx = useContext(AppContext);
    const history = useHistory();

    const addEvent = async (event) => {
        const dateInfo = JSON.parse(ctx.accessSessionStorage("dateInfo"));
        let response = await fetch("http://localhost:8000/add-event", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                activity:event, 
                username:ctx.accessSessionStorage("username"), 
                dateInfo
            })
        });
        let data = await response.json();
        return data;
    }

    const onSubmit = async () => {
        const authCheck = await addEvent(newEvent);
        if (authCheck.status === "success") {
            history.push("/calendar");
        } else if (authCheck.status === "fail") {
            alert("Login attempt failed");
        }
    }

    const pd = (e) => e.preventDefault();

    return (
        <>
            <div className="form-page">
                <div className="form-container">
                    <h1>Add New Event</h1>
                    <form action="http://localhost:8000/add-activity" method="POST" onSubmit={pd}>
                        <label htmlFor="text">Event:</label><br/>
                        <input name="text" className="input" onChange={_ => setNewEvent(_.target.value)}/><br/>
                        <input type="submit" value="Add Event" onClick={e => onSubmit()}/>
                    </form>
                </div>
            </div>
        </>
    );
}




export default EventAdder;