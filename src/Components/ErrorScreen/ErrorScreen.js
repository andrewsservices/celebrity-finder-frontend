import reserved from './reserved.png'
import './ErrorScreen.css'

function ErrorScreen({setRemoveLoginErrorForm}){
    return(
      <div id="error-form" className="error-screen mw7 center br3 pa3 pa4-ns ba b--black-10">
      <div className="flex mt2">
          <p className="f3">
              Access Denied (Incorrect Credentials).
          </p>
          <img src={reserved} alt="actor"/>
      </div>
      <button onClick={setRemoveLoginErrorForm} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Retrurn</button>
  </div>
    )
}

export default ErrorScreen