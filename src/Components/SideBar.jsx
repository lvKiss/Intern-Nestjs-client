import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  useEffect(() => {
    const menu = document.querySelectorAll(".sidebar-item");
    menu.forEach((item) => {
      item.addEventListener("click", (e) => {
        for (let i of menu) {
          i.classList.remove("active");
        }
        e.target.classList.add("active");
        handleDelete();
      });
    });
  });

  function handleDelete() {
    document.querySelector(".sidebar").classList.remove("visible");
    document
      .querySelector(".sidebar-overlay")
      .classList.remove("active-overlay");
  }

  return (
    <>
      <div className="sidebar">
          <div className="sidebar-items">
            <Link className="sidebar-item active" to="/">
              <Button
               style={{
                backgroundColor: "pink",
                color: "black",
                display: "block",
              }}
              >List Users</Button>
            </Link>
            <Link className="sidebar-item" to="/addUser">
            <Button
               style={{
                backgroundColor: "orange",
                color: "black",
                display: "block",
              }}
              >Add User</Button>
            </Link>
          </div>
        <div className="sidebar-bottom"></div>
      </div>
    </>
  );
}

export default Navbar;