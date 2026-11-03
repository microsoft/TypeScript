//go:build wasip1

package osvfs

import (
	"os"
	"strings"
)

// Dynamic URI paths (^/...) and drive-rooted paths are relative in WASI, so
// they resolve against the working directory. The browser host mounts
// workspaces there for them.
var relativeRoot = func() string {
	pwd := os.Getenv("PWD")
	if !strings.HasSuffix(pwd, "/") {
		pwd += "/"
	}
	return pwd
}()

// fromOSPath converts a path the OS resolved from original back to a
// compiler path.
func fromOSPath(path string, original string) string {
	if !isRelativeInWASI(original) {
		return path
	}
	rel, ok := strings.CutPrefix(path, relativeRoot)
	if !ok {
		return path
	}
	if len(rel) == 2 && isDriveLetter(rel[0]) && rel[1] == ':' {
		rel += "/"
	}
	if !isRelativeInWASI(rel) {
		return path
	}
	return rel
}

func isRelativeInWASI(path string) bool {
	return strings.HasPrefix(path, "^/") || isDriveRooted(path)
}

func isDriveRooted(path string) bool {
	return len(path) >= 3 && isDriveLetter(path[0]) && path[1] == ':' && (path[2] == '/' || path[2] == '\\')
}

func isDriveLetter(char byte) bool {
	return 'a' <= char && char <= 'z' || 'A' <= char && char <= 'Z'
}
