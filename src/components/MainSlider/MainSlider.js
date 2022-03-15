import React, { PureComponent } from 'react'
// import { NavHashLink as NavLink } from 'react-router-hash-link'
import Slider from '../Slider/Slider'

import './_mainslider.scss'

export default class MainSlider extends PureComponent {
  render() {
    return (
      <div className="main-slider">
        {this.props.images.length ? (
          <Slider>
            {this.props.images.map((image, index) => (
              <div key={index} className="slide-cell">
                {image.url ? (
                  <a href={image.url}>
                    <div className="slider-overlay"></div>
                    <div className="slide-cell-content">
                      <img
                        src={process.env.REACT_APP_API_URL + image.img}
                        alt=""
                      />
                    </div>
                  </a>
                ) : (
                  <>
                    <div className="slider-overlay"></div>
                    <div className="slide-cell-content">
                      <img
                        src={process.env.REACT_APP_API_URL + image.img}
                        alt=""
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <div className="slide-cell">
            <div className="slider-overlay"></div>
            <div className="slide-cell-content">
              <img
                src={`${process.env.PUBLIC_URL}/gray-background.jpg`}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}
