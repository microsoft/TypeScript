package fswatch

import (
	"strings"
	"unicode/utf8"
)

type pathComparer struct {
	ignoreCase bool
}

// Watch roots are prepared before publication and are immutable thereafter.
// Event paths are local to one routing operation and folded only on demand.
type comparisonPath struct {
	path   string
	folded string
	ready  bool
	cache  *comparisonCache
}

// Shared only within a synchronous callback/termination pass, never published
// to a subscriber or stored on a watch.
type comparisonCache map[string]string

func (c pathComparer) prepare(path string) comparisonPath {
	p := comparisonPath{path: path}
	if c.ignoreCase && nativePathFolding {
		p.fold()
	}
	return p
}

func (p *comparisonPath) fold() string {
	if !p.ready {
		if p.cache != nil {
			if folded, ok := (*p.cache)[p.path]; ok {
				p.folded, p.ready = folded, true
				return folded
			}
		}
		p.folded = foldNativePath(p.path)
		p.ready = true
		if p.cache != nil {
			if *p.cache == nil {
				*p.cache = make(comparisonCache)
			}
			(*p.cache)[p.path] = p.folded
		}
	}
	return p.folded
}

// suffix returns the part of path below root, respecting directory boundaries.
func (c pathComparer) suffix(root, path string) (string, bool) {
	p := comparisonPath{path: path}
	return c.suffixPrepared(comparisonPath{path: root}, &p)
}

func (c pathComparer) suffixPrepared(root comparisonPath, path *comparisonPath) (string, bool) {
	if isInDirectoryOrSelf(root.path, path.path) {
		return path.path[len(root.path):], true
	}
	if !c.ignoreCase || root.path == "" {
		return "", false
	}
	suffix, ok, unicode := pathSuffixASCII(root.path, path.path)
	if !unicode {
		return suffix, ok
	}
	return c.suffixUnicode(root, path)
}

func (c pathComparer) suffixUnicode(root comparisonPath, path *comparisonPath) (string, bool) {
	if !nativePathFolding {
		return pathSuffixFoldUnicode(root.path, path.path)
	}
	a, b := root.fold(), path.fold()
	if a == "" || b == "" {
		// CFString cannot represent invalid UTF-8. Retain the simple-fold
		// behavior for malformed paths rather than truncating or losing bytes.
		return pathSuffixFoldUnicode(root.path, path.path)
	}
	if !isInDirectoryOrSelf(a, b) {
		return "", false
	}
	if a == b {
		return "", true
	}
	// Folding and canonical normalization preserve separators, but not byte
	// lengths. Find the matching boundary in the original event, not its fold.
	offset := 0
	separators := strings.Count(root.path, "/")
	trailingSeparator := root.path[len(root.path)-1] == '/'
	if !trailingSeparator {
		separators++
	}
	for range separators {
		i := strings.IndexByte(path.path[offset:], '/')
		if i < 0 {
			panic("fswatch: folded path lost a directory boundary")
		}
		offset += i + 1
	}
	if trailingSeparator {
		return path.path[offset:], true
	}
	return path.path[offset-1:], true
}

// The third result requests Unicode comparison; an ASCII rejection must not
// reject an expanding alias just because the other spelling is ASCII.
func pathSuffixASCII(root, path string) (string, bool, bool) {
	i := 0
	// Skip shared prefixes a word at a time, which is common when routing an
	// event past sibling watches. String slice comparisons do not allocate.
	for i+8 <= len(root) && i+8 <= len(path) && root[i:i+8] == path[i:i+8] {
		i += 8
	}
	for ; i < len(root) && i < len(path); i++ {
		a, b := root[i], path[i]
		if a >= utf8.RuneSelf || b >= utf8.RuneSelf {
			return "", false, true
		}
		if a == b {
			continue
		}
		a |= 0x20
		b |= 0x20
		if a != b || a < 'a' || a > 'z' {
			return "", false, false
		}
	}
	if i == len(root) && (i == len(path) || path[i] == '/') {
		return path[i:], true, false
	}
	return "", false, i < len(root) && root[i] >= utf8.RuneSelf || i < len(path) && path[i] >= utf8.RuneSelf
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
	p := comparisonPath{path: path}
	return c.rebasePrepared(&p, comparisonPath{path: from}, to)
}

func (c pathComparer) rebasePrepared(path *comparisonPath, from comparisonPath, to string) (string, bool) {
	if isInDirectoryOrSelf(from.path, path.path) {
		return rebasePath(path.path, from.path, to), true
	}
	if !c.ignoreCase || from.path == "" {
		return "", false
	}
	suffix, ok, unicode := pathSuffixASCII(from.path, path.path)
	if unicode {
		suffix, ok = c.suffixUnicode(from, path)
	}
	if !ok {
		return "", false
	}
	return joinPathSuffix(to, suffix), true
}
