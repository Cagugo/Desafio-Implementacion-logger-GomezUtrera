function mostrarSweetAlert() {
  swal('***purchase made***', 'Check your email box for more details..', 'success').then(function () {
    window.location.href = '/products';
  });
}
document.querySelector('form[action$="/purchasecart"]').addEventListener('submit', function (event) {
  event.preventDefault();
  fetch(this.action, {
    method: 'POST',
    body: new FormData(this),
  })
    .then((response) => {
      if (response.ok) {
        mostrarSweetAlert();
      } else {
        swal('Error', 'There was a problem making the purchase. Try it again later.', 'error');
      }
    })
    .catch((error) => {
      swal('Error', 'There was a problem making the purchase. Try it again later', 'error');
    });
});
