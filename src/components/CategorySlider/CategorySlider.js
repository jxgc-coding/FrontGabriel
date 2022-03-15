import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import { NavHashLink as NavLink } from 'react-router-hash-link'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'

import Slider from '../Slider/Slider'
import './_categoryslider.scss'

const categoryGrid = (locales, category, isContent) => (
  <Grid
    key={category.channel_id}
    className="cell"
    item
    xs={12}
    sm={6}
    md={4}
    lg={3}
    xl={2}
  >
    <NavLink
      exact
      className="category-link"
      activeClassName="selected"
      to={
        isContent
          ? `${process.env.PUBLIC_URL}/category/${category.channel_id}/content`
          : `${process.env.PUBLIC_URL}/category/${category.channel_id}`
      }
    >
      <div
        title={category.channel_name}
        className="category-slider-card-container"
      >
        <div className="overlay-title-category">
          <p>{category.channel_name}</p>
        </div>
        <Card className="card">
          <div className="img-cont">
            <CardMedia
              className="card-image"
              image={
                category.channel_picture !== undefined &&
                category.channel_picture !== 'none.gif'
                  ? process.env.REACT_APP_API_URL + category.channel_picture
                  : `${process.env.PUBLIC_URL}/normal_default.png`
              }
            />
            <div className="overlay"></div>
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
          </div>
          {/* <CardContent className="card-content">
            <Typography className="category-title" variant="h2" gutterBottom>
              {category.channel_name}
            </Typography>
          </CardContent> */}
        </Card>
      </div>
    </NavLink>
  </Grid>
)

class CategorySlider extends PureComponent {
  render() {
    return (
      <div className="category-slider-container">
        {this.props.locales.length > 0 &&
          (!this.props.variant ? (
            <h1 className="normal-title">
              {this.props.locales[1].translate_value !== ''
                ? this.props.locales[1].translate_value
                : this.props.locales[1].translate_key}
            </h1>
          ) : (
            <h1 className="variant-title">
              {this.props.locales[16].translate_value !== ''
                ? this.props.locales[16].translate_value
                : this.props.locales[16].translate_key}
            </h1>
          ))}
        <div className="category-slider">
          {(this.props.categories.length > 6 && window.innerWidth >= 1920) ||
          (this.props.categories.length > 4 && window.innerWidth >= 1280 && window.innerWidth < 1920) ||
          (this.props.categories.length > 3 && window.innerWidth >= 960 && window.innerWidth < 1280) ||
          (this.props.categories.length > 2 && window.innerWidth < 960) ? (
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
              {this.props.categories.map(category =>
                categoryGrid(this.props.locales, category, this.props.isContent)
              )}
            </Slider>
          ) : (
            <Grid container>
              {this.props.categories.map(category =>
                categoryGrid(this.props.locales, category, this.props.isContent)
              )}
            </Grid>
          )}
        </div>
      </div>
    )
  }
}

export default CategorySlider
