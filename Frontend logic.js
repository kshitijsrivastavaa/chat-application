const chatBox = document.getElementById("chat-box");

// Fetch messages from the server every 2 seconds
setInterval(fetchMessages, 2000);

function fetchMessages() {
    fetch('/get_messages')
        .then(response => response.json())
        .then(messages => {
            chatBox.innerHTML = '';  // Clear current messages
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `${message.user}: ${message.message}`;
                chatBox.appendChild(messageElement);
            });
            chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the latest message
        });
}

function sendMessage() {
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;

    if (user === '' || message === '') {
        alert("Please enter your name and message.");
        return;
    }

    // Send the message to the server
    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('message').value = '';  // Clear the message input
    })
    .catch(error => {
        console.error("Error sending message:", error);
    });
}
