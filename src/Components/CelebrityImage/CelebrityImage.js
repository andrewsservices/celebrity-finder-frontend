import React from 'react';
import './CelebrityImage.css'


const CelebrityImage = ({imageUrl,box}) => {

    return(
        <div className="celebrity-image center ma">
            <div className="absolute mt2 ">
                {imageUrl?
                    <>
                        <img className='celebrity-image' alt="faceImage" id="inputImage" src={imageUrl} width="auto" height="350px"/>
                        <div className="bounding-box" style={{top: box.topRow,right: box.rightCol,bottom: box.bottomRow,left: box.leftCol}}></div>
                    </>
                    : ""
                }
            </div>
        </div>
    )
}

export default CelebrityImage;