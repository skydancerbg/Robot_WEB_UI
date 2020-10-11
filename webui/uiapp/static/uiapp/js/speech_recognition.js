$("#mic_click_span").on('click', startSpeechRecognition);

function startSpeechRecognition() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        console.log("in the speech recognition")
        var recognition = new webkitSpeechRecognition();
        // $("#mic_span_div")[0].innerHTML = '<span class="input-group-addon btn btn-lg btn-success btn-circle" ><i class="fas fa-microphone-alt fa-2x"></i></span>';
        // $("#mic_span_div")[0].innerHTML = '<i class="fas fa-microphone-alt fa-2x"></i>';
        $("#mic_span")[0].innerHTML = '<span class="input-group-addon btn btn-lg btn-success btn-circle" ><i class="fas fa-microphone-alt fa-2x"></i></span>';
        $("#mic_click_span").off('click');
        recognition.continuous = false;
        recognition.interimResults = false;
        // recognition.lang = "en-EN";
        recognition.lang = "bg-BG";
        recognition.start();
        document.getElementById('transcript').value = "Speak now!";
        recognition.onresult = function (e) {
            var recognized_string;
            recognized_string = e.results[0][0].transcript;
            console.log(e.results[0][0].transcript);
            console.log('recognized string is: ' + recognized_string);
            document.getElementById('transcript').value = ("Recognized:  " + recognized_string);
            // document.getElementById('transcript').value = e.results[0][0].transcript;
            // speechStringVar = recognized_text;
            recognition.stop();
            // $("#mic_span_div")[0].innerHTML = '<span class="input-group-addon btn btn-lg btn-outline-secondary btn-circle onclick="startSpeechRecognition();"><i class="fas fa-microphone-alt-slash fa-2x"></i></span>';
            // $("#mic_span_div")[0].innerHTML = '<i class="fas fa-microphone-alt-slash fa-2x">';
            $("#mic_span")[0].innerHTML = '<span class="input-group-addon btn btn-lg btn-outline-secondary btn-circle "><i class="fas fa-microphone-alt-slash fa-2x"></i></span>';
            $("#mic_click_span").on('click', startSpeechRecognition);
            // checkCommand(speechStringVar);
        };
        recognition.onerror = function (e) {
            console.log("speech recognition error!")
            document.getElementById('transcript').value = "Error, please try again";
            $("#mic_span")[0].innerHTML = '<span class="input-group-addon btn btn-lg btn-outline-secondary btn-circle "><i class="fas fa-microphone-alt-slash fa-2x"></i></span>';
            $("#mic_click_span").on('click', startSpeechRecognition);
            recognition.stop();
        };
    }
}


function checkCommand(str) {
    if (str.includes("ръката") && str.includes("напред")) {
        armvar = [0.0, 50.0, -50.0, 0.0, 0.0, 0.0];
        sendArmCommand(armvar);
    } else if (str.includes("ръката") && str.includes("назад")) {
        armvar = [0.0, -50.0, 50.0, 0.0, 0.0, 0.0];
        sendArmCommand(armvar);
    } else if (str.includes("ръката") && str.includes("наляво")) {
        armvar = [50.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        sendArmCommand(armvar);
    } else if (str.includes("ръката") && str.includes("надясно")) {
        armvar = [-50.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        sendArmCommand(armvar);
    } else if (str.includes("ръката нагоре")) {
        armvar = [0.0, 0.0, -50.0, 50.0, 0.0, 0.0];
        sendArmCommand(armvar);
    } else if (str.includes("ръката надолу")) {
        armvar = [0.0, 0.0, 50.0, -50.0, 0.0, 0.0];
        sendArmCommand(armvar);
    } else if (str.includes("робот") && str.includes("напред")) {
        sendButtonCommand(0.4, 0);
    } else if (str.includes("робот") && str.includes("назад")) {
        sendButtonCommand(-0.4, 0);
    } else if (str.includes("робот") && str.includes("наляво")) {
        sendButtonCommand(0, 0.6);
    } else if (str.includes("робот") && str.includes("надясно")) {
        sendButtonCommand(0, -0.6);
    } else if (str.includes("включване на ръката")) {
        sendCommand("Connect");
    } else if (str.includes("рестартиране на ръката")) {
        sendCommand("Reset");
    } else if (str.includes("пускане на ръката")) {
        sendCommand("Enable");
    } else if (str.includes("хвани")) {
        sendCommand("GripperClose");
    } else if (str.includes("пусни")) {
        sendCommand("GripperOpen");
    }
}

