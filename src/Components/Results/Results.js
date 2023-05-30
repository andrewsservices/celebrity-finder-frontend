import FailureBox from './FailureBox/FailureBox';
import LoadingBox from './LoadingBox/LoadingBox'
import SuccessBox from "./SuccessBox/SuccessBox";

function Results({imageUrl,box,celebrities,isLoading,failedToLoad,clearForm}){
    return(
      isLoading
      ?
      <LoadingBox/>
      :
      (
        failedToLoad
        ?
        <FailureBox
          clearForm={clearForm}
        />
        :
        <SuccessBox
          imageUrl={imageUrl}
          box={box}
          celebrities={celebrities}
        />
      )
    )
}

export default Results;