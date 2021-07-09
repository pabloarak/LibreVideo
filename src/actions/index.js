export const actions = {
    setFavorite: 'SET_FAVORITE',
    deleteFavorite: 'DELETE_FAVORITE',
};

export const setFavorite = payload => ({
    type: actions.setFavorite,
    payload,
});

export const deleteFavorite = payload => ({
    type: actions.deleteFavorite,
    payload,
});