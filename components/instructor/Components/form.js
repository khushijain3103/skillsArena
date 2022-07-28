import { useState } from "react"; 
import { Button, TextField, Modal, Box } from "@mui/material";
import  FormModal  from "../@sections/form.add";
import {addInstructor} from '../../../api/index';
import {useSnackbar} from 'notistack';


function Form(props) {
  const {enqueueSnackbar} = useSnackbar();
  const [isValid, setisValid] = useState();
  const data = {
    FirstName:'',
    LastName:'',
    email:'',
    bio:'',
  };
  const handleAddcourse = async ({
    FirstName , 
    LastName , 
    email ,
    Bio
  }) => {
 const data= await addInstructor({
    FirstName , 
    LastName , 
    email ,
    Bio
 });
 if(data.error)
 {
  enqueueSnackbar(data.error,{variant:'error'});
 }
 else{
  enqueueSnackbar("Instructor added ",{variant:'success'});
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
        Add Instructor
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
