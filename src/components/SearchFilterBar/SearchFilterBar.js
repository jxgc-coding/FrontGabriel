import React, { useState, useRef, useEffect, useCallback } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import ListIcon from '@material-ui/icons/List'
import Fuse from 'fuse.js'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { withRouter } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import * as pl from '../../store/utils'
import { debounce } from 'lodash'
import RelatedVideo from '../RelatedVideo/RelatedVideo'

import './_searchfilterbar.scss'

// Input search, repro playlist button and filter dropdown styles only
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  formControl: {
    margin: '0 8px',
    width: '100%',
    height: '36px',
  },

  inputLabel: {
    top: '-13px',
  },

  defaultButton: {
    margin: 0,
    width: '100%',
    textTransform: 'capitalize',
  },

  button: {
    margin: 0,
    width: '100%',
    backgroundColor: '#272a52',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#15162d',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    // transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // width: 300,
      // '&:focus': {
      //   width: 200,
      // },
    },
  },
}))

const SearchFilterBar = React.memo(props => {
  const classes = useStyles()

  const searchText =
    props.locales.length > 0
      ? props.locales[0].translate_value !== ''
        ? props.locales[0].translate_value
        : props.locales[0].translate_key
      : ''

  const reproPlayListText =
    props.locales.length > 0
      ? props.locales[7].translate_value !== ''
        ? props.locales[7].translate_value
        : props.locales[7].translate_key
      : ''

  const [query, setQuery] = useState('')
  const [search, setSearch] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const sendQuery = searchQuery => {
    const res = fuse.search(searchQuery)
    if (res.length > 0) {
      setIsLoading(false)
      setSearch(res)
      setShowSearch(true)
    } else {
      setShowSearch(false)
      setSearch([])
      setIsLoading(false)
    }
  }

  const delayedQuery = useRef(debounce(q => sendQuery(q), 1000)).current

  const handleSearch = e => {
    setIsLoading(true)
    setQuery(e.target.value)
    delayedQuery(e.target.value)
  }

  const useOutsideAlerter = ref => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = e => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target
          .closest('div')
          .className.includes('litem-add-playlist-icon') &&
        !e.target.closest('div').className.includes('litem-added') &&
        !e.target.closest('#wrapperRef') &&
        !e.target.closest('#fav-later-menu') &&
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

  const opts = {
    shouldSort: true,
    threshold: 0.2,
    keys: ['title', 'description', 'tags'],
  }

  const fuse = new Fuse(props.data, opts)

  const routeChange = useCallback(
    category_id => () => {
      let path = `${process.env.PUBLIC_URL}/playlist/${category_id}`
      props.history.push(path)
    },
    []
  )

  const handleSelectAll = useCallback(
    () => () => {
      props.data.forEach(video => {
        props.handleAddRemoveToPlaylist(true, props.category, video.videos_id)
      })
      pl.setAllPlaylist(props.category, props.data)
    },
    []
  )

  const handleSelectAllSearch = useCallback(
    () => () => {
      search.forEach(video => {
        props.handleAddRemoveToPlaylist(true, props.category, video.videos_id)
      })
      pl.setAllPlaylist(props.category, search)
    },
    [search]
  )

  const searchVideos = useCallback(video => {
    const inPlaylist = pl.inPlaylist(props.category, video.videos_id)
    const showInWatchLaterPlaylist = pl.inPlaylist('watch-later', video.videos_id)
    const showInFavoritesPlaylist = pl.inPlaylist('favorites', video.videos_id)
    const linkTo = `${process.env.PUBLIC_URL}/category/${props.category}`
    return (
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
    )
  }, [])

  return (
    <>
      {props.data !== null && (
        <div className="search-filter-bar-cont">
          <Grid
            direction="row"
            justify="flex-start"
            alignItems="center"
            container
            spacing={0}
          >
            <Grid id="wrapperRef" item xs={12} sm={6}>
              <div className="search-filter-bar__search-input">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    onChange={handleSearch}
                    value={query}
                    placeholder={searchText}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  {isLoading && (
                    <div className="search-filter-bar__search-input-loading-icon">
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
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid
                direction="row"
                justify="flex-end"
                alignItems="center"
                container
                spacing={1}
              >
                <Grid item xs={12} sm={6} md={4}>
                  {!props.isContent && (
                    <Button
                      variant="contained"
                      className={classes.defaultButton + ' select-all-button'}
                      onClick={handleSelectAll()}
                    >
                      <ListIcon className="play-circle-icon" />
                      Añadir todos
                    </Button>
                  )}
                </Grid>
                {props.withPlaylist && (
                  <Grid item xs={12} sm={5} md={4}>
                    <Button
                      // disabled={pl.getPlaylist(props.category) && Object.entries(pl.getPlaylist(props.category)).length === 0 ? true : false}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={routeChange(props.category)}
                    >
                      <PlayCircleOutlineIcon className="play-circle-icon" />
                      {reproPlayListText}
                    </Button>
                  </Grid>
                )}
                {/* <Grid item xs={4}>
              <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel
                    className={classes.inputLabel}
                    ref={inputLabel}
                    htmlFor="filter-videos"
                  >
                    Filtros
                  </InputLabel>
                  <Select
                    value={props.filterValue}
                    onChange={props.handleChange}
                    inputProps={{
                      name: 'filterVideos',
                      id: 'filter-videos',
                    }}
                  >
                    <MenuItem value={'recent'}>Más Reciente</MenuItem>
                    <MenuItem value={'relevant'}>Más Vistos</MenuItem>
                    <MenuItem value={'a-z'}>A - Z</MenuItem>
                    <MenuItem value={'z-a'}>Z - A</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          {search.length > 0 && showSearch && (
            <div ref={searchRef} className="search-result-videos-container">
              <div className="search-result-header">
                <h3>Resultados de la búsqueda:</h3>
                {!props.isContent && (
                  <Button
                    onClick={handleSelectAllSearch()}
                    variant="contained"
                    className="snackbar-go-back-button"
                  >
                    <AddIcon />
                    <span className="add-all-span">
                      Añadir todos al playlist
                    </span>
                  </Button>
                )}
              </div>
              <PerfectScrollbar>
                <div className="global-search-content">
                  {search.map(s => searchVideos(s))}
                </div>
              </PerfectScrollbar>
            </div>
          )}
        </div>
      )}
    </>
  )
})

export default withRouter(SearchFilterBar)
