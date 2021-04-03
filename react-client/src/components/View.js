import AddCourse from './AddCourse';
import CourseList from './CourseList';
import React, { useState } from 'react';
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
  // const listall = (username) => {
    const listall = () => {
    //console.log('in list course: ',username)
    //setListAll('y');
    setCourse('list')
    // return(
    //   // <div className="App">
    //   // {
    //   //   <CourseList screen={screen} setScreen={setScreen} />
    //   // }
    //   // </div>
    //   <div className="App">
    //   {
    //   course !== 'l'
    //     ? <div>
    //         <h1> test </h1>
    //       </div>            
    //     // : <CourseList screen={screen} setScreen={setScreen} />
    //     : <CourseList screen={screen} setScreen={setScreen} />
    //   }
    // </div>
    // );
  }
  //
  const addCourse = () => {
    console.log('in add course')
    setCourse('add')

  }
  //
  return (
    <div className="App">
      <div>
          <p>{screen}</p>
          <p>{data}</p>
          <button onClick={verifyCookie}>Verify Cookie</button>
          <button onClick={addCourse}>Add Course</button>
          <button onClick={listall}>List Courses</button>
          <button onClick={deleteCookie}>Log out</button>
        </div>
      {
      course === 'add'
        ? <AddCourse screen={screen} setScreen={setScreen} />
        : <h1> </h1>
      }

      {
      course === 'list'
        ? <CourseList screen={screen} setScreen={setScreen} />
        : <h1> </h1>
      }
    </div>
  );
}

//
export default View;