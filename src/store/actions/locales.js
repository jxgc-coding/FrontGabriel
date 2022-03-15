import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getLocales = () => {
  return dispatch => {
    dispatch(isFetchingLocales(true))
    axios
      .get('admin/translate_json/translate.json')
      .then(res => {
        let data = res.data

        if (data.length) {
          dispatch(fetchLocalesSuccess(data))
          dispatch(isFetchingLocales(false))
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

export const isFetchingLocales = status => {
  return {
    type: actionTypes.IS_FETCHING_LOCALES,
    isFetching: status,
  }
}

export const fetchLocalesSuccess = data => {
  return {
    type: actionTypes.FETCH_LOCALES_SUCCESS,
    data: data,
  }
}
