import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import CompanyIndex from './components/companyindex/CompanyIndex';
import CompanyDetails from './components/companydetails/CompanyDetails';
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import AuthService from './services/AuthService';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
// import SearchResults from './components/searchresults/SearchResults';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      listOfCompanies: [],
      currentlyLoggedIn: null,
      ready: false,
      signupShowing: false,
      loginShowing: false,
      searchResults: [],
  };
  this.service = new AuthService();
  }

  getAllCompanies = () => {
    axios.get(`${process.env.REACT_APP_BASE}/companies`, {withCredentials: true})
    .then(responseFromApi => {
      this.setState({
        listOfCompanies: responseFromApi.data, ready: true
      })
    })
  }

  getCurrentlyLoggedInUser = () =>{
    this.service.currentUser()
    .then((theUser)=>{
      this.setState({currentlyLoggedIn: theUser})
    })
    .catch(()=>{
      this.setState({currentlyLoggedIn: null})
    })
  }

  toggleForm = (whichForm) =>{
    let theForm;
    if(whichForm === "signup"){
      theForm = 'signupShowing'
    } else {
      theForm = 'loginShowing'
    }
    this.setState({[theForm]: !this.state[theForm]})
  }
  
  // componentWillMount() {
  //   this.getAllCompanies();
  //   this.getCurrentlyLoggedInUser();
  // }

  componentDidMount() {
    this.getAllCompanies();
    this.getCurrentlyLoggedInUser();
  }


  render(){

    return (
      <div>
        <Navbar 
        theUser = {this.state.currentlyLoggedIn} 
        pleaseLogOut = {()=> this.service.logout()}
        toggleForm = {this.toggleForm}
        getUser = {this.getCurrentlyLoggedInUser}  
        />


        {this.state.signupShowing && 
          <div className="container-fluid mx-auto"><Signup getUser={this.getCurrentlyLoggedInUser} toggleForm={this.toggleForm} /></div>
        }

        {this.state.loginShowing && 
          <div className="container-fluid mx-auto"><Login getUser={this.getCurrentlyLoggedInUser} toggleForm={this.toggleForm} /></div>
        }

          <Search />

      <div className="container-fluid">
        
        <Switch>
          <Route exact path="/" render ={(props)=> <CompanyIndex
            {...props} 
            theUser = {this.state.currentlyLoggedIn} 
            allTheCompanies ={this.state.listOfCompanies}
            getData = {this.getAllCompanies}
            ready = {this.state.ready}
            />} />

          <Route exact path="/companies" render ={(props)=> <CompanyIndex
            {...props} 
            theUser = {this.state.currentlyLoggedIn} 
            allTheCompanies ={this.state.listOfCompanies}
            getData = {this.getAllCompanies}
            ready = {this.state.ready}
            />} />

          <Route exact path="/dashboard" render ={(props)=> <Dashboard
            {...props} 
            theUser = {this.state.currentlyLoggedIn} 
            allTheCompanies ={this.state.listOfCompanies}
            getData = {this.getAllCompanies}
            ready = {this.state.ready}
            />} />

          <Route exact path="/companies/:theID" render ={(props)=> <CompanyDetails
            {...props} 
            allTheCompanies ={this.state.listOfCompanies}
            ready = {this.state.ready}
            getData = {this.getAllCompanies}
            theUser = {this.state.currentlyLoggedIn}
            />} />

          {/* <Route exact path="/searchresults" render ={(props)=> <SearchResults
            {...props} 
            allTheCompanies ={this.state.listOfCompanies}
            ready = {this.state.ready}
            getData = {this.getAllCompanies}
            theUser = {this.state.currentlyLoggedIn}
            />} /> */}


        </Switch>
      </div>
    </div>
    );
  }
}

export default App;
