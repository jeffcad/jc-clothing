import React from 'react'
import { useSelector } from 'react-redux'

import './collections-overview.styles.scss'
import CollectionPreview from '../collection-preview/collection-preview.component'

function CollectionsOverview() {

  const collectionsRaw = useSelector(state => state.shop.collections)
  const collections = collectionsRaw ? Object.keys(collectionsRaw).map(key => collectionsRaw[key]) : []

  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview
          key={id}
          {...otherCollectionProps}
        />
      ))}
    </div>
  )
}

export default CollectionsOverview