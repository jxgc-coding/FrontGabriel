import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PlaylistSidebar from '../../components/PlaylistSidebar/PlaylistSidebar'
// import Hidden from '@material-ui/core/Hidden'
// import * as actions from '../../store/actions'
// import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import PlaylistDetail from '../../components/PlaylistDetail/PlaylistDetail'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import * as pl from '../../store/utils'
import Grid from '@material-ui/core/Grid'

// import banner from '../../assets/img/banner.jpg'
// import 'react-perfect-scrollbar/dist/css/styles.css'

import './_playlistdetailcontainer.scss'

class PlaylistContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      videoPlaylist: [],
      currentPlaying: 0,
      playlistText: [],
    }

    this.handleChangeVideoPlaylist = this.handleChangeVideoPlaylist.bind(this)
  }

  componentDidMount() {
    var videolist = []
    const list = Object.entries(
      pl.getPlaylist(this.props.match.params.category_id)
    )

    list.forEach(item => {
      videolist.push({
        sources: [
          {
            src:
              item[1].video_type === 'mass_embedded'
                ? `https://youtube.com/watch?v=${item[1].embed_id}`
                : `${process.env.REACT_APP_API_URL}admin/Uploads/videos/${item[1].video_id}.${item[1].type}`,
            type:
              item[1].video_type === 'mass_embedded'
                ? 'video/youtube'
                : 'video/mp4',
          },
        ],
        poster:
          item[1].thumbnail !== undefined && item[1].thumbnail !== 'none.gif'
            ? process.env.REACT_APP_API_URL + item[1].thumbnail
            : '',
      })
    })

    const playlistText = this.props.locales.length
      ? this.props.locales[7].translate_value !== ''
        ? this.props.locales[7].translate_value
        : this.props.locales[7].translate_key
      : ''

    if (videolist.length !== 0 && window.innerWidth > 768) {
      setTimeout(() => {
        if (document.getElementById('video') !== null) {
          const divVideo = document.getElementById('video').clientHeight

          if (document.getElementById('related-videos') !== null) {
            document.getElementById('related-videos').style.height =
              divVideo - 45 + 'px'
          }
        }
      }, 600)
    }

    this.setState({
      list: list,
      videoPlaylist: videolist,
      currentPlaying: 0,
      playlistText: playlistText,
    })
  }

  handleChangeVideoPlaylist(index) {
    this.setState({ currentPlaying: index })
  }

  render() {
    return (
      <div className="playlist-detail-container">
        <div className="playlist-detail-container-cont">
          <Grid justify={'center'} container spacing={1}>
            <Grid item xs={12} md={8}>
              <PlaylistDetail
                locales={this.props.locales}
                playlist={this.state.videoPlaylist}
                currentPlaying={this.state.currentPlaying}
                changeVideoPlaylist={this.handleChangeVideoPlaylist}
              />
            </Grid>
            <Grid id="related-videos" item xs={12} md={4}>
              <div className="sidebar-playlist-title">
                <h2>{this.state.playlistText}</h2>
              </div>
              <div className="sidebar-playlist-content">
                <PlaylistSidebar
                  locales={this.props.locales}
                  playlistVideos={this.state.list}
                  currentPlaying={this.state.currentPlaying}
                  category={this.props.match.params.category_id}
                  changeVideoPlaylist={this.handleChangeVideoPlaylist}
                />
              </div>
            </Grid>
            {/* {this.props.relatedVideos.length !== 0 && (
                  <Hidden smDown>
                    <Grid id="related-videos" item xs={12} md={4}>
                      <RelatedVideosSidebar
                        locales={this.props.locales}
                        category={this.props.match.params.category}
                        categoryId={this.props.match.params.category_id}
                        RelatedVideos={this.props.relatedVideos}
                      />
                    </Grid>
                  </Hidden>
                )} */}
            <Grid item xs={12}>
              <CategorySlider
                locales={this.props.locales}
                categories={this.props.videoCategories}
              />
            </Grid>
          </Grid>
        </div>
      </div>
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

export default connect(mapStateToProps)(PlaylistContainer)
