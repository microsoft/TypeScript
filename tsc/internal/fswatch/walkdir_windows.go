//go:build windows

package fswatch

import (
	"fmt"
	"syscall"
	"unsafe"

	"golang.org/x/sys/windows"
)

// walkDir walks a directory tree on Windows using FindFirstFile/FindNextFile.
func walkDir(dir string, recursive bool, fn func(path string, isDir bool) error) error {
	rootPtr, err := windows.UTF16PtrFromString(dir)
	if err != nil {
		return err
	}
	var rootData windows.Win32FileAttributeData
	if err := windows.GetFileAttributesEx(rootPtr, windows.GetFileExInfoStandard, (*byte)(unsafe.Pointer(&rootData))); err != nil {
		return fmt.Errorf("error opening directory: %w", err)
	}
	if rootData.FileAttributes&windows.FILE_ATTRIBUTE_DIRECTORY == 0 ||
		rootData.FileAttributes&windows.FILE_ATTRIBUTE_REPARSE_POINT != 0 {
		return syscall.ENOTDIR
	}
	if fn != nil {
		if err := fn(dir, true); err != nil {
			return err
		}
	}

	stack := []string{dir}
	for len(stack) > 0 {
		path := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		spec := path + "\\*"
		specPtr, err := windows.UTF16PtrFromString(spec)
		if err != nil {
			return err
		}
		var ffd windows.Win32finddata
		hFind, err := windows.FindFirstFile(specPtr, &ffd)
		if err != nil {
			if path == dir {
				return fmt.Errorf("error opening directory: %w", err)
			}
			continue
		}
		for {
			name := windows.UTF16ToString(ffd.FileName[:])
			if name != "." && name != ".." {
				fullPath := path + "\\" + name
				isDir := ffd.FileAttributes&windows.FILE_ATTRIBUTE_DIRECTORY != 0 &&
					ffd.FileAttributes&windows.FILE_ATTRIBUTE_REPARSE_POINT == 0
				if fn != nil {
					if err := fn(fullPath, isDir); err != nil {
						windows.FindClose(hFind)
						return err
					}
				}
				if isDir && recursive {
					stack = append(stack, fullPath)
				}
			}
			if err := windows.FindNextFile(hFind, &ffd); err != nil {
				break
			}
		}
		windows.FindClose(hFind)
	}
	return nil
}
