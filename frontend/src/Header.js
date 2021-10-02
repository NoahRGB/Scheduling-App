import "./style.css";

const Header = ({ todayInfo }) => {
    const endingConversions = ["st", "nd", "rd"]; 

    const addDayEnding = (day) => {
        if (day) {
            const attempt = endingConversions[day-1];
            return (attempt ? attempt : "th");
        }
    }


    return (
        <div className="header">
            <h1>Calendar</h1><br/>
            <h2>{`${`${todayInfo.day}${addDayEnding(todayInfo.day)}`} ${todayInfo.month}, ${todayInfo.year}`}</h2>
        </div>
    );
}

export default Header;