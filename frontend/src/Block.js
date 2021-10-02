import ExpandableList from "./ExpandableList";
import "./style.css";

const Block = ({ date, activities, isToday }) => {
    const classes = `block ${isToday && "block-highlight"}`
    return (
        <div className={classes}>
            <p>{ date }</p><br/>
            <ExpandableList name="Events" listItems={activities}/>
        </div>
    );
}

export default Block;