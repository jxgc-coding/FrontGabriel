import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import * as actions from '../../store/actions'
import classes from './Login.module.scss'

class Login extends Component {
  state = {
    email: '',
    password: '',
    mailChangedError: false,
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.onLogin(this.state.email, this.state.password)
    }
  }

  handleChange = (event, type) => {
    if (type === 'email') {
      let expresion = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (expresion.test(event.target.value)) {
        this.setState({ email: event.target.value, mailChangedError: false })
      } else {
        if (this.state.mailChangedError === false) {
          this.setState({ mailChangedError: true })
        }
      }
    } else if (type === 'password') {
      this.setState({ password: event.target.value })
    }
  }

  render() {
    let validForm = this.state.email !== '' && this.state.password !== ''
    let redirect = null
    if (this.props.logged) {
      redirect = <Redirect to="/lists" />
    }
    return (
      <>
        {redirect}
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item lg={3} xs={11}>
            <form>
              <Card className={classes.Card}>
                <Grid container justify="center">
                  <Icon color="primary" fontSize="large">
                    lock
                  </Icon>
                </Grid>
                <CardHeader title="Sign in" />
                <CardContent>
                  <TextField
                    type="email"
                    label="Email"
                    error={this.state.mailChangedError}
                    helperText={
                      this.state.mailChangedError ? 'Invalid email' : ' '
                    }
                    fullWidth
                    autoFocus
                    required
                    onBlur={event => this.handleChange(event, 'email')}
                  />
                  <TextField
                    margin="normal"
                    type="password"
                    label="Password"
                    fullWidth
                    required
                    onChange={event => this.handleChange(event, 'password')}
                    value={this.state.password}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    onClick={this.handleSubmit}
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                    disabled={this.props.loading || !validForm}
                    type="submit"
                  >
                    Sign in
                    {this.props.loading ? (
                      <CircularProgress
                        size={24}
                        className={classes.ButtonProgress}
                      />
                    ) : null}
                  </Button>
                </CardActions>
              </Card>
            </form>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          ContentProps={{ classes: { root: classes.Error } }}
          open={this.props.error ? true : false}
          onClose={this.props.onCloseError}
          message={
            <>
              <Icon className={classes.Icon}>warning</Icon>
              <span id="message-id">{this.props.error}</span>
            </>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.props.onCloseError}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.login.loading,
    logged: state.login.logged,
    error: state.login.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onCloseError: () => dispatch(actions.errorReset()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
