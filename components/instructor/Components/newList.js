import Form from "./form";

function NewList(props) {
  const formSubmitHandler = (enteredData) => {


    const submitData = {
      ...enteredData, 
    };
    props.onAdding(submitData);
  };
  return <Form onSubmitting={formSubmitHandler}></Form>;
}

export default NewList;
