import CelebrityImage from "./CelebrityImage/CelebrityImage";
import CelebrityList from "./CelebrityList/CelebrityList";

function Success({imageUrl,box,celebrities}){
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

export default Success;