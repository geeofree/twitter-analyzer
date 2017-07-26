import React from 'react'
import { connect } from 'react-redux'
import './search.style.sass'

import SearchInput from './input.search'

const SearchLayout = ({ userData }) => (
  <div className={
    !userData || userData.status === 200 ? 'search' :
    userData && userData.status >= 400 ? 'search error' : 'search'
  }>
    <div className="container">
      <SearchInput />
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  userData: state.search.userData
})

export default connect(mapStateToProps)(SearchLayout)
