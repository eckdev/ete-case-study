import {GET_ALL_POKEMONS,INSERT_POKEMON,UPDATE_POKEMON,MY_POKEMON, ENEMY_POKEMON, UPDATE_POKEMON_COORDINATES} from '../actions/types'

let initialState = {
  pokemons:[],
  myPokemon: {
    name:'',
    hp:0
  },
  enemyPokemon: {
    name:'',
    hp:0
  }
}

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return {
          ...state,
          pokemons: action.payload
      }
      case UPDATE_POKEMON:
        let pokes = state.pokemons.map(pokemon =>
          pokemon._id === action.payload._id
            ? { ...pokemon, hp: action.payload.hp }
            : pokemon
        );
        let poke = {
          name:action.payload.name,
          hp:action.payload.hp
        }
        let states = {
          ...state,
          pokemons: pokes,
          myPokemon: !action.payload.isEnemy ? poke : state.myPokemon,
          enemyPokemon: action.payload.isEnemy ? poke : state.enemyPokemon
        }
        return states;
        case UPDATE_POKEMON_COORDINATES:
          return {
            ...state,
            pokemons: state.pokemons.map(pokemon =>
              pokemon._id === action.payload._id
                ? { ...pokemon, coordinates: action.payload.coordinates }
                : pokemon
            )
          };
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