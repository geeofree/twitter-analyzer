import assign from '../commons/assign'
import {
  FETCHED_DATA_RECEIVED,
  INCREMENT_PROGRESS_BAR,
  RESET_PROGRESS_BAR,
  IS_FETCHING
} from '../types/search.types'


const initState = {
  fetching: false,
  userData: { status: null, data: null },
  progressBar: { progress: 0, max: 0 }
}

export default (state=initState, action) => {
  switch(action.type) {
    case INCREMENT_PROGRESS_BAR:
      return assign(state, { progressBar: assign(state.progressBar, {
        progress: state.progressBar.progress + 1,
        max: action.max
      })
    })
    case RESET_PROGRESS_BAR:
      return assign(state, { progressBar: assign(state.progressBar, {
        progress: 0,
        max: 0
      })
    })
    case FETCHED_DATA_RECEIVED:
      return assign(state, { userData: assign(state.userData, {
        status: action.payload.status,
        data: action.payload.data
      })
    })
    case IS_FETCHING:
      return assign(state, { fetching: action.fetchStatus, userData: assign(state.userData, {
        data: action.fetchStatus ? [] : state.userData
      })
    })
    default:
      return state
  }
}
