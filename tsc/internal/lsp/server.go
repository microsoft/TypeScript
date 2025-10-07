package lsp

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"os/signal"
	"runtime/debug"
	"slices"
	"sync"
	"sync/atomic"
	"syscall"
	"time"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/project/ata"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"golang.org/x/sync/errgroup"
	"golang.org/x/text/language"
)

type ServerOptions struct {
	In  Reader
	Out Writer
	Err io.Writer

	Cwd                string
	FS                 vfs.FS
	DefaultLibraryPath string
	TypingsLocation    string
	ParseCache         *project.ParseCache
}

func NewServer(opts *ServerOptions) *Server {
	if opts.Cwd == "" {
		panic("Cwd is required")
	}
	return &Server{
		r:                     opts.In,
		w:                     opts.Out,
		stderr:                opts.Err,
		logger:                logging.NewLogger(opts.Err),
		requestQueue:          make(chan *lsproto.RequestMessage, 100),
		outgoingQueue:         make(chan *lsproto.Message, 100),
		pendingClientRequests: make(map[lsproto.ID]pendingClientRequest),
		pendingServerRequests: make(map[lsproto.ID]chan *lsproto.ResponseMessage),
		cwd:                   opts.Cwd,
		fs:                    opts.FS,
		defaultLibraryPath:    opts.DefaultLibraryPath,
		typingsLocation:       opts.TypingsLocation,
		parseCache:            opts.ParseCache,
	}
}

var (
	_ ata.NpmExecutor = (*Server)(nil)
	_ project.Client  = (*Server)(nil)
)

type pendingClientRequest struct {
	req    *lsproto.RequestMessage
	cancel context.CancelFunc
}

type Reader interface {
	Read() (*lsproto.Message, error)
}

type Writer interface {
	Write(msg *lsproto.Message) error
}

type lspReader struct {
	r *lsproto.BaseReader
}

type lspWriter struct {
	w *lsproto.BaseWriter
}

func (r *lspReader) Read() (*lsproto.Message, error) {
	data, err := r.r.Read()
	if err != nil {
		return nil, err
	}

	req := &lsproto.Message{}
	if err := json.Unmarshal(data, req); err != nil {
		return nil, fmt.Errorf("%w: %w", lsproto.ErrInvalidRequest, err)
	}

	return req, nil
}

func ToReader(r io.Reader) Reader {
	return &lspReader{r: lsproto.NewBaseReader(r)}
}

func (w *lspWriter) Write(msg *lsproto.Message) error {
	data, err := json.Marshal(msg)
	if err != nil {
		return fmt.Errorf("failed to marshal message: %w", err)
	}
	return w.w.Write(data)
}

func ToWriter(w io.Writer) Writer {
	return &lspWriter{w: lsproto.NewBaseWriter(w)}
}

var (
	_ Reader = (*lspReader)(nil)
	_ Writer = (*lspWriter)(nil)
)

type Server struct {
	r Reader
	w Writer

	stderr io.Writer

	logger                  logging.Logger
	clientSeq               atomic.Int32
	requestQueue            chan *lsproto.RequestMessage
	outgoingQueue           chan *lsproto.Message
	pendingClientRequests   map[lsproto.ID]pendingClientRequest
	pendingClientRequestsMu sync.Mutex
	pendingServerRequests   map[lsproto.ID]chan *lsproto.ResponseMessage
	pendingServerRequestsMu sync.Mutex

	cwd                string
	fs                 vfs.FS
	defaultLibraryPath string
	typingsLocation    string

	initializeParams *lsproto.InitializeParams
	positionEncoding lsproto.PositionEncodingKind
	locale           language.Tag

	watchEnabled bool
	watcherID    atomic.Uint32
	watchers     collections.SyncSet[project.WatcherID]

	session *project.Session

	// !!! temporary; remove when we have `handleDidChangeConfiguration`/implicit project config support
	compilerOptionsForInferredProjects *core.CompilerOptions
	// parseCache can be passed in so separate tests can share ASTs
	parseCache *project.ParseCache
}

