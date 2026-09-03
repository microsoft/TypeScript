// Package wasmreactor hosts an API session without an IPC transport.
package wasmreactor

import (
	"context"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/api"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

type Options struct {
	Cwd                       string              `json:"cwd"`
	UseCaseSensitiveFileNames *bool               `json:"useCaseSensitiveFileNames"`
	CollectTiming             bool                `json:"collectTiming"`
	WrapFS                    func(vfs.FS) vfs.FS `json:"-"`
}

type Response struct {
	Data []byte
}

type Reactor struct {
	ctx       context.Context
	cancel    context.CancelFunc
	session   *api.Session
	files     vfs.FS
	timing    *ipc.ServerTimingCollector
	closeOnce sync.Once
}

func New(ctx context.Context, options Options) *Reactor {
	if options.Cwd == "" {
		options.Cwd = "/"
	}
	useCaseSensitiveFileNames := options.UseCaseSensitiveFileNames == nil || *options.UseCaseSensitiveFileNames
	files := vfstest.FromMap(map[string]string{}, useCaseSensitiveFileNames)
	var projectFiles vfs.FS = files
	if options.WrapFS != nil {
		projectFiles = options.WrapFS(projectFiles)
	}
	ctx, cancel := context.WithCancel(ctx)
	sessionInit := &project.SessionInit{
		BackgroundCtx: ctx,
		FS:            bundled.WrapFS(projectFiles),
		Options: &project.SessionOptions{
			CurrentDirectory:   options.Cwd,
			DefaultLibraryPath: bundled.LibPath(),
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			LoggingEnabled:     false,
		},
	}
	reactor := &Reactor{
		ctx:     ctx,
		cancel:  cancel,
		session: api.NewStandaloneSession(sessionInit, &api.SessionOptions{UseBinaryResponses: true}),
		files:   files,
	}
	if options.CollectTiming {
		reactor.timing = ipc.NewServerTimingCollector()
	}
	return reactor
}

func (r *Reactor) HandleRequest(method string, payload []byte) (Response, error) {
	switch method {
	case ipc.MethodGetServerTiming:
		return marshalResponse(ipc.ServerTimingSnapshot(r.timing))
	case ipc.MethodResetServerTiming:
		if r.timing != nil {
			r.timing.Reset()
		}
		return marshalResponse(nil)
	}

	start := time.Now()
	result, err := r.session.HandleRequest(r.ctx, method, json.Value(payload))
	if r.timing != nil {
		r.timing.Record(method, time.Since(start))
	}
	if err != nil {
		return Response{}, err
	}
	if raw, ok := result.(api.RawBinary); ok {
		return Response{Data: []byte(raw)}, nil
	}
	return marshalResponse(result)
}

func marshalResponse(result any) (Response, error) {
	encoded, err := json.Marshal(result)
	if err != nil {
		return Response{}, err
	}
	return Response{Data: encoded}, nil
}

func (r *Reactor) SetFile(path string, content string) error {
	return r.files.WriteFile(path, content)
}

func (r *Reactor) ReadFile(path string) (string, bool) {
	return r.files.ReadFile(path)
}

func (r *Reactor) RemoveFile(path string) error {
	return r.files.Remove(path)
}

func (r *Reactor) Close() {
	r.closeOnce.Do(func() {
		r.cancel()
		r.session.Close()
	})
}
