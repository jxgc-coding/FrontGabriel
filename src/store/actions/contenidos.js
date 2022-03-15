import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getAllContenidos = () => {
  return dispatch => {
    dispatch(isFetchingContenidos(true))
    axios
      // .get('meta-data/cat-' + category_id + '.json', {
      .get('admin/multicontent_json/listaMulticontentCategory_0.json')
      .then(res => {
        let data = res.data
        dispatch(isFetchingContenidos(false))
        if (data.length > 0) {
          dispatch(fetchAllContenidosSuccess(data))
        } else {
          dispatch(fetchContenidosFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const getContenidos = (
  page = 1,
  perPage = 32,
  category_id = 0,
  lowRow = 0,
  topRow = 40,
  restore = true
) => {
  return dispatch => {
    axios
      .get(
        'admin/multicontent_json/listaMulticontentCategory_' +
          category_id +
          '.json'
      )
      .then(res => {
        let dataObjContenidos = res.data

        if (dataObjContenidos.length > 0 && Array.isArray(dataObjContenidos)) {
          if (page >= Math.ceil(dataObjContenidos.length / perPage)) {
            dispatch(hasMoreContenidos(false))
          }

          let data = dataObjContenidos.slice(lowRow, topRow)
          dispatch(isFetchingContenidos(false))

          if (restore) {
            dispatch(
              fetchContenidosSuccess(category_id, data, dataObjContenidos, true)
            )
          } else {
            dispatch(
              fetchContenidosSuccess(
                category_id,
                data,
                dataObjContenidos,
                false
              )
            )
          }
        } else {
          dispatch(fetchContenidosSuccess(category_id, [], null, true))
        }
      })
      .catch(err => {
        dispatch(fetchContenidosSuccess(category_id, [], null, true))
        console.log(err)
      })
  }
}

export const getContenido = (contenido_id, category_id) => {
  return dispatch => {
    dispatch(isFetchingContenidos(true))
    axios
      .get(
        'admin/multicontent_json/listaMulticontentCategory_' +
          category_id +
          '.json'
      )
      // .get('meta-data/cat-' + category_id + '.json')
      .then(res => {
        let data = res.data.filter(item => {
          return item.id === contenido_id
        })

        if (
          Object.entries(data[0]).length !== 0 &&
          data[0].constructor === Object
        ) {
          dispatch(isFetchingContenidos(false))
          dispatch(fetchContenidoSuccess(data[0]))
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

export const getRelatedContenidos = (
  current_contenido_id,
  category_id = 0,
  qty = 24
) => {
  return dispatch => {
    dispatch(isFetchingContenidos(true))
    axios
      .get(
        'admin/multicontent_json/listaMulticontentCategory_' +
          category_id +
          '.json',
        {
          // .get('meta-data/cat-' + category_id + '.json', {
          // params: {
          //   current_contenido_id: current_contenido_id,
          //   category_id: category_id,
          //   qty: qty,
          // },
        }
      )
      .then(res => {
        let data = res.data

        if (data.length) {
          data = data.sort(() => 0.5 - Math.random())
          dispatch(isFetchingContenidos(false))
          dispatch(fetchRelatedContenidosSuccess(data.slice(0, qty)))
        } else {
          dispatch(fetchContenidosFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const getPromotedContenidos = (
  current_contenido_id,
  category_id = 0,
  qty = 24
) => {
  return dispatch => {
    dispatch(isFetchingContenidos(true))
    axios
      .get('admin/multicontent_json/listaMulticontentCategory_0.json', {
        // .get('meta-data/cat-' + category_id + '.json', {
        // params: {
        //   current_contenido_id: current_contenido_id,
        //   category_id: category_id,
        //   qty: qty,
        // },
      })
      .then(res => {
        let data = res.data
        
        if (data.length) {
          data = data.filter(item => {
            return item.promoted === '1'
          })
          // data = data.sort(() => 0.5 - Math.random());

          dispatch(isFetchingContenidos(false))
          dispatch(fetchpromotedContenidosSuccess(data.slice(0, qty)))
        } else {
          dispatch(fetchContenidosFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const isFetchingContenidos = status => {
  return {
    type: actionTypes.IS_FETCHING_CONTENIDOS,
    status: status,
  }
}

export const isFilteringContenidos = status => {
  return {
    type: actionTypes.IS_FILTERING_CONTENIDOS,
    status: status,
  }
}

export const fetchAllContenidosSuccess = data => {
  let dataContenidos = {}
  dataContenidos[0] = data
  return {
    type: actionTypes.FETCH_ALL_CONTENIDOS_SUCCESS,
    data: dataContenidos,
  }
}

export const fetchContenidosSuccess = (
  id,
  data,
  dataObjContenidos,
  filterStatus
) => {
  let dataContenidos = {}
  dataContenidos[id] = data
  return {
    type: actionTypes.FETCH_CONTENIDOS_SUCCESS,
    data: dataContenidos,
    dataObjContenidos: dataObjContenidos,
    filterStatus: filterStatus,
  }
}

export const fetchContenidoSuccess = data => {
  return {
    type: actionTypes.FETCH_CONTENIDO_SUCCESS,
    data: data,
  }
}

export const fetchRelatedContenidosSuccess = data => {
  return {
    type: actionTypes.FETCH_RELATED_CONTENIDO_SUCCESS,
    data: data,
  }
}

export const fetchpromotedContenidosSuccess = data => {
  return {
    type: actionTypes.FETCH_FEATURED_CONTENIDO_SUCCESS,
    data: data,
  }
}

export const clearContenidos = () => {
  return {
    type: actionTypes.CONTENIDOS_CLEAR,
  }
}

export const fetchContenidosFail = error => {
  return {
    type: actionTypes.FETCH_CONTENIDOS_FAIL,
    error: error,
  }
}

export const hasMoreContenidos = status => {
  return {
    type: actionTypes.HAS_MORE_CONTENIDOS,
    status: status,
  }
}
