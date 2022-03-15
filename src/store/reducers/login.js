import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  logged: null,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.token)
      return {
        ...state,
        loading: false,
        logged: true,
      }
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        logged: false,
        error: action.error,
      }
    case actionTypes.ERROR_RESET:
      return {
        ...state,
        error: null,
      }
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        logged: false,
        loading: false,
      }
    case actionTypes.LOGOUT_START:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default reducer
