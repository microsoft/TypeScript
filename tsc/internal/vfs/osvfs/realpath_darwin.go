package osvfs

import (
	"path/filepath"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/internal"
	"golang.org/x/sys/unix"
)

// Darwin's Realpath preserves non-symlink component spellings. An authoritative
// lstat of the requested leaf therefore lets ordinary siblings share their
// parent's resolution, without enumerating directories or guessing from absent
// entries. Other platforms retain their native casing and reparse-point rules.
func (vfs *osFS) RealpathWithParent(path string, realpath func(string) string) string {
	_ = internal.RootLength(path) // Assert path is rooted
	if filepath.Clean(path) != path {
		return vfs.Realpath(path)
	}
	release := blockingOpSema.Acquire()
	var info unix.Stat_t
	err := unix.Lstat(path, &info)
	release()
	if err != nil {
		// FS.Realpath returns the entire original name on failure, including
		// missing leaves beneath a symlinked parent.
		return path
	}
	if info.Mode&unix.S_IFMT == unix.S_IFLNK {
		return vfs.Realpath(path)
	}
	parent := tspath.GetDirectoryPath(path)
	if parent == path {
		return path
	}
	return tspath.CombinePaths(realpath(parent), tspath.GetBaseFileName(path))
}
