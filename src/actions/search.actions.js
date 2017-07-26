import { FETCHED_DATA_RECEIVED, IS_FETCHING } from '../types/search.types'

export const toggleFetch = (fetchStatus) => ({
  type: IS_FETCHING,
  fetchStatus
})

export const receiveData = (data) => ({
  type: FETCHED_DATA_RECEIVED,
  data
})
