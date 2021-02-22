import React from 'react'

import { HomePageContainer } from './homepage.styles'
import Directory from '../../components/directory/directory.component'

function Homepage(props) {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  )
}

export default Homepage