package nativepath

// IsNetworkPath reports whether Windows may resolve path over the network.
// This includes UNC paths (`//server/share`), Win32 device paths (`//?/...`,
// `//./...`), and NT object paths (`/??/...`), with either separator. Device
// and object paths are included even when they name local volumes, because
// their `UNC` and `GLOBALROOT` forms reach the network redirector.
//
// Accessing such a path can make Windows authenticate to an arbitrary host,
// leaking credentials, so these paths are never accessed on any platform.
func IsNetworkPath(path string) bool {
	if len(path) < 2 || !isAnyDirectorySeparator(path[0]) {
		return false
	}
	if isAnyDirectorySeparator(path[1]) {
		return true
	}
	return len(path) >= 3 && path[1] == '?' && path[2] == '?' && (len(path) == 3 || isAnyDirectorySeparator(path[3]))
}

func isAnyDirectorySeparator(char byte) bool {
	return char == '/' || char == '\\'
}
