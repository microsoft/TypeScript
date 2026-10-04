package nativepath

import (
	"os"
	"path/filepath"
	"strconv"
	"sync"

	"golang.org/x/sys/unix"
)

// On Linux, we use the O_PATH + /proc/self/fd trick to resolve the canonical
// path in O(1) syscalls (open + readlink + close) instead of Go's
// filepath.EvalSymlinks which does an lstat per path component — O(depth).
//
// This is the approach libuv/Node.js could use, though libuv currently just
// calls C realpath(3) which itself does a readlink per component. On the Go
// side, the per-component approach is even more expensive because each
// os.Lstat call involves goroutine scheduling overhead (entersyscall /
// exitsyscall).
//
// How it works:
//   - open(path, O_PATH|O_CLOEXEC) gives us a lightweight fd that follows all
//     symlinks to the final target. O_PATH requires only search permission on
//     directories (same as lstat), and works for both files and directories.
//   - readlink("/proc/self/fd/<fd>") returns the fully resolved canonical path
//     that the kernel computed during the open.
//
// Falls back to filepath.EvalSymlinks if /proc is not available (e.g. containers
// or chroots without procfs mounted).

const _procSelfFD = "/proc/self/fd/"

var hasProcSelfFD = sync.OnceValue(func() bool {
	var stat unix.Stat_t
	return unix.Stat(_procSelfFD, &stat) == nil
})

func Realpath(path string) (string, error) {
	if !hasProcSelfFD() {
		return filepath.EvalSymlinks(path)
	}

	fd, err := ignoringEINTR(func() (int, error) {
		return unix.Open(path, unix.O_CLOEXEC|unix.O_PATH, 0)
	})
	if err != nil {
		return "", &os.PathError{Op: "open", Path: path, Err: err}
	}
	defer unix.Close(fd)

	var procBuf [len(_procSelfFD) + 20]byte // 20 digits is enough for any int64 fd
	n := copy(procBuf[:], _procSelfFD)
	n += copy(procBuf[n:], strconv.Itoa(fd))
	procPath := string(procBuf[:n])

	buf := make([]byte, 256)
	for {
		nn, err := ignoringEINTR(func() (int, error) {
			return unix.Readlink(procPath, buf)
		})
		if err != nil {
			return "", &os.PathError{Op: "readlink", Path: path, Err: err}
		}
		if nn < len(buf) {
			return string(buf[:nn]), nil
		}
		buf = make([]byte, len(buf)*2)
	}
}
