import React, { useState, useEffect } from "react";
import Axios from "axios";

function PostUser() {
  const [value, setValue] = useState({
    lastname:"",
    fistname: "",
    email: "",
  });
  const handleValue = (e) => {
    let newdata = { ...value };
    newdata[e.target.id] = e.target.value;
    setValue(newdata);
  };

  const handlePost = (e) => {
    e.preventDefault();
    value.lastname == "" ||
    value.fistname == "" ||
    value.email == ""
      ? alert("Enter compelte information !!!")
      : Axios.post( "http://localhost:3001/api/user/", {
          lastname: value.lastname,
          fistname: value.fistname,
          email: value.email,
        })
          .then(
            setValue({
                lastname:"",
                fistname: "",
                email: "",
            })
          )
          .then(alert("Successful !!!"))
          .catch(function (error) {
            console.log(error);
          });
  };
  return (
    <>
      <div className="postMovie">
        <form onSubmit={(e) => handlePost(e)}>
          <label htmlFor="tenphim">lastname</label>
          <input
            id="lastname"
            onChange={(e) => handleValue(e)}
            type="text"
            value={value.lastname}
          />
          <label htmlFor="tenphim">fistname</label>
          <input
            id="fistname"
            onChange={(e) => handleValue(e)}
            type="text"
            value={value.fistname}
          />
          <label htmlFor="tenphim">email</label>
          <input
            id="email"
            onChange={(e) => handleValue(e)}
            type="text"
            value={value.email}
          />
          <button className="postMovie-btn">Add User</button>
        </form>
      </div>
    </>
  );
}

export default PostUser;