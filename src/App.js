import logo from './logo.svg';
import './App.css';
import NewList from './components/newList/NewList';
import List from './components/list/List';
import { useState } from 'react';

function App() {

  const dummyData = [
    {
      CourseID: '1' ,
      course: 'c++',
      URL:'abc.com'
    } ,
    {
      CourseID: '1' ,
      course: 'c++',
      URL:'abc.com'
    },
  ];

  const[enteredNewData , setenteredNewData] = useState(dummyData);

  const addDatahandler = (data) => {
    console.log(data);
    setenteredNewData((prevData) => {
      return [data,...prevData];
    })
  }
  return (
    <div className="App">
      <NewList onAdding = {addDatahandler}></NewList>
      <List list = {enteredNewData} ></List>

    </div>
    
  );
}

export default App;
