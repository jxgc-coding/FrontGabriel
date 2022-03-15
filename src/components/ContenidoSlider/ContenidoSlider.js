import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import { NavHashLink as NavLink } from 'react-router-hash-link'
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'

import Slider from '../Slider/Slider'
import './_contenidoslider.scss'

const ContentOverlayComponent = React.memo(({ locales, contentType }) => {
  return (
    <div className="content-overlay">
      <Fab variant="extended" className="saber-mas-button">
        {/* <TvIcon className="playCircleIcon" /> */}
        {locales.length && (
          <span className="span-label">
            {locales[6].translate_value !== ''
              ? locales[6].translate_value
              : locales[6].translate_key}
          </span>
        )}
      </Fab>
    </div>
  )
})

const contenidoGrid = (locales, contenido) => (
  <Grid key={contenido.id} className="cell" item xs={12} sm={6} md={4} lg={4}>
    <NavLink
      className="contenido-card-link"
      to={`${process.env.PUBLIC_URL}/category/0/content/${contenido.id}`}
    >
      <div title={contenido.title} className="card">
        <div className="img-cont">
          <img
            alt=""
            className="card-image"
            src={
              contenido.thumb !== undefined && contenido.thumb !== 'none.gif'
                ? process.env.REACT_APP_API_URL + contenido.thumb
                : `${process.env.PUBLIC_URL}/normal_default.png`
            }
          />
          <div className="card-content">
            <Typography className="contenido-title" variant="h6" gutterBottom>
              {contenido.title}
            </Typography>
            {contenido.description && (
              <Typography
                className="contenido-description"
                variant="body1"
                color="textSecondary"
              >
                {contenido.description}
              </Typography>
            )}
          </div>
          <div className="overlay"></div>
          <ContentOverlayComponent
            locales={locales}
            contentType={contenido.type}
          />
        </div>
      </div>
    </NavLink>
  </Grid>
)

class ContenidoSlider extends PureComponent {
  render() {
    return (
      <>
        {this.props.contenidos.length > 0 ? (
          <div className="contenido-slider-container">
            {this.props.locales.length > 0 && (
              <h1>
                {this.props.locales[11].translate_value !== ''
                  ? this.props.locales[11].translate_value
                  : this.props.locales[11].translate_key}
              </h1>
            )}
            <div className="contenido-slider">
              {(this.props.contenidos.length > 6 &&
                window.innerWidth >= 1920) ||
              (this.props.contenidos.length > 4 && window.innerWidth >= 1280) ||
              (this.props.contenidos.length > 3 && window.innerWidth >= 960) ||
              (this.props.contenidos.length > 2 && window.innerWidth < 960) ? (
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
                    {this.props.contenidos.map(contenido =>
                      contenidoGrid(this.props.locales, contenido)
                    )}
                  </Grid>
                </Slider>
              ) : (
                <Grid container spacing={1}>
                  {this.props.contenidos.map(contenido =>
                    contenidoGrid(this.props.locales, contenido)
                  )}
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

export default ContenidoSlider
