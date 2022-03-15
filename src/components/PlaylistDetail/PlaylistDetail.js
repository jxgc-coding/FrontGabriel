import React, { useEffect, useRef } from 'react'
import PlaylistVideoPlayer from '../PlaylistVideoPlayer/PlaylistVideoPlayer'
import Card from '@material-ui/core/Card'
// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
// import SocialShare from '../SocialShare/SocialShare'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
// import parse from 'html-react-parser'

import './_playlistdetail.scss'

const PlaylistDetail = React.memo(props => {
  // const [description, setDescription] = useState('')

  // useEffect(() => {
  //   if (props.video.description_quill !== undefined) {
  //     let cfg = {}
  //     let converter = new QuillDeltaToHtmlConverter(
  //       JSON.parse(props.video.description_quill).ops,
  //       cfg
  //     )
  //     let html = converter.convert()
  //     setDescription(html)
  //   }
  // }, [Object.entries(props.video)])

  // const descriptionQuill = () => {
  //   const html = description
  //   return parse(html)
  // }

  const mounted = useRef()
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      currentVideoPlaying(props.currentPlaying)
    }
  }, [props.currentPlaying])

  const playerRef = useRef()

  const currentVideoPlaying = current => {
    playerRef.current.handleChangeVideo(current)
  }

  return (
    <>
      {props.playlist.length !== 0 ? (
        <div className="playlist-detail-player-container">
          <div id="video" className="playlist-detail-card-container">
            <Card className="card">
              <div className="playlist-container">
                <PlaylistVideoPlayer
                  autoPlay
                  class={
                    'video-js vjs-default-skin vjs-fluid vjs-16-9 vjs-big-play-centered'
                  }
                  playlist={props.playlist}
                  ref={playerRef}
                  changeVideoPlaylist={props.changeVideoPlaylist}
                />
              </div>
              {/* <CardContent className="playlist-detail-player-content">
                <Typography className="title" variant="h1" component="h1">
                  {props.video.title}
                </Typography>
                {props.video.location_recorded !== null && (
                  <SocialShare
                    locales={props.locales}
                    link={`${process.env.PUBLIC_URL}/data/admin/Uploads/documents/${props.video.location_recorded}`}
                  />
                )}
              </CardContent> */}
            </Card>
          </div>
          {/* <div id="description" className="playlist-detail-description-container">
            <Card className="card">
              <CardContent className="card-description-container">
                <div className="playlist-description">
                  {props.video.description}
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      ) : null}
    </>
  )
})

export default PlaylistDetail
