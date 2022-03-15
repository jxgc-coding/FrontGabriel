import React from 'react'
import Nav from '../Nav/Nav'
import { connect } from 'react-redux'
import useStyles from './Layout.module'

const layout = React.memo(function layout(props) {
  const classes = useStyles()
  return (
    <>
      <Nav
        data={props.allVideos}
        open={props.open}
        handleRedirects={props.handleRedirects}
        handleDrawer={props.handleDrawer}
        classes={classes}
      />
      <main>{props.children}</main>
    </>
  )
})

const mapStateToProps = state => {
  return {
    allVideos: state.videos.allVideos,
  }
}

export default connect(mapStateToProps)(layout)
