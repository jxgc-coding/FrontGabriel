import * as actionTypes from '../actions/actionTypes'

const initialState = {
  status: false,
  sideBarType: 'temporary',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIDE_BAR_OPEN:
      return {
        ...state,
        status: true,
      }
    case actionTypes.SIDE_BAR_CLOSE:
      return {
        ...state,
        status: false,
      }
    case actionTypes.SIDE_BAR_CHANGE_TYPE:
      return {
        ...state,
        sideBarType: action.sideBarType,
      }
    default:
      return state
  }
}

export default reducer
