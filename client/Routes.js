import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Cart from './components/Cart';
import Home from './components/Home';
import UserProfile from './components/UserProfile'
import SingleProduct from './components/SingleProduct';
import {me} from './store'
import { fetchBooks } from './store/AllProducts';
import About from './components/About';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadBookData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />


            <Route path='/about' exact component={ About } />


            <Route path="/cart" component={Cart} />
            <Route path="/userProfile/:userId" component={UserProfile}/>
            <Route path="/products/:productId" component={ SingleProduct } />

          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path="/login" component={Login} />
            <Route path='/about' exact component={ About } />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:productId" component={ SingleProduct } />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadBookData(){
      dispatch(fetchBooks())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
