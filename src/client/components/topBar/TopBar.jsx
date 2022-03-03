import { useState } from "react";
import "../../styles.css";
import "./topBar.css";
import logo from "../../images/logo.jpg";
import { makeStyles } from "@material-ui/core";
import { Cancel, Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  topNav: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuIcon: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginRight: theme.spacing(3),
    },
  },
  cancel: {
    color: "white",
    width: 30,
    float: "right",
  },
  topSideBar: {
    transition: "0.5s",
    position: "absolute",
    backgroundColor: "var(--dark)",
    height: "100vh",
    top: 0,
    right: 0,
  },
  topSideBarItems: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    listStyle: "none",
    marginLeft: 0,
  },
  topSideBarItem: {
    marginBottom: theme.spacing(2),
  },
}));
function TopBar() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className='top'>
      <div className='top-container'>
        <Link className='Link ' to='/'>
          <img className='top-logo' src={logo} alt='' />
        </Link>

        <div className={classes.topNav}>
          <ul>
            <Link className='Link' to='/'>
              <li>HOME</li>
            </Link>
            <Link className='Link' to='/about'>
              <li>ABOUT</li>
            </Link>
            <Link className='Link' to='/contact'>
              <li>CONTACT US</li>
            </Link>
          </ul>
        </div>
        <Menu
          className={classes.menuIcon}
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>
      {open && (
        <div className={classes.topSideBar}>
          <Cancel
            className={classes.cancel}
            onClick={() => {
              setOpen(false);
            }}
          />

          <ul className={classes.topSideBarItems}>
            <Link to='/' className='Link'>
              <li className={classes.topSideBarItem}>Home</li>
            </Link>
            <Link to='/about' className='Link'>
              <li className={classes.topSideBarItem}>About</li>
            </Link>
            <Link to='/contact' className='Link'>
              <li className={classes.topSideBarItem}>Contact Us</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TopBar;
