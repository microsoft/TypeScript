//go:build !(darwin && (amd64 || arm64))

package fswatch

// canonicalizePath is a no-op on platforms whose watchers report paths
// using the same bytes the caller provided. See canonicalize_darwin.go
// for the rationale on macOS.
func canonicalizePath(p string) string { return p }
