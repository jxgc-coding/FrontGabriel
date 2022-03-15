import React from 'react'
import ReactDOM from 'react-dom'
import ScrollToTop from './ScrollToTop'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import './index.scss'
import App from './App'
import portadasReducer from './store/reducers/portadas'
import categoriesReducer from './store/reducers/categories'
import videosReducer from './store/reducers/videos'
import contenidosReducer from './store/reducers/contenidos'
import sideBarReducer from './store/reducers/sidebar'
import localesReducer from './store/reducers/locales'
import basicMediaReducer from './store/reducers/basicMedia'
import * as serviceWorker from './serviceWorker'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import './fonts/Roboto-Regular.ttf'
import './fonts/Roboto-Black.ttf'
import './fonts/Roboto-Bold.ttf'
import './fonts/Roboto-Light.ttf'
import './fonts/Roboto-Medium.ttf'
import dotenv from 'dotenv'

dotenv.config()
const rootReducer = combineReducers({
  portadas: portadasReducer,
  categories: categoriesReducer,
  videos: videosReducer,
  contenidos: contenidosReducer,
  sidebar: sideBarReducer,
  locales: localesReducer,
  basicMedia: basicMediaReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
