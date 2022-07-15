import './Form.css';
import { useState } from 'react';
import Card from '../UI/card/Card';
import ErrorModal from '../UI/errorModal/ErrorModal';

function Form(props){

    const[enteredName , setenteredName] = useState('');

    const nameChangeHandler = (event)=>{
        setenteredName(event.target.value);
    }

    const[enteredAge , setenteredAge] = useState('');

    const ageChangeHandler = (event)=>{
        setenteredAge(event.target.value);
    }


    const [isValid , setisValid] = useState();

    

    // const valid = true;

    const submitHandler = (event)=>{
        event.preventDefault();

        if(enteredName.trim().length === 0 || enteredAge.trim().length === 0)
        {
            setisValid({
                title: "Invalid Input",
                message : "Please enter valid input (No null Values)"
            });
            return;
        }

        if(enteredAge<1)
        {
            setisValid({
                title: "Invalid Input",
                message : "Please enter valid age (>0)"
            });
            return;
        }
        

        const submitObject = {
            Name: enteredName ,
            Age: enteredAge
        }

            props.onSubmitting(submitObject);
        }

        const errorHandler = ()=>{
            setisValid(null);
        }


        const[openState , setopenState] = useState(false);
        const openStateHandler = ()=>{
            setopenState(true);
        };


    if(openState==true)
    {

        return(

            <div className='form'>
                {isValid && <ErrorModal title={isValid.title} message ={isValid.message}  onConfirm={errorHandler}></ErrorModal>}
                {/* {isValid && alert("hello")} */}
                <form className= "inner-form" onSubmit={submitHandler}>
                <label>NAME</label>
                <input type = "text"  value={enteredName} onChange={nameChangeHandler}></input>
    
                <label>AGE(YEARS)</label>
                <input type = "text" value={enteredAge}  onChange={ageChangeHandler}></input>
    
                <button>ADD</button>
    
                </form>
    
            </div>
        )
    

    }
    

    else
    {
        return(
            <div  className='add-course'>
                <button  onClick={openStateHandler}>Add Course</button>
            </div>
        )

    }

    
    

}

export default Form;
