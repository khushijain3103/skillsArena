import { useState } from "react"; 
import { Button, TextField, Modal, Box } from "@mui/material";
import  FormModal  from "../../../../@sections/form.add";
import {addCourse} from '../../../../api/index';
import {useSnackbar} from 'notistack';
function Form(props) {
  const {enqueueSnackbar} = useSnackbar();
  const [isValid, setisValid] = useState();
  const data = {
    title:'',
    description:'',
    url:'',
    stars:'',
    cost:'',
    instructor:'',
  };
  const handleAddcourse = async ({
    title,
    description,
    url,
    stars,
    cost,
    instructor,
  }) => {
 const data= await addCourse({
   title,
   description,
   url,
   stars,
   cost,
   instructor,
 });
 if(data.error)
 {
  enqueueSnackbar(data.error,{variant:'error'});
 }
 else{
  enqueueSnackbar("Course added ",{variant:'success'});
  props.onSubmitting(data.data);
 setopenState(false);
 }
  };

  const errorHandler = () => {
    setisValid(null);
  };

  const [openState, setopenState] = useState(false);
  const openStateHandler = () => {
    setopenState(true);
  };
   
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        mt: 3,
        alignItems: "center",
      }}
    >
      <Button variant="contained" color="secondary" onClick={openStateHandler}>
        Add Course
      </Button>
      <FormModal
        open={openState}
        data={data}
        setOpen={setopenState}
        handleAddcourse={handleAddcourse}
      />
    </Box>
  );
}

export default Form;
