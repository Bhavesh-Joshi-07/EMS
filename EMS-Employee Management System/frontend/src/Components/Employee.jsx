import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  let addEmpBtn = {
    position: "relative",
    left: "85%",
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee Section</h3>
      </div>
      <Link
        to="/dashboard/add_employee"
        className="btn btn-outline-success"
        style={addEmpBtn}
      >
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.email}>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee_image"
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>
                  {e.category_id === 1
                    ? "IT"
                    : e.category_id === 2
                    ? "Developement"
                    : e.category_id === 3
                    ? "Desgining"
                    : e.category_id === 4
                    ? "Social Media"
                    : "Unknown Category"}
                </td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-outline-dark btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button> 
                </td>
                <td>
                  <Link
                    to={`/dashboard/employee_attendance/` + e.id}
                    className="btn btn-outline-dark btn-sm me-2"
                  >
                    View Attendence
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
