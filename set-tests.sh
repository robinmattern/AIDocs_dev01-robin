#!/bin/bash 

 bThere=1; if [ "$1" == "here" ]; then bThere=0; fi 
 aFRTs_Dir="./client1/c16_aidocs-review-app/utils/FRTs"
 aFRTs_Dir="/E/Repos/Robin/AIDocs_/demo1-master/client1/c16_aidocs-review-app/utils/FRTs"

  cd "${aFRTs_Dir}"
  rdir ".txt" | awk 'NF > 0' | awk '!/_v/';  rdir "_env" | awk 'NR == 13'; echo ""  

 if [ "${bThere}" == "1" ]; then cp -p "${aFRTs_Dir}/_env_local-remote.txt"  "_env"; fi
 if [ "${bThere}" == "0" ]; then cp -p "${aFRTs_Dir}/_env_local-local.txt"   "_env"; fi

  rdir ".txt" | awk 'NF > 0' | awk '!/_v/';  rdir "_env" | awk 'NR == 13'; echo ""  

  cat "${aFRTs_Dir}/_env" | awk '/^ / { print "      " $0 }' 


 
