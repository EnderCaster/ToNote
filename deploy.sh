#!/bin/bash
if [ ! -d /opt/serve_root/2note ]
then 
    mkdir -p /opt/serve_root/2note
fi
rm -rf dist
rm -f index_prod.html
npm run build
rm -rf /opt/serve_root/2note/*
cp -r dist /opt/serve_root/2note/dist
cp index_prod.html /opt/serve_root/2note/index.html
