import './Form.css';
import { useState } from 'react';
import Card from '../UI/card/Card';
import ErrorModal from '../UI/errorModal/ErrorModal';

function Form(props){

    const[enteredCourseID , setenteredCourseID] = useState('');

    const CourseIDChangeHandler = (event)=>{
        setenteredCourseID(event.target.value);
    }

    const[enteredCourse , setenteredCourse] = useState('');

    const courseChangeHandler = (event)=>{
        setenteredCourse(event.target.value);
    }

    const[enteredURL , setenteredURL] = useState('');

    const URLChangeHandler = (event)=>{
        setenteredURL(event.target.value);
    }


    const [isValid , setisValid] = useState();

    

    // const valid = true;

    const submitHandler = (event)=>{
        event.preventDefault();

        if(enteredCourseID.trim().length === 0 || enteredCourse.trim().length === 0)
        {
            setisValid({
                title: "Invalid Input",
                message : "Please enter valid input (No null Values)"
            });
            return;
        }


        const submitObject = {
            CourseID: enteredCourseID ,
            course: enteredCourse,
            URL:enteredURL
        }

            props.onSubmitting(submitObject);
            console.log(submitObject);
        }

        const errorHandler = ()=>{
            setisValid(null);
        }


        const[openState , setopenState] = useState(false);
        const openStateHandler = ()=>{
            setopenState(true);
        };
        const closeStateHandler=()=>{
            setopenState(false);
        };


    if(openState==true)
    {

        return(

            <div className='form'>
                {isValid && <ErrorModal title={isValid.title} message ={isValid.message}  onConfirm={errorHandler}></ErrorModal>}
                {/* {isValid && alert("hello")} */}

                <button className='cross' onClick={closeStateHandler}>X</button>
                <form className= "inner-form" onSubmit={submitHandler}>
                <label>CourseID</label>
                <input type = "text"  value={enteredCourseID} onChange={CourseIDChangeHandler}></input>
    
                <label>Course</label>
                <input type = "text" value={enteredCourse}  onChange={courseChangeHandler}></input>

                <label>Course URL</label>
                <input type = "text" value={enteredURL}  onChange={URLChangeHandler}></input>
    
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
