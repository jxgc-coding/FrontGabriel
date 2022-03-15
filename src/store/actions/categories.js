import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getCategories = () => {
  return dispatch => {
    dispatch(isFetchingCategories(true))
    axios
      .get('admin/lista_channels_json/listaCategorias.json', {
        // params: {
        //   page: page
        // }
      })
      .then(res => {
        let data = res.data

        if (data.length) {
          dispatch(fetchCategoriesSuccess(data))
          dispatch(isFetchingCategories(false))
        }

        // if (data.length) {
        //     dispatch(listSuccess(data))
        // } else {
        //     dispatch(listFail('No list found'))
        // }
      })
      .catch(err => console.log(err))
  }
}

export const getVideoCategories = () => {
  return dispatch => {
    dispatch(isFetchingCategories(true))
    axios
      .get('admin/lista_channels_json/listaCategoriasVideos.json', {
        // params: {
        //   page: page
        // }
      })
      .then(res => {
        let data = res.data

        if (data.length) {
          dispatch(fetchVideoCategoriesSuccess(data))
          dispatch(isFetchingCategories(false))
        }

        // if (data.length) {
        //     dispatch(listSuccess(data))
        // } else {
        //     dispatch(listFail('No list found'))
        // }
      })
      .catch(err => console.log(err))
  }
}

export const getContentCategories = () => {
  return dispatch => {
    dispatch(isFetchingCategories(true))
    axios
      .get('admin/lista_channels_json/listaCategoriasContent.json', {
        // params: {
        //   page: page
        // }
      })
      .then(res => {
        let data = res.data

        if (data.length) {
          dispatch(fetchContentCategoriesSuccess(data))
          dispatch(isFetchingCategories(false))
        }

        // if (data.length) {
        //     dispatch(listSuccess(data))
        // } else {
        //     dispatch(listFail('No list found'))
        // }
      })
      .catch(err => console.log(err))
  }
}

export const getCategory = category_id => {
  return dispatch => {
    dispatch(isFetchingCategories(true))
    axios
      .get('admin/lista_channels_json/listaCategorias.json')
      .then(res => {
        let data = res.data.filter(item => {
          return item.channel_id === category_id
        })

        if (
          data.length &&
          !Object.entries(data[0]).length == 0 &&
          data[0].constructor === Object
        ) {
          dispatch(isFetchingCategories(false))
          dispatch(fetchCategorySuccess(data[0]))
        }

        // if (data.length) {
        //     dispatch(listSuccess(data))
        // } else {
        //     dispatch(listFail('No list found'))
        // }
      })
      .catch(err => console.log(err))
  }
}

export const isFetchingCategories = status => {
  return {
    type: actionTypes.IS_FETCHING_CATEGORIES,
    isFetching: status,
  }
}

export const fetchCategoriesSuccess = data => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    data: data,
  }
}

export const fetchVideoCategoriesSuccess = data => {
  return {
    type: actionTypes.FETCH_VIDEO_CATEGORIES_SUCCESS,
    data: data,
  }
}

export const fetchContentCategoriesSuccess = data => {
  return {
    type: actionTypes.FETCH_CONTENT_CATEGORIES_SUCCESS,
    data: data,
  }
}

export const fetchCategorySuccess = data => {
  return {
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    data: data,
  }
}

export const clearCategories = () => {
  return {
    type: actionTypes.CATEGORIES_CLEAR,
  }
}

export const fetchCategoriesFail = error => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAIL,
    error: error,
  }
}
