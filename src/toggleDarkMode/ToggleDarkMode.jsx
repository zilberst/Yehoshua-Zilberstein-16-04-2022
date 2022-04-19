import s from './ToggleDarkMode.scss';
import { Button } from '@mui/material';
import { ThemeContext, themes } from '../contexts/ThemeContext/ThemeContext';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setDarkMode } from '../redux/actions/themeActions';

const ToggleDarkMode = (props) => {
  const {
    setDarkMode,
    darkMode
  } = props;

  // const [darkMode, setDarkMode] = useState(true);

  return (
    <div>
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <Button
            variant="outlined"
            onClick={() => {
              setDarkMode(!darkMode);
              changeTheme(darkMode ? themes.light : themes.dark);
            }}
          >
            Switch Dark/Light mode
          </Button>
        )}
      </ThemeContext.Consumer>
    </div>
  );
}
const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
});

const mapDispatchToProps = (dispatch) => ({
  setDarkMode: (boolean) => dispatch(setDarkMode(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleDarkMode);