//go:build !wasip1

package main

import (
	"io"
	"os"
)

var lspStdin io.Reader = os.Stdin
