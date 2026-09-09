package tspath

import "strings"

var ignoredPaths = []string{
	"/node_modules/.",
	"/.git",
	".#",
}

func containsIgnoredPath(path string) bool {
	for _, pattern := range ignoredPaths {
		if strings.Contains(path, pattern) {
			return true
		}
	}
	return false
}

func ContainsIgnoredPath(path RootedPath) bool {
	return containsIgnoredPath(path.AsString())
}

func ContainsIgnoredDirectory(directory RootedDirectoryPath) bool {
	return containsIgnoredPath(directory.AsString())
}

func ContainsIgnoredPathKey(path PathKey) bool {
	return containsIgnoredPath(path.AsString())
}
