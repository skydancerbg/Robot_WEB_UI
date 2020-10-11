#!/bin/bash

gnome-terminal \
  --tab-with-profile=halt -e '/bin/bash -c "\
    roslaunch turtlebot_gazebo turtlebot_in_kitchen_dining_world.launch; \
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 5;\
    roslaunch turtlebot_gazebo amcl_demo.launch map_file:=/home/robco/catkin_ws/src/turtlebot_maps/test_map.yaml;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 6;\
    roslaunch turtlebot_rviz_launchers view_navigation.launch;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 7;\
    cd ~/WebUI/nodejs_channel_server; \
    node channel_server.js; \
  " ' \
    --tab-with-profile=halt -e '/bin/bash -i -c "\
    sleep 8;\
    cd ~/WebUI/startup_script; \
    ./ros1.sh restart\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 8;\
    rosrun robot_pose_publisher robot_pose_publisher;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 17;\
    echo Starting to relay from topic /camera/rgb/image_raw to topic /archie/camera/image_raw;\
    source ~/catkin_ws/devel/setup.bash
    rosrun topic_tools relay /camera/rgb/image_raw /archie/camera/image_raw;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 17;\
    echo Starting to relay topic /archie/cmd_vel to /cmd_vel_mux/input/teleop;\
    source ~/catkin_ws/devel/setup.bash    
    rosrun topic_tools relay /archie/cmd_vel /cmd_vel_mux/input/teleop;\
  " '   
