import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faWeight, faCloudRain, faWind} from '@fortawesome/free-solid-svg-icons'

const WeatherDetails = ({humidity, pressure, precipProbability, windSpeed}) => {
    return (
        <div className="weather-details">
            <div className="detail humidity">
                <div className="detail-image">
                <FontAwesomeIcon icon={faWater} />
                </div>
                <div className="detail-description">
                    <p className="title">Humidity</p>
                    <p className="value">{humidity !== undefined ? humidity : 'Loading...'}%</p>
                </div>
            </div>
            <div className="detail air-pressure">
                <div className="detail-image">
                <FontAwesomeIcon icon={faWeight} />
                </div>
                <div className="detail-description">
                    <p className="title">Air Pressure</p>
                    <p className="value">{pressure !== undefined ? pressure : 'Loading...'} hPa</p>
                </div>
            </div>
            <div className="detail chance-of-rain">
                <div className="detail-image">
                <FontAwesomeIcon icon={faCloudRain} />
                </div>
                <div className="detail-description">
                    <p className="title">Chance of Rain</p>
                    <p className="value">{precipProbability !== undefined? precipProbability : <span>Loading...</span> }%</p>
                </div>
            </div>
            <div className="detail windspeed">
                <div className="detail-image">
                <FontAwesomeIcon icon={faWind} />
                </div>
                <div className="detail-description">
                    <p className="title">Wind Speed</p>
                    <p className="value">{windSpeed !== undefined ? windSpeed : 'Loading...' } m/s</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetails;