target = releases/$(shell date +%Y%m%d%H%M%S)

build:
	mkdir -pv $(target)/locales
	npm run build
	go build -o $(target)/itpkg -ldflags "-s" app.go
	-cp -r public .vars config.yml $(target)/
	-rm ${target}/public/stats.json
	for i in base; do \
		cp -v ../$$i/locales.properties $(target)/locales/$$i.properties; \
	done
	sed -i 's/development/production/g' $(target)/.vars


update:
	go get -u all
	npm install



clean:
	-rm -r releases public



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


