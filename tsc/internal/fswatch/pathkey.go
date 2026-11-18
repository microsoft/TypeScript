package fswatch

import (
	"strings"
	"unicode/utf8"
)

// NativePathComparisonAvailable reports whether this platform implements the
// native watch-name comparison. Volume sensitivity is queried separately.
const NativePathComparisonAvailable = nativePathFolding

// PathComparer describes the filename equivalence of a watched volume. Its zero
// value compares bytes exactly. It is immutable and safe to share.
type PathComparer struct {
	comparer pathComparer
}

// Key returns a watch-only comparison key, not a filesystem path or a compiler
// identity. Native Darwin comparers use the same CoreFoundation folding as the
// watcher. Other comparers preserve bytes, including malformed UTF-8.
func (c PathComparer) Key(path string) string {
	if !c.comparer.ignoreCase || !nativePathFolding {
		return path
	}
	if strings.IndexByte(path, 0) >= 0 {
		return path
	}
	if folded := foldNativePath(path); folded != "" {
		return folded
	}
	// Invalid UTF-8 and NUL-containing names are opaque, not Unicode aliases.
	return path
}

// Rebase replaces a matching directory prefix while preserving the spelling and
// byte boundaries of the remaining event path.
func (c PathComparer) Rebase(path, from, to string) (string, bool) {
	if !utf8.ValidString(path) || !utf8.ValidString(from) || strings.IndexByte(path, 0) >= 0 || strings.IndexByte(from, 0) >= 0 {
		return (pathComparer{}).rebase(path, from, to)
	}
	return c.comparer.rebase(path, from, to)
}
