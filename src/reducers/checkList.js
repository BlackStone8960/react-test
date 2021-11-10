const checkListReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHECK_LIST': 
      return action.checkList;
    case 'TOGGLE_CHECK':
      return state.map((_, index) => index === action.index)
    default:
      return state;
  }
};

export default checkListReducer;