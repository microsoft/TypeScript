//go:build !windows

package nativepath

import "os"

func IsSymlinkOrReparsePoint(path string) bool {
	info, err := os.Lstat(path)
	return err == nil && info.Mode()&os.ModeSymlink != 0
}
