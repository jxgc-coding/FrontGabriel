import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getPortadas = () => {
  return dispatch => {
    dispatch(isFetchingPortadas(true))
    axios
      .get('admin/portadas_json/listaPortadas.json')
      .then(res => {
        let data = res.data

        if (data.length) {
          dispatch(fetchPortadasSuccess(data))
          dispatch(isFetchingPortadas(false))
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

export const isFetchingPortadas = status => {
  return {
    type: actionTypes.IS_FETCHING_PORTADAS,
    isFetching: status,
  }
}

export const fetchPortadasSuccess = data => {
  return {
    type: actionTypes.FETCH_PORTADAS_SUCCESS,
    data: data,
  }
}
