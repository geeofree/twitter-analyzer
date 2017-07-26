import assign from '../commons/assign'
import { FETCH_USER_DATA } from '../types/search.types'

const initState = {
  twitterHandle: '',
  fetching: false
}

export default (state=initState, action) => {
  switch(action.type) {
    case FETCH_USER_DATA:
      return assign(state, {
        twitterHandle: action.twitterHandle,
        fetching: action.fetchStatus
      })
    default:
      return state
  }
}
