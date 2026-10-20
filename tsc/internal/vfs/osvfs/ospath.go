//go:build !wasip1

package osvfs

func toOSPath(path string) string {
	return path
}

func fromOSPath(path string) string {
	return path
}
