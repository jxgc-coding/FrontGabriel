import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  isFiltering: false,
  allVideos: null,
  data: {},
  video: {},
  relatedVideos: [],
  promotedVideos: [],
  dataObj: null,
  hasMore: true,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_FETCHING_VIDEOS:
      return {
        ...state,
        isFetching: action.status,
      }
    case actionTypes.IS_FILTERING_VIDEOS:
      return {
        ...state,
        isFiltering: action.status,
      }
    case actionTypes.FETCH_ALL_VIDEOS_SUCCESS:
      return {
        ...state,
        allVideos: action.data,
      }
    case actionTypes.FETCH_VIDEOS_SUCCESS:
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
        dataObj: action.dataObj,
      }
    case actionTypes.FETCH_VIDEO_SUCCESS:
      return {
        ...state,
        video: action.data,
      }
    case actionTypes.FETCH_RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        relatedVideos: action.data,
      }
    case actionTypes.FETCH_FEATURED_VIDEO_SUCCESS:
      return {
        ...state,
        promotedVideos: action.data,
      }
    case actionTypes.VIDEOS_CLEAR:
      return {
        ...state,
        data: {},
        dataObj: null,
        video: {},
      }
    case actionTypes.FETCH_VIDEOS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case actionTypes.HAS_MORE_VIDEOS:
      return {
        ...state,
        hasMore: action.status,
      }
    default:
      return state
  }
}

export default reducer
