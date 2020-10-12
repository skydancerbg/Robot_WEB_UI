
// camera mouse buttons
$('button.hover_btn').mouseover(function () {
    var twist = new ROSLIB.Message({
        linear: {
            x: parseFloat($(this).attr('data-dx')),
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: parseFloat($(this).attr('data-dz'))
        }
    });
    console.log('button mouse over publishes twist');
    cmdVel.publish(twist);
});
$('button.hover_btn').mouseout(function () {
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
    console.log('button mouse out publishes twist');

    cmdVel.publish(twist);
});
