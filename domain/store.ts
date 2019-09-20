import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { StoreState } from '../types/StoreState';

export const DEMO_EMAIL = 'demo@cloudpass.herokuapp.com';
export const DEMO_JWT = 'demo-jwt-token';

const userInitialState: StoreState = {
  email: null, // DEMO_EMAIL,
  jwt: null, // DEMO_JWT
  folders: [],
  passwords: [],
  secretNotes: [],
  drawerOpen: false
};

export const actionTypes = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  LOAD_USER_DATA: 'LOAD_USER_DATA',
  OPEN_DRAWER: 'OPEN_DRAWER',
  CLOSE_DRAWER: 'CLOSE_DRAWER'
};

export const reducer = (state: StoreState = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_DRAWER:
      return { ...state, drawerOpen: true };
    case actionTypes.CLOSE_DRAWER:
      return { ...state, drawerOpen: false };
    case actionTypes.USER_LOGIN:
      return { ...state, email: action.email, jwt: action.jwt };
    case actionTypes.USER_LOGOUT:
      return { ...state, email: null, jwt: null };
    case actionTypes.LOAD_USER_DATA:
      return {
        ...state,
        folders: action.data.folders,
        passwords: action.data.passwords,
        secretNotes: action.data.secretNotes
      };
    default:
      return state;
  }
};

export const openDrawer = () => dispatch => {
  return dispatch({ type: actionTypes.OPEN_DRAWER });
};

export const closeDrawer = () => dispatch => {
  return dispatch({ type: actionTypes.CLOSE_DRAWER });
};

export const loginUser = (email, jwt) => dispatch => {
  return dispatch({
    type: actionTypes.USER_LOGIN,
    email,
    jwt
  });
};

export const logoutUser = () => dispatch => {
  return dispatch({ type: actionTypes.USER_LOGOUT });
};

export const loadUserData = json => {
  return { type: actionTypes.LOAD_USER_DATA, data: json };
};

export const closeDrawerAction = () => {
  return { type: actionTypes.CLOSE_DRAWER };
};

export function initializeStore(initialState: StoreState = userInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
