import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import ContentDetail from '../../components/ContentDetail/ContentDetail'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
// import RelatedContentsSidebar from '../../components/RelatedContentsSidebar/RelatedContentsSidebar'

import Grid from '@material-ui/core/Grid'
// import Hidden from '@material-ui/core/Hidden'

// import banner from '../../assets/img/banner.jpg'
import 'react-perfect-scrollbar/dist/css/styles.css'

import './_contentdetailcontainer.scss'

class ContentDetailContainer extends PureComponent {
  async componentDidMount() {
    await this.props.onGetContent(
      this.props.match.params.content_id,
      this.props.match.params.category_id
    )
    await this.props.onGetRelatedContents(
      this.props.match.params.content_id,
      this.props.match.params.category_id,
      24
    )
    if (
      Object.entries(this.props.content).length !== 0 &&
      Object.entries(this.props.relatedContents).length !== 0
    ) {
      setTimeout(() => {
        if (document.getElementById('content') !== null) {
          const divContent = document.getElementById('content').clientHeight
          const divDescription = document.getElementById('description')
            .clientHeight

          if (document.getElementById('related-contents') !== null) {
            document.getElementById('related-contents').style.height =
              divContent + divDescription + 6 + 'px'
          }
        }
      }, 600)
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.onClearContents()
      await this.props.onGetContent(
        this.props.match.params.content_id,
        this.props.match.params.category_id
      )
      await this.props.onGetRelatedContents(
        this.props.match.params.content_id,
        this.props.match.params.category_id,
        24
      )
    }
    if (
      Object.entries(this.props.content).length !== 0 &&
      Object.entries(this.props.relatedContents).length !== 0
    ) {
      setTimeout(() => {
        if (document.getElementById('content') !== null) {
          const divContent = document.getElementById('content').clientHeight
          const divDescription = document.getElementById('description')
            .clientHeight

          if (document.getElementById('related-contents') !== null) {
            document.getElementById('related-contents').style.height =
              divContent + divDescription + 6 + 'px'
          }
        }
      }, 600)
    }
  }

  render() {
    return (
      <>
        {(!this.props.isFetchingContents || !this.props.isFetchingCategory) &&
        Object.entries(this.props.content).length !== 0 ? (
          <div className="content-detail-container">
            <div className="content-detail-container-cont">
              <Grid justify={'center'} container spacing={2}>
                <Grid item xs={12} md={10}>
                  <ContentDetail
                    locales={this.props.locales}
                    content={this.props.content}
                  />
                </Grid>
                {/* {this.props.relatedContents.length !== 0 && (
                  <Hidden smDown>
                    <Grid id="related-contents" item xs={12} md={4}>
                      <RelatedContentsSidebar
                        banner={banner}
                        locales={this.props.locales}
                        category={this.props.match.params.category}
                        categoryId={this.props.match.params.category_id}
                        RelatedContents={this.props.relatedContents}
                      />
                    </Grid>
                  </Hidden>
                )} */}
                <Grid item xs={12}>
                  <CategorySlider
                    variant
                    isContent
                    locales={this.props.locales}
                    categories={this.props.contentCategories}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        ) : (
          <div className="loading-screen">
            <LoadingSpinner
              sizeUnit={'px'}
              size={18}
              color={'#272a52'}
              loading={true}
            />
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    content: state.contenidos.contenido,
    relatedContents: state.contenidos.relatedContenidos,
    isFetchingContents: state.contenidos.isFetching,
    locales: state.locales.data,
    contentCategories: state.categories.contentData,
    isFetchingCategory: state.categories.isFetching,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onGetContent: (content_id, category_id) =>
      dispatch(actions.getContenido(content_id, category_id)),
    onGetContents: (category_id, page) =>
      dispatch(actions.getContenidos(category_id, page)),
    onGetRelatedContents: (content_id, category_id, qty) =>
      dispatch(actions.getRelatedContenidos(content_id, category_id, qty)),
    onClearContents: () => dispatch(actions.clearContenidos()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentDetailContainer)