// WatchFiles implements project.Client.
func (s *Server) WatchFiles(ctx context.Context, id project.WatcherID, watchers []*lsproto.FileSystemWatcher) error {
	_, err := s.sendRequest(ctx, lsproto.MethodClientRegisterCapability, &lsproto.RegistrationParams{
		Registrations: []*lsproto.Registration{
			{
				Id:     string(id),
				Method: string(lsproto.MethodWorkspaceDidChangeWatchedFiles),
				RegisterOptions: ptrTo(any(lsproto.DidChangeWatchedFilesRegistrationOptions{
					Watchers: watchers,
				})),
			},
		},
	})
	if err != nil {
		return fmt.Errorf("failed to register file watcher: %w", err)
	}

	s.watchers.Add(id)
	return nil
}

// UnwatchFiles implements project.Client.
func (s *Server) UnwatchFiles(ctx context.Context, id project.WatcherID) error {
	if s.watchers.Has(id) {
		_, err := s.sendRequest(ctx, lsproto.MethodClientUnregisterCapability, &lsproto.UnregistrationParams{
			Unregisterations: []*lsproto.Unregistration{
				{
					Id:     string(id),
					Method: string(lsproto.MethodWorkspaceDidChangeWatchedFiles),
				},
			},
		})
		if err != nil {
			return fmt.Errorf("failed to unregister file watcher: %w", err)
		}

		s.watchers.Delete(id)
		return nil
	}

	return fmt.Errorf("no file watcher exists with ID %s", id)
}

// RefreshDiagnostics implements project.Client.
func (s *Server) RefreshDiagnostics(ctx context.Context) error {
	if s.initializeParams.Capabilities == nil ||
		s.initializeParams.Capabilities.Workspace == nil ||
		s.initializeParams.Capabilities.Workspace.Diagnostics == nil ||
		!ptrIsTrue(s.initializeParams.Capabilities.Workspace.Diagnostics.RefreshSupport) {
		return nil
	}

	if _, err := s.sendRequest(ctx, lsproto.MethodWorkspaceDiagnosticRefresh, nil); err != nil {
		return fmt.Errorf("failed to refresh diagnostics: %w", err)
	}

	return nil
}

func (s *Server) Run() error {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	g, ctx := errgroup.WithContext(ctx)
	g.Go(func() error { return s.dispatchLoop(ctx) })
	g.Go(func() error { return s.writeLoop(ctx) })

	// Don't run readLoop in the group, as it blocks on stdin read and cannot be cancelled.
	readLoopErr := make(chan error, 1)
	g.Go(func() error {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case err := <-readLoopErr:
			return err
		}
	})
	go func() { readLoopErr <- s.readLoop(ctx) }()

	if err := g.Wait(); err != nil && !errors.Is(err, io.EOF) && ctx.Err() != nil {
		return err
	}
	return nil
}

func (s *Server) readLoop(ctx context.Context) error {
	for {
		if err := ctx.Err(); err != nil {
			return err
		}
		msg, err := s.read()
		if err != nil {
			if errors.Is(err, lsproto.ErrInvalidRequest) {
				s.sendError(nil, err)
				continue
			}
			return err
		}

		if s.initializeParams == nil && msg.Kind == lsproto.MessageKindRequest {
			req := msg.AsRequest()
			if req.Method == lsproto.MethodInitialize {
				resp, err := s.handleInitialize(ctx, req.Params.(*lsproto.InitializeParams), req)
				if err != nil {
					return err
				}
				s.sendResult(req.ID, resp)
			} else {
				s.sendError(req.ID, lsproto.ErrServerNotInitialized)
			}
			continue
		}

		if msg.Kind == lsproto.MessageKindResponse {
			resp := msg.AsResponse()
			s.pendingServerRequestsMu.Lock()
			if respChan, ok := s.pendingServerRequests[*resp.ID]; ok {
				respChan <- resp
				close(respChan)
				delete(s.pendingServerRequests, *resp.ID)
			}
			s.pendingServerRequestsMu.Unlock()
		} else {
			req := msg.AsRequest()
			if req.Method == lsproto.MethodCancelRequest {
				s.cancelRequest(req.Params.(*lsproto.CancelParams).Id)
			} else {
				s.requestQueue <- req
			}
		}
	}
}

