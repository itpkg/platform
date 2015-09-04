package main

import (
	"github.com/itpkg/base"
	_ "github.com/itpkg/cms"
	_ "github.com/itpkg/email"
	_ "github.com/lib/pq"
)

func main() {
	base.Run()
}
