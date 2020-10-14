var cmdVel = new ROSLIB.Topic({
  ros: ros,
  name: "/archie/cmd_vel",
  // name: '/cmd_vel',
  // name: '/servicebot/cmd_vel',
  // name: '/cmd_vel_mux/input/teleop',
  messageType: "geometry_msgs/Twist",
});

function executeSpeechMovementCommand(dx, dz) {
  var twist = new ROSLIB.Message({
    linear: {
      x: dx,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: dz,
    },
  });
  console.log("before publish twist");
  cmdVel.publish(twist);
  console.log("after publish twist");

  setTimeout(function () {
    var twist = new ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });
    console.log("before publish stop twist");
    cmdVel.publish(twist);
    console.log("after publish stop twist");
  }, 2000); // duration of movement
}

$(document).ready(function ($) {
  // Enable F4 to be used as keyboard Speech recognition activation button
  $("body").on("keydown", function (e) {
    // F4 key is available to use for turning on the
    // microphone for voice recognition in Google chrome browser
    // When F4 is pressed, the event.key is F4 event.code is F4
    // event.which is 114 event.location is 0  (general keys)
    // Keydown or Keyup events should be used.
    // The Keypress event will not react on special keys...
    if (e.key == "F4") {
      // Send click event to the mic icon in the topbar
      $("#mic_click_span").trigger("click");
    }
  });
});

$("#mic_click_span").on("click", startSpeechRecognition);

function startSpeechRecognition() {
  if (window.hasOwnProperty("webkitSpeechRecognition")) {
    // console.log("in the speech recognition");
    var recognition = new webkitSpeechRecognition();
    // $("#mic_span_div")[0].innerHTML = '<span class="input-group-addon btn btn-lg btn-success btn-circle" ><i class="fas fa-microphone-alt fa-2x"></i></span>';
    // $("#mic_span_div")[0].innerHTML = '<i class="fas fa-microphone-alt fa-2x"></i>';
    $("#mic_span")[0].innerHTML =
      '<span class="input-group-addon btn btn-lg btn-success btn-circle" ><i class="fas fa-microphone-alt fa-2x"></i></span>';
    $("#mic_click_span").off("click");
    recognition.continuous = false;
    recognition.interimResults = false;
    // recognition.interimResults = true;
    // recognition.lang = "en-EN";
    recognition.lang = "bg-BG";
    recognition.start();
    // document.getElementById('transcript').value = "Speak now!";
    $("#transcript")[0].value = "Speak now!";
    recognition.onresult = function (e) {
      var recognized_string;
      recognized_string = e.results[0][0].transcript;
      //   console.log(e.results[0][0].transcript);
      //   console.log("recognized string is: " + recognized_string);
      // document.getElementById('transcript').value = (recognized_string);
      $("#transcript")[0].value = recognized_string;
      recognition.stop();
      $("#mic_span")[0].innerHTML =
        '<span class="input-group-addon btn btn-lg btn-outline-secondary btn-circle "><i class="fas fa-microphone-alt-slash fa-2x"></i></span>';
      $("#mic_click_span").on("click", startSpeechRecognition);
      checkSpeechCommand(recognized_string);
    };
    recognition.onerror = function (e) {
      console.log("speech recognition error!");
      document.getElementById("transcript").value = "Error, please try again";
      $("#mic_span")[0].innerHTML =
        '<span class="input-group-addon btn btn-lg btn-outline-secondary btn-circle "><i class="fas fa-microphone-alt-slash fa-2x"></i></span>';
      $("#mic_click_span").on("click", startSpeechRecognition);
      recognition.stop();
    };
  }
}

