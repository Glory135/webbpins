import React from "react";
import Paginate from "../paginate/Paginate";
import "./templates.css";

function Templates({ templates }) {
  return (
    <div className='templates'>
      <Paginate templates={templates} />
    </div>
  );
}

export default Templates;
