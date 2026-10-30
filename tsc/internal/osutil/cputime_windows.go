package osutil

import (
	"time"

	"golang.org/x/sys/windows"
)

func processCPUTime() (time.Duration, error) {
	var creation, exit, kernel, user windows.Filetime
	if err := windows.GetProcessTimes(windows.CurrentProcess(), &creation, &exit, &kernel, &user); err != nil {
		return 0, err
	}
	kernelTicks := uint64(kernel.HighDateTime)<<32 | uint64(kernel.LowDateTime)
	userTicks := uint64(user.HighDateTime)<<32 | uint64(user.LowDateTime)
	return time.Duration(kernelTicks+userTicks) * 100 * time.Nanosecond, nil
}
