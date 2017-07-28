import {
  FETCHED_DATA_RECEIVED,
  INCREMENT_PROGRESS_BAR,
  RESET_PROGRESS_BAR,
  IS_FETCHING
} from '../types/search.types'

export const toggleFetch = (fetchStatus) => ({
  type: IS_FETCHING,
  fetchStatus
})

export const receiveData = ({ status, data }) => ({
  type: FETCHED_DATA_RECEIVED,
  payload: { status, data }
})

export const addProgress = (max) => ({
  type: INCREMENT_PROGRESS_BAR,
  max
})

export const resetProgress = () => ({
  type: RESET_PROGRESS_BAR
})
