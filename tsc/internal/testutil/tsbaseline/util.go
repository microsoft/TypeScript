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
	testPathPrefix     = regexp.MustCompile(`(?:(file:\/{3})|\/)\.(?:ts|lib|src)\/`)
	testPathCharacters = regexp.MustCompile(`[\^<>:"|?*%]`)
	testPathDotDot     = regexp.MustCompile(`\.\.\/`)
)

var (
	libFolder   = "built/local/"
	builtFolder = "/.ts"
)

func removeTestPathPrefixes(text string, retainTrailingDirectorySeparator bool) string {
	return testPathPrefix.ReplaceAllStringFunc(text, func(match string) string {
		scheme := testPathPrefix.FindStringSubmatch(match)[1]
		if scheme != "" {
			return scheme
		}
		if retainTrailingDirectorySeparator {
			return "/"
		}
		return ""
	})
}

func isDefaultLibraryFile(filePath string) bool {
	fileName := tspath.GetBaseFileName(filePath)
	return strings.HasPrefix(fileName, "lib.") && strings.HasSuffix(fileName, tspath.ExtensionDts)
}

func isBuiltFile(filePath string) bool {
	return strings.HasPrefix(filePath, libFolder) || strings.HasPrefix(filePath, tspath.EnsureTrailingDirectorySeparator(builtFolder))
}

func isTsConfigFile(path string) bool {
	return strings.Contains(path, "tsconfig") && strings.Contains(path, "json")
}

func sanitizeTestFilePath(name string) string {
	path := testPathCharacters.ReplaceAllString(name, "_")
	path = tspath.NormalizeSlashes(path)
	path = testPathDotDot.ReplaceAllString(path, "__dotdot/")
	path = string(tspath.ToPath(path, "", false /*useCaseSensitiveFileNames*/))
	return strings.TrimPrefix(path, "/")
}
