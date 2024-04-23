import React from "react";
import "./navBar.css";

const NavBar = ({ handleSave }) => {
  return (
    <div className="navbar-root">
      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default NavBar;
