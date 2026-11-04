package ipc

import (
	"io"
	"strconv"
	"time"
)

// DefaultSyncSpin is the spin budget used by the synchronous API server when
// TSGO_SYNC_SPIN_US is not set.
const DefaultSyncSpin = 100 * time.Microsecond

// ParseSyncSpin interprets the value of TSGO_SYNC_SPIN_US, the number of
// microseconds the server polls its input for readability before falling back
// to a blocking read. An unset or empty variable selects DefaultSyncSpin; 0 (or
// anything that is not a positive integer) disables spinning.
func ParseSyncSpin(value string) time.Duration {
	if value == "" {
		return DefaultSyncSpin
	}
	v, err := strconv.Atoi(value)
	if err != nil || v <= 0 {
		return 0
	}
	return time.Duration(v) * time.Microsecond
}

// ParseSyncSpinAdaptive interprets the value of TSGO_SYNC_SPIN_ADAPTIVE. The
// adaptive mode is on unless the variable is set to "0": spinning is suspended
// after a few consecutive messages that arrived long after the budget ran out
// (a peer that is idle between messages) and resumed once blocking reads are
// again served quickly.
func ParseSyncSpinAdaptive(value string) bool {
	return value != "0"
}

// Adaptive spin state machine: adaptiveWindow is the number of consecutive
// observations that flips the mode in either direction, and adaptiveSlowWait
// the wait beyond which the peer counts as idle rather than merely paying
// wake-up latency. The budget itself cannot be the criterion: a blocked read
// on a host with deep idle states returns after ~200us even when the peer
// answered immediately.
const (
	adaptiveWindow   = 3
	adaptiveSlowWait = time.Millisecond
)

// MessageBoundaryReader is implemented by readers that adapt to the cadence of
// the messages framed on top of them. The framing layer calls BeginMessage
// before it reads the first byte of a message from the reader; the wait for
// that byte is what describes the peer's cadence, while the reads that complete
// a message already under way say nothing about it.
type MessageBoundaryReader interface {
	io.Reader
	BeginMessage()
}

// spinState decides whether the next read should spin, from the observed wait
// for the first byte of each previous message.
type spinState struct {
	spinning bool
	// misses counts consecutive slow waits while spinning, hits consecutive
	// fast waits while blocking.
	misses int
	hits   int
}

// observe records that the first byte of a message arrived after the given
// wait and updates the mode.
func (s *spinState) observe(waited time.Duration) {
	if s.spinning {
		if waited > adaptiveSlowWait {
			s.misses++
			if s.misses >= adaptiveWindow {
				s.spinning, s.misses = false, 0
			}
		} else {
			s.misses = 0
		}
		return
	}
	if waited < adaptiveSlowWait {
		s.hits++
		if s.hits >= adaptiveWindow {
			s.spinning, s.hits = true, 0
		}
	} else {
		s.hits = 0
	}
}
