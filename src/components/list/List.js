import { useState } from 'react';
import './List.css';
import Card from '../UI/card/Card';

function List(props){

    

    return(

        <div className='table-parent'>
            <table cellSpacing={0} border={1}>
            <tr>
                <th>CourseID</th>
                <th>Course</th>
                <th>Course URL</th>
            </tr>
            {props.list.map((item )=>(

                <tr  key={item.id}>
                    <td className="Name">{item.CourseID}</td>
                    <td className="Age">{item.course}</td>
                    <td>{item.URL}</td>

                </tr>
            )
        )}

        </table>

        </div>
        
    )

    

}

export default List;