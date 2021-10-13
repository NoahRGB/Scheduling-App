import Block from "./Block";

const BlockContainer = ({ blocks }) => {

    return (
        <div className="block-container">
            { blocks.map(block =>
                <Block key={block.id} date={block.date} activities={block.activities} isToday={block.isToday}/>
            ) }
        </div>
    );
}

export default BlockContainer;