package tspath

type PathKey string
type RootedPath string
type RootedFilePath RootedPath
type RootedDirectoryPath RootedPath
type RelativePath string
type SourceMapLocation string
type ModuleSpecifier string
type FileSpec string
type PathPattern string
type CaseSensitivity uint8

func ToRootedFilePath(path string, currentDirectory RootedDirectoryPath) RootedFilePath {
	return RootedFilePath(path)
}

func RootedPathFromAbsolute(path string) RootedPath {
	return RootedPath(path)
}

func RootedFilePathFromAbsolute(path string) RootedFilePath {
	return RootedFilePath(path)
}

func RootedDirectoryPathFromAbsolute(path string) RootedDirectoryPath {
	return RootedDirectoryPath(path)
}

func RootedPathFromNormalized(path string) RootedPath {
	return RootedPath(path)
}

func RootedFilePathFromNormalized(path string) RootedFilePath {
	return RootedFilePath(path)
}

func RootedDirectoryPathFromNormalized(path string) RootedDirectoryPath {
	return RootedDirectoryPath(path)
}

func RootedDirectoryPathFromPath(path RootedPath) RootedDirectoryPath {
	return RootedDirectoryPath(path)
}

func ToRootedDirectoryPath(path string, currentDirectory RootedDirectoryPath) RootedDirectoryPath {
	return RootedDirectoryPath(path)
}

func RelativePathFromNormalized(path string) RelativePath {
	return RelativePath(path)
}

func PathKeyFromCanonical(path string) PathKey {
	return PathKey(path)
}

func ToRelativePath(path string) RelativePath {
	return RelativePath(path)
}

func NormalizePath(path string) string {
	return path
}

func NormalizeSlashes(path string) string {
	return path
}

func GetDirectoryPath(path string) string {
	return path
}

func EnsureTrailingDirectorySeparator(path string) string {
	return path
}

func RemoveTrailingDirectorySeparator(path string) string {
	return path
}

func (p PathKey) AsString() string {
	return string(p)
}

func (p PathKey) Parent() PathKey {
	return p
}

func (p PathKey) ContainsLowercaseDirectorySequence(sequence string) bool {
	return false
}

func (f RootedFilePath) AsString() string {
	return string(f)
}

func (f RootedFilePath) ContainsLowercaseDirectorySequence(sequence string) bool {
	return false
}

func (f RootedFilePath) Directory() RootedDirectoryPath {
	return RootedDirectoryPath(f)
}