func (s *Server) cancelRequest(rawID lsproto.IntegerOrString) {
	id := lsproto.NewID(rawID)
	s.pendingClientRequestsMu.Lock()
	defer s.pendingClientRequestsMu.Unlock()
	if pendingReq, ok := s.pendingClientRequests[*id]; ok {
		pendingReq.cancel()
		delete(s.pendingClientRequests, *id)
	}
}

func (s *Server) read() (*lsproto.Message, error) {
	return s.r.Read()
}

func (s *Server) dispatchLoop(ctx context.Context) error {
	ctx, lspExit := context.WithCancel(ctx)
	defer lspExit()
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case req := <-s.requestQueue:
			requestCtx := core.WithLocale(ctx, s.locale)
			if req.ID != nil {
				var cancel context.CancelFunc
				requestCtx, cancel = context.WithCancel(core.WithRequestID(requestCtx, req.ID.String()))
				s.pendingClientRequestsMu.Lock()
				s.pendingClientRequests[*req.ID] = pendingClientRequest{
					req:    req,
					cancel: cancel,
				}
				s.pendingClientRequestsMu.Unlock()
			}

			handle := func() {
				if err := s.handleRequestOrNotification(requestCtx, req); err != nil {
					if errors.Is(err, context.Canceled) {
						s.sendError(req.ID, lsproto.ErrRequestCancelled)
					} else if errors.Is(err, io.EOF) {
						lspExit()
					} else {
						s.sendError(req.ID, err)
					}
				}

				if req.ID != nil {
					s.pendingClientRequestsMu.Lock()
					delete(s.pendingClientRequests, *req.ID)
					s.pendingClientRequestsMu.Unlock()
				}
			}

			if isBlockingMethod(req.Method) {
				handle()
			} else {
				go handle()
			}
		}
	}
}

func (s *Server) writeLoop(ctx context.Context) error {
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case msg := <-s.outgoingQueue:
			if err := s.w.Write(msg); err != nil {
				return fmt.Errorf("failed to write message: %w", err)
			}
		}
	}
}

func (s *Server) sendRequest(ctx context.Context, method lsproto.Method, params any) (any, error) {
	id := lsproto.NewIDString(fmt.Sprintf("ts%d", s.clientSeq.Add(1)))
	req := lsproto.NewRequestMessage(method, id, params)

	responseChan := make(chan *lsproto.ResponseMessage, 1)
	s.pendingServerRequestsMu.Lock()
	s.pendingServerRequests[*id] = responseChan
	s.pendingServerRequestsMu.Unlock()

	s.outgoingQueue <- req.Message()

	select {
	case <-ctx.Done():
		s.pendingServerRequestsMu.Lock()
		defer s.pendingServerRequestsMu.Unlock()
		if respChan, ok := s.pendingServerRequests[*id]; ok {
			close(respChan)
			delete(s.pendingServerRequests, *id)
		}
		return nil, ctx.Err()
	case resp := <-responseChan:
		if resp.Error != nil {
			return nil, fmt.Errorf("request failed: %s", resp.Error.String())
		}
		return resp.Result, nil
	}
}

func (s *Server) sendResult(id *lsproto.ID, result any) {
	s.sendResponse(&lsproto.ResponseMessage{
		ID:     id,
		Result: result,
	})
}

func (s *Server) sendError(id *lsproto.ID, err error) {
	code := lsproto.ErrInternalError.Code
	if errCode := (*lsproto.ErrorCode)(nil); errors.As(err, &errCode) {
		code = errCode.Code
	}
	// TODO(jakebailey): error data
	s.sendResponse(&lsproto.ResponseMessage{
		ID: id,
		Error: &lsproto.ResponseError{
			Code:    code,
			Message: err.Error(),
		},
	})
}

func (s *Server) sendResponse(resp *lsproto.ResponseMessage) {
	s.outgoingQueue <- resp.Message()
}

func (s *Server) handleRequestOrNotification(ctx context.Context, req *lsproto.RequestMessage) error {
	if handler := handlers()[req.Method]; handler != nil {
		return handler(s, ctx, req)
	}
	s.Log("unknown method", req.Method)
	if req.ID != nil {
		s.sendError(req.ID, lsproto.ErrInvalidRequest)
	}
	return nil
}

