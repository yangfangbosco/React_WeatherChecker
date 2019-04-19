import React from 'react';
import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';

const Api_Key = "84fdd1a2eb9a6747980765246ed61263";

class App extends React.Component{


  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();

    if(city && country){
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }else{
        this.setState({
        error: "Please enter the values..."
    })
  }
    
    
    console.log(response);
    
  }



  render(){
   return(
    <div>
    <div className="wrapper">
     <div className="main">
      <div className="container">
       <div className="row">
         <div className="col-xs-5 title-container">
           <Titles />
         </div>
         <div className="col-xs-7 form-container">
           <Form loadWeather={this.getWeather} />
           <Weather
             temperature={this.state.temperature}
             city={this.state.city}
             country={this.state.country}
             humidity={this.state.humidity}
             description={this.state.description}
             error={this.state.error}
           />
         </div>
        </div>
       </div>
      </div>
     </div>
   </div>
  )
 }
 
}








export default App;
