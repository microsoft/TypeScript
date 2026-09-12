//go:build linux

package nativepath

import "syscall"

func ignoringEINTR[T any](fn func() (T, error) /* ref: nonnil */) (T, error) {
	for {
		v, err := fn()
		if err != syscall.EINTR { //nolint:errorlint // syscall functions return raw syscall.Errno, never wrapped
			return v, err
		}
	}
}
