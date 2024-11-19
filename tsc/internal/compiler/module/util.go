package module

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
)

func ParseNodeModuleFromPath(resolved string, isFolder bool) string {
	path := tspath.NormalizePath(resolved)
	idx := strings.LastIndex(path, "/node_modules/")
	if idx == -1 {
		return ""
	}

	indexAfterNodeModules := idx + len("/node_modules/")
	indexAfterPackageName := moveToNextDirectorySeparatorIfAvailable(path, indexAfterNodeModules, isFolder)
	if path[indexAfterNodeModules] == '@' {
		indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterPackageName, isFolder)
	}
	return path[:indexAfterPackageName]
}

func ParsePackageName(moduleName string) (packageName, rest string) {
	idx := strings.Index(moduleName, "/")
	if len(moduleName) > 0 && moduleName[0] == '@' {
		idx = strings.Index(moduleName[idx+1:], "/") + idx + 1
	}
	if idx == -1 {
		return moduleName, ""
	}
	return moduleName[:idx], moduleName[idx+1:]
}
