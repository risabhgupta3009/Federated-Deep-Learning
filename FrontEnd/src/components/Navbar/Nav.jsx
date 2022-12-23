import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <div>
      <div class="dropdown">
        <label className="dropbtn" for="checkbtn">
          <FontAwesomeIcon
            className="nav-icon"
            style={{ color: "#fff", fontSize: "14px" }}
            icon={faCaretDown}
          />
        </label>
        <div class="dropdown-content">
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <hr />
          <a href="#">Logout</a>
        </div>
      </div>
      <nav className="header">
        {/* <input className="menu-btn" type="checkbox" id="menu-btn" /> */}
        <label className="logo">Hospital WebSite</label>
        <ul className="menu">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon
                className="nav-icon"
                style={{ color: "#fff", fontSize: "20px" }}
                icon={faUserCircle}
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
