#!/bin/bash
gnome-terminal \
  --tab-with-profile=halt -e '/bin/bash -c "\
    roslaunch servicesim servicesim.launch; \
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 15;\
    cd ~/WebUI/nodejs_channel_server; \
    node channel_server.js; \
  " ' \
    --tab-with-profile=halt -e '/bin/bash -i -c "\
    sleep 15;\
    cd ~/WebUI/startup_script; \
    ./ros1.sh restart\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 15;\
    rosservice call gazebo/unpause_physics;\
  " ' \
  --tab-with-profile=halt -e '/bin/bash -c "\
    sleep 15;\
    echo Starting to relay topic /servicebot/camera_front/image_raw to /archie/camera/image_raw;\
    source ~/catkin_ws/devel/setup.bash
    rosrun topic_tools relay /servicebot/camera_front/image_raw /archie/camera/image_raw;\
  " ' 
