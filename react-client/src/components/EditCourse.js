import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditArticle(props) {
  console.log('edituser props:',props.match.params)
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '' });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester: course.semester};
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/showcourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateCourse}>
          <Form.Group>
                <Form.Label> Course Code</Form.Label>
                <Form.Control type="text" readOnly="true" name="courseCode" id="title" placeholder="Enter course code" value={course.courseCode} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control type="text" readOnly="true" name="courseName" id="title" placeholder="Enter course name" value={course.courseName} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control type="number" name="section" id="title" placeholder="Enter section number" value={course.section} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control type="number" readOnly="true" name="semester" id="title" placeholder="Enter semester number" value={course.semester} onChange={onChange} />
              </Form.Group>
          <Button variant="primary" type="submit">
            Update Article
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditArticle);
