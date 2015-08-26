IT-PACKAGE(go version)
--------------------------------

## Using by local

### Install golang
    bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer) # Or if you are using zsh just change bash with zsh
    gvm install go1.5
    gvm use go1.5 --default

### Install 
    go get github.com/itpkg/platform
    cd $GOPATH/src/github.com/itpkg/
    make
    cd release
    vi .vars
    vi config.yml

### Setup and start
    source .vars
    ./itpkg db:create
    ./itpkg db:migrate
    ./itpkg assets:import
    ./itpkg server


    


