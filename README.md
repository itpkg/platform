IT-PACKAGE(ror version)
--------------------------------

## Using by docker

### For mac(https://docs.docker.com/installation/mac/)
    boot2docker init
    boot2docker start
    eval "$(boot2docker shellinit)"
### For linux
    pacman -S docker
    gpasswd -a YOUR_NAME docker # then need relogin.


### First run
    docker pull chonglou/itpkg
    docker run -d --name itpkg -p 2222:22 -p 443:443 -p 8080:8080 -P --privileged -v /sys/fs/cgroup:/sys/fs/cgroup:ro chonglou/itpkg:latest

### Other commands
    docker ps
    docker start itpkg         # start itpkg 
    docker stop itpkg          # stop itpkg
    firefox https://localhost  # open in web browser
    ssh -p 2222 root@localhost # password is changeme


## Notes

### rails
    rails plugin new NAME --mountable
    rake railties:install:migrations


