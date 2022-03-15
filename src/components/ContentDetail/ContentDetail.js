import React, { useState, useEffect } from 'react'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import SocialShare from '../SocialShare/SocialShare'
// import ContentPlayer from '../ContentPlayer/ContentPlayer'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
// import parse from 'html-react-parser'

import './_contentdetail.scss'

const ContentDetail = React.memo(function ContentDetail(props) {
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (props.content.description_quill !== undefined) {
      let cfg = {}
      let converter = new QuillDeltaToHtmlConverter(
        JSON.parse(props.content.description_quill).ops,
        cfg
      )
      let html = converter.convert()
      setDescription(html)
    }
  }, [Object.entries(props.content)])

  // const descriptionQuill = () => {
  //   const html = description
  //   return parse(html)
  // }

  return (
    <>
      {Object.entries(props.content).length !== 0 &&
      props.content.constructor === Object ? (
        <div className="content-detail-player-container">
          <div id="content" className="content-detail-card-container">
            <Card className="card">
              <div className="content-container">
                {props.content.type === 'pdf' && window.innerWidth > 767 ? (
                  <div className="img-cont">
                    <embed
                      className="card-image"
                      src={
                        process.env.REACT_APP_API_URL + props.content.content
                      }
                    />
                  </div>
                ) : (
                  <div className="img-cont">
                    <img
                      alt=""
                      className="card-image"
                      src={
                        props.content.thumb !== undefined &&
                        props.content.thumb !== 'none.gif'
                          ? process.env.REACT_APP_API_URL +
                            props.content.thumb
                          : `${process.env.PUBLIC_URL}/normal_default.png`
                      }
                    />
                  </div>
                )}
                {/* <ContentPlayer
                  class={
                    'content-js vjs-default-skin vjs-fluid vjs-16-9 vjs-big-play-centered'
                  }
                  type={'video/mp4'}
                  src={
                    props.content.video_id !== undefined
                      ? `${process.env.PUBLIC_URL}/data/admin/Uploads/videos/${props.content.video_id}.${props.content.type}`
                      : ''
                  }
                  poster={
                    props.content.thumbnail !== undefined &&
                    props.content.thumbnail !== 'none.gif'
                      ? process.env.REACT_APP_HOME_PAGE +
                        '/data/' +
                        props.content.thumbnail
                      : ''
                  }
                  autoPlay={true}
                /> */}
              </div>
              <CardContent className="content-detail-player-content">
                <Typography className="title" variant="h1" component="h1">
                  {props.content.title}
                </Typography>
                <SocialShare
                  isPrimary
                  locales={props.locales}
                  link={process.env.REACT_APP_API_URL + props.content.content}
                />
                {props.content.s_content !== null &&
                  props.content.s_content !== '' && (
                    <SocialShare
                      locales={props.locales}
                      link={
                        process.env.REACT_APP_API_URL +
                        props.content.s_content
                      }
                    />
                  )}
              </CardContent>
            </Card>
          </div>
          <div
            id="description"
            className="content-detail-description-container"
          >
            <Card className="card">
              <CardContent className="card-description-container">
                <div className="content-description">
                  {props.content.description}
                  {/* {descriptionQuill()} */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  )
})

export default ContentDetail
