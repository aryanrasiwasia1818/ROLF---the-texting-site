var stompClient = null;
var currentUserId = "user1"; // Replace with dynamic user ID
var selectedUserId = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/queue/reply', function (message) {
            console.log('Message received: ', message);
            onMessageReceived(message);
        });
    });
}

function sendMessage() {
    const messageContent = document.querySelector('#message').value;
    const receiverId = document.querySelector('#receiverId').value;
    if (messageContent && receiverId) {
        const chatMessage = {
            senderId: currentUserId,
            receiverId: receiverId,
            content: messageContent,
            timestamp: new Date().toISOString()
        };
        console.log('Sending message: ', chatMessage);
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
}

function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    console.log('Processing received message: ', message);
    if (message.receiverId === currentUserId || message.senderId === currentUserId) {
        displayMessage(message);
    }
}

function displayMessage(message) {
    const chatHistory = document.querySelector('#chatHistory');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.senderId}: ${message.content}`;
    chatHistory.appendChild(messageElement);
}

function loadUsers() {
    // Simulate loading users
    const users = ['user1', 'user2', 'user3'];
    const userList = document.querySelector('#userList');
    users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.textContent = user;
        userElement.addEventListener('click', () => {
            selectedUserId = user;
            document.querySelector('#receiverId').value = user;
            console.log('Selected user:', selectedUserId);
        });
        userList.appendChild(userElement);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#send').addEventListener('click', sendMessage);
    connect();
    loadUsers();
});
