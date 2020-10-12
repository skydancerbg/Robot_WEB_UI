#!/bin/bash

gnome-terminal \
  --tab-with-profile=halt -e '/bin/bash -c "\
    roslaunch turtlebot_gazebo turtlebot_in_kitchen_dining_world.launch; \
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
    sleep 17;\
    echo Starting to relay from topic /camera/rgb/image_raw to topic /archie/camera/image_raw;\
    source ~/catkin_ws/devel/setup.bash
    rosrun topic_tools relay /camera/rgb/image_raw /archie/camera/image_raw;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 17;\
    echo Starting to relay topic /archie/action/predefined_num to /robotis/action/page_num;\
    source ~/catkin_ws/devel/setup.bash    
    rosrun topic_tools relay /archie/action/predefined_num /robotis/action/page_num;\
  " '\
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 17;\
    echo Starting to relay topic /archie/cmd_vel to /cmd_vel_mux/input/teleop;\
    source ~/catkin_ws/devel/setup.bash    
    rosrun topic_tools relay /archie/cmd_vel /cmd_vel_mux/input/teleop;\
  " ' 
  
  # --tab-with-profile=halt -e '/bin/bash -c "\
  #   rosservice call gazebo/unpause_physics;\
  # " ' 
# start of the simulation in 3 terminals:
# roslaunch op3_gazebo robotis_world.launch
# Start the simulation with the play button in gazebo!!!!!
# roslaunch op3_manager op3_gazebo.launch
# roslaunch op3_gui_demo op3_demo.launch

# --tab-with-profile=halt -e '/bin/bash -c "\
# roslaunch op3_manager op3_gazebo.launch;\
# " ' \
# --tab-with-profile=halt -e '/bin/bash -c "\
# roslaunch op3_gui_demo op3_demo.launch;\
# " ' \
