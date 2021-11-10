import React, { useContext, useReducer, useEffect } from 'react';
import { StudentContext } from '../App';
import checkListReducer from '../../reducers/checkList';
import { changeGroup } from '../../action/students';
import './StudentRow.scss';

const makeArrFilledWithFalse = (numOfGroup) => [...Array(numOfGroup)].map((_) => false)

const StudentRow = ({ student, numOfGroup }) => {
  // Make an array has as many falses as number number of groups
  const [checkedArr, dispatchCheckedArr] = useReducer(checkListReducer, makeArrFilledWithFalse(numOfGroup))
  const { dispatchStudents } = useContext(StudentContext);

  // When numbers of the group changed, refresh checklist as well
  useEffect(() => {
    if (numOfGroup && checkedArr.length < numOfGroup) { // when user added new group
      for (let i = 0; i < numOfGroup - checkedArr.length; i++) {
        checkedArr.push(false)
      }
    } else if (numOfGroup && checkedArr.length >= numOfGroup) {
      checkedArr.length = numOfGroup;
    } else {
      return;
    }
    numOfGroup && dispatchCheckedArr({
      type: 'SET_CHECK_LIST',
      checkList: checkedArr
    })
  }, [numOfGroup])

  const onCheck = (groupNum) => {
    dispatchStudents(changeGroup(student.id, groupNum));
    dispatchCheckedArr({
      type: 'TOGGLE_CHECK',
      index: groupNum - 1
    })
    sessionStorage.setItem(student.name, groupNum.toString());
  };

  return (
    <div className="student-row-wrapper">
      <div className="student-row-name">{ student.name }</div>
      {(() =>  { 
        if (checkedArr) {
          const columns = [];
          for (let i = 1; i <= numOfGroup; i++) {
            columns.push(
              <div
                onClick={() => onCheck(i)}
                key={i}
                className={`checkbox ${checkedArr[i - 1] && "checked"}`}
              >
              </div>
            )
          }
          return <React.Fragment>{ columns }</React.Fragment>;
        }
      })()}
    </div>
  )
}

export default StudentRow
