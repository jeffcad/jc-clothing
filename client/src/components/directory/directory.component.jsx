import React from 'react'
import { useSelector } from 'react-redux'

import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'

function Directory() {

  const sections = useSelector(state => state.directory.sections)

  return (
    <div className='directory-menu'>
      {
        sections.map(({ id, ...otherSectionProps }) =>
          <MenuItem key={id} {...otherSectionProps} />
        )
      }
    </div>
  )
}

export default Directory