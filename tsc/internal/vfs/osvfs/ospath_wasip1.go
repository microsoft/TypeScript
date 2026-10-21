//go:build wasip1

package osvfs

import (
	"os"
	"strings"
)

// A Windows host runs the compiler with a drive-rooted working directory and
// preopens each drive at /mnt/<letter>, since WASI paths have no drive roots.
var mapDrives = isDriveRooted(os.Getenv("PWD"))

const driveMountPrefix = "/mnt/"

// Dynamic URI paths (^/...) and, without drive mapping, drive-rooted paths
// are relative in WASI, so they resolve against the working directory. The
// browser host mounts workspaces there for them.
var relativeRoot = relativeRootFor(os.Getenv("PWD"))

func relativeRootFor(pwd string) string {
	if pwd == "" {
		pwd = "/"
	}
	root := toOSPath(pwd)
	if !strings.HasSuffix(root, "/") {
		root += "/"
	}
	return root
}

func toOSPath(path string) string {
	if !mapDrives || !isDriveRooted(path) {
		return path
	}
	return driveMountPrefix + strings.ToLower(path[:1]) + path[2:]
}

// fromOSPath converts a path the OS resolved from original back to a
// compiler path.
func fromOSPath(path string, original string) string {
	if isRelativeInWASI(original) {
		if rel, ok := strings.CutPrefix(path, relativeRoot); ok {
			if len(rel) == 2 && isDriveLetter(rel[0]) && rel[1] == ':' {
				rel += "/"
			}
			if isRelativeInWASI(rel) {
				return rel
			}
		}
	}
	rest, ok := strings.CutPrefix(path, driveMountPrefix)
	if !mapDrives || !ok || len(rest) == 0 || !isDriveLetter(rest[0]) || len(rest) > 1 && rest[1] != '/' {
		return path
	}
	if len(rest) == 1 {
		rest += "/"
	}
	return strings.ToUpper(rest[:1]) + ":" + rest[1:]
}

func isRelativeInWASI(path string) bool {
	return strings.HasPrefix(path, "^/") || !mapDrives && isDriveRooted(path)
}

func isDriveRooted(path string) bool {
	return len(path) >= 3 && isDriveLetter(path[0]) && path[1] == ':' && (path[2] == '/' || path[2] == '\\')
}

func isDriveLetter(char byte) bool {
	return 'a' <= char && char <= 'z' || 'A' <= char && char <= 'Z'
}
