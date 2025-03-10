package tsbaseline

import (
	"regexp"
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
)

var (
	lineDelimiter      = regexp.MustCompile("\r?\n")
	nonWhitespace      = regexp.MustCompile(`\S`)
	tsExtension        = regexp.MustCompile(`\.tsx?$`)
	testPathCharacters = regexp.MustCompile(`[\^<>:"|?*%]`)
	testPathDotDot     = regexp.MustCompile(`\.\.\/`)
)

var (
	libFolder   = "built/local/"
	builtFolder = "/.ts"
)

var (
	testPathPrefixReplacer = strings.NewReplacer(
		"/.ts/", "",
		"/.lib/", "",
		"/.src/", "",
		"bundled:///libs/", "",
		"file:///./ts/", "file:///",
		"file:///./lib/", "file:///",
		"file:///./src/", "file:///",
	)
	testPathTrailingReplacerTrailingSeparator = strings.NewReplacer(
		"/.ts/", "/",
		"/.lib/", "/",
		"/.src/", "/",
		"bundled:///libs/", "/",
		"file:///./ts/", "file:///",
		"file:///./lib/", "file:///",
		"file:///./src/", "file:///",
	)
)

func removeTestPathPrefixes(text string, retainTrailingDirectorySeparator bool) string {
	if retainTrailingDirectorySeparator {
		return testPathTrailingReplacerTrailingSeparator.Replace(text)
	}
	return testPathPrefixReplacer.Replace(text)
}

func isDefaultLibraryFile(filePath string) bool {
	fileName := tspath.GetBaseFileName(filePath)
	return strings.HasPrefix(fileName, "lib.") && strings.HasSuffix(fileName, tspath.ExtensionDts)
}

func isBuiltFile(filePath string) bool {
	return strings.HasPrefix(filePath, libFolder) || strings.HasPrefix(filePath, tspath.EnsureTrailingDirectorySeparator(builtFolder))
}

func isTsConfigFile(path string) bool {
	// !!! fix to check for just prefixes/suffixes
	return strings.Contains(path, "tsconfig") && strings.Contains(path, "json")
}

func sanitizeTestFilePath(name string) string {
	path := testPathCharacters.ReplaceAllString(name, "_")
	path = tspath.NormalizeSlashes(path)
	path = testPathDotDot.ReplaceAllString(path, "__dotdot/")
	path = string(tspath.ToPath(path, "", false /*useCaseSensitiveFileNames*/))
	return strings.TrimPrefix(path, "/")
}
