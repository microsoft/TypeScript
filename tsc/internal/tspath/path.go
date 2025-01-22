package tspath

import (
	"cmp"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/stringutil"
)

type Path string

// Internally, we represent paths as strings with '/' as the directory separator.
// When we make system calls (eg: LanguageServiceHost.getDirectory()),
// we expect the host to correctly handle paths in our specified format.
const (
	DirectorySeparator = '/'
	urlSchemeSeparator = "://"
)

//// Path Tests

// Determines whether a byte corresponds to `/` or `\`.
func isAnyDirectorySeparator(char byte) bool {
	return char == '/' || char == '\\'
}

// Determines whether a path starts with a URL scheme (e.g. starts with `http://`, `ftp://`, `file://`, etc.).
func IsUrl(path string) bool {
	return GetEncodedRootLength(path) < 0
}

// Determines whether a path is an absolute disk path (e.g. starts with `/`, or a dos path
// like `c:`, `c:\` or `c:/`).
func IsRootedDiskPath(path string) bool {
	return GetEncodedRootLength(path) > 0
}

// Determines whether a path consists only of a path root.
func IsDiskPathRoot(path string) bool {
	rootLength := GetEncodedRootLength(path)
	return rootLength > 0 && rootLength == len(path)
}

// Determines whether a path starts with an absolute path component (i.e. `/`, `c:/`, `file://`, etc.).
//
//	```
//	// POSIX
//	PathIsAbsolute("/path/to/file.ext") === true
//	// DOS
//	PathIsAbsolute("c:/path/to/file.ext") === true
//	// URL
//	PathIsAbsolute("file:///path/to/file.ext") === true
//	// Non-absolute
//	PathIsAbsolute("path/to/file.ext") === false
//	PathIsAbsolute("./path/to/file.ext") === false
//	```
func PathIsAbsolute(path string) bool {
	return GetEncodedRootLength(path) != 0
}

func HasTrailingDirectorySeparator(path string) bool {
	return len(path) > 0 && isAnyDirectorySeparator(path[len(path)-1])
}

// Combines paths. If a path is absolute, it replaces any previous path. Relative paths are not simplified.
//
//	```
//	// Non-rooted
//	CombinePaths("path", "to", "file.ext") === "path/to/file.ext"
//	CombinePaths("path", "dir", "..", "to", "file.ext") === "path/dir/../to/file.ext"
//	// POSIX
//	CombinePaths("/path", "to", "file.ext") === "/path/to/file.ext"
//	CombinePaths("/path", "/to", "file.ext") === "/to/file.ext"
//	// DOS
//	CombinePaths("c:/path", "to", "file.ext") === "c:/path/to/file.ext"
//	CombinePaths("c:/path", "c:/to", "file.ext") === "c:/to/file.ext"
//	// URL
//	CombinePaths("file:///path", "to", "file.ext") === "file:///path/to/file.ext"
//	CombinePaths("file:///path", "file:///to", "file.ext") === "file:///to/file.ext"
//	```
func CombinePaths(firstPath string, paths ...string) string {
	// TODO (drosen): There is potential for a fast path here.
	// In the case where we find the last absolute path and just path.Join from there.
	firstPath = NormalizeSlashes(firstPath)

	var b strings.Builder
	size := len(firstPath) + len(paths)
	for _, p := range paths {
		size += len(p)
	}
	b.Grow(size)

	b.WriteString(firstPath)

	// To provide a way to "set" the path, keep track of the start and then slice.
	// This will waste some memory each time we do it, but saving memory is more common.
	start := 0
	result := func() string {
		return b.String()[start:]
	}
	setResult := func(value string) {
		start = b.Len()
		b.WriteString(value)
	}

	for _, trailingPath := range paths {
		if trailingPath == "" {
			continue
		}
		trailingPath = NormalizeSlashes(trailingPath)
		if result() == "" || GetRootLength(trailingPath) != 0 {
			// `trailingPath` is absolute.
			setResult(trailingPath)
		} else {
			if !HasTrailingDirectorySeparator(result()) {
				b.WriteByte(DirectorySeparator)
			}
			b.WriteString(trailingPath)
		}
	}
	return result()
}

