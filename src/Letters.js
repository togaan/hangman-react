import React from "react";


function Letters(props) {
   
    // display letters on the page 
    return (
    
        <span
            className={`
                " letter btn p-1 p-sm-2 pt-md-3 pb-md-3 col-1 col-md-2 m-1 m-lg-2 fs-6   text-uppercase "
                ${props.isClicked && "pe-none"}
                ${props.wrong === 8 && "pe-none"}
                ${props.isCorrect === "incorrect" ? "btn-warning" : props.isCorrect === "correct" ? " btn-success": "btn-info text-white fw-bold"}
                `}
            key={props.id}
            onClick={props.toggle}
        >
            { props.value}</span>
            
        
    )
}
export default Letters

