import React, { useState, useCallback } from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import Typography from '@material-ui/core/Typography'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import Menu from '@material-ui/core/Menu'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import WatchLaterIcon from '@material-ui/icons/WatchLater'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import StarIcon from '@material-ui/icons/Star'
import MenuItem from '@material-ui/core/MenuItem'
import Hidden from '@material-ui/core/Hidden'

// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'

import './_videoCard.scss'

const VideoCard = React.memo(props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const tooltipText =
    props.locales.length > 0
      ? props.locales[8].translate_value !== ''
        ? props.locales[8].translate_value
        : props.locales[8].translate_key
      : ''

  const handleClick = useCallback(e => {
    setAnchorEl(e.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleAddToPlaylist = useCallback((category_id, video) => {
    props.handleAddRemoveToPlaylist(true, category_id, video.videos_id)
    props.handleSetToPlaylist(category_id, video)
  }, [])

  const handleDeleteFromPlaylist = useCallback((category_id, video_id) => {
    props.handleAddRemoveToPlaylist(false, category_id, video_id)
    props.handleRemoveFromPlaylist(category_id, video_id)
  }, [])

  return (
    <div className="video-card-container">
      <Hidden lgUp>
        <div className="litem-more-vert-icon-mobile">
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
                width: 240,
              },
            }}
          >
            <MenuItem
              onClick={() => handleAddToPlaylist('watch-later', props.video)}
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
                id={`add-watch-later-playlist-container-${props.video.videos_id}`}
                style={{
                  display: props.showInWatchLaterPlaylist ? 'block' : 'none',
                }}
                className="litem-watch-later-added"
              >
                <CheckIcon />
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => handleAddToPlaylist('favorites', props.video)}
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
                id={`add-favorites-playlist-container-${props.video.videos_id}`}
                style={{
                  display: props.showInFavoritesPlaylist ? 'block' : 'none',
                }}
                className="litem-favorites-added"
              >
                <CheckIcon />
              </div>
            </MenuItem>
          </Menu>
        </div>
      </Hidden>
      <Hidden mdDown>
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
                width: 240,
              },
            }}
          >
            <MenuItem
              onClick={() => handleAddToPlaylist('watch-later', props.video)}
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
                id={`add-watch-later-playlist-container-${props.video.videos_id}`}
                style={{
                  display: props.showInWatchLaterPlaylist ? 'block' : 'none',
                }}
                className="litem-watch-later-added"
              >
                <CheckIcon />
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => handleAddToPlaylist('favorites', props.video)}
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
                id={`add-favorites-playlist-container-${props.video.videos_id}`}
                style={{
                  display: props.showInFavoritesPlaylist ? 'block' : 'none',
                }}
                className="litem-favorites-added"
              >
                <CheckIcon />
              </div>
            </MenuItem>
          </Menu>
        </div>
      </Hidden>
      <Hidden lgUp>
        <div id={`add-playlist-container-${props.video.videos_id}`}>
          <Tooltip
            onClick={() => handleAddToPlaylist(props.category, props.video)}
            title={tooltipText}
            placement="left"
            style={{ display: props.showInPlaylist ? 'none' : 'block' }}
          >
            <div className="litem-add-playlist-icon-mobile">
              <AddIcon />
            </div>
          </Tooltip>
          <div
            onClick={() =>
              handleDeleteFromPlaylist(props.category, props.video.videos_id)
            }
            style={{ display: props.showInPlaylist ? 'block' : 'none' }}
            className="litem-added"
          >
            <CheckIcon />
          </div>
        </div>
      </Hidden>
      <Hidden mdDown>
        <div id={`add-playlist-container-${props.video.videos_id}`}>
          <Tooltip
            onClick={() => handleAddToPlaylist(props.category, props.video)}
            title={tooltipText}
            placement="left"
            style={{ display: props.showInPlaylist ? 'none' : 'block' }}
          >
            <div className="litem-add-playlist-icon">
              <AddIcon />
            </div>
          </Tooltip>
          <div
            onClick={() =>
              handleDeleteFromPlaylist(props.category, props.video.videos_id)
            }
            style={{ display: props.showInPlaylist ? 'block' : 'none' }}
            className="litem-added"
          >
            <CheckIcon />
          </div>
        </div>
      </Hidden>
      <NavLink
        className="video-card-link"
        to={`${process.env.PUBLIC_URL}/category/${props.category}/video/${props.video.videos_id}`}
      >
        <div
          hola_ve_preview={
            props.video.video_type === 'mass_embedded'
              ? `https://www.youtube.com/watch?v=${props.video.embed_id}`
              : `${process.env.REACT_APP_API_URL}admin/Uploads/videos/${props.video.video_id}.${props.video.type}`
          }
          className="card"
        >
          <div className="img-cont">
            <img
              alt=""
              className="card-image"
              src={
                props.video.thumbnail !== undefined &&
                props.video.thumbnail !== 'none.gif'
                  ? process.env.REACT_APP_API_URL + props.video.thumbnail
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
          <div title={props.video.title} className="card-content">
            <Typography className="video-title" variant="h6" gutterBottom>
              {props.video.title}
            </Typography>
            <Typography
              className="video-description"
              variant="body1"
              color="textSecondary"
            >
              {props.video.description}
            </Typography>
          </div>
        </div>
      </NavLink>
    </div>
  )
})

export default VideoCard
