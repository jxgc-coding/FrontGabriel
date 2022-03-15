import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ImgPreviewPlaylist from '../../components/ImgPreviewPlaylist/ImgPreviewPlaylist'
import DragDropList from '../../components/DragDropList/DragDropList'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ErrorIcon from '@material-ui/icons/Error'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import * as pl from '../../store/utils'

import Grid from '@material-ui/core/Grid'

import './_playlistorder.scss'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class PlaylistOrder extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      category: this.props.match.params.category_id,
      cleanText: '',
      organizeText: '',
      noVideoText: '',
      goBackVideoListText: '',
      goBackHomeText: '',
    }

    this.onDragEnd = this.onDragEnd.bind(this)
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this)
    this.handleClearCategoryPlaylist = this.handleClearCategoryPlaylist.bind(
      this
    )
  }

  componentDidMount() {
    const cleanText =
      this.props.locales.length > 0
        ? this.props.locales[13].translate_value !== ''
          ? this.props.locales[13].translate_value
          : this.props.locales[13].translate_key
        : ''

    const organizeText =
      this.props.locales.length > 0
        ? this.props.locales[19].translate_value !== ''
          ? this.props.locales[19].translate_value
          : this.props.locales[19].translate_key
        : ''

    const noVideoText =
      this.props.locales.length > 0
        ? this.props.locales[17].translate_value !== ''
          ? this.props.locales[17].translate_value
          : this.props.locales[17].translate_key
        : ''

    const goBackVideoListText =
      this.props.locales.length > 0
        ? this.props.locales[18].translate_value !== ''
          ? this.props.locales[18].translate_value
          : this.props.locales[18].translate_key
        : ''

    const goBackHomeText =
      this.props.locales.length > 0
        ? this.props.locales[22].translate_value !== ''
          ? this.props.locales[22].translate_value
          : this.props.locales[22].translate_key
        : ''

    const items = pl.getPlaylist(this.props.match.params.category_id)

    this.setState({
      items,
      cleanText,
      organizeText,
      noVideoText,
      goBackVideoListText,
      goBackHomeText,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const items = pl.getPlaylist(this.props.match.params.category_id)
      this.setState({ items })
    }
  }

  onDragEnd(result) {
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    pl.overridePlaylist(this.props.match.params.category_id, items)

    this.setState({
      items,
    })
  }

  handleRemoveFromPlaylist(category_id, video_id) {
    this.setState({
      items: pl.removePlaylist(category_id, video_id),
    })
  }

  handleClearCategoryPlaylist() {
    pl.clearCategoryPlaylist(this.props.match.params.category_id)
    this.setState({
      items: [],
    })
  }

  render() {
    return (
      <>
        {this.state.items.length > 0 ? (
          <div className="playlist-order-container">
            <div className="playlist-order-container-cont">
              <Grid justify={'center'} container spacing={1}>
                <Grid item xs={12} md={6}>
                  <ImgPreviewPlaylist
                    category={this.props.match.params.category_id}
                    items={this.state.items}
                  />
                </Grid>
                <Grid id="list-videos" item xs={12} md={6}>
                  <div className="order-playlist-title">
                    <h2>{this.state.organizeText}</h2>
                    <Button
                      onClick={this.handleClearCategoryPlaylist}
                      color="secondary"
                    >
                      {this.state.cleanText}
                    </Button>
                  </div>
                  <DragDropList
                    onDragEnd={this.onDragEnd}
                    items={this.state.items}
                    category={this.props.match.params.category_id}
                    removeFromPlaylist={this.handleRemoveFromPlaylist}
                  />
                </Grid>
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
          <div className="playlist-order-container">
            <div className="playlist-order-container-cont">
              <Grid justify={'center'} container spacing={1}>
                <Grid item xs={12} md={6}>
                  <ImgPreviewPlaylist
                    category={this.props.match.params.category_id}
                    items={this.state.items}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="no-playlist-container">
                    <SnackbarContent
                      className="snackbar"
                      aria-describedby="client-snackbar"
                      message={
                        <span id="client-snackbar" className="snackbar-message">
                          <ErrorIcon />
                          {this.state.noVideoText}
                        </span>
                      }
                    />
                    <NavLink
                      className="snackbar-go-back-button-link"
                      to={
                        this.state.category === 'watch-later' ||
                        this.state.category === 'favorites'
                          ? `${process.env.PUBLIC_URL}/`
                          : `${process.env.PUBLIC_URL}/category/${this.state.category}`
                      }
                    >
                      <Button
                        variant="contained"
                        className="snackbar-go-back-button"
                      >
                        <ArrowBackIcon />
                        <span>
                          {this.state.category === 'watch-later' ||
                          this.state.category === 'favorites'
                            ? this.state.goBackHomeText
                            : this.state.goBackVideoListText}
                        </span>
                      </Button>
                    </NavLink>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <CategorySlider
                    locales={this.props.locales}
                    categories={this.props.videoCategories}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    locales: state.locales.data,
    videoCategories: state.categories.videoData,
  }
}

export default connect(mapStateToProps)(PlaylistOrder)
