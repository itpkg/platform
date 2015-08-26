target=release

build:
	#npm run release
	go build -o $(target)/itpkg -ldflags "-s" app.go
	-cp .vars config.yml $(target)/



clean:
	-rm -r $(target)


