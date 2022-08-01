import React from "react";

function List(props) {
  return (
    <div className="table-parent">
      <table cellSpacing={0} border={1}>
        <thead>
          <tr>
            <th>CourseID</th>
            <th>Course</th>
            <th>Course URL</th>
            <th>Instructor</th>
            <th>Stars</th>
            <th>Review</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, key) => (
            <tr key={key}>
              <td className="Name">{item.CourseID}</td>
              <td className="Age">{item.course}</td>
              <td>{item.URL}</td>
              <td>{item.instructor}</td>
              <td>{item.stars}</td>
              <td>{item.review}</td>
              <td>{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
