import { Component } from 'react';
import Particle from './Components/Particle';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import './App.css';


const MODEL_ID = 'face-detection';



class App extends Component{
  constructor(){
    super()
    this.state = {
      input: "",
      imageUrl: "",
      box: {}
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
      
  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", this.setupFacialRecognition(this.state.input))
        .then(response => response.json())
        .then(result=>this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
      
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }

  render(){
    return(
      <div className="App">
      <Particle/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit = {this.onButtonSubmit}  
      />
      <FaceRecognition
        imageUrl={this.state.imageUrl}
        box={this.state.box}
        
      />
    </div>
    )
  }
}

export default App;
