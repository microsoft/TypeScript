//go:build !unix

package osutil

import "os"

// ReraiseSignal is unsupported on this platform.
func ReraiseSignal(sig os.Signal) {}
