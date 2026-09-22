//go:build linux

package fswatch

import "golang.org/x/sys/unix"

func reclenOf(d *unix.Dirent /* ref: nonnil */) uint16 { return d.Reclen }
func inoOf(d *unix.Dirent /* ref: nonnil */) uint64    { return d.Ino }
