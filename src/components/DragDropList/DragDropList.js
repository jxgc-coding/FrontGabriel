import React, { PureComponent } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import CloseIcon from '@material-ui/icons/Close'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Hidden from '@material-ui/core/Hidden'

import './_dragdroplist.scss'

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 0,
  background: isDragging && '#dddddd',

  ...draggableStyle,
})

export default class DragDropList extends PureComponent {
  handleRemoveFromPlaylist(category_id, video_id) {
    this.props.removeFromPlaylist(category_id, video_id)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              id="draggable-list-container"
              className="draggable-list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.props.items.length &&
                this.props.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="draggable-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div className="playlist-order-video-card-container">
                          <Hidden mdUp>
                            <div
                              className="delete-playlist-button-mobile"
                              onClick={() =>
                                this.handleRemoveFromPlaylist(
                                  this.props.category,
                                  item.videos_id
                                )
                              }
                            >
                              <CloseIcon />
                            </div>
                          </Hidden>
                          <Hidden smDown>
                            <div
                              className="delete-playlist-button"
                              onClick={() =>
                                this.handleRemoveFromPlaylist(
                                  this.props.category,
                                  item.videos_id
                                )
                              }
                            >
                              <CloseIcon />
                            </div>
                          </Hidden>
                          <Hidden xsDown>
                            <div className="index-playlist-drag">
                              <DragHandleIcon />
                            </div>
                            <div className="index-playlist-container">
                              <span className="index-playlist">
                                {index + 1}
                              </span>
                            </div>
                          </Hidden>
                          <NavLink
                            className="video-card-link"
                            to={`${process.env.PUBLIC_URL}/category/${
                              this.props.category === 'watch-later' ||
                              this.props.category === 'favorites'
                                ? '0'
                                : this.props.category
                            }/video/${item.videos_id}`}
                          >
                            <Card
                              hola_ve_preview={
                                item.video_id !== undefined
                                  ? `${process.env.REACT_APP_API_URL}admin/Uploads/videos/${item.video_id}.${item.type}`
                                  : ''
                              }
                              className="related-video-card"
                            >
                              <div className="img-cont">
                                <CardMedia
                                  className="related-video-media"
                                  image={
                                    item.thumbnail !== undefined &&
                                    item.thumbnail !== 'none.gif'
                                      ? process.env.REACT_APP_API_URL +
                                        item.thumbnail
                                      : `${process.env.PUBLIC_URL}/normal_default.png`
                                  }
                                />
                                <div className="overlay"></div>
                                <div className="content-overlay">
                                  <IconButton>
                                    <PlayCircleOutlineIcon className="play-circle-icon" />
                                  </IconButton>
                                </div>
                              </div>
                              <div className="related-video-details">
                                <CardContent className="related-video-content">
                                  <Typography
                                    className="related-video-title"
                                    component="h5"
                                    variant="h5"
                                  >
                                    {String(item.title)}
                                  </Typography>
                                  <Typography
                                    className="related-video-description"
                                    variant="subtitle1"
                                    color="textSecondary"
                                  >
                                    {String(item.description)}
                                  </Typography>
                                </CardContent>
                              </div>
                            </Card>
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
