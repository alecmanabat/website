var SerialPort = require('serialport');
var request = require('request');

var portName = "COM3";

var myPort = new SerialPort(portName, 9600, function (err) {
  if (err) {
    console.log("error: " + err.message);
  }
});


var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser

myPort.on('open', showPortOpen);
parser.on('data', readSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

process.on( 'SIGINT', function() {
  console.log( "\ngracefully shutting down from  SIGINT (Crtl-C)" )
  // send off signal to arduino
  process.exit( )
})

function showPortOpen(err) {
   console.log('port open. Data rate: ' + myPort.baudRate);
   if (err) {
     console.log("error opening:" + err.message);
   }
}

function readSerialData(data) {
   console.log(data);

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

function getOption() {
  /*

request.get('http://www.whatever.com/my.csv', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var csv = body;
        // Continue with your processing here.
    }
});
  //put the option in a file or put it on a separate page
  */
}

setInterval(getOption, 100);
