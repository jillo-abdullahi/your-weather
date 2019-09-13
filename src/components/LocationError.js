import React from 'react'

const LocationError = ({ locationError, apiError }) => {
    return (
        <div className="container location-error">
            <div className="error-image">
                <img src="./images/error.svg" alt="location unavailable"/>
            </div>
            <div className="error-message">
                <p>{locationError ? locationError : apiError} <i class="far fa-frown"></i></p>
            </div>
        </div>
    )
}

export default LocationError;