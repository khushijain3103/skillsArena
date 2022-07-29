import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { FaLock } from "react-icons/fa";
const Settings = () => {
  return (
    <React.Fragment>
      <Grid container columns={12} spacing={3} rowSpacing={2    }>
        <Grid item lg={10}>
          <Typography variant="h4">Pricing Settings</Typography>
          <Typography variant="body1" sx={{ mt: 3 }}>
            Set the initial Pricing that will be displayed for the course
            Landing Page
          </Typography>
        </Grid>
        <Grid item lg={2}>
          <Button variant="contained" color="primary" sx={{ width: "12em" }}>
            Save
          </Button>
        </Grid>
        <Grid item lg={8}>
          <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
            Primary Pricing
          </Typography>
          <RadioGroup aria-labelledby="demo-error-radios" name="pricing">
            <FormControlLabel value="free" control={<Radio />} label="Free" />
            <FormHelperText>
              Offer free content to your subscribers. Optionally, you can set an
              enrollment duration that will |limit the time students have access
              to your content.
            </FormHelperText>
            <FormControlLabel
              value="once"
              control={<Radio />}
              label="One Time Payment"
            />
            <FormHelperText>
              Charge students a one-time fee to access the content. Optionally,
              you can set an enrollment duration that will limit the time
              students have access to your content.
            </FormHelperText>
          </RadioGroup>
        </Grid>
        <Grid item lg={8}>
          <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
            Subscription Pricing
          </Typography>
          <RadioGroup aria-labelledby="demo-error-radios" name="pricing">
            <FormControlLabel
              value="free"
              control={<FaLock style={{ marginRight: 10 }} />}
              label="Subscrpition/Membership"
            />
            <FormHelperText>
              Charge students recurring monthly fees for access to course
              content. Great for membership Sites!
            </FormHelperText>
          </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Settings;
