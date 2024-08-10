interface WeatherProps {
    temp: number;
    description: string;
}

const Weather = ({ temp, description }:WeatherProps) => {
    return (
        <div className="weather">
            <p className="temperature">Temperature: {temp} °C</p>
            <p className="description">Weather: {description}</p>
        </div>
    );
};

export default Weather;