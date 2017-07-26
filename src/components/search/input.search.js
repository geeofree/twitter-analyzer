import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleFetch, receiveData } from '../../actions/search.actions'
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
    const { toggleFetch, fetching, receiveData } = this.props

    const domain = 'http://localhost:8080'
    const socket = io.connect(domain)
    const data = []

    if(!fetching) {
      toggleFetch(true)
      axios.get(`${domain}/api/v1.0/user/${twitterHandle}`)

      socket.on('receive tweets', tweets => {
        data.push(tweets.item)

        if(data.length === tweets.total) {
          receiveData({ status: 200, data })
          toggleFetch(false)
        }
      })
    }

    event.preventDefault()
  }

  render() {
    const { submitHandler, changeHandler } = this
    const { fetching } = this.props

    return (
      <form className={ fetching ? 'search-input close' : 'search-input' } onSubmit={submitHandler}>
        <button className="logo"></button>
        <input className='user-input' type="text" placeholder="yourTwitterHandle" onChange={changeHandler}/>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  fetching: state.search.fetching
})

const mapDispatchToProps = (dispatch, props) => ({
  toggleFetch: (fetchStatus) => dispatch(toggleFetch(fetchStatus)),
  receiveData: (data) => dispatch(receiveData(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
