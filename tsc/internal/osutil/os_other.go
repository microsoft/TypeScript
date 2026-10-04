//go:build !android

package osutil

import "os"

func args() []string {
	return os.Args
}

func executable() (string, error) {
	return os.Executable()
}
