import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  data: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_FETCHING_PORTADAS:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case actionTypes.FETCH_PORTADAS_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}

export default reducer