func GetPathComponents(path string, currentDirectory string) []string {
	path = CombinePaths(currentDirectory, path)
	return pathComponents(path, GetRootLength(path))
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

func GetEncodedRootLength(path string) int {
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

func GetRootLength(path string) int {
	rootLength := GetEncodedRootLength(path)
	if rootLength < 0 {
		return ^rootLength
	}
	return rootLength
}

func GetDirectoryPath(path string) string {
	path = NormalizeSlashes(path)

	// If the path provided is itself a root, then return it.
	rootLength := GetRootLength(path)
	if rootLength == len(path) {
		return path
	}

	// return the leading portion of the path up to the last (non-terminal) directory separator
	// but not including any trailing directory separator.
	path = RemoveTrailingDirectorySeparator(path)
	return path[:max(rootLength, strings.LastIndex(path, "/"))]
}

func (p Path) GetDirectoryPath() Path {
	return Path(GetDirectoryPath(string(p)))
}

func GetPathFromPathComponents(pathComponents []string) string {
	if len(pathComponents) == 0 {
		return ""
	}

	root := pathComponents[0]
	if root != "" {
		root = EnsureTrailingDirectorySeparator(root)
	}

	return root + strings.Join(pathComponents[1:], "/")
}

func NormalizeSlashes(path string) string {
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

// Combines and resolves paths. If a path is absolute, it replaces any previous path. Any
// `.` and `..` path components are resolved. Trailing directory separators are preserved.
//
// ```go
// resolvePath("/path", "to", "file.ext") == "path/to/file.ext"
// resolvePath("/path", "to", "file.ext/") == "path/to/file.ext/"
// resolvePath("/path", "dir", "..", "to", "file.ext") == "path/to/file.ext"
// ```
func ResolvePath(path string, paths ...string) string {
	var combinedPath string
	if len(paths) > 0 {
		combinedPath = CombinePaths(path, paths...)
	} else {
		combinedPath = NormalizeSlashes(path)
	}
	return NormalizePath(combinedPath)
}

func GetNormalizedPathComponents(path string, currentDirectory string) []string {
	return reducePathComponents(GetPathComponents(path, currentDirectory))
}

func GetNormalizedAbsolutePath(fileName string, currentDirectory string) string {
	return GetPathFromPathComponents(GetNormalizedPathComponents(fileName, currentDirectory))
}

func hasRelativePathSegment(p string) bool {
	if p == "." || p == ".." {
		return true
	}

	if strings.HasPrefix(p, "./") || strings.HasPrefix(p, "../") {
		return true
	}

	if strings.HasSuffix(p, "/.") || strings.HasSuffix(p, "/..") {
		return true
	}

	if strings.Contains(p, "//") {
		return true
	}

	if strings.Contains(p, "/./") || strings.Contains(p, "/../") {
		return true
	}

	return false
}

func NormalizePath(path string) string {
	path = NormalizeSlashes(path)
	// Most paths don't require normalization
	if !hasRelativePathSegment(path) {
		return path
	}
	// Some paths only require cleanup of `/./` or leading `./`
	simplified := strings.ReplaceAll(path, "/./", "/")
	simplified = strings.TrimPrefix(simplified, "./")
	if simplified != path && !hasRelativePathSegment(simplified) {
		path = simplified
		return path
	}
	// Other paths require full normalization
	normalized := GetPathFromPathComponents(reducePathComponents(GetPathComponents(path, "")))
	if normalized != "" && HasTrailingDirectorySeparator(path) {
		normalized = EnsureTrailingDirectorySeparator(normalized)
	}
	return normalized
}

func GetCanonicalFileName(fileName string, useCaseSensitiveFileNames bool) string {
	if useCaseSensitiveFileNames {
		return fileName
	}
	return ToFileNameLowerCase(fileName)
}

// We convert the file names to lower case as key for file name on case insensitive file system
// While doing so we need to handle special characters (eg \u0130) to ensure that we dont convert
// it to lower case, fileName with its lowercase form can exist along side it.
// Handle special characters and make those case sensitive instead
//
// |-#--|-Unicode--|-Char code-|-Desc-------------------------------------------------------------------|
// | 1. | i        | 105       | Ascii i                                                                |
// | 2. | I        | 73        | Ascii I                                                                |
// |-------- Special characters ------------------------------------------------------------------------|
// | 3. | \u0130   | 304       | Upper case I with dot above                                            |
// | 4. | i,\u0307 | 105,775   | i, followed by 775: Lower case of (3rd item)                           |
// | 5. | I,\u0307 | 73,775    | I, followed by 775: Upper case of (4th item), lower case is (4th item) |
// | 6. | \u0131   | 305       | Lower case i without dot, upper case is I (2nd item)                   |
// | 7. | \u00DF   | 223       | Lower case sharp s                                                     |
//
// Because item 3 is special where in its lowercase character has its own
// upper case form we cant convert its case.
// Rest special characters are either already in lower case format or
// they have corresponding upper case character so they dont need special handling

func ToFileNameLowerCase(fileName string) string {
	return strings.Map(func(r rune) rune {
		if r == '\u0130' {
			return r
		}
		return unicode.ToLower(r)
	}, fileName)
}

func ToPath(fileName string, basePath string, useCaseSensitiveFileNames bool) Path {
	var nonCanonicalizedPath string
	if IsRootedDiskPath(fileName) {
		nonCanonicalizedPath = NormalizePath(fileName)
	} else {
		nonCanonicalizedPath = GetNormalizedAbsolutePath(fileName, basePath)
	}
	return Path(GetCanonicalFileName(nonCanonicalizedPath, useCaseSensitiveFileNames))
}

func RemoveTrailingDirectorySeparator(path string) string {
	if HasTrailingDirectorySeparator(path) {
		return path[:len(path)-1]
	}
	return path
}

func (p Path) RemoveTrailingDirectorySeparator() Path {
	return Path(RemoveTrailingDirectorySeparator(string(p)))
}

func EnsureTrailingDirectorySeparator(path string) string {
	if !HasTrailingDirectorySeparator(path) {
		return path + "/"
	}

	return path
}

func (p Path) EnsureTrailingDirectorySeparator() Path {
	return Path(EnsureTrailingDirectorySeparator(string(p)))
}

//// Relative Paths

func GetPathComponentsRelativeTo(from string, to string, options ComparePathsOptions) []string {
	fromComponents := reducePathComponents(GetPathComponents(from, options.CurrentDirectory))
	toComponents := reducePathComponents(GetPathComponents(to, options.CurrentDirectory))

	start := 0
	maxCommonComponents := min(len(fromComponents), len(toComponents))
	stringEqualer := options.getEqualityComparer()
	for ; start < maxCommonComponents; start++ {
		fromComponent := fromComponents[start]
		toComponent := toComponents[start]
		if start == 0 {
			if !stringutil.EquateStringCaseInsensitive(fromComponent, toComponent) {
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

func GetRelativePathFromDirectory(fromDirectory string, to string, options ComparePathsOptions) string {
	if (GetRootLength(fromDirectory) > 0) != (GetRootLength(to) > 0) {
		panic("paths must either both be absolute or both be relative")
	}
	pathComponents := GetPathComponentsRelativeTo(fromDirectory, to, options)
	return GetPathFromPathComponents(pathComponents)
}

func ConvertToRelativePath(absoluteOrRelativePath string, options ComparePathsOptions) string {
	if !IsRootedDiskPath(absoluteOrRelativePath) {
		return absoluteOrRelativePath
	}

	return GetRelativePathToDirectoryOrUrl(options.CurrentDirectory, absoluteOrRelativePath, false /*isAbsolutePathAnUrl*/, options)
}

func GetRelativePathToDirectoryOrUrl(directoryPathOrUrl string, relativeOrAbsolutePath string, isAbsolutePathAnUrl bool, options ComparePathsOptions) string {
	pathComponents := GetPathComponentsRelativeTo(
		directoryPathOrUrl,
		relativeOrAbsolutePath,
		options,
	)

	firstComponent := pathComponents[0]
	if isAbsolutePathAnUrl && IsRootedDiskPath(firstComponent) {
		var prefix string
		if firstComponent[0] == DirectorySeparator {
			prefix = "file://"
		} else {
			prefix = "file:///"
		}
		pathComponents[0] = prefix + firstComponent
	}

	return GetPathFromPathComponents(pathComponents)
}

// Gets the portion of a path following the last (non-terminal) separator (`/`).
// Semantics align with NodeJS's `path.basename` except that we support URL's as well.
// If the base name has any one of the provided extensions, it is removed.
//
//	// POSIX
//	GetBaseFileName("/path/to/file.ext") == "file.ext"
//	GetBaseFileName("/path/to/") == "to"
//	GetBaseFileName("/") == ""
//	// DOS
//	GetBaseFileName("c:/path/to/file.ext") == "file.ext"
//	GetBaseFileName("c:/path/to/") == "to"
//	GetBaseFileName("c:/") == ""
//	GetBaseFileName("c:") == ""
//	// URL
//	GetBaseFileName("http://typescriptlang.org/path/to/file.ext") == "file.ext"
//	GetBaseFileName("http://typescriptlang.org/path/to/") == "to"
//	GetBaseFileName("http://typescriptlang.org/") == ""
//	GetBaseFileName("http://typescriptlang.org") == ""
//	GetBaseFileName("file://server/path/to/file.ext") == "file.ext"
//	GetBaseFileName("file://server/path/to/") == "to"
//	GetBaseFileName("file://server/") == ""
//	GetBaseFileName("file://server") == ""
//	GetBaseFileName("file:///path/to/file.ext") == "file.ext"
//	GetBaseFileName("file:///path/to/") == "to"
//	GetBaseFileName("file:///") == ""
//	GetBaseFileName("file://") == ""
func GetBaseFileName(path string) string {
	path = NormalizeSlashes(path)

	// if the path provided is itself the root, then it has no file name.
	rootLength := GetRootLength(path)
	if rootLength == len(path) {
		return ""
	}

	// return the trailing portion of the path starting after the last (non-terminal) directory
	// separator but not including any trailing directory separator.
	path = RemoveTrailingDirectorySeparator(path)
	return path[max(GetRootLength(path), strings.LastIndex(path, string(DirectorySeparator))+1):]
}

// Gets the file extension for a path.
// If extensions are provided, gets the file extension for a path, provided it is one of the provided extensions.
//
//	GetAnyExtensionFromPath("/path/to/file.ext", nil, false) == ".ext"
//	GetAnyExtensionFromPath("/path/to/file.ext/", nil, false) == ".ext"
//	GetAnyExtensionFromPath("/path/to/file", nil, false) == ""
//	GetAnyExtensionFromPath("/path/to.ext/file", nil, false) == ""
//	GetAnyExtensionFromPath("/path/to/file.ext", ".ext", true) === ".ext"
//	GetAnyExtensionFromPath("/path/to/file.js", ".ext", true) === ""
//	GetAnyExtensionFromPath("/path/to/file.js", [".ext", ".js"], true) === ".js"
//	GetAnyExtensionFromPath("/path/to/file.ext", ".EXT", false) === ""
func GetAnyExtensionFromPath(path string, extensions []string, ignoreCase bool) string {
	// Retrieves any string from the final "." onwards from a base file name.
	// Unlike extensionFromPath, which throws an exception on unrecognized extensions.
	if len(extensions) > 0 {
		return getAnyExtensionFromPathWorker(RemoveTrailingDirectorySeparator(path), extensions, stringutil.GetStringEqualityComparer(ignoreCase))
	}

	baseFileName := GetBaseFileName(path)
	extensionIndex := strings.LastIndex(baseFileName, ".")
	if extensionIndex >= 0 {
		return baseFileName[extensionIndex:]
	}
	return ""
}

func getAnyExtensionFromPathWorker(path string, extensions []string, stringEqualityComparer func(a, b string) bool) string {
	for _, extension := range extensions {
		result := tryGetExtensionFromPath(path, extension, stringEqualityComparer)
		if result != "" {
			return result
		}
	}
	return ""
}

func tryGetExtensionFromPath(path string, extension string, stringEqualityComparer func(a, b string) bool) string {
	if !strings.HasPrefix(extension, ".") {
		extension = "." + extension
	}
	if len(path) >= len(extension) && path[len(path)-len(extension)] == '.' {
		pathExtension := path[len(path)-len(extension):]
		if stringEqualityComparer(pathExtension, extension) {
			return pathExtension
		}
	}
	return ""
}

func PathIsRelative(path string) bool {
	// True if path is ".", "..", or starts with "./", "../", ".\\", or "..\\".

	if path == "." || path == ".." {
		return true
	}

	if len(path) >= 2 && path[0] == '.' && (path[1] == '/' || path[1] == '\\') {
		return true
	}

	if len(path) >= 3 && path[0] == '.' && path[1] == '.' && (path[2] == '/' || path[2] == '\\') {
		return true
	}

	return false
}

func IsExternalModuleNameRelative(moduleName string) bool {
	// TypeScript 1.0 spec (April 2014): 11.2.1
	// An external module name is "relative" if the first term is "." or "..".
	// Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
	return PathIsRelative(moduleName) || IsRootedDiskPath(moduleName)
}

type ComparePathsOptions struct {
	UseCaseSensitiveFileNames bool
	CurrentDirectory          string
}

func (o ComparePathsOptions) GetComparer() func(a, b string) int {
	return stringutil.GetStringComparer(!o.UseCaseSensitiveFileNames)
}

func (o ComparePathsOptions) getEqualityComparer() func(a, b string) bool {
	return stringutil.GetStringEqualityComparer(!o.UseCaseSensitiveFileNames)
}

func ComparePaths(a string, b string, options ComparePathsOptions) int {
	a = CombinePaths(options.CurrentDirectory, a)
	b = CombinePaths(options.CurrentDirectory, b)

	if a == b {
		return 0
	}
	if a == "" {
		return -1
	}
	if b == "" {
		return 1
	}

	// NOTE: Performance optimization - shortcut if the root segments differ as there would be no
	//       need to perform path reduction.
	aRoot := a[:GetRootLength(a)]
	bRoot := b[:GetRootLength(b)]
	result := stringutil.CompareStringsCaseInsensitive(aRoot, bRoot)
	if result != 0 {
		return result
	}

	// NOTE: Performance optimization - shortcut if there are no relative path segments in
	//       the non-root portion of the path
	aRest := a[len(aRoot):]
	bRest := b[len(bRoot):]
	if !hasRelativePathSegment(aRest) && !hasRelativePathSegment(bRest) {
		return options.GetComparer()(aRest, bRest)
	}

	// The path contains a relative path segment. Normalize the paths and perform a slower component
	// by component comparison.
	aComponents := reducePathComponents(GetPathComponents(a, ""))
	bComponents := reducePathComponents(GetPathComponents(b, ""))
	sharedLength := min(len(aComponents), len(bComponents))
	for i := 1; i < sharedLength; i++ {
		result := options.GetComparer()(aComponents[i], bComponents[i])
		if result != 0 {
			return result
		}
	}
	return cmp.Compare(len(aComponents), len(bComponents))
}

func ComparePathsCaseSensitive(a string, b string, currentDirectory string) int {
	return ComparePaths(a, b, ComparePathsOptions{UseCaseSensitiveFileNames: true, CurrentDirectory: currentDirectory})
}

func ComparePathsCaseInsensitive(a string, b string, currentDirectory string) int {
	return ComparePaths(a, b, ComparePathsOptions{UseCaseSensitiveFileNames: false, CurrentDirectory: currentDirectory})
}

func ContainsPath(parent string, child string, options ComparePathsOptions) bool {
	parent = CombinePaths(options.CurrentDirectory, parent)
	child = CombinePaths(options.CurrentDirectory, child)
	if parent == "" || child == "" {
		return false
	}
	if parent == child {
		return true
	}
	parentComponents := reducePathComponents(GetPathComponents(parent, ""))
	childComponents := reducePathComponents(GetPathComponents(child, ""))
	if len(childComponents) < len(parentComponents) {
		return false
	}

	componentComparer := options.getEqualityComparer()
	for i, parentComponent := range parentComponents {
		var comparer func(a, b string) bool
		if i == 0 {
			comparer = stringutil.EquateStringCaseInsensitive
		} else {
			comparer = componentComparer
		}
		if !comparer(parentComponent, childComponents[i]) {
			return false
		}
	}

	return true
}

func FileExtensionIs(path string, extension string) bool {
	return len(path) > len(extension) && strings.HasSuffix(path, extension)
}

func ForEachAncestorDirectory[T any](directory string, callback func(directory string) (result T, stop bool)) (result T, ok bool) {
	for {
		result, stop := callback(directory)
		if stop {
			return result, true
		}

		parentPath := GetDirectoryPath(directory)
		if parentPath == directory {
			var zero T
			return zero, false
		}

		directory = parentPath
	}
}

func ForEachAncestorDirectoryPath[T any](directory Path, callback func(directory Path) (result T, stop bool)) (result T, ok bool) {
	return ForEachAncestorDirectory(string(directory), func(directory string) (T, bool) {
		return callback(Path(directory))
	})
}

func HasExtension(fileName string) bool {
	return strings.Contains(GetBaseFileName(fileName), ".")
}
