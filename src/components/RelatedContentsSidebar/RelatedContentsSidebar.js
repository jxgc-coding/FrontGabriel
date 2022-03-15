import React from 'react'

import RelatedContent from '../RelatedContent/RelatedContent'
// import PerfectScrollbar from 'react-perfect-scrollbar'

import './_relatedcontentssidebar.scss'

const RelatedContentsSidebar = React.memo(function RelatedContentsSidebar(
  props
) {
  let relatedContents = []
  if (props.RelatedContent.length) {
    props.RelatedContent.map((val, i) => {
      let linkTo = `${process.env.PUBLIC_URL}/category/${props.categoryId}`

      return relatedContents.push(
        <RelatedContent
          locales={props.locales}
          key={i}
          index={i}
          linkTo={linkTo}
          content={val}
        />
      )
    })
  }

  return (
    <div id="draggable-list-container" className="related-contents-container">
      {/* {props.banner !== '' && (
          <div className="img-banner-container">
            <img src={props.banner} alt="" />
          </div>
        )} */}
      {relatedContents}
    </div>
  )
})

export default RelatedContentsSidebar
