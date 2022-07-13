const socket = io("http://localhost:8000");

//get Dom elements in respective JS variable
const form = document.getElementById("send-form");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".message-box");
//tone which will fire on chat
let audio = new Audio('/resources/ting.mp3');

// Function which will append event info to the container
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position !== 'right')
       audio.play();

  
};

// Asking user for the name
const names = prompt("Enter your name to Join the Chat");
socket.emit("new-user-joined", names);


// IF a new user join recive the event 
socket.on("user-joined", (names) => {
  append(`<span>${names} joined the chat</span>`, "center");
});

//if server sends the me
socket.on("receive", (data) => {
  append(`${data.names}: ${data.message}`, "left");
});

socket.on("left", (names) => {
  append(`${names} left the char`, "center");
});


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});