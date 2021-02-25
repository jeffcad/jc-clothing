import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'

function App() {

  const currentUser = useSelector(state => state.user.currentUser)

  const dispatch = useDispatch()

  let unsubscribeFromAuth = null
  let unsubscribeFromSnapshot = null

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        unsubscribeFromSnapshot = userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }))
        })
      } else {
        dispatch(setCurrentUser(null))
      }
    })

    return (() => {
      unsubscribeFromAuth()
      unsubscribeFromSnapshot()
    })
  }, [setCurrentUser, auth, createUserProfileDocument])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() =>
          currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)
        } />
      </Switch>
    </div >
  )
}

export default App