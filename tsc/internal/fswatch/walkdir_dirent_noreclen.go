//go:build dragonfly

package fswatch

import (
	"unsafe"

	"golang.org/x/sys/unix"
)

// DragonFlyBSD's Dirent has no Reclen field; compute it from Namlen
// by rounding up to the next 8-byte boundary (matching the kernel layout).
func reclenOf(d *unix.Dirent) uint16 {
	return uint16(alignUp(unsafe.Offsetof(d.Name)+uintptr(d.Namlen)+1, 8))
}

func inoOf(d *unix.Dirent) uint64 { return d.Fileno }

// alignUp rounds n up to a multiple of a. a must be a power of 2.
func alignUp(n, a uintptr) uintptr {
	return (n + a - 1) &^ (a - 1)
}
