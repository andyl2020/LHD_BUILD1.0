import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './styles/App.scss';
import { randomName, randomColor } from "./functions/demo";

import Chat from './components/Chatroom';
import Map from './components/Map';

import * as ROUTES from './constants/routes';


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey:             "api-key",
  authDomain:         "project-id.firebaseapp.com",
  databaseURL:        "https://project-id.firebaseio.com",
  projectId:          "project-id",
  storageBucket:      "project-id.appspot.com",
  messagingSenderId:  "sender-id",
  appId:              "app-id",
  measurementId:      "G-measurement-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor(),
      },
      members: []
    }

    this.drone = new window.Scaledrone("448LX1LCXbsGUhUI", {
      data: this.state.member
    });

    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });

    });

    room.on('members', (members) => {
      const member_list = [];
      for (const member in members) {
        if (member.clientData && member.clientData.username) {
          member_list.push(member.clientData.username);
        }
      }
      // console.log("New member! List:", member_list);
      this.setState({members: member_list});
    });

    room.on('member_join', (member) => {
      const member_list = this.state.members;
      if (member.clientData && member.clientData.username) {
        member_list.push(member.clientData.username);
      }
      // console.log("New member! List:", member_list);
      this.setState({members: member_list});
    });
  }

  render() {
    return (
      <Router>
        <Switch>

          <Route exact path={ROUTES.HOME}
            render = {() =>
              <Map messages   = {this.state.messages}
                   member     = {this.state.member}
                   numMembers = {this.state.members.length}/> }
          >
          </Route>

          <Route exact path={ROUTES.CHAT}
            render = {() =>
              <Chat messages      = {this.state.messages}
                    member        = {this.state.member}
                    members       = {this.state.members}
                    onSendMessage = {this.onSendMessage} /> }
          >
          </Route>

        </Switch>
      </Router>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });

    const ml = document.getElementById('messageList');
    ml.scrollTop = ml.scrollHeight;
  }

}

export default App;
