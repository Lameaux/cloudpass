import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { StoreState } from '../types/StoreState';

export const userInitialState: StoreState = {
    email: 'demo.user@gmail.com',
    jwt: 'random-jwt',
    folders: [],
    passwords: [],
    secretNotes: [],
}

export const actionTypes = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    LOAD_USER_DATA: 'LOAD_USER_DATA',
}

export const reducer = (state: StoreState = userInitialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return { ...state, email: action.email, jwt: action.jwt };
        case actionTypes.USER_LOGOUT:
            return { ...state, email: null, jwt: null };
        case actionTypes.LOAD_USER_DATA:
            return {
                ...state,
                folders: action.data.folders,
                passwords: action.data.passwords,
                secretNotes: action.data.secretNotes,
            };
        default: return state;
    }
}

export const loginUser = (email, jwt) => dispatch => {
    return dispatch({
        type: actionTypes.USER_LOGIN,
        email,
        jwt,
    });
};

export const logoutUser = () => dispatch => {
    return dispatch({ type: actionTypes.USER_LOGOUT });
};

export const loadUserData = (json) => {
    return { type: actionTypes.LOAD_USER_DATA, data: json };
};

export function initializeStore(initialState: StoreState = userInitialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
}
