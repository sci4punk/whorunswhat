import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import './login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { usernameInput: '', passwordInput: '' };
    this.service = new AuthService();
  }

  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value})
  }

  tryToLogin = (e) =>{
    e.preventDefault();
    const uName = this.state.usernameInput;
    const pWord = this.state.passwordInput;   
    this.service.login(uName, pWord)
    .then(()=>{
      this.props.toggleForm('login');
      this.props.getUser();
      // this.props.history.push('/dashboard');
    })
  }

  render(){
    return(
      
      <form onSubmit = {this.tryToLogin}>
        <div className="container login-form border rounded bg-dark">
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" value={this.state.usernameInput}
              name="usernameInput"
              onChange={this.handleChange}
              placeholder="username"
              />
              </div>
              
              <div className="col">
              <input className="form-control" type="password" value={this.state.passwordInput} 
                name="passwordInput"
                onChange={this.handleChange}
                placeholder="password"
              />
              </div>
              {/* <div className="col"> */}
              <button className="btn btn-sm btn-primary">Login</button>
            {/* </div> */}
          </div>
        </div>
      </form>

    )
  }
}

export default Login;