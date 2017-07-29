import React from 'react'
import { connect } from 'react-redux'

const LoadingBar = ({ progress, expectedLoad }) => (
  <div className="progress-bar">
    <div className="progress" style={{
      width:`${(progress / expectedLoad) * 100}%`
    }}/>
  </div>
)

const mapStateToProps = (state) => ({
  progress: state.search.progressBar.progress,
  expectedLoad: state.search.progressBar.max
})

export default connect(mapStateToProps)(LoadingBar)
