import React, { Component } from 'react';
import './App.css';
import Game from './components/Game'
import InitChat from './components/InitChat'
import Chat from './components/Chat'
import WebSocketInstance from './services/WebSocket'
import GameWebSocketInstance from './services/GameWebSocket'

import {ProgressBarContainer} from './components/ProgressBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      loggedIn: false
    };
  }

  handleLoginSubmit = (username) => {
    this.setState({ loggedIn: true, username: username });
    WebSocketInstance.connect();
    GameWebSocketInstance.connect();
  }

  render() {
    const { 
      loggedIn,
      username
    } = this.state;

    return (
      loggedIn ? 
      [<div className="Game">
          <Game />
      </div>,
      <div className="Chat">
        <Chat
          currentUser={"username"}
        />
      </div>]
      :
      <div className="App">
          <InitChat
            onSubmit={this.handleLoginSubmit}
            usernameChangeHandler={this.usernameChangeHandler}
          />
      </div>
    );
  }
}
