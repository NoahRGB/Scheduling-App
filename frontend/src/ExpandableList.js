import "./style.css";
import expandIcon from "./assets/expand.svg";
import { useState } from "react";

const Expansion = ({ items }) => {
    return (
        <div className="expansion">
            <ul>
                { items.map(item => 
                    <li key={item}><p>{item}</p></li>
                ) }
            </ul>
        </div>
    );
}

const ExpandableList = ({ name, listItems }) =>  {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="expandable-list">
            <div className="center-text clickable" onClick={toggleExpansion}>
                <p>{name}</p>
                <img className="icon" src={expandIcon}/>
            </div>
            { isExpanded && <Expansion items={listItems}/> } 
        </div>
    );
}


export default ExpandableList;