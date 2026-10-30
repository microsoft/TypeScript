//go:build unix

package osutil

import (
	"time"

	"golang.org/x/sys/unix"
)

func processCPUTime() (time.Duration, error) {
	var usage unix.Rusage
	if err := unix.Getrusage(unix.RUSAGE_SELF, &usage); err != nil {
		return 0, err
	}
	return time.Duration(usage.Utime.Nano()) + time.Duration(usage.Stime.Nano()), nil
}
