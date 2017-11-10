(function (doc) {
    var passwordInput = doc.getElementById("password-box"),
        timeDiv = doc.getElementById("password-time"),
        checksList = doc.getElementById("password-checks");
    var passwordplain;

    // Code to render the time returned by HSIMP
    var renderTime = function (time, input) {
        timeDiv.innerHTML = time || "";
    };

    // Code to output the checks returned by HSIMP
    var renderChecks = function (checks, input) {
        checksList.innerHTML = "";

        for (var i = 0, l = checks.length; i < l; i++) {
            var li = doc.createElement("li"),
                title = doc.createElement("h2"),
                message = doc.createElement("p");

            title.innerHTML = checks[i].name;
            li.appendChild(title);

            message.innerHTML = checks[i].message;
            li.appendChild(message);

            checksList.appendChild(li);
        }
    };

    // Setup the HSIMP object
    var attachTo = hsimp({
        options: {
            calculationsPerSecond: 10e9, // 10 billion calculations per second
            good: 31557600e9, // 1 billion years
            ok: 31557600e3 // 1 thousand years
        },
        outputTime: renderTime,
        outputChecks: renderChecks
    });

    // setup custom values for "instantly"/"forever"
    hsimp.setDictionary({
        "instantly": "Immediately",
        "forever": "Aaaaaaaaaaaaaaaages",
    });

    // Run the HSIMP
    attachTo(passwordInput);


}(this.document));


var passwordInput = document.getElementById("password-box")
var passwordplain = '';
var lastpasschecked = '';
window.setInterval(function(){
  passwordplain = passwordInput.value;
  if (lastpasschecked !== passwordplain) {

    if (passwordplain !== '') {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("iscompromised").innerHTML = '<span style="color: #ff0000;">Oh no! This password was found in a database of compromised passwords! If this is your password, you should change it immediately. Using a password that has been breached is extremely dangerous. <h4>If you are using this password on multiple websites, you should take the opportunity to start using different passwords for every website. Attackers can take the advantage of password reuse by automating login attempts on your account using breached emails and password pairs.</h4></span>';
        }else {
          if (this.status == 404) {
            document.getElementById("iscompromised").innerHTML = '<span style="color: #339966;">Good news, this password has never been breached!</span>';
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
    document.getElementById("iscompromised").innerHTML = '<span style="color: #ff9900;"><img src="img/loading.gif" alt="" width="25" height="25" />&nbsp;We are checking if your password has ever been compromised...</span>';
  }
}
