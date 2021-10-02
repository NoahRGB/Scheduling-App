import Block from "./Block";

const BlockContainer = ({ blocks }) => {
    return (
        <div className="block-container">
            { blocks.map(block =>
                <Block key={block.id} date={block.date} colour={block.colour}/>
            ) }
        </div>
    );
}

export default BlockContainer;