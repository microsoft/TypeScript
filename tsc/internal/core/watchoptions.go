package core

import "time"

func (w *WatchOptions) WatchInterval() time.Duration {
	watchInterval := 2000 * time.Millisecond
	if w != nil && w.Interval != nil {
		watchInterval = time.Duration(*w.Interval) * time.Millisecond
	}
	return watchInterval
}