type handlerMap map[lsproto.Method]func(*Server, context.Context, *lsproto.RequestMessage) error

var handlers = sync.OnceValue(func() handlerMap {
	handlers := make(handlerMap)

	registerRequestHandler(handlers, lsproto.InitializeInfo, (*Server).handleInitialize)
	registerNotificationHandler(handlers, lsproto.InitializedInfo, (*Server).handleInitialized)
	registerRequestHandler(handlers, lsproto.ShutdownInfo, (*Server).handleShutdown)
	registerNotificationHandler(handlers, lsproto.ExitInfo, (*Server).handleExit)

	registerNotificationHandler(handlers, lsproto.TextDocumentDidOpenInfo, (*Server).handleDidOpen)
	registerNotificationHandler(handlers, lsproto.TextDocumentDidChangeInfo, (*Server).handleDidChange)
	registerNotificationHandler(handlers, lsproto.TextDocumentDidSaveInfo, (*Server).handleDidSave)
	registerNotificationHandler(handlers, lsproto.TextDocumentDidCloseInfo, (*Server).handleDidClose)
	registerNotificationHandler(handlers, lsproto.WorkspaceDidChangeWatchedFilesInfo, (*Server).handleDidChangeWatchedFiles)
	registerNotificationHandler(handlers, lsproto.SetTraceInfo, (*Server).handleSetTrace)

	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentDiagnosticInfo, (*Server).handleDocumentDiagnostic)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentHoverInfo, (*Server).handleHover)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentDefinitionInfo, (*Server).handleDefinition)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentTypeDefinitionInfo, (*Server).handleTypeDefinition)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentCompletionInfo, (*Server).handleCompletion)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentReferencesInfo, (*Server).handleReferences)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentImplementationInfo, (*Server).handleImplementations)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentSignatureHelpInfo, (*Server).handleSignatureHelp)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentFormattingInfo, (*Server).handleDocumentFormat)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentRangeFormattingInfo, (*Server).handleDocumentRangeFormat)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentOnTypeFormattingInfo, (*Server).handleDocumentOnTypeFormat)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentDocumentSymbolInfo, (*Server).handleDocumentSymbol)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentRenameInfo, (*Server).handleRename)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentDocumentHighlightInfo, (*Server).handleDocumentHighlight)
	registerRequestHandler(handlers, lsproto.WorkspaceSymbolInfo, (*Server).handleWorkspaceSymbol)
	registerRequestHandler(handlers, lsproto.CompletionItemResolveInfo, (*Server).handleCompletionItemResolve)

	return handlers
})

func registerNotificationHandler[Req any](handlers handlerMap, info lsproto.NotificationInfo[Req], fn func(*Server, context.Context, Req) error) {
	handlers[info.Method] = func(s *Server, ctx context.Context, req *lsproto.RequestMessage) error {
		if s.session == nil && req.Method != lsproto.MethodInitialized {
			return lsproto.ErrServerNotInitialized
		}

		var params Req
		// Ignore empty params; all generated params are either pointers or any.
		if req.Params != nil {
			params = req.Params.(Req)
		}
		if err := fn(s, ctx, params); err != nil {
			return err
		}
		return ctx.Err()
	}
}

func registerRequestHandler[Req, Resp any](
	handlers handlerMap,
	info lsproto.RequestInfo[Req, Resp],
	fn func(*Server, context.Context, Req, *lsproto.RequestMessage) (Resp, error),
) {
	handlers[info.Method] = func(s *Server, ctx context.Context, req *lsproto.RequestMessage) error {
		if s.session == nil && req.Method != lsproto.MethodInitialize {
			return lsproto.ErrServerNotInitialized
		}

		var params Req
		// Ignore empty params.
		if req.Params != nil {
			params = req.Params.(Req)
		}
		resp, err := fn(s, ctx, params, req)
		if err != nil {
			return err
		}
		if ctx.Err() != nil {
			return ctx.Err()
		}
		s.sendResult(req.ID, resp)
		return nil
	}
}

