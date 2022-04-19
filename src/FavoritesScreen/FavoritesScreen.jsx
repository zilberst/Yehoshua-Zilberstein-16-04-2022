import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFavorites } from '../utils/favorites';
import { getTemperatureFormat } from '../utils/helpers';
import { getWeather } from '../utils/apiCalls';
import s from './FavoritesScreen.scss';
import { setWeatherDetails } from '../redux/actions/weatherActions';
import { setScreenMode } from '../redux/actions/screenActions';
import { screenModes, temperatureUnits } from '../config/constants';

const FavoritesScreen = (props) => {
    const {
        setWeatherDetails,
        setScreenMode,
        currentTemperatureUnits,
    } = props;

    const [favoritesWeather, setFavoritesWeather] = useState(null);

    useEffect(() => {
        getFavoritesWeather();
    }, []);

    const getFavoritesWeather = async () => {
        const favorites = getFavorites();
        if (!favorites || Object.values(favorites).length === 0) {
            return;
        }
        
        let weatherResults = [];
        for (const favoriteKey in favorites) {
            const result = await getWeather(favoriteKey);
            result.label = favorites[favoriteKey];
            result.key = favoriteKey;
            weatherResults.push(result);
        }
        setFavoritesWeather(weatherResults);
    }

    const renderWeatherBoxes = () => {
        
        return favoritesWeather.map(weatherObject => {
            return renderWeatherBox(weatherObject[0], weatherObject.label, weatherObject.key);
        })
    }

    
    const renderWeatherBox = (weather, name, key) => {
        const temperature = getTemperatureFormat(temperatureUnits.CELCIUS === currentTemperatureUnits ? weather.Temperature.Metric : weather.Temperature.Imperial);
        return (
            <div className='favoritesWeatherBox' onClick={() => onFavoriteClicked(name, key)}>
                <p>{name}</p>
                <p>{temperature}</p>
                <p>{weather.WeatherText}</p>
            </div>
        )
    }
    const onFavoriteClicked = (label, key) => {
        setWeatherDetails(label, key);
        setScreenMode(screenModes.HOME)
    }

    return (
        <div>
            {favoritesWeather &&
                <div className='favoritesWeatherBoxContainer'>
                    {renderWeatherBoxes()}
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentTemperatureUnits: state.weather.units
});

const mapDispatchToProps = (dispatch) => ({
    setWeatherDetails: (label, key) => dispatch(setWeatherDetails(label, key)),
    setScreenMode: (mode) => dispatch(setScreenMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);