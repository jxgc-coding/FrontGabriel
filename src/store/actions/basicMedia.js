import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getBasicMedia = () => {
  return dispatch => {
    dispatch(isFetchingBasicMedia(true))
    axios
      // .get('meta-data/cat-' + category_id + '.json', {
      .get('admin/basic_media_json/basic_media.json')
      .then(res => {
        let data = res.data
        dispatch(isFetchingBasicMedia(false))
        if (data.length > 0) {
          dispatch(fetchBasicMediaSuccess(data))
        } else {
          dispatch(fetchBasicMediaFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const isFetchingBasicMedia = status => {
  return {
    type: actionTypes.IS_FETCHING_BASIC_MEDIA,
    status: status,
  }
}

export const fetchBasicMediaSuccess = data => {
  return {
    type: actionTypes.FETCH_BASIC_MEDIA_SUCCESS,
    data: data,
  }
}

export const fetchBasicMediaFail = error => {
  return {
    type: actionTypes.FETCH_BASIC_MEDIA_FAIL,
    error: error,
  }
}