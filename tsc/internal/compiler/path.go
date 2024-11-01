package compiler

import (
	"strings"
)

type Path string

// Internally, we represent paths as strings with '/' as the directory separator.
// When we make system calls (eg: LanguageServiceHost.getDirectory()),
// we expect the host to correctly handle paths in our specified format.
const directorySeparator = '/'
const urlSchemeSeparator = "://"

//// Path Tests

// Determines whether a byte corresponds to `/` or `\`.
func isAnyDirectorySeparator(char byte) bool {
	return char == '/' || char == '\\'
}

// Determines whether a path starts with a URL scheme (e.g. starts with `http://`, `ftp://`, `file://`, etc.).
func isUrl(path string) bool {
	return getEncodedRootLength(path) < 0
}

// Determines whether a path is an absolute disk path (e.g. starts with `/`, or a dos path
// like `c:`, `c:\` or `c:/`).
func isRootedDiskPath(path string) bool {
	return getEncodedRootLength(path) > 0
}

// Determines whether a path consists only of a path root.
func isDiskPathRoot(path string) bool {
	rootLength := getEncodedRootLength(path)
	return rootLength > 0 && rootLength == len(path)
}

// Determines whether a path starts with an absolute path component (i.e. `/`, `c:/`, `file://`, etc.).
//
//	```
//	// POSIX
//	pathIsAbsolute("/path/to/file.ext") === true
//	// DOS
//	pathIsAbsolute("c:/path/to/file.ext") === true
//	// URL
//	pathIsAbsolute("file:///path/to/file.ext") === true
//	// Non-absolute
//	pathIsAbsolute("path/to/file.ext") === false
//	pathIsAbsolute("./path/to/file.ext") === false
//	```
func pathIsAbsolute(path string) bool {
	return getEncodedRootLength(path) != 0
}

func hasTrailingDirectorySeparator(path string) bool {
	return len(path) > 0 && isAnyDirectorySeparator(path[len(path)-1])
}

// Combines paths. If a path is absolute, it replaces any previous path. Relative paths are not simplified.
//
//	```
//	// Non-rooted
//	combinePaths("path", "to", "file.ext") === "path/to/file.ext"
//	combinePaths("path", "dir", "..", "to", "file.ext") === "path/dir/../to/file.ext"
//	// POSIX
//	combinePaths("/path", "to", "file.ext") === "/path/to/file.ext"
//	combinePaths("/path", "/to", "file.ext") === "/to/file.ext"
//	// DOS
//	combinePaths("c:/path", "to", "file.ext") === "c:/path/to/file.ext"
//	combinePaths("c:/path", "c:/to", "file.ext") === "c:/to/file.ext"
//	// URL
//	combinePaths("file:///path", "to", "file.ext") === "file:///path/to/file.ext"
//	combinePaths("file:///path", "file:///to", "file.ext") === "file:///to/file.ext"
//	```
func combinePaths(firstPath string, paths ...string) string {
	// TODO (drosen): There is potential for a fast path here.
	// In the case where we find the last absolute path and just path.Join from there.
	result := normalizeSlashes(firstPath)

	for _, trailingPath := range paths {
		if trailingPath == "" {
			continue
		}
		trailingPath = normalizeSlashes(trailingPath)
		if result == "" || getRootLength(trailingPath) != 0 {
			// `trailingPath` is absolute.
			result = trailingPath
		} else {
			// Could use
			//  result = path.Join(result, trailingPath)
			// but that collapses `..` and prior segments,
			// which is not necessarily compatible with how combinePaths
			// was originally implemented.

			result = ensureTrailingDirectorySeparator(result) + trailingPath
		}
	}
	return result
}

func getPathComponents(path string, currentDirectory string) []string {
	path = combinePaths(currentDirectory, path)
	return pathComponents(path, getRootLength(path))
}

func pathComponents(path string, rootLength int) []string {
	root := path[:rootLength]
	rest := strings.Split(path[rootLength:], "/")
	if len(rest) > 0 && rest[len(rest)-1] == "" {
		rest = rest[:len(rest)-1]
	}
	return append([]string{root}, rest...)
}

func isVolumeCharacter(char byte) bool {
	return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}

func getFileUrlVolumeSeparatorEnd(url string, start int) int {
	if len(url) <= start {
		return -1
	}
	ch0 := url[start]
	if ch0 == ':' {
		return start + 1
	}
	if ch0 == '%' && len(url) > start+2 && url[start+1] == '3' {
		ch2 := url[start+2]
		if ch2 == 'a' || ch2 == 'A' {
			return start + 3
		}
	}
	return -1
}

