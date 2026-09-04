//go:build !wasip1

package main

import "os"

func getCurrentDirectory() (string, error) {
	return os.Getwd()
}
