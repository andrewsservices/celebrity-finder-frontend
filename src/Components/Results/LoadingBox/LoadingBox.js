import React from 'react';
import './LoadingBox.css'


function LoadingBox(){
    return(
        <div className="loading-box-container mw7">
            <p className="f3">Loading Results...</p>
            <div className="progress">
                <div className="color"></div>
            </div>
        </div>
    )
}

export default LoadingBox;