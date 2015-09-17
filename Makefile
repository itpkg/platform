target=release

build:
	npm install
	npm run release
	go build -o $(target)/itpkg -ldflags "-s" app.go
	-cp -r locales assets .vars config.yml $(target)/
	-rm release/assets/stats.json
	sed -i 's/development/production/g' $(target)/.vars



clean:
	-rm -r $(target) assets



format:
	for i in web base cms email platform; do \
		cd ../$$i && gofmt -w *.go; \
	done



publish:
	for i in web base cms email platform deploy; do \
		cd ../$$i && git checkout master && git merge development && git push && git checkout development; \
	done


reset:
	for i in drop create migrate seed; do \
		go run app.go db:$$i; \
	done


