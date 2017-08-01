import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleFetch, receiveData, addProgress, resetProgress } from '../../actions/search.actions'
import io from 'socket.io-client'
import axios from 'axios'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)

    this.state = {
      twitterHandle: ''
    }
  }

  changeHandler(event) {
    this.setState({ twitterHandle: event.target.value })
  }

  submitHandler(event) {
    const { twitterHandle } = this.state
    const { toggleFetch, fetching, receiveData, addProgress, resetProgress } = this.props

    const prod = true

    const domain = prod ? location.origin : 'http://localhost:8080'
    const endpoint = `${domain}/api/v1.0/user/${twitterHandle}`

    const socket = io(domain)//.connect()
    const data = []


    const receiveSuccess = tweets => {
      if(tweets.status !== 200) {
        data.push(tweets.data)
        addProgress(tweets.max_batch)
      }
      else {
        receiveData({ status: tweets.status, data })
        toggleFetch(false)
        resetProgress()
        socket.removeListener('receive:tweets', receiveSuccess)
        socket.disconnect()
      }
    }

    const receiveError = (error) => {
      receiveData({ status: error.status, data: error.data })
      toggleFetch(false)
      resetProgress()
      socket.removeListener('receive:tweets:error', receiveError)
      socket.disconnect()
    }

    if(!fetching) {
      toggleFetch(true)
      axios.get(endpoint)
      socket.on('receive:tweets', receiveSuccess)
      socket.on('receive:tweets:error', receiveError)
    }

    event.preventDefault()
  }

  render() {
    const { submitHandler, changeHandler } = this
    const { fetching } = this.props

    return (
      <form className={ fetching ? 'search-input close' : 'search-input' } onSubmit={submitHandler}>
        <button className="logo"></button>
        <input className='user-input' type="text" placeholder="twitter_handle" onChange={changeHandler}/>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  fetching: state.search.fetching
})

const mapDispatchToProps = (dispatch, props) => ({
  toggleFetch: (fetchStatus) => dispatch(toggleFetch(fetchStatus)),
  receiveData: (data) => dispatch(receiveData(data)),
  addProgress: (max) => dispatch(addProgress(max)),
  resetProgress: () => dispatch(resetProgress())
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
