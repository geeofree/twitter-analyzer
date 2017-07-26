import assign from '../commons/assign'
import { FETCHED_DATA_RECEIVED, IS_FETCHING } from '../types/search.types'


const initState = {
  fetching: false,
  userData: {}
}

export default (state=initState, action) => {
  switch(action.type) {
    case FETCHED_DATA_RECEIVED:
      return assign(state, { userData: action.data })
    case IS_FETCHING:
      return assign(state, { fetching: action.fetchStatus })
    default:
      return state
  }
}
