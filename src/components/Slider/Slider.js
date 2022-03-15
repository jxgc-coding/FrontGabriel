import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import Flickity from 'flickity'
import 'flickity/dist/flickity.min.css'
import './_slider.scss'

export default class Slider extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      flickityReady: false,
    }

    this.refreshFlickity = this.refreshFlickity.bind(this)
  }

  componentDidMount() {
    let _self = this

    const options = this.props.options || {
      autoPlay: 6000,
      pauseAutoPlayOnHover: false,
      percentPosition: false,
      lazyLoad: true,
      wrapAround: true,
      setGallerySize: true,
      imagesLoaded: true,
      adaptiveHeight: true,
      resize: true,
      pageDots: false,
      prevNextButtons: false,
    }

    const onReady = {
      on: {
        ready: function() {
          _self.setState({
            flickityReady: true,
          })
        },
      },
    }

    const finalOptions = Object.assign(options, onReady)

    this.flickity = new Flickity(this.flickityNode, finalOptions)
  }

  componentDidUpdate(prevProps, prevState) {
    const flickityDidBecomeActive =
      !prevState.flickityReady && this.state.flickityReady
    const childrenDidChange =
      prevProps.children.length !== this.props.children.length

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity()
    }
  }

  refreshFlickity() {
    this.flickity.reloadCells()
    this.flickity.resize()
    this.flickity.updateDraggable()
  }

  // componentWillUnmount() {
  //     this.flickity.destroy();
  // }

  renderPortal() {
    if (!this.flickityNode) {
      return null
    }

    const mountNode = this.flickityNode.querySelector('.flickity-slider')

    if (mountNode) {
      return ReactDOM.createPortal(this.props.children, mountNode)
    }
  }

  render() {
    return [
      <div
        className={'test'}
        key="flickityBase"
        ref={node => (this.flickityNode = node)}
      />,
      this.renderPortal(),
    ].filter(Boolean)
  }
}
