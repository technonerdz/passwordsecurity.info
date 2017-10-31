//Script to check for pwned passwords on your own website

//This is a Work in progress

var passwordInput = document.getElementById("passwordbox");
var passwordErrorText = document.getElementById("verifytext");
var passwordplain = '';
var lastpasschecked = '';
window.setInterval(function(){
  passwordplain = passwordInput.value;
  if (lastpasschecked !== passwordplain) {

    if (passwordplain !== '') {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          passwordErrorText.innerHTML = 'Oh no! This password was found in a database of compromised passwords. You should use another one';
        }else {
          if (this.status == 404) {
            passwordErrorText.innerHTML = 'This password has never been breached!';
          }
        }
      };
      xhttp.open('GET', 'https://haveibeenpwned.com/api/v2/pwnedpassword/' + encodeURIComponent(passwordplain));
      xhttp.send();
    }
    lastpasschecked = passwordplain;
  }

}, 6000);

function passwordmodified() {
  var modifiedpassword = passwordInput.value;
  if (modifiedpassword !== passwordplain) {
    passwordErrorText.innerHTML = 'We are checking if your password has ever been compromised...';
  }
}
