var in_standup_position = false;

// ****** TEST *********
var robot_feedback_listener = new ROSLIB.Topic({
  ros: ros,
  // name: '/robotis/status',
  name: "/archie/status",
  messageType: "robotis_controller_msgs/StatusMsg",
});

robot_feedback_listener.subscribe(function (message) {
  // https://stackoverflow.com/questions/53676731/roslibjs-subscribe-to-topic-with-custom-messages
  console.log(
    "robot_feedback_listener got message:  Module: " +
      message.module_name +
      " Message: " +
      message.status_msg
    //  + " Message type: " +
    //   message.type
  );
  // console.log(message.module_name);
  // console.log(message.status_msg);
  // console.log(message.type);
  // console.log(m.data);
  str = message.status_msg;
  // $('button').prop('disabled', true);
  // $('button').prop('disabled', false);
  // robot_feedback_listener.subscribe Poluchi message!!!!Action Succeed to start page 15 1
  // robot_feedback_listener.subscribe Poluchi message!!!!Action Action_Start
  // robot_feedback_listener.subscribe Poluchi message!!!!Action Action_Finish

  if (
    str.includes("Succeed") &&
    str.includes("start") &&
    str.includes("page")
  ) {
    $(".actionbtn").prop("disabled", true);
    $(".funactionbtn").prop("disabled", true);
    if (str.includes("15")) {
      in_standup_position = false;
    //   console.log("set standup position to: " + in_standup_position);
    } else if (str.includes("1")) {
      in_standup_position = true;
    //   console.log("set standup position to: " + in_standup_position);
    }
  } else if (str == "Action_Finish") {
    $(".actionbtn").prop("disabled", false);
    // console.log("standup position is: " + in_standup_position);
    if (in_standup_position) {
    //   console.log("if in standup position? " + in_standup_position);
      $(".funactionbtn").prop("disabled", false);
    }
  }

  //console.log(`Received message on'  ${listener.name}: ${JSON.stringify(message)}`);
  // document.getElementById("msg").innerHTML = m.data;

  // document.getElementById("msg").innerHTML = message.status_msg;

  statusmsg = message.status_msg;
});
// ****** END TEST *********

// ####################################
//initial position
var OP3Command = new ROSLIB.Topic({
  ros: ros,
  // name: '/robotis/base/ini_pose',
  name: "/archie/base/ini_pose",
  messageType: "std_msgs/String",
});

function sendOP3Command(command) {
  var init_command = new ROSLIB.Message({
    data: command,
  });
  OP3Command.publish(init_command);
}

//controll module selection
var ModuleCommand = new ROSLIB.Topic({
  ros: ros,
  // name: '/robotis/enable_ctrl_module',
  name: "/archie/enable_ctrl_module",
  messageType: "std_msgs/String",
});

function sendModuleCommand(command) {
  var init_command = new ROSLIB.Message({
    data: command,
  });
  console.log("sendModuleCommand sending: " + command);
  ModuleCommand.publish(init_command);
}

//action control module controls
var ActionCommand = new ROSLIB.Topic({
  ros: ros,
  // name: '/robotis/action/page_num',
  name: "/archie/action/predefined_num",
  messageType: "std_msgs/Int32",
});

function sendActionCommand(command) {
  var init_command = new ROSLIB.Message({
    data: command,
  });
  console.log("sendActionCommand sending: " + command);
  ActionCommand.publish(init_command);
}

//head control module controls
var HeadControl = new ROSLIB.Topic({
  ros: ros,
  // name: '/robotis/head_control/set_joint_states',
  name: "/archie/head_control/set_joint_states",
  messageType: "sensor_msgs/JointState",
});

// pose = (pan/tilt)degree*3.1415/180;
// joint = head_pan, head_tilt

function sendHeadCommand(joint, pose) {
  var head_motion = new ROSLIB.Message({
    name: joint,
    position: pose,
  });
  HeadControl.publish(head_motion);
}

// function myFunction() {
//     sendActionCommand(15);
//     console.log('sit_button');
// }

// sendOP3Command("ini_pose"); // niama nujda ot tova???
// sendModuleCommand("action_module")

// $(document).ready(function () {
$(function () {
  sendModuleCommand("action_module");

  // Tabs:
  // When action tab is clicked, send activate action module on the OP3 robot
  $('#controlsCardTab a[href="#actionctrl"]').click(function () {
    // Destroy joystick if it was shown
    // if (joystick)
    // joystick.destroy();

    sendModuleCommand("action_module");
    console.log("action tab clicked!");
  });

  $('#manual_ctrl_Tab a[href="#headctrl_tab"]').click(function () {
    sendModuleCommand("head_control_module");
    console.log("head_control tab clicked!");
  });

  $('#manual_ctrl_Tab a[href="#walkctrl_tab"]').click(function () {
    sendModuleCommand("online_walking_module tab clicked!");
    console.log("online_walking");
  });
  // Buttons:
  $("#init_btn").click(function () {
    sendOP3Command("ini_pose");
  });
  $("#stand_btn").click(function () {
    sendActionCommand(1);
  });
  $("#sit_btn").click(function () {
    sendActionCommand(15);
  });
  $("#thankyou_btn").click(function () {
    if (in_standup_position) {
      sendActionCommand(4);
    } else console.log("Can not perform 'Thank you'... while sitting");
});
  $("#oops_btn").click(function () {
    if (in_standup_position) {
      sendActionCommand(27);
    } else console.log("Can not perform 'Oops...' while sitting");
  });
  //   $("#walk_btn").click(function () {
  //     sendActionCommand(9);
  //   });
  //   $("#walk_btn").click(function () {
  //     sendActionCommand(-1);
  //   });
});
