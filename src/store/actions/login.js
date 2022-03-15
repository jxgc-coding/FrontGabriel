import * as actionTypes from './actionTypes'
import axios from '../../axios'
import SHA256 from 'crypto-js/sha256'

export const loginCheck = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(loginSuccess(token))
    } else {
      dispatch(logoutSuccess())
    }
  }
}

export const errorReset = () => {
  return {
    type: actionTypes.ERROR_RESET,
  }
}

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart())
    axios
      .post('auth/login', {
        email,
        password: SHA256(password).toString(),
      })
      .then(response => {
        dispatch(loginSuccess(response.data))
      })
      .catch(error => {
        dispatch(loginFail('Wrong user or password'))
      })
  }
}

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  }
}

export const loginSuccess = token => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
  }
}

export const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
  }
}

export const logoutStart = () => {
  return {
    type: actionTypes.LOGOUT_START,
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logoutStart())
    axios
      .post(
        'auth/logout',
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      )
      .then(res => {
        let status = res.status

        if (status === 201) {
          dispatch(logoutSuccess())
        } else {
          dispatch(logoutFail())
        }
      })
      .catch(err => console.log(err))
  }
}

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  }
}

export const logoutFail = () => {
  return {
    type: actionTypes.LOGOUT_FAIL,
  }
}
