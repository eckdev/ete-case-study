import * as ACTION_TYPES from "./types";
import axios from 'axios';

export const getAllPokemon = (isEnemy) => dispatch => {
    return axios.get("/api/pokemons",isEnemy).then(
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
    return axios.post("/api/pokemons/addPokemon",pokemon).then(
        res => {
            dispatch({
                type: ACTION_TYPES.INSERT_POKEMON,
                payload: res.data
            });
            return Promise.resolve();
        }
    )
}

export const updatePokemonCoordinates = (id,coordinates) => dispatch => {
    return axios.put(`/api/pokemons/updateCoordinates/${id}`,{coordinates:coordinates}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_POKEMON_COORDINATES,
                payload:res.data
            });
            return Promise.resolve();
        }
    )
}

export const updatePokemon = (id,hp,coordinates) => dispatch => {
    return axios.put(`/api/pokemons/update/${id}`,{hp:hp,coordinates:coordinates}).then(
        res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_POKEMON,
                payload:res.data
            });
            return Promise.resolve();
        }
    )
}

export const selectMyPokemon = (id)  =>{
    return {
        type: ACTION_TYPES.MY_POKEMON,
        payload: id
    }
}

export const selectEnemyPokemon = id  =>{
    return {
        type: ACTION_TYPES.ENEMY_POKEMON,
        payload: id
    }
}

export const insertLogs = log  =>{
    return {
        type: ACTION_TYPES.INSERT_LOGS,
        payload: log
    }
}