func registerLanguageServiceDocumentRequestHandler[Req lsproto.HasTextDocumentURI, Resp any](handlers handlerMap, info lsproto.RequestInfo[Req, Resp], fn func(*Server, context.Context, *ls.LanguageService, Req) (Resp, error)) {
	handlers[info.Method] = func(s *Server, ctx context.Context, req *lsproto.RequestMessage) error {
		var params Req
		// Ignore empty params.
		if req.Params != nil {
			params = req.Params.(Req)
		}
		ls, err := s.session.GetLanguageService(ctx, params.TextDocumentURI())
		if err != nil {
			return err
		}
		defer s.recover(req)
		resp, err := fn(s, ctx, ls, params)
		if err != nil {
			return err
		}
		if ctx.Err() != nil {
			return ctx.Err()
		}
		s.sendResult(req.ID, resp)
		return nil
	}
}

func (s *Server) recover(req *lsproto.RequestMessage) {
	if r := recover(); r != nil {
		stack := debug.Stack()
		s.Log("panic handling request", req.Method, r, string(stack))
		if req.ID != nil {
			s.sendError(req.ID, fmt.Errorf("%w: panic handling request %s: %v", lsproto.ErrInternalError, req.Method, r))
		} else {
			s.Log("unhandled panic in notification", req.Method, r)
		}
	}
}

func (s *Server) handleInitialize(ctx context.Context, params *lsproto.InitializeParams, _ *lsproto.RequestMessage) (lsproto.InitializeResponse, error) {
	if s.initializeParams != nil {
		return nil, lsproto.ErrInvalidRequest
	}

	s.initializeParams = params

	s.positionEncoding = lsproto.PositionEncodingKindUTF16
	if genCapabilities := s.initializeParams.Capabilities.General; genCapabilities != nil && genCapabilities.PositionEncodings != nil {
		if slices.Contains(*genCapabilities.PositionEncodings, lsproto.PositionEncodingKindUTF8) {
			s.positionEncoding = lsproto.PositionEncodingKindUTF8
		}
	}

	if s.initializeParams.Locale != nil {
		locale, err := language.Parse(*s.initializeParams.Locale)
		if err != nil {
			return nil, err
		}
		s.locale = locale
	}

	if s.initializeParams.Trace != nil && *s.initializeParams.Trace == "verbose" {
		s.logger.SetVerbose(true)
	}

	response := &lsproto.InitializeResult{
		ServerInfo: &lsproto.ServerInfo{
			Name:    "typescript-go",
			Version: ptrTo(core.Version()),
		},
		Capabilities: &lsproto.ServerCapabilities{
			PositionEncoding: ptrTo(s.positionEncoding),
			TextDocumentSync: &lsproto.TextDocumentSyncOptionsOrKind{
				Options: &lsproto.TextDocumentSyncOptions{
					OpenClose: ptrTo(true),
					Change:    ptrTo(lsproto.TextDocumentSyncKindIncremental),
					Save: &lsproto.BooleanOrSaveOptions{
						Boolean: ptrTo(true),
					},
				},
			},
			HoverProvider: &lsproto.BooleanOrHoverOptions{
				Boolean: ptrTo(true),
			},
			DefinitionProvider: &lsproto.BooleanOrDefinitionOptions{
				Boolean: ptrTo(true),
			},
			TypeDefinitionProvider: &lsproto.BooleanOrTypeDefinitionOptionsOrTypeDefinitionRegistrationOptions{
				Boolean: ptrTo(true),
			},
			ReferencesProvider: &lsproto.BooleanOrReferenceOptions{
				Boolean: ptrTo(true),
			},
			ImplementationProvider: &lsproto.BooleanOrImplementationOptionsOrImplementationRegistrationOptions{
				Boolean: ptrTo(true),
			},
			DiagnosticProvider: &lsproto.DiagnosticOptionsOrRegistrationOptions{
				Options: &lsproto.DiagnosticOptions{
					InterFileDependencies: true,
				},
			},
			CompletionProvider: &lsproto.CompletionOptions{
				TriggerCharacters: &ls.TriggerCharacters,
				ResolveProvider:   ptrTo(true),
				// !!! other options
			},
			SignatureHelpProvider: &lsproto.SignatureHelpOptions{
				TriggerCharacters: &[]string{"(", ","},
			},
			DocumentFormattingProvider: &lsproto.BooleanOrDocumentFormattingOptions{
				Boolean: ptrTo(true),
			},
			DocumentRangeFormattingProvider: &lsproto.BooleanOrDocumentRangeFormattingOptions{
				Boolean: ptrTo(true),
			},
			DocumentOnTypeFormattingProvider: &lsproto.DocumentOnTypeFormattingOptions{
				FirstTriggerCharacter: "{",
				MoreTriggerCharacter:  &[]string{"}", ";", "\n"},
			},
			WorkspaceSymbolProvider: &lsproto.BooleanOrWorkspaceSymbolOptions{
				Boolean: ptrTo(true),
			},
			DocumentSymbolProvider: &lsproto.BooleanOrDocumentSymbolOptions{
				Boolean: ptrTo(true),
			},
			RenameProvider: &lsproto.BooleanOrRenameOptions{
				Boolean: ptrTo(true),
			},
			DocumentHighlightProvider: &lsproto.BooleanOrDocumentHighlightOptions{
				Boolean: ptrTo(true),
			},
		},
	}

	return response, nil
}

