import React from 'react';
import { deleteGroup } from '../../action/group';
import { useDispatch } from 'react-redux';

const GroupsList = ({ groups }) => {
  const dispatch = useDispatch();

  return (
    <div>
      { groups && groups.map((group, index) => (
          group.length !== 0 && (
          <div key={index}>
            <div>GROUP{index + 1}</div>
            { group.map((student) => (
              <React.Fragment key={student.id}>
                <span>{student.name} </span>
              </React.Fragment>
            ))}
            <button onClick={() => dispatch(deleteGroup(index))}>DELETE</button>
          </div>
        )
      )) }
    </div>
  )
}

export default GroupsList
