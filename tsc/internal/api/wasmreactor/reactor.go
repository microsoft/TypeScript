// Package wasmreactor runs an API server inside the current process and
// exchanges its protocol messages through direct calls instead of a pipe.
package wasmreactor

import (
	"context"
	"errors"
	"io"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/api"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type Options struct {
	Cwd                       string `json:"cwd"`
	UseCaseSensitiveFileNames *bool  `json:"useCaseSensitiveFileNames"`
	CollectTiming             bool   `json:"collectTiming"`
}

// Message is a protocol tuple exchanged with the server.
type Message struct {
	Type    api.MessageType
	Method  string
	Payload []byte
}

// ErrIdle is returned by Receive when the server is waiting for a message
// instead of producing one.
var ErrIdle = errors.New("the server is waiting for a message")

// Reactor hosts an API server whose base file system is in memory. The
// server runs on its own goroutine and is driven by Send and Receive, so the
// client can serve callbacks and make nested requests exactly as it would
// over a pipe, even on single-threaded hosts where blocking with no runnable
// goroutine would be fatal.
type Reactor struct {
	ctx     context.Context
	cancel  context.CancelFunc
	options Options
	files   *memFS
	cwd     tspath.RootedDirectoryPath

	mu     sync.Mutex
	inbox  chan Message
	outbox chan Message
	// idle is closed while the server waits for a message, and replaced
	// by Send, so every Receive in between reports ErrIdle.
	idle    chan struct{}
	isIdle  bool
	closed  chan struct{}
	started bool
	done    chan struct{}
	err     error
}

func New(ctx context.Context, options Options) *Reactor {
	if options.Cwd == "" {
		options.Cwd = "/"
	}
	caseSensitivity := tspath.CaseSensitive
	if options.UseCaseSensitiveFileNames != nil && !*options.UseCaseSensitiveFileNames {
		caseSensitivity = tspath.CaseInsensitive
	}
	ctx, cancel := context.WithCancel(ctx)
	return &Reactor{
		ctx:     ctx,
		cancel:  cancel,
		options: options,
		files:   newMemFS(caseSensitivity),
		cwd:     tspath.RootedDirectoryPathFromAbsolute(options.Cwd),
		inbox:   make(chan Message, 1),
		outbox:  make(chan Message),
		idle:    make(chan struct{}),
		closed:  make(chan struct{}),
		done:    make(chan struct{}),
	}
}

// Start runs the server, delegating the named file system operations to the
// client. It must be called once, before the first Send.
func (r *Reactor) Start(callbacks []string) error {
	if r.started {
		return errors.New("the server has already started")
	}
	r.started = true
	server := api.NewStdioServer(&api.StdioServerOptions{
		Cwd:                       r.cwd,
		DefaultLibraryPath:        bundled.LibPath(),
		Callbacks:                 callbacks,
		UseCaseSensitiveFileNames: r.options.UseCaseSensitiveFileNames,
		CollectTiming:             r.options.CollectTiming,
		FS:                        r.files,
		Tuples:                    (*tupleTransport)(r),
	})
	go func() {
		defer close(r.done)
		r.err = server.Run(r.ctx)
	}()
	return nil
}

// Started reports whether Start has been called.
func (r *Reactor) Started() bool {
	return r.started
}

// Send delivers a message to the server without running it.
func (r *Reactor) Send(message Message) error {
	if !r.started {
		return errors.New("the server has not started")
	}
	r.mu.Lock()
	defer r.mu.Unlock()
	select {
	case r.inbox <- message:
	default:
		return errors.New("a message is already waiting for the server")
	}
	if r.isIdle {
		// The server is about to receive this message, so it is no longer idle.
		r.idle = make(chan struct{})
		r.isIdle = false
	}
	return nil
}

// Receive runs the server until it produces its next message. It returns
// ErrIdle if the server needs a message first, or io.EOF with the server's
// result once it has stopped.
func (r *Reactor) Receive() (Message, error) {
	if !r.started {
		return Message{}, errors.New("the server has not started")
	}
	select {
	case message := <-r.outbox:
		return message, nil
	default:
		// Run the server until it writes, waits, or stops.
	}
	r.mu.Lock()
	idle := r.idle
	r.mu.Unlock()
	select {
	case message := <-r.outbox:
		return message, nil
	case <-idle:
		select {
		case <-r.done:
			// A stopped server stays idle; report that it stopped instead.
			return r.stopped()
		default:
			return Message{}, ErrIdle
		}
	case <-r.done:
		return r.stopped()
	}
}

func (r *Reactor) stopped() (Message, error) {
	if r.err != nil {
		return Message{}, r.err
	}
	return Message{}, io.EOF
}

func (r *Reactor) SetFile(path string, content string) error {
	return r.files.WriteFile(tspath.ToRootedFilePath(path, r.cwd), content)
}

func (r *Reactor) ReadFile(path string) (string, bool) {
	return r.files.ReadFile(tspath.ToRootedFilePath(path, r.cwd))
}

func (r *Reactor) RemoveFile(path string) error {
	return r.files.Remove(tspath.ToRootedPath(path, r.cwd))
}

// Close stops the server and waits for it to exit.
func (r *Reactor) Close() {
	select {
	case <-r.closed:
		return
	default:
		// Not yet closed.
	}
	r.cancel()
	close(r.closed)
	if r.started {
		<-r.done
	}
}

// tupleTransport is the server's end of the reactor's message channels.
type tupleTransport Reactor

func (t *tupleTransport) ReadTuple() (api.MessageType, string, []byte, error) {
	t.mu.Lock()
	select {
	case message := <-t.inbox:
		t.mu.Unlock()
		return message.Type, message.Method, message.Payload, nil
	default:
		// No message is waiting, so the server is idle.
	}
	if !t.isIdle {
		t.isIdle = true
		close(t.idle)
	}
	t.mu.Unlock()
	select {
	case message := <-t.inbox:
		return message.Type, message.Method, message.Payload, nil
	case <-t.closed:
		return 0, "", nil, io.EOF
	}
}

func (t *tupleTransport) WriteTuple(msgType api.MessageType, method string, payload []byte) error {
	select {
	case t.outbox <- Message{Type: msgType, Method: method, Payload: payload}:
		return nil
	case <-t.closed:
		return io.ErrClosedPipe
	}
}
