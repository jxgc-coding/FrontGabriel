import React, { Component, Suspense } from 'react'
import Home from './containers/Home/Home'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/'
import Layout from './components/Layout/Layout'
import ScrollUpButton from 'react-scroll-up-button'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { scroller } from 'react-scroll'

import './App.scss'

const VideosList = React.lazy(() => {
  return import('./containers/VideosList/VideosList')
})

const VideoDetailContainer = React.lazy(() => {
  return import('./containers/VideoDetailContainer/VideoDetailContainer')
})

const ContentsList = React.lazy(() => {
  return import('./containers/ContentsList/ContentsList')
})

const ContentDetailContainer = React.lazy(() => {
  return import('./containers/ContentDetailContainer/ContentDetailContainer')
})

const PlaylistOrder = React.lazy(() => {
  return import('./containers/PlaylistOrder/PlaylistOrder')
})

const PlaylistContainer = React.lazy(() => {
  return import('./containers/PlaylistContainer/PlaylistContainer')
})

class App extends Component {
  async componentDidMount() {
    await this.props.onGetBasicMedia()
    await this.props.onGetAllVideos()
    await this.props.onGetLocales()
    if (window.location.hash === '#streaming') {
      let removeClass = document.getElementsByClassName('selected')
      if (removeClass.length) {
        removeClass[0].classList.remove('selected')
        Array.prototype.forEach.call(removeClass, function(el) {
          el.classList.remove('selected')
        })
      }
      let target = document.getElementById('canal-tv')
      if (target) {
        if (!target.classList.contains('selected')) {
          target.classList.add('selected')
          setTimeout(() => {
            scroller.scrollTo('streaming', {
              duration: 800,
              delay: 0,
              smooth: 'easeInOutQuart',
              offset: -98,
            })
          }, 500)
        }
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      await this.props.onGetBasicMedia()
      await this.props.onGetAllVideos()
      await this.props.onGetLocales()
      let target = document.getElementById('canal-tv')
      if (target) {
        if (target.classList.contains('selected')) {
          target.classList.remove('selected')
        }
      }
    }
  }

  render() {
    const handleRedirects = (e, id = -1) => {
      let target = e.currentTarget
      if (target.id === 'canal-tv') {
        if (!target.classList.contains('selected')) {
          setTimeout(() => {
            let removeClass = document.getElementsByClassName('selected')
            if (removeClass.length) {
              removeClass[0].classList.remove('selected')
              Array.prototype.forEach.call(removeClass, function(el) {
                el.classList.remove('selected')
              })
            }
          }, 500)
          setTimeout(() => {
            target = document.getElementById('canal-tv')
            if (target) {
              if (!target.classList.contains('selected')) {
                target.classList.add('selected')
              }
            }
          }, 500)
        }
      } else {
        let otherTarget = document.getElementById('canal-tv')
        otherTarget.classList.remove('selected')
        target.classList.add('selected')
      }
    }

    let routes = (
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/playlist/:category_id`}
          render={props => <PlaylistOrder {...props} />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/playlist/:category_id/play`}
          render={props => <PlaylistContainer {...props} />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/category/:category_id`}
          render={props => <VideosList {...props} />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/category/:category_id/video/:video_id`}
          render={props => <VideoDetailContainer {...props} />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/category/:category_id/content`}
          render={props => <ContentsList {...props} />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/category/:category_id/content/:content_id`}
          render={props => <ContentDetailContainer {...props} />}
        />
      </Switch>
    )

    return (
      <div className="App">
        <Layout handleRedirects={handleRedirects} open={this.props.sidebar}>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
          <ScrollUpButton
            ContainerClassName="goToTop"
            TransitionClassName="goToTopTransition"
            EasingType="easeInOutCirc"
            AnimationDuration={708}
          >
            <KeyboardArrowUpIcon />
          </ScrollUpButton>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sidebar: state.sidebar.status,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetBasicMedia: () => dispatch(actions.getBasicMedia()),
    openSidebar: () => dispatch(actions.openSidebar()),
    closeSidebar: () => dispatch(actions.closeSidebar()),
    onGetAllVideos: () => dispatch(actions.getAllVideos()),
    onGetLocales: () => dispatch(actions.getLocales()),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
