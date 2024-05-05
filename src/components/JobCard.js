import * as React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/system/Unstable_Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import '../styles/JobCard.css'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin: "20px auto",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    borderRadius: "8px",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function JobCards(props) {
  const classes = useStyles();
  const { jobDetails } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Box mt={2}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h3"
                sx={{ fontSize: 14 }}
                color="grey"
                letterSpacing={1}
              >
                WeekDay
              </Typography>
              <Typography variant="h5" component="div">
                {jobDetails.jobRole &&
                  jobDetails.jobRole
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }} color="black">
                {jobDetails.location &&
                  jobDetails.location
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {jobDetails.minJdSalary != null &&
                jobDetails.minJdSalary !== " " &&
                jobDetails.maxJdSalary != null &&
                jobDetails.maxJdSalary !== " " ? (
                  <>
                    Estimated Salary: ₹{jobDetails.minJdSalary} - ₹
                    {jobDetails.maxJdSalary} LPA <span style={{ color: 'darkgreen' }}>✅</span>
                  </>
                ) : (
                  <>
                    Estimated Salary:
                    {jobDetails.minJdSalary != null &&
                    jobDetails.minJdSalary !== " " ? (
                      <> ₹{jobDetails.minJdSalary} </>
                    ) : (
                      <> ₹{jobDetails.maxJdSalary} </>
                    )}
                    LPA <span style={{ color: 'darkgreen' }}>✅</span>
                  </>
                )}
              </Typography>
              <Typography variant="body1" color="black">
                About Company:
              </Typography>
              <Typography variant="body2">
                <strong>About us</strong>
                <br></br>
                {jobDetails.jobDetailsFromCompany}
              </Typography>
              <br></br>
              <Typography sx={{ fontWeight: 600, fontSize: 13 }} variant="subtitle1" color="gray" letterSpacing={1} >
                Minimum Experience
              </Typography>
                <Typography sx={{ fontSize: 14 }} variant="subtitle1" color="black">
                  {jobDetails.minExp != null ? `${jobDetails.minExp} Years` : "-"}
                </Typography>
              <Button className="custom-btn" variant="contained">
                ⚡ Easy Apply
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
