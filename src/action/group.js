export const createGroups = (groups) => ({
  type: "CREATE_GROUPS",
  groups
});
export const editGroup = (group) => ({
  type: "EDIT_GROUP",
  group
});
export const deleteGroup = (groupIndex) => ({
  type: "DELETE_GROUP",
  groupIndex
});