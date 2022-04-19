import { THEME } from './constants';

export const setDarkMode =
  (boolean) => async (dispatch, getState) => {
    dispatch({
      type: THEME.SET_DARK_MODE,
      payload: boolean,
    });
  };