
import * as ACTION_TYPES from "./types";
import axios from 'axios';
const API_URL = "http://localhost:5000";

export const registerUser = (user) => (dispatch) => {
    return axios.post(API_URL + '/api/users/register', user).then(
        () => {
            dispatch({
                type: ACTION_TYPES.REGISTER_SUCCESS,
            });

            return Promise.resolve();
        }
    ).catch(err => {
        dispatch({
            type: ACTION_TYPES.REGISTER_FAILURE,
            message: err.response.data?.email
        });
        return Promise.reject();
    })
};

export const loginUser = (user) => (dispatch) => {
    return axios.post(API_URL + '/api/users/login', user).then(
        res => {
            const { token } = res.data;
            dispatch({
                type: ACTION_TYPES.LOGIN_SUCCESS,
                payload: { token: token },
            });

            return Promise.resolve();
        },
        (err) => {
            dispatch({
                type: ACTION_TYPES.LOGIN_FAILURE,
                payload: err.response.data.login
            });

            return Promise.reject();
        }
    );
};

export const logout = (history) => () => {
    localStorage.removeItem('token');
    history.push('/login');
};

