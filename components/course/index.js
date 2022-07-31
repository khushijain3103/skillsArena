import NewList from "./components/newList/NewList";
import { useState } from "react";
import TopBar from "./components/topBar/TopBar";
import CourseTable from "../../@sections/course.table";
import { Container, Box } from "@mui/material";
import withAuth from "../../HOC/withAuth";
import React from "react";
import {
  deleteCourse,
  updateCourse,
  getUserCourses,
} from "../../api"; 
function App() {
 
  const [enteredNewData, setenteredNewData] = useState([]);
  React.useEffect(() => {
    const fetchUserCourses = async () => {
      const userCourses = await getUserCourses();
      const { courseIDs } = userCourses.data;
    
      setenteredNewData(courseIDs);
    };
    fetchUserCourses();
  }, []);
  const handleDeleteCourse = async (_id) => {
   await deleteCourse({ id: _id });

    // delete course with id: _id
    setenteredNewData((t) => t.filter((item) => item._id !== _id));
  };
  const handleUpdateCourse = async (course) => {
    const data = await updateCourse(course);
    // update course with id: data._id
    setenteredNewData((t) =>
      t.map((item) => (item._id === data.data._id ? data.data : item))
    );
  };


  const addDatahandler = (data) => {
    setenteredNewData((prevData) => {
      return [data, ...prevData];
    });
  };
  return (
    <Container sx={{ width: "100%", minHeight: "100vh" }}>
      <TopBar heading = "Course Admin Panel"/>
      <NewList onAdding={addDatahandler}></NewList>

      <Box sx={{ width: "100%", minHeight: "100vh", mt: 10 }}>
        <CourseTable
          data={enteredNewData}
          handleDelete={handleDeleteCourse}
          handleUpdate={handleUpdateCourse}
          abc ={true}
        />
      </Box>
    </Container>
  );
}

export default withAuth(App);
