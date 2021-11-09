export const createGroup = (students) => ({
  type: "CREATE_GROUP",
  students
});
export const editGroup = (students) => ({
  type: "EDIT_GROUP",
  students
});
export const removeGroup = () => ({
  type: "REMOVE_GROUP",
});