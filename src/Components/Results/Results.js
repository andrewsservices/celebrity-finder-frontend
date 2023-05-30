import CelebrityImage from "./CelebrityImage/CelebrityImage";
import CelebrityList from "./CelebrityList/CelebrityList";

function Results({imageUrl,box,celebrities}){
    return(
        <>
            <CelebrityImage
              imageUrl={imageUrl}
              box={box}
            />
            <CelebrityList
              celebrities = {celebrities}
            />
        </>
    )
}

export default Results;