function checkSpeechCommand(str) {
  /* Voice control of the page menu*/
  if (
    str.includes("open") &&
    str.includes("dashboard") &&
    str.includes("page")
  ) {
    window.location.href = "/dashboard/";
  } else if (
    str.includes("open") &&
    str.includes("telecontrol") &&
    str.includes("page")
  ) {
    window.location.href = "/teleop/";
  } else if (
    str.includes("open") &&
    str.includes("teleop") &&
    str.includes("page")
  ) {
    window.location.href = "/teleop/";
  } else if (
    str.includes("open") &&
    str.includes("autonomous") &&
    str.includes("navigation") &&
    str.includes("page")
  ) {
    window.location.href = "/navigation/";
  } else if (
    str.includes("open") &&
    str.includes("navigation") &&
    str.includes("page")
  ) {
    window.location.href = "/navigation/";
  } else if (
    str.includes("open") &&
    (str.includes("actions") || str.includes("action")) &&
    str.includes("page")
  ) {
    window.location.href = "/actionsandtasks/";
  } else if (
    str.includes("open") &&
    str.includes("tasks") &&
    str.includes("page")
  ) {
    window.location.href = "/actionsandtasks/";
  } else if (
    str.includes("open") &&
    str.includes("Smart") &&
    str.includes("home") &&
    str.includes("page")
  ) {
    window.location.href = "/smarthome/";
  } else if (
    str.includes("open") &&
    str.includes("health") &&
    str.includes("data") &&
    str.includes("page")
  ) {
    window.location.href = "/healthdata/";
  }

  /*Page specific voice controls*/

  if ($("#dashboard_page_content").length) {
    // console.log("checkSpeechCommand: dashboard_page detected!");
    if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("forward")
    ) {
      executeSpeechMovementCommand(0.4, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("straight")
    ) {
      executeSpeechMovementCommand(0.6, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("backwards")
    ) {
      executeSpeechMovementCommand(-0.4, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("back")
    ) {
      executeSpeechMovementCommand(-0.4, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("turn") &&
      str.includes("left")
    ) {
      executeSpeechMovementCommand(0, 0.6);
    } else if (
      str.includes("Archie") &&
      str.includes("turn") &&
      str.includes("right")
    ) {
      executeSpeechMovementCommand(0, -0.6);
    }
  } else if ($("#teleop_page_content").length) {
    // console.log("checkSpeechCommand: teleop_page detected!");
    if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("forward")
    ) {
      executeSpeechMovementCommand(0.4, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("straight")
    ) {
      executeSpeechMovementCommand(0.4, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("backwards")
    ) {
      executeSpeechMovementCommand(-0.4, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("go") &&
      str.includes("back")
    ) {
      executeSpeechMovementCommand(-0.4, 0);
    } else if (
      str.includes("Archie") &&
      str.includes("turn") &&
      str.includes("left")
    ) {
      executeSpeechMovementCommand(0, 0.6);
    } else if (
      str.includes("Archie") &&
      str.includes("turn") &&
      str.includes("right")
    ) {
      executeSpeechMovementCommand(0, -0.6);
    }
  } else if ($("#action_and_tasks_page_content").length) {
    // console.log("checkSpeechCommand: action_and_tasks_page detected!");

    if (
      (str.includes("Archie") && str.includes("stand") && str.includes("up")) ||
      (str.includes("Арчи") && str.includes("стани"))
    ) {
      sendActionCommand(1);
      console.log("'Stand up' voice command received!");
    } else if (
      (str.includes("Archie") && str.includes("sit") && str.includes("down")) ||
      (str.includes("Арчи") && str.includes("седни"))
    ) {
      sendActionCommand(15);
      console.log("'Sit down' voice command received!");
    } else if (
      //   str.includes("Archie") &&
      (str.includes("gesture") &&
        str.includes("thank") &&
        str.includes("you")) ||
      (str.includes("Арчи") && str.includes("благодари"))
    ) {
      if (in_standup_position) {
        sendActionCommand(4);
        console.log("'Thank you gesture' voice command received!");
      } else
        console.log("Can not perform 'Thank you gesture'... while sitting");
    } else if (
      (str.includes("again") && str.includes("did") && str.includes("oops")) ||
      (str.includes("Арчи") && str.includes("почеши") && str.includes("главата"))
    ) {
      if (in_standup_position) {
        sendActionCommand(27);
        console.log("'Oops...' voice command received!");
      } else console.log("Can not perform 'Oops...' while sitting");
    }
  }
}
