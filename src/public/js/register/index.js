document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    var firstName = document.getElementById('first_name').value;
    var lastName = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var age = document.getElementById('age').value;
    var password = document.getElementById('password').value;
    var payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      age: age,
      password: password,
    };
    fetch('/api/session/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        if (response.ok) {
          swal('Registered user', 'Log in with your Email and Password', 'success').then(function () {
            window.location.href = '/';
          });
        } else {
          response.json().then(function (data) {
            if (data.error && data.error === 'There is already a user with the same email') {
              swal('Error', 'There is already a user with the same email', 'error');
            } else {
              swal('Error', 'Failed to register user', 'error');
            }
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});
