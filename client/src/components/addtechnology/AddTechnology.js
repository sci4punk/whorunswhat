import React, { Component } from 'react';
import axios from 'axios';
import './addtechnology.css';


class AddTechnology extends Component {
  constructor(props){
      super(props);
      this.state = { 
        techName: "", 
        techIconUrl: "",
        techDescription: "",
        techRefUrl: "",
        techTopic: "",
      };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE}/technologies`, {
      techName: this.state.techName,
      techIconUrl: this.state.techIconUrl,
      techDescription: this.state.techDescription,
      techRefUrl: this.state.techRefUrl,
      techTopic: this.state.techTopic,
      theCompany: this.props.theCompanyToAddTechnologiesTo,
    }, {withCredentials: true })
    .then( () => {
      this.props.getData();
      // this function updates the list in CompanyIndex.js
      this.setState({
        techName: "", 
        techIconUrl: "",
        techDescription: "",
        techRefUrl: "",
        techTopic: "",
      });
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      
      <span>
      {/* <h3 className="card-header">{this.state.companyName}</h3> */}
      <form className="card-body" onSubmit={this.handleFormSubmit}>
          <label>Technology Name:</label>
          <input className="form-control" type="text" name="techName" value={this.state.techName} onChange={ e => this.handleChange(e)}/>
          <label>Technology Icon URL:</label>
          <input className="form-control" type="text" name="techIconUrl" value={this.state.techIconUrl} onChange={ e => this.handleChange(e)} />
          <label>Technology Description:</label>
          <textarea className="form-control" name="techDescription" rows="3" value={this.state.techDescription} onChange={ e => this.handleChange(e)} />
          <label>Technology Reference URL:</label>
          <input className="form-control" type="text" name="techRefUrl" value={this.state.techRefUrl} onChange={ e => this.handleChange(e)} />
          <label>Topic:</label>
          <select className="form-control" name="techTopic" value={this.state.techTopic} onChange={ e => this.handleChange(e)}>
            <option value="Full Stack">Full Stack</option>
            <option value="Front End">Front End</option>
            <option value="Backend">Backend</option>
            <option value="Systems">Systems</option>
            <option value="Data">Data</option>
          </select>          
          <div className="text-right">
            <input className="btn btn-sm btn-success save-cancel" type="submit" value="Add" />
          {/* <button className="btn btn-sm btn-secondary save-cancel" onClick={ e => this.props.resetEditingSituation()}>Cancel</button> */}
        </div>
      </form>
    </span>
    
    )
  }
}

export default AddTechnology;