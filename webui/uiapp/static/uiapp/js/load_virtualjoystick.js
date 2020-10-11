
console.log("load_virtualjoystick.js");
    // ###################################
    // ######## VIRTUAL JOYSTICK RELATED #############

    var cmdVel = new ROSLIB.Topic({
        ros: ros,
        name: '/archie/cmd_vel',
        // name: '/cmd_vel',
        // name: '/servicebot/cmd_vel',
        // name: '/cmd_vel_mux/input/teleop',
        messageType: 'geometry_msgs/Twist'
    });

    var deadzone = 10;

    var stop_sent = false;

    function send_command(dx, dy) {
        if (dx < deadzone && dx > -deadzone)
            dx = 0;

        if (dy < deadzone && dy > -deadzone)
            dy = 0;

        if (dx == 0 && dy == 0) {
            if (stop_sent)
                return;
            else
                stop_sent = true;
        } else {
            stop_sent = false;
        }

        var twist = new ROSLIB.Message({
            linear: {
                x: dy / 100.0,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: dx / 100.0
            }
        });
        console.log("publish twist");
        cmdVel.publish(twist);
    }

    function sendButtonCommand(dx, dz) {
        var twist = new ROSLIB.Message({
            linear: {
                x: dx,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: dz
            }
        });
        console.log("publish bez timeout ");
        cmdVel.publish(twist);

        setTimeout(function () {
            var twist = new ROSLIB.Message({
                linear: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            });
            console.log("publish timeouttttt");
            cmdVel.publish(twist);
        }, 2000); // duration of movement
    }


    setInterval(function () {
        var outputEl = document.getElementById('result');

        var dx = joystick.deltaXpercent();
        var dy = joystick.deltaYpercent();

        send_command(-dx, -dy);

        outputEl.innerHTML = ' dx:' + dx + '%' +
            ' dy:' + dy + '%' +
            (joystick.right() ? ' right' : '') +
            (joystick.up() ? ' up' : '') +
            (joystick.left() ? ' left' : '') +
            (joystick.down() ? ' down' : '')
    }, 1 / 30 * 1000);

    // ######### END VIRTUAL JOYSTICK ##############

    // ****** TEST *********
    // var my_listener = new ROSLIB.Topic({
    //     ros: ros,
    //     // name: '/robotis/status',
    //     name: '/archie/status',
    //     messageType: 'robotis_controller_msgs/StatusMsg'
    // });

    // my_listener.subscribe(function (message) {
    //     // https://stackoverflow.com/questions/53676731/roslibjs-subscribe-to-topic-with-custom-messages
    //     console.log("Poluchi message!!!!");
    //     console.log(message.module_name);
    //     console.log(message.status_msg);
    //     console.log(message.type);
    //     // console.log(m.data);
    //     //console.log(`Received message on'  ${listener.name}: ${JSON.stringify(message)}`);
    //     // document.getElementById("msg").innerHTML = m.data;
    //     document.getElementById("msg").innerHTML = message.status_msg;
    //     statusmsg = message.status_msg;

    // });
    // ****** END TEST *********


    // ####################################
    //initial position
    var OP3Command = new ROSLIB.Topic({
        ros: ros,
        // name: '/robotis/base/ini_pose',
        name: '/archie/base/ini_pose',
        messageType: 'std_msgs/String'
    });

    function sendOP3Command(command) {
        var init_command = new ROSLIB.Message({
            data: command
        });
        OP3Command.publish(init_command);

    }

    //controll module selection
    var ModuleCommand = new ROSLIB.Topic({
        ros: ros,
        // name: '/robotis/enable_ctrl_module',
        name: '/archie/enable_ctrl_module',
        messageType: 'std_msgs/String'
    });

    function sendModuleCommand(command) {
        var init_command = new ROSLIB.Message({
            data: command
        });
        ModuleCommand.publish(init_command);

    }

    //action control module controls
    var ActionCommand = new ROSLIB.Topic({
        ros: ros,
        // name: '/robotis/action/page_num',
        name: '/archie/action/predefined_num',
        messageType: 'std_msgs/Int32'
    });

    function sendActionCommand(command) {
        var init_command = new ROSLIB.Message({
            data: command
        });
        ActionCommand.publish(init_command);

    }

    //head control module controls
    var HeadControl = new ROSLIB.Topic({
        ros: ros,
        // name: '/robotis/head_control/set_joint_states',
        name: '/archie/head_control/set_joint_states',
        messageType: 'sensor_msgs/JointState'
    });


    // pose = (pan/tilt)degree*3.1415/180;
    // joint = head_pan, head_tilt

    function sendHeadCommand(joint, pose) {
        var head_motion = new ROSLIB.Message({
            name: joint,
            position: pose
        });
        HeadControl.publish(head_motion);
    }
    function myFunction() {
        sendActionCommand(15);
        console.log('sit_button');
    }

    var joystick = null;

    function createjoystick() {
        var jpw = $('#virtualjoystick').width();
        console.log("jpw" + jpw);
        console.log("width", jpw, $('#joystick_container').offset().top + jpw / 2);
        jpw = jpw / 3;
        $('#joystick_container').css({
            'height': jpw + 'px',
            'width': jpw + 'px'
        });
        $('#joystick_container').css('background-color', 'WhiteSmoke');
        if (joystick)
            joystick.destroy();
        joystick = new VirtualJoystick({
            container: document.getElementById('joystick_container'),
            // container: $('#joystick_container'),
            top: $('#joystick_container').offset().top,
            left: $('#joystick_container').offset().left,
            mouseSupport: true,
            stationaryBase: true,
            baseX: $('#joystick_container').offset().left + jpw / 2,
            baseY: $('#joystick_container').offset().top + jpw / 2,
            strokeStyle: 'black',
            limitStickTravel: true,
            stickRadius: jpw
        });
    }

    // onWindowResize();
    // -----end copy------

    $(document).ready(function () {
        console.log("DOCUMENT READY");
        // var jpw = $('#virtualjoystick').width();
        // console.log("width", jpw, $('#joystick_container').offset().top + jpw / 2);
        // console.log("jpw" + jpw);
        // jpw = jpw / 3;
        // $('#joystick_container').css({
        //     'height': jpw + 'px',
        //     'width': jpw + 'px',
        //     // 'background-color': rgb(214, 120, 120),
        // });
        // $('#joystick_container').css('background-color', 'WhiteSmoke');
        // // $('#virtualjoystick').css('background-color', 'cyan'); 

        // console.log($('#joystick_container').width());
        // var v = document.getElementById('joystick_container');
        // console.log(v.width);
        createjoystick()
    });

    window.onresize = function () {
        //   if (window.outerWidth() == 980) {alert('');}
        console.log("resizing to " + window.outerWidth)
        // var jpw = $('#virtualjoystick').width();
        // console.log("width", jpw, $('#joystick_container').offset().top + jpw / 2);
        // console.log("jpw" + jpw);
        // jpw = jpw / 3;
        // $('#joystick_container').css({
        //     'height': jpw + 'px',
        //     'width': jpw + 'px',
        //     // 'background-color': rgb(214, 120, 120),
        // });
        // $('#joystick_container').css('background-color', 'WhiteSmoke');
        // // $('#virtualjoystick').css('background-color', 'white'); 


        createjoystick()
    };
    // $(document).ready(function () {
    $(function () {
        // Tabs:

        // When action tab is clicked, send activate action module on the OP3 robot
        $('#controlsCardTab a[href="#actionctrl"]').click(function () {
            // Destroy joystick if it was shown
            // if (joystick)
            // joystick.destroy();

            sendModuleCommand("action_module")
            console.log("action tab clicked!sendModuleCommand('action_module')");
        });

        // When virtual joystick tab is fully shown, draw the joystick inside
        $('#controlsCardTab a[href="#virtualjoystick"]').on('shown.bs.tab', function(){
            // alert('The new tab is now fully shown.');
            console.log("virtualjoystick tab is now fully shown!");
            createjoystick();
          });


        // $('#manual_ctrl_Tab a[href="#actionctrl_tab"]').click(function () {
        //     sendModuleCommand("action_module")
        //     console.log("klikna action");
        // });
        $('#manual_ctrl_Tab a[href="#headctrl_tab"]').click(function () {
            sendModuleCommand("head_control_module")
            console.log("klikna head");
        });
        $('#manual_ctrl_Tab a[href="#walkctrl_tab"]').click(function () {
            sendModuleCommand("online_walking_module")
            console.log("klikna walk");
        });
        // Buttons:
        $('#init_btn').click(function () {
            sendOP3Command("ini_pose");
        });
        $('#stand_btn').click(function () {
            sendActionCommand(1)
            console.log('stand_button');
        });
        $('#sit_btn').click(function () {
            sendActionCommand(15)
            console.log('sit_button');
        });
        $('#thankyou_btn').click(function () {
            statusmsg = 'predi';
            console.log('predi ' + statusmsg);
            sendActionCommand(4);
            statusmsg = 'sled';
            console.log("sled " + statusmsg);
            // statusmsg='Action_Finish';
            // while (statusmsg !== 'Action_Finish') {
            //     console.log("VATRE!!!!!    " +statusmsg);
            //     // document.getElementById("msg1").innerHTML = message.status_msg;
            // }
            // alert("mina");
            // sendActionCommand(4);
        });
        $('#oops_btn').click(function () {
            sendActionCommand(27)
        });
        $('#walk_btn').click(function () {
            sendActionCommand(9)
        });
        $('#walk_btn').click(function () {
            sendActionCommand(-1)
        });
    });