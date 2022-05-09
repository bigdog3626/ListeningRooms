import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.location.pathname.split("/")[2];
    this.getRoomDetails();
    console.log("the room code is", this.roomCode);
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
  }
  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
  }

  render() {
    console.log(this.roomCode);
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Votes to Skip: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Guest Can Pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Is Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary">
            Leave Room
          </Button>
        </Grid>
      </Grid>

      // <div>
      //   <h3>{this.roomCode}</h3>
      //   <p>Votes: {this.state.votesToSkip}</p>
      //   <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
      //   <p>Host: {this.state.isHost.toString()} </p>
      // </div>
    );
  }
}
