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
    source ~/Robot_WEB_UI/env/bin/activate;\
    sleep 7;\
    cd ~/Robot_WEB_UI/webui; \
    python3 manage.py runserver 0:8000; \
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 7;\
    cd ~/Robot_WEB_UI/webui/nodejs_channel_server; \
    node channel_server.js; \
  " ' \
    --tab-with-profile=halt -e '/bin/bash -i -c "\
    sleep 10;\
    cd ~/Robot_WEB_UI/webui/startup_script; \
    ./ros1.sh restart\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
      sleep 15;\
    rosservice call gazebo/unpause_physics;\
  " ' 

