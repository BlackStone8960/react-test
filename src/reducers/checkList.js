export default (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CHECK':
      return state.map((check, index) => {
        if (index === action.index) check = !check
      })
    default:
      return state;
  }
};