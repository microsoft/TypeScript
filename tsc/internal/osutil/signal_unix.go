//go:build unix

package osutil

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// ExitWithSignal terminates with sig, falling back to an exit code if the signal
// is ignored or cannot terminate the process.
func ExitWithSignal(sig os.Signal) {
	syscallSignal, ok := sig.(syscall.Signal)
	if !ok {
		fmt.Fprintf(os.Stderr, "Cannot re-raise signal %v\n", sig)
		os.Exit(1)
	}
	signal.Reset(syscallSignal)
	if !signal.Ignored(syscallSignal) {
		if err := syscall.Kill(os.Getpid(), syscallSignal); err != nil {
			fmt.Fprintf(os.Stderr, "Cannot re-raise signal %v: %v\n", sig, err)
		} else {
			// Signal delivery is asynchronous, but must not leave shutdown stuck.
			time.Sleep(time.Second)
		}
	}
	os.Exit(128 + int(syscallSignal))
}
