import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { styled } from "@mui/material";
import CourseModal from "./course.modal.edit";
import handlerContext from "../../../context/handler.context";

import Videos from "./videos";
const StyledTableCell = styled(TableCell)({
  color: "white",
  fontSize: "1rem",
  textAlign: "center",
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const { handleDelete } = React.useContext(handlerContext);
  const [CourseModalBool, setCourseModalBool] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row._id}</TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="center">{row.url}</TableCell>
        <TableCell align="center">{row.stars}</TableCell>
        <TableCell align="center">{row.cost}</TableCell>
        <TableCell align="center">{row.instructor}</TableCell>
        <TableCell align="center">{row.videos.length}</TableCell>
        <TableCell align="center">
          <AiFillEdit size={24} onClick={() => setCourseModalBool(true)} />
          <CourseModal
            open={CourseModalBool}
            row={row}
            setOpen={setCourseModalBool}
            courseId={row._id}
          />
        </TableCell>
        <TableCell align="center">
          <AiOutlineDelete
            size={24}
            onClick={() => {
              handleDelete(row._id);
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 4, paddingTop: 4 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Videos row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  data,
  handleDelete,
  handleUpdate,
  handleUpdateVideo,
  handleDeleteVideo,
  handleAddVideo,
}) {
  // create context

  return (
    <handlerContext.Provider
      value={{
        data,
        handleDelete,
        handleUpdate,
        handleUpdateVideo,
        handleDeleteVideo,
        handleAddVideo,
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell />
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">url</StyledTableCell>
              <StyledTableCell align="right">stars</StyledTableCell>
              <StyledTableCell align="right">cost</StyledTableCell>
              <StyledTableCell align="right">Instructor</StyledTableCell>
              <StyledTableCell align="right">Videos</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row._id} row={row} handleDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </handlerContext.Provider>
  );
}
