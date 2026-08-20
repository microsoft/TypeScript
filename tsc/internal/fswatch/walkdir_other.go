//go:build !linux && !windows && !darwin && !freebsd && !openbsd && !netbsd && !dragonfly

package fswatch

func walkDir(dir string, recursive bool, fn func(path string, isDir bool) error) error {
	return walkDirGeneric(dir, recursive, fn)
}
