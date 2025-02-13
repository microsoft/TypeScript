package osvfs

import (
	"errors"
	"os"
	"syscall"

	"golang.org/x/sys/windows"
)

// This implementation is based on what Node's fs.realpath.native does, via libuv: https://github.com/libuv/libuv/blob/ec5a4b54f7da7eeb01679005c615fee9633cdb3b/src/win/fs.c#L2937

func realpath(path string) (string, error) {
	h, err := openMetadata(path)
	if err != nil {
		return "", err
	}
	defer windows.CloseHandle(h) //nolint:errcheck

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

func openMetadata(path string) (windows.Handle, error) {
	// based on https://github.com/microsoft/go-winio/blob/3c9576c9346a1892dee136329e7e15309e82fb4f/pkg/fs/resolve.go#L113

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
			Path: path,
			Err:  err,
		}
	}
	return h, nil
}
