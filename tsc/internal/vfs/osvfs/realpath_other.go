//go:build !windows

package osvfs

import (
	"path/filepath"
)

func realpath(path string) (string, error) {
	return filepath.EvalSymlinks(path)
}
