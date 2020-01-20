import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog} from '@fortawesome/free-solid-svg-icons'
import { getWeather } from '../actions';
import ReactAnimatedWeather from 'react-animated-weather';
import WeatherDetails from './WeatherDetails';
import LocationError from './LocationError';
import Forecast from './Forecast';


class MainWeather extends Component {
    state = {
        locationError: null,
        apiError: null
    }

    componentDidMount(){
        const handleLocationError = (error) => {
            console.log(error);
            switch(error.code){
                case error.TIMEOUT:
                    this.setState({
                        locationError: 'Location request timed out'
                    })
                    break;
                case error.POSITION_UNAVAILABLE:
                    this.setState({
                        locationError: 'Location information unavailable'
                    })
                    break;
                case error.PERMISSION_DENIED:
                    this.setState({
                        locationError: 'You have denied me access to your location'
                    })
                    break;
                default:
                    this.setState({
                        locationError: 'An unknown error occurred. Please reload to try again'
                    })
            }
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                this.props.onGetWeather(latitude, longitude)
            }, handleLocationError, options);
          } else {
              this.setState({
                locationError: 'Browser does not support geolocation.'
              })
          }

    }

    componentDidUpdate(prevProps){
        const { error } = this.props.weather;
        if(prevProps.weather.error !== error){
            this.setState({
                apiError: error
            })
        }
    }
    render(){
        const { weather: { weather } } = this.props;

        if (this.state.locationError || this.state.apiError) {
            return (
                    <LocationError
                        locationError={this.state.locationError}
                        apiError={this.state.apiError} />)
        }

        if(weather.loading || !weather[0] ){
            return (
                <div className="progress-bar">
                    <div><FontAwesomeIcon className="cog" icon={faCog} spin/></div>
                    <div><p>Waiting for location access...</p></div>
                </div>

            )
        }

        const {
            icon,
            temperature,
            humidity,
            pressure,
            precipProbability,
            time,
            windSpeed,
            summary } = weather[0].currently;

        const now = moment.unix(time).format('MMMM Do YYYY');
        const timezone = weather[0].timezone.replace('/', ', ');
        const iconDefaults = {
            icon: icon.replace(/-/g,'_').toUpperCase(),
            color: '#ffca28',
            size: 100,
            animate: true
        };

        const content =  (
            <main>
                <div className="main">
                    <div className="main-weather">
                        <div className="weather-image">
                            <ReactAnimatedWeather
                                icon={iconDefaults.icon}
                                color={iconDefaults.color}
                                size={iconDefaults.size}
                                animate={iconDefaults.animate}
                                />
                            </div>
                        <div className="description">
                            <span>{ summary !== undefined ? summary : 'Loading...'}</span>
                        </div>
                        <div className="city-name">
                            <span>{ timezone !== undefined ? timezone : 'Loading...'}</span>
                        </div>
                        <div className="temp">
                            <span>{ temperature !== undefined ? temperature : 'Loading...'}°C</span>
                        </div>
                        <div className="location-time">
                            <span>{ now !== undefined ? now : 'Loading...'}</span>
                        </div>
                    </div>
                        <WeatherDetails
                            humidity={humidity}
                            pressure={pressure}
                            precipProbability={precipProbability}
                            windSpeed={windSpeed}/>
                </div>
                <Forecast forecast={weather[0].daily.data}/>
                <footer>
                    <a href="https://darksky.net/poweredby/" target="_blank" rel="noopener noreferrer">Powered By <span>DarkSky</span></a>
                </footer>
            </main>
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weather: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetWeather: (lat, long) => dispatch(getWeather(lat, long))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWeather);