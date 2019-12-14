#!/bin/bash
if [ ! -d /opt/serve_root/2note ]
then 
    mkdir -p /opt/serve_root/2note
fi
rm -rf dist
npm run build
rm -rf /opt/serve_root/2note
cp -r dist /opt/serve_root/2note
