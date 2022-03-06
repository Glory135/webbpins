import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import Sidebar from "../../components/sideBar/Sidebar";
import "./categories.css";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Categories({ admin, isAdmin, setIsAdmin, token, setToken }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [cats, setCats] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [_id, set_id] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // getting cats start
    const getCats = async () => {
      const res = await axios.get(
        "https://webbpins.herokuapp.com/api/categories"
      );
      setCats(res.data.reverse());
    };
    getCats();
    // getting cats end

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCat = {
      id,
      name,
    };
    if (editMode) {
      try {
        await axios.put(
          `https://webbpins.herokuapp.com/api/categories/${_id}`,
          newCat,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setEditMode(false);
        setId(0);
        setName("");
        notifySuccess("Edited Successfully!!!");
      } catch (err) {
        notifyError("Error!!!");
        console.log(err);
      }
    } else {
      try {
        await axios.post(
          "https://webbpins.herokuapp.com/api/categories",
          newCat,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setId(0);
        setName("");
        notifySuccess("Added Successfully");
      } catch (err) {
        notifyError("Error!!!");
        console.log(err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://webbpins.herokuapp.com/api/categories/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      notifySuccess("Deleted Successfully!!!");
    } catch (err) {
      notifyError("Error!!!!");
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <div
              className='action_btn edit_btn'
              onClick={() => {
                setEditMode(true);
                set_id(params.row._id);
              }}
            >
              <EditOutlined className='action edit_icon' />
            </div>
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
    <div className='admin_cats'>
      <Sidebar />
      <div className='admin_cats_container'>
        <div className='admin_cat_form_container'>
          <div className='cat_header_container'>
            <h2>Add Category</h2>
          </div>
          <form className='admin_cat_form' onSubmit={handleSubmit}>
            <label>
              ID:{" "}
              <input
                type='number'
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                placeholder='Category id.....'
              />
            </label>
            <br />
            <label>
              Name:{" "}
              <input
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder='Category name.....'
              />
            </label>
            <br />
            <button type='submit' className='btn addBtn'>
              {editMode ? "Update" : "ADD"}
            </button>
          </form>
        </div>

        <div className='admin_cats_showcase'>
          <div className='cat_header_container'>
            <h2>All Categories</h2>
          </div>
          <div className='admin_cats_table_container'>
            <DataGrid rows={cats} columns={columns} pageSize={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
