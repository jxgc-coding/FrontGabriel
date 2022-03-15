import React, { useState, useEffect, useCallback } from 'react'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import SocialShare from '../SocialShare/SocialShare'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { NavHashLink as NavLink } from 'react-router-hash-link'

import IconButton from '@material-ui/core/IconButton'
import WatchLaterIcon from '@material-ui/icons/WatchLater'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import StarIcon from '@material-ui/icons/Star'
import ListIcon from '@material-ui/icons/List'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CheckIcon from '@material-ui/icons/Check'

import * as pl from '../../store/utils'

// import parse from 'html-react-parser'

import './_videodetail.scss'

const VideoDetail = React.memo(function VideoDetail(props) {
  const [description, setDescription] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleAddRemoveToPlaylist(category_id, video_id) {
    const cardElement = document.getElementById(
      `add-${category_id}-playlist-container-${video_id}`
    )

    if (cardElement) {
      if (cardElement.style.display === 'flex') {
        cardElement.style.display = 'none'
      } else {
        cardElement.style.display = 'flex'
      }
    }
  }

  function handleSetToPlaylist(category_id, video_id) {
    pl.setPlaylist(category_id, video_id)
  }

  const handleAddToPlaylist = useCallback((category_id, video) => {
    handleAddRemoveToPlaylist(
      category_id,
      video.videos_id ? video.videos_id : video.id
    )
    handleSetToPlaylist(category_id, video)
  }, [])

  useEffect(() => {
    if (props.video.description_quill !== undefined) {
      let cfg = {}
      let converter = new QuillDeltaToHtmlConverter(
        JSON.parse(props.video.description_quill).ops,
        cfg
      )
      let html = converter.convert()
      setDescription(html)
    }
  }, [Object.entries(props.video)])

  // const descriptionQuill = () => {
  //   const html = description
  //   return parse(html)
  // }

  return (
    <>
      {Object.entries(props.video).length !== 0 &&
      props.video.constructor === Object ? (
        <div className="video-detail-player-container">
          <div id="video" className="video-detail-card-container">
            <Card className="card">
              <div className="video-container">
                <VideoPlayer
                  autoPlay
                  class={
                    'video-js vjs-default-skin vjs-fluid vjs-16-9 vjs-big-play-centered'
                  }
                  type={
                    props.video.video_type === 'mass_embedded'
                      ? 'video/youtube'
                      : 'video/mp4'
                  }
                  src={
                    props.video.video_type === 'mass_embedded'
                      ? `https://youtube.com/watch?v=${props.video.embed_id}`
                      : `${process.env.REACT_APP_API_URL}admin/Uploads/videos/${props.video.video_id}.${props.video.type}`
                  }
                  poster={
                    props.video.thumbnail !== undefined &&
                    props.video.thumbnail !== 'none.gif'
                      ? process.env.REACT_APP_API_URL + props.video.thumbnail
                      : ''
                  }
                />
              </div>
              <CardContent className="video-detail-player-content">
                <Typography className="title" variant="h1" component="h1">
                  {props.video.title}
                </Typography>
                {props.video.location_recorded !== null && (
                  <SocialShare
                    locales={props.locales}
                    link={`${process.env.REACT_APP_API_URL}admin/Uploads/documents/${props.video.location_recorded}`}
                  />
                )}
                <div className="litem-more-vert-icon">
                  <IconButton
                    aria-label="More"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        width: 260,
                      },
                    }}
                  >
                    {props.category !== '0' && (
                      <>
                        <MenuItem>
                          <NavLink
                            className="playlist-link"
                            to={`${process.env.PUBLIC_URL}/playlist/${props.category}`}
                          >
                            <ListItemIcon className="menu-item">
                              <ListIcon />
                            </ListItemIcon>
                            {props.locales.length && (
                              <Typography
                                className="text-poover-menu"
                                variant="inherit"
                                noWrap
                              >
                                Lista de Reproducción
                              </Typography>
                            )}
                          </NavLink>
                        </MenuItem>
                        <Divider className="menu-divider" />
                      </>
                    )}
                    <MenuItem
                      onClick={() =>
                        handleAddToPlaylist('watch-later', props.video)
                      }
                    >
                      <ListItemIcon className="menu-item">
                        <WatchLaterIcon />
                      </ListItemIcon>
                      {props.locales.length && (
                        <Typography
                          className="text-poover-menu"
                          variant="inherit"
                          noWrap
                        >
                          {props.locales[4].translate_value !== ''
                            ? props.locales[4].translate_value
                            : props.locales[4].translate_key}
                        </Typography>
                      )}
                      <div
                        id={`add-watch-later-playlist-container-${
                          props.category !== '0'
                            ? props.video.videos_id
                            : props.video.id
                        }`}
                        style={{
                          display: props.inWatchLaterPlaylist
                            ? 'block'
                            : 'none',
                        }}
                        className="litem-watch-later-added"
                      >
                        <CheckIcon />
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleAddToPlaylist('favorites', props.video)
                      }
                    >
                      <ListItemIcon className="menu-item">
                        <StarIcon className="star-favorite" />
                      </ListItemIcon>
                      {props.locales.length && (
                        <Typography
                          className="text-poover-menu"
                          variant="inherit"
                          noWrap
                        >
                          {props.locales[9].translate_value !== ''
                            ? props.locales[9].translate_value
                            : props.locales[9].translate_key}
                        </Typography>
                      )}
                      <div
                        id={`add-favorites-playlist-container-${
                          props.category !== '0'
                            ? props.video.videos_id
                            : props.video.id
                        }`}
                        style={{
                          display: props.inFavoritesPlaylist ? 'block' : 'none',
                        }}
                        className="litem-favorites-added"
                      >
                        <CheckIcon />
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              </CardContent>
            </Card>
          </div>
          <div id="description" className="video-detail-description-container">
            <Card className="card">
              <CardContent className="card-description-container">
                <div className="video-description">
                  {props.video.description}
                  {/* {descriptionQuill()} */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  )
})

export default VideoDetail
