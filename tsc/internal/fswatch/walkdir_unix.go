//go:build linux || darwin || freebsd || openbsd || netbsd || dragonfly

package fswatch

import (
	"errors"
	"unsafe"

	"golang.org/x/sys/unix"
)

// walkState carries state shared across the whole walk so we only
// allocate one read buffer per top-level walkDir, not one per directory.
type walkState struct {
	buf []byte
}

// walkDir walks dir, optionally recursively, invoking fn for each entry.
// On Linux/BSDs it uses getdents/getdirentries directly so the d_type
// in each record drives the isDir flag without a stat.
func walkDir(dir string, recursive bool, fn func(path string, isDir bool) error) error {
	const openFlags = unix.O_RDONLY | unix.O_CLOEXEC | unix.O_DIRECTORY |
		unix.O_NOCTTY | unix.O_NONBLOCK | unix.O_NOFOLLOW
	fd, err := unix.Open(dir, openFlags, 0)
	if err != nil {
		// Fall back to a path-based open when O_DIRECTORY rejects a
		// non-directory: walkDir's contract is to return ENOTDIR.
		if errors.Is(err, unix.ENOTDIR) {
			return unix.ENOTDIR
		}
		return err
	}
	defer unix.Close(fd)

	st := &walkState{buf: make([]byte, 8192)}
	return iterateDir(st, fd, dir, recursive, fn)
}

// iterateDir reads fd's entries, invokes fn for the dir and each entry,
// and recurses into subdirectories via openat(fd, name). fd is owned by
// the caller; iterateDir does not close it. Sharing fd as the openat
// anchor for children avoids reopening the parent path once for the
// listing and again for each child.
func iterateDir(st *walkState, fd int, dirname string, recursive bool, fn func(path string, isDir bool) error) error {
	if fn != nil {
		if err := fn(dirname, true); err != nil {
			return err
		}
	}
	entries, err := readDirEntries(fd, st.buf)
	if err != nil {
		return err
	}

	const childOpenFlags = unix.O_RDONLY | unix.O_CLOEXEC | unix.O_DIRECTORY |
		unix.O_NOCTTY | unix.O_NONBLOCK | unix.O_NOFOLLOW
	for _, ent := range entries {
		fullPath := dirname + "/" + ent.name
		isDir := ent.typ == unix.DT_DIR
		if ent.typ == unix.DT_UNKNOWN {
			var attrib unix.Stat_t
			if err := unix.Lstat(fullPath, &attrib); err != nil {
				continue
			}
			isDir = (attrib.Mode & unix.S_IFMT) == unix.S_IFDIR
		}
		if !isDir {
			if fn != nil {
				if err := fn(fullPath, false); err != nil {
					return err
				}
			}
			continue
		}
		if !recursive {
			if fn != nil {
				if err := fn(fullPath, true); err != nil {
					return err
				}
			}
			continue
		}
		childFD, err := unix.Openat(fd, ent.name, childOpenFlags, 0)
		if err != nil {
			if errors.Is(err, unix.EACCES) || errors.Is(err, unix.ENOTDIR) || errors.Is(err, unix.ENOENT) {
				continue
			}
			return err
		}
		err = iterateDir(st, childFD, fullPath, recursive, fn)
		unix.Close(childFD)
		if err != nil {
			return err
		}
	}
	return nil
}

type unixDirent struct {
	name string
	typ  uint8
}

// readDirEntries reads every entry on fd via getdents/getdirentries,
// extracting d_type so callers can skip per-entry lstat on filesystems
// that support it. The supplied buf is reused for every getdents
// syscall in the loop and may be reused across calls.
func readDirEntries(fd int, buf []byte) ([]unixDirent, error) {
	var entries []unixDirent
	for {
		n, err := unix.ReadDirent(fd, buf)
		if err != nil {
			return nil, err
		}
		if n <= 0 {
			break
		}
		data := buf[:n]
		for len(data) > 0 {
			dirent := (*unix.Dirent)(unsafe.Pointer(&data[0]))
			reclen := reclenOf(dirent)
			if reclen == 0 || int(reclen) > len(data) {
				break
			}
			if inoOf(dirent) == 0 {
				data = data[reclen:]
				continue
			}
			nameOff := unsafe.Offsetof(dirent.Name)
			nameBytes := data[nameOff:reclen]
			for i, b := range nameBytes {
				if b == 0 {
					nameBytes = nameBytes[:i]
					break
				}
			}
			name := string(nameBytes)
			if name != "." && name != ".." {
				entries = append(entries, unixDirent{name: name, typ: dirent.Type})
			}
			data = data[reclen:]
		}
	}
	return entries, nil
}
