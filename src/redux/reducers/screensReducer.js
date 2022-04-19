import { SCREEN } from '../actions/constants';
import { screenModes } from '../../config/constants';

const initState = {
    screenMode: screenModes.HOME,
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SCREEN.SCREEN_MODE:
      return { ...state, screenMode: payload };
    default:
      return state;
  }
};