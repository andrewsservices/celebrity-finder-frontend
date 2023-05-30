import React from 'react';



const CelebrityImage = ({imageUrl}) => {

    return(
        <div className="celebrity-image center ma">
            <div className="absolute mt2 ">
                {imageUrl?
                    <>
                        <img className='celebrity-image' alt="faceImage" id="inputImage" src={imageUrl} width="auto" height="350px"/>
                    </>
                    : ""
                }
            </div>
        </div>
    )
}

export default CelebrityImage;