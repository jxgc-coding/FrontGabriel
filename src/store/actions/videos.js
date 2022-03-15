import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getAllVideos = () => {
  return dispatch => {
    dispatch(isFetchingVideos(true))
    axios
      // .get('meta-data/cat-' + category_id + '.json', {
      .get('admin/channels_json/listaVideosCategorias_0.json')
      .then(res => {
        let data = res.data
        dispatch(isFetchingVideos(false))
        if (data.length > 0) {
          dispatch(fetchAllVideosSuccess(data))
        } else {
          dispatch(fetchVideosFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const getVideos = (
  page = 1,
  perPage = 32,
  category_id = 0,
  lowRow = 0,
  topRow = 40,
  restore = true
) => {
  return dispatch => {
    dispatch(isFetchingVideos(true))
    
    axios
      .get('admin/channels_json/listaVideosCategorias_' + category_id + '.json')
      .then(res => {
        let dataObj = res.data

        
        if (dataObj.length > 0) {
          if (page >= Math.ceil(dataObj.length / perPage)) {
            dispatch(hasMoreVideos(false))
          }

          let data = dataObj.slice(lowRow, topRow)
          dispatch(isFetchingVideos(false))
          
          if (restore) {
            dispatch(fetchVideosSuccess(category_id, data, dataObj, true))
          } else {
            dispatch(fetchVideosSuccess(category_id, data, dataObj, false))
          }
        } else {
          dispatch(fetchVideosFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const getVideo = (video_id, category_id) => {
  return dispatch => {
    dispatch(isFetchingVideos(true))
    axios
      .get('admin/channels_json/listaVideosCategorias_' + category_id + '.json')
      // .get('meta-data/cat-' + category_id + '.json')
      .then(res => {
        let data = res.data.filter(item => {
          if (category_id === '0') {
            return item.id === video_id
          } else {
            return item.videos_id === video_id
          }
        })

        if (
          !Object.entries(data[0]).length == 0 &&
          data[0].constructor === Object
        ) {
          dispatch(isFetchingVideos(false))
          dispatch(fetchVideoSuccess(data[0]))
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

export const getRelatedVideos = (
  current_video_id,
  category_id = 0,
  qty = 24
) => {
  return dispatch => {
    dispatch(isFetchingVideos(true))
    axios
      .get(
        'admin/channels_json/listaVideosCategorias_' + category_id + '.json',
        {
          // .get('meta-data/cat-' + category_id + '.json', {
          // params: {
          //   current_video_id: current_video_id,
          //   category_id: category_id,
          //   qty: qty,
          // },
        }
      )
      .then(res => {
        let data = res.data

        data = res.data.filter(item => {
          return item.id !== current_video_id
        })

        if (data.length) {
          data = data.sort(() => 0.5 - Math.random())
          dispatch(isFetchingVideos(false))
          dispatch(fetchRelatedVideosSuccess(data.slice(0, qty)))
        } else {
          dispatch(fetchVideosFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const getPromotedVideos = (
  current_video_id,
  category_id = 0,
  qty = 24
) => {
  return dispatch => {
    dispatch(isFetchingVideos(true))
    axios
      .get('admin/channels_json/listaVideosCategorias_0.json', {
        // .get('meta-data/cat-' + category_id + '.json', {
        // params: {
        //   current_video_id: current_video_id,
        //   category_id: category_id,
        //   qty: qty,
        // },
      })
      .then(res => {
        let data = res.data

        if (data.length) {
          data = data.filter(item => {
            return item.featured === 'yes'
          })
          // data = data.sort(() => 0.5 - Math.random());

          dispatch(isFetchingVideos(false))
          dispatch(fetchpromotedVideosSuccess(data.slice(0, qty)))
        } else {
          dispatch(fetchVideosFail('No list found'))
        }
      })
      .catch(err => console.log(err))
  }
}

export const isFetchingVideos = status => {
  return {
    type: actionTypes.IS_FETCHING_VIDEOS,
    status: status,
  }
}

export const isFilteringVideos = status => {
  return {
    type: actionTypes.IS_FILTERING_VIDEOS,
    status: status,
  }
}

export const fetchAllVideosSuccess = data => {
  let dataVideos = {}
  dataVideos[0] = data
  return {
    type: actionTypes.FETCH_ALL_VIDEOS_SUCCESS,
    data: dataVideos,
  }
}

export const fetchVideosSuccess = (id, data, dataObj, filterStatus) => {
  let dataVideos = {}
  dataVideos[id] = data
  return {
    type: actionTypes.FETCH_VIDEOS_SUCCESS,
    data: dataVideos,
    dataObj: dataObj,
    filterStatus: filterStatus,
  }
}

export const fetchVideoSuccess = data => {
  return {
    type: actionTypes.FETCH_VIDEO_SUCCESS,
    data: data,
  }
}

export const fetchRelatedVideosSuccess = data => {
  return {
    type: actionTypes.FETCH_RELATED_VIDEO_SUCCESS,
    data: data,
  }
}

export const fetchpromotedVideosSuccess = data => {
  return {
    type: actionTypes.FETCH_FEATURED_VIDEO_SUCCESS,
    data: data,
  }
}

export const clearVideos = () => {
  return {
    type: actionTypes.VIDEOS_CLEAR,
  }
}

export const fetchVideosFail = error => {
  return {
    type: actionTypes.FETCH_VIDEOS_FAIL,
    error: error,
  }
}

export const hasMoreVideos = status => {
  return {
    type: actionTypes.HAS_MORE_VIDEOS,
    status: status,
  }
}
