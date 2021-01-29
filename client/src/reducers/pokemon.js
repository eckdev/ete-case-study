import {GET_ALL_POKEMONS,INSERT_POKEMON,UPDATE_POKEMON, INSERT_LOGS} from '../actions/types'

export default function(state = [], action) {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return action.payload;
      case UPDATE_POKEMON:
        return state.map(pokemon =>
          pokemon._id === action.payload._id
            ? { ...pokemon, isAlive: action.payload.isAlive, hp: action.payload.hp,coordinates: action.payload.coordinates }
            : pokemon
        );
    case INSERT_POKEMON:
        return state.concat(action.payload);
      default:
        return state;
    }
  }