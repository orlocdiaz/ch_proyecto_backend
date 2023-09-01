const socket = io('/chat');

const messageLogs = document.getElementById('messageLogs');
const chatBox = document.getElementById('chatBox');
const sendChat = document.getElementById('sendChat');

let user;

socket.on('S-login', () => {
  Swal.fire({
    title: 'Log in',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Email">`,
    confirmButtonText: 'Enter',
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value;
      if (!login) {
        Swal.showValidationMessage(`Please enter your username!`);
      }
      return { login: login };
    },
  }).then((result) => {
    user = result.value.login.trim();
    Toastify({
      text: `Welcome ${result.value.login}`.trim(),
      duration: 2000,
      newWindow: true,
      close: false,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: false,
      style: {
        color: 'black',
        background: 'white',
      },
    }).showToast();
    socket.emit('C-loggedIn', user);
  });
});

socket.on('S-userConn', (user) => {
  Toastify({
    text: `${user} has joined the room!`.trim(),
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: 'bottom',
    position: 'right',
    stopOnFocus: true,
    style: {
      color: 'black',
      background: 'white',
    },
  }).showToast();
});

chatBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      socket.emit('C-message', { user, message: chatBox.value.trim() });
      chatBox.value = '';
    }
  }
});

sendChat.addEventListener('click', () => {
  if (chatBox.value.trim().length > 0) {
    socket.emit('C-message', { user, message: chatBox.value.trim() });
    chatBox.value = '';
  }
});

socket.on('S-messages', (data) => {
  let output = `<ul class="list-group" >`;
  if (data) {
    data.forEach((item) => {
      if (item.user === user) {
        output += `<li class="list-group-item" style="text-align: right;" > ${item.message} </li> `;
      } else {
        output += `<li class="list-group-item" >${item.user}: ${item.message}</li>`;
      }
    });
  }

  output += `</ul>`;
  document.getElementById('messageLogs').innerHTML = output;
});
