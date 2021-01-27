
import * as ACTION_TYPES from "./types";
import axios from 'axios';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: ACTION_TYPES.REGISTER_FAILURE,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('token', token);
            })
            .catch(err => {
                dispatch({
                    type: ACTION_TYPES.LOGIN_FAILURE,
                    payload: err.response.data
                });
            });
}

export const logout = (history) => () => {
    localStorage.removeItem('token');
    history.push('/login');
};

