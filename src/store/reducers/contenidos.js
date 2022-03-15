import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  isFiltering: false,
  allContenidos: null,
  data: {},
  contenido: {},
  relatedContenidos: [],
  promotedContenidos: [],
  dataObjContenidos: null,
  hasMore: true,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_FETCHING_CONTENIDOS:
      return {
        ...state,
        isFetching: action.status,
      }
    case actionTypes.IS_FILTERING_CONTENIDOS:
      return {
        ...state,
        isFiltering: action.status,
      }
    case actionTypes.FETCH_ALL_CONTENIDOS_SUCCESS:
      return {
        ...state,
        allContenidos: action.data,
      }
    case actionTypes.FETCH_CONTENIDOS_SUCCESS:
      let onConcat = false
      let cloneStateData
      if (!action.filterStatus) {
        if (state.data.hasOwnProperty(Object.keys(action.data)[0])) {
          onConcat = true
          cloneStateData = state.data
          let arrConcat = state.data[Object.keys(action.data)].concat(
            action.data[Object.keys(action.data)[0]]
          )
          cloneStateData[Object.keys(action.data)] = arrConcat
        }
      }
      return {
        ...state,
        data: onConcat ? cloneStateData : action.data,
        dataObjContenidos: action.dataObjContenidos,
      }
    case actionTypes.FETCH_CONTENIDO_SUCCESS:
      return {
        ...state,
        contenido: action.data,
      }
    case actionTypes.FETCH_RELATED_CONTENIDO_SUCCESS:
      return {
        ...state,
        relatedContenidos: action.data,
      }
    case actionTypes.FETCH_FEATURED_CONTENIDO_SUCCESS:
      return {
        ...state,
        promotedContenidos: action.data,
      }
    case actionTypes.CONTENIDOS_CLEAR:
      return {
        ...state,
        data: {},
        dataObjContenidos: null,
        contenido: {},
      }
    case actionTypes.FETCH_CONTENIDOS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case actionTypes.HAS_MORE_CONTENIDOS:
      return {
        ...state,
        hasMore: action.status,
      }
    default:
      return state
  }
}

export default reducer
