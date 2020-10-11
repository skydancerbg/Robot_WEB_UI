$(function () {
    console.log("load virtual joystick DOCUMENT READY");
    if (!$("#joystick_container").length) {
        // alert('no virtual joystick container');
        console.log('Skipping load virtual joystick, no container on the page!');
    } else {
        console.log( 'virtual joystick container exists on the page');
        // ###################################
        // ######## VIRTUAL JOYSTICK RELATED #############

        var cmdVel = new ROSLIB.Topic({
            ros: ros,
            // name: '/cmd_vel',
            name: '/servicebot/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        });

        var deadzone = 10;
        var stop_sent = false;
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
                console.log(document.getElementById('joystick_container'))
            // joystick = new VirtualJoystick({
            //     container: document.getElementById('joystick_container'),
            //     // container: $('#joystick_container'),
            //     top: $('#joystick_container').offset().top,
            //     left: $('#joystick_container').offset().left,
            //     mouseSupport: true,
            //     stationaryBase: true,
            //     baseX: $('#joystick_container').offset().left + jpw / 2,
            //     baseY: $('#joystick_container').offset().top + jpw / 2,
            //     strokeStyle: 'black',
            //     limitStickTravel: true,
            //     stickRadius: jpw
            // });
        }

        // $(document).ready(function () {
        //     console.log("jaoystick DOCUMENT READY, creating joystick!");
        //     createjoystick()
        // });
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

        createjoystick();

    }
});