import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, styled } from "@mui/material";
import VideoEditModal from "../video.modal.edit";
import handlerContext from "../../../../context/handler.context";
import VideoAddModal from "../video.modal.add";
const StyledTableCell = styled(TableCell)({
  color: "white",
  fontSize: "1rem",
  textAlign: "center",
});
const VideoTable = ({ row, video }) => {
  const { handleDeleteVideo } = React.useContext(handlerContext);

  const [VideoModalBool, setVideoModalBool] = React.useState(false);

  return (
    <TableRow key={video._id}>
      <TableCell component="th" scope="row" align="center">
        {new Date(video.updatedAt).toLocaleDateString()}
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
      </TableCell>
      <TableCell align="center">
        <AiOutlineDelete
          size={24}
          onClick={() =>
            handleDeleteVideo({
              videoId: video._id,
              courseId: row._id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};
const Videos = ({ row }) => {
  const [AddVideoModalBool, setAddVideoModalBool] = React.useState(false);

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Videos
      </Typography>
      <Typography variant="body1" component="div">
        {row.description}
      </Typography>
      <Button
        variant="contained"
        size="small"
        sx={{ mb: 2 }}
        color="primary"
        onClick={() => setAddVideoModalBool(true)}
      >
        Add Video
      </Button>
      <VideoAddModal
        open={AddVideoModalBool}
        setOpen={setAddVideoModalBool}
        courseId={row._id}
      />
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
            <VideoTable key={video._id} video={video} row={row} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Videos;
