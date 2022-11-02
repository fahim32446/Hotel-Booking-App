import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useContext } from "react";
import './Datatable.scss'
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { URL } from "../../const/url"
import { AuthContext } from '../../context/AuthContext';

const Datatable = ({ columns }) => {

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);

  const { data, loading, error } = useFetch(`${URL}/${path}`);

  console.log(data);


  useEffect(() => {
    setList(data);
  }, [data]);


  const handleDelete = async (id, Admin) => {
    if (Admin) {
      window.alert("Admin can't be deleted")
    } else {
      try {
        await axios.delete(`${URL}/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>

            {path === "rooms" ? ' ' :
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id, params.row?.isAdmin)}>
                Delete
              </div>
            }
          </div>
        );
      },
    },
  ];


  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.toUpperCase()}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? "Loading..." : (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}

        />
      )}
    </div>
  )
}

export default Datatable