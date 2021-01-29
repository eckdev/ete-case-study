import * as ACTION_TYPES from "./types";
import axios from 'axios';
const API_URL = "http://localhost:5000";

export const getAllPokemon = (isEnemy) => dispatch => {
    return axios.get(API_URL+"/api/pokemons",isEnemy).then(
        res => {
            dispatch({
                type: ACTION_TYPES.GET_ALL_POKEMONS,
                payload: res.data ,
            });
            return Promise.resolve();
        }
    )
}

export const insertPokemon = (pokemon) => dispatch => {
    return axios.post(API_URL+"/api/pokemons/addPokemon",pokemon).then(
        res => {
            dispatch({
                type: ACTION_TYPES.INSERT_POKEMON,
                payload: res.data
            });
            return Promise.resolve();
        }
    )
}

export const updatePokemon = (id) => dispatch => {
    return axios.put(API_URL+`/update/${id}`).then(
        res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_POKEMON,
                payload:res.data
            });
            return Promise.resolve();
        }
    )
}

export const insertLogs = log  =>{
    return {
        type: ACTION_TYPES.INSERT_LOGS,
        payload: log
    }
}
