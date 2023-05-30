import actor from './actor.png'
import './FailureBox.css'

function FailureBox(){
    return(
      <div className="failure-box mw7 center bg-white br3 pa3 pa4-ns ba b--black-10">
      <div className="flex mt2">
          <p className="f3">
              Unable to detect, please try a different image.
          </p>
          <img src={actor} alt="actor"/>
      </div>
  </div>
    )
}

export default FailureBox