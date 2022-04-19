import { THEME } from '../actions/constants';

const initState = {
    darkMode: true,
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case THEME.SET_DARK_MODE:
      return { ...state, darkMode: payload };
    default:
      return state;
  }
};