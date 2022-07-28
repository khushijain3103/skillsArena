import  TopBar from '../course/components/topBar/TopBar';
import NewList from './Components/newList';
import { Container, Box } from "@mui/material";
import CourseTable from './Components/table';
import {useState} from 'react';
import {updateInstructor , deleteInstructor} from '../../api/index'


function Instructor()
{
    const dummyData = Array(1)
    .fill()
    .map((_, i) => {
      return {
        _id: i + 1,
        firstName:"John",
        lastName:"Doe",
        email:"abc.gmail.com",
        bio:"hey I am John doe"
      };
    });

  const handleDeleteInstructor = async (_id) => {
    await deleteInstructor({ id: _id });
  };
  const handleUpdateInstructor = async (instructor) => {
    const data = await updateInstructor(instructor);

    console.log(data);

    setenteredNewData((t) =>
    t.map((item) => (item._id === data.data._id ? data.data : item))
  );
  };
 

  const [enteredNewData , setenteredNewData] = useState(dummyData);

  const addDatahandler = (data) => {
    console.log(data);
    setenteredNewData((prevData) => {
      return [data, ...prevData];
    });
  };
    return(
        <Container>
            <TopBar heading = "Instructor Admin Panel"></TopBar>
            <NewList onAdding={addDatahandler}></NewList>
      
            <Box sx={{ width: "100%", minHeight: "100vh", mt: 10 }}>
                <CourseTable
                data={enteredNewData}
                handleDelete={handleDeleteInstructor}
                handleUpdate={handleUpdateInstructor}
                />
            </Box>
            

        </Container>
    )
}

export default Instructor;