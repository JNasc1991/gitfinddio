import React from 'react';
import "./styles.css"

const ItemList = ({title,description, link}) => {
    console.info({title,description, link})
    return (
        <div className={"item-list"}>
            <strong> <a href={link} target="_blank">{title}</a></strong>
            <p>{description}</p>
            <hr/>
        </div>
    );
};

export default ItemList;