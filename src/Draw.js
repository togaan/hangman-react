import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
function Draw(props) {
    const [attempts, setAttempts] = React.useState(8)
    React.useEffect(() => {
        setAttempts(prev => 8 - props.wrong)
    },[props.wrong])
    return (
        <div className="hangman_draw rounded-4  col-10 col-md-10 col-lg-6 container pb-2 pt-md-5 mauto ">
            
            <div className={`${props.wrong === 0 ? "d-none" : "d-block the_draw position-relative m-auto"}`}>
                <div className={` ${props.wrong <= 1 ? "d-none" : "d-block  the_stand position-absolute bg-white"}`}></div>

                <div className={` ${props.wrong <= 2 ? "d-none" : "d-block the_hang"}`}>
                    <div className="row-hang position-absolute bg-white"></div>
                    <div className="colomn-hang position-absolute bg-white"></div>
                </div>

                <div className={`${props.wrong <= 3 ? "d-none" : "d-block the_rope position-absolute rounded-circle"}`}></div>

                <div className="the_man">
                    <div className={`${ props.wrong <= 4 ? "d-none" : "d-block head position-absolute rounded-circle"}`}></div>
                    <div className={`${props.wrong <= 5 ? "d-none" :  "d-block body  position-absolute bg-white"}`}></div>
                    <div className={`${props.wrong <= 6 ? "d-none" : "d-block hands"}`}>
                        <div className="left-hand position-absolute bg-white"></div>
                        <div className="right-hand position-absolute bg-white"></div>
                    </div>
                    <div className={`${props.wrong <= 7 ? "d-none" : "d-block legs"}`}>
                        <div className="left-leg position-absolute bg-white"></div>
                        <div className="right-leg position-absolute bg-white"></div>
                    </div>
                </div>
            </div>

            {props.wrong >= 1 && <div className="attempts alert alert-warning d-flex align-items-center ms-5 ms-sm-0 mt-0 mt-md-5 p-1 " role="alert">
                 <FontAwesomeIcon icon={faTriangleExclamation}  className= 'me-2' />
                <div className="--bs-warning fw-bold">
                    You have <span className={`${attempts <= 3 && "danger"}`}>{attempts}</span> {attempts <= 1 ? 'attempt' : "attempts"} left</div>
            </div>}
        </div>
    )
}

export default Draw 