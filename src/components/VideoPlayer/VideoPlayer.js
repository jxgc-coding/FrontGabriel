import React, { PureComponent } from 'react'

export default class VideoPlayer extends PureComponent {
  componentDidMount() {
    this.player = window.videojs(this.refs.player, {})

    if (this.props.poster !== '') {
      this.player.poster(this.props.poster)
    }

    this.player.src({
      type: this.props.type,
      src: this.props.src,
    })

    if (this.props.type === 'video/youtube') {
      setTimeout(() => {
        this.props.autoPlay && this.player.play()
      }, 2000)
    } else {
      this.props.autoPlay && this.player.play()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.player = window.videojs(this.refs.player, {})

      if (this.props.poster !== '') {
        this.player.poster(this.props.poster)
      }

      this.player.src({
        type: this.props.type,
        src: this.props.src,
      })

      if (this.props.type === 'video/youtube') {
        setTimeout(() => {
          this.props.autoPlay && this.player.play()
        }, 2000)
      } else {
        this.props.autoPlay && this.player.play()
      }
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
          preload="true"
          controls
          ref="player"
          data-setup='{ "techOrder": ["html5", "youtube"] }'
        ></video>
      </div>
    )
  }
}
