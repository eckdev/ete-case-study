import * as ACTION_TYPES from '../actions/types'

const initialState = {
    is_authenticated: false,
    user: null
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.REGISTER_SUCCESS:
            return {
              ...state,
              is_authenticated: true,
            };
          case REGISTER_FAIL:
            return {
              ...state,
              is_authenticated: false,
            };
      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          is_authenticated: true,
          user: action.payload.user
        }
      case ACTION_TYPES.LOGIN_FAILURE:
        return {
          ...state,
          is_authenticated: false,
          user : null
        }
      default:
        return state
    }
}

export default AuthReducer;