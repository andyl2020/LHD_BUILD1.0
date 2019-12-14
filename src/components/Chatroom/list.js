import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import { ListItemText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

export class ListOfUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [
          { name: 'derek' },
          { name: 'josh' },
          { name: 'andy' },
          { name: 'clarence' },
          { name: 'matthew' }
      ],
      users2: ['HELLO', 'HI', 'GOODBYE']
    }
  }
  render() {
    // console.log(this.props.members);

    return (
      <React.Fragment>
        <Paper>
        <Grid container>
          <Grid item xs = {12}>
            <Typography component = "h1"
                        variant   = "h4"
                        align     = "center"
            >Users in this chat</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component = "h4"
                        variant   = "h6"
            ># of users: {this.props.members.length}</Typography>
          </Grid>
        </Grid>
        </Paper>
        <Paper>
          <List>
          {this.props.members.map((user) => (
            <Grid container>
            <Grid item xs={11}>
              <ListItem>
                <ListItemText>{user}</ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
              </svg>
            </Grid>
            </Grid>
          ))}
          </List>
        </Paper>
      </React.Fragment>
    );
  }
}

export default ListOfUsers;
