import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import './signup.css';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { 
      username: '', 
      password: '', 
      personalEmail: '', 
      fullName: '', 
      userRole: '', 
    };
    
    this.service = new AuthService();
  }

  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value})
  }

  tryToSignUp = (e) =>{
      e.preventDefault();
      const username = this.state.username;
      const password = this.state.password;
      const personalEmail = this.state.personalEmail;
      const fullName = this.state.fullName;
      const userRole = this.state.userRole;
    
    this.service.signup(username, password, personalEmail, fullName)
    .then(()=>{
        this.props.toggleForm('signup');
        this.props.getUser();
    })
  }

  render(){
    return(
      <form onSubmit = {this.tryToSignUp}>
        <div className="container login-form border rounded bg-dark">
          <div className="row">
            <div className="col">
            <input className="form-control" value={this.state.username} name="username" type="text" onChange={this.handleChange} placeholder="choose a username" />
            </div>
            <div className="col">
            <input className="form-control" value={this.state.password} name="password" type="password" onChange={this.handleChange} placeholder="enter a password" />
            </div>
            <div className="col">
            <input className="form-control" value={this.state.personalEmail} name="personalEmail" onChange={this.handleChange} placeholder="email address" />
            </div>
            <div className="col">
            <input className="form-control" value={this.state.fullName} name="fullName" onChange={this.handleChange} placeholder="full name" />
            </div>
            <button className="btn btn-sm btn-primary">Sign Up</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Signup;