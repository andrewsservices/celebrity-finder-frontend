import React from 'react';
import './LoadingBox.css'


function LoadingBox(){
    return(
        <div className="loading-box-main-container br3 ba b--black-10 mv4 w-100 w-50-m mw7 shadow-5 center">
            <div className="loading-box-container mw7">
                <p className="f3">Loading...</p>
                <div className="progress">
                    <div className="color"></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingBox;