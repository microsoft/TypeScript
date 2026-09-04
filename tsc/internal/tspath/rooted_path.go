package tspath

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
)

// RootedPath is a rooted, slash-normalized, lexically normalized path that may
// represent either a file or a directory. It preserves path casing. Its zero
// value is a valid sentinel.
type RootedPath string

// RootedFilePath is a RootedPath intended to be used as a file path. It does
// not assert that the path exists or is a file on a filesystem.
type RootedFilePath RootedPath

// RootedDirectoryPath is a RootedPath intended to be used as a directory path.
// It does not assert that the path exists or is a directory on a filesystem,
// and does not guarantee a trailing directory separator.
type RootedDirectoryPath RootedPath

// ToRootedPath resolves path against currentDirectory and normalizes it.
func ToRootedPath(path string, currentDirectory RootedDirectoryPath) RootedPath {
	if path == "" {
		panic("path must not be empty")
	}
	if hasRootedURLSuffix(path) {
		panic("path must not contain a URL query or fragment")
	}
	if GetEncodedRootLength(path) == 0 && hasURLRoot(currentDirectory.AsString()) && strings.ContainsAny(path, "?#") {
		panic("relative URL path must not contain a query or fragment")
	}
	normalized := getNormalizedAbsolutePathFromDirectory(path, currentDirectory)
	if GetEncodedRootLength(normalized) == 0 || hasRootedURLSuffix(normalized) {
		panic("path must be rooted")
	}
	return RootedPath(ensureRootedPathRootSeparator(normalized))
}

// RootedPathFromAbsolute validates and normalizes an absolute path, including
// converting platform directory separators to '/'.
func RootedPathFromAbsolute(path string) RootedPath {
	result, ok := TryRootedPathFromAbsolute(path)
	if !ok {
		panic("path must be absolute")
	}
	return result
}

// TryRootedPathFromAbsolute validates and normalizes an absolute path,
// including converting platform directory separators to '/'.
func TryRootedPathFromAbsolute(path string) (RootedPath, bool) {
	if hasRootedURLSuffix(path) || !PathIsAbsolute(path) {
		return "", false
	}
	return RootedPath(ensureRootedPathRootSeparator(GetNormalizedAbsolutePath(path, ""))), true
}

func ensureRootedPathRootSeparator(path string) string {
	if GetRootLength(path) == len(path) {
		if !HasTrailingDirectorySeparator(path) {
			return path + string(DirectorySeparator)
		}
	}
	return path
}

// RootedPathFromNormalized validates a path that is already rooted and
// normalized without changing it.
func RootedPathFromNormalized(path string) RootedPath {
	result, ok := TryRootedPathFromNormalized(path)
	if !ok {
		panic("path must be rooted and normalized: " + path)
	}
	return result
}

// TryRootedPathFromNormalized validates a path that is already rooted and
// normalized without changing it.
func TryRootedPathFromNormalized(path string) (RootedPath, bool) {
	if hasRootedURLSuffix(path) {
		return "", false
	}
	rootLength := GetEncodedRootLength(path)
	if rootLength < 0 {
		rootLength = ^rootLength
	}
	if path == "" ||
		rootLength == 0 ||
		strings.IndexByte(path, '\\') >= 0 ||
		rootLength < len(path) && path[rootLength] == '/' ||
		hasRelativePathSegment(path[rootLength:]) ||
		len(path) == rootLength && !HasTrailingDirectorySeparator(path) ||
		len(path) > rootLength && HasTrailingDirectorySeparator(path) {
		return "", false
	}
	return RootedPath(path), true
}

func hasRootedURLSuffix(path string) bool {
	if !hasURLRoot(path) {
		return false
	}
	_, afterScheme, _ := strings.Cut(path, urlSchemeSeparator)
	return strings.IndexAny(afterScheme, "?#") != -1
}

func hasURLRoot(path string) bool {
	return GetEncodedRootLength(path) < 0 && strings.Contains(path, urlSchemeSeparator)
}

// ToRootedFilePath resolves fileName against currentDirectory, normalizes it,
// and gives it file intent.
func ToRootedFilePath(fileName string, currentDirectory RootedDirectoryPath) RootedFilePath {
	return RootedFilePath(ToRootedPath(fileName, currentDirectory))
}

// RootedFilePathFromAbsolute validates and normalizes an absolute path,
// including converting platform directory separators to '/', then gives it
// file intent.
func RootedFilePathFromAbsolute(fileName string) RootedFilePath {
	return RootedFilePath(RootedPathFromAbsolute(fileName))
}

// TryRootedFilePathFromAbsolute validates and normalizes an absolute path,
// including converting platform directory separators to '/', then gives it
// file intent.
func TryRootedFilePathFromAbsolute(fileName string) (RootedFilePath, bool) {
	path, ok := TryRootedPathFromAbsolute(fileName)
	return RootedFilePath(path), ok
}

// RootedFilePathFromNormalized validates a path that is already rooted and
// normalized without changing it, then gives it file intent.
func RootedFilePathFromNormalized(fileName string) RootedFilePath {
	return RootedFilePath(RootedPathFromNormalized(fileName))
}

// TryRootedFilePathFromNormalized validates a path that is already rooted and
// normalized without changing it, then gives it file intent.
func TryRootedFilePathFromNormalized(fileName string) (RootedFilePath, bool) {
	path, ok := TryRootedPathFromNormalized(fileName)
	return RootedFilePath(path), ok
}

// ToRootedDirectoryPath resolves directory against currentDirectory,
// normalizes it, and gives it directory intent.
func ToRootedDirectoryPath(directory string, currentDirectory RootedDirectoryPath) RootedDirectoryPath {
	return RootedDirectoryPath(ToRootedPath(directory, currentDirectory))
}

// RootedDirectoryPathFromAbsolute validates and normalizes an absolute path,
// including converting platform directory separators to '/', then gives it
// directory intent.
func RootedDirectoryPathFromAbsolute(directory string) RootedDirectoryPath {
	return RootedDirectoryPath(RootedPathFromAbsolute(directory))
}

// RootedDirectoryPathFromNormalized validates a path that is already rooted
// and normalized without changing it, then gives it directory intent.
func RootedDirectoryPathFromNormalized(directory string) RootedDirectoryPath {
	return RootedDirectoryPath(RootedPathFromNormalized(directory))
}

// RootedFilePathFromPath gives a RootedPath file intent without changing it.
func RootedFilePathFromPath(path RootedPath) RootedFilePath {
	return RootedFilePath(path)
}

// RootedDirectoryPathFromPath gives a RootedPath directory intent without
// changing it.
func RootedDirectoryPathFromPath(path RootedPath) RootedDirectoryPath {
	return RootedDirectoryPath(path)
}

func (f RootedFilePath) AsString() string {
	return string(f)
}

func (f RootedFilePath) AsPath() RootedPath {
	return RootedPath(f)
}

func (f RootedFilePath) AsModuleSpecifier() ModuleSpecifier {
	return ModuleSpecifier(f)
}

func (p RootedPath) AsString() string {
	return string(p)
}

func (f RootedFilePath) Directory() RootedDirectoryPath {
	return f.AsPath().Directory()
}

func (p RootedPath) Directory() RootedDirectoryPath {
	path := string(p)
	rootLength := GetRootLength(path)
	if rootLength == len(path) {
		return RootedDirectoryPath(p)
	}
	path = RemoveTrailingDirectorySeparator(path)
	return RootedDirectoryPath(path[:max(rootLength, lastDirectorySeparator(path))])
}

func (f RootedFilePath) WithoutRoot() string {
	path := string(f)
	return path[GetRootLength(path):]
}

func (f RootedFilePath) RootAndRelativePath() (RootedDirectoryPath, string) {
	return f.AsPath().RootAndRelativePath()
}

func (p RootedPath) RootAndRelativePath() (RootedDirectoryPath, string) {
	path := string(p)
	rootLength := GetRootLength(path)
	return RootedDirectoryPath(path[:rootLength]), path[rootLength:]
}

func (f RootedFilePath) DirectoryBefore(index int) RootedDirectoryPath {
	path := string(f)
	if index < GetRootLength(path) || index > len(path) || index < len(path) && !isAnyDirectorySeparator(path[index]) {
		panic("directory boundary must be at a path separator")
	}
	return RootedDirectoryPath(path[:index])
}

