package ipc

import (
	"context"
	"io"
	"net"
	"sync"
)

// Transport is an interface for accepting connections from API clients.
type Transport interface {
	// Accept waits for and returns the next connection.
	Accept(ctx context.Context) (io.ReadWriteCloser, error)
	// Close stops the transport from accepting new connections.
	Close() error
}

// PipeTransport accepts connections on a Unix domain socket or Windows named pipe.
type PipeTransport struct {
	listener net.Listener
	once     sync.Once
	closeErr error
}

// NewPipeTransport creates a new transport listening on the given path.
// On Unix, this creates a Unix domain socket. On Windows, this creates a named pipe.
func NewPipeTransport(path string) (*PipeTransport, error) {
	listener, err := newPipeListener(path)
	if err != nil {
		return nil, err
	}
	return &PipeTransport{listener: listener}, nil
}

// Accept implements Transport.
func (t *PipeTransport) Accept(ctx context.Context) (io.ReadWriteCloser, error) {
	done := make(chan struct{})
	go func() {
		select {
		case <-ctx.Done():
			_ = t.close()
		case <-done:
			return
		}
	}()
	conn, err := t.listener.Accept()
	close(done)
	if closeErr := t.close(); err != nil {
		if ctxErr := ctx.Err(); ctxErr != nil {
			return nil, ctxErr
		}
		return nil, err
	} else if closeErr != nil {
		conn.Close()
		return nil, closeErr
	} else if ctxErr := ctx.Err(); ctxErr != nil {
		conn.Close()
		return nil, ctxErr
	}
	return conn, nil
}

// Close implements Transport.
func (t *PipeTransport) Close() error {
	return t.close()
}

func (t *PipeTransport) close() error {
	t.once.Do(func() {
		t.closeErr = t.listener.Close()
	})
	return t.closeErr
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
func (t *StdioTransport) Accept(_ context.Context) (io.ReadWriteCloser, error) {
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
