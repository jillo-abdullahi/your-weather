import React from 'react'

const LocationError = () => {
    return (
        <div className="container location-error">
            <div className="error-image">
                <img src="./images/404.svg" alt="not found"/>
            </div>
            <div className="error-message">
                <p>Oops! You appear to be lost.</p>
            </div>
        </div>
    )
}

export default LocationError;