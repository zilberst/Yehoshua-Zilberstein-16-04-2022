import { SCREEN } from './constants';

export const setScreenMode =
  (mode) => async (dispatch, getState) => {
    dispatch({
      type: SCREEN.SCREEN_MODE,
      payload: mode,
    });
  };