import {
    GET_WEATHER_STARTED,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE
} from '../actions/types';

const initialState = {
    weather: [],
    loading: false,
    error: null
}

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_WEATHER_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                weather: [...state.weather, action.payload]
            };
        case GET_WEATHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export default rootReducer;