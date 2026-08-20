package tspath

import "strings"

var ignoredPaths = []string{
	"/node_modules/.",
	"/.git",
	".#",
}

func ContainsIgnoredPath(path string) bool {
	for _, pattern := range ignoredPaths {
		if strings.Contains(path, pattern) {
			return true
		}
	}
	return false
}
