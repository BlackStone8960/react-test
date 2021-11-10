import React from 'react';
import { deleteGroup } from '../../action/group';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import "./GroupsList.scss";

const GroupsList = ({ groups }) => {
  const dispatch = useDispatch();

  return (
    <div className="group-container">
      { groups && groups.map((group, index) => (
          group.length !== 0 && (
          <div key={index} className="group-wrapper">
            <div className="group-header">
              <div className="group-numbering">GROUP{index + 1}</div>
              <Button
                onClick={() => dispatch(deleteGroup(index))}
                variant="contained"
                style={{ fontSize: "12px", padding: "2px 8px", marginLeft: "32px" }}
              >
                DELETE
              </Button>
            </div>
            { group.map((student) => (
              <React.Fragment key={student.id}>
                <span className="group-student-name">{student.name} </span>
              </React.Fragment>
            ))}
          </div>
        )
      )) }
    </div>
  )
}

export default GroupsList
