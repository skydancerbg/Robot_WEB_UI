$(function () {
    console.log("nav_map: enclosing document ready event");
    if (!$("#map-panel").length) {
        // alert('no virtual joystick container');
        console.log('Skipping load nav map, no container on the page!');
    } else {
        console.log('nav map container exists on the page');
        if ($("#dashboard_page_content").length) {
            console.log('nav_map: loaded from the dashboard page!');
            // ######## NAVIGATION MAP RELATED #############

            // Create the main viewer.
            var viewer;

            // Setup the nav client.
            var nav;

            var waypointMarker = new ROS2D.NavigationArrow({
                // https://github.com/RobotWebTools/ros2djs/issues/39

                // * size(optional) - the size of the marker
                // * strokeSize(optional) - the size of the outline
                // * strokeColor(optional) - the createjs color for the stroke
                // * fillColor(optional) - the createjs color for the fill
                // * pulse(optional) - if the marker should "pulse" over time

                size: 0.01,
                strokeSize: 0.05,
                fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.66),
                // pulse: false
                pulse: true
            });

            function onResize() {
                var w = $('#map-panel').width();
                console.log("on resize w = " + w);
                var h = w * 0.7;
                viewer.scene.canvas.width = w;
                viewer.scene.canvas.height = h;
                viewer.width = w;
                viewer.height = h;
                viewer.scene.scaleX = w / viewer.image_dim.w;
                viewer.scene.scaleY = h / viewer.image_dim.h;
                viewer.scene.x = 0;
                viewer.scene.y = h;
                nav.navigator.initScaleSet = false;
            }


            function initviewer() {
                //   ros.connect('ws://{{ domainname }}:9090');
                console.log('nav_map: init ROS2D.Viewer');
                viewer = new ROS2D.Viewer({
                    divID: 'nav',
                    width: $('#map-panel').width(),
                    height: $('#map-panel').width() * 0.7
                });


            }


            window.onresize = function () {
                //   if (window.outerWidth() == 980) {alert('');}
                //console.log("resizing to " + window.outerWidth)
                console.log("nav_map: resizing the window ")
                onResize();
            };
            // $(document).ready(function () {
            // $(function () {
            //     console.log("nav_map: document ready event");
            //     initviewer();
            //     waypointMarker.visible = false;
            //     viewer.scene.addChild(waypointMarker);

            //     // Make sure you are running the robot_pose_publisher as mentioned 
            //     // in the nav2djs documentation. The robot_pose_publisher needs to be running
            //     // in order for this widget to work.

            //     nav = new NAV2D.ImageMapClientNav({

            //         // * ros - the ROSLIB.Ros connection handle
            //         // * topic (optional) - the map meta data topic to listen to '/map_metadata'
            //         // * image - the URL of the image to render
            //         // * serverName (optional) - the action server name to use for navigation, like '/move_base'
            //         // * actionName (optional) - the navigation action name, like move_base_msgs/MoveBaseAction'
            //         // * rootObject (optional) - the root object to add the click listeners to and render robot markers to
            //         // * withOrientation (optional) - if the Navigator should consider the robot orientation (default: false)
            //         // * viewer - the main viewer to render to
            //         // https://github.com/GT-RAIL/nav2djs/pull/44
            //         // https://github.com/GT-RAIL/nav2djs/pull/44/commits/f7a85858e3f2db58392ebda220bd97f17d132a99
            //         // var frame_id = options.frame_id || '/map';
            //         ros: ros,
            //         rootObject: viewer.scene,
            //         viewer: viewer,
            //         serverName: '/move_base',
            //         image: '/static/img/map.png',
            //         withOrientation: 'true',
            //     });
            // });

            $("#waypoints").change(function () {
                var selected = $("#waypoints").val();
                if (selected == -1) {
                    waypointMarker.visible = false;
                    return;
                }
                waypointMarker.x = waypoints[selected].x;
                waypointMarker.y = -waypoints[selected].y;
                console.log('selected x ' + waypoints[selected].x);
                console.log('selected y ' + (-waypoints[selected].y));
                waypointMarker.rotation = waypoints[selected].theta;
                waypointMarker.scaleX = 1.0 / viewer.scene.scaleX;
                waypointMarker.scaleY = 1.0 / viewer.scene.scaleY;
                viewer.scene.setChildIndex(waypointMarker, viewer.scene.getNumChildren() - 1);
                waypointMarker.visible = true;
            });

            console.log("nav_map: processing document ready event");
            initviewer();
            waypointMarker.visible = false;
            viewer.scene.addChild(waypointMarker);

            // Make sure you are running the robot_pose_publisher as mentioned 
            // in the nav2djs documentation. The robot_pose_publisher needs to be running
            // in order for this widget to work.

            nav = new NAV2D.ImageMapClientNav({

                // * ros - the ROSLIB.Ros connection handle
                // * topic (optional) - the map meta data topic to listen to '/map_metadata'
                // * image - the URL of the image to render
                // * serverName (optional) - the action server name to use for navigation, like '/move_base'
                // * actionName (optional) - the navigation action name, like move_base_msgs/MoveBaseAction'
                // * rootObject (optional) - the root object to add the click listeners to and render robot markers to
                // * withOrientation (optional) - if the Navigator should consider the robot orientation (default: false)
                // * viewer - the main viewer to render to
                // https://github.com/GT-RAIL/nav2djs/pull/44
                // https://github.com/GT-RAIL/nav2djs/pull/44/commits/f7a85858e3f2db58392ebda220bd97f17d132a99
                // var frame_id = options.frame_id || '/map';
                ros: ros,
                rootObject: viewer.scene,
                viewer: viewer,
                serverName: '/move_base',
                image: '/static/img/map.png',
                withOrientation: 'true',
            });
        }

    }
});
