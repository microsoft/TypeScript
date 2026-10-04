//go:build darwin

package fswatch

import "golang.org/x/sys/unix"

func reclenOf(d *unix.Dirent) uint16 { return d.Reclen }
func inoOf(d *unix.Dirent) uint64    { return d.Ino }
