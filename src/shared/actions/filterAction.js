export function setFilter(filter, value) {
  return {
    type: 'SET_FILTER',
    filter,
    value
  }
}

export const changeFilter = (type, value) => (dispatch, getState) => {
  const { filters } = getState()
  const newValue = filters[type] === value ? null : value
  dispatch(setFilter(type, newValue))
}

export const changeSort = (sortBy) => {
  return {
    type: 'CHANGE_SORT',
    sortBy
  }
}
