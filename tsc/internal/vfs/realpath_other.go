//go:build !windows

package vfs

import (
	"path/filepath"
)

func realpath(path string) (string, error) {
	return filepath.EvalSymlinks(path)
}
