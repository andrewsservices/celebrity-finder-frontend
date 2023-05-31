import actor from './actor.png'
import './FailureBox.css'

function FailureBox({clearForm}){
    return(
      <div className="failure-box mw7 center br3 pa3 pa4-ns ba b--black-10">
      <div className="flex mt2">
          <p className="f3">
              Unable to detect, please try a different image.
          </p>
          <img src={actor} alt="actor"/>
      </div>
      <button onClick={clearForm} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Clear Form</button>
  </div>
    )
}

export default FailureBox