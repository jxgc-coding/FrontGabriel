import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import MainSlider from '../../components/MainSlider/MainSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import VideoSlider from '../../components/VideoSlider/VideoSlider'
import ContenidoSlider from '../../components/ContenidoSlider/ContenidoSlider'
import Streaming from '../../components/Streaming/Streaming'

import './_home.scss'

class Home extends PureComponent {
  async componentDidMount() {
    await this.props.onGetPortadas()
    await this.props.onGetPromotedVideos()
    await this.props.onGetPromotedContenidos()
  }

  generateStreaming() {
    if (!this.props.basicMedia.length > 0) return null

    if (window.innerWidth < 768) {
      if (this.props.basicMedia[0].ott_movil === '') return null

      return (
        <Streaming
          allowStreaming
          videoStreaming
          videoSrc={this.props.basicMedia[0].ott_movil}
          autoPlay={false}
        />
      )
    }

    return this.props.basicMedia[0].ott_pc !== '' ? (
      <Streaming
        allowStreaming
        videoStreaming
        videoSrc={this.props.basicMedia[0].ott_pc}
        autoPlay={false}
      />
    ) : null
  }

  render() {
    return (
      <div className="home-container">
        <MainSlider images={this.props.portadas} />
        <div className="home-container-cont">
          {this.generateStreaming()}
          {this.props.promotedVideos &&
            this.props.promotedVideos.length > 0 && (
              <VideoSlider
                locales={this.props.locales}
                videos={this.props.promotedVideos}
              />
            )}
          {this.props.promotedContenidos &&
            this.props.promotedContenidos.length > 0 && (
              <ContenidoSlider
                locales={this.props.locales}
                contenidos={this.props.promotedContenidos}
              />
            )}
          {this.props.videoCategories &&
            this.props.videoCategories.length > 0 && (
              <CategorySlider
                locales={this.props.locales}
                categories={this.props.videoCategories}
              />
            )}
          {this.props.contentCategories &&
            this.props.contentCategories.length > 0 && (
              <CategorySlider
                variant
                isContent
                locales={this.props.locales}
                categories={this.props.contentCategories}
              />
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    promotedVideos: state.videos.promotedVideos,
    promotedContenidos: state.contenidos.promotedContenidos,
    portadas: state.portadas.data,
    locales: state.locales.data,
    videoCategories: state.categories.videoData,
    contentCategories: state.categories.contentData,
    basicMedia: state.basicMedia.data,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetPortadas: () => dispatch(actions.getPortadas()),
    onGetPromotedVideos: () => dispatch(actions.getPromotedVideos()),
    onGetPromotedContenidos: () => dispatch(actions.getPromotedContenidos()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
