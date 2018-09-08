var SerialPort = require('serialport');
var WebSocketServer = require('ws').Server;

var portName = "COM3";

var SERVER_PORT = 8081;                 // port number for the webSocket server
var wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
var connections = new Array;            // list of connections to the server

var myPort = new SerialPort(portName, 9600);
var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser

myPort.on('open', showPortOpen);
parser.on('data', readSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

function showPortOpen(err) {
   console.log('port open. Data rate: ' + myPort.baudRate);
   if (err) {
     console.log("error opening:" + err.message);
   }
}

function readSerialData(data) {
   console.log(data);
   if (connections.length > 0) {
    broadcast(data);
   }
}

function sendToSerial(data) {
  console.log("sending to serial: " + data);
  myPort.write(data, function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
  });
}

function showPortClose() {
   console.log('port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}

wss.on('connection', handleConnection);

function handleConnection(client) {
  console.log("New Connection");        // you have a new client
  connections.push(client);             // add this client to the connections array

  client.on('message', sendToSerial);      // when a client sends a message,

  client.on('close', function() {           // when a client closes its connection
    console.log("connection closed");       // print it out
    var position = connections.indexOf(client); // get the client's position in the array
    connections.splice(position, 1);        // and delete it from the array
  });
}
// This function broadcasts messages to all webSocket clients
function broadcast(data) {
  for (c in connections) {     // iterate over the array of connections
    connections[c].send(JSON.stringify(data)); // send the data to each connection
  }
}
