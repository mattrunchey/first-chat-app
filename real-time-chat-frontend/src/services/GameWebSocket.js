import config from '../config';

class GameWebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!GameWebSocketService.instance) {
        GameWebSocketService.instance = new GameWebSocketService();
    }
    return GameWebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    const path = config.GAME_API_PATH;
    console.log(path)
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('GameWebSocket open');
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("GameWebSocket closed let's reopen");
      this.connect();
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    console.log(command)
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'roll_result'){
        console.log(this.callbacks)
        console.log(this.callbacks[command])
      this.callbacks[command](parsedData.roll_value);
    }
  }

  roll() {
    this.sendMessage({ command: 'roll'});
  }

  addGameCallbacks(rollCallback) {
    console.log("Added callback")
    this.callbacks['roll_result'] = rollCallback;
  }
  
  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }  
  }

  state() {
    return this.socketRef.readyState;
  }

   waitForSocketConnection(callback){
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          console.log("Connection is made")
          if(callback != null){
            callback();
          }
          return;

        } else {
          console.log("wait for connection...")
          recursion(callback);
        }
      }, 1); // wait 5 milisecond for the connection...
  }

}

const GameWebSocketInstance = GameWebSocketService.getInstance();

export default GameWebSocketInstance;
