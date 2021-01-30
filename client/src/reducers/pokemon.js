import {GET_ALL_POKEMONS,INSERT_POKEMON,UPDATE_POKEMON,MY_POKEMON, ENEMY_POKEMON} from '../actions/types'

let initialState = {
  pokemons:[],
  myPokemon: {},
  enemyPokemon: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return {
          ...state,
          pokemons: action.payload
      }
      case UPDATE_POKEMON:
        return {
          ...state,
          pokemons: state.pokemons.map(pokemon =>
            pokemon._id === action.payload._id
              ? { ...pokemon, isAlive: action.payload.isAlive, hp: action.payload.hp,coordinates: action.payload.coordinates }
              : pokemon
          )
        }
    case INSERT_POKEMON:
        return {
          ...state,
          pokemons: state.pokemons.concat(action.payload)
        }
    case MY_POKEMON:
      return {
        ...state,
        myPokemon : state.pokemons.filter(x=> x._id === action.payload)[0]
      }
      case ENEMY_POKEMON:
        return {
          ...state,
          enemyPokemon : state.pokemons.filter(x=> x._id === action.payload)[0]
        }
      default:
        return state;
    }
  }