import React, { PureComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import DescriptionIcon from '@material-ui/icons/Description'
import TvIcon from '@material-ui/icons/Tv'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import WatchLaterIcon from '@material-ui/icons/WatchLater'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import StarIcon from '@material-ui/icons/Star'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/'

import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
// import { faInstagram } from '@fortawesome/free-brands-svg-icons'
// import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

import { NavHashLink as NavLink } from 'react-router-hash-link'

// const BASE_URL = '#'
const blank = '_blank'
const self = '_self'

class SideBar extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      openVideosCategories: false,
      openContentCategories: false,
    }

    this.handleOpenVideosCategories = this.handleOpenVideosCategories.bind(this)
    this.handleOpenContentCategories = this.handleOpenContentCategories.bind(
      this
    )
  }

  async componentDidMount() {
    await this.props.onGetVideoCategories()
    await this.props.onGetContentCategories()
    // if (this.props.history.location.pathname.split('/').length < 4) {
    //   this.props.openSidebar()
    //   this.props.changeTypeSidebar('persistent')
    // } else {
    //   this.props.closeSidebar()
    //   this.props.changeTypeSidebar('temporary')
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.onGetVideoCategories()
      this.props.onGetContentCategories()
      // if (this.props.history.location.pathname.split('/').length < 4) {
      //   this.props.openSidebar()
      //   this.props.changeTypeSidebar('persistent')
      // } else {
      //   this.props.closeSidebar()
      //   this.props.changeTypeSidebar('temporary')
      // }
    }
  }

  handleOpenVideosCategories() {
    this.setState({ openVideosCategories: !this.state.openVideosCategories })
  }

  handleOpenContentCategories() {
    this.setState({ openContentCategories: !this.state.openContentCategories })
  }

  redirectToAdmin() {
    console.log('entro')
    window.location.href(`${process.env.REACT_APP_API_URL}admin/`)
  }

  render() {
    const categories =
      this.props.videoCategories !== undefined
        ? this.props.videoCategories.map((category, i) => {
            return (
              <NavLink
                onClick={this.props.onClose}
                key={category.channel_id}
                activeClassName="selected"
                className={this.props.classes.menuNavLink}
                to={`${process.env.PUBLIC_URL}/category/${category.channel_id}`}
              >
                <ListItem
                  button
                  className={this.props.classes.nested + ' listItemCont'}
                >
                  <ListItemIcon className={this.props.classes.listIcon}>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={category.channel_name} />
                </ListItem>
              </NavLink>
            )
          })
        : null

    const listContentCategories = () => {
      if (!this.props.contentCategories.length) return null

      const listLabel = this.props.locales.length && (
        <div className={this.props.classes.sidebarTextSeparator}>
          {this.props.locales[21].translate_value !== ''
            ? this.props.locales[21].translate_value
            : this.props.locales[21].translate_key}
        </div>
      )

      return (
        <>
          {listLabel}
          <ListItem
            className="listItemCont"
            button
            onClick={this.handleOpenContentCategories}
          >
            <ListItemIcon className={this.props.classes.listIcon}>
              <DescriptionIcon />
            </ListItemIcon>
            {this.props.locales.length && (
              <ListItemText
                primary={
                  this.props.locales[16].translate_value !== ''
                    ? this.props.locales[16].translate_value
                    : this.props.locales[16].translate_key
                }
              />
            )}
            {this.state.openContentCategories ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={this.state.openContentCategories}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {this.props.contentCategories.map((category, i) => (
                <NavLink
                  onClick={this.props.onClose}
                  key={category.channel_id}
                  activeClassName="selected"
                  className={this.props.classes.menuNavLink}
                  to={`${process.env.PUBLIC_URL}/category/${category.channel_id}/content`}
                >
                  <ListItem
                    button
                    className={this.props.classes.nested + ' listItemCont'}
                  >
                    <ListItemIcon className={this.props.classes.listIcon}>
                      <ChevronRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={category.channel_name} />
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </Collapse>
        </>
      )
    }

    return (
      <Drawer
        className={this.props.classes.drawer}
        open={this.props.sidebar}
        onOpen={e => this.props.onOpen(e, true)}
        onClose={e => this.props.onClose(e, false)}
        variant={this.props.sideBarType}
        anchor="left"
        classes={{
          paper: this.props.classes.drawerPaper,
        }}
      >
        {this.props.sideBarType === 'persistent' && (
          <div className={this.props.classes.toolbar} />
        )}
        <div
          role="presentation"
          className={this.props.classes.sidebar}
          // onClick={this.props.onClose}
          // onKeyDown={props.handleDrawer()}
        >
          <PerfectScrollbar>
            <List>
              <NavLink
                exact
                activeClassName="selected"
                // onClick={e => this.props.handleRedirects(e)}
                className={this.props.classes.menuNavLink}
                onClick={this.props.onClose}
                to={`${process.env.PUBLIC_URL}`}
              >
                <ListItem className="listItemCont" button>
                  <ListItemIcon className={this.props.classes.listIcon}>
                    <HomeIcon />
                  </ListItemIcon>
                  {this.props.locales.length && (
                    <ListItemText
                      primary={
                        this.props.locales[2].translate_value !== ''
                          ? this.props.locales[2].translate_value
                          : this.props.locales[2].translate_key
                      }
                    />
                  )}
                </ListItem>
              </NavLink>
              {/* {window.location.pathname === '/' ? (
                <NavLink
                  onClick={e => this.props.handleRedirects(e)}
                  exact
                  activeClassName="selected"
                  className={this.props.classes.menuNavLink}
                  to="/#streaming"
                  id="canal-tv"
                  scroll={el =>
                    el.scrollIntoView({
                      behavior: 'smooth',
                      block: 'end',
                    })
                  }
                >
                  <ListItem className="listItemCont" button>
                    <ListItemIcon className={this.props.classes.listIcon}>
                      <LiveTvIcon />
                    </ListItemIcon>
                    <ListItemText primary={'En Directo'} />
                  </ListItem>
                </NavLink>
              ) : (
                <NavLink
                  onClick={e => this.props.handleRedirects(e)}
                  activeClassName="selected"
                  className={this.props.classes.menuNavLink}
                  to="/#streaming"
                  id="canal-tv"
                  scroll={el =>
                    setTimeout(() => {
                      el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                      })
                    }, 800)
                  }
                >
                  <ListItem onClick={this.props.onClose} className="listItemCont" button>
                    <ListItemIcon className={this.props.classes.listIcon}>
                      <LiveTvIcon />
                    </ListItemIcon>
                    <ListItemText primary={'En Directo'} />
                  </ListItem>
                </NavLink>
              )} */}
              {this.props.locales.length && (
                <div className={this.props.classes.sidebarTextSeparator}>
                  {this.props.locales[20].translate_value !== ''
                    ? this.props.locales[20].translate_value
                    : this.props.locales[20].translate_key}
                </div>
              )}
              <ListItem
                className="listItemCont"
                button
                onClick={this.handleOpenVideosCategories}
              >
                <ListItemIcon className={this.props.classes.listIcon}>
                  <VideoLibraryIcon />
                </ListItemIcon>
                {this.props.locales.length && (
                  <ListItemText
                    primary={
                      this.props.locales[1].translate_value !== ''
                        ? this.props.locales[1].translate_value
                        : this.props.locales[1].translate_key
                    }
                  />
                )}
                {this.state.openVideosCategories ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={this.state.openVideosCategories}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {categories !== null && categories}
                </List>
              </Collapse>

              {listContentCategories()}
            </List>
            {/* <Divider className={this.props.classes.divider} />
            <List>
              <NavLink
                onClick={e => this.props.handleRedirects(e, 1)}
                onClick={this.props.onClose}
                activeClassName="selected"
                className={this.props.classes.menuNavLink}
                to="/category/0"
              >
                <ListItem className="listItemCont" button onClick={this.props.handleRedirects}>
                  <ListItemIcon className={this.props.classes.listIcon}>
                    <TvIcon />
                  </ListItemIcon>
                  <ListItemText primary={'A la carta'} />
                </ListItem>
              </NavLink>
            </List> */}
            <Divider className={this.props.classes.divider} />
            <List>
              {this.props.locales.length && (
                <Typography className={this.props.classes.sidebarTextSeparator}>
                  {this.props.locales[3].translate_value !== ''
                    ? this.props.locales[3].translate_value
                    : this.props.locales[3].translate_key}
                </Typography>
              )}
              <NavLink
                exact
                activeClassName="selected"
                className={this.props.classes.menuNavLink}
                onClick={this.props.onClose}
                to={`${process.env.PUBLIC_URL}/playlist/watch-later`}
              >
                <ListItem className="listItemCont" button>
                  <ListItemIcon className={this.props.classes.listIcon}>
                    <WatchLaterIcon />
                  </ListItemIcon>
                  {this.props.locales.length && (
                    <ListItemText
                      primary={
                        this.props.locales[4].translate_value !== ''
                          ? this.props.locales[4].translate_value
                          : this.props.locales[4].translate_key
                      }
                    />
                  )}
                </ListItem>
              </NavLink>
              <NavLink
                exact
                activeClassName="selected"
                className={this.props.classes.menuNavLink}
                onClick={this.props.onClose}
                to={`${process.env.PUBLIC_URL}/playlist/favorites`}
              >
                <ListItem className="listItemCont" button>
                  <ListItemIcon className={this.props.classes.listIcon}>
                    <StarIcon />
                  </ListItemIcon>
                  {this.props.locales.length && (
                    <ListItemText
                      primary={
                        this.props.locales[5].translate_value !== ''
                          ? this.props.locales[5].translate_value
                          : this.props.locales[5].translate_key
                      }
                    />
                  )}
                </ListItem>
              </NavLink>
            </List>

<Divider className={this.props.classes.divider} />
            <List>
              <Typography className={this.props.classes.sidebarTextSeparator}>
                TV-VideoMap
              </Typography>
              <a
                className={this.props.classes.menuNavLink}
                href={`${process.env.REACT_APP_API_URL}/user`}
                target={self}>
                <ListItem className="listItemCont" button>
                  <ListItemIcon className={this.props.classes.listIcon}>
                    <TvIcon />
                  </ListItemIcon>
                  <ListItemText primary="GoogleMaps" />
                </ListItem>
                </a>
            </List>


            <Divider className={this.props.classes.divider} />
            <List>
              {/* {this.props.locales.length && (
                <Typography className={this.props.classes.sidebarTextSeparator}>
                  {this.props.locales[3].translate_value !== ''
                    ? this.props.locales[3].translate_value
                    : this.props.locales[3].translate_key}
                </Typography>
              )} */}
              <Typography className={this.props.classes.sidebarTextSeparator}>
                Usuarios
              </Typography>
              <a
                className={this.props.classes.menuNavLink}
                href={`${process.env.REACT_APP_API_URL}/admin`}
                target={self}
              >
                <ListItem className="listItemCont" button>
                  <ListItemIcon className={this.props.classes.listIcon}>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  {/* {this.props.locales.length && (
                    <ListItemText
                      primary={
                        this.props.locales[4].translate_value !== ''
                          ? this.props.locales[4].translate_value
                          : this.props.locales[4].translate_key
                      }
                    />
                  )} */}
                  <ListItemText primary="Iniciar Sesión" />
                </ListItem>
                </a>
            </List>


          </PerfectScrollbar>
          <div className={this.props.classes.miniFooter}>
            <Divider className={this.props.classes.divider} />
            {/* <div className={this.props.classes.miniFooterSocials}>
              <Typography className={this.props.classes.subtitleMenu}>
                Siguenos:
              </Typography>
              <div className={this.props.classes.socialMediaIconsContainer}>
                <a
                  className={this.props.classes.socialMediaIcons}
                  href={BASE_URL}
                  target={blank}
                >
                  <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
                </a>
                <a
                  className={this.props.classes.socialMediaIcons}
                  href={BASE_URL}
                  target={blank}
                >
                  <FontAwesomeIcon
                    className={this.props.classes.socialMediaIcons}
                    icon={faInstagram}
                    size="2x"
                  />
                </a>
                <a
                  className={this.props.classes.socialMediaIcons}
                  href={BASE_URL}
                  target={blank}
                >
                  <FontAwesomeIcon
                    className={this.props.classes.socialMediaIcons}
                    icon={faTwitterSquare}
                    size="2x"
                  />
                </a>
              </div>
            </div> */}
            <Typography className={this.props.classes.copyRightText}>
              Copyright © Vivaespaña
            </Typography>
          </div>
        </div>
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    locales: state.locales.data,
    videoCategories: state.categories.videoData,
    contentCategories: state.categories.contentData,
    sidebar: state.sidebar.status,
    sideBarType: state.sidebar.sideBarType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetVideoCategories: () => dispatch(actions.getVideoCategories()),
    onGetContentCategories: () => dispatch(actions.getContentCategories()),
    openSidebar: () => dispatch(actions.openSidebar()),
    closeSidebar: () => dispatch(actions.closeSidebar()),
    changeTypeSidebar: type => dispatch(actions.changeTypeSidebar(type)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar))