func (s *Server) handleInitialized(ctx context.Context, params *lsproto.InitializedParams) error {
	if shouldEnableWatch(s.initializeParams) {
		s.watchEnabled = true
	}

	cwd := s.cwd
	if s.initializeParams.Capabilities != nil &&
		s.initializeParams.Capabilities.Workspace != nil &&
		s.initializeParams.Capabilities.Workspace.WorkspaceFolders != nil &&
		ptrIsTrue(s.initializeParams.Capabilities.Workspace.WorkspaceFolders) &&
		s.initializeParams.WorkspaceFolders != nil &&
		s.initializeParams.WorkspaceFolders.WorkspaceFolders != nil &&
		len(*s.initializeParams.WorkspaceFolders.WorkspaceFolders) == 1 {
		cwd = lsproto.DocumentUri((*s.initializeParams.WorkspaceFolders.WorkspaceFolders)[0].Uri).FileName()
	} else if s.initializeParams.RootUri.DocumentUri != nil {
		cwd = s.initializeParams.RootUri.DocumentUri.FileName()
	} else if s.initializeParams.RootPath != nil && s.initializeParams.RootPath.String != nil {
		cwd = *s.initializeParams.RootPath.String
	}
	if !tspath.PathIsAbsolute(cwd) {
		cwd = s.cwd
	}

	s.session = project.NewSession(&project.SessionInit{
		Options: &project.SessionOptions{
			CurrentDirectory:   cwd,
			DefaultLibraryPath: s.defaultLibraryPath,
			TypingsLocation:    s.typingsLocation,
			PositionEncoding:   s.positionEncoding,
			WatchEnabled:       s.watchEnabled,
			LoggingEnabled:     true,
			DebounceDelay:      500 * time.Millisecond,
		},
		FS:          s.fs,
		Logger:      s.logger,
		Client:      s,
		NpmExecutor: s,
		ParseCache:  s.parseCache,
	})
	// !!! temporary; remove when we have `handleDidChangeConfiguration`/implicit project config support
	if s.compilerOptionsForInferredProjects != nil {
		s.session.DidChangeCompilerOptionsForInferredProjects(ctx, s.compilerOptionsForInferredProjects)
	}

	return nil
}

func (s *Server) handleShutdown(ctx context.Context, params any, _ *lsproto.RequestMessage) (lsproto.ShutdownResponse, error) {
	s.session.Close()
	return lsproto.ShutdownResponse{}, nil
}

func (s *Server) handleExit(ctx context.Context, params any) error {
	return io.EOF
}

func (s *Server) handleDidOpen(ctx context.Context, params *lsproto.DidOpenTextDocumentParams) error {
	s.session.DidOpenFile(ctx, params.TextDocument.Uri, params.TextDocument.Version, params.TextDocument.Text, params.TextDocument.LanguageId)
	return nil
}

