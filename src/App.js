import { Component } from 'react';
import Particle from './Components/Particle';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Results from './Components/Results/Results';
import LeaderBoad from './Components/LeaderBoard/LeaderBoard';
import './App.css';





const initialState = {
  isLoading: false,
  input: "",
  imageUrl: "",
  displayCelebrityList: false,
  celebrities:[],
  route: 'signin',
  isSignedIn: false,
  failedToLoad: false,
  displayLoginErrorForm:false,
  emptyFields:false,
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
    console.log(data)
    if(data){
      this.setState({isLoading:false})
    }
    if(data.outputs[0].data.regions.length === 1){
      console.log("update count")
      fetch('https://pure-wildwood-43456.herokuapp.com/image', {
        method:'put',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            id:this.state.user.id
        })
      })
      .then(response=>response.json())
      .then(count=> {
        console.log(count)
        this.setState(Object.assign(this.state.user,{
          entries:count
        }))
      })
      .catch(console.log)
      const celebrityData = data.outputs[0].data.regions[0].data.concepts
      this.getCelebrityData(celebrityData)
    } else {
      console.log("don't update count")
    }

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
          this.getData(response)})
          .catch(error => {
            console.log('errorrrrr', error)
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
  this.setState({
    route:route,
    displayLoginErrorForm:false,
    emptyFields:false
  })
}

clearForm = () => {
  const inputForm = document.getElementById('input')
  inputForm.value = ""
  this.setState({
    imageUrl: "",
    failedToLoad: false,
    celebrities:[]
  })
}

setDisplayLoginErrorForm = () => {
  this.setState({
    displayLoginErrorForm:true
  })
}

setRemoveLoginErrorForm = () => {
  this.setState({
    displayLoginErrorForm:false
  })
}

setEmptyFields = () => {
  this.setState({
    emptyFields:true
  })
}

  render(){
     const {isSignedIn,imageUrl,celebrities,route,isLoading,failedToLoad,displayLoginErrorForm,emptyFields} = this.state
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
          route === 'leaderboard'
          ?
          <LeaderBoad/>
          :
           (
            this.state.route === 'signin' ?
            <SignIn
              onRouteChange = {this.onRouteChange}
              loadUser={this.loadUser}
              displayLoginErrorForm={displayLoginErrorForm}
              setDisplayLoginErrorForm={this.setDisplayLoginErrorForm}
              setRemoveLoginErrorForm={this.setRemoveLoginErrorForm}
              emptyFields={emptyFields}
              setEmptyFields={this.setEmptyFields}
          /> :
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
              emptyFields={emptyFields}
              setEmptyFields={this.setEmptyFields}
            />
           )

        }
      </div>



    )
  }
}

export default App;
