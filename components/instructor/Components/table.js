import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { styled } from "@mui/material";
import InstructorModal from "../@sections/instructor.modal.edit";
import handlerContext from "../../../context/handler.context";


const StyledTableCell = styled(TableCell)({
  color: "white",
  fontSize: "1rem",
  textAlign: "center",
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
 
  const {
    data,
    handleDelete,
    handleUpdate,
  } = React.useContext(handlerContext);

  const [InstructorModalBool, setInstructorModalBool] = React.useState(false);

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
        {/* <TableCell component="th" scope="row">
          {row.title}
        </TableCell> */}

        <TableCell align="center">{row.firstName}</TableCell>
        <TableCell align="center">{row.lastName}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.bio}</TableCell>
        <TableCell align="center">
          <AiFillEdit size={24} onClick={() => setInstructorModalBool(true)} />
          <InstructorModal
            open={InstructorModalBool}
            row={row}
            setOpen={setInstructorModalBool}
            instructorId={row._id}
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
        {/* <TableCell style={{ paddingBottom: 4, paddingTop: 4 }} colSpan={12}> */}
          {/* <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Videos
              </Typography>
              <Typography variant="body1" component="div">
                {row.description}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "black" }}>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>URL</StyledTableCell>
                    <StyledTableCell align="right">Format</StyledTableCell>
                    <StyledTableCell align="right">Edit</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.videos.map((video) => (
                    <TableRow key={video._id}>
                      <TableCell component="th" scope="row" align="center">
                        {video.updatedAt}
                      </TableCell>
                      <TableCell align="center">{video.title}</TableCell>
                      <TableCell align="center">{video.URL}</TableCell>
                      <TableCell align="center">{video.format}</TableCell>
                      <TableCell align="center">
                        <VideoEditModal
                          open={VideoModalBool}
                          videoRow={video}
                          setOpen={setVideoModalBool}
                          courseId={row._id}
                        />
                        <AiFillEdit
                          size={24}
                          onClick={() => setVideoModalBool(true)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <AiOutlineDelete size={24} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse> */}
        {/* </TableCell> */}
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  data,
  handleDelete,
  handleUpdate,
}) {
  // create context

  return (
    <handlerContext.Provider
      value={{
        data,
        handleDelete,
        handleUpdate,
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell />
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">firstName</StyledTableCell>
              <StyledTableCell align="right">lastname</StyledTableCell>
              <StyledTableCell align="right">e-mail</StyledTableCell>
              <StyledTableCell align="right">bio</StyledTableCell>
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
