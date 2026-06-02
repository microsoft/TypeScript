package fswatch

import (
	"errors"
	"io/fs"
	"os"
	"path/filepath"
	"syscall"
)

// walkDirGeneric is the portable walkDir implementation. It is used as the
// primary implementation on platforms without a native version, and is
// tested on all platforms.
func walkDirGeneric(dir string, recursive bool, fn func(path string, isDir bool) error) error {
	info, err := os.Lstat(dir)
	if err != nil {
		return err
	}
	if !info.IsDir() {
		return syscall.ENOTDIR
	}
	return walkDirGenericVisit(dir, recursive, fn)
}

func walkDirGenericVisit(dir string, recursive bool, fn func(path string, isDir bool) error) error {
	entries, err := os.ReadDir(dir)
	if err != nil {
		if errors.Is(err, fs.ErrPermission) || errors.Is(err, fs.ErrNotExist) {
			return nil
		}
		return err
	}
	if fn != nil {
		if err := fn(dir, true); err != nil {
			return err
		}
	}
	for _, e := range entries {
		path := dir + string(filepath.Separator) + e.Name()
		if e.IsDir() {
			if recursive {
				if err := walkDirGenericVisit(path, recursive, fn); err != nil {
					return err
				}
			} else if fn != nil {
				if err := fn(path, true); err != nil {
					return err
				}
			}
		} else if fn != nil {
			if err := fn(path, false); err != nil {
				return err
			}
		}
	}
	return nil
}
