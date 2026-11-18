//go:build !(darwin && (amd64 || arm64))

package fswatch

const nativePathFolding = false

func foldNativePath(string) string {
	panic("fswatch: native path folding is only available on Darwin")
}

// canonicalizePath is a no-op on platforms whose watchers report paths
// using the same bytes the caller provided. See canonicalize_darwin.go
// for the rationale on macOS.
func canonicalizePath(p string) string { return p }

func (w *watcher) pathComparer(dir string) (pathComparer, error) {
	return pathComparer{}, nil
}

// PathComparerForPath returns exact comparison on platforms without native
// Darwin watch aliases. It does not inspect the host filesystem.
func PathComparerForPath(path string) (PathComparer, error) {
	return PathComparer{}, nil
}
