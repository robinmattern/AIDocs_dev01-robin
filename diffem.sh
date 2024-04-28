#!/bin/bash 
  GIT="/C/Program Files/Git/mingw64/bin/git.exe"
  WMG="/C/Program Files/WinMerge/WinMergeU.exe"
  if [ "$2" == "" ]; then aBranch1=""; aBranch2="$1"; else aBranch1="$1"; aBranch2="$2"; fi 
  if [ "${aBranch1}" == "" ]; then aBranch1="master"; else aBranch1="$1"; fi
  if [ "${aBranch2}" == "" ]; then exit; fi 

  echo "aBranch1: '${aBranch1}'";
  echo "aBranch2: '${aBranch2}'";  

# git difftool master:client1/c16_aidocs-review-app/utils/FRTs/getAPI_u1.04.mjs -- client1/c16_aidocs-review-app/utils/FRTs/getAPI_u1.04.mjs
  
  echo "Command: \"${GIT}\" difftool \"${aBranch1}\"  \"${aBranch2}\""
# DIFF_OUTPUT="$("${GIT}" difftool -diff-filter=ad "${aBranch1}" "${aBranch2}" 2>&1)"
# DIFF_OUTPUT="$("${GIT}" difftool -diff-filter=ad "${aBranch1}" "${aBranch2}" )"
#                "${GIT}" difftool -diff-filter=ad "${aBranch1}" "${aBranch2}" 
# DIFF_OUTPUT="$("${GIT}" difftool                 "${aBranch1}" "${aBranch2}" 2>&1)"
                 "${GIT}" difftool                 "${aBranch1}" "${aBranch2}" 

# "${WMG}" "${aBranch1}" "${aBranch2}"
  
