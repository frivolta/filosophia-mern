import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/commons/PrivateRoute';
import { Provider } from 'react-redux';
// See localstorage for jwt token
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import store from './redux/store';
import Login from './components/containers/login/Login';
import Dashboard from './components/containers/pages/dashboard/Dashboard';
import './components/scss/index.scss';
import { theme } from './components/jss/theme';
import { MuiThemeProvider, withTheme } from '@material-ui/core/styles';
import Register from './components/containers/register/Register';
import AddQuote from './components/containers/quotes/AddQuote';
import Loved from './components/containers/pages/loved/Loved';
import MyQuotes from './components/containers/pages/my-quotes/MyQuotes';
import Category from './components/containers/pages/category/Category';


// Check for token
if(localStorage.jwtToken){
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expo
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  /*const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    window.location.href = '/login';
  }*/
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
        <Router>
            <div className="App">
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/loved" component={Loved} />
                <PrivateRoute exact path="/add-quote" component={AddQuote} />      
                <PrivateRoute exact path="/my-quotes" component={MyQuotes} />          
                <PrivateRoute exact path="/:cat" component={Category} />          
              </Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
