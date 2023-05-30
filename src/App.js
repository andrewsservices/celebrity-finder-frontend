import { Component } from 'react';
import Particle from './Components/Particle';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Results from './Components/Results/Results';
import './App.css';





const initialState = {
  input: "",
      imageUrl: "",
      box:{},
      displayCelebrityList: false,
      celebrities:[],
      route: 'home',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component{
  constructor(){
    super()
    this.state = initialState
  }


  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }



  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }




  getData=(data)=>{

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
    console.log(image)

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
    fetch('https://pure-wildwood-43456.herokuapp.com/imageurl', {
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body:JSON.stringify({
                  input:this.state.input
              })
            })

        .then(response => response.json())
        .then(response=>{
          if(response){
            fetch('https://pure-wildwood-43456.herokuapp.com/image', {
              method:'put',
              headers:{'Content-Type': 'application/json'},
              body:JSON.stringify({
                  id:this.state.user.id
              })
            })
            .then(response=>response.json())
            .then(count=> {
              this.setState(Object.assign(this.state.user,{
                entries:count
              }))
            })
            .catch(console.log)
          }
          this.getData(response)})
        .catch(error => console.log('error', error));

  }

onRouteChange = (route) => {

  if(route === 'signout'){
    this.setState(initialState)
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
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}
            />
            <Results
              imageUrl={imageUrl}
              box={box}
              celebrities = {celebrities}
            />
          </>
           :
           (
            this.state.route === 'signin' ?
            <SignIn
            onRouteChange = {this.onRouteChange}
            loadUser={this.loadUser}
          /> :
            <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
            />
           )

        }
      </div>



    )
  }
}

export default App;
