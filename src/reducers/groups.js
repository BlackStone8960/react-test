export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_GROUPS': 
      return action.groups;
    case 'DELETE_GROUP':
      return state.map((group, index) => {
        if (action.groupIndex === index) {
          return [];
        } else {
          return group;
        }
      });
    default:
      return state;
  }
};