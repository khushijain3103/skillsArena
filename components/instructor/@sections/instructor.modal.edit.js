import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import HandlerContext from "../../../context/handler.context";
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

export default function BasicModal({ open, row, instructorID, setOpen }) {
  const handleClose = () => setOpen(false);
  const { handleUpdate } = React.useContext(HandlerContext);
  const [obj, setObj] = React.useState({
    FirstName:row.firstName,
    LastName:row.lastName,
    email:row.email,
    bio:row.bio,
  });
  const keys = Object.keys(obj);
  console.log("courseModal");
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Edit your Course parameters
          </Typography>
          <Typography
            textAlign="center"
            variant="subtitle2"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          {keys.map((item, key) => (
            <TextField
              key={key}
              fullWidth
              value={obj[item]}
              onChange={handleChange}
              name={item}
              label={item.toUpperCase()}
              sx={{ mb: 3 }}
            />
          ))}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
            onClick={() => {
              handleUpdate({ ...obj,instructorID });
              handleClose();
            }}
          >
            Save the edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
