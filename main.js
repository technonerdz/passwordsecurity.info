(function (doc) {
    var passwordInput = doc.getElementById("password-box"),
        timeDiv = doc.getElementById("password-time"),
        checksList = doc.getElementById("password-checks");

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
