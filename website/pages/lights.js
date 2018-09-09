import Button from '@material-ui/core/Button';
import React from 'react';
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
const http = require("http");
var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new W3CWebSocket('wss://75.102.137.174:8081/', 'echo-protocol');
var connected = false;

setInterval(function() {
    http.get("http://alec-website.herokuapp.com");
}, 300000);

client.onerror = function() {
    console.log('Connection Error');
    connected = false;
};

client.onopen = function() {
    console.log('WebSocket Client Connected');
    connected = true;

};

client.onclose = function() {
    console.log('Client Closed');
    connected = false;
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
    }
};

function sendNumber(data) {
    if (connected) {
        console.log("func works");
        if (client.readyState === client.OPEN) {
            console.log("sending " + data);
            client.send(data);
        }
    }
}

const Lights = () => (

    <div>
      <Head>
        <title>Light Controls</title>
        <meta name="viewport"
              content="user-scalable=0, initial-scale=1, minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
        <React.Fragment>
          <CssBaseline />
          {
            <div>
            <style jsx>{`
              Button {
                cursor: 'pointer';
              }
              `}</style>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("0"); }}>
            off
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("1"); }}>
            one
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("2"); }}>
            two
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("3"); }}>
            three
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("4"); }}>
            four
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("5"); }}>
            white
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("6"); }}>
            blue
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("7"); }}>
            red
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("8"); }}>
            green
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("9"); }}>
            purple
            </Button>
            <Button variant="contained" color="primary" onClick={() => {sendNumber("10"); }}>
            pink
            </Button>
            </div>
          }
        </React.Fragment>
    </div>

)

export default Lights
