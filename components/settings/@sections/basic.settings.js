import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockIcon from "@mui/icons-material/Lock";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Typography } from "@mui/material";
const instructors = [
  {
    value: "name1",
    label: "name1",
  },
  {
    value: "name2",
    label: "name2",
  },
  {
    value: "name3",
    label: "name3",
  },
  {
    value: "name4",
    label: "name4",
  },
];

const headingStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const boxStyle = {
  // width: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "space-between"
};

const accessStyle = {
  margin: "1rem",
};

const divStyle = {
  marginTop: "2rem",
};

const formStyle = {
  marginLeft: "-0.5rem",
  marginTop: "2rem",
};

export default function FormPropsTextFields() {
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        // width: "70%",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center"
      }}
      noValidate
      autoComplete="off"
    >
      <div style={boxStyle}>
        <div>
          <div style={headingStyle}>
            <Typography variant="h4"> Basic Settings </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "12em", padding: 0, height: "3em" }}
            >
              Save
            </Button>
          </div>

          <div style={formStyle}>
            <TextField
              required
              id="outlined-required"
              label="Course Name"
              defaultValue="C"
            />
          </div>

          <div style={formStyle}>
            <TextField
              id="outlined-helperText"
              label="Course URL"
              defaultValue="C"
              helperText="https://courses.skillarena.in/courses/c"
            />

            <TextField
              id="outlined-select-currency"
              select
              label="Select Instructor"
              value={currency}
              onChange={handleChange}
              // helperText="Please select your currency"
            >
              {instructors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div style={divStyle}>
            <div>
              <h3> Access </h3>
            </div>
            <div>
              <LockIcon fontSize="small" />
              <span style={accessStyle}> Private Course </span>
              <InfoOutlinedIcon fontSize="small" />
            </div>
            <div>
              <LockIcon fontSize="small" />
              <span style={accessStyle}> Private Course </span>
              <InfoOutlinedIcon fontSize="small" />
            </div>
          </div>

          <div style={divStyle}>
            <h3> Security</h3>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Disable text copying"
            />
            <InfoOutlinedIcon fontSize="small" />
          </div>
        </div>
      </div>
    </Box>
  );
}
