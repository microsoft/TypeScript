// Package wasmreactor hosts an API session without an IPC transport.
package wasmreactor

import (
	"context"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/api"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/ipc"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type Options struct {
	Cwd                       string              `json:"cwd"`
	UseCaseSensitiveFileNames *bool               `json:"useCaseSensitiveFileNames"`
	CollectTiming             bool                `json:"collectTiming"`
	WrapFS                    func(vfs.FS) vfs.FS `json:"-"`
	Conn                      ipc.Conn            `json:"-"`
}

type Reactor struct {
	ctx     context.Context
	cancel  context.CancelFunc
	session *api.Session
	files   vfs.FS
	cwd     tspath.RootedDirectoryPath
	timing  *ipc.ServerTimingCollector
}

func New(ctx context.Context, options Options) *Reactor {
	if options.Cwd == "" {
		options.Cwd = "/"
	}
	cwd := tspath.RootedDirectoryPathFromAbsolute(options.Cwd)
	caseSensitivity := tspath.CaseSensitive
	if options.UseCaseSensitiveFileNames != nil && !*options.UseCaseSensitiveFileNames {
		caseSensitivity = tspath.CaseInsensitive
	}
	files := newMemFS(caseSensitivity)
	var projectFiles vfs.FS = files
	if options.WrapFS != nil {
		projectFiles = options.WrapFS(projectFiles)
	}
	ctx, cancel := context.WithCancel(ctx)
	sessionInit := &project.SessionInit{
		BackgroundCtx: ctx,
		FS:            bundled.WrapFS(projectFiles),
		Options: &project.SessionOptions{
			CurrentDirectory:   cwd,
			DefaultLibraryPath: bundled.LibPath(),
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			LoggingEnabled:     false,
		},
	}
	session := api.NewStandaloneSession(sessionInit, &api.SessionOptions{UseBinaryResponses: true})
	if options.Conn != nil {
		session.SetConnection(options.Conn)
	}
	reactor := &Reactor{
		ctx:     ctx,
		cancel:  cancel,
		session: session,
		files:   files,
		cwd:     cwd,
	}
	if options.CollectTiming {
		reactor.timing = ipc.NewServerTimingCollector()
	}
	return reactor
}

func (r *Reactor) HandleRequest(method string, payload []byte) ([]byte, error) {
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
		return nil, err
	}
	if raw, ok := result.(api.RawBinary); ok {
		return []byte(raw), nil
	}
	return marshalResponse(result)
}

func marshalResponse(result any) ([]byte, error) {
	encoded, err := json.Marshal(result)
	if err != nil {
		return nil, err
	}
	return encoded, nil
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

func (r *Reactor) Close() {
	r.cancel()
	r.session.Close()
}
