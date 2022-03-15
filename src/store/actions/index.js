export {
  getPortadas,
  isFetchingPortadas,
  fetchPortadasSuccess,
} from './portadas'

export {
  getCategory,
  getCategories,
  getVideoCategories,
  getContentCategories,
  isFetchingCategories,
  fetchCategoriesSuccess,
  fetchCategorySuccess,
  clearCategories,
  fetchCategoriesFail,
} from './categories'

export {
  getAllContenidos,
  getContenidos,
  getContenido,
  getRelatedContenidos,
  getPromotedContenidos,
  isFetchingContenidos,
  isFilteringContenidos,
  fetchContenidosSuccess,
  fetchContenidoSuccess,
  fetchRelatedContenidosSuccess,
  fetchContenidosFail,
  clearContenidos,
  hasMoreContenidos,
} from './contenidos'

export {
  getAllVideos,
  getVideos,
  getVideo,
  getRelatedVideos,
  getPromotedVideos,
  isFetchingVideos,
  isFilteringVideos,
  fetchVideosSuccess,
  fetchVideoSuccess,
  fetchRelatedVideosSuccess,
  fetchVideosFail,
  clearVideos,
  hasMoreVideos,
} from './videos'

export { openSidebar, closeSidebar, changeTypeSidebar } from './sidebar'

export { getLocales, isFetchingLocales, fetchLocalesSuccess } from './locales'

export {
  getBasicMedia,
  isFetchingBasicMedia,
  fetchBasicMediaSuccess,
  fetchBasicMediaFail,
} from './basicMedia'
