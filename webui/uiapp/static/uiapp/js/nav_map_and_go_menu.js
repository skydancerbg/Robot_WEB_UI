{% for Values in MyData %}
console.log("Id: " + {{Values.Id}} + ", Name: " + {{Values.Name}} + ", Prod: " + {{Values.Prod}});
{% endfor %}
// var myObject = {"p1": "value1", "p2": "value2", "p3": "value3"};
// // ["p1", "p2", "p3"]
// var keys = Object.keys(myObject);

// for(i = 0; i < keys.length; i++){
//     var value = myObject[keys[i]];
//     console.log(keys[i],value);
// }

// var keys1 = Object.keys(wpoints);

// for(i = 0; i < keys1.length; i++){
//     var value = wpoints[keys1[i]];
//     console.log(keys1[i],value);
// }

// $.each(wpoints, function () {
//     console.log("id: " + this.id);
//     console.log("x: " + this.x);
//     console.log("y: " + this.y);
//     console.log("theta: " + this.theta);
//     console.log(" ");
// });


// $.each(wpoints, function (index) {

//     console.log("id: " + index);
//     console.log("id: " + this[index]["x"]);
// });
// for (let key in wpoints) { 
//     if (wpoints.hasOwnProperty(key)) 
//     { 
//         value = wpoints[key]; 
//         console.log(key, value); 
//     } 
// } 
// wpoints.forEach(function (arrayItem) {
//     var x = arrayItem.prop1 + 2;
//     console.log(x);
// });
// console.log('waypoints'+ wpoints.length);
// for (let i = 0; i < wpoints.length; i++) {

//     console.log(wpoints[i].x);
//   }
// var waypoints = new Array();
// $.each(wpoints, function (id, x, y, theta) {
//     waypoints.id = id;
//     waypoints.x = x;
//     waypoints.y = y;
//     waypoints.theta = theta;
// });