//go:build !windows && !linux && !darwin

package nativepath

import "path/filepath"

func Realpath(path string) (string, error) {
	return filepath.EvalSymlinks(path)
}
