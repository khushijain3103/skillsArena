import { useState } from 'react';
import './List.css';
import Card from '../UI/card/Card';

function List(props){

    

    return(

        <div className='table-parent'>
            <table  className='table'>
            <tr>
                <th>Name</th>
                <th>Age</th>
            </tr>
            {props.list.map((item )=>(

                <tr  key={item.id}>
                    <td className="Name">{item.Name}</td>
                    <td className="Age">{item.Age}</td>

                </tr>
            )
        )}

        </table>

        </div>
        
    )

    

}

export default List;