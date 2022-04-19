import { getCurrentLocation } from "./apiCalls";
import { setWeatherDetails } from "../redux/actions/weatherActions";
import store from "../redux/store";

export const initDefaultLocation = () => {
    navigator.geolocation.getCurrentPosition(handleLocation);
}

async function handleLocation(position) {
    const { EnglishName, Key } = await getCurrentLocation(position);
    store.dispatch(setWeatherDetails(EnglishName, Key));
}