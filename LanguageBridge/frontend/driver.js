let driverID = '';

function startFetching() {
    driverID = document.getElementById('driverID').value;
    setInterval(fetchMessages, 3000);
}

async function fetchMessages() {
    if (!driverID) return;

    const res = await fetch(`http://localhost:5000/messages/${driverID}`);
    const data = await res.json();

    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '<h2>Received Messages</h2>';
    data.forEach(msg => {
        messagesDiv.innerHTML += `<div class='message'>${msg.translatedMessage} <br><small>${new Date(msg.timestamp).toLocaleString()}</small></div>`;
    });
}

