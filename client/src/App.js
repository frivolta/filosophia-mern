import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import PrivateRoute from './Components/Common/PrivateRoute';
import { Provider } from 'react-redux';
// See localstorage for jwt token
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
//import { setCurrentUser, logoutUser } from './actions/authActions';
//import { clearProfile } from './actions/profileActions';
import store from './redux/store';
import Login from './components/containers/login/Login';
import './components/scss/index.scss';
import { theme } from './components/jss/theme';
import { MuiThemeProvider, withTheme } from '@material-ui/core/styles';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Login/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
