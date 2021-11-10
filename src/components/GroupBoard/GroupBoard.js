import React, { useContext, useState, useEffect } from 'react';
import { StudentContext } from '../App';
import StudentRow from './StudentRow';
import { createGroups } from '../../action/group';
import { useDispatch, useSelector } from 'react-redux';
import GroupsList from './GroupsList';
import Button from '@material-ui/core/Button';
import './GroupBoard.scss';

const initialGroupNum = 4;
const groupsSelector = state => state.groups;

const GroupBoard = () => {
  const { studentsState } = useContext(StudentContext);
  const dispatch = useDispatch();
  const groups = useSelector(groupsSelector);
  const [numOfGroup, setNumOfGroup] = useState(initialGroupNum);
  const [emptyGroups, setEmptyGroups] = useState([]);
  const [error, setError] = useState("");

  const makeGroupEmpty = () => {
    if (numOfGroup) {
      const tempArr = [];
      for (let i = 0; i < numOfGroup; i++) {
        tempArr.push([]);
      }
      setEmptyGroups(tempArr);
    }
  };

  useEffect(() => {
    makeGroupEmpty();

    // if the groups students joined has been deleted, reset their group numbers.
    for (let i in studentsState) {
      if (studentsState[i].groupNum > numOfGroup) { 
        studentsState[i].groupNum = null;
      }
    }
  }, [numOfGroup]);
  
  const onCreateGroup = () => {
    makeGroupEmpty(emptyGroups);
    const createdGroups = [...emptyGroups];
    for (let i in studentsState) {
      const student = studentsState[i];
      const groupNum = student.groupNum;

      // if user doesn't asign each student to any groups, show them error messages
      if (groupNum === null || groupNum > numOfGroup) {
        setError('There are students who do not join the groups');
        return; 
      } 

      // push every students' information to a group array
      createdGroups[groupNum - 1].push(student);
    }
    dispatch(createGroups(createdGroups));
    console.log(createdGroups); // log created groups to console
    setError('');
  };

  return (
    <div>
      <GroupsList groups={groups} />
      <div className="top-buttons">
        <Button 
          onClick={() => numOfGroup < 6 && setNumOfGroup(numOfGroup + 1)}
          variant="contained"
          style={{ fontSize: "12px", padding: "2px 8px" }}
        >
          INCREASE GROUP
        </Button>
        <Button
          onClick={() => numOfGroup > 2 && setNumOfGroup(numOfGroup - 1)}
          variant="contained"
          style={{ fontSize: "12px", padding: "2px 8px" }}
        >
          DECREASE GROUP
        </Button>
      </div>
      {(() =>  { 
        const columns = [];
        for (let i = 1; i <= numOfGroup; i++) {
          columns.push(
            <span key={i} className="group-text">{`GROUP ${i}`}</span>
          )
        }
        return <div className="group-row">{ columns }</div>;
      })()}
      { studentsState && studentsState.map((student) => (
        <React.Fragment key={student.name}>
          <StudentRow student={student} numOfGroup={numOfGroup}/>
        </React.Fragment>
      ))}
      <div className="error-sentence">{error}</div>
      <div className="bottom-buttons">
        <Button color="default" variant="contained">Done</Button>
        <Button
          onClick={onCreateGroup}
          className="create-group"
          variant="contained"
        >
          Create Group
        </Button>
      </div>
    </div>
  )
}

export default GroupBoard
