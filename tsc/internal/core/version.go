package core

import (
	"strings"
)

// This is a var so it can be overridden by ldflags.
var version = "7.0.1-rc"

func Version() string {
	return version
}

var versionMajorMinor = func() string {
	seenMajor := false
	i := strings.IndexFunc(version, func(r rune) bool {
		if r == '.' {
			if seenMajor {
				return true
			}
			seenMajor = true
		}
		return false
	})
	if i == -1 {
		panic("invalid version string: " + version)
	}
	return version[:i]
}()

func VersionMajorMinor() string {
	return versionMajorMinor
}
