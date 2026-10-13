//go:build !windows

package ipc

import (
	"errors"
	"io"
	"syscall"
	"time"

	"golang.org/x/sys/unix"
)

// NewPollingReader wraps r so that reads poll a non-blocking pipe or socket for up to window
// before falling back to a blocking wait. Synchronous clients typically send their next
// request within tens of microseconds of receiving a response; polling for that long avoids
// the scheduler wakeup latency of a blocking read. It returns r unchanged when window is not
// positive or r is not backed by a pipe or socket file descriptor.
func NewPollingReader(r io.ReadCloser, window time.Duration) io.ReadCloser {
	conn, ok := r.(syscall.Conn)
	if !ok || window <= 0 {
		return r
	}
	raw, err := conn.SyscallConn()
	if err != nil {
		return r
	}
	fd := -1
	if err := raw.Control(func(descriptor uintptr) { fd = int(descriptor) }); err != nil || fd < 0 {
		return r
	}
	var stat unix.Stat_t
	if err := unix.Fstat(fd, &stat); err != nil {
		return r
	}
	if mode := stat.Mode & unix.S_IFMT; mode != unix.S_IFIFO && mode != unix.S_IFSOCK {
		return r
	}
	// All further reads go through raw syscalls below, so switching the descriptor to
	// non-blocking mode does not affect r's own reads.
	if err := unix.SetNonblock(fd, true); err != nil {
		return r
	}
	return &pollingReader{closer: r, fd: fd, window: window}
}

type pollingReader struct {
	closer io.Closer
	fd     int
	window time.Duration
}

func (p *pollingReader) Read(b []byte) (int, error) {
	if len(b) == 0 {
		return 0, nil
	}
	var deadline time.Time
	for {
		n, err := unix.Read(p.fd, b)
		switch {
		case err == nil:
			if n == 0 {
				return 0, io.EOF
			}
			return n, nil
		case errors.Is(err, unix.EINTR):
			continue
		case !errors.Is(err, unix.EAGAIN):
			return 0, err
		}
		now := time.Now()
		if deadline.IsZero() {
			deadline = now.Add(p.window)
			continue
		}
		if now.Before(deadline) {
			continue
		}
		fds := []unix.PollFd{{Fd: int32(p.fd), Events: unix.POLLIN}}
		if _, err := unix.Poll(fds, -1); err != nil && !errors.Is(err, unix.EINTR) {
			return 0, err
		}
	}
}

func (p *pollingReader) Close() error {
	return p.closer.Close()
}
