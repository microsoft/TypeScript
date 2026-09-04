package tspath

import "strings"

// RelativePath is a slash-normalized, lexically normalized path without a
// root. Leading parent components and a trailing directory separator are
// permitted. Its zero value is a valid sentinel.
type RelativePath string

// ToRelativePath normalizes a path that is known to be relative.
func ToRelativePath(path string) RelativePath {
	if GetEncodedRootLength(path) != 0 {
		panic("relative path must not be rooted")
	}
	return RelativePath(NormalizePath(path))
}

// RelativePathFromNormalized creates a RelativePath from a value already known
// to be relative and normalized.
func RelativePathFromNormalized(path string) RelativePath {
	if GetEncodedRootLength(path) != 0 || NormalizePath(path) != path {
		panic("relative path must be relative and normalized: " + path)
	}
	return RelativePath(path)
}

func (p RelativePath) AsString() string {
	return string(p)
}

func (p RelativePath) AsModuleSpecifier() ModuleSpecifier {
	return ModuleSpecifier(EnsurePathIsNonModuleName(string(p)))
}

func (p RelativePath) ChangeExtension(extension string) RelativePath {
	validateFileExtension(extension)
	return RelativePath(ChangeExtension(string(p), extension))
}

func (p RelativePath) BaseName() string {
	return getBaseFileNameFromNormalized(string(p))
}

func (p RelativePath) IsParentRelative() bool {
	return p == ".." || strings.HasPrefix(string(p), "../")
}

func (p RelativePath) HasTrailingDirectorySeparator() bool {
	return HasTrailingDirectorySeparator(string(p))
}

func (p RelativePath) WithoutTrailingDirectorySeparator() RelativePath {
	if !p.HasTrailingDirectorySeparator() {
		return p
	}
	return RelativePath(RemoveTrailingDirectorySeparator(string(p)))
}

func (p RelativePath) WithTrailingDirectorySeparator() RelativePath {
	if p == "" || p.HasTrailingDirectorySeparator() {
		return p
	}
	return RelativePath(string(p) + "/")
}

func (c CaseSensitivity) CanonicalRelativePath(path RelativePath) RelativePath {
	return RelativePath(c.Canonicalize(string(path)))
}

func (p RelativePath) requiresResolution() bool {
	return p.IsParentRelative() || HasTrailingDirectorySeparator(string(p))
}

// RelativePathFromDirectory returns the normalized path from directory to
// fileName. It returns false when the paths have different roots.
func (c CaseSensitivity) RelativePathFromDirectory(directory RootedDirectoryPath, fileName RootedFilePath) (RelativePath, bool) {
	return c.RelativePathFromPath(directory, fileName.AsPath())
}

// RelativePathFromPath returns the normalized path from directory to path.
// It returns false when the paths have different roots.
func (c CaseSensitivity) RelativePathFromPath(directory RootedDirectoryPath, rootedPath RootedPath) (RelativePath, bool) {
	path := relativePathFromNormalizedPaths(directory.AsString(), rootedPath.AsString(), c)
	if GetEncodedRootLength(path) != 0 {
		return "", false
	}
	return RelativePath(path), true
}

func (c CaseSensitivity) RelativePathFromFile(from RootedFilePath, to RootedFilePath) (RelativePath, bool) {
	return c.RelativePathFromFileToPath(from, to.AsPath())
}

func (c CaseSensitivity) RelativePathFromFileToPath(from RootedFilePath, to RootedPath) (RelativePath, bool) {
	return c.RelativePathFromPath(from.Directory(), to)
}

func (c CaseSensitivity) RelativePathFromRelativeDirectory(directory RelativePath, fileName RelativePath) RelativePath {
	return RelativePath(relativePathFromNormalizedPaths(directory.AsString(), fileName.AsString(), c))
}
