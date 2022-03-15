import React, { PureComponent } from 'react'
import Hidden from '@material-ui/core/Hidden'
import './_header.scss'

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header-cont">
        <Hidden xsDown>
          <div className="image-container">
            <div className="overlay"></div>
            <img
              style={{
                maxHeight:
                  this.props.breadcrumb === undefined ||
                  this.props.breadcrumb === 'none.gif'
                    ? '50vh'
                    : '',
              }}
              src={
                this.props.breadcrumb !== undefined &&
                this.props.breadcrumb !== 'none.gif'
                  ? process.env.REACT_APP_API_URL + this.props.breadcrumb
                  : `${process.env.PUBLIC_URL}/normal_default.png`
              }
              alt=""
            />
          </div>
          <div className="channel-title">
            <h1>{this.props.categoryName}</h1>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className="xs-title">
            <h1>{this.props.categoryName}</h1>
          </div>
        </Hidden>
      </div>
    )
  }
}
