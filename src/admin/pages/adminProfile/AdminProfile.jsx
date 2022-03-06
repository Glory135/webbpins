import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar/Sidebar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";
import "./adminProfile.css";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { toast } from "react-toastify";

function AdminProfile({ admin, isAdmin, setIsAdmin, token, setToken }) {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // getting all admins start
    const getAdmins = async () => {
      const res = await axios.get("https://webbpins.herokuapp.com/api/admin");
      setAdmins(res.data);
    };
    getAdmins();
    // getting all admins end

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://webbpins.herokuapp.com/api/admin/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      admin._id === id && navigate("/");
      notifySuccess("Deleted Successfully!!!");
    } catch (err) {
      notifyError("Error!!!");
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <div
              className='action_btn delete_btn'
              onClick={() => {
                handleDelete(params.row._id);
              }}
            >
              <DeleteOutline className='action delete_icon' />
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className='admin_profile'>
      <Sidebar />
      <div className='admin_profile_container'>
        <Link className='Link' to='/admin/register'>
          <button className='btn register_btn'>Register new</button>
        </Link>
        <div className='admin_profile_content'>
          <div className='admin_profile_header'>
            <h2>Admin Details</h2>
          </div>
          <h3> ID : {admin && admin.id}</h3>
          <h3>Name : {admin && admin.name}</h3>
          <h3>Email : {admin && admin.email}</h3>

          <div className='admin_profile_header'>
            <h2>All Admins</h2>
          </div>
          <div className='admin_cats_table_container'>
            <DataGrid rows={admins} columns={columns} pageSize={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
