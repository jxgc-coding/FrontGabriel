import React from 'react'

import RelatedVideo from '../RelatedVideo/RelatedVideo'
import * as pl from '../../store/utils'
// import PerfectScrollbar from 'react-perfect-scrollbar'

import './_relatedvideossidebar.scss'

const RelatedVideosSidebar = React.memo(function RelatedVideosSidebar(props) {
  let relatedVideos = []
  if (props.RelatedVideos.length) {
    props.RelatedVideos.map(video => {
      const linkTo = `${process.env.PUBLIC_URL}/category/${props.category}`
      const inPlaylist = pl.inPlaylist(
        props.category,
        props.category !== '0' ? video.videos_id : video.id
      )
      const showInWatchLaterPlaylist = pl.inPlaylist(
        'watch-later',
        props.category !== '0' ? video.videos_id : video.id
      )
      const showInFavoritesPlaylist = pl.inPlaylist(
        'favorites',
        props.category !== '0' ? video.videos_id : video.id
      )

      return relatedVideos.push(
        <RelatedVideo
          locales={props.locales}
          key={video.videos_id}
          linkTo={linkTo}
          video={video}
          category={props.category}
          inPlaylist={inPlaylist}
          showInWatchLaterPlaylist={showInWatchLaterPlaylist}
          showInFavoritesPlaylist={showInFavoritesPlaylist}
          handleSetToPlaylist={props.handleSetToPlaylist}
          handleAddRemoveToPlaylist={props.handleAddRemoveToPlaylist}
          handleRemoveFromPlaylist={props.handleRemoveFromPlaylist}
        />
        // <RelatedVideo
        //   locales={props.locales}
        //   key={i}
        //   index={i}
        //   linkTo={linkTo}
        //   video={val}
        // />
      )
    })
  }

  return (
    <div id="draggable-list-container" className="related-videos-container">
      {/* {props.banner !== '' && (
          <div className="img-banner-container">
            <img src={props.banner} alt="" />
          </div>
        )} */}
      {relatedVideos}
    </div>
  )
})

export default RelatedVideosSidebar
