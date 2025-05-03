let typingInterval;

// Get or create a unique user ID
let userId = localStorage.getItem('user_id');
if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
}

async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatDisplay = document.getElementById('chatDisplay');
    const userMessage = inputField.value.trim();

    if (userMessage === '') return;

    appendMessage(userMessage, 'user');
    inputField.value = '';
    const loadingMessage = appendMessage('Typing', 'bot', true);
    startTypingAnimation(loadingMessage);

    try {
        const response = await fetch(`https://seleniumtest-xf3d.onrender.com/api?query=${encodeURIComponent(userMessage)}&user_id=${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        stopTypingAnimation();
        loadingMessage.remove();
        appendMessage(data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        stopTypingAnimation();
        loadingMessage.remove();
        appendMessage('Error: Kora could not respond at the moment. Please try again later.', 'bot');
    }

    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function appendMessage(messageText, sender, 
                       isLoading = false) {
    const chatDisplay = document.getElementById('chatDisplay');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', sender);

    if (sender === 'bot') {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('robot-profile');
        messageContainer.appendChild(profileDiv);
    }

    const message = document.createElement('div');
    message.classList.add('message');

    if (isLoading) {
        message.classList.add('loading');
    } else {
        // Use innerHTML only for bot messages, textContent for user messages
        if (sender === 'bot') {
            message.innerHTML = messageText;
        } else {
            message.textContent = messageText;
        }
    }

    messageContainer.appendChild(message);
    chatDisplay.appendChild(messageContainer);
    return messageContainer;
}

function startTypingAnimation(loadingMessage) {
    clearInterval(typingInterval);
    let dots = '';
    typingInterval = setInterval(() => {
        dots += '.';
        if (dots.length > 3) dots = '';
        loadingMessage.textContent = 'Typing' + dots;
    }, 500);
}

function stopTypingAnimation() {
    clearInterval(typingInterval);
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

document.getElementById('cover').addEventListener('click', function () {
    const outerMenu = document.getElementById('outer');
    outerMenu.classList.toggle('isOpen');
});
