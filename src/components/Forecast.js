import React from 'react';
import moment from 'moment';
import ReactAnimatedWeather from 'react-animated-weather';


const Forecast = (props) => {
    const iconDefaults = {
        icon: 'PARTLY_CLOUDY_DAY',
        color: '#ffb300',
        size: 50,
        animate: true
    };

    const forecast = props.forecast;
    const content = [];
    for ( let i=1; i < forecast.length ; i++){
        const {
            temperatureHigh,
            summary,
            time,
            icon

        } = forecast[i];
        const now = moment.unix(time).format('dddd');
        iconDefaults.icon = icon.replace(/-/g,'_').toUpperCase();
        content.push(
        <div className="forecast-detail" key={i}>
            <div className="time">
                <p>{ now ? now : <span>Loading...</span>}</p>
            </div>
            <div className="forecast-image">
            <ReactAnimatedWeather
                        icon={iconDefaults.icon}
                        color={iconDefaults.color}
                        size={iconDefaults.size}
                        animate={iconDefaults.animate}
                        />
            </div>
            <div className="temp">
                <p>{temperatureHigh ? temperatureHigh : <span>Loading...</span>}&#8451;</p>
            </div>
            <div className="description">
                <p>{ summary ? summary : <span>Loading...</span>}</p>
            </div>
        </div>)
    }
    return (
            <div className="forecast-main">
                { content }
            </div>
    )
}

export default Forecast;
