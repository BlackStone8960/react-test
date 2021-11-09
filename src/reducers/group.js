export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_GROUP': 
      return action.students;
    case 'EDIT_GROUP':
      return {
        ...state,
        ...action.students
      }
    case 'REMOVE_GROUP':
      return {};
    default:
      return state;
  }
};