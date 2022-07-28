import Form from "../form/Form";

function NewList(props) {
  const formSubmitHandler = (enteredData) => {
    // if(Object.keys(enteredData).length === 0)
    // {
    //     console.log('he');
    // }

    const submitData = {
      ...enteredData, 
    };

    // console.log(submitData);
    props.onAdding(submitData);
  };
  return <Form onSubmitting={formSubmitHandler}></Form>;
}

export default NewList;
