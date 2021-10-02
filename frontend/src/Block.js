import "./style.css";

const Block = ({ date, colour }) => {
    const classes = `block ${colour}`
    return (
        <div className={classes}>
            <p>{ date }</p>
        </div>
    );
}

export default Block;