#!/bin/bash
#*\
##=========+====================+================================================+
##RD         run-aidocs         | AIDocs Run Commands
##RFILE    +====================+=======+===============+======+=================+
##FD   run-aidocs.sh            |   8228|  3/03/25 10:00|   176| v1.05`50303.1000
#
#DESC     .---------------------+-------+---------------+------+-----------------+
#            This script runs AIDocs Apps
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#            help               |
#            setDir             |
#            setRepos           |
#            doPM2              |
#            doAll              |
#            listApps           |
#            exit_wCR           |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50303.02   3/03/25 RAM 10:00a| Add run-docs metadata

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#*/
#========================================================================================================== #  ===============================  #

  aVer="v0.01.50303.1000"  # run-aidocs.sh                                         # .(50303.02.1)

function exit_wCR() {
      if [ "${OS:0:7}" != "Windows" ]; then echo ""; fi
         exit
         }
function setRepos() {
         aDir="$( pwd )";
         aPath="$( pwd | tr '[:upper:]' '[:lower:]' )";
         if [[ "${aPath}" =~ ^(.*repos/(robin|test)) ]]; then
             nLen="${#BASH_REMATCH[1]}"
             aRepos="${aDir:0:nLen}"
             fi
         aRepo="${aDir/${aRepos}/}"; aRepo="${aRepo:1}"
 #       echo "  aGitPath: '${aRepos}/${aRepo}/.git'"
         if [ ! -d "${aRepos}/${aRepo}/.git" ]; then
         echo -e "\n* You are not in a Repos folder."
         exit_wCR
         fi
       __basedir="${aRepos}/${aRepo}"
         }
# ------------------------------------------------------------------------------

         aOwnr="Rick"
         setRepos

         echo -e "\n  The current Repo folder is: ${__basedir}"; # exit

         aArg1=$1; aArg2=$2; aArg3=$3
if [ "${#aArg1}" != "3" ]; then
         aArg1=$2; aArg2=$1; fi  # set aArg2 if aArg1 not an App, ie. length is 3
#        echo "  aArg1: '${aArg1:0:3}', aArg2: '${aArg2:0:4}'";  exit

# ------------------------------------------------------------------------------

function help() {
    if [ "$1" != "2" ]; then
    echo ""
    echo "  Use any of the following Apps in ${aRepo}:"
    echo "    c16_aidocs-review-app"
    echo "    c17_aidocs-review-backup"

    echo ""
    fi
    aIt="it"; if [ "${aApp}" != "" ]; then aIt="'${aApp}'"; fi
    echo "  Use ${aIt} with any of the following PM2 commands ($aVer}):"                # .(50303.02.2 )
    echo "    status            Show all running PM2 apps"
    echo "    list apps         List all AIDocs Apps"                                   # .(50303.01.1 )
    echo "    start all         Start all Apps in ${aRepo}"
    echo "    {App} start       Start an {App} in ${aRepo}"
    echo "    {App} stop        Suspend a running {App}"
    echo "    {App} restart     Restart a suspended {App}"
    echo "    {App} kill        Delete {App} from PM2's memory"
    echo "    {App} info        Display {App} properties"
    echo "    {App} logs {Cnt}  Display stream of last {Cnt} log lines"
    echo "    save              Save PM2 configuration for startup"
    exit_wCR
    }
# -----------------------------------------------------

function doAll() {
    local aApps=$1                              # Comma-separated list of apps (e.g., "app1,app2,app3")
    local aCmd=$2                               # Command to execute (e.g., "run")
    local script_path="$(realpath "$0")"
    if [ "${aCmd}" == "" ]; then echo ""; help 2; exit; fi

    IFS=',' read -r -a apps_array <<< "$aApps"  # Split the comma-separated list into an array

    for app in "${apps_array[@]}"; do           # Loop through each app in the list
        app=$( echo "$app" | xargs )            # Trim whitespace from the app name
        if [ -n "$app" ]; then                  # Check if the app name is not empty
#       echo -e "\n  calling $script_path   $app   $aCmd"
            bash "$script_path" "$app" "$aCmd"  # Call the script with its full path, the current app, and the command
        fi
    done
    }
# -----------------------------------------------------

