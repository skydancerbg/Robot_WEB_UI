#!/bin/bash
gnome-terminal \
  --tab-with-profile=halt -e '/bin/bash -c "\
    source ~/catkin_ws/devel/setup.bash
    rosrun topic_tools relay /robotis_op3/camera/image_raw /archie/camera/image_raw;\
   " '\
  --tab-with-profile=halt -e '/bin/bash -c "\
    source ~/catkin_ws/devel/setup.bash
    rosrun topic_tools relay /robotis_op3/camera/image_raw /marchie/camera/image_raw;\
    sleep 17;
  " '





