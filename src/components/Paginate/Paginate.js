import React, { Component } from 'react'
import Pagination from 'material-ui-flat-pagination'

import './_paginate.scss'

export default class Paginate extends Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
  }

  handleClick(offset) {
    this.setState({ offset })
    this.props.goTopTo()
    this.props.onGetList(offset / this.props.limit + 1)
  }

  render() {
    return (
      <div className="paginate-cont">
        <Pagination
          limit={this.props.limit}
          total={this.props.total}
          offset={this.state.offset}
          onClick={(e, offset) => this.handleClick(offset)}
        />
      </div>
    )
  }
}
