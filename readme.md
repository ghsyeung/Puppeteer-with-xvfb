There are many ways to run the script, since we cannot go over all possible ways, here we suggest the following ways.

# PM2 Process Manager
It will take care of concurrency and fallback problems. It will run Xvfb for you, with a fake display, so headless:false can be run perfectly. There are some dependencies needed, check the dockerfile for those.

- You can install it using `npm i -g pm2`, 
- and then run with `pm2 start process.json` on this folder.

# Dockerfile
If you run the dockerfile with `sh start.sh`, it will install all dependencies, run xvfb, script, and remove once it is exited. You can edit that file and change behavior to --restart always to make sure it restarts on error.