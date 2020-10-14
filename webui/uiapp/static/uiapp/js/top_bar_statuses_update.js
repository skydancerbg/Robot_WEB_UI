
// ****** robot_status *********
var robot_status_listener = new ROSLIB.Topic({
    ros: ros,
    // name: '/robotis/status',
    name: 'archie/robot_status',
    messageType: 'std_msgs/Bool'
});

robot_status_listener.subscribe(function (message) {
    // https://stackoverflow.com/questions/53676731/roslibjs-subscribe-to-topic-with-custom-messages
    console.log("robot_status message received!");
    // console.log(message.data);
    console.log(message.data);
    // if (message.data) {
    //     console.log("robot_status message: true");
    //     $("#robot_status")[0].innerHTML = '<i class="fas fa-robot fa-2x" style="color:rgb(123, 230, 123);"></i>';
    // } else {
    //     console.log("robot_status message: false");
    //     $("#robot_status")[0].innerHTML = '<i class="fas fa-robot fa-2x" style="color:red;"></i>';
    // }
    switch (message.data) {
        case true:
            $("#robot_status")[0].innerHTML = '<i class="fas fa-robot fa-2x" style="color:rgb(123, 230, 123);"></i>';
            break;
        case false:
            $("#robot_status")[0].innerHTML = '<i class="fas fa-robot fa-2x" style="color:red;"></i>';
            break;

        default:
            $("#robot_status")[0].innerHTML = '<i class="fas fa-robot fa-2x" style="color:grey;"></i>';
            break;
    }
});
// ****** END robot_status *********


// ****** Battery level *********
var battery_level_listener = new ROSLIB.Topic({
    ros: ros,
    // name: '/robotis/status',
    name: 'archie/battery_level',
    // messageType: 'std_msgs/Int8'
    messageType: 'std_msgs/Float32'
});
            // Battery approximate state-of-charge in Volts
            // 100%	12.65
            // 75%	12.45
            // 50%	12.24
            // 25%	12.06
            // 0%	11.89

battery_level_listener.subscribe(function (message) {
    // https://stackoverflow.com/questions/53676731/roslibjs-subscribe-to-topic-with-custom-messages
    console.log("Battery level message received!");
    console.log(message.data);
    var bl = message.data;
    if (message.data < 12.06) {
        // $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-empty fa-2x blink_it" style="color:red;"></i>';
        $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-empty fa-2x blink_it" style="color:red;"></i>';
    } else if (bl >= 12.06  && bl < 12.24) {
        $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-quarter fa-2x blink_it" style="color:orange;"></i>';
    } else if (bl >= 12.24 && bl < 12.45) {
        $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-half fa-2x" style="color:#ffeb3b;"></i>'; // #ffeb3b yellow #fff59d yellow lighten-3 #fff9c4 yellow lighten-4 #c8e6c9 green lighten-4 #a5d6a7 green lighten-3 #ffff00 yellow-accent
    } else if (bl >= 12.45 && bl < 12.65) {
        $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-three-quarters fa-2x" style="color:#00C851;"></i>';
    } else if (bl >= 12.65) {
        $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-full fa-2x" style="color:#007E33;"></i>';
    } else {
        $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-half fa-2x" style="color:grey;"></i>';
    }

});
// ****** END Battery level *********