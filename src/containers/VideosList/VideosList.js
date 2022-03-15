import React, { useMemo, PureComponent } from 'react'
import { connect } from 'react-redux'
import VideoCard from '../../components/VideoCard/VideoCard'
import Header from '../../components/Header/Header'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import InfiniteScroll from 'react-infinite-scroller'
import SearchFilterBar from '../../components/SearchFilterBar/SearchFilterBar'
import * as actions from '../../store/actions'
import Grid from '@material-ui/core/Grid'
import { scroller } from 'react-scroll'
import * as pl from '../../store/utils'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import WarningIcon from '@material-ui/icons/Warning'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Button from '@material-ui/core/Button'
import { NavHashLink as NavLink } from 'react-router-hash-link'

import './_videoslist.scss'

const VideoCards = React.memo(
  ({
    locales,
    videos,
    category,
    handleSetToPlaylist,
    handleAddRemoveToPlaylist,
    handleRemoveFromPlaylist,
  }) => {
    const listItems = useMemo(
      () =>
        videos.map(video => (
          <Grid item key={video.videos_id} xs={12} sm={6} md={4} lg={3}>
            <VideoCard
              handleSetToPlaylist={handleSetToPlaylist}
              handleAddRemoveToPlaylist={handleAddRemoveToPlaylist}
              handleRemoveFromPlaylist={handleRemoveFromPlaylist}
              showInPlaylist={pl.inPlaylist(category, video.videos_id)}
              showInWatchLaterPlaylist={pl.inPlaylist(
                'watch-later',
                video.videos_id
              )}
              showInFavoritesPlaylist={pl.inPlaylist(
                'favorites',
                video.videos_id
              )}
              locales={locales}
              category={category}
              video={video}
            />
          </Grid>
        )),
      [videos]
    )

    return (
      <Grid className="top-container" container spacing={1}>
        {listItems}
      </Grid>
    )
  }
)
VideoCards.displayName = 'VideoCards'

const MySnackbarContentWrapper = React.memo(props => {
  const { className, message, onClose, variant, ...other } = props

  return (
    <SnackbarContent
      className="warning-container"
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className="warning-message">
          <WarningIcon />
          {message}
        </span>
      }
      {...other}
    />
  )
})
MySnackbarContentWrapper.displayName = 'MySnackbarContentWrapper'

