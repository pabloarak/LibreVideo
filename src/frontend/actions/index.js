import axios from 'axios';

export const actions = {
  setFavorite: 'SET_FAVORITE',
  deleteFavorite: 'DELETE_FAVORITE',
  loginRequest: 'LOGIN_REQUEST',
  logoutRequest: 'LOGOUT_REQUEST',
  registerRequest: 'REGISTER_REQUEST',
  getVideoSource: 'GET_VIDEO_SOURCE',
  searchVideo: 'SEARCH_VIDEO',
  setError: 'SET_ERROR',
};

export const setFavorite = (payload) => ({
  type: actions.setFavorite,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: actions.deleteFavorite,
  payload,
});

export const loginRequest = (payload) => ({
  type: actions.loginRequest,
  payload,
});

export const logoutRequest = (payload) => ({
  type: actions.logoutRequest,
  payload,
});

export const registerRequest = (payload) => ({
  type: actions.registerRequest,
  payload,
});

export const getVideoSource = (payload) => ({
  type: actions.getVideoSource,
  payload,
});

export const searchVideo = (payload) => ({
  type: actions.searchVideo,
  payload,
});

export const setError = (payload) => ({
  type: actions.setError,
  payload,
});

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in/',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const addUserMovie = ({ _id, cover, title, year, contentRating, duration }) => {
  return (dispatch) => {
    axios({
      url: '/user-movies',
      method: 'post',
      data: {
        movieId: _id,
      },
    })
      .then(() => {
        dispatch(setFavorite({ _id, cover, title, year, contentRating, duration }));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const removeUserMovie = (movieId) => {
  return (dispatch) => {
    axios({
      url: `/user-movies/${movieId}`,
      method: 'delete',
    })
      .then(dispatch(deleteFavorite(movieId)))
      .catch((err) => dispatch(setError(err)));
  };
};
