import Axios from "axios";
import React, { useState, useEffect} from "react";
import TableContainer from '@mui/material/TableContainer';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent, DialogTitle } from "@mui/material";

function GetUser() {
  const [reload, setReload] = useState();
  const [value, setValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    id: '',
    lastname: '',
    fistname:'',
    email: '',
    createAt: '',
    updateAt: '',
  });
  const [dialog, setDialog] = useState({
    id: '',
    lastname: '',
    fistname:'',
    email: '',
    createAt: '',
    updateAt: '',
  });
  useEffect( () => {
    fetch("http://localhost:3001/api/user/") 
    .then((response) => response.json())
    .then(async(data) =>  await setValue(data));
  }, [reload]);
  const handlePut = (e, id) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/api/user/" + `${id}`, {
      lastname: data.lastname,
      fistname: data.fistname,
      email: data.email
    })
      .then(setOpen(false))
      .then(() => setReload(Math.random()));
  };

  const handleDelete = (e, item) => {
    e.preventDefault();
    if (window.confirm(`Are you sure want to delete ?`)) {
      Axios.delete("http://localhost:3001/api/user/"+`${item.id}`).then(() =>
        setReload(Math.random())
      );
    }
  };

const handleClickOpen = (item) => {
  setOpen(true);
  setDialog(item);
  setData({
    lastname: item.lastname,
    fistname: item.fistname,
    email: item.email,
  });
};
const handleClose = () => {
  setOpen(false);
};

const handlePutChange = (e) => {
  let newdata = { ...data };
  newdata[e.target.id] = e.target.value;
  if(newdata.email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)){
    setData(newdata);
  }else{
    alert("email not right!");
  }
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
  return (
    <div >
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1280 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">lastname</StyledTableCell>
              <StyledTableCell align="center">fistname</StyledTableCell>
              <StyledTableCell align="center">email</StyledTableCell>
              <StyledTableCell align="center">createAt</StyledTableCell>
              <StyledTableCell align="center">updateAt</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "#dfdfdf" }}>
            {value
            .map((item, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.lastname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.fistname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.createAt}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.updateAt}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          display: "block",
                        }}
                        variant="outlined"
                       onClick={() => handleClickOpen(item, i)}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginTop: "8px",
                        }}
                        variant="outlined"
                        onClick={(e) => handleDelete(e, item)}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
      
      <Dialog open={open} onClose={handleClose}>s
        <DialogTitle style={{ color: "red", textTransform: "uppercase" }}>
          UPDATE
        </DialogTitle>
        <DialogContent>
          <label>Last name</label>
          <TextField
            fullWidth
            variant="filled"
            id="lastname"
            onBlur={(e) => handlePutChange(e)}
            defaultValue={dialog.lastname}
          ></TextField>
          <label>Fist name</label>
          <TextField
            fullWidth
            variant="filled"
            id="fistname"
            onBlur={(e) => handlePutChange(e)}
            defaultValue={dialog.fistname}
          ></TextField>
          <label>email</label>
          <TextField
            fullWidth
            variant="filled"
            id="email"
            onBlur={(e) => handlePutChange(e)}
            defaultValue={dialog.email}
          ></TextField>
        </DialogContent>  
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handlePut(e, dialog.id)} >Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default GetUser;
