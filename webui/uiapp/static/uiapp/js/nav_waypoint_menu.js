$("#waypoints").change(function () {
    var selected = $("#waypoints").val();
    if (selected == -1) {
        waypointMarker.visible = false;
        return;
    }
    waypointMarker.x = waypoints[selected].x;
    waypointMarker.y = -waypoints[selected].y;
    console.log('selected x '+ waypoints[selected].x);
    console.log('selected y ' + (-waypoints[selected].y));
    waypointMarker.rotation = waypoints[selected].theta;
    waypointMarker.scaleX = 1.0 / viewer.scene.scaleX;
    waypointMarker.scaleY = 1.0 / viewer.scene.scaleY;
    viewer.scene.setChildIndex(waypointMarker, viewer.scene.getNumChildren() - 1);
    waypointMarker.visible = true;
});

$("#go_button").click(function () {
    var selected = $("#waypoints").val();
    if (selected == -1)
        return;
    waypointMarker.visible = false;
    var x = waypoints[selected].x;
    var y = waypoints[selected].y;
    var thetaRadians = waypoints[selected].theta * Math.PI / 180.0;
    var qz = Math.sin(-thetaRadians / 2.0);
    var qw = Math.cos(-thetaRadians / 2.0);
    var orientation = new ROSLIB.Quaternion({ x: 0, y: 0, z: qz, w: qw });
    var pose = new ROSLIB.Pose({
        position: new ROSLIB.Vector3({ x: x, y: y }),
        orientation: orientation
    });
    // send the goal
    nav.navigator.sendGoal(pose);
});


$("#save_button").click(function () {
    var name = prompt("Waypoint name:", "");
    if (name == null || name == "") {
        alert('Invalid name!' + name);
        return;
    }
    // $.post("/interface/navigation/save/", { 'x': $("#position_x").text(), y: $("#position_y").text(), 'theta': $("#heading").text(), 'name': name }, function (data) {
    $.post("/navigation/save/", { 'x': $("#position_x").text(), y: $("#position_y").text(), 'theta': $("#heading").text(), 'name': name }, function (data) {
        if (data != "error") {
            $('#waypoints').append(new Option(data.name, data.id, false, true));
            waypoints[data.id] = { 'x': parseFloat(data.x), 'y': parseFloat(data.y), 'theta': parseFloat(data.theta) };
        }
    });
});

$("#delete_button").click(function () {
    var selected = $("#waypoints").val();
    console.log('selected'+selected);
    if (selected == -1)
        return;
    if (!confirm("Confirm deletion of the selected waypoint?"))
        return;
    // $.post("/interface/navigation/remove/", { 'id': selected, y: $("#position_y").text(), 'theta': $("#heading").text(), 'name': name }, function (data) {
    $.post("/navigation/remove/", { 'id': selected, y: $("#position_y").text(), 'theta': $("#heading").text(), 'name': name }, function (data) {
        if (data != "error") {
            $("#waypoints option[value='" + data + "']").remove();
        }
    });
});
