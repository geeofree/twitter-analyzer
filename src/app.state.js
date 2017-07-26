import { createStore, applyMiddleware, combineReducers } from 'redux'

import searchReducer from './reducers/search.reducer'

const logger = state => next => action => {
  console.log('dispatching action:', action)
  console.log('next state:', state.getState())
  next(action)
}

const middleware = applyMiddleware(logger)

const reducers = combineReducers({
  search: searchReducer
})

export default createStore(reducers, {}, middleware)
