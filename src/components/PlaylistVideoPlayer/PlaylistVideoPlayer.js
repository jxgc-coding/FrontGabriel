import React, { PureComponent } from 'react'

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
    }

    this.handleChangeVideo = this.handleChangeVideo.bind(this)
  }

  componentDidMount() {
    this.player = window.videojs(this.refs.player, {})
    this.player.src({
      type: this.props.playlist[this.state.currentIndex].sources[0].type,
      src: this.props.playlist[this.state.currentIndex].sources[0].src,
    })

    if (this.props.playlist[0].poster !== '') {
      this.player.poster(this.props.playlist[0].poster)
    }

    if (
      this.props.playlist[this.state.currentIndex].sources[0].type ===
      'video/youtube'
    ) {
      setTimeout(() => {
        this.props.autoPlay && this.player.play()
      }, 2000)
    } else {
      this.props.autoPlay && this.player.play()
    }

    this.player.on('ended', () => {
      const index = this.state.currentIndex
      if (index !== this.props.playlist.length - 1) {
        const newIndex = index + 1
        this.setState({
          currentIndex: newIndex,
        })
        this.handleChangeVideo(newIndex)
        this.props.changeVideoPlaylist(newIndex)
      }
    })
  }

  handleChangeVideo(index) {
    this.setState({
      currentIndex: index,
    })

    this.player.reset()

    this.player.src({
      type: this.props.playlist[index].sources[0].type,
      src: this.props.playlist[index].sources[0].src,
    })

    this.player.load()

    if (this.props.playlist[index].poster !== '') {
      this.player.poster(this.props.playlist[index].poster)
    }

    if (this.props.playlist[index].sources[0].type === 'video/youtube') {
      setTimeout(() => {
        this.player.play()
      }, 2000)
    } else {
      this.player.play()
    }
  }

  componentWillUnmount() {
    this.player.dispose()
  }

  render() {
    return (
      <div>
        <video
          id="video-player"
          className={this.props.class}
          preload
          controls
          ref="player"
          data-setup='{ "techOrder": ["html5", "youtube"] }'
        ></video>
      </div>
    )
  }
}
