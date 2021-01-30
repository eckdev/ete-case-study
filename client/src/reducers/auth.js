import * as ACTION_TYPES from '../actions/types'

const initialState = {
    is_authenticated: false,
    loginErrorMessage: '',
    registerErrorMessage: ''
}

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPES.REGISTER_SUCCESS:
      debugger;
      localStorage.setItem('token', action.payload.token);
            return {
              ...state,
              is_authenticated: false,
            };
      case ACTION_TYPES.REGISTER_FAILURE:
            return {
              ...state,
              is_authenticated: false,
              registerErrorMessage: action.message
            };
      case ACTION_TYPES.LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          is_authenticated: true
        }
      case ACTION_TYPES.LOGIN_FAILURE:
        return {
          ...state,
          is_authenticated: false,
          loginErrorMessage: action.payload
        }
      default:
        return state
    }
}

export default AuthReducer;