func (s *Server) handleDidChange(ctx context.Context, params *lsproto.DidChangeTextDocumentParams) error {
	s.session.DidChangeFile(ctx, params.TextDocument.Uri, params.TextDocument.Version, params.ContentChanges)
	return nil
}

func (s *Server) handleDidSave(ctx context.Context, params *lsproto.DidSaveTextDocumentParams) error {
	s.session.DidSaveFile(ctx, params.TextDocument.Uri)
	return nil
}

func (s *Server) handleDidClose(ctx context.Context, params *lsproto.DidCloseTextDocumentParams) error {
	s.session.DidCloseFile(ctx, params.TextDocument.Uri)
	return nil
}

func (s *Server) handleDidChangeWatchedFiles(ctx context.Context, params *lsproto.DidChangeWatchedFilesParams) error {
	s.session.DidChangeWatchedFiles(ctx, params.Changes)
	return nil
}

func (s *Server) handleSetTrace(ctx context.Context, params *lsproto.SetTraceParams) error {
	switch params.Value {
	case "verbose":
		s.logger.SetVerbose(true)
	case "messages":
		s.logger.SetVerbose(false)
	case "off":
		// !!! logging cannot be completely turned off for now
		s.logger.SetVerbose(false)
	default:
		return fmt.Errorf("unknown trace value: %s", params.Value)
	}
	return nil
}

func (s *Server) handleDocumentDiagnostic(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentDiagnosticParams) (lsproto.DocumentDiagnosticResponse, error) {
	return ls.ProvideDiagnostics(ctx, params.TextDocument.Uri)
}

