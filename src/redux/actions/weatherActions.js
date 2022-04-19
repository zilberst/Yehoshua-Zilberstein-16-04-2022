import { WEATHER } from './constants';
import { getWeatherForecast } from '../../utils/apiCalls';

export const setCurrentLocationKey =
    (locationKey) => async (dispatch, getState) => {
        dispatch({
            type: WEATHER.SET_CURRENT_LOCATION_KEY,
            payload: locationKey,
        });
    };

export const setCurrentLocationName =
    (locationName) => async (dispatch, getState) => {
        dispatch({
            type: WEATHER.SET_CURRENT_LOCATION_NAME,
            payload: locationName,
        })
    };

export const setCurrentLocationWeather =
    (locationKey) => async (dispatch, getState) => {
        const weather = await getWeatherForecast(locationKey);
        dispatch({
            type: WEATHER.SET_CURRENT_LOCATION_WEATHER,
            payload: weather,
        });
    };

export const setWeatherDetails =
    (locationName, locationKey) => async (dispatch, getState) => {
        dispatch(setCurrentLocationName(locationName));
        dispatch(setCurrentLocationKey(locationKey));
        dispatch(setCurrentLocationWeather(locationKey));
    };

export const setTemperatureUnits =
    (units) => async (dispatch, getState) => {
        dispatch({
            type: WEATHER.SET_UNITS,
            payload: units,
        });
    };