class VideosList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      perPage: 40,
      qtyPage: 40,
      lowRow: 0,
      topRow: 40,
      isLoading: false,
      filterVideos: '',
    }
  }

  async componentDidMount() {
    // await this.props.onClearPlaylist()
    this.props.onHasMoreVideos(true)
    if (Object.values(this.props.videos).length >= 1) {
      if (this.props.match.params.category_id !== 0) {
        await this.props.onGetCategory(this.props.match.params.category_id)
      }
      await this.props.onGetVideos(
        this.state.page,
        this.state.perPage,
        this.props.match.params.category_id,
        this.state.lowRow,
        this.state.topRow,
        true
      )
    } else {
      this.props.onClearCategories()
      this.props.onClearVideos()
      if (this.props.match.params.category_id !== 0) {
        await this.props.onGetCategory(this.props.match.params.category_id)
      }
      await this.props.onGetVideos(
        this.state.page,
        this.state.perPage,
        this.props.match.params.category_id,
        this.state.lowRow,
        this.state.topRow,
        true
      )
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.videos[this.props.match.params.category_id] !== undefined &&
      this.props.videos[this.props.match.params.category_id] !== undefined
    ) {
      if (
        this.state.qtyPage <
        this.props.videos[this.props.match.params.category_id].length
      ) {
        this.setState({
          isLoading: false,
          qtyPage: this.props.videos[this.props.match.params.category_id]
            .length,
        })
      }
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.onClearCategories()
      this.props.onHasMoreVideos(true)
      if (this.props.videos.length === 0) {
        if (this.props.match.params.category_id !== 0) {
          await this.props.onGetCategory(this.props.match.params.category_id)
        }
        await this.props.onGetVideos(
          this.state.page,
          this.state.perPage,
          this.props.match.params.category_id,
          this.state.lowRow,
          this.state.topRow
        )
      } else {
        // this.props.onClearVideos()
        if (this.props.match.params.category_id != 0) {
          await this.props.onGetCategory(this.props.match.params.category_id)
        }
        await this.props.onGetVideos(
          this.state.page,
          this.state.perPage,
          this.props.match.params.category_id,
          this.state.lowRow,
          this.state.topRow,
          false
        )
      }
      this.props.onHasMoreVideos(true)
    }
  }

  componentWillUnmount() {
    this.setState({
      page: 1,
      perPage: 40,
      qtyPage: 40,
      lowRow: 0,
      topRow: 40,
      isLoading: false,
      filterVideos: '',
    })
    this.props.onClearCategories()
    this.props.onClearVideos()
  }

  onGetVideosInfinite = () => {
    if (
      this.props.hasMoreVideos &&
      !this.props.isFetchingVideos &&
      !this.state.isLoading
    ) {
      const newPage = this.state.page + 1
      const newLowRow = this.state.lowRow + this.state.perPage
      const newTopRow = this.state.topRow + this.state.perPage

      this.setState({
        page: newPage,
        isLoading: true,
        lowRow: newLowRow,
        topRow: newTopRow,
      })

      this.props.onGetVideos(
        newPage,
        this.state.perPage,
        this.props.match.params.category_id,
        newLowRow,
        newTopRow,
        false
      )
    }
  }

  scrollTo() {
    scroller.scrollTo('top-container', {
      duration: 800,
      delay: 0.3,
      smooth: 'easeInOut',
      offset: -100,
    })
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

  // handleChange = e => {
  //   this.setState(oldValues => ({
  //     ...oldValues,
  //     [e.target.name]: e.target.value,
  //   }))
  //   this.props.onGetVideos(
  //     this.props.match.params.category_id,
  //     this.state.page,
  //     this.state.perPage,
  //     e.target.value
  //   )
  // }

  render() {
    return (
      <>
        {this.props.videos[this.props.match.params.category_id] !==
        undefined ? (
          <div className="list-container">
            <Grid className="top-container" container spacing={0}>
              <Header
                breadcrumb={this.props.category.channel_banner}
                categoryName={this.props.category.channel_name}
              />
            </Grid>
            <Grid className="top-container" container spacing={0}>
              <SearchFilterBar
                withPlaylist
                handleSetToPlaylist={this.handleSetToPlaylist}
                handleAddRemoveToPlaylist={this.handleAddRemoveToPlaylist}
                handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
                locales={this.props.locales}
                data={this.props.videosObj}
                handleChange={this.handleChange}
                filterValue={this.state.filterVideos}
                category={this.props.match.params.category_id}
              />
            </Grid>
            {Object.entries(this.props.videos).length === 0 ||
            this.props.videos[this.props.match.params.category_id].length ===
              0 ? (
              // <div className="loading-filter-screen">
              //   <LoadingSpinner
              //     sizeUnit={'px'}
              //     size={18}
              //     color={'#272a52'}
              //     loading={true}
              //   />
              // </div>
              <div className="playlist-order-container">
                <div className="playlist-order-container-cont">
                  <Grid justify={'center'} container spacing={1}>
                    <Grid
                      style={{ display: 'flex', justifyContent: 'center' }}
                      item
                      xs={12}
                    >
                      <MySnackbarContentWrapper
                        variant="warning"
                        message="Disuclpe, no hay vídeos en esta categoría"
                      />
                    </Grid>
                    <Grid
                      style={{ display: 'flex', justifyContent: 'center' }}
                      item
                      xs={12}
                    >
                      <div className="no-playlist-container">
                        <NavLink
                          className="snackbar-go-back-button-link"
                          to={`${process.env.PUBLIC_URL}/`}
                        >
                          <Button
                            variant="contained"
                            className="snackbar-go-back-button"
                          >
                            <ArrowBackIcon />
                            {this.props.locales.length
                              ? this.props.locales[22].translate_value !== ''
                                ? this.props.locales[22].translate_value
                                : this.props.locales[22].translate_key
                              : ''}

                            {this.props.locales.length && (
                              <span>
                                {this.props.locales[22].translate_value !== ''
                                  ? this.props.locales[22].translate_value
                                  : this.props.locales[22].translate_key}
                              </span>
                            )}
                          </Button>
                        </NavLink>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            ) : (
              <InfiniteScroll
                pageStart={this.state.page}
                loadMore={this.onGetVideosInfinite}
                hasMore={this.props.hasMoreVideos}
                loader={
                  <LoadingSpinner
                    key={this.state.page}
                    sizeUnit={'px'}
                    size={12}
                    color={'#272a52'}
                    loading={true}
                  />
                }
              >
                <VideoCards
                  handleSetToPlaylist={this.handleSetToPlaylist}
                  handleAddRemoveToPlaylist={this.handleAddRemoveToPlaylist}
                  handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
                  locales={this.props.locales}
                  videos={
                    this.props.videos[this.props.match.params.category_id]
                  }
                  category={this.props.match.params.category_id}
                />
              </InfiniteScroll>
            )}
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
    videos: state.videos.data,
    videosObj: state.videos.dataObj,
    hasMoreVideos: state.videos.hasMore,
    isFetchingVideos: state.videos.isFetching,
    isFilteringVideos: state.videos.isFiltering,
    category: state.categories.category,
    isFetchingCategory: state.categories.isFetching,
    sidebar: state.sidebar.status,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetCategory: category_id => dispatch(actions.getCategory(category_id)),
    onClearCategories: () => dispatch(actions.clearCategories()),
    onGetVideos: (page, perPage, category_id, lowRow, topRow, restore) =>
      dispatch(
        actions.getVideos(page, perPage, category_id, lowRow, topRow, restore)
      ),
    onClearVideos: () => dispatch(actions.clearVideos()),
    onHasMoreVideos: status => dispatch(actions.hasMoreVideos(status)),
    openSidebar: () => dispatch(actions.openSidebar()),
    closeSidebar: () => dispatch(actions.closeSidebar()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideosList)
