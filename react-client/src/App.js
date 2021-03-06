import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ListStudents from './components/ListStudents';
import AddCourse from './components/AddCourse';
import CourseList from './components/CourseList';
import ShowStudent from './components/ShowStudent';
import EditStudent from './components/EditStudent';
import ShowCourse from './components/ShowCourse';
import EditCourse from './components/EditCourse';

//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/list">List of Students</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < SignUp />} path="/signup" />
          <Route render ={()=> < ListStudents />} path="/list" />
          <Route render ={()=> < AddCourse />} path="/addcourse" />
          <Route render ={()=> < CourseList />} path="/listall" />
          <Route render ={()=> < ShowStudent />} path="/show/:id" />
          <Route render ={()=> < EditStudent />} path="/edit/:id" />
          <Route render ={()=> < ShowCourse />} path="/showcourse/:id" />
          <Route render ={()=> < EditCourse />} path="/editcourse/:id" />
      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
