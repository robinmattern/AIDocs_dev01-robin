#!/bin/bash 
  GIT="/C/Program Files/Git/mingw64/bin/git.exe"
  if [ "$2" == "" ]; then aBranch=""; aFile="$1"; else aBranch="$1"; aFile="$2"; fi 
  if [ "${aBranch}" == "" ]; then aBranch="master"; else aBranch="$1"; fi
  if [ "${aFile}"   == "" ]; then exit; else aFile=${aFile//\\/\/}; fi 

  echo "aBranch: '${aBranch}'";
  echo "aFile:   '${aFile}'";  

# git difftool master:client1/c16_aidocs-review-app/utils/FRTs/getAPI_u1.04.mjs -- client1/c16_aidocs-review-app/utils/FRTs/getAPI_u1.04.mjs
  
  echo "Command: \"${GIT}\" difftool \"${aBranch}:${aFile}\"  --  \"${aFile}\""
  "${GIT}" difftool -v "${aBranch}:${aFile}" -- "${aFile}"
  
