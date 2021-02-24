import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

function CartIcon() {

  const itemCount = useSelector(state => state.cart.cartItems.reduce(
    (accumulatedQty, cartItem) => accumulatedQty + cartItem.quantity,
    0
  ))

  const dispatch = useDispatch()

  return (
    <div className='cart-icon' onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div >
  )
}

export default CartIcon