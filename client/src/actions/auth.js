
import * as ACTION_TYPES from "./types";
import axios from 'axios';

export const registerUser = (user) => (dispatch) => {
    return axios.post('/api/users/register', user).then(
        res => {
            const { token } = res.data
            dispatch({
                type: ACTION_TYPES.REGISTER_SUCCESS,
                payload: { token: token },
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
    return axios.post('/api/users/login', user).then(
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

export const logout = () => () => {
    localStorage.removeItem('token');
    window.location.href='/';
};

