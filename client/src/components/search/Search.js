import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      listOfCompanies: [],
      companiesListClone: [],
      searchField: '',
      companyName: '',
      companySiteUrl: '',
      companyLogoUrl: '', 
      apiCompaniesList: [],
    };
  }

  getAllCompanies = () => {
    axios.get(`${process.env.REACT_APP_BASE}/companies`)
    .then(responseFromApi => {
      this.setState({
        listOfCompanies: responseFromApi.data,
        companiesListClone: responseFromApi.data,
        ready: true
      })
    })
  }

  onInputChange=(e)=>{
    console.log(e.target.name, e.target.value);
      const { name, value } = e.target;
      this.setState({ [name]: value });
      this.checkForCompany();

    }

  async checkForCompany() {
    console.log("checking for company")
    let filteredCompaniesApi = [];
      let companyListClone = [...this.state.listOfCompanies];
      console.log("the company list in state -=---- ", companyListClone)
      const matchedCompanies = companyListClone.filter((company, i) => {
      return (company.companyName.toUpperCase().includes(this.state.searchField.toUpperCase()))
      }  
    )
    if(matchedCompanies.length <= 1){
      console.log("the if condition in the search")
      let companiesFromApi = await this.getData(this.state.searchField);
      console.log("the companies from the api >>>>>>>>>>>>>>>>>>>>>>> ", companiesFromApi)

      matchedCompanies.forEach(oneCompany => {
        console.log("the first for each ===== ", oneCompany);
        companiesFromApi.forEach(apiCompany => {
          console.log("match this <<<<<< ", oneCompany.companyName.toUpperCase(), " >>>>>>>>>>>>>>>> ", apiCompany.name.toUpperCase(), " ======== ", String(apiCompany.name.toUpperCase()) === String(oneCompany.companyName.toUpperCase()))
          if(String(apiCompany.name.toUpperCase()) !== String(oneCompany.companyName.toUpperCase())) {
            filteredCompaniesApi.push(apiCompany);
          }
        })
      })
      if(matchedCompanies.length === 0 && companiesFromApi.length > 0) {
        filteredCompaniesApi = companiesFromApi;
      }
    }
        
    filteredCompaniesApi.forEach(oneCompany => {
      axios.post(`${process.env.REACT_APP_BASE}/companies/create`, {
        companyName: oneCompany.name,
        companyDomain: oneCompany.domain,
        companyLogoUrl: oneCompany.logo
      }, {withCredentials: true })
      .then(result => {
        matchedCompanies.push(result)
      }).catch(err => {
        console.log(err)
      })
    })
    
    console.log('matched:', matchedCompanies,'filtered:', filteredCompaniesApi)
    this.setState({companiesListClone: matchedCompanies, apiCompaniesList: filteredCompaniesApi});
    this.props.getSearchResults(this.state.companiesListClone)
  };

  getData(name) {
    return axios.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + name)
      .then((response) => {
        return response.data;
      })
    }

  componentWillMount(){
    this.getAllCompanies();
  }

  render(){
    return(
    <div className="container">
      <div className="input py-4">
            <input className="form-control form-control-lg" 
            type="search" 
            id="example-search-input" 
            name="searchField" 
            value={this.state.searchField} 
            onChange={(e)=>{this.onInputChange(e)}} 
            placeholder="enter a company name..." 
            />
      </div>
    </div>
    )}
}

export default Search;