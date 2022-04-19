import React from 'react';
import { connect } from 'react-redux';
import s from './Header.scss';
import { setScreenMode } from '../redux/actions/screenActions';
import { screenModes, temperatureUnits } from '../config/constants';
import ToggleDarkMode from '../toggleDarkMode/ToggleDarkMode';
import { setTemperatureUnits } from '../redux/actions/weatherActions';
import { Button } from '@mui/material';


const Header = (props) => {
    const {
        screenMode,
        setScreenMode,
        setTemperatureUnits,
        currentTemperatureUnits,
    } = props;

    const handleChangeTemperatureUnits = () => {
        if (currentTemperatureUnits === temperatureUnits.CELCIUS) {
            setTemperatureUnits(temperatureUnits.FARENHEIT);
        } else {
            setTemperatureUnits(temperatureUnits.CELCIUS);
        }
    }


    return (
        <div>
            <section className="headerSection">
                <p>Best Weather Tools</p>
                <ToggleDarkMode />
                <Button
                    variant="outlined"
                    onClick={() => handleChangeTemperatureUnits()}
                > Change Temperature Units
                </Button>
                <section className="toggleScreenContainer">
                    <div
                        className={`screenOption ${screenMode === screenModes.HOME
                            ? "activeScreenOption"
                            : ''
                            }`}
                        onClick={() => setScreenMode(screenModes.HOME)}
                    >
                        <p
                            className={`screenOptionText ${screenMode !== screenModes.HOME
                                ? "inactiveScreenOptionText"
                                : "activeScreenOptionText"
                                }`}
                        >
                            Home
                        </p>
                    </div>
                    <div
                        className={`screenOption ${screenMode === screenModes.FAVORITES
                            ? "activeScreenOption"
                            : ''
                            }`}
                        onClick={() => setScreenMode(screenModes.FAVORITES)}
                    >
                        <p
                            className={`screenOptionText ${screenMode !== screenModes.FAVORITES
                                ? "inactiveScreenOptionText"
                                : "activeScreenOptionText"
                                }`}
                        >
                            Favorites
                        </p>
                    </div>
                </section>
            </section>
        </div>
    );
};

const mapStateToProps = (state) => ({
    screenMode: state.screens.screenMode,
    currentTemperatureUnits: state.weather.units,
});

const mapDispatchToProps = (dispatch) => ({
    setScreenMode: (mode) => dispatch(setScreenMode(mode)),
    setTemperatureUnits: (units) => dispatch(setTemperatureUnits(units)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);