import React, { Component } from 'react';
import './Game.scss';

import GameWebSocketInstance from '../../services/GameWebSocket'


import {ProgressBarContainer} from '../ProgressBar';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.waitForSocketConnection(() => {
      GameWebSocketInstance.connect();
      console.log("Adding Game callbacks")
      GameWebSocketInstance.addGameCallbacks(this.getRollResult.bind(this));
      //GameWebSocketInstance.fetchRoll(this.props.rollValue);
    });
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
      function () {
        // Check if GameWebSocket state is OPEN
        if (GameWebSocketInstance.state() === 1) {
          console.log("Connection is made")
          callback();
          return;
        } else {
          console.log("wait for connection...")
          component.waitForSocketConnection(callback);
        }
    }, 100); // wait 100 milisecond for the connection...
  }

  sendRollCommand() {
    GameWebSocketInstance.roll();
  }

  getRollResult(rv) {
    console.log("getting roll result: ", rv)
    this.setState({rollvalue: rv})
  }

  render() {
    const rollvalue = this.state.rollvalue;
    return (
      <div className='game'>
        <div className='game-text'>
          <h1>Playing THIS GAME </h1>
          <h3>Enjoy!</h3>
        </div>
        <div className="progress-bar-container">
          <ProgressBarContainer />
        </div>
        <div className='game-details'>
          <h3>{rollvalue}</h3>
          <button className='roll' type='roll' value='Roll' onClick={this.sendRollCommand}>
            Roll Those Dice!!
          </button>
        </div>
      </div>
    );
  }
}

/*

        <div className="progress-bar-container">
          <ProgressBarContainer />
        </div>
        */
