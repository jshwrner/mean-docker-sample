# mean-docker-sample
Application build using the MEAN stack and Docker

**To Run image (Note: -v parameter is optional):** 
`docker run -p 4200:4200 -v absolutePathOnHost:pathOnContainer -itd joshnano/angular-simple:x.x.x`

**Example:** 
`docker run -p 4200:4200 -v c:/users/joshwerner.exchange/desktop/docker_shared:/mnt/docker_shared -itd joshnano/angular-simple:1.0.85`

**Notes**
- d = detached mode: docker will run in the background
- p = port: sets port mapping
- it = interactive mode: can execute commands in container
  - i = interactive keeps standard input open
  - t = allocates a terminal
- v = volume: creates shareable volume. Can also create shareable volumes between containers. 
   - This is especially beneficial when there is a need for data to persist after container is stopped or removed

**Installation:** 
**Unix**
- Copy install_unix.sh to machine
- Navigate to that directory using Terminal
- Run `chmod +x install_unix.sh` to make file an executable program
- Run `./install_unix.sh` to initialize/run container(s)

**Windows**
- Note: Must switch Docker to use Windows Containers instead of Linux containers and turn on "experimental features"

