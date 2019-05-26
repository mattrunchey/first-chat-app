#!/bin/sh -x
# wait for PSQL server to start
sleep 5

cd real-time-chat-frontend

yarn install
yarn start
