//go:build !darwin

package nativepath

// RealpathDirectory delegates to Realpath without checking that path is a
// directory. macOS provides a directory-specific implementation.
func RealpathDirectory(path string) (string, error) {
	return Realpath(path)
}
