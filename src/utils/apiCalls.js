// API calls should never be on the client size

import { weatherApiKey } from "../config/secrets";
import axios from "axios";
import store from "../redux/store";
import { temperatureUnits } from "../config/constants";

const BASE_URL = 'https://dataservice.accuweather.com/';
const AUTOCOMPLETE_URL = BASE_URL + 'locations/v1/cities/autocomplete';
const CURRENT_WEATHER_URL = BASE_URL + 'currentconditions/v1/';
const FIVE_DAYS_FORECAST_URL = BASE_URL + 'forecasts/v1/daily/5day/';
const GEOPOSITION_SEARCH = BASE_URL + 'locations/v1/cities/geoposition/search/';

export const getWeatherForecast = async (locationKey) => {
    const selectedUnits = store.getState().weather.units;
    const response = await axios.get(FIVE_DAYS_FORECAST_URL + locationKey + '?apikey=' + weatherApiKey + '&&metric=' + `${selectedUnits === temperatureUnits.CELCIUS}`);
    return response.data;
}

export const getWeather = async (locationKey) => {
    const response = await axios.get(CURRENT_WEATHER_URL + locationKey + '?apikey=' + weatherApiKey);
    return response.data;
}

export const autocompleteSearch = async (searchValue) => {
    const response = await axios.get(AUTOCOMPLETE_URL + '?apikey=' + weatherApiKey + '&&q=' + searchValue);
    return response.data?.map(result => {
        return { ...result, label: result.LocalizedName};
    });
}

export const getCurrentLocation = async (position) => {
    const { latitude, longitude } = position.coords;
    const query = latitude + ',' + longitude;
    const response = await axios.get(GEOPOSITION_SEARCH + '?apikey=' + weatherApiKey + '&&q=' + query);
    return response.data;
}
