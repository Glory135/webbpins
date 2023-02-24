import { useEffect, useState } from "react";
import { Add, Image, ArrowForward } from "@material-ui/icons";
import Sidebar from "../../components/sideBar/Sidebar";
import "../../adminStyles.css";
import "./create.css";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Create({
  admin,
  isAdmin,
  setIsAdmin,
  token,
  setToken,
  template,
  templateEditMode,
  setTemplateEditMode,
}) {
  const [name, setName] = useState(templateEditMode ? template.name : "");
  const [price, setPrice] = useState(templateEditMode ? template.price : 0);
  const [link, setLink] = useState(templateEditMode ? template.link : "");
  const [cat, setCat] = useState(templateEditMode ? template.category : "");
  const [file, setFile] = useState(templateEditMode ? template.image : "");
  const [tempFile, setTempFile] = useState(
    templateEditMode ? template.template_file : ""
  );

  const [catOptions, setCatOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // getting cats for thr select field
    const getCats = async () => {
      const res = await axios.get(
        "https://webpins.onrender.com/api/categories"
      );
      setCatOptions(res.data);
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

    const newTemplate = {
      name,
      price,
      link,
      category: cat,
      image: file,
      template_file: tempFile,
    };

    if (templateEditMode) {
      try {
        await axios.put(
          `https://webpins.onrender.com/api/templates/${template._id}`,
          newTemplate,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setTemplateEditMode(false);
        notifySuccess("Updated Successfully!!");
        navigate("/admin/dashboard");
      } catch (err) {
        notifyError("Update Error!!!");
        console.log(err);
      }
    } else {
      try {
        await axios.post(
          "https://webpins.onrender.com/api/templates/create",
          newTemplate,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        notifySuccess("Created Successfully!!!");
        navigate("/admin/dashboard");
      } catch (err) {
        notifyError("Error!!!");
        console.log(err);
      }
    }
  };

  const previewPic = (file, set) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      set(reader.result);
    };
  };

  return (
    <div className='admin_create'>
      <Sidebar />
      <div className='admin_create_container'>
        <div className='admin_create_form_label'>
          <h2>{templateEditMode ? "Edit Template" : "Post Template"}</h2>
        </div>
        <div className='admin_create_form_container'>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                className='admin_create_input name_input'
                type='text'
                required
                placeholder='Template Name.......'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              Price:{" "}
              <input
                className='admin_create_input number_input'
                type='number'
                required
                placeholder='Template Price.......'
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </label>
            <label>
              Link:{" "}
              <input
                className='admin_create_input link_input'
                type='text'
                required
                placeholder='Template Link.......'
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
            </label>
            <label>
              Category:
              <select
                className='admin_create_input cat_input'
                required
                name='category'
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              >
                <option>------Select a category------</option>
                {catOptions.map((eachCat) => {
                  return (
                    <option key={eachCat._id} value={eachCat.name}>
                      {eachCat.name}
                    </option>
                  );
                })}
              </select>
            </label>

            <label htmlFor='img_upload' className='image_input_container'>
              <Image className='img_addIcon' />
              <p>Add Template Home Page Image </p>
              <input
                type='file'
                required
                name='img_upload'
                id='img_upload'
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  previewPic(file, setFile);
                }}
              />
            </label>
            <label htmlFor='temp_file_upload' className='image_input_container'>
              <span className='addIconContainer'>
                <Add className='addIcon' />
              </span>
              <p>{"Add Template zip file"} </p>
              <input
                type='file'
                // required
                name='temp_file_upload'
                id='temp_file_upload'
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  previewPic(file, setTempFile);
                }}
              />
            </label>

            <button className='btn post_btn'>
              {templateEditMode ? "Update" : "Post"}
              <ArrowForward className='arrow' />{" "}
            </button>
          </form>

          {file && (
            <div className='admin_create_img_container'>
              <img src={file} className='admin_create_img' alt='' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Create;
