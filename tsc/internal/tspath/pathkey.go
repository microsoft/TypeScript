package tspath

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
)

// PathKey is a canonical key for a rooted, normalized path under a
// caller-selected CaseSensitivity. Keys are comparable only when they use the
// same CaseSensitivity. A PathKey is for comparison and lookup, and must not be
// used as a RootedPath because canonicalization may have changed its casing.
// The zero value is a valid sentinel. PathKey does not assert that the path
// exists.
type PathKey string

// PathKeyFromCanonical constructs a PathKey from text whose CaseSensitivity has
// already been applied. It validates that a non-empty path is rooted and
// normalized; the empty path is accepted as the sentinel value.
func PathKeyFromCanonical(path string) PathKey {
	result, ok := TryPathKeyFromCanonical(path)
	if !ok {
		panic("path must be normalized")
	}
	return result
}

// TryPathKeyFromCanonical constructs a PathKey from text whose CaseSensitivity
// has already been applied. It validates that a non-empty path is rooted and
// normalized; the empty path is accepted as the sentinel value.
func TryPathKeyFromCanonical(path string) (PathKey, bool) {
	if path == "" {
		return "", true
	}
	if _, ok := TryRootedPathFromNormalized(path); !ok {
		return "", false
	}
	return PathKey(path), true
}

// PathKey returns the canonical key for an already rooted, normalized path
// under c.
func (c CaseSensitivity) PathKey(path RootedPath) PathKey {
	if IsEncodedDynamicFileName(path.AsString()) {
		return PathKey(canonicalDynamicURIPath(path.AsString()))
	}
	return PathKey(c.Canonicalize(string(path)))
}

func (p PathKey) AsString() string {
	return string(p)
}

// Parent returns the lexical parent key. Root keys are fixed points, while the
// parent of a single-component relative key is the empty key.
func (p PathKey) Parent() PathKey {
	return PathKey(getDirectoryPathFromNormalized(string(p)))
}

func (p PathKey) RemoveTrailingDirectorySeparator() PathKey {
	return PathKey(RemoveTrailingDirectorySeparator(string(p)))
}

func (p PathKey) Extension() string {
	return TryGetExtensionFromPath(string(p))
}

func (p PathKey) ExtensionIsOneOf(extensions []string) bool {
	return FileExtensionIsOneOf(string(p), extensions)
}

func (p PathKey) HasJSFileExtension() bool {
	return HasJSFileExtension(string(p))
}

func (p PathKey) BaseName() string {
	return getBaseFileNameFromNormalized(string(p))
}

func (p PathKey) IsDynamic() bool {
	return IsDynamicFileName(string(p))
}

func (p PathKey) CaseInsensitiveKey() PathKey {
	if IsEncodedDynamicFileName(string(p)) {
		return p
	}
	return PathKey(ToFileNameLowerCase(string(p)))
}

// AppendCanonicalComponent appends an already canonical path component.
func (p PathKey) AppendCanonicalComponent(component string) PathKey {
	if p == "" {
		panic("cannot append a component to an empty path key")
	}
	if component == "" || strings.ContainsAny(component, `/\`) || component == "." || component == ".." {
		panic("invalid canonical path component")
	}
	var result string
	if HasTrailingDirectorySeparator(string(p)) {
		result = string(p) + component
	} else {
		result = string(p) + "/" + component
	}
	return PathKeyFromCanonical(result)
}

// AppendCanonicalSuffix appends a suffix that is already canonical under the
// CaseSensitivity used to construct p.
func (p PathKey) AppendCanonicalSuffix(suffix string) PathKey {
	if p == "" && suffix != "" {
		panic("cannot append a suffix to an empty path key")
	}
	if strings.ContainsAny(suffix, `/\`) {
		panic("path suffix must not contain a directory separator")
	}
	return PathKeyFromCanonical(string(p) + suffix)
}

// SplitAtCanonicalComponent finds component and returns the path before it and
// the path through it. Both results retain the key's canonical casing.
func (p PathKey) SplitAtCanonicalComponent(component string) (before PathKey, through PathKey, ok bool) {
	if component == "" || strings.ContainsAny(component, `/\`) || component == "." || component == ".." {
		panic("invalid canonical path component")
	}
	needle := "/" + component
	path := string(p)
	rootLength := GetRootLength(path)
	if rootLength == 0 {
		return "", "", false
	}
	for offset := rootLength - 1; ; {
		index := strings.Index(path[offset:], needle)
		if index == -1 {
			return "", "", false
		}
		index += offset
		end := index + len(needle)
		if end == len(path) || path[end] == DirectorySeparator {
			beforeEnd := max(index, rootLength)
			return PathKey(path[:beforeEnd]), PathKey(path[:end]), true
		}
		offset = end
	}
}

// ContainsLowercaseDirectorySequence checks a slash-delimited lowercase
// component sequence that includes both its leading and trailing separators.
func (p PathKey) ContainsLowercaseDirectorySequence(sequence string) bool {
	return strings.Contains(string(p), sequence)
}

// ContainsPath checks whether child is contained within or equal to p.
// Both keys must have been created with the same CaseSensitivity.
func (p PathKey) ContainsPath(child PathKey) bool {
	if len(p) == 0 {
		return false
	}
	parent := string(p)
	childText := string(child)
	parentRootLength := GetRootLength(parent)
	childRootLength := GetRootLength(childText)
	parentRoot := parent[:parentRootLength]
	childRoot := childText[:childRootLength]
	dynamic := IsEncodedDynamicFileName(parent) || IsEncodedDynamicFileName(childText)
	if dynamic {
		parentRoot = strings.TrimSuffix(parentRoot, string(DirectorySeparator))
		childRoot = strings.TrimSuffix(childRoot, string(DirectorySeparator))
	}
	rootsEqual := stringutil.EquateStringCaseInsensitive(parentRoot, childRoot)
	if dynamic {
		rootsEqual = parentRoot == childRoot
	}
	if !rootsEqual {
		return false
	}
	parentRest := parent[parentRootLength:]
	childRest := childText[childRootLength:]
	return parentRest == childRest ||
		len(childRest) > len(parentRest) &&
			strings.HasPrefix(childRest, parentRest) &&
			(parentRest == "" || parentRest[len(parentRest)-1] == '/' || childRest[len(parentRest)] == '/')
}

// ForEachAncestorPathKey calls callback for path and each of its ancestors.
func ForEachAncestorPathKey[T any](path PathKey, callback func(path PathKey) (result T, stop bool)) (result T, ok bool) {
	for {
		result, stop := callback(path)
		if stop {
			return result, true
		}
		parent := path.Parent()
		if parent == path {
			var zero T
			return zero, false
		}
		path = parent
	}
}
