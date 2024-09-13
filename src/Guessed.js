import React from "react";
import { findByPlaceholderText } from "@testing-library/react";


function Guessed(props) {
    const emptyGuessedArray = props.emptyGuessedArray
   
    return (
        <div className="letters_guess container mt-5 mb-5 text-center ">
            {emptyGuessedArray.map((item, index) => {
                return <span
                    className={`"" ${item === "_" ? "ms-4 p-0 fs-5 fw-bold text-primary " : "empty-span media-fs ms-3 p-1 fs-6 fs-md-5 fw-bold text-uppercase"}`}
                    key={index}
                >
                    {item}</span>
            })}
  
        </div>
    )
}

export default Guessed

