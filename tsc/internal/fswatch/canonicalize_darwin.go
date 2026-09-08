//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"os"

	"golang.org/x/sys/unix"
)

// canonicalizePath normalizes watch keys, subscribed filenames, and incoming
// FSEvents paths to NFC. kqueue retains on-disk child spellings for its fd
// bookkeeping and directory events; on case-insensitive volumes, the native
// path comparer handles normalization differences when filtering WatchFile.
func canonicalizePath(p string) string { return normalizeNFC(p) }

func (w *watcher) pathComparer(dir string) (pathComparer, error) {
	if w.name != "fsevents" && w.name != "kqueue" {
		return pathComparer{}, nil
	}
	// _PC_CASE_SENSITIVE from sys/unistd.h. Query the watched volume rather
	// than assuming every volume mounted on macOS is case-insensitive.
	const pcCaseSensitive = 11
	sensitive, err := unix.Pathconf(dir, pcCaseSensitive)
	if err != nil {
		return pathComparer{}, &os.PathError{Op: "pathconf", Path: dir, Err: err}
	}
	return pathComparer{ignoreCase: sensitive == 0}, nil
}
