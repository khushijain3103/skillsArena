import React from "react";
import { Typography, Box, Button, Stack, TextField } from "@mui/material";
import Image from "next/image";
import UPLOAD from "../../../public/assets/upload.jpg";
const Settings = () => {
  const [image, setImage] = React.useState(UPLOAD);
  const [save, setSave] = React.useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // 0th index file is the image
    /*
     upload to cloudinary

    */
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
      setSave(true);
    };
  };
  const inputRef = React.useRef();

  return (
    <React.Fragment>
      <Typography variant="h4">Course Settings</Typography>
      <Box sx={{ width: "100%", minHeight: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Typography variant="h5">Course Image and Description</Typography>
          <Button variant="contained" sx={{ width: "10em" }}>
            Save
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "40vh",
            mt: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: 18 }}
            >
              Course Image
            </Typography>
            <Typography variant="caption">
              Suggested image size: 500x500
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={image}
              width={350}
              height={200}
              alt="upload Image"
              objectFit="contain"
              objectPosition={"center"}
            />
            <Button
              variant="contained"
              sx={{ width: "20em" }}
              onClick={() => {
                // inputRef.current.click();
                inputRef.current.click();
              }}
            >
              <input
                type="file"
                hidden={true}
                onChange={handleImageUpload}
                ref={inputRef}
              />
              Upload course image
            </Button>

            <Button
              variant="contained"
              disabled={!save}
              sx={{ width: "20em", mt: 3 }}
            >
              Save course Image
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "40vh", mt: 10 }}>
          <Stack>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: 18 }}
            >
              Course Description
            </Typography>
            <Typography variant="caption">
              Insert a description for the course, keep it short and simple. Max
              length: 200 characters
            </Typography>
          </Stack>
          <TextField
            aria-label="empty textarea"
            placeholder="Course Description"
            sx={{ width: "100%", mt: 3 }}
            label={"Description"}
            minRows={8}
            multiline
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Settings;
