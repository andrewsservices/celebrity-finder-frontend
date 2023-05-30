import FailureBox from './FailureBox/FailureBox';
import LoadingBox from './LoadingBox/LoadingBox'
import SuccessBox from "./SuccessBox/SuccessBox";

function Results({imageUrl,box,celebrities}){
    return(
      <>
        {/* <LoadingBox/> */}
        <SuccessBox
          imageUrl={imageUrl}
          box={box}
          celebrities={celebrities}
        />
        {/* <FailureBox/> */}
      </>
    )
}

export default Results;