import React, { useEffect, useCallback, useRef } from 'react'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
// import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

import './_playlistsidebar.scss'

const Videos = ({ key, index, item, handleChangeVideo }) => {
  return (
    <div
      key={key}
      onClick={() => handleChangeVideo(index)}
      className="related-video-card-container"
    >
      <Card className="related-video-card">
        <div className="number-index-playlist">
          <span>{index + 1}</span>
        </div>
        <div className="img-cont">
          <CardMedia
            className="related-video-media"
            image={
              item[1].thumbnail !== undefined &&
              item[1].thumbnail !== 'none.gif'
                ? process.env.REACT_APP_API_URL + item[1].thumbnail
                : `${process.env.PUBLIC_URL}/normal_default.png`
            }
          />
          <div className="overlay"></div>
          <div className="content-overlay">
            <IconButton>
              <PlayCircleOutlineIcon className="play-circle-icon" />
            </IconButton>
          </div>
        </div>
        <div title={String(item[1].title)} className="related-video-details">
          <CardContent className="related-video-content">
            <Typography
              className="related-video-title"
              component="h5"
              variant="h5"
            >
              {String(item[1].title)}
            </Typography>
            <Typography
              className="related-video-description"
              variant="subtitle1"
              color="textSecondary"
            >
              {String(item[1].description)}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

const PlaylistSidebar = React.memo(
  ({
    playlistVideos,
    currentPlaying,
    changeVideoPlaylist,
  }) => {
    const containerRef = useRef()

    useEffect(() => {
      if (playlistVideos.length > 0) {
        handleChangeVideo(currentPlaying)
      }
    }, [currentPlaying, playlistVideos])

    const handleChangeVideo = useCallback(index => {
      if (containerRef.current.childNodes[index] !== undefined) {
        if (
          !containerRef.current.childNodes[index].firstChild.classList.contains(
            'playing'
          )
        ) {
          containerRef.current.childNodes.forEach(value => {
            if (value.firstChild.classList.contains('playing')) {
              value.firstChild.classList.remove('playing')
            }
          })
          containerRef.current.childNodes[index].firstChild.classList.add(
            'playing'
          )
        }
      }
      changeVideoPlaylist(index)
    }, [])

    return (
      <div
        id="draggable-list-container"
        ref={containerRef}
        className="related-videos-container"
      >
        {playlistVideos.length > 0 &&
          playlistVideos.map((val, i) => (
            <Videos
              index={i}
              item={val}
              key={val[1].id}
              handleChangeVideo={handleChangeVideo}
              playlistVideos={playlistVideos}
            />
          ))}
      </div>
    )
  }
)

export default PlaylistSidebar
