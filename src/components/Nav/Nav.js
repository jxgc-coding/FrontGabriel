import React, { useState, useEffect, useRef, useCallback } from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import SideBar from '../SideBar/SideBar'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Hidden from '@material-ui/core/Hidden'
import Fuse from 'fuse.js'
import { debounce } from 'lodash'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/'

// import logo from 'data/admin/Uploads/medias/logo.png'

import './_nav.scss'

const Nav = React.memo(props => {
  const [query, setQuery] = useState('')
  const [buscarPlaceHolder, setBuscarPlaceHolder] = useState('')
  const [fuse, setFuse] = useState()
  const [search, setSearch] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const opts = {
    shouldSort: true,
    threshold: 0.1,
    keys: ['title', 'description', 'tags'],
  }

  const sendQuery = (searchQuery, innerFuse) => {
    const res = innerFuse.search(searchQuery)
    if (searchQuery !== '' && res.length > 0) {
      setIsLoading(false)
      setSearch(res)
      setShowSearch(true)
    } else {
      setShowSearch(false)
      setSearch([])
      setIsLoading(false)
    }
  }

  const delayedQuery = useRef(
    debounce((q, innerFuse) => sendQuery(q, innerFuse), 2000)
  ).current

  const handleSearch = useCallback(
    e => {
      setQuery(e.target.value)
      setIsLoading(true)
      delayedQuery(e.target.value, fuse)
    },
    [fuse]
  )

  useEffect(() => {
    setFuse(props.data !== null ? new Fuse(props.data[0], opts) : null)
    if (props.locales.length > 0) {
      setBuscarPlaceHolder(
        props.locales[0].translate_value !== ''
          ? props.locales[0].translate_value
          : props.locales[0].translate_key
      )
    }
  }, [props.data])

  const handleDrawer = e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }

    if (props.sidebar) {
      props.closeSidebar()
    } else {
      props.openSidebar()
    }
  }

  const useOutsideAlerter = ref => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = e => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.closest('#wrapperRef') &&
        search.length
      ) {
        setShowSearch(false)
      } else if (
        (ref.current && ref.current.contains(e.target) && search.length) ||
        (e.target.closest('#wrapperRef') && search.length)
      ) {
        setShowSearch(true)
      }
    }

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    })
  }

  const searchRef = useRef(null)
  useOutsideAlerter(searchRef)

  const handleRedirect = () => {
    setQuery('')
    setSearch([])
  }

  return (
    <div className={props.classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={props.classes.appBar}>
        <Toolbar>
          <Typography edge="start" className={props.classes.grow}>
            <NavLink
              className={props.classes.iconNavLink}
              activeClassName="selected"
              to={`${process.env.PUBLIC_URL}/`}
            >
              {props.basicMedia.length > 0 && (
                <img
                  src={props.basicMedia.length && props.basicMedia[0].logo}
                  className="logo-img"
                  alt=""
                />
              )}
            </NavLink>
          </Typography>
          /*<Hidden smDown>
            <div id="wrapperRef" className={props.classes.search}>
              <div className={props.classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={handleSearch}
                value={query}
                // ref={globalSearchRef}
                // value={searchVal}
                placeholder={buscarPlaceHolder}
                classes={{
                  root: props.classes.inputRoot,
                  input: props.classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
              {isLoading && (
                <div className={props.classes.loadingIcon}>
                  <LoadingSpinner
                    key={1}
                    sizeUnit={'px'}
                    size={6}
                    color={'#272a52'}
                    loading={true}
                  />
                </div>
              )}
            </div>
          </Hidden>
          <IconButton
            aria-label="Open drawer"
            onClick={e => handleDrawer(e)}
            edge="start"
          >*/
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {search.length > 0 && showSearch && (
        <div ref={searchRef} className="global-search-container">
          <PerfectScrollbar>
            <div className="global-search-content">
              {search.map(s => (
                <NavLink
                  onClick={handleRedirect}
                  key={s.id}
                  className="global-search-item-link"
                  to={`${process.env.PUBLIC_URL}/category/0/video/${s.id}`}
                >
                  <div className="global-search-item">
                    <span>{s.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </PerfectScrollbar>
        </div>
      )}
      <SideBar
        handleRedirects={props.handleRedirects}
        onOpen={handleDrawer}
        onClose={handleDrawer}
        classes={props.classes}
      />
    </div>
  )
})

const mapStateToProps = state => {
  return {
    locales: state.locales.data,
    sidebar: state.sidebar.status,
    basicMedia: state.basicMedia.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openSidebar: () => dispatch(actions.openSidebar()),
    closeSidebar: () => dispatch(actions.closeSidebar()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
