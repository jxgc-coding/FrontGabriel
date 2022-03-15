import * as actionTypes from './actionTypes'

export const openSidebar = () => {
  return {
    type: actionTypes.SIDE_BAR_OPEN,
    status: true,
  }
}

export const closeSidebar = () => {
  return {
    type: actionTypes.SIDE_BAR_CLOSE,
    status: false,
  }
}

export const changeTypeSidebar = type => {
  return {
    type: actionTypes.SIDE_BAR_CHANGE_TYPE,
    sideBarType: type,
  }
}
