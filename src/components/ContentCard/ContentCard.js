import React from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import Typography from '@material-ui/core/Typography'
// import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
// import IconButton from '@material-ui/core/IconButton'
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// import Tooltip from '@material-ui/core/Tooltip'
// import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import Fab from '@material-ui/core/Fab'

// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import WatchLaterIcon from '@material-ui/icons/WatchLater'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import StarIcon from '@material-ui/icons/Star'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'

import './_contentCard.scss'

const ContentCard = React.memo(function ContentCard(props) {
  // const [anchorEl, setAnchorEl] = useState(null)
  // const open = Boolean(anchorEl)

  // const tooltipText =
  //   props.locales.length > 0
  //     ? props.locales[8].translate_value !== ''
  //       ? props.locales[8].translate_value
  //       : props.locales[8].translate_key
  //     : ''

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget)
  // }

  // function handleClose() {
  //   setAnchorEl(null)
  // }

  // const handleAddToPlaylist = (e, category_id, content_id) => {
  //   props.handleAddRemoveToPlaylist(true, content_id)
  //   props.handleSetToPlaylist(category_id, content_id)
  // }

  const handleDeleteFromPlaylist = (category_id, content_id) => {
    props.handleAddRemoveToPlaylist(false, category_id, content_id)
    props.handleRemoveFromPlaylist(category_id, content_id)
  }

  return (
    <div className="content-card-container">
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon className="menu-item">
              <WatchLaterIcon />
            </ListItemIcon>
            {props.locales.length && (
              <Typography className="text-poover-menu" variant="inherit" noWrap>
                {props.locales[4].translate_value !== ''
                  ? props.locales[4].translate_value
                  : props.locales[4].translate_key}
              </Typography>
            )}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon className="menu-item">
              <StarIcon className="star-favorite" />
            </ListItemIcon>
            {props.locales.length && (
              <Typography className="text-poover-menu" variant="inherit" noWrap>
                {props.locales[9].translate_value !== ''
                  ? props.locales[9].translate_value
                  : props.locales[9].translate_key}
              </Typography>
            )}
          </MenuItem>
        </Menu>
      </div> */}
      <div id={`add-playlist-container-${props.content.id}`}>
        {/* <Tooltip
          onClick={e => handleAddToPlaylist(e, props.category, props.content.id)}
          title={tooltipText}
          placement="left"
          style={{ display: props.showInPlaylist ? 'none' : 'block' }}
        >
          <div className="litem-add-playlist-icon">
            <AddIcon />
          </div>
        </Tooltip> */}
        <div
          onClick={e =>
            handleDeleteFromPlaylist(e, props.category, props.content.id)
          }
          style={{ display: props.showInPlaylist ? 'block' : 'none' }}
          className="litem-added"
        >
          <CheckIcon />
        </div>
      </div>
      <NavLink
        className="content-card-link"
        to={`${process.env.PUBLIC_URL}/category/${props.category}/content/${props.content.id}`}
      >
        <div className="card">
          <div className="img-cont">
            <img
              alt=""
              className="card-image"
              src={
                props.content.thumb !== undefined &&
                props.content.thumb !== 'none.gif'
                  ? process.env.REACT_APP_API_URL + props.content.thumb
                  : `${process.env.PUBLIC_URL}/normal_default.png`
              }
            />
            <div className="overlay"></div>
            <div className="content-overlay">
              <Fab variant="extended" className="saber-mas-button">
                {props.locales.length && (
                  <span className="span-label">
                    {props.locales[6].translate_value !== ''
                      ? props.locales[6].translate_value
                      : props.locales[6].translate_key}
                  </span>
                )}
              </Fab>
            </div>
          </div>
          <div title={props.content.title} className="card-content">
            <Typography className="content-title" variant="h6" gutterBottom>
              {props.content.title}
            </Typography>
            <Typography
              className="content-description"
              variant="body1"
              color="textSecondary"
            >
              {props.content.description}
            </Typography>
          </div>
        </div>
      </NavLink>
    </div>
    // <div className="content-card-container">
    //   <div className="litem-more-vert-icon">
    //     <IconButton
    //       aria-label="More"
    //       aria-controls="long-menu"
    //       aria-haspopup="true"
    //       onClick={handleClick}
    //     >
    //       <MoreVertIcon />
    //     </IconButton>
    //     <Menu
    //       id="long-menu"
    //       anchorEl={anchorEl}
    //       keepMounted
    //       open={open}
    //       onClose={handleClose}
    //       PaperProps={{
    //         style: {
    //           width: 240,
    //         },
    //       }}
    //     >
    //       <MenuItem onClick={handleClose}>
    //         <ListItemIcon className="menu-item">
    //           <WatchLaterIcon />
    //         </ListItemIcon>
    //         <Typography className="text-poover-menu" variant="inherit" noWrap>
    //           Ver más tarde
    //         </Typography>
    //       </MenuItem>
    //       <MenuItem onClick={handleClose}>
    //         <ListItemIcon className="menu-item">
    //           <StarIcon className="star-favorite" />
    //         </ListItemIcon>
    //         <Typography className="text-poover-menu" variant="inherit" noWrap>
    //           Añadir a favoritos
    //         </Typography>
    //       </MenuItem>
    //     </Menu>
    //   </div>
    //   <Tooltip
    //     onClick={() => handleAddToPlaylist(props.content.id)}
    //     title="Añadir a playlist"
    //     placement="left"
    //   >
    //     <div className="litem-add-playlist-icon">
    //       <AddIcon />
    //     </div>
    //   </Tooltip>
    //   <NavLink
    //     className="content-card-link"
    //     to={
    //       '/' +
    //       props.content.categories[0].friendly_url +
    //       '/' +
    //       props.content.categories[0].id +
    //       '/' +
    //       props.content.friendly_url +
    //       '/' +
    //       props.content.id
    //     }
    //   >
    // <Card className="card">
    //   <div
    //     hola_ve_preview={
    //       props.content.medias.contents !== undefined
    //         ? props.content.medias.contents[0].full_url
    //         : ''
    //     }
    //     className="img-cont"
    //   >
    //     <CardMedia
    //       className="card-image"
    //       image={
    //         props.content.medias.thumbnail !== undefined
    //           ? props.content.medias.thumbnail.thumb[0].full_url
    //           : `${process.env.PUBLIC_URL}/normal_default.png`
    //       }
    //       title=""
    //     />
    //     <div className="overlay"></div>
    //     <div className="content-overlay">
    //       <IconButton>
    //         <PlayCircleOutlineIcon className="play-circle-icon" />
    //       </IconButton>
    //     </div>
    //   </div>
    //   <CardContent className="card-content">
    //     <Typography className="content-title" variant="h6" gutterBottom>
    //       {props.content.name}
    //     </Typography>
    //     <Typography
    //       className="content-description"
    //       variant="body1"
    //       color="textSecondary"
    //     >
    //       {props.content.description}
    //     </Typography>
    //   </CardContent>
    // </Card>
    //   </NavLink>
    // </div>
  )
})

export default ContentCard