func getEncodedRootLength(path string) int {
	ln := len(path)
	if ln == 0 {
		return 0
	}
	ch0 := path[0]

	// POSIX or UNC
	if ch0 == '/' || ch0 == '\\' {
		if ln == 1 || path[1] != ch0 {
			return 1 // POSIX: "/" (or non-normalized "\")
		}

		offset := 2
		p1 := strings.IndexByte(path[offset:], ch0)
		if p1 < 0 {
			return ln // UNC: "//server" or "\\server"
		}

		return p1 + offset + 1 // UNC: "//server/" or "\\server\"
	}

	// DOS
	if isVolumeCharacter(ch0) && ln > 1 && path[1] == ':' {
		if ln == 2 {
			return 2 // DOS: "c:" (but not "c:d")
		}
		ch2 := path[2]
		if ch2 == '/' || ch2 == '\\' {
			return 3 // DOS: "c:/" or "c:\"
		}
	}

	// URL
	schemeEnd := strings.Index(path, urlSchemeSeparator)
	if schemeEnd != -1 {
		authorityStart := schemeEnd + len(urlSchemeSeparator)
		authorityLength := strings.Index(path[authorityStart:], "/")
		if authorityLength != -1 { // URL: "file:///", "file://server/", "file://server/path"
			authorityEnd := authorityStart + authorityLength

			// For local "file" URLs, include the leading DOS volume (if present).
			// Per https://www.ietf.org/rfc/rfc1738.txt, a host of "" or "localhost" is a
			// special case interpreted as "the machine from which the URL is being interpreted".
			scheme := path[:schemeEnd]
			authority := path[authorityStart:authorityEnd]
			if scheme == "file" && (authority == "" || authority == "localhost") && (len(path) > authorityEnd+2) && isVolumeCharacter(path[authorityEnd+1]) {
				volumeSeparatorEnd := getFileUrlVolumeSeparatorEnd(path, authorityEnd+2)
				if volumeSeparatorEnd != -1 {
					if volumeSeparatorEnd == len(path) {
						// URL: "file:///c:", "file://localhost/c:", "file:///c$3a", "file://localhost/c%3a"
						// but not "file:///c:d" or "file:///c%3ad"
						return ^volumeSeparatorEnd
					}
					if path[volumeSeparatorEnd] == '/' {
						// URL: "file:///c:/", "file://localhost/c:/", "file:///c%3a/", "file://localhost/c%3a/"
						return ^(volumeSeparatorEnd + 1)
					}
				}
			}
			return ^(authorityEnd + 1) // URL: "file://server/", "http://server/"
		}
		return ^ln // URL: "file://server", "http://server"
	}

	// relative
	return 0
}

func getRootLength(path string) int {
	rootLength := getEncodedRootLength(path)
	if rootLength < 0 {
		return ^rootLength
	}
	return rootLength
}

func getDirectoryPath(path string) string {
	path = normalizeSlashes(path)

	// If the path provided is itself a root, then return it.
	rootLength := getRootLength(path)
	if rootLength == len(path) {
		return path
	}

	// return the leading portion of the path up to the last (non-terminal) directory separator
	// but not including any trailing directory separator.
	path = removeTrailingDirectorySeparator(path)
	return path[:max(rootLength, strings.LastIndex(path, "/"))]
}
func (p Path) getDirectoryPath() Path {
	return Path(getDirectoryPath(string(p)))
}

func getPathFromPathComponents(pathComponents []string) string {
	if len(pathComponents) == 0 {
		return ""
	}

	root := pathComponents[0]
	if root != "" {
		root = ensureTrailingDirectorySeparator(root)
	}

	return root + strings.Join(pathComponents[1:], "/")
}

func normalizeSlashes(path string) string {
	return strings.ReplaceAll(path, "\\", "/")
}

func reducePathComponents(components []string) []string {
	if len(components) == 0 {
		return []string{}
	}
	reduced := []string{components[0]}
	for i := 1; i < len(components); i++ {
		component := components[i]
		if component == "" {
			continue
		}
		if component == "." {
			continue
		}
		if component == ".." {
			if len(reduced) > 1 {
				if reduced[len(reduced)-1] != ".." {
					reduced = reduced[:len(reduced)-1]
					continue
				}
			} else if reduced[0] != "" {
				continue
			}
		}
		reduced = append(reduced, component)
	}
	return reduced
}

func resolvePath(path string, paths ...string) string {
	var combinedPath string
	if len(paths) > 0 {
		combinedPath = combinePaths(path, paths...)
	} else {
		combinedPath = normalizeSlashes(path)
	}
	return normalizePath(combinedPath)
}