function  setDir() {
    if [ "${1:0:3}"      == "all"  ]; then aApp="all"; fi
    if [ "${1:0:3}"      == "c16"  ]; then aApp="c16"; aName="AIDocs_${aOwnr}-8017"; aPort="8016"; aAppDir="client1/c16_aidocs-review-app"; fi
    if [ "${1:0:3}"      == "c17"  ]; then aApp="c17"; aName="AIDocs_${aOwnr}-8016"; aPort="8017"; aAppDir="client1/c17_aidocs-review-backup"; fi
    if [ "${1:0:3}"      == "s21"  ]; then aApp="s21"; aName="AIDocs_${aOwnr}-8121"; aPort="8121"; aAppDir="server2/s21_first-api"; fi
#   echo "  aApp: '${aApp}', aName: '${aName}', aAppDir='${aAppDir}', aArg2: '${aArg2}'" ; # exit
#   echo "  aDir: '${__basedir}/${aAppDir}'" ; # exit
    if [ ! -d "${__basedir}/${aAppDir}" ]; then
    echo -e "\n* Can't find an App folder for ${1:0:3}."
    exit_wCR
    fi
#   echo "    cd: '${__basedir}/${aAppDir}'"
    cd "${__basedir}/${aAppDir}" || exit_wCR
    if [ "$2" == "-quiet" ]; then return; fi
    echo "  The current App  folder is: ./${aAppDir}"
    }
# -----------------------------------------------------

function listApps() {
    cd "${__baseDir}"
    rdir -r 2 -s 3 "[cs][0-9][0-9]_" -x '!|\/data|\/docs'
    }
# -----------------------------------------------------

function doPM2() {
#   aPython="$( which python3 )"
#   aCmd="${2/python3/${aPython}}"
 if [ "$1" == "start" ]; then
    echo "  pm2 start ecosystem.config.js --only \"${aName}\""; echo ""
            pm2 start ../../ecosystem.config.js --only  "${aName}"
 else
    echo "  pm2 $1 \"${aName}\" $3 $4"; echo ""
            pm2 $1 "${aName}"   $3 $4
    fi
    }
# -----------------------------------------------------

    if [ "${aArg2:0:4}"  == "save" ]; then doPM2 save;   exit_wCR; fi
    if [ "${aArg2:0:4}"  == "stat" ]; then doPM2 status; exit_wCR; fi
    if [ "${aArg2:0:4}"  == "list" ]; then listApps;     exit_wCR; fi
#   if [ "${aArg2:0:4}"  == "star" ]; then aApp="all"; fi

          setDir ${aArg1} -quiet
    if [ "${aApp}"       == ""     ]; then help; exit; fi
    if [ "${aApp}"       == "all"  ]; then doAll "c16,c17" ${aArg2}; exit; fi

#   cd "${__basedir}/${aAppDir}"
    if [ "${aArg2:0:4}"  == "star" ]; then bCmd="1";
         if [ "${aApp}"  == "c16"  ]; then setDir c16; doPM2 start "python3 -m http.server ${aPort}" --name "${aName}"; fi
         if [ "${aApp}"  == "c17"  ]; then setDir c17; doPM2 start "python3 -m http.server ${aPort}" --name "${aName}"; fi
         if [ "${aApp}"  == "s21"  ]; then setDir s21; doPM2 start "server.mjs" ${aPort}             --name "${aName}"; fi
    fi
    echo ""
    if [ "${aArg2:0:4}"  == "save" ]; then bCmd="1";   doPM2 save;    fi
    if [ "${aArg2:0:4}"  == "stat" ]; then bCmd="1";   doPM2 status;  fi
    if [ "${aArg2:0:4}"  == "list" ]; then bCmd="1";   listApps;    fi
    if [ "${aArg2:0:4}"  == "stop" ]; then bCmd="1";   doPM2 stop    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "rest" ]; then bCmd="1";   doPM2 restart "${aName}"; fi
    if [ "${aArg2:0:4}"  == "info" ]; then bCmd="1";   doPM2 info    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "kill" ]; then bCmd="1";   doPM2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "dele" ]; then bCmd="1";   doPM2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "logs" ]; then bCmd="1";   doPM2 logs    "${aName}" --lines $${aArg3}; fi

    if [ "${bCmd}" != "1" ]; then help 2; exit; fi
         exit_wCR

# ------------------------------------------------------------------------------
