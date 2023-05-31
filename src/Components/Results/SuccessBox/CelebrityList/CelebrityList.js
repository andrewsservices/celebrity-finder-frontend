import React from 'react';
import Celebrity from './Celebrity/Celebrity';
import './CelebrityList.css'


const CelebrityList = ({celebrities}) => {

    return(
        <>

            {celebrities.length > 0 ?
                        <div className="celebrity-list mw7 center br3 pa3 pa4-ns ba b--black-10">
                        <div className="mt2">
                            <p className="f3">
                                Celebrity Software Results:
                            </p>
                            <ol>
                            {celebrities.slice(0, 5).map(celebrity=>{
                                return <li key={celebrity.id}>
                                            <Celebrity
                                                percentage={(celebrity.value * 100).toFixed(2)}
                                                name={celebrity.name.toUpperCase()}
                                            />
                                        </li>
                            })}
                            </ol>

                        </div>
                    </div>
            :""}


        </>

    )
}

export default CelebrityList;