func getNormalizedPathComponents(path string, currentDirectory string) []string {
	return reducePathComponents(getPathComponents(path, currentDirectory))
}

func getNormalizedAbsolutePath(fileName string, currentDirectory string) string {
	return getPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory))
}

func normalizePath(path string) string {
	path = normalizeSlashes(path)
	// Most paths don't require normalization
	relativePathSegmentRegExp := makeRegexp(`//|(?:^|/)\.\.?(?:$|/)`)
	if !relativePathSegmentRegExp.MatchString(path) {
		return path
	}
	// Some paths only require cleanup of `/./` or leading `./`
	simplified := strings.ReplaceAll(path, "/./", "/")
	simplified = strings.TrimPrefix(simplified, "./")
	if simplified != path && !relativePathSegmentRegExp.MatchString(simplified) {
		path = simplified
		return path
	}
	// Other paths require full normalization
	normalized := getPathFromPathComponents(reducePathComponents(getPathComponents(path, "")))
	if normalized != "" && hasTrailingDirectorySeparator(path) {
		normalized = ensureTrailingDirectorySeparator(normalized)
	}
	return normalized
}

func toPath(fileName string, basePath string, getCanonicalFileName func(string) string) Path {
	var nonCanonicalizedPath string
	if isRootedDiskPath(fileName) {
		nonCanonicalizedPath = normalizePath(fileName)
	} else {
		nonCanonicalizedPath = getNormalizedAbsolutePath(basePath, fileName)
	}
	return Path(getCanonicalFileName(nonCanonicalizedPath))
}

func removeTrailingDirectorySeparator(path string) string {
	if hasTrailingDirectorySeparator(path) {
		return path[:len(path)-1]
	}
	return path
}
func (p Path) removeTrailingDirectorySeparator() Path {
	return Path(removeTrailingDirectorySeparator(string(p)))
}

func ensureTrailingDirectorySeparator(path string) string {
	if !hasTrailingDirectorySeparator(path) {
		return path + "/"
	}

	return path
}
func (p Path) ensureTrailingDirectorySeparator() Path {
	return Path(ensureTrailingDirectorySeparator(string(p)))
}

//// Relative Paths

func getPathComponentsRelativeTo(from string, to string, stringEqualer func(a, b string) bool, getCanonicalFileName func(fileName string) string) []string {
	fromComponents := reducePathComponents(getPathComponents(from, "" /*currentDirectory*/))
	toComponents := reducePathComponents(getPathComponents(to, "" /*currentDirectory*/))

	start := 0
	maxCommonComponents := min(len(fromComponents), len(toComponents))
	for ; start < maxCommonComponents; start++ {
		fromComponent := fromComponents[start]
		toComponent := toComponents[start]
		if start == 0 {
			if !EquateStringsCaseInsensitive(fromComponent, toComponent) {
				break
			}
		} else {
			if !stringEqualer(fromComponent, toComponent) {
				break
			}
		}
	}

	if start == 0 {
		return toComponents
	}

	numDotDotSlashes := len(fromComponents) - start
	result := make([]string, 1+numDotDotSlashes+len(toComponents)-start)

	result[0] = ""
	i := 1
	// Add all the relative components until we hit a common directory.
	for range numDotDotSlashes {
		result[i] = ".."
		i++
	}
	// Now add all the remaining components of the "to" path.
	for _, component := range toComponents[start:] {
		result[i] = component
		i++
	}

	return result
}

func ConvertToRelativePath(absoluteOrRelativePath, basePath string, getCanonicalFileName func(fileName string) string) string {
	if !isRootedDiskPath(absoluteOrRelativePath) {
		return absoluteOrRelativePath
	}

	return getRelativePathToDirectoryOrUrl(basePath, absoluteOrRelativePath, basePath, getCanonicalFileName, false /*isAbsolutePathAnUrl*/)
}

func getRelativePathToDirectoryOrUrl(directoryPathOrUrl string, relativeOrAbsolutePath string, currentDirectory string, getCanonicalFileName func(fileName string) string, isAbsolutePathAnUrl bool) string {
	pathComponents := getPathComponentsRelativeTo(
		resolvePath(currentDirectory, directoryPathOrUrl),
		resolvePath(currentDirectory, relativeOrAbsolutePath),
		EquateStringsCaseSensitive,
		getCanonicalFileName,
	)

	firstComponent := pathComponents[0]
	if isAbsolutePathAnUrl && isRootedDiskPath(firstComponent) {
		var prefix string
		if firstComponent[0] == directorySeparator {
			prefix = "file://"
		} else {
			prefix = "file:///"
		}
		pathComponents[0] = prefix + firstComponent
	}

	return getPathFromPathComponents(pathComponents)
}
