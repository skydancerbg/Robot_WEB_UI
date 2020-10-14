$("#sidebarToggleTop").on('click', function (e) {
    console.log("sidebar_top_toggle.js: in sidebar toggle event");
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
});
// Close any open menu accordions when window is resized below 768px
// $(window).resize(function() {
//     if ($(window).width() < 768) {
//       $('.sidebar .collapse').collapse('hide');
//     };
    
//     // TODO this is not working as well????????????????????
//     // Toggle the side navigation when window is resized below 480px
//     if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
//       $("body").addClass("sidebar-toggled");
//       $(".sidebar").addClass("toggled");
//       $('.sidebar .collapse').collapse('hide');
//     };
//   });


// $(function () {
//     if (!$("#sidebarToggleTop").length) {
//         // alert('no virtual joystick container');
//         console.log('sidebarToggleTop: no button on the page!');
//     } else {
//         console.log('sidebarToggleTop: button exists on the page');
//     }
// });