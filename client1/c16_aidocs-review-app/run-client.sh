#!/bin/bash  

if [ "${OSTYPE:0:5}" == "linux" ]; then
   if which "run-node-apps"  >/dev/null 2>&1; then run-node-apps stop demo1; else echo -e "\n* run-node-apps is not available"; fi
   if which "kill-node-apps" >/dev/null 2>&1; then kill-node-apps 8080 doit; else echo -e "\n* kill-node-apps is not available"; fi
#  echo kill-node-apps 8080 doit
#  kill-node-apps 8080 doit
   npm start
   fi

if [ "${OSTYPE:0:4}" == "msys" ]; then
   killport 8080
   node server.mjs
   fi

if [ "${OS:0:7}" == "Windows" ]; then   # Running in DOS, will it ever happen?
   killport 8080
   node server.mjs
   fi