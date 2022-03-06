import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";
import Sidebar from "../../components/sideBar/Sidebar";
import "./dashboard.css";
import { toast } from "react-toastify";

function Dashboard({
  admin,
  isAdmin,
  setIsAdmin,
  token,
  setToken,
  setTemplate,
  setTemplateEditMode,
}) {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // getting all templates start
    const getTemp = async () => {
      const res = await axios.get(
        "https://webbpins.herokuapp.com/api/templates"
      );
      setTemplates(res.data.reverse());
    };
    getTemp();
    // getting all templates end

    // admin validation start
    const tok = JSON.parse(localStorage.getItem("webbpins_admin_token"));
    setToken(tok);
    if (tok) {
      const decoded_token = jwt_decode(tok);
      const current_time = new Date().getTime();
      if (decoded_token.exp * 1000 < current_time) {
        navigate("/");
      } else {
        if (admin) {
          const decodedTok = jwt.decode(tok);
          if (decodedTok.id === admin._id) {
            setIsAdmin(true);
          } else {
            navigate("/");
            setIsAdmin(false);
          }
        } else {
          navigate("/");
        }
      }
    } else {
      navigate("/");
    }
    // admin validation end
  }, [isAdmin, setIsAdmin, token, setToken, admin, navigate]);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleEdit = (data) => {
    setTemplate(data);
    setTemplateEditMode(true);
    navigate("/admin/create");
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/templates/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      notifySuccess("Deleted Successfully!!!");
    } catch (err) {
      notifyError("Error!!!");
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "category", headerName: "Category", width: 140 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "link", headerName: "Link", width: 110 },
    {
      field: "time",
      headerName: "Posted at",
      width: 130,
      renderCell: (params) => {
        return <>{new Date(params.row.createdAt).toDateString()}</>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <div
              onClick={() => handleEdit(params.row)}
              className='action_btn edit_btn'
            >
              <EditOutlined className='action edit_icon' />
            </div>
            <div
              onClick={() => handleDelete(params.row._id)}
              className='action_btn delete_btn'
            >
              <DeleteOutline className='action delete_icon' />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className='admin_dashboard'>
      <Sidebar />
      <div className='admin_dashboard_container'>
        <div className='admin_dashboard_table_container'>
          <DataGrid rows={templates} columns={columns} pageSize={10} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
