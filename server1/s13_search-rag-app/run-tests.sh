#!/bin/bash
        
     if [ "$1" == "s12" ]; then shift; fi 
     if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
     aRun_Tests="../../._2/MWTs/AIC15_runTests_u1.02.sh"
     export SEARCH_SCRIPT="search_u2.07.mjs"

     export APP=s13 

#    export LOGGER=
#    export LOGGER="log"   # no workie
#    export LOGGER="inputs"
     export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="1"
 
     export PC_CODE="rm228p"

     bash  "${aRun_Tests}"  "$@";  if [ $? -ne 0 ]; then exit 1; fi
