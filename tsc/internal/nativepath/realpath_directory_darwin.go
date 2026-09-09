//go:build darwin

package nativepath

import (
	"path/filepath"
	"unsafe"

	"golang.org/x/sys/unix"
)

func fcntlGetPath(fd int, buf *[unix.PathMax]byte) (int, error) {
	return ignoringEINTR(func() (int, error) {
		return fcntlGetPathPtr(uintptr(fd), uintptr(unsafe.Pointer(&buf[0])))
	})
}

// Keep the pointer conversion in the call to this function. The compiler
// directive below keeps the buffer alive across fcntl.
//
//go:uintptrescapes
func fcntlGetPathPtr(fd uintptr, buf uintptr) (int, error) {
	return unix.FcntlInt(fd, unix.F_GETPATH, int(buf))
}

// RealpathDirectory returns the kernel's path spelling for a directory.
// F_GETPATH is restricted to directories because files with multiple hard
// links can have multiple valid kernel paths. Other inputs and failures use
// Realpath.
func RealpathDirectory(path string) (string, error) {
	fd, err := ignoringEINTR(func() (int, error) {
		return unix.Open(path, unix.O_EVTONLY|unix.O_NONBLOCK|unix.O_CLOEXEC|unix.O_DIRECTORY, 0)
	})
	if err != nil {
		return Realpath(path)
	}
	defer unix.Close(fd)

	var stat unix.Stat_t
	if err := unix.Fstat(fd, &stat); err != nil {
		return Realpath(path)
	}
	if stat.Mode&unix.S_IFMT != unix.S_IFDIR {
		return Realpath(path)
	}

	var buf [unix.PathMax]byte
	if _, err := fcntlGetPath(fd, &buf); err != nil {
		return Realpath(path)
	}
	realpath := unix.ByteSliceToString(buf[:])
	if realpath == "" || !filepath.IsAbs(realpath) {
		return Realpath(path)
	}
	return realpath, nil
}
