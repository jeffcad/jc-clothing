import React from 'react'
import { useDispatch } from 'react-redux'

import './collection-item.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import { addItem } from '../../redux/cart/cart.actions'

function CollectionItem({ item }) {

  const dispatch = useDispatch()

  const { name, price, imageUrl } = item
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <CustomButton
        className='custom-button'
        inverted
        onClick={() => dispatch(addItem(item))}
      >
        Add To Cart
        </CustomButton>
    </div>
  )
}

export default CollectionItem