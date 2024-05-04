import { Button } from "@mui/base";
import {
  Card,
  CardAction,
  Typography,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import './JobCard.css';
import React from "react";

export default function JobCard() {
  return (
    <>
      <Grid className="cardCover">
        <Paper elevation={2} >
          <Card>
            <CardContent>
             
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </>
  );
}
