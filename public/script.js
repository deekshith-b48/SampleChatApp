const socket = io(); // Connect to the Socket.IO server

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Function to add a message to the chat
function addMessage(message, isSent) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (isSent) {
    messageElement.classList.add('sent');
  } else {
    messageElement.classList.add('received');
  }
  messageElement.textContent = message;

  const timestampElement = document.createElement('div');
  timestampElement.classList.add('message-timestamp');
  timestampElement.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  messageElement.appendChild(timestampElement);

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}

// Send message on button click
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    socket.emit('chat message', message); // Send message to the server
    addMessage(message, true); // Add message to the UI (sent)
    messageInput.value = '';
  }
});

// Send message on Enter key press
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});

// Receive message from the server
socket.on('chat message', (msg) => {
  addMessage(msg, false); // Add message to the UI (received)
});