import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'

function ShopPage({ match }) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCollectionsStartAsync())
  }, [fetchCollectionsStartAsync])

  return (
    <div className='shop-page' >
      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>
  )
}

export default ShopPage