#!/bin/sh -x
# wait for PSQL server to start
sleep 5

yarn install
yarn start
