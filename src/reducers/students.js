const studentsReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_GROUP':
      return state.map((student) => {
        if (student.id === action.id) {
          return {
            ...student,
            groupNum: action.groupNum
          };
        } else {
          return student;
        }
      });
  }
}

export default studentsReducer;