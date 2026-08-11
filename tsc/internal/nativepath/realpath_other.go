//go:build !windows && !linux

package nativepath

import "path/filepath"

func Realpath(path string) (string, error) {
	return filepath.EvalSymlinks(path)
}
