//go:build !unix

package osutil

import "os"

// ExitWithSignal terminates unsuccessfully on platforms without Unix signals.
func ExitWithSignal(sig os.Signal) {
	os.Exit(1)
}
