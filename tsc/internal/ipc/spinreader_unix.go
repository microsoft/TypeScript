//go:build unix

package ipc

import (
	"io"
	"time"

	"golang.org/x/sys/unix"
)

// spinReadCloser wraps the synchronous connection's input: before each
// blocking Read it polls the descriptor for readability for up to `spin`.
// Between the back-to-back requests of a synchronous client the wait is
// typically a few tens of microseconds; blocking immediately lets the CPU drop
// into a deep idle state whose exit latency (~190us for C6 on current Intel
// hosts) then dominates the round trip. Spinning briefly keeps the core out of
// the deep state at the cost of one otherwise idle core while the client is
// busy; the adaptive mode gives that core back when the client goes quiet.
type spinReadCloser struct {
	r        io.ReadCloser
	fd       int32
	spin     time.Duration
	adaptive bool
	state    spinState
	// observeNext is set by BeginMessage: the next Read waits for the first
	// byte of a message, and that wait is what the adaptive mode observes.
	observeNext bool
}

var _ MessageBoundaryReader = (*spinReadCloser)(nil)

// NewSpinReadCloser wraps r so that reads spin-poll for up to `spin` before
// blocking. r is returned unchanged when spin <= 0 or when r does not expose a
// file descriptor.
func NewSpinReadCloser(r io.ReadCloser, spin time.Duration, adaptive bool) io.ReadCloser {
	if spin <= 0 {
		return r
	}
	f, ok := r.(interface{ Fd() uintptr })
	if !ok {
		return r
	}
	return &spinReadCloser{
		r:        r,
		fd:       int32(f.Fd()),
		spin:     spin,
		adaptive: adaptive,
		state:    spinState{spinning: true},
	}
}

// BeginMessage implements MessageBoundaryReader. Without it the adaptive mode
// never observes anything and the reader spins with its fixed budget.
func (r *spinReadCloser) BeginMessage() {
	r.observeNext = true
}

func (r *spinReadCloser) Read(p []byte) (int, error) {
	observe := r.adaptive && r.observeNext
	r.observeNext = false
	start := time.Now()
	if !r.adaptive || r.state.spinning {
		fds := []unix.PollFd{{Fd: r.fd, Events: unix.POLLIN}}
		deadline := start.Add(r.spin)
		for {
			n, err := unix.Poll(fds, 0)
			if n > 0 || (err != nil && err != unix.EINTR) || time.Now().After(deadline) {
				break
			}
		}
	}
	n, err := r.r.Read(p)
	if observe {
		r.state.observe(time.Since(start))
	}
	return n, err
}

func (r *spinReadCloser) Close() error {
	return r.r.Close()
}
