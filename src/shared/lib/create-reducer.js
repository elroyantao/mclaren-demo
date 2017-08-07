export default function (initialState, handlers) {
  return function reducer(state, action) {
    const newState = (state === undefined) ? initialState : state

    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](newState, action)
    }

    return newState
  }
}
