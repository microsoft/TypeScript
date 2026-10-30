//go:build windows

package fswatch

import (
	"errors"
	"testing"
)

func TestWindowsZeroByteCompletionReportsOverflow(t *testing.T) {
	t.Parallel()

	s := &windowsSubscription{dirWatch: &dirWatch{dir: `C:\watch`, physicalDir: `C:\watch`}}
	if s.processCompletion(nil, make([]byte, 64), 0) {
		t.Fatal("processCompletion stopped the subscription")
	}
	if err := s.dirWatch.events.getError(); !errors.Is(err, ErrOverflow) {
		t.Fatalf("got error %v, want %v", err, ErrOverflow)
	}
}
