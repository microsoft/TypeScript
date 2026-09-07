package fswatch

import (
	"strings"
	"unicode/utf8"
)

type pathComparer struct {
	ignoreCase bool
}

func (c pathComparer) equal(a, b string) bool {
	return a == b || c.ignoreCase && strings.EqualFold(a, b)
}

// suffix returns the part of path below root, respecting directory boundaries.
func (c pathComparer) suffix(root, path string) (string, bool) {
	if isInDirectoryOrSelf(root, path) {
		return path[len(root):], true
	}
	if !c.ignoreCase || root == "" {
		return "", false
	}
	return pathSuffixFold(root, path)
}

func pathSuffixFold(root, path string) (string, bool) {
	i := 0
	// Skip shared prefixes a word at a time, which is common when routing an
	// event past sibling watches. String slice comparisons do not allocate.
	for i+8 <= len(root) && i+8 <= len(path) && root[i:i+8] == path[i:i+8] {
		i += 8
	}
	for ; i < len(root) && i < len(path); i++ {
		a, b := root[i], path[i]
		if a >= utf8.RuneSelf || b >= utf8.RuneSelf {
			// A skipped word may end inside a rune. Restart this component
			// rather than interpreting a partial UTF-8 encoding.
			i = strings.LastIndexByte(root[:i], '/') + 1
			return pathSuffixFoldUnicode(root[i:], path[i:])
		}
		if a == b {
			continue
		}
		a |= 0x20
		b |= 0x20
		if a != b || a < 'a' || a > 'z' {
			return "", false
		}
	}
	if i == len(root) && (i == len(path) || path[i] == '/') {
		return path[i:], true
	}
	return "", false
}

// Comparing the remaining components avoids assuming case-equivalent UTF-8
// strings have the same byte length (for example, s and long s).
func pathSuffixFoldUnicode(root, path string) (string, bool) {
	for {
		rootPart, rootRest, rootMore := strings.Cut(root, "/")
		pathPart, pathRest, pathMore := strings.Cut(path, "/")
		if !strings.EqualFold(rootPart, pathPart) {
			return "", false
		}
		if !rootMore {
			if pathMore {
				return path[len(pathPart):], true
			}
			return "", true
		}
		if !pathMore {
			return "", false
		}
		root, path = rootRest, pathRest
	}
}

func (c pathComparer) contains(root, path string) bool {
	_, ok := c.suffix(root, path)
	return ok
}

func (c pathComparer) rebase(path, from, to string) (string, bool) {
	if isInDirectoryOrSelf(from, path) {
		return rebasePath(path, from, to), true
	}
	if !c.ignoreCase || from == "" {
		return "", false
	}
	suffix, ok := pathSuffixFold(from, path)
	if !ok {
		return "", false
	}
	return joinPathSuffix(to, suffix), true
}
