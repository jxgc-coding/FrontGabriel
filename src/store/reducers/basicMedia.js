import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  data: [],
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_FETCHING_BASIC_MEDIA:
      return {
        ...state,
        isFetching: action.status,
      }
    case actionTypes.FETCH_BASIC_MEDIA_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    case actionTypes.FETCH_BASIC_MEDIA_FAIL:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default reducer
