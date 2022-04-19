import { WEATHER } from '../actions/constants';
import { 
  DEFAULT_LOCATION_KEY, 
  DEFAULT_LOCATION_NAME,
  temperatureUnits
} from '../../config/constants';

const initState = {
    currentLocationKey: DEFAULT_LOCATION_KEY,
    currentLocationName: DEFAULT_LOCATION_NAME,
    currentLocationWeather: null,
    units: temperatureUnits.CELCIUS,
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case WEATHER.SET_CURRENT_LOCATION_KEY:
      return { ...state, currentLocationKey: payload };
    case WEATHER.SET_CURRENT_LOCATION_NAME:
      return { ...state, currentLocationName: payload };
    case WEATHER.SET_CURRENT_LOCATION_WEATHER:
      return { ...state, currentLocationWeather: payload };
    case WEATHER.SET_UNITS:
      return { ...state, units: payload };
    default:
      return state;
  }
};