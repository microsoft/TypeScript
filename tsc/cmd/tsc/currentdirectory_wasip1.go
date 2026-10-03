//go:build wasip1

package main

import (
	"os"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func getCurrentDirectory() (string, error) {
	cwd := os.Getenv("PWD")
	if !tspath.IsRootedDiskPath(cwd) {
		cwd = "/"
	}
	return cwd, nil
}
