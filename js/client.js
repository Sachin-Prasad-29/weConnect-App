const socket = io("http://localhost:8000");

const form = document.getElementById("send-form");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".message-box");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

const names = prompt("Enter your name to Join the Chat");
socket.emit("new-user-joined", names);

socket.on("user-joined", (names) => {
  append(`${names} joined the chat`, 'center');
});


socket.on("receive", (data) => {
    append(`${data.message}: ${data.user}`, 'left');
  });