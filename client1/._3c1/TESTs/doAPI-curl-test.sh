#!/bin/bash

  aHost="http://155.138.193.41:3001"
  aWorkspace="visitor1-workspace"
  aAPI="api/v1/workspace/${aWorkspace}/chat"
  aANYLLM_API_KEY="6Q5P8YR-JXAMFGB-KGGEZ6T-W94PXE3"
  aPrompt="What is this document about?"
  aPrompt="How will the Biden administration Cut wasteful spending?"
  aPrompt="How will the Biden administration Make the wealthy and corporations pay more tax?"
  aPrompt="What is the gross receipts tax? How does it work?"
# aPrompt="How much is the stock repurchase excise tax?"

  aMode="query"

#curl -X 'POST' \
#  'http://155.138.193.41:3001/api/v1/workspace/visitor1-workspace/chat' \
#  -H 'accept: application/json' \
#  -H 'Authorization: Bearer 6Q5P8YR-JXAMFGB-KGGEZ6T-W94PXE3' \
#  -H 'Content-Type: application/json' \
#  -d '{ "message": "What is AnythingLLM?", "mode": "query" }'

 curl -X 'POST' \
  "${aHost}/${aAPI}" \
  -H "accept: application/json" \
  -H "Authorization: Bearer ${aANYLLM_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{ \"message\": \"${aPrompt}\", \"mode\": \"${aMode}\" }"

exit

aAUTH="Authorization: Bearer ${aANYLLM_API_KEY}"

 aURL="'${aHost}/${aAPI}' -H 'accept: application/json' -H 'Authorization: Bearer ${aANYLLM_API_KEY}' -H 'Content-Type: application/json' -d '{ \"message\": \"${aPrompt}\", \"mode\": \"${aMode}\" }'"
#'http://155.138.193.41:3001/api/v1/workspace/' -H 'accept: application/json' -H 'Authorization: Bearer ' -H 'Content-Type: application/json' -d '{ "message": "", "mode": "" }

# echo "${aURL}"
# echo "${aAUTH}"

 curl -X 'POST' "${aURL}"




