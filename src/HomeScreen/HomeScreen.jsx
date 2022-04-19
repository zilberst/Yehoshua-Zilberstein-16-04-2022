import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import s from './HomeScreen.scss';
import { 
    setCurrentLocationWeather,
    setWeatherDetails
} from '../redux/actions/weatherActions';
import {
    DEFAULT_LOCATION_KEY,
    daysOfTheWeekName
} from '../config/constants';
import { getTemperatureFormat } from '../utils/helpers';
import {
    Input,
    Autocomplete,
    TextField,
    Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
    getFavorites,
    addToFavorites,
    removeFromFavorites
} from '../utils/favorites';
import { autocompleteSearch } from '../utils/apiCalls';
import { initDefaultLocation } from '../utils/init';

const HomeScreen = (props) => {
    const {
        currentLocationKey,
        currentLocationName,
        currentLocationWeather,
        setCurrentLocationWeather,
        setWeatherDetails,
        currentTemperatureUnits
    } = props;

    const [favorites, setFavorites] = useState(getFavorites());
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);

    useEffect(() => {
        initDefaultLocation();
        setCurrentLocationWeather(DEFAULT_LOCATION_KEY);
    }, []);

    useEffect(() => {
        setCurrentLocationWeather(currentLocationKey);
    }, [currentTemperatureUnits]);

    const renderFiveDaysForecast = () => {
        return currentLocationWeather.DailyForecasts.map(weather => {
            return renderWeatherBox(weather);
        })
    }

    const renderWeatherBox = (weather) => {
        const d = new Date(weather.Date);
        const day = d.getDay();
        const temperature = getTemperatureFormat(weather.Temperature.Maximum);
        return (
            <div className='homeWeatherBox'>
                <p>{daysOfTheWeekName[day]}</p>
                <p>{temperature}</p>
            </div>
        )
    }

    const handleRemoveFromFavorites = (locationKey) => {
        removeFromFavorites(locationKey);
        setFavorites(getFavorites());
    }

    const handleAddToFavorites = (locationName, locationKey) => {
        addToFavorites(locationName, locationKey);
        setFavorites(getFavorites());
    }

    const searchLocation = async (searchValue) => {
        const autocompleteResults = await autocompleteSearch(searchValue);
        setAutocompleteOptions(autocompleteResults)
    }

    const onLocationSelect = (option) => {
        setWeatherDetails(option.label, option.Key)
    }

    return (
        <div>
            <div className='searchContainer'>
                {/* <SearchIcon /> */}
                {/* <Input placeholder='Search'></Input> */}
                <Autocomplete
                    disablePortal
                    id="combobox"
                    options={autocompleteOptions}
                    sx={{
                        '& .MuiAutocomplete-input, & .MuiInputLabel-root': {
                          fontSize: 20,
                          color: "#1976d2",
                        },
                      }}
                    onChange={(event, option) => {
                        onLocationSelect(option);
                      }}
                    renderInput={(params) => <TextField
                        {...params}
                        style={{minWidth: '200px'}}
                        placeholder='Search'
                        onChange={(event) => searchLocation(event.target.value)}
                    />}
                />
            </div>
            {currentLocationWeather &&
                <div className='weatherContainer'>
                    <div className='homeTopContainer'>
                        <div className='homeTopLeftContainer'>
                            <p>
                                {currentLocationName}
                            </p>
                            <p>
                                {getTemperatureFormat(currentLocationWeather.DailyForecasts[0].Temperature.Maximum)}
                            </p>
                        </div>
                        <div>
                            {favorites && 
                                Object.values(favorites).length > 0 &&
                                Object.values(favorites).includes(currentLocationName) ?
                                <Button
                                    variant="outlined"
                                    onClick={() => handleRemoveFromFavorites(currentLocationKey)}
                                >Remove from Favorites</Button>
                                :
                                <Button
                                    variant="outlined"
                                    onClick={() => handleAddToFavorites(currentLocationName, currentLocationKey)}
                                >Add to Favorites</Button>
                            }
                        </div>
                    </div>
                    <div>
                        <h1>
                            {currentLocationWeather.Headline.Text}
                        </h1>
                    </div>
                    <div className='homeBottomContainer'>
                        {renderFiveDaysForecast()}
                    </div>
                </div>}
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentLocationKey: state.weather.currentLocationKey,
    currentLocationName: state.weather.currentLocationName,
    currentLocationWeather: state.weather.currentLocationWeather,
    currentTemperatureUnits: state.weather.units,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentLocationWeather: (mode) => dispatch(setCurrentLocationWeather(mode)),
    setWeatherDetails: (label, key) => dispatch(setWeatherDetails(label, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);