import React from 'react';
import './LeaderBoard.css'
import comingsoon from './coming-soon.png'

const LeaderBoad = () => {
    return(
        <div className="leaderboard">
            <div className="white f3">
                {`Today's Top Celebrity Finders...`}
            </div>
            <img src={comingsoon} alt="coming-soon"/>
        </div>
    )
}

export default LeaderBoad;