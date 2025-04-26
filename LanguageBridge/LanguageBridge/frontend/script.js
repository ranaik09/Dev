
async function sendMessage() {
    const driverID = document.getElementById('driverID').value;
    const customerLang = document.getElementById('customerLang').value;
    const driverLang = document.getElementById('driverLang').value;
    const message = document.getElementById('message').value;

    const res = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverID, customerMessage: message, customerLang, driverLang })
    });

    const data = await res.json();
    document.getElementById('status').innerText = `Message Sent: ${data.translatedMessage}`;
}