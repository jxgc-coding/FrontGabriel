import React, { PureComponent } from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import IconButton from '@material-ui/core/IconButton'

import './_imgpreviewplaylist.scss'

export default class ImgPreviewPlaylist extends PureComponent {
  render() {
    return (
      <>
        {this.props.items.length ? (
          <NavLink
            to={`${process.env.PUBLIC_URL}/playlist/${this.props.category}/play`}
          >
            <div className="playlist-preview-img-cont">
              <img
                alt=""
                className="card-image"
                src={
                  this.props.items[0].thumbnail !== undefined &&
                  this.props.items[0].thumbnail !== 'none.gif'
                    ? process.env.REACT_APP_API_URL +
                      this.props.items[0].thumbnail
                    : `${process.env.PUBLIC_URL}/normal_default.png`
                }
              />
              <div className="play-overlay">
                <PlayArrowIcon />
                <span>REPRODUCIR TODO</span>
              </div>
              <div className="overlay"></div>
              <div className="content-overlay">
                <IconButton>
                  <PlayCircleOutlineIcon className="play-circle-icon" />
                </IconButton>
              </div>
            </div>
          </NavLink>
        ) : (
          <div className="playlist-preview-img-cont">
            <div className="skull-card-image"></div>
          </div>
        )}
      </>
    )
  }
}
