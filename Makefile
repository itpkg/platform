target=release

build:
	#npm run release
	go build -o $(target)/itpkg -ldflags "-s" app.go
	-cp -r locales .vars config.yml $(target)/



clean:
	-rm -r $(target)


