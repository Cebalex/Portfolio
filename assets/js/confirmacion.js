const form = document.querySelector('form');
const formMessage = document.createElement('div');
form.appendChild(formMessage);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        formMessage.textContent = "Mensaje enviado correctamente!";
        form.reset();
    } else {
        formMessage.textContent = "Hubo un error al enviar el mensaje.";
    }
});