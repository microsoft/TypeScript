package ipc

import (
	"errors"
	"io"
	"net"
)

// Transport is an interface for accepting connections from API clients.
type Transport interface {
	// Accept waits for and returns the next connection.
	Accept() (io.ReadWriteCloser, error)
	// Close stops the transport from accepting new connections.
	Close() error
}

// PipeTransport accepts connections on a Unix domain socket or Windows named pipe.
type PipeTransport struct {
	listener net.Listener
	cleanup  func() error
}

// NewPipeTransport creates a new pipe transport.
// On Unix, path must not exist and is created as a private directory containing "socket".
// On Windows, path is the named pipe path.
func NewPipeTransport(path string) (*PipeTransport, error) {
	listener, cleanup, err := newPipeListener(path)
	if err != nil {
		return nil, err
	}
	return &PipeTransport{
		listener: listener,
		cleanup:  cleanup,
	}, nil
}

// NewPrivatePipeTransport creates a transport at a private, generated path.
func NewPrivatePipeTransport(name string) (*PipeTransport, error) {
	listener, cleanup, err := newPrivatePipeListener(name)
	if err != nil {
		return nil, err
	}
	return &PipeTransport{
		listener: listener,
		cleanup:  cleanup,
	}, nil
}

// Accept implements Transport.
func (t *PipeTransport) Accept() (io.ReadWriteCloser, error) {
	return t.listener.Accept()
}

// Close implements Transport.
func (t *PipeTransport) Close() error {
	closeErr := t.listener.Close()
	if t.cleanup == nil || errors.Is(closeErr, net.ErrClosed) {
		return closeErr
	}
	return errors.Join(closeErr, t.cleanup())
}

// Path returns the path of the pipe/socket.
func (t *PipeTransport) Path() string {
	return t.listener.Addr().String()
}

// StdioTransport wraps stdin/stdout as a single connection transport.
// It only accepts one connection.
type StdioTransport struct {
	stdin  io.ReadCloser
	stdout io.WriteCloser
	used   bool
}

// NewStdioTransport creates a transport using the given stdin/stdout.
func NewStdioTransport(stdin io.ReadCloser, stdout io.WriteCloser) *StdioTransport {
	return &StdioTransport{
		stdin:  stdin,
		stdout: stdout,
	}
}

// Accept implements Transport.
func (t *StdioTransport) Accept() (io.ReadWriteCloser, error) {
	if t.used {
		return nil, io.EOF
	}
	t.used = true
	return &stdioConn{
		Reader: t.stdin,
		Writer: t.stdout,
		stdin:  t.stdin,
		stdout: t.stdout,
	}, nil
}

// Close implements Transport.
func (t *StdioTransport) Close() error {
	return nil
}

type stdioConn struct {
	io.Reader
	io.Writer
	stdin  io.ReadCloser
	stdout io.WriteCloser
}

func (c *stdioConn) Close() error {
	err1 := c.stdin.Close()
	err2 := c.stdout.Close()
	if err1 != nil {
		return err1
	}
	return err2
}
