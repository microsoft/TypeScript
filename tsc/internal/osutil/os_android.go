package osutil

import (
	"os"
	"path/filepath"
)

const termuxExecutableEnv = "TERMUX_EXEC__PROC_SELF_EXE"

func args() []string {
	args := os.Args
	if os.Getenv(termuxExecutableEnv) != "" && len(args) > 1 {
		// Termux launches non-cgo binaries through Android's linker, leaving the executable path in argv[1].
		if exe, err := executable(); err == nil && args[1] == exe {
			return append([]string{args[0]}, args[2:]...)
		}
	}
	return args
}

func executable() (string, error) {
	// Under Termux, /proc/self/exe identifies Android's linker rather than the executable it loaded.
	if exe := os.Getenv(termuxExecutableEnv); exe != "" {
		return filepath.Abs(exe)
	}
	return os.Executable()
}
