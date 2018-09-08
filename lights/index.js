var text;     // variable for the text div you'll create
 var socket = new WebSocket("ws://localhost:8081");

 function openSocket() {
     text.html("Socket open");
     socket.send("Hello server");
   }

 function showData(result) {
     // when the server returns, show the result in the div:
     text.html("Sensor reading:" + result.data);
     xPos = int(result.data);        // convert result to an integer
     text.position(xPos, 10);        // position the text
   }
