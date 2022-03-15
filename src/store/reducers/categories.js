import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  data: [],
  videoData: [],
  contentData: [],
  category: {
    name: 'A la Carta',
    medias: {
      breadcrumb: undefined,
    },
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_FETCHING_CATEGORIES:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    case actionTypes.FETCH_VIDEO_CATEGORIES_SUCCESS:
      return {
        ...state,
        videoData: action.data,
      }
    case actionTypes.FETCH_CONTENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        contentData: action.data,
      }
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.data,
      }
    case actionTypes.CATEGORIES_CLEAR:
      return {
        ...state,
        // data: [],
        category: {
          name: 'A la Carta',
          medias: {
            breadcrumb: undefined,
          },
        },
      }
    case actionTypes.FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default reducer
