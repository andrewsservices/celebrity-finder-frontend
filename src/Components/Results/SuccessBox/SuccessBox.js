import CelebrityImage from "./CelebrityImage/CelebrityImage";
import CelebrityList from "./CelebrityList/CelebrityList";

function Success({imageUrl,celebrities}){
    return(
        <>
            <CelebrityImage
              imageUrl={imageUrl}
            />
            <CelebrityList
              celebrities = {celebrities}
            />
        </>
    )
}

export default Success;