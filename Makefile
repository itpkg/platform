target=release

build:
	#npm install
	#npm run release
	#go build -o $(target)/itpkg -ldflags "-s" app.go
	#-cp -r locales assets .vars config.yml $(target)/
	sed -i 's/development/production/g' $(target)/.vars



clean:
	-rm -r $(target) assets


