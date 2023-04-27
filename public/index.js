const inputs = document.querySelectorAll('.input');
const form = document.querySelector('#form');

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add('focus');
}

function validarMensaje(mensaje) {
  const patron =
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<.*>|javascript:/gi;
  return !patron.test(mensaje);
}

function validateEmail(email) {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateNombre(nombre) {
  let re = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  return re.test(nombre);
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == '') {
    parent.classList.remove('focus');
  }
}

inputs.forEach(input => {
  input.addEventListener('focus', focusFunc);
  input.addEventListener('blur', blurFunc);
});

form.addEventListener('submit', async e => {
  e.preventDefault();

  if (
    inputs[0].value === '' ||
    inputs[1].value === '' ||
    inputs[2].value === ''
  )
    return;

  if (
    !validateEmail(inputs[1].value) ||
    !validateNombre(inputs[0].value) ||
    !validarMensaje(inputs[2].value)
  )
    return;

  let postMessage = {
    name: inputs[0].value,
    email: inputs[1].value,
    message: inputs[2].value,
  };

  form.reset();

  const postFetch = await fetch('/send-email', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify(postMessage),
  });
  if (postFetch.status === 200) {
    sendedMail();
  }
});

function sendedMail() {
  Toastify({
    text: `Thanks you, I will get in touch with you soon!`,
    time: 1500,
    style: {
      background: 'var(--gradient)',
    },
  }).showToast();
}
