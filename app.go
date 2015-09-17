package main

import (
	_ "github.com/itpkg/base"
	"github.com/itpkg/web"
	//_ "github.com/itpkg/cms"
	//_ "github.com/itpkg/email"
	_ "github.com/lib/pq"
)

func main() {
	web.Run()
}
