import TopBar from "../course/components/topBar/TopBar";
import NewList from "./Components/newList";
import { Container, Box } from "@mui/material";
import CourseTable from "./Components/table";
import { useState } from "react";
import {
  updateInstructor,
  deleteInstructor,
  getInstructors,
} from "../../api/index";
import React from "react";
import { useSnackbar } from "notistack";

function Instructor() {
  const [enteredNewData, setenteredNewData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getInstructors();
      setenteredNewData(response.data || []);
    };
    fetchData();
  }, []);

  const handleDeleteInstructor = async (_id) => {
    await deleteInstructor({ id: _id });
    setenteredNewData((t) => t.filter((instructor) => instructor._id !== _id));
    enqueueSnackbar("Instructor deleted successfully", {
      variant: "success",
    });
  };
  const handleUpdateInstructor = async (instructor) => {
    const data = await updateInstructor(instructor);
    setenteredNewData((t) =>
      t.map((item) => (item._id === data.data._id ? data.data : item))
    );
    enqueueSnackbar("Instructor updated successfully", {
      variant: "success",
    });
  };

  const addDatahandler = (data) => {
    console.log(data);
    setenteredNewData((prevData) => {
      return [data, ...prevData];
    });
  };
  return (
    <Container>
      <TopBar heading="Instructor Admin Panel"></TopBar>
      <NewList onAdding={addDatahandler}></NewList>

      <Box sx={{ width: "100%", minHeight: "100vh", mt: 10 }}>
        <CourseTable
          data={enteredNewData}
          handleDelete={handleDeleteInstructor}
          handleUpdate={handleUpdateInstructor}
        />
      </Box>
    </Container>
  );
}

export default Instructor;
