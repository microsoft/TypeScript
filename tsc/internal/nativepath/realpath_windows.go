package nativepath

import (
	"errors"
	"os"
	"path/filepath"
	"syscall"

	"golang.org/x/sys/windows"
)

// This implementation is based on what Node's fs.realpath.native does, via libuv: https://github.com/libuv/libuv/blob/ec5a4b54f7da7eeb01679005c615fee9633cdb3b/src/win/fs.c#L2937

func Realpath(path string) (string, error) {
	var h windows.Handle
	var err error
	closeHandle := false
	if len(path) < 248 {
		h, err = openMetadata(path, false)
		closeHandle = err == nil
	} else {
		// For long paths, defer to os.Open to run the path through fixLongPath.
		f, openErr := os.Open(path)
		if openErr == nil {
			defer f.Close()

			// Works on directories too since https://go.dev/cl/405275.
			h = windows.Handle(f.Fd())
		} else {
			err = openErr
		}
	}

	if err != nil && hasReservedPathComponent(path) {
		h, err = openMetadata(path, true)
		closeHandle = err == nil
	}
	if err != nil {
		return "", err
	}
	if closeHandle {
		defer windows.CloseHandle(h) //nolint:errcheck
	}

	// based on https://github.com/golang/go/blob/f4e3ec3dbe3b8e04a058d266adf8e048bab563f2/src/os/file_windows.go#L389

	const _VOLUME_NAME_DOS = 0

	buf := make([]uint16, 310) // https://github.com/microsoft/go-winio/blob/3c9576c9346a1892dee136329e7e15309e82fb4f/internal/stringbuffer/wstring.go#L13
	for {
		n, err := windows.GetFinalPathNameByHandle(h, &buf[0], uint32(len(buf)), _VOLUME_NAME_DOS)
		if err != nil {
			return "", err
		}
		if n < uint32(len(buf)) {
			break
		}
		buf = make([]uint16, n)
	}

	s := syscall.UTF16ToString(buf)
	if len(s) > 4 && s[:4] == `\\?\` {
		s = s[4:]
		if len(s) > 3 && s[:3] == `UNC` {
			// return path like \\server\share\...
			return `\` + s[3:], nil
		}
		return s, nil
	}

	return "", errors.New("GetFinalPathNameByHandle returned unexpected path: " + s)
}

func openMetadata(path string, useExtendedPath bool) (windows.Handle, error) {
	// based on https://github.com/microsoft/go-winio/blob/3c9576c9346a1892dee136329e7e15309e82fb4f/pkg/fs/resolve.go#L113

	originalPath := path
	if useExtendedPath && (len(path) < 4 || (path[:4] != `\\?\` && path[:4] != `\\.\`)) {
		var err error
		path, err = windows.FullPath(path)
		if err != nil {
			return windows.InvalidHandle, err
		}
		if len(path) >= 2 && path[:2] == `\\` {
			path = `\\?\UNC\` + path[2:]
		} else {
			path = `\\?\` + path
		}
	}

	pathUTF16, err := windows.UTF16PtrFromString(path)
	if err != nil {
		return windows.InvalidHandle, err
	}

	const (
		_FILE_ANY_ACCESS = 0

		_FILE_SHARE_READ   = 0x01
		_FILE_SHARE_WRITE  = 0x02
		_FILE_SHARE_DELETE = 0x04

		_OPEN_EXISTING = 0x03

		_FILE_FLAG_BACKUP_SEMANTICS = 0x0200_0000
	)

	h, err := windows.CreateFile(
		pathUTF16,
		_FILE_ANY_ACCESS,
		_FILE_SHARE_READ|_FILE_SHARE_WRITE|_FILE_SHARE_DELETE,
		nil,
		_OPEN_EXISTING,
		_FILE_FLAG_BACKUP_SEMANTICS,
		0,
	)
	if err != nil {
		return 0, &os.PathError{
			Op:   "CreateFile",
			Path: originalPath,
			Err:  err,
		}
	}
	return h, nil
}

func hasReservedPathComponent(path string) bool {
	componentStart := 0
	for i := 0; i <= len(path); i++ {
		if i == len(path) || path[i] == '\\' || path[i] == '/' {
			component := path[componentStart:i]
			if hasReservedNamePrefix(component) && !filepath.IsLocal(component) {
				return true
			}
			componentStart = i + 1
		}
	}
	return false
}

func hasReservedNamePrefix(name string) bool {
	if len(name) < 3 {
		return false
	}
	a := name[0] | 0x20
	b := name[1] | 0x20
	c := name[2] | 0x20
	return a == 'c' && (b == 'o' && (c == 'n' || c == 'm')) ||
		a == 'p' && b == 'r' && c == 'n' ||
		a == 'a' && b == 'u' && c == 'x' ||
		a == 'n' && b == 'u' && c == 'l' ||
		a == 'l' && b == 'p' && c == 't'
}