func (f RootedFilePath) SuffixAfterSeparator(index int) string {
	path := string(f)
	if index < 0 || index >= len(path) || !isAnyDirectorySeparator(path[index]) {
		panic("suffix boundary must be at a path separator")
	}
	return path[index+1:]
}

// AppendSuffix appends a suffix that cannot change the rooted or normalized
// path structure.
func (f RootedFilePath) AppendSuffix(suffix string) RootedFilePath {
	if f == "" && suffix != "" {
		panic("cannot append a suffix to an empty file name")
	}
	if strings.ContainsAny(suffix, `/\`) {
		panic("file name suffix must not contain a directory separator")
	}
	result := RootedFilePath(string(f) + suffix)
	if result != "" {
		RootedPathFromNormalized(result.AsString())
	}
	return result
}

func (f RootedFilePath) RemoveFileExtension() RootedFilePath {
	return rootedFilePathFromExtensionMutation(RemoveFileExtension(string(f)))
}

func (f RootedFilePath) RemoveExtension(extension string) RootedFilePath {
	validateFileExtension(extension)
	if !strings.HasSuffix(string(f), extension) {
		panic("file name does not have extension: " + extension)
	}
	return rootedFilePathFromExtensionMutation(RemoveExtension(string(f), extension))
}

func (f RootedFilePath) ChangeExtension(extension string) RootedFilePath {
	validateFileExtension(extension)
	return rootedFilePathFromExtensionMutation(ChangeExtension(string(f), extension))
}

func (f RootedFilePath) ChangeFullExtension(extension string) RootedFilePath {
	validateFileExtension(extension)
	return rootedFilePathFromExtensionMutation(ChangeFullExtension(string(f), extension))
}

func (f RootedFilePath) ChangeAnyExtension(extension string, extensions []string, caseSensitivity CaseSensitivity) RootedFilePath {
	validateFileExtension(extension)
	for _, candidate := range extensions {
		validateFileExtension(candidate)
	}
	return rootedFilePathFromExtensionMutation(ChangeAnyExtension(string(f), extension, extensions, caseSensitivity))
}

func validateFileExtension(extension string) {
	if strings.ContainsAny(extension, `/\`) {
		panic("file extension must not contain a directory separator")
	}
}

func rootedFilePathFromExtensionMutation(path string) RootedFilePath {
	baseName := getBaseFileNameFromNormalized(path)
	if baseName == "." || baseName == ".." {
		panic("file extension change must preserve path normalization")
	}
	return rootedFilePathFromResolved(path)
}

func (f RootedFilePath) BaseName() string {
	return f.AsPath().BaseName()
}

func (p RootedPath) BaseName() string {
	return getBaseFileNameFromNormalized(string(p))
}

func (f RootedFilePath) ExtensionIs(extension string) bool {
	return FileExtensionIs(string(f), extension)
}

func (f RootedFilePath) ExtensionIsOneOf(extensions []string) bool {
	return FileExtensionIsOneOf(string(f), extensions)
}

func (f RootedFilePath) Extension() string {
	return TryGetExtensionFromPath(string(f))
}

func (f RootedFilePath) AnyExtension(extensions []string, caseSensitivity CaseSensitivity) string {
	if len(extensions) == 0 {
		return getAnyExtensionFromNormalizedPath(string(f))
	}
	return GetAnyExtensionFromPath(string(f), extensions, caseSensitivity)
}

func (f RootedFilePath) LongestExtension(extensions []string, caseSensitivity CaseSensitivity) string {
	return GetLongestExtensionFromPath(string(f), extensions, caseSensitivity)
}

func (f RootedFilePath) HasExtension() bool {
	return strings.Contains(getBaseFileNameFromNormalized(string(f)), ".")
}

func (f RootedFilePath) HasImplementationTSFileExtension() bool {
	return HasImplementationTSFileExtension(string(f))
}

func (f RootedFilePath) HasTSFileExtension() bool {
	return HasTSFileExtension(string(f))
}

func (f RootedFilePath) TryExtractTSExtension() string {
	return TryExtractTSExtension(string(f))
}

func (f RootedFilePath) HasJSONFileExtension() bool {
	return HasJSONFileExtension(string(f))
}

func (f RootedFilePath) DeclarationFileExtension() string {
	return getDeclarationFileExtensionFromNormalized(string(f))
}

func (f RootedFilePath) DeclarationEmitExtension() string {
	return GetDeclarationEmitExtensionForPath(string(f))
}

func (f RootedFilePath) PossibleOriginalInputExtensions() []string {
	return GetPossibleOriginalInputExtensionForExtension(string(f))
}

func (f RootedFilePath) HasJSFileExtension() bool {
	return HasJSFileExtension(string(f))
}

func (f RootedFilePath) IsDynamic() bool {
	return f.AsPath().IsDynamic()
}

func (p RootedPath) IsDynamic() bool {
	return IsDynamicFileName(string(p))
}

func (f RootedFilePath) IsDeclarationFile() bool {
	return getDeclarationFileExtensionFromNormalized(string(f)) != ""
}

func (f RootedFilePath) Components() []string {
	return GetPathComponents(string(f))
}

func (f RootedFilePath) RootLength() int {
	return GetRootLength(string(f))
}

func (f RootedFilePath) RelativeTo(directory RootedDirectoryPath) (RelativePath, bool) {
	return f.AsPath().RelativeTo(directory)
}

func (p RootedPath) RelativeTo(directory RootedDirectoryPath) (RelativePath, bool) {
	relative, ok := CaseSensitive.trimContainedPath(directory.AsString(), p.AsString())
	if !ok {
		return "", false
	}
	return RelativePath(relative), true
}

func (f RootedFilePath) SplitAtComponent(component string) (before RootedDirectoryPath, through RootedDirectoryPath, ok bool) {
	if component == "" || strings.ContainsAny(component, `/\`) || component == "." || component == ".." {
		panic("invalid path component")
	}
	needle := "/" + component
	path := string(f)
	rootLength := f.RootLength()
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
			return RootedDirectoryPath(path[:beforeEnd]), RootedDirectoryPath(path[:end]), true
		}
		offset = end
	}
}

func (f RootedFilePath) ContainsLowercaseDirectorySequence(sequence string) bool {
	return strings.Contains(string(f), sequence)
}

func (c CaseSensitivity) SplitFilePathAtComponent(fileName RootedFilePath, component string) (before RootedDirectoryPath, through RootedDirectoryPath, ok bool) {
	if component == "" || strings.ContainsAny(component, `/\`) || component == "." || component == ".." {
		panic("invalid path component")
	}
	components := GetPathComponents(fileName.AsString())
	if IsEncodedDynamicFileName(fileName.AsString()) {
		c = CaseSensitive
	}
	for i := 1; i < len(components); i++ {
		if c.GetComparer()(components[i], component) == 0 {
			return RootedDirectoryPath(GetPathFromPathComponents(components[:i])),
				RootedDirectoryPath(GetPathFromPathComponents(components[:i+1])),
				true
		}
	}
	return "", "", false
}

func (f RootedFilePath) SplitAtLastComponent(component string) (before RootedDirectoryPath, through RootedDirectoryPath, ok bool) {
	if component == "" || strings.ContainsAny(component, `/\`) || component == "." || component == ".." {
		panic("invalid path component")
	}
	needle := "/" + component
	path := string(f)
	for end := len(path); end > 0; {
		index := strings.LastIndex(path[:end], needle)
		if index == -1 {
			return "", "", false
		}
		componentEnd := index + len(needle)
		if index >= f.RootLength()-1 && (componentEnd == len(path) || path[componentEnd] == DirectorySeparator) {
			beforeEnd := max(index, f.RootLength())
			return RootedDirectoryPath(path[:beforeEnd]), RootedDirectoryPath(path[:componentEnd]), true
		}
		end = index
	}
	return "", "", false
}

func (f RootedFilePath) DirectorySeparatorCount() int {
	return strings.Count(string(f), "/")
}

// CompareFilePaths compares already rooted and normalized file names without
// combining or reducing their path components.
func (c CaseSensitivity) CompareFilePaths(a RootedFilePath, b RootedFilePath) int {
	return c.ComparePaths(a.AsPath(), b.AsPath())
}

// ComparePaths compares already rooted and normalized paths without combining
// or reducing their path components.
func (c CaseSensitivity) ComparePaths(a RootedPath, b RootedPath) int {
	if a == b {
		return 0
	}
	if a == "" {
		return -1
	}
	if b == "" {
		return 1
	}

	aString := string(a)
	bString := string(b)
	if IsEncodedDynamicFileName(aString) || IsEncodedDynamicFileName(bString) {
		return stringutil.CompareStringsCaseSensitive(
			canonicalDynamicURIPath(aString),
			canonicalDynamicURIPath(bString),
		)
	}
	aRootLength := GetRootLength(aString)
	bRootLength := GetRootLength(bString)
	if result := stringutil.CompareStringsCaseInsensitive(aString[:aRootLength], bString[:bRootLength]); result != 0 {
		return result
	}
	return c.GetComparer()(aString[aRootLength:], bString[bRootLength:])
}

func (c CaseSensitivity) ContainsFilePath(parent RootedDirectoryPath, child RootedFilePath) bool {
	return c.ContainsPath(parent, child.AsPath())
}

func (c CaseSensitivity) ContainsPath(parent RootedDirectoryPath, child RootedPath) bool {
	_, ok := c.trimContainedPath(parent.AsString(), child.AsString())
	return ok
}

func (c CaseSensitivity) StartsWithDirectory(fileName RootedFilePath, directory RootedDirectoryPath) bool {
	relative, ok := c.trimContainedPath(directory.AsString(), fileName.AsString())
	return ok && relative != ""
}

func (c CaseSensitivity) RelativeFilePathFromDirectory(directory RootedDirectoryPath, fileName RootedFilePath) (RelativePath, bool) {
	return c.RelativePathWithinDirectory(directory, fileName.AsPath())
}

func (c CaseSensitivity) RelativePathWithinDirectory(directory RootedDirectoryPath, path RootedPath) (RelativePath, bool) {
	relative, ok := c.trimContainedPath(directory.AsString(), path.AsString())
	if !ok {
		return "", false
	}
	return RelativePath(relative), true
}

func (c CaseSensitivity) trimContainedPath(parent string, child string) (string, bool) {
	if parent == "" || child == "" {
		return "", false
	}
	parentRootLength := GetRootLength(parent)
	childRootLength := GetRootLength(child)
	parentRoot := parent[:parentRootLength]
	childRoot := child[:childRootLength]
	dynamic := IsEncodedDynamicFileName(parent) || IsEncodedDynamicFileName(child)
	if dynamic {
		parentRoot = strings.TrimSuffix(parentRoot, string(DirectorySeparator))
		childRoot = strings.TrimSuffix(childRoot, string(DirectorySeparator))
		c = CaseSensitive
	}
	rootsEqual := stringutil.EquateStringCaseInsensitive(parentRoot, childRoot)
	if dynamic {
		rootsEqual = parentRoot == childRoot
	}
	if !rootsEqual {
		return "", false
	}
	relative, ok := c.TrimPrefix(child[childRootLength:], parent[parentRootLength:])
	if !ok ||
		relative != "" &&
			!HasTrailingDirectorySeparator(parent) &&
			len(parent) != parentRootLength &&
			relative[0] != DirectorySeparator {
		return "", false
	}
	return strings.TrimPrefix(relative, string(DirectorySeparator)), true
}

func relativePathFromNormalizedPaths(from string, to string, caseSensitivity CaseSensitivity) string {
	fromComponents := pathComponents(from, GetRootLength(from))
	toComponents := pathComponents(to, GetRootLength(to))
	if IsEncodedDynamicFileName(from) || IsEncodedDynamicFileName(to) {
		fromComponents[0] = strings.TrimSuffix(fromComponents[0], string(DirectorySeparator))
		toComponents[0] = strings.TrimSuffix(toComponents[0], string(DirectorySeparator))
		if fromComponents[0] != toComponents[0] {
			return to
		}
		caseSensitivity = CaseSensitive
	}
	return GetPathFromPathComponents(getPathComponentsRelativeTo(
		fromComponents,
		toComponents,
		caseSensitivity,
	))
}

// CommonDirectoryOfFiles returns the deepest directory containing every file.
// It preserves the spelling of the first file name.
func (c CaseSensitivity) CommonDirectoryOfFiles(fileNames []RootedFilePath) RootedDirectoryPath {
	var commonPathComponents []string
	for _, fileName := range fileNames {
		pathComponents := GetPathComponents(fileName.AsString())
		pathComponents = pathComponents[:len(pathComponents)-1]
		if commonPathComponents == nil {
			commonPathComponents = pathComponents
			continue
		}

		n := min(len(commonPathComponents), len(pathComponents))
		effectiveCaseSensitivity := c
		if IsEncodedDynamicFileName(fileName.AsString()) ||
			IsEncodedDynamicFileName(GetPathFromPathComponents(commonPathComponents)) {
			effectiveCaseSensitivity = CaseSensitive
			commonPathComponents[0] = strings.TrimSuffix(commonPathComponents[0], string(DirectorySeparator))
			pathComponents[0] = strings.TrimSuffix(pathComponents[0], string(DirectorySeparator))
		}
		for i := range n {
			if effectiveCaseSensitivity.Canonicalize(commonPathComponents[i]) != effectiveCaseSensitivity.Canonicalize(pathComponents[i]) {
				if i == 0 {
					return ""
				}
				commonPathComponents = commonPathComponents[:i]
				break
			}
		}
		if len(pathComponents) < len(commonPathComponents) {
			commonPathComponents = commonPathComponents[:len(pathComponents)]
		}
	}
	if len(commonPathComponents) == 0 {
		return ""
	}
	return RootedDirectoryPath(GetPathFromPathComponents(commonPathComponents))
}

func GetCommonParentDirectories(
	directories []RootedDirectoryPath,
	minComponents int,
	getComponents func(RootedDirectoryPath) []string,
	caseSensitivity CaseSensitivity,
) (parents []RootedDirectoryPath, ignored map[RootedDirectoryPath]struct{}) {
	if minComponents < 1 {
		panic("minComponents must be at least 1")
	}
	if len(directories) == 0 {
		return nil, nil
	}
	if len(directories) == 1 {
		if len(reducePathComponents(getComponents(directories[0]))) < minComponents {
			return nil, map[RootedDirectoryPath]struct{}{directories[0]: {}}
		}
		return directories, nil
	}

	ignored = make(map[RootedDirectoryPath]struct{})
	pathComponents := make([][]string, 0, len(directories))
	for _, directory := range directories {
		components := reducePathComponents(getComponents(directory))
		if len(components) < minComponents {
			ignored[directory] = struct{}{}
		} else {
			pathComponents = append(pathComponents, components)
		}
	}

	results := getCommonParentsWorker(pathComponents, minComponents, caseSensitivity)
	parents = make([]RootedDirectoryPath, len(results))
	for i, components := range results {
		parents[i] = RootedDirectoryPathFromAbsolute(GetPathFromPathComponents(components))
	}
	return parents, ignored
}

func (d RootedDirectoryPath) AsString() string {
	return string(d)
}

func (d RootedDirectoryPath) AsPath() RootedPath {
	return RootedPath(d)
}

func (d RootedDirectoryPath) BaseName() string {
	return d.AsPath().BaseName()
}

func (d RootedDirectoryPath) Components() []string {
	return GetPathComponents(string(d))
}

func (d RootedDirectoryPath) ContainsLowercaseDirectorySequence(sequence string) bool {
	return strings.Contains(string(d), sequence)
}

func (d RootedDirectoryPath) ResolveFile(path string) RootedFilePath {
	if d == "" {
		panic("cannot resolve from an empty directory name")
	}
	if path == "" {
		return RootedFilePath(d)
	}
	if GetEncodedRootLength(path) == 0 && hasURLRoot(d.AsString()) && strings.ContainsAny(path, "?#") {
		panic("relative URL path must not contain a query or fragment")
	}
	if canAppendPathWithoutNormalization(path) {
		return rootedFilePathFromResolved(appendPathToDirectory(d, path))
	}
	if isNormalizedSlashesRelativePath(path) {
		return rootedFilePathFromResolved(getNormalizedAbsolutePathFromNormalizedSlashes(appendPathToDirectory(d, path)))
	}
	return ToRootedFilePath(path, d)
}

func (d RootedDirectoryPath) ResolveRelativeFile(path RelativePath) RootedFilePath {
	if d == "" {
		panic("cannot resolve from an empty directory name")
	}
	if path == "" {
		return RootedFilePath(d)
	}
	if hasURLRoot(d.AsString()) && strings.ContainsAny(path.AsString(), "?#") {
		panic("relative URL path must not contain a query or fragment")
	}
	if path.requiresResolution() {
		return ToRootedFilePath(path.AsString(), d)
	}
	return rootedFilePathFromResolved(appendPathToDirectory(d, path.AsString()))
}

// ResolveFileFromNormalizedRelative resolves an already normalized relative
// path without revalidating the directory or path.
func (d RootedDirectoryPath) ResolveFileFromNormalizedRelative(path string) RootedFilePath {
	if d == "" {
		panic("cannot resolve from an empty directory path")
	}
	if path == "" {
		panic("path must not be empty")
	}
	if GetEncodedRootLength(path) == 0 && hasURLRoot(d.AsString()) && strings.ContainsAny(path, "?#") {
		panic("relative URL path must not contain a query or fragment")
	}
	if isAnyDirectorySeparator(path[0]) || NormalizeSlashes(path) != path || hasRelativePathSegment(path) || HasTrailingDirectorySeparator(path) {
		panic("path must be relative and normalized: " + path)
	}
	return rootedFilePathFromResolved(appendPathToDirectory(d, path))
}

func (d RootedDirectoryPath) ResolveRelativeDirectory(path RelativePath) RootedDirectoryPath {
	return RootedDirectoryPath(d.ResolveRelativeFile(path))
}

func (d RootedDirectoryPath) ResolveDirectory(path string) RootedDirectoryPath {
	if d == "" {
		panic("cannot resolve from an empty directory name")
	}
	if path == "" {
		return d
	}
	if GetEncodedRootLength(path) == 0 && hasURLRoot(d.AsString()) && strings.ContainsAny(path, "?#") {
		panic("relative URL path must not contain a query or fragment")
	}
	if canAppendPathWithoutNormalization(path) {
		return RootedDirectoryPath(rootedFilePathFromResolved(appendPathToDirectory(d, path)))
	}
	if isNormalizedSlashesRelativePath(path) {
		return RootedDirectoryPath(rootedFilePathFromResolved(getNormalizedAbsolutePathFromNormalizedSlashes(appendPathToDirectory(d, path))))
	}
	return ToRootedDirectoryPath(path, d)
}

func rootedFilePathFromResolved(path string) RootedFilePath {
	if hasRootedURLSuffix(path) {
		panic("path must not contain a URL query or fragment")
	}
	return RootedFilePath(path)
}

func ForEachAncestorDirectoryPath[T any](
	directory RootedDirectoryPath,
	callback func(directory RootedDirectoryPath) (result T, stop bool),
) (result T, ok bool) {
	for {
		result, stop := callback(directory)
		if stop {
			return result, true
		}
		parent := RootedDirectoryPath(getDirectoryPathFromNormalized(directory.AsString()))
		if parent == directory {
			var zero T
			return zero, false
		}
		directory = parent
	}
}

// ForEachAncestorDirectoryPathStoppingAtGlobalCache calls callback for
// directory and its ancestors while retaining the normalized rooted invariant.
func ForEachAncestorDirectoryPathStoppingAtGlobalCache[T any](
	globalCache RootedDirectoryPath,
	directory RootedDirectoryPath,
	callback func(directory RootedDirectoryPath) (result T, stop bool),
) T {
	result, _ := ForEachAncestorDirectoryPath(directory, func(ancestor RootedDirectoryPath) (T, bool) {
		result, stop := callback(ancestor)
		return result, stop || ancestor == globalCache
	})
	return result
}

func canAppendPathWithoutNormalization(path string) bool {
	return isNormalizedSlashesRelativePath(path) &&
		!hasRelativePathSegment(path) &&
		!HasTrailingDirectorySeparator(path)
}

func isNormalizedSlashesRelativePath(path string) bool {
	return path != "" &&
		GetEncodedRootLength(path) == 0 &&
		strings.IndexByte(path, '\\') < 0
}

func appendPathToDirectory(directory RootedDirectoryPath, path string) string {
	if HasTrailingDirectorySeparator(directory.AsString()) {
		return directory.AsString() + path
	}
	return directory.AsString() + "/" + path
}

func lastDirectorySeparator(path string) int {
	for i := len(path) - 1; i >= 0; i-- {
		if path[i] == DirectorySeparator {
			return i
		}
	}
	return -1
}
