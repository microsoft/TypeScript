package osvfs

import (
	"path/filepath"
	"sync"
	"unsafe"

	"golang.org/x/sys/unix"
)

// On macOS, we use open + fcntl(F_GETPATH) to resolve the canonical path in
// O(1) syscalls instead of Go's filepath.EvalSymlinks which does an lstat per
// path component — O(depth).
//
// How it works:
//   - open(path, O_EVTONLY|O_NONBLOCK|O_CLOEXEC) follows all symlinks and gives
//     us a lightweight fd. O_EVTONLY is macOS's event-only descriptor — it
//     doesn't require read permission (similar to Linux's O_PATH) but still
//     references the vnode. O_NONBLOCK prevents blocking on FIFOs.
//   - fcntl(fd, F_GETPATH, buf) asks the kernel for the canonical path of the
//     open file descriptor, written into a MAXPATHLEN buffer.
//
// unix.FcntlInt takes an int arg, but on darwin amd64/arm64 Go's int is
// 64 bits — the same width as a pointer — so the buffer address
// round-trips through int without loss.

var hasFGetPath = sync.OnceValue(func() bool {
	// Verify that F_GETPATH is supported by this kernel version.
	var buf [unix.PathMax]byte
	fd, err := unix.Open(".", unix.O_EVTONLY|unix.O_NONBLOCK|unix.O_CLOEXEC, 0)
	if err != nil {
		return false
	}
	defer unix.Close(fd)
	_, err = fcntlGetPath(fd, &buf)
	return err == nil
})

func fcntlGetPath(fd int, buf *[unix.PathMax]byte) (int, error) {
	return ignoringEINTR(func() (int, error) {
		return unix.FcntlInt(uintptr(fd), unix.F_GETPATH, int(uintptr(unsafe.Pointer(&buf[0]))))
	})
}

func realpath(path string) (string, error) {
	if !hasFGetPath() {
		return filepath.EvalSymlinks(path)
	}

	fd, err := unix.Open(path, unix.O_EVTONLY|unix.O_NONBLOCK|unix.O_CLOEXEC, 0)
	if err != nil {
		return "", err
	}
	defer unix.Close(fd)

	var buf [unix.PathMax]byte
	if _, err := fcntlGetPath(fd, &buf); err != nil {
		return "", err
	}

	return unix.ByteSliceToString(buf[:]), nil
}
