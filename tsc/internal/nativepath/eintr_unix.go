//go:build linux || darwin

package nativepath

import "syscall"

func ignoringEINTR[T any](fn func() (T, error)) (T, error) {
	for {
		v, err := fn()
		if err != syscall.EINTR { //nolint:errorlint // syscall functions return raw syscall.Errno, never wrapped
			return v, err
		}
	}
}
