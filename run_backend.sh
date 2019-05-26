#!/bin/sh -x
# wait for PSQL server to start

sleep 5

cd real-time-chat-api

echo $(ls)

# start development server on public ip interface, on port 8000
su -m manager -c "python manage.py migrate"

su -m manager -c "python manage.py runserver 0.0.0.0:8000 --verbosity 3"
