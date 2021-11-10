import React, { useContext, useState, useEffect } from 'react';
import { StudentContext } from '../App';
import StudentRow from './StudentRow';
import { createGroups } from '../../action/group';
import { useDispatch, useSelector } from 'react-redux';
import GroupsList from './GroupsList';

const initialGroupNum = 3;
const groupsSelector = state => state.groups;

const GroupBoard = () => {
  const { studentsState } = useContext(StudentContext);
  const dispatch = useDispatch();
  const groups = useSelector(groupsSelector);
  const [numOfGroup, setNumOfGroup] = useState(initialGroupNum);
  const [emptyGroups, setEmptyGroups] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const tempArr = [];
    for (let i = 0; i < numOfGroup; i++) {
      tempArr.push([]);
    }
    setEmptyGroups(tempArr);
  }, [numOfGroup]);
  
  const onCreateGroup = () => {
    const createdGroups = [...emptyGroups];
    for (let i in studentsState) {
      const student = studentsState[i];
      // if user doesn't asign each student to any groups, show them error messages
      if (student.groupNum === null) {
        setError('There are students who do not join the groups');
        return; 
      } 

      // push every students' information to a group array
      createdGroups[student.groupNum - 1].push(student);
    }
    dispatch(createGroups(createdGroups));
    console.log(createdGroups); // log created groups to console
  };

  return (
    <div>
      <GroupsList groups={groups} />
      <button onClick={() => numOfGroup < 6 && setNumOfGroup(numOfGroup + 1)}>
        +
      </button>
      { studentsState && studentsState.map((student) => (
        <React.Fragment key={student.name}>
          <StudentRow student={student} numOfGroup={numOfGroup}/>
        </React.Fragment>
      ))}
      <div className="error-sentence">{error}</div>
      <button>Done</button>
      <button onClick={onCreateGroup}>Create Group</button>
    </div>
  )
}

export default GroupBoard
