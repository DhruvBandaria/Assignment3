import AddCourse from './AddCourse';
import CourseList from './CourseList';
import CourseByStudent from './CourseByStudent';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [course, setCourse] = useState('');
  const [listAll, setListAll] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
    const listall = () => {
    if (course !== 'allcourses'){
    setCourse('allcourses')
    }
    else if(course === 'allcourses'){
      setCourse(' ')
    }
  }
  //
  const listByStudent = () => {
    setCourse('coursesbystudent')
  }
  //
  const addCourse = () => {
    if (course !== 'add'){
    console.log('in add course')
    setCourse('add')
    }
    else if(course === 'add'){
      setCourse(' ')
    }
  }
  //
  return (
    <div className="App">
      <div>
          <p>{screen}</p>
          <p>{data}</p>
          {/* <Button type="button" variant="outline-primary" onClick={verifyCookie}>Verify Cookie</Button>&nbsp; */}
          <Button type="button" variant="outline-primary" onClick={addCourse}>Add Course</Button>&nbsp;
          {/* <button onClick={listByStudent}>List Courses By Student</button> */}
          <Button type="button" variant="outline-secondary" onClick={listall}>List All Courses</Button>&nbsp;
          <Button type="button" variant="outline-danger" onClick={deleteCookie}>Log out</Button>
        </div>
      {
      course === 'add'
        ? <AddCourse screen={screen} setScreen={setScreen} />
        : <h1> </h1>
      }

      {
      course === 'allcourses'
        ? <CourseList screen={screen} setScreen={setScreen} />
        : <h1> </h1>
      }

      {
      course === 'coursesbystudent'
        ? <CourseByStudent screen={screen} setScreen={setScreen} />
        : <h1> </h1>
      }
    </div>
  );
}

//
export default View;