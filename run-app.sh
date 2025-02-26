#!/bin/bash

         aOwnr="Rick"
         aRepo="AIDocs_dev02-rjs"

       __basedir="/home/shared/repos/${aRepo}"

         aArg1=$1; aArg2=$2; aArg3=$3
if [ "${#aArg1}" != "3" ]; then
         aArg1=$2; aArg2=$1; fi
#echo "  aArg1: '${aArg1:0:3}', aArg2: '${aArg2:0:4}'"; # exit

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
    echo "  Use ${aIt} with any of the following PM2 commands:"
    echo "    status            Show all running PM2 apps"
    echo "    start all         Start all Apps in ${aRepo}"
    echo "    {App} start       Start an {App} in ${aRepo}"
    echo "    {App} stop        Suspend a running {App}"
    echo "    {App} restart     Restart a suspended {App}"
    echo "    {App} kill        Delete {App} from PM2's memory"
    echo "    {App} info        Display {App} properties"
    echo "    {App} logs {Cnt}  Display stream of last {Cnt} log lines"
    echo "    save              Save PM2 configuration for startup"
    echo ""
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
    if [ "${1:0:3}"      == "c16"  ]; then aApp="c16"; aName="AIDocs_${aOwnr}-c16"; aPort="8016"; aAppDir="client1/c16_aidocs-review-app"; fi
    if [ "${1:0:3}"      == "c17"  ]; then aApp="c17"; aName="AIDocs_${aOwnr}-c17"; aPort="8099"; aAppDir="client1/c17_aidocs-review-backup"; fi
    if [ "${1:0:3}"      == "s99"  ]; then aApp="";    aName="AIDocs_${aOwnr}-s99"; aPort="8199"; aAppDir="server9/s99_server-api"; fi
#   echo "  aApp:  '${aApp}', aName: '${aName}', aAppDir='${aAppDir}', aArg2: '${aArg2}'" ; # exit
    cd "${__basedir}/${aAppDir}"
    }

    if [ "${aArg2:0:4}"  == "save" ]; then pm2 save;   echo ""; exit; fi
    if [ "${aArg2:0:4}"  == "stat" ]; then pm2 status; echo ""; exit; fi
#   if [ "${aArg2:0:4}"  == "star" ]; then aApp="all"; fi

          setDir ${aArg1}
    if [ "${aApp}"       == ""     ]; then help; exit; fi
    if [ "${aApp}"       == "all"  ]; then doAll "c16,c17" ${aArg2}; exit; fi

#   cd "${__basedir}/${aAppDir}"
    if [ "${aArg2:0:4}"  == "star" ]; then bCmd="1";
         if [ "${aApp}"  == "c16"  ]; then setDir c16; pm2 start "python3 -m http.server ${aPort}" --name "${aName}"; fi
         if [ "${aApp}"  == "c17"  ]; then setDir c17; pm2 start "python3 -m http.server ${aPort}" --name "${aName}"; fi
         if [ "${aApp}"  == "s99"  ]; then setDir s99; pm2 start "server.mjs" ${aPort}             --name "${aName}"; fi
    fi
    echo ""
    if [ "${aArg2:0:4}"  == "save" ]; then bCmd="1";   pm2 save;    fi
    if [ "${aArg2:0:4}"  == "stat" ]; then bCmd="1";   pm2 status;  fi
    if [ "${aArg2:0:4}"  == "stop" ]; then bCmd="1";   pm2 stop    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "rest" ]; then bCmd="1";   pm2 restart "${aName}"; fi
    if [ "${aArg2:0:4}"  == "info" ]; then bCmd="1";   pm2 info    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "kill" ]; then bCmd="1";   pm2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "dele" ]; then bCmd="1";   pm2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "logs" ]; then bCmd="1";   pm2 logs    "${aName}" --lines $${aArg3}; fi

    if [ "${bCmd}" != "1" ]; then help 2; exit; fi
    echo ""

# ------------------------------------------------------------------------------
