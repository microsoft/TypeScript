//go:build unix

package osutil

import (
	"os"
	"os/signal"
	"runtime"
	"syscall"
)

// ReraiseSignal restores the default handler and sends sig to the current process.
func ReraiseSignal(sig os.Signal) {
	syscallSignal, ok := sig.(syscall.Signal)
	if !ok {
		return
	}
	signal.Reset(syscallSignal)
	if err := syscall.Kill(os.Getpid(), syscallSignal); err != nil {
		return
	}
	for {
		runtime.Gosched()
	}
}
