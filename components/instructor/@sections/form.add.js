import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

export default function BasicModal({ handleAddcourse, open, data, setOpen }) {
  const handleClose = () => setOpen(false);
  const {FirstName , LastName , email , Bio } = data;
  const [obj, setObj] = React.useState({
    FirstName , 
    LastName , 
    email ,
    Bio
  });
  const keys = Object.keys(obj);
 console.log(obj)
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
              handleAddcourse(obj);
            }}
          >
            Save the edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
