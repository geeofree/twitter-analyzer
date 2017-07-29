import React from 'react'
import { connect } from 'react-redux'
import './search.style.sass'

import SearchInput from './input.search'
import LoadingBar from './loader.search'

const SearchLayout = ({ userData, fetching, progressBar }) => (
  <div className={
    fetching ? 'search busy' :
    userData && userData.status >= 400 ? 'search error' :
    !userData || userData.status === 200 ? 'search success' : 'search'
  }>
    <div className="container">
      <SearchInput />
      { fetching && <LoadingBar /> }
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  userData: state.search.userData,
  fetching: state.search.fetching
})

export default connect(mapStateToProps)(SearchLayout)
