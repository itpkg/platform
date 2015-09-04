target=release

build:
	npm install
	npm run release
	go build -o $(target)/itpkg -ldflags "-s" app.go
	-cp -r locales assets .vars config.yml $(target)/



clean:
	-rm -r $(target)


