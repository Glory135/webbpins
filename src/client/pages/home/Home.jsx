import { Search } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Templates from "../../components/templates/Templates";
import "./home.css";

function Home() {
  const [templates, setTemplates] = useState([]);
  const [cats, setCats] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { search } = useLocation();

  useEffect(() => {
    // getting all templates start
    const getTemp = async () => {
      const res = await axios.get(`https://webbpins.herokuapp.com/api/templates/${search}`);
      console.log(res);
      setTemplates(res.data);
    };
    getTemp();
    // getting all templates end

    // getting all cats start
    const getCats = async () => {
      const res = await axios.get("https://webbpins.herokuapp.com/api/categories");
      console.log(res);
      setCats(res.data);
    };
    getCats();
    // getting all cats end
  }, [search]);
  return (
    <div className='home'>
      <div className='home-showcase'>
        <div className='home-showcase-container'>
          <h2 className='home-showcase-text'>
            BUY AND EXPLORE GREAT WEBSITE TEMPLATES
          </h2>
          <div className='home-showcase-search'>
            <input
              type='text'
              className='search'
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              placeholder='search in all categories....'
            />
            <Link className='Link' to={`/?search=${searchInput}`}>
              <Search className='searchIcon' />
            </Link>
          </div>
        </div>
      </div>

      <div className='home-main'>
        <div className='home-templates'>
          <Templates templates={templates} />
        </div>
        <div className='home-sidebar'>
          <Sidebar cats={cats} />
        </div>
      </div>
    </div>
  );
}

export default Home;
