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
      <LoadingBar progress={progressBar.progress} expectedLoad={progressBar.max}/>
      <SearchInput />
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  userData: state.search.userData,
  fetching: state.search.fetching,
  progressBar: state.search.progressBar
})

export default connect(mapStateToProps)(SearchLayout)
