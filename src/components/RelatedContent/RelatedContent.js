import React from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

// import WatchLaterIcon from '@material-ui/icons/WatchLater'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import StarIcon from '@material-ui/icons/Star'
// import AddIcon from '@material-ui/icons/Add'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
// import Tooltip from '@material-ui/core/Tooltip'

import './_relatedcontent.scss'

const RelatedContent = React.memo(function RelatedContent(props) {
  // const [anchorEl, setAnchorEl] = React.useState(null)
  // const open = Boolean(anchorEl)

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget)
  // }

  // function handleClose() {
  //   setAnchorEl(null)
  // }

  // function handleWatchLaterClick(id) {
  //   console.log(id)
  // }

  // const laterText =
  //   props.locales.length > 0
  //     ? props.locales[4].translate_value !== ''
  //       ? props.locales[4].translate_value
  //       : props.locales[4].translate_key
  //     : ''

  // const favText =
  //   props.locales.length > 0
  //     ? props.locales[9].translate_value !== ''
  //       ? props.locales[9].translate_value
  //       : props.locales[9].translate_key
  //     : ''

  // const tooltipText =
  //   props.locales.length > 0
  //     ? props.locales[8].translate_value !== ''
  //       ? props.locales[8].translate_value
  //       : props.locales[8].translate_key
  //     : ''

  return (
    <div className="related-content-card-container">
      {/* <div className="litem-more-vert-icon">
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          className="related-content-menu"
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: 220,
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon className="menu-item">
              <WatchLaterIcon />
            </ListItemIcon>
            <Typography className="text-poover-menu" variant="inherit" noWrap>
              {laterText}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon className="menu-item">
              <StarIcon className="star-favorite" />
            </ListItemIcon>
            <Typography className="text-poover-menu" variant="inherit" noWrap>
              {favText}
            </Typography>
          </MenuItem>
        </Menu>
      </div> */}
      <NavLink
        className="content-card-link"
        to={`${props.linkTo}/content/${props.content.id}`}
      >
        <Card className="related-content-card">
          <div className="img-cont">
            {/* <Tooltip
              onClick={() => handleWatchLaterClick(props.content.index)}
              title={tooltipText}
              placement="left"
            >
              <div className="litem-add-playlist-icon">
                <AddIcon />
              </div>
            </Tooltip> */}
            <CardMedia
              className="related-content-media"
              image={
                props.content.thumb !== undefined &&
                props.content.thumb !== 'none.gif'
                  ? process.env.REACT_APP_API_URL + props.content.thumb
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
          <div
            title={String(props.content.title)}
            className="related-content-details"
          >
            <CardContent className="related-content-content">
              <Typography
                className="related-content-title"
                component="h5"
                variant="h5"
              >
                {String(props.content.title)}
              </Typography>
              <Typography
                className="related-content-description"
                variant="subtitle1"
                color="textSecondary"
              >
                {String(props.content.description)}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </NavLink>
    </div>
  )
})

export default RelatedContent
