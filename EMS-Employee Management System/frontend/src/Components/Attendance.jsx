// Attendance.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Attendance = ({ match }) => {
  const [attendance, setAttendance] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    // Fetch attendance data for the employee with the provided ID
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employee/employee_attendance/:${id}`);
        // console.log(response);
        // setAttendance(response.data.attendance);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
    
    fetchAttendance();
  }, [id]);

  return (
    <div>
      <h2 className='text-center py-3'>Employee Attendance</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* <tbody>
          {attendance.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default Attendance;


































// import axios from "axios";
// import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";

// function Attendance() {
//   const [attendance, setattendance] = useState([]);
//   const {id} = useParams();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/employee/employee_attendance/:" + id)
//       .then((result) => {
//         console.log(result);
//         setattendance(attendance + 1);
//         console.log(attendance);
//         if (result.data.Status) {
//           setCategory(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err.response.data));
//   }, []);
//   return (
//     <div className="px-5 mt-3">
//       <div className="d-flex justify-content-center">
//         <h3>Employee Category List</h3>
//       </div>
//       {/* <Link to="/dashboard/add_category" className="btn btn-outline-success">
//         Add Category
//       </Link> */}
//       <div className="mt-3">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Employee Id</th>
//               <th>Employee Name</th>
//             </tr>
//           </thead>
//           <tbody>hello {attendance}
//             {/* {category.map((c) => (
//               <tr key={c.id}>
//                 <td>{c.id}</td>
//                 <td>{c.name}</td>
//               </tr>
//             ))} */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Attendance;
