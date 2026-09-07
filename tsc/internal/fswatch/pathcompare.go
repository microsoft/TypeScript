package fswatch

import "strings"

type pathComparer struct {
	ignoreCase bool
}

func (c pathComparer) equal(a, b string) bool {
	return a == b || c.ignoreCase && strings.EqualFold(a, b)
}

// suffix returns the part of path below root, respecting directory boundaries.
// Comparing components avoids assuming case-equivalent UTF-8 strings have the
// same byte length.
func (c pathComparer) suffix(root, path string) (string, bool) {
	if isInDirectoryOrSelf(root, path) {
		return path[len(root):], true
	}
	if !c.ignoreCase || root == "" {
		return "", false
	}
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
	suffix, ok := c.suffix(from, path)
	if !ok {
		return "", false
	}
	return joinPathSuffix(to, suffix), true
}
