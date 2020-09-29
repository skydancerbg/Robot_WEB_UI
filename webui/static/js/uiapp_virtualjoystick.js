
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

    cmdVel.publish(twist);

    setTimeout(function() {
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

        cmdVel.publish(twist);
    }, 2000); // duration of movement
}
// ##############????????????

var joystick = null;

document.getElementById("status").innerHTML = "Connected";

function onWindowResize() {
var jpw = $('#joystick-panel').width();
console.log("width", jpw, $('#joystick-container').offset().top + jpw / 2);
$('#joystick-container').css({
    'height': jpw + 'px',
    'width': jpw + 'px'
});

if (joystick)
    joystick.destroy();
joystick = new VirtualJoystick({
    container: document.getElementById('joystick-container'),
    top: $('#joystick-container').offset().top,
    left: $('#joystick-container').offset().left,
    mouseSupport: true,
    stationaryBase: true,
    baseX: $('#joystick-container').offset().left + jpw / 2,
    baseY: $('#joystick-container').offset().top + jpw / 2,
    strokeStyle: 'black',
    limitStickTravel: true,
    stickRadius: jpw
});
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);

setInterval(function() {
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