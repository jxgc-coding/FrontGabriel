import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import Slider from '../Slider/Slider'
import './_videoslider.scss'

const videoGrid = video => (
  <Grid key={video.id} className="cell" item xs={12} sm={6} md={4} lg={4}>
    <NavLink
      className="video-card-link"
      to={`${process.env.PUBLIC_URL}/category/0/video/${video.id}`}
    >
      <div title={video.title} className="card">
        <div className="img-cont">
          <img
            alt=""
            className="card-image"
            src={
              video.thumbnail !== undefined && video.thumbnail !== 'none.gif'
                ? process.env.REACT_APP_API_URL + video.thumbnail
                : `${process.env.PUBLIC_URL}/normal_default.png`
            }
          />
          <div className="card-content">
            <Typography className="video-title" variant="h6" gutterBottom>
              {video.title}
            </Typography>
            <Typography
              className="video-description"
              variant="body1"
              color="textSecondary"
            >
              {video.description}
            </Typography>
          </div>
          <div className="overlay"></div>
          <div className="content-overlay">
            <IconButton>
              <PlayCircleOutlineIcon className="play-circle-icon" />
            </IconButton>
          </div>
        </div>
      </div>
    </NavLink>
  </Grid>
)

class VideoSlider extends PureComponent {
  render() {
    return (
      <>
        {this.props.videos.length > 0 ? (
          <div className="video-slider-container">
            {this.props.locales.length > 0 && (
              <h1>
                {this.props.locales[10].translate_value !== ''
                  ? this.props.locales[10].translate_value
                  : this.props.locales[10].translate_key}
              </h1>
            )}
            <div className="video-slider">
              {(this.props.videos.length > 6 && window.innerWidth >= 1920) ||
              (this.props.videos.length > 4 && window.innerWidth >= 1280) ||
              (this.props.videos.length > 3 && window.innerWidth >= 960) ||
              (this.props.videos.length > 2 && window.innerWidth < 960) ? (
                <Slider
                  options={{
                    groupCells: 1,
                    lazyLoad: true,
                    wrapAround: true,
                    setGallerySize: true,
                    imagesLoaded: true,
                    adaptiveHeight: true,
                    resize: true,
                    cellSelector: '.cell',
                    pageDots: false,
                    cellAlign: 'left',
                  }}
                >
                  <Grid container spacing={1}>
                    {this.props.videos.map(video => videoGrid(video))}
                  </Grid>
                </Slider>
              ) : (
                <Grid container spacing={1}>
                  {this.props.videos.map(video => videoGrid(video))}
                </Grid>
              )}
            </div>
          </div>
        ) : (
          <div className="skull">
            {this.props.locales.length > 0 && (
              <h1>
                {this.props.locales[11].translate_value !== ''
                  ? this.props.locales[11].translate_value
                  : this.props.locales[11].translate_key}
              </h1>
            )}
            <Grid container spacing={1}>
              <Grid className="cell" item xs={12} sm={6} md={4} lg={4}>
                <div className="card">
                  <div className="img-cont">
                    <div className="card-image"></div>
                  </div>
                </div>
              </Grid>
              <Grid className="cell" item xs={12} sm={6} md={4} lg={4}>
                <div className="card">
                  <div className="img-cont">
                    <div className="card-image"></div>
                  </div>
                </div>
              </Grid>
              <Grid className="cell" item xs={12} sm={6} md={4} lg={4}>
                <div className="card">
                  <div className="img-cont">
                    <div className="card-image"></div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </>
    )
  }
}

export default VideoSlider
