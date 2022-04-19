import React from 'react';
import { connect } from 'react-redux';
import s from './Main.scss';
import Header from '../Header/Header';
import HomeScreen from '../HomeScreen/HomeScreen';
import FavoritesScreen from '../FavoritesScreen/FavoritesScreen';
import { screenModes } from '../config/constants';

const Main = (props) => {
    const {
        screenMode
    } = props;


    return (
        <div>     
            <div className="headerContainer">
                <Header />
            </div>
            <div className="mainContainer">
                {screenMode === screenModes.HOME && <HomeScreen />}
                {screenMode === screenModes.FAVORITES && <FavoritesScreen />}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    screenMode: state.screens.screenMode,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
