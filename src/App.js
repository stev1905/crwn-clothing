import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component.jsx';

import { checkUserSession } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;

    checkUserSession();
  }

  componentWillUnmount(props) {
    this.unsubscribeFromAuth(props);
  }

    render() {
      return (
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/checkout' component={CheckoutPage} />
            <Route 
              exact 
              path='/signin' 
              render={() => 
                this.props.currentUser ? (
                  <Redirect to='/' /> 
                ) : (
                  <SignInAndSignUpPage />
                )
              } 
            />
          </Switch>
        </div>
      )
    }
}

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
