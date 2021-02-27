import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { GlobalStyle } from './global.styles'
import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))

function App() {

  const currentUser = useSelector(state => state.user.currentUser)

  const dispatch = useDispatch()

  let unsubscribeFromAuth = null
  let unsubscribeFromSnapshot = null

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={() =>
              currentUser ? <Redirect to='/' /> : <SignInAndSignUp />
            } />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div >
  )
}

export default App