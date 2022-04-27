import React, { useState } from "react";
import "./singleTemplate.css";
import "../../styles.css";
import PayForm from "../payForm/PayForm";
import fileDownload from "js-file-download";
import axios from "axios";
import { toast } from "react-toastify";

function SingleTemplate({ temp }) {
  const [payFormOpen, setPayFormOpen] = useState(false);

  const notifyError = () => {
    toast.error("ERROR!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const onDownload = () => {
    axios({
      url: "/download",
      method: "POST",
      responseType: "blob",
      data: { url: temp.template_file },
    })
      .then((result) => {
        fileDownload(result.data, temp.name + ".zip");
      })
      .catch((err) => {
        notifyError();
      });
  };

  return (
    <>
      <PayForm
        price={temp.price}
        payFormOpen={payFormOpen}
        setPayFormOpen={setPayFormOpen}
        onDownload={onDownload}
      />
      <div className='single'>
        <div className='single_img_container'>
          <div className='single_browser'>
            <div
              style={{ backgroundColor: "red" }}
              className='single_circle'
            ></div>
            <div
              style={{ backgroundColor: "green" }}
              className='single_circle'
            ></div>
            <div
              style={{ backgroundColor: "yellow" }}
              className='single_circle'
            ></div>
          </div>
          <img src={temp.image} className='single_img' alt='' />
        </div>

        <div className='single-down'>
          <div className='single_detail'>
            <p className='single_detail_cat'>{temp.category}</p>
            <p className='single_detail_t'>
              {new Date(temp.createdAt).toDateString()}
            </p>
            <p className='single_detail_price'>NGN {temp.price}</p>
          </div>
          <div className='single_desc'>
            <h2>{temp.name}</h2>
          </div>
          <div className='single_btn_container'>
            <div
              className='btn single_btn_get'
              onClick={() => {
                setPayFormOpen(true);
              }}
            >
              GET
            </div>
            <a href={temp.link}>
              <div className='btn single_btn_pre'>LIVE PREVIEW</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleTemplate;
