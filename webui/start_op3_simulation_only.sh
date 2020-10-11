#!/bin/bash



gnome-terminal \
  --tab-with-profile=halt -e '/bin/bash -c "\
    cd ~/catkin_ws/src/ROBOTIS-OP3-Common/op3_gazebo/launch; \
    roslaunch robotis_world.launch;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 5;\
    roslaunch op3_manager op3_gazebo.launch;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 6;\
    roslaunch op3_gui_demo op3_demo.launch;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 7;\
    cd ~/WebUI/nodejs_channel_server; \
    node channel_server.js; \
  " ' \
    --tab-with-profile=halt -e '/bin/bash -i -c "\
    sleep 10;\
    cd ~/WebUI/startup_script; \
    ./ros1.sh restart\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
      sleep 15;\
    rosservice call gazebo/unpause_physics;\
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
