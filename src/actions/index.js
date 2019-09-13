import axios from 'axios';
import {
    GET_WEATHER_STARTED,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE
} from './types';

export const getWeather = (lat, long) => {
    return (dispatch) => {

        dispatch(getWeatherStarted());

        const url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3d851489bc8e6c05e3debb0dcddeff5";
        axios
        .get(`${url}/${lat},${long}?units=si`)
        .then(res => {
            dispatch(getWeatherSuccess(res.data))
        })
        .catch(error => {
            dispatch(getWeatherFailure(error.message))
        })
    }
};

const getWeatherStarted = () => ({
    type: GET_WEATHER_STARTED
});

const getWeatherSuccess = (weather_info) => ({
    type: GET_WEATHER_SUCCESS,
    payload: {
        ...weather_info
    }
})

const getWeatherFailure = (error) => ({
    type: GET_WEATHER_FAILURE,
    payload: {
        error
    }
});
