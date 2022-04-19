export const getFavorites = () => {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
        return JSON.parse(favoritesString);
    }
    return {};
}

export const setFavorites = (favoritesObject) => {
    const favoritesString = JSON.stringify(favoritesObject);
    localStorage.setItem('favorites', favoritesString)
}

export const addToFavorites = (locationName, locationKey) => {
    const favorites = getFavorites() || {};
    favorites[locationKey] = locationName
    setFavorites(favorites)
}

export const removeFromFavorites = (locationKey) => {
    const favorites = getFavorites();
    delete favorites[locationKey];
    setFavorites(favorites);
}