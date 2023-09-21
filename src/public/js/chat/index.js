const socket = io();

let user = null;

function promptEmail() {
  return swal({
    text: 'Write your Email',
    content: {
      element: 'input',
      attributes: {
        placeholder: 'nombre@correo.com',
        type: 'email',
      },
    },
    button: {
      text: 'Iniciar Chat',
      closeModal: true,
    },
  });
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function startChat() {
  promptEmail().then((name) => {
    if (!name || !validateEmail(name)) {
      swal('Invalid email', 'Please enter a valid email', 'error').then(() => {
        startChat();
      });
    } else {
      user = name;
      const nameElement = document.getElementById('user-name');
      nameElement.innerHTML = `<b>User Connected:</b> ${user}`;
    }
  });
}
startChat();

let message = document.getElementById('Message');
let btnEnviar = document.getElementById('Send');
let chat_contenedor = document.getElementById('chat');

btnEnviar.addEventListener('click', sendMessage);

message.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    sendMessage();
  }
});
function sendMessage() {
  if (!user) {
    swal('Error', 'You must enter your email first', 'error');
    return;
  }
  if (!message.value.trim()) {
    swal('Error', 'The Message cant be empty', 'error');
    return;
  }
  const payload = {
    user: user,
    message: message.value,
  };
  socket.emit('Message', payload);

  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Message send to the MongoDB:', data);
      message.value = '';
    })
    .catch((error) => {
      console.error(error);
    });
}
readSockets();
function loadChat() {
  socket.on('init', (data) => {
    console.log('init', data);
    loadData(data);
  });
}
function readSockets() {
  loadChat();
  socket.on('NewMessage', (data) => {
    loadData(data);
  });
}
function loadData(data) {
  let innerHtml = '';
  data.forEach((msj) => {
    innerHtml += `<b>${msj.user}:</b> <span>${msj.message}</span><br>`;
  });
  chat_contenedor.innerHTML = innerHtml;
}