func (s *Server) handleHover(ctx context.Context, ls *ls.LanguageService, params *lsproto.HoverParams) (lsproto.HoverResponse, error) {
	return ls.ProvideHover(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) handleSignatureHelp(ctx context.Context, languageService *ls.LanguageService, params *lsproto.SignatureHelpParams) (lsproto.SignatureHelpResponse, error) {
	return languageService.ProvideSignatureHelp(
		ctx,
		params.TextDocument.Uri,
		params.Position,
		params.Context,
		s.initializeParams.Capabilities.TextDocument.SignatureHelp,
		&ls.UserPreferences{},
	)
}

func (s *Server) handleDefinition(ctx context.Context, ls *ls.LanguageService, params *lsproto.DefinitionParams) (lsproto.DefinitionResponse, error) {
	return ls.ProvideDefinition(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) handleTypeDefinition(ctx context.Context, ls *ls.LanguageService, params *lsproto.TypeDefinitionParams) (lsproto.TypeDefinitionResponse, error) {
	return ls.ProvideTypeDefinition(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) handleReferences(ctx context.Context, ls *ls.LanguageService, params *lsproto.ReferenceParams) (lsproto.ReferencesResponse, error) {
	// findAllReferences
	return ls.ProvideReferences(ctx, params)
}

func (s *Server) handleImplementations(ctx context.Context, ls *ls.LanguageService, params *lsproto.ImplementationParams) (lsproto.ImplementationResponse, error) {
	// goToImplementation
	return ls.ProvideImplementations(ctx, params)
}

func (s *Server) handleCompletion(ctx context.Context, languageService *ls.LanguageService, params *lsproto.CompletionParams) (lsproto.CompletionResponse, error) {
	// !!! get user preferences
	return languageService.ProvideCompletion(
		ctx,
		params.TextDocument.Uri,
		params.Position,
		params.Context,
		getCompletionClientCapabilities(s.initializeParams),
		&ls.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		})
}

func (s *Server) handleCompletionItemResolve(ctx context.Context, params *lsproto.CompletionItem, reqMsg *lsproto.RequestMessage) (lsproto.CompletionResolveResponse, error) {
	data, err := ls.GetCompletionItemData(params)
	if err != nil {
		return nil, err
	}
	languageService, err := s.session.GetLanguageService(ctx, ls.FileNameToDocumentURI(data.FileName))
	if err != nil {
		return nil, err
	}
	defer s.recover(reqMsg)
	return languageService.ResolveCompletionItem(
		ctx,
		params,
		data,
		getCompletionClientCapabilities(s.initializeParams),
		&ls.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
	)
}

func (s *Server) handleDocumentFormat(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentFormattingParams) (lsproto.DocumentFormattingResponse, error) {
	return ls.ProvideFormatDocument(
		ctx,
		params.TextDocument.Uri,
		params.Options,
	)
}

func (s *Server) handleDocumentRangeFormat(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentRangeFormattingParams) (lsproto.DocumentRangeFormattingResponse, error) {
	return ls.ProvideFormatDocumentRange(
		ctx,
		params.TextDocument.Uri,
		params.Options,
		params.Range,
	)
}

func (s *Server) handleDocumentOnTypeFormat(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentOnTypeFormattingParams) (lsproto.DocumentOnTypeFormattingResponse, error) {
	return ls.ProvideFormatDocumentOnType(
		ctx,
		params.TextDocument.Uri,
		params.Options,
		params.Position,
		params.Ch,
	)
}

func (s *Server) handleWorkspaceSymbol(ctx context.Context, params *lsproto.WorkspaceSymbolParams, reqMsg *lsproto.RequestMessage) (lsproto.WorkspaceSymbolResponse, error) {
	snapshot, release := s.session.Snapshot()
	defer release()
	defer s.recover(reqMsg)
	programs := core.Map(snapshot.ProjectCollection.Projects(), (*project.Project).GetProgram)
	return ls.ProvideWorkspaceSymbols(ctx, programs, snapshot.Converters(), params.Query)
}

func (s *Server) handleDocumentSymbol(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentSymbolParams) (lsproto.DocumentSymbolResponse, error) {
	return ls.ProvideDocumentSymbols(ctx, params.TextDocument.Uri)
}

func (s *Server) handleRename(ctx context.Context, ls *ls.LanguageService, params *lsproto.RenameParams) (lsproto.RenameResponse, error) {
	return ls.ProvideRename(ctx, params)
}

func (s *Server) handleDocumentHighlight(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentHighlightParams) (lsproto.DocumentHighlightResponse, error) {
	return ls.ProvideDocumentHighlights(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) Log(msg ...any) {
	fmt.Fprintln(s.stderr, msg...)
}

// !!! temporary; remove when we have `handleDidChangeConfiguration`/implicit project config support
func (s *Server) SetCompilerOptionsForInferredProjects(ctx context.Context, options *core.CompilerOptions) {
	s.compilerOptionsForInferredProjects = options
	if s.session != nil {
		s.session.DidChangeCompilerOptionsForInferredProjects(ctx, options)
	}
}

// NpmInstall implements ata.NpmExecutor
func (s *Server) NpmInstall(cwd string, args []string) ([]byte, error) {
	cmd := exec.Command("npm", args...)
	cmd.Dir = cwd
	return cmd.Output()
}

func isBlockingMethod(method lsproto.Method) bool {
	switch method {
	case lsproto.MethodInitialize,
		lsproto.MethodInitialized,
		lsproto.MethodTextDocumentDidOpen,
		lsproto.MethodTextDocumentDidChange,
		lsproto.MethodTextDocumentDidSave,
		lsproto.MethodTextDocumentDidClose,
		lsproto.MethodWorkspaceDidChangeWatchedFiles:
		return true
	}
	return false
}

func ptrTo[T any](v T) *T {
	return &v
}

func ptrIsTrue(v *bool) bool {
	if v == nil {
		return false
	}
	return *v
}

func shouldEnableWatch(params *lsproto.InitializeParams) bool {
	if params == nil || params.Capabilities == nil || params.Capabilities.Workspace == nil {
		return false
	}
	return params.Capabilities.Workspace.DidChangeWatchedFiles != nil &&
		ptrIsTrue(params.Capabilities.Workspace.DidChangeWatchedFiles.DynamicRegistration)
}

func getCompletionClientCapabilities(params *lsproto.InitializeParams) *lsproto.CompletionClientCapabilities {
	if params == nil || params.Capabilities == nil || params.Capabilities.TextDocument == nil {
		return nil
	}
	return params.Capabilities.TextDocument.Completion
}
