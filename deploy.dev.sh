#!/bin/bash
if [ ! -d /opt/serve_root/2note ]
then 
    sudo mkdir -p /opt/serve_root/2note
fi
rm -rf dist
npm run build
sudo rm -rf /opt/serve_root/2note
sudo cp -r dist /opt/serve_root/2note
