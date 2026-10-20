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

func toOSPath(path string) string {
	if !mapDrives || !isDriveRooted(path) {
		return path
	}
	return driveMountPrefix + strings.ToLower(path[:1]) + path[2:]
}

func fromOSPath(path string) string {
	rest, ok := strings.CutPrefix(path, driveMountPrefix)
	if !mapDrives || !ok || len(rest) == 0 || !isDriveLetter(rest[0]) || len(rest) > 1 && rest[1] != '/' {
		return path
	}
	if len(rest) == 1 {
		rest += "/"
	}
	return strings.ToUpper(rest[:1]) + ":" + rest[1:]
}

func isDriveRooted(path string) bool {
	return len(path) >= 3 && isDriveLetter(path[0]) && path[1] == ':' && (path[2] == '/' || path[2] == '\\')
}

func isDriveLetter(char byte) bool {
	return 'a' <= char && char <= 'z' || 'A' <= char && char <= 'Z'
}
