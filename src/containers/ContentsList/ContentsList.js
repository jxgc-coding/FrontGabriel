import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ContentCard from '../../components/ContentCard/ContentCard'
import Header from '../../components/Header/Header'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import InfiniteScroll from 'react-infinite-scroller'
import SearchFilterBar from '../../components/SearchFilterBar/SearchFilterBar'
import * as actions from '../../store/actions'
import Grid from '@material-ui/core/Grid'
import { scroller } from 'react-scroll'
import * as pl from '../../store/utils'
import Button from '@material-ui/core/Button'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import WarningIcon from '@material-ui/icons/Warning'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import './_contentslist.scss'

const ContentCards = props => {
  const listItems = props.contents.map(content => (
    <Grid item key={content.id} xs={12} sm={6} md={4} lg={3}>
      <ContentCard
        handleSetToPlaylist={props.handleSetToPlaylist}
        handleAddRemoveToPlaylist={props.handleAddRemoveToPlaylist}
        handleRemoveFromPlaylist={props.handleRemoveFromPlaylist}
        showInPlaylist={pl.inPlaylist(props.category, content.id)}
        locales={props.locales}
        category={props.category}
        content={content}
      />
    </Grid>
  ))
  return (
    <Grid className="top-container" container spacing={1}>
      {listItems}
    </Grid>
  )
}

function MySnackbarContentWrapper(props) {
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
}

class ContentsList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      perPage: 40,
      qtyPage: 40,
      lowRow: 0,
      topRow: 40,
      isLoading: false,
      filterContents: '',
    }
  }

  async componentDidMount() {
    // await this.props.onClearPlaylist()
    this.props.onHasMoreContents(true)
    if (Object.values(this.props.contents).length >= 1) {
      if (this.props.match.params.category_id != 0) {
        await this.props.onGetCategory(this.props.match.params.category_id)
      }
      await this.props.onGetContents(
        this.state.page,
        this.state.perPage,
        this.props.match.params.category_id,
        this.state.lowRow,
        this.state.topRow,
        true
      )
    } else {
      this.props.onClearCategories()
      this.props.onClearContents()
      if (this.props.match.params.category_id != 0) {
        await this.props.onGetCategory(this.props.match.params.category_id)
      }
      await this.props.onGetContents(
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
      prevProps.contents[this.props.match.params.category_id] !== undefined &&
      this.props.contents[this.props.match.params.category_id] !== undefined
    ) {
      if (
        this.state.qtyPage <
        this.props.contents[this.props.match.params.category_id].length
      ) {
        this.setState({
          page: 1,
          perPage: 40,
          lowRow: 0,
          topRow: 40,
          isLoading: false,
          filterContents: '',
          qtyPage: this.props.contents[this.props.match.params.category_id]
            .length,
        })
      }
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.onClearCategories()
      this.props.onHasMoreContents(true)
      if (this.props.contents.length === 0) {
        if (this.props.match.params.category_id != 0) {
          await this.props.onGetCategory(this.props.match.params.category_id)
        }
        await this.props.onGetContents(
          this.state.page,
          this.state.perPage,
          this.props.match.params.category_id,
          this.state.lowRow,
          this.state.topRow
        )
      } else {
        // this.props.onClearContents()
        if (this.props.match.params.category_id != 0) {
          await this.props.onGetCategory(this.props.match.params.category_id)
        }
        await this.props.onGetContents(
          this.state.page,
          this.state.perPage,
          this.props.match.params.category_id,
          this.state.lowRow,
          this.state.topRow,
          false
        )
      }
      this.props.onHasMoreContents(true)
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
      filterContents: '',
    })
    this.props.onClearCategories()
    this.props.onClearContents()
  }

  onGetContentsInfinite = () => {
    if (
      this.props.hasMoreContenidos &&
      !this.props.isFetchingContents &&
      !this.state.isLoading
    ) {
      this.setState({
        page: this.state.page + 1,
        isLoading: true,
        lowRow: this.state.lowRow + this.state.perPage,
        topRow: this.state.topRow + this.state.perPage,
      })
      this.props.onGetContents(
        this.state.page,
        this.state.perPage,
        this.props.match.params.category_id,
        this.state.lowRow,
        this.state.topRow,
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

  handleSetToPlaylist(category_id, content_id) {
    pl.setPlaylist(category_id, content_id)
  }

  handleRemoveFromPlaylist(category_id, content_id) {
    pl.removePlaylist(category_id, content_id)
  }

  handleAddRemoveToPlaylist(action, category_id, content_id) {
    const cardElement = document.getElementById(
      `add-playlist-container-${content_id}`
    )

    const searchElement = document.getElementById(
      `add-playlist-container-search-${content_id}`
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
  }

  // handleChange = e => {
  //   this.setState(oldValues => ({
  //     ...oldValues,
  //     [e.target.name]: e.target.value,
  //   }))
  //   this.props.onGetContents(
  //     this.props.match.params.category_id,
  //     this.state.page,
  //     this.state.perPage,
  //     e.target.value
  //   )
  // }

  render() {
    return (
      <>
        {this.props.contents !== undefined &&
        this.props.contents.length !== 0 &&
        this.props.contents[this.props.match.params.category_id] !==
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
                isContent
                handleSetToPlaylist={this.handleSetToPlaylist}
                handleAddRemoveToPlaylist={this.handleAddRemoveToPlaylist}
                handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
                locales={this.props.locales}
                data={this.props.contentObj}
                handleChange={this.handleChange}
                filterValue={this.state.filterContents}
                category={this.props.match.params.category_id}
              />
            </Grid>
            {Object.entries(this.props.contents).length === 0 ||
            this.props.contents[this.props.match.params.category_id].length ===
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
                        message="Disuclpe, no hay contenidos en esta categoría"
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
                            <span>Volver al home</span>
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
                loadMore={this.onGetContentsInfinite}
                hasMore={this.props.hasMoreContenidos}
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
                <ContentCards
                  handleSetToPlaylist={this.handleSetToPlaylist}
                  handleAddRemoveToPlaylist={this.handleAddRemoveToPlaylist}
                  handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
                  locales={this.props.locales}
                  contents={
                    this.props.contents[this.props.match.params.category_id]
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
    contents: state.contenidos.data,
    contentObj: state.contenidos.dataObjContenidos,
    hasMoreContenidos: state.contenidos.hasMore,
    isFetchingContents: state.contenidos.isFetching,
    isFilteringContents: state.contenidos.isFiltering,
    category: state.categories.category,
    isFetchingCategory: state.categories.isFetching,
    sidebar: state.sidebar.status,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetCategory: category_id => dispatch(actions.getCategory(category_id)),
    onClearCategories: () => dispatch(actions.clearCategories()),
    onGetContents: (page, perPage, category_id, lowRow, topRow, restore) =>
      dispatch(
        actions.getContenidos(
          page,
          perPage,
          category_id,
          lowRow,
          topRow,
          restore
        )
      ),
    onClearContents: () => dispatch(actions.clearContenidos()),
    onHasMoreContents: status => dispatch(actions.hasMoreContenidos(status)),
    openSidebar: () => dispatch(actions.openSidebar()),
    closeSidebar: () => dispatch(actions.closeSidebar()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentsList)
