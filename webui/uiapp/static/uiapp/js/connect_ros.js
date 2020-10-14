var statusmsg = 'empty';
var ros = new ROSLIB.Ros();

    // When making connection to the web socket server in a web page script use:
    // // ros.connect('ws://{{ fqdn }}:9090');
    // // which equals to ros.connect('ws://localhost:9090'); for example (based on the fqdn of our site)

    // In order to send the context data from a web page to the js file,
    // first we declare a variable fqdn in the web page script, which to be loaded before the js file
    // in this case fqdn is declared in the page_specific_scripts.html snippet (which is included in the page)
    // like this:
    // <script>
    //     var fqdn = "{{ fqdn }}";
    // </script>
    // effectively transfering the web page context data value to this file:

    ros.connect('ws://' + fqdn + ':9090');

    ros.on('connection', function () {
        console.log('Connected to websocket server.');
        if ($("#dashboard_page_content").length != 0) {
            // We are on the Dasboard pageXOffset, topbar is diferent here. process accordingly
            // console.log('connect_ros.js: dashboard page');

            // var contents = $('#contents');  //returns a jQuery Object
            // var contents = $('#contents')[0]; //the first element of the object returns a HTML DOM Object
            // equivalent of java script document.getElementById

            // Set the connect icon in the topbar to connected visual state:
            // document.getElementById("ros_connection_status").innerHTML = "<button type='button' class='btn btn-success btn-box'><i class='fas  fa-link fa-2x'></i></button>&nbsp;&nbsp;<h6>Connected</h6>";
            $("#ros_connection_status")[0].innerHTML = "<button type='button' class='btn btn-success btn-box'><i class='fas  fa-link fa-2x'></i></button>&nbsp;&nbsp;<h6>Connected</h6>";
            //TODO set the status cards satatus
        } else {
            $("#ros_connection_status")[0].innerHTML = "<button type='button' class='btn btn-success btn-box'><i class='fas  fa-link fa-2x'></i></button>&nbsp;&nbsp;<h6>Connected</h6>";
            $("#robot_status")[0].innerHTML = '<i class="fas fa-robot fa-2x" style="color:rgb(123, 230, 123);"></i>';
            $("#battery_status")[0].innerHTML = '<i class="fas fa-battery-empty fa-2x blink_it" style="color:red;"></i>';
            $("#wifi_status")[0].innerHTML = '<i class="fas fa-wifi fa-2x" style="color:rgb(123, 230, 123);"></i>';
            $("#smarthome_status")[0].innerHTML = '<i class="fas fa-home fa-2x  " style="color:rgb(123, 230, 123);" ></i>';
            // console.log('connect_ros.js: not a dashboard page')
        }

    });

    ros.on('error', function (error) {
        console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function () {
        console.log('Connection to websocket server closed.');
    });
    ros.on('connection', function () {

    });
// });