//go:build !windows

package osvfs

// Only Windows has reparse points; leave this nil for other OSes.
var isReparsePoint func(path string) bool
