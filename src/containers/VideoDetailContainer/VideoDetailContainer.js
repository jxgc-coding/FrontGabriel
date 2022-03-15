import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import VideoDetail from '../../components/VideoDetail/VideoDetail'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import RelatedVideosSidebar from '../../components/RelatedVideosSidebar/RelatedVideosSidebar'
import * as pl from '../../store/utils'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

import banner from '../../assets/img/banner.jpg'
import 'react-perfect-scrollbar/dist/css/styles.css'

import './_videodetailcontainer.scss'

class VideoDetailContainer extends PureComponent {
  async componentDidMount() {
    await this.props.onGetVideo(
      this.props.match.params.video_id,
      this.props.match.params.category_id
    )
    await this.props.onGetRelatedVideos(
      this.props.match.params.video_id,
      this.props.match.params.category_id,
      24
    )
    if (
      Object.entries(this.props.video).length !== 0 &&
      Object.entries(this.props.relatedVideos).length !== 0
    ) {
      setTimeout(() => {
        if (document.getElementById('video') !== null) {
          const divVideo = document.getElementById('video').clientHeight
          const divDescription = document.getElementById('description')
            .clientHeight

          if (document.getElementById('related-videos') !== null) {
            document.getElementById('related-videos').style.height =
              divVideo + divDescription + 6 + 'px'
          }
        }
      }, 600)
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.onClearVideos()
      await this.props.onGetVideo(
        this.props.match.params.video_id,
        this.props.match.params.category_id
      )
      await this.props.onGetRelatedVideos(
        this.props.match.params.video_id,
        this.props.match.params.category_id,
        24
      )
    }
    if (
      Object.entries(this.props.video).length !== 0 &&
      Object.entries(this.props.relatedVideos).length !== 0
    ) {
      setTimeout(() => {
        if (document.getElementById('video') !== null) {
          const divVideo = document.getElementById('video').clientHeight
          const divDescription = document.getElementById('description')
            .clientHeight

          if (document.getElementById('related-videos') !== null) {
            document.getElementById('related-videos').style.height =
              divVideo + divDescription + 6 + 'px'
          }
        }
      }, 600)
    }
  }

  handleSetToPlaylist(category_id, video) {
    pl.setPlaylist(category_id, video)
  }

  handleRemoveFromPlaylist(category_id, video_id) {
    pl.removePlaylist(category_id, video_id)
  }

  handleAddRemoveToPlaylist(action, category_id, video_id) {
    if (category_id !== 'watch-later' && category_id !== 'favorites') {
      const cardElement = document.getElementById(
        `add-playlist-container-${video_id}`
      )

      const searchElement = document.getElementById(
        `add-playlist-container-search-${video_id}`
      )

      if (action) {
        if (cardElement) {
          cardElement.childNodes[0].style.display = 'none'
          cardElement.childNodes[1].style.display = 'flex'
        }
        if (searchElement) {
          searchElement.childNodes[0].style.display = 'none'
          searchElement.childNodes[1].style.display = 'flex'
        }
      } else {
        if (cardElement) {
          cardElement.childNodes[0].style.display = 'flex'
          cardElement.childNodes[1].style.display = 'none'
        }
        if (searchElement) {
          searchElement.childNodes[0].style.display = 'flex'
          searchElement.childNodes[1].style.display = 'none'
        }
      }
    } else {
      const cardElement = document.getElementById(
        `add-${category_id}-playlist-container-${video_id}`
      )

      const searchElement = document.getElementById(
        `add-${category_id}-search-playlist-container-${video_id}`
      )

      console.log(category_id)
      console.log(video_id)

      const relatedElement = document.getElementById(
        `add-${category_id}-related-video-container-${video_id}`
      )

      if (relatedElement) {
        if (relatedElement.style.display === 'flex') {
          relatedElement.style.display = 'none'
        } else {
          relatedElement.style.display = 'flex'
        }
      }

      if (cardElement) {
        if (cardElement.style.display === 'flex') {
          cardElement.style.display = 'none'
        } else {
          cardElement.style.display = 'flex'
        }
      }

      if (searchElement) {
        if (searchElement.style.display === 'flex') {
          searchElement.style.display = 'none'
        } else {
          searchElement.style.display = 'flex'
        }
      }
    }
  }

  render() {
    return (
      <>
        {(!this.props.isFetchingVideos || !this.props.isFetchingCategory) &&
        Object.entries(this.props.video).length !== 0 &&
        this.props.video.constructor === Object ? (
          <div className="video-detail-container">
            <div className="video-detail-container-cont">
              <Grid justify={'center'} container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={
                    Object.entries(this.props.relatedVideos).length !== 0
                      ? 8
                      : 9
                  }
                >
                  <VideoDetail
                    video={this.props.video}
                    locales={this.props.locales}
                    category={this.props.match.params.category_id}
                    inWatchLaterPlaylist={pl.inPlaylist(
                      'watch-later',
                      this.props.match.params.category_id !== '0'
                        ? this.props.video.videos_id
                        : this.props.video.id
                    )}
                    inFavoritesPlaylist={pl.inPlaylist(
                      'favorites',
                      this.props.match.params.category_id !== '0'
                        ? this.props.video.videos_id
                        : this.props.video.id
                    )}
                  />
                </Grid>
                {this.props.relatedVideos.length !== 0 && (
                  <Hidden smDown>
                    <Grid id="related-videos" item xs={12} md={4}>
                      <RelatedVideosSidebar
                        banner={banner}
                        locales={this.props.locales}
                        category={this.props.match.params.category_id}
                        RelatedVideos={this.props.relatedVideos}
                        handleSetToPlaylist={this.handleSetToPlaylist}
                        handleAddRemoveToPlaylist={
                          this.handleAddRemoveToPlaylist
                        }
                        handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
                      />
                    </Grid>
                  </Hidden>
                )}
                <Grid item xs={12}>
                  <CategorySlider
                    locales={this.props.locales}
                    categories={this.props.videoCategories}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        ) : (
          <div className="loading-screen">
            <LoadingSpinner
              sizeUnit={'px'}
              size={18}
              color={'#272a52'}
              loading={true}
            />
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    locales: state.locales.data,
    video: state.videos.video,
    relatedVideos: state.videos.relatedVideos,
    videoCategories: state.categories.videoData,
    isFetchingVideos: state.videos.isFetching,
    isFetchingCategory: state.categories.isFetching,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetVideo: (video_id, category_id) =>
      dispatch(actions.getVideo(video_id, category_id)),
    onGetVideos: (category_id, page) =>
      dispatch(actions.getVideos(category_id, page)),
    onGetRelatedVideos: (current_video_id, category_id, qty) =>
      dispatch(actions.getRelatedVideos(current_video_id, category_id, qty)),
    onClearVideos: () => dispatch(actions.clearVideos()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoDetailContainer)
