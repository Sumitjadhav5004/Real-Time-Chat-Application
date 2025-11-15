const http=require("http");
const express=require('express');
const path=require("path");
const app=express();
const {Server}=require("socket.io");
const { Socket } = require("dgram");
const server=http.createServer(app);

const io=new Server(server);

io.on("connection", (client) => {
  console.log("New client connected:", client.id);

  client.on("user-message", (message) => {
    const text = String(message || "").trim();
    if (!text) return;

    io.emit("message", text);
  });

  client.on("disconnect", (reason) => {
    console.log("Client disconnected:", client.id, "reason:", reason);
  });
});

app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
    return res.sendFile("/public/index.html");
});

server.listen(9000,()=>console.log(`Server started at port 9000`));




