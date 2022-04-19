import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import screensReducer from '../reducers/screensReducer';
import weatherReducer from '../reducers/weatherReducer';
import themeReducer from '../reducers/themeReducer';

const middleWare = [thunk];


const store = createStore(
  combineReducers({
    screens: screensReducer,
    weather: weatherReducer,
    theme: themeReducer,
  }),
  applyMiddleware(...middleWare),
);

export default store;
