import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HandlerContext from "../context/handler.context";
import { TextField } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, courseId, setOpen }) {
  const { handleAddVideo } = React.useContext(HandlerContext);
  const handleClose = () => setOpen(false);

  const [obj, setObj] = React.useState({
    courseId: courseId,
    title: "",
    URL: "",
    format: "",
  });
  const handleChange = (e) => {
    setObj({
      ...obj,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose} 
        id="new-video-modal"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Edit your video parameters
          </Typography>
          <Typography
            textAlign="center"
            variant="subtitle2"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <TextField
            fullWidth
            value={obj.title}
            onChange={handleChange}
            name="title"
            label="Title"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            value={obj.format}
            onChange={handleChange}
            name="format"
            label="Format"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            value={obj.URL}
            onChange={handleChange}
            name="URL"
            label="URL"
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
            onClick={() => {
              handleAddVideo({ courseId, video: obj });
              handleClose();
            }}
          >
            Save the Video
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
