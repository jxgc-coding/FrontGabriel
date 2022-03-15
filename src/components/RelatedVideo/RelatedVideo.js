import React from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import Hidden from '@material-ui/core/Hidden'

import WatchLaterIcon from '@material-ui/icons/WatchLater'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import StarIcon from '@material-ui/icons/Star'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CheckIcon from '@material-ui/icons/Check'

import './_relatedvideo.scss'

const RelatedVideo = React.memo(props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAddToPlaylist = (category_id, video) => () => {
    const video_id = video.videos_id ? video.videos_id : video.id
    props.handleAddRemoveToPlaylist(true, category_id, video_id)
    props.handleSetToPlaylist(category_id, video)
  }

  const handleDeleteFromPlaylist = (category_id, video_id) => () => {
    props.handleAddRemoveToPlaylist(false, category_id, video_id)
    props.handleRemoveFromPlaylist(category_id, video_id)
  }

  return (
    <div className="related-video-card-container-cont">
      <Hidden lgUp>
        <div className="litem-more-vert-icon-mobile">
          <IconButton
            aria-label="More"
            aria-controls="fav-later-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fav-later-menu"
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
            <MenuItem onClick={handleAddToPlaylist('watch-later', props.video)}>
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
                id={`add-watch-later-related-video-container-${
                  props.category !== '0'
                    ? props.video.videos_id
                    : props.video.id
                }`}
                style={{
                  display: props.showInWatchLaterPlaylist ? 'block' : 'none',
                }}
                className="litem-watch-later-added"
              >
                <CheckIcon />
              </div>
            </MenuItem>
            <MenuItem onClick={handleAddToPlaylist('favorites', props.video)}>
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
                id={`add-favorites-related-video-container-${
                  props.category !== '0'
                    ? props.video.videos_id
                    : props.video.id
                }`}
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
            aria-controls="fav-later-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fav-later-menu"
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
            <MenuItem onClick={handleAddToPlaylist('watch-later', props.video)}>
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
                id={`add-watch-later-related-video-container-${
                  props.category !== '0'
                    ? props.video.videos_id
                    : props.video.id
                }`}
                style={{
                  display: props.showInWatchLaterPlaylist ? 'block' : 'none',
                }}
                className="litem-watch-later-added"
              >
                <CheckIcon />
              </div>
            </MenuItem>
            <MenuItem onClick={handleAddToPlaylist('favorites', props.video)}>
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
                id={`add-favorites-search-playlist-container-${
                  props.category !== '0'
                    ? props.video.videos_id
                    : props.video.id
                }`}
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
      {props.category !== '0' && (
        <>
          <Hidden lgUp>
            <div id={`add-playlist-container-search-${props.video.videos_id}`}>
              <Tooltip
                onClick={handleAddToPlaylist(props.category, props.video)}
                title={
                  props.locales.length &&
                  props.locales[8].translate_value !== ''
                    ? props.locales[8].translate_value
                    : props.locales[8].translate_key
                }
                placement="left"
                style={{ display: props.inPlaylist ? 'none' : 'flex' }}
              >
                <div className="litem-add-playlist-icon-mobile">
                  <AddIcon />
                </div>
              </Tooltip>
              <div
                onClick={handleDeleteFromPlaylist(
                  props.category,
                  props.video.videos_id
                )}
                style={{ display: props.inPlaylist ? 'flex' : 'none' }}
                className="litem-added-mobile"
              >
                <CheckIcon />
              </div>
            </div>
          </Hidden>
          <Hidden mdDown>
            <div id={`add-playlist-container-search-${props.video.videos_id}`}>
              <Tooltip
                onClick={handleAddToPlaylist(props.category, props.video)}
                title={
                  props.locales.length &&
                  props.locales[8].translate_value !== ''
                    ? props.locales[8].translate_value
                    : props.locales[8].translate_key
                }
                placement="left"
                style={{ display: props.inPlaylist ? 'none' : 'flex' }}
              >
                <div className="litem-add-playlist-icon">
                  <AddIcon />
                </div>
              </Tooltip>
              <div
                onClick={handleDeleteFromPlaylist(
                  props.category,
                  props.video.videos_id
                )}
                style={{ display: props.inPlaylist ? 'flex' : 'none' }}
                className="litem-added"
              >
                <CheckIcon />
              </div>
            </div>
          </Hidden>
        </>
      )}
      <NavLink
        className="video-card-link"
        to={`${process.env.PUBLIC_URL}/category/${props.category}/video/${
          props.category === '0' ? props.video.id : props.video.videos_id
        }`}
      >
        <div
          hola_ve_preview={
            props.video.video_id !== undefined
              ? `${process.env.REACT_APP_API_URL}admin/Uploads/videos/${props.video.video_id}.${props.video.type}`
              : ''
          }
          className="related-video-card"
        >
          <div className="img-cont">
            <img
              alt=""
              className="related-video-media"
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
          <div className="related-video-details">
            <div title={props.video.title} className="related-video-content">
              <Typography
                className="related-video-title"
                variant="h6"
                gutterBottom
              >
                {props.video.title}
              </Typography>
              <Typography
                className="related-video-description"
                variant="body1"
                color="textSecondary"
              >
                {props.video.description}
              </Typography>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  )
})

export default RelatedVideo
