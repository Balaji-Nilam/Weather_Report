import React,{useState} from 'react';
// eslint-disable-next-line no-unused-vars
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css';
function Scripting(){
    const[country_name,set_country_name]=useState("");
    const Result=(event)=>{
                
        const forecastElement = document.getElementById('forecast');
        console.log(country_name)
        const url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country_name}?key=E6V7PEWJXM9ZU4FL6B9ZSEFSJ`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            displayForecast(data)
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
        function displayForecast(forecast) {
                const days = forecast.days;
                const listItem = document.createElement('li');
                listItem.innerHTML =`
                Day:${days[0].datetime}
                <br/>
                Temperature range: ${days[0].tempmin} - ${days[0].tempmax} °F<br/>
                Feels like range: ${days[0].feelslikemin} - ${days[0].feelslikemax} °F<br/>
                Humidity: ${days[0].humidity}%<br/>
                Dew point: ${days[0].dew} °F<br/>
                Precipitation: ${days[0].precip} in<br/>
                Precipitation probability: ${days[0].precipprob}<br/>
                Snow: ${days[0].snow} in<br/>
                Snow depth: ${days[0].snowdepth} in<br/>
                Wind gust: ${days[0].windgust} mph<br/>
                `;
        const child = forecastElement.firstChild;
        if (child) {
            forecastElement.removeChild(child)
            forecastElement.appendChild(listItem);

        } else {
            forecastElement.appendChild(listItem);
        }
}

    event.preventDefault();
}
    return(
        <div className="container row">
            <div className='col-md-1'></div>
        <div className='col-md-5'>
        <h1>Weather Forecast</h1>
        <form onSubmit={Result}>
          <button className='button-css'><select id="country"  onChange={(e)=>{set_country_name(e.target.value)}}>
          <option value="">select your City</option>
          <option value="Vijayawada, AP, India">Vijayawada, AP</option>
          <option value="Hyderabad, TS, India">Hyderabad, TS</option>
          <option value="Bengaluru, KA, India">Bengaluru, KA</option>
          <option value="Mumbai, MH, India">Mumbai, MH</option>
          <option value="Pune, MH, India">Pune, MH</option>
          <option value="Delhi, DL, India">Delhi, DL</option>
          </select> 
          </button>                                                                                                                                     
         <br/>

        </form>
        <ul id="forecast"></ul>
    </div>
    </div>
    )
}

export default Scripting;