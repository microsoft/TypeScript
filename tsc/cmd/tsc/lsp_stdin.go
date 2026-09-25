//go:build !wasip1

package main

import (
	"os"
)

var stdioStdin = os.Stdin
