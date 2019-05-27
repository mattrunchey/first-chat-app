This is a stitched-together app from the blog posted [here](https://revs.runtime-revolution.com/a-simple-real-time-chat-with-django-channels-and-react-b73edc3a79f2), with the goal being to enable development without installing anything on your local system. That is, you should be able to run the entire application on any system as long as you have `docker` and `docker-compose` installed, and running the following two commands:

```
docker-compose build
docker-compose up
```

I've been currently facing at least a few troubles. Installing it locally (on Windows 10) seems to work relatively well, but attempting to clone the repo to a GCE instance with Debian doesn't seem to want to work all the way. Between failures to mount and node-sass issues, one thing or the other fails to work.



## Notes

- the django settings.py file allows all hosts. 
