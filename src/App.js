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
  displayCelebrityList: false,
  celebrities:[],
  route: 'signin',
  isSignedIn: false,
  isLoading: false,
  failedToLoad: false,
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

  }

  getCelebrityData = (data) => {

    this.setState({celebrities:data})

  }



  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input,
      isLoading:true,
      failedToLoad:false
    })
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
            this.setState({isLoading:false})
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
        .catch(error => {
          console.log('error', error)
          this.setState({
            isLoading:false,
            failedToLoad:true
          })
        });

  }

onRouteChange = (route) => {

  if(route === 'signout'){
    this.setState(initialState)
  } else if (route === 'home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}

clearForm = () => {
  const inputForm = document.getElementById('input')
  inputForm.value = ""
  this.setState({
    imageUrl: "",
    failedToLoad: false
  })
}

  render(){
     const {isSignedIn,imageUrl,celebrities,route,isLoading,failedToLoad} = this.state
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
              isLoading={isLoading}
              celebrities = {celebrities}
              failedToLoad={failedToLoad}
              clearForm={this.clearForm}
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
