import ls from 'local-storage'
import remove from 'lodash/remove'

export const setAllPlaylist = (category_id, videos) => {
  if (!getPlaylist(category_id)) {
    ls.set(category_id, videos)
  } else {
    clearCategoryPlaylist(category_id)
    ls.set(category_id, videos)
  }
}

export const setPlaylist = (category_id, video) => {
  if (!getPlaylist(category_id)) {
    ls.set(category_id, [video])
  } else {
    let videoId = video.id
    if (video.videos_id) {
      videoId = video.videos_id
    }
    
    if (!inPlaylist(category_id, videoId)) {
      const oldArr = getPlaylist(category_id)
      ls.set(category_id, [...oldArr, video])
    } else {
      removePlaylist(category_id, videoId)
    }
  }
}

export const inPlaylist = (category_id, video_id) => {
  const data = getPlaylist(category_id)
  let isInPlaylist = false
  if (Array.isArray(data) && data.length) {
    // eslint-disable-next-line array-callback-return
    data.filter(el => {
      if (el.videos_id && el.videos_id === video_id) {
        isInPlaylist = true
        // eslint-disable-next-line array-callback-return
        return
      } else if (el.id && el.id === video_id) {
        isInPlaylist = true
        // eslint-disable-next-line array-callback-return
        return
      }
    })
  }
  return isInPlaylist
}

export const getPlaylist = category_id => {
  return ls.get(category_id) || []
}

export const removePlaylist = (category_id, video_id) => {
  const data = getPlaylist(category_id)
  if (data) {
    const result = remove(data, el => {
      if (el.videos_id) {
        return el.videos_id !== video_id
      } else {
        return el.id !== video_id
      }
    })
    ls.set(category_id, result)
    return result
  }
}

export const overridePlaylist = (category_id, data) => {
  clearPlaylist()
  ls.set(category_id, data)
}

export const clearPlaylist = () => {
  ls.clear()
}

export const clearCategoryPlaylist = category_id => {
  ls.set(category_id, [])
}
