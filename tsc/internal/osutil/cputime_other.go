//go:build !unix && !windows

package osutil

import (
	"errors"
	"time"
)

func processCPUTime() (time.Duration, error) {
	return 0, errors.ErrUnsupported
}
