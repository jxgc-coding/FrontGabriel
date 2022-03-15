import React, { PureComponent } from 'react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import './_streaming.scss'

export default class Streaming extends PureComponent {
  render() {
    return (
      <>
        {this.props.allowStreaming && (
          <div name="streaming" id="streaming" className="streaming-container">
            <div className="streming-title">
              <h1 className="normal-title">
                <FiberManualRecordIcon /> En Directo
              </h1>
            </div>

            <Container className="streaming-player-container">
              <Grid
                item
                xs={12}
                container
                spacing={0}
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <div className="video-container">
                    <VideoPlayer
                      class={
                        'video-js vjs-default-skin vjs-fluid vjs-16-9 vjs-big-play-centered'
                      }
                      type={
                        this.props.videoStreaming
                          ? 'application/x-mpegURL'
                          : 'video/mp4'
                      }
                      src={this.props.videoSrc}
                      poster={''}
                      autoPlay={this.props.autoPlay}
                    />
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        )}
      </>
    )
  }
}
