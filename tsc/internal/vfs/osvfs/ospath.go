//go:build !wasip1

package osvfs

func fromOSPath(path string, original string) string {
	return path
}
