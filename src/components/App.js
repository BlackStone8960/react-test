import React, { createContext, useReducer } from 'react';
import GroupBoard from './GroupBoard/GroupBoard';
import initialStudentsState from '../studentList/studentList';
import studentsReducer from '../reducers/students';
import './App.css';

const StudentContext = createContext();

function App() {
  const [studentsState, dispatchStudents] = useReducer(studentsReducer, initialStudentsState);

  return (
    <div className="App">
      <div>
        <h2>Create Groups</h2>
        <div>
          <p>Select a group of students and click "Create Group"</p>
        </div>
      </div>
      <StudentContext.Provider value={{ studentsState, dispatchStudents }}>
        <GroupBoard />
      </StudentContext.Provider>
    </div>
  );
}

export { StudentContext, App as default };
