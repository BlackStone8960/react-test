import React, { useContext, useReducer } from 'react';
import { StudentContext } from '../App';
import checkListReducer from '../../reducers/checkList';
import './StudentRow.scss';

const StudentRow = ({ student, numOfGroup }) => {
  // Make an array has as many falses as number number of groups
  const [checkedArr, dispatchCheckedArr] = useReducer(checkListReducer, [...Array(numOfGroup)].map((_) => false))
  const { dispatchStudents } = useContext(StudentContext);

  const onCheck = (groupNum) => {
    dispatchStudents({
      type: 'CHANGE_GROUP',
      id: student.id,
      groupNum
    });
  }

  return (
    <div className="student-row-wrapper">
      <div>{ student.name }</div>
      {(() =>  { 
        const columns = [];
        for (let i = 1; i <= numOfGroup; i++) {
          columns.push(
            <div
              onClick={() => onCheck(i)}
              key={i}
              className="checkbox"
            >
            </div>
          )
        }
        return <React.Fragment>{ columns }</React.Fragment>;
      })()}
    </div>
  )
}

export default StudentRow
