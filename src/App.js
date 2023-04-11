import { Component } from 'react';
import Particle from './Components/Particle';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import CelebrityImage from './Components/CelebrityImage/CelebrityImage'
import CelebrityList from './Components/CelebrityList/CelebrityList'
import './App.css';


const MODEL_ID = 'celebrity-face-detection';



class App extends Component{
  constructor(){
    super()
    this.state = {
      input: "",
      imageUrl: "",
      box:{},
      displayCelebrityList: false,
      celebrities:[],
      route: 'signin',
      isSignedIn: false
    }
  }
 

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

   setupFacialRecognition = (imageUrl) => {
    const PAT = '7dd0e980d6e44a2f934fd2c3fc92a8ad';
        
    const USER_ID = 'odhtdsq8ur5s';       
    const APP_ID = 'my-first-application';
  
  
  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": imageUrl
                  }
              }
          }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    return requestOptions;
  }


  getData(data){
    const celebrityData = data.outputs[0].data.regions[0].data.concepts

    this.getCelebrityData(celebrityData)

    const boxData = data.outputs[0].data.regions[0].region_info.bounding_box

    this.setState({box:this.createFaceBox(boxData)})
   
  }

  getCelebrityData = (data) => {
    
    this.setState({celebrities:data})

  }
      

  createFaceBox = (data) => {
    


    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height)

    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height)
    }
  }


  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", this.setupFacialRecognition(this.state.input))
        .then(response => response.json())
        .then(result=>this.getData(result))
        .catch(error => console.log('error', error));

  }

onRouteChange = (route) => {
  
  if(route === 'signout'){
    this.setState({isSignedIn:false})
  } else if (route === 'home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}

  render(){
     const {isSignedIn,imageUrl,box,celebrities,route} = this.state
    return(
      <div className="App">
        <Particle/>
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' 
          ? 
          <>
            <Logo/>
            <Rank/>
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}  
            />
            <CelebrityImage
              imageUrl={imageUrl}
              box={box}    
            />  
            <CelebrityList
              celebrities = {celebrities}
            />  
          </>
           : 
           (
            this.state.route === 'signin' ? 
            <SignIn
            onRouteChange = {this.onRouteChange}
          /> : 
            <Register
            onRouteChange={this.onRouteChange}
            />
           )
          
        }
      </div>
        
       
      
    )
  }
}

export default App;
