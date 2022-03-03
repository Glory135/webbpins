import { Link } from "react-router-dom";
import "./sidebar.css";
// import img from "../../images/ceb3.jpg";

function Sidebar({ cats }) {
  return (
    <div className='sidebar'>
      {/* <div className='sidebar_item'>
        <span className='sidebar_title'>About Me</span>
        <img src={img} className='sidebar_img' alt='' />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque sed
          enim amet iste aliquam aut maiores dicta facilis molestias tempore.
        </p>
      </div> */}

      <div className='sidebar_item'>
        <span className='sidebar_title'>CATEGORIES</span>
        <ul className='sidebar_list'>
          {cats &&
            cats.map((cat) => {
              return (
                <Link key={cat._id} className='Link' to={`/?cat=${cat.name}`}>
                  <li key={cat._id} className='sidebar_list_item'>
                    {cat.name}
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>

      <div className='sidebar_item'>
        <span className='sidebar_title'>FOLLOW US</span>
        <div className='sidebar_social'>
          <i className='fab fa-facebook-square sidebar_icon'></i>
          <i className='fab fa-twitter-square sidebar_icon'></i>
          <i className='fab fa-pinterest-square sidebar_icon'></i>
          <i className='fab fa-whatsapp-square sidebar_icon'></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
