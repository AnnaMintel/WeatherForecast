import React, {useState} from 'react';
import './App.css';
import Weather from './Weather';

function App() {

    const [city, setCity] = useState<string>('');
    const[error, setError] = useState<string|null>(null);
    const [weather, setWeather] = useState<{temp: number, description: string} | null>(null);
    
    const fetchWeather = () => {
        const APIkey = 'd530e5a35f404c873f82bb29be51ae21';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if(json.cod==='404'){
                setError('City not found')
                setWeather(null)
            } else {
                setWeather({
                    temp: json.main.temp,
                    description: json.weather[0].description
                });
                setError(null);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError('An error occurred');
            setWeather(null);
         });
     }

     const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && fetchWeather();
    }

    return (
        <div className="App">
        <h1 className="title">Weather Forecast</h1>
        <div className="input-container">
            <input type="text" value={city} onChange={(e) => setCity(e.currentTarget.value)} onKeyDown={enterPress} className="input-field" />
            <button onClick={fetchWeather} className="submit-button">Get weather</button>
        </div>
        {error &&<div className="error-message">{error}</div>}
        {weather && <Weather temp={weather.temp} description={weather.description} /> }
    </div>
    );
}

export default App;