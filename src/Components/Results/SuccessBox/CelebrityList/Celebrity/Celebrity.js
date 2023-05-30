import React from 'react';

const Celebrity = ({percentage,name}) => {
    
    return(
        <div>
            
                <p style={{marginTop:"0",textAlign:"left"}}>{percentage}% chance this photo contains <span style={{color:"red"}}>{name}</span></p>
            
        </div>
    )
}

export default Celebrity;