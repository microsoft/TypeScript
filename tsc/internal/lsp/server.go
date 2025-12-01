package lsp

import (
	"context"
	"errors"
	"fmt"
	"io"
	"iter"
	"runtime/debug"
	"slices"
	"sync"
	"sync/atomic"
	"time"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsonutil"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/project/ata"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"golang.org/x/sync/errgroup"
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
	NpmInstall         func(cwd string, args []string) ([]byte, error)

	// Test options
	Client project.Client
	Logger logging.Logger
}

func NewServer(opts *ServerOptions) *Server {
	if opts.Cwd == "" {
		panic("Cwd is required")
	}
	var logger logging.Logger
	if opts.Logger != nil {
		logger = opts.Logger
	} else {
		logger = logging.NewLogger(opts.Err)
	}
	return &Server{
		r:                     opts.In,
		w:                     opts.Out,
		stderr:                opts.Err,
		logger:                logger,
		requestQueue:          make(chan *lsproto.RequestMessage, 100),
		outgoingQueue:         make(chan *lsproto.Message, 100),
		pendingClientRequests: make(map[lsproto.ID]pendingClientRequest),
		pendingServerRequests: make(map[lsproto.ID]chan *lsproto.ResponseMessage),
		cwd:                   opts.Cwd,
		fs:                    opts.FS,
		defaultLibraryPath:    opts.DefaultLibraryPath,
		typingsLocation:       opts.TypingsLocation,
		parseCache:            opts.ParseCache,
		npmInstall:            opts.NpmInstall,
		client:                opts.Client,
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
		return nil, fmt.Errorf("%w: %w", lsproto.ErrorCodeInvalidRequest, err)
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

	initializeParams   *lsproto.InitializeParams
	clientCapabilities lsproto.ResolvedClientCapabilities
	positionEncoding   lsproto.PositionEncodingKind
	locale             locale.Locale

	watchEnabled bool
	watcherID    atomic.Uint32
	watchers     collections.SyncSet[project.WatcherID]

	session *project.Session

	// Test options for initializing session
	client project.Client

	// !!! temporary; remove when we have `handleDidChangeConfiguration`/implicit project config support
	compilerOptionsForInferredProjects *core.CompilerOptions
	// parseCache can be passed in so separate tests can share ASTs
	parseCache *project.ParseCache

	npmInstall func(cwd string, args []string) ([]byte, error)
}

func (s *Server) Session() *project.Session { return s.session }

// WatchFiles implements project.Client.
func (s *Server) WatchFiles(ctx context.Context, id project.WatcherID, watchers []*lsproto.FileSystemWatcher) error {
	_, err := sendClientRequest(ctx, s, lsproto.ClientRegisterCapabilityInfo, &lsproto.RegistrationParams{
		Registrations: []*lsproto.Registration{
			{
				Id:     string(id),
				Method: string(lsproto.MethodWorkspaceDidChangeWatchedFiles),
				RegisterOptions: &lsproto.RegisterOptions{
					DidChangeWatchedFiles: &lsproto.DidChangeWatchedFilesRegistrationOptions{
						Watchers: watchers,
					},
				},
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
		_, err := sendClientRequest(ctx, s, lsproto.ClientUnregisterCapabilityInfo, &lsproto.UnregistrationParams{
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
	if !s.clientCapabilities.Workspace.Diagnostics.RefreshSupport {
		return nil
	}

	if _, err := sendClientRequest(ctx, s, lsproto.WorkspaceDiagnosticRefreshInfo, nil); err != nil {
		return fmt.Errorf("failed to refresh diagnostics: %w", err)
	}

	return nil
}

// PublishDiagnostics implements project.Client.
func (s *Server) PublishDiagnostics(ctx context.Context, params *lsproto.PublishDiagnosticsParams) error {
	notification := lsproto.TextDocumentPublishDiagnosticsInfo.NewNotificationMessage(params)
	s.outgoingQueue <- notification.Message()
	return nil
}

func (s *Server) RequestConfiguration(ctx context.Context) (*lsutil.UserPreferences, error) {
	caps := lsproto.GetClientCapabilities(ctx)
	if !caps.Workspace.Configuration {
		// if no configuration request capapbility, return default preferences
		return s.session.NewUserPreferences(), nil
	}
	configs, err := sendClientRequest(ctx, s, lsproto.WorkspaceConfigurationInfo, &lsproto.ConfigurationParams{
		Items: []*lsproto.ConfigurationItem{
			{
				Section: ptrTo("typescript"),
			},
		},
	})
	if err != nil {
		return nil, fmt.Errorf("configure request failed: %w", err)
	}
	s.Log(fmt.Sprintf("\n\nconfiguration: %+v, %T\n\n", configs, configs))
	userPreferences := s.session.NewUserPreferences()
	for _, item := range configs {
		if parsed := userPreferences.Parse(item); parsed != nil {
			return parsed, nil
		}
	}
	return userPreferences, nil
}

func (s *Server) Run(ctx context.Context) error {
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
			if errors.Is(err, lsproto.ErrorCodeInvalidRequest) {
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
				s.sendError(req.ID, lsproto.ErrorCodeServerNotInitialized)
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
			requestCtx := locale.WithLocale(ctx, s.locale)
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
						s.sendError(req.ID, lsproto.ErrorCodeRequestCancelled)
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

func sendClientRequest[Req, Resp any](ctx context.Context, s *Server, info lsproto.RequestInfo[Req, Resp], params Req) (Resp, error) {
	id := lsproto.NewIDString(fmt.Sprintf("ts%d", s.clientSeq.Add(1)))
	req := info.NewRequestMessage(id, params)

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
		return *new(Resp), ctx.Err()
	case resp := <-responseChan:
		if resp.Error != nil {
			return *new(Resp), fmt.Errorf("request failed: %s", resp.Error.String())
		}
		return info.UnmarshalResult(resp.Result)
	}
}

func (s *Server) sendResult(id *lsproto.ID, result any) {
	s.sendResponse(&lsproto.ResponseMessage{
		ID:     id,
		Result: result,
	})
}

func (s *Server) sendError(id *lsproto.ID, err error) {
	code := lsproto.ErrorCodeInternalError
	if errCode := lsproto.ErrorCode(0); errors.As(err, &errCode) {
		code = errCode
	}
	// TODO(jakebailey): error data
	s.sendResponse(&lsproto.ResponseMessage{
		ID: id,
		Error: &lsproto.ResponseError{
			Code:    int32(code),
			Message: err.Error(),
		},
	})
}

func (s *Server) sendResponse(resp *lsproto.ResponseMessage) {
	s.outgoingQueue <- resp.Message()
}

func (s *Server) handleRequestOrNotification(ctx context.Context, req *lsproto.RequestMessage) error {
	ctx = lsproto.WithClientCapabilities(ctx, &s.clientCapabilities)

	if handler := handlers()[req.Method]; handler != nil {
		return handler(s, ctx, req)
	}
	s.Log("unknown method", req.Method)
	if req.ID != nil {
		s.sendError(req.ID, lsproto.ErrorCodeInvalidRequest)
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

	registerNotificationHandler(handlers, lsproto.WorkspaceDidChangeConfigurationInfo, (*Server).handleDidChangeWorkspaceConfiguration)
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
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentImplementationInfo, (*Server).handleImplementations)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentSignatureHelpInfo, (*Server).handleSignatureHelp)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentFormattingInfo, (*Server).handleDocumentFormat)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentRangeFormattingInfo, (*Server).handleDocumentRangeFormat)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentOnTypeFormattingInfo, (*Server).handleDocumentOnTypeFormat)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentDocumentSymbolInfo, (*Server).handleDocumentSymbol)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentDocumentHighlightInfo, (*Server).handleDocumentHighlight)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentSelectionRangeInfo, (*Server).handleSelectionRange)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentInlayHintInfo, (*Server).handleInlayHint)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentCodeActionInfo, (*Server).handleCodeAction)
	registerLanguageServiceDocumentRequestHandler(handlers, lsproto.TextDocumentPrepareCallHierarchyInfo, (*Server).handlePrepareCallHierarchy)

	registerMultiProjectReferenceRequestHandler(handlers, lsproto.TextDocumentReferencesInfo, (*Server).handleReferences, combineReferences)
	registerMultiProjectReferenceRequestHandler(handlers, lsproto.TextDocumentRenameInfo, (*Server).handleRename, combineRenameResponse)

	registerRequestHandler(handlers, lsproto.CallHierarchyIncomingCallsInfo, (*Server).handleCallHierarchyIncomingCalls)
	registerRequestHandler(handlers, lsproto.CallHierarchyOutgoingCallsInfo, (*Server).handleCallHierarchyOutgoingCalls)

	registerRequestHandler(handlers, lsproto.WorkspaceSymbolInfo, (*Server).handleWorkspaceSymbol)
	registerRequestHandler(handlers, lsproto.CompletionItemResolveInfo, (*Server).handleCompletionItemResolve)

	return handlers
})

func registerNotificationHandler[Req any](handlers handlerMap, info lsproto.NotificationInfo[Req], fn func(*Server, context.Context, Req) error) {
	handlers[info.Method] = func(s *Server, ctx context.Context, req *lsproto.RequestMessage) error {
		if s.session == nil && req.Method != lsproto.MethodInitialized {
			return lsproto.ErrorCodeServerNotInitialized
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
			return lsproto.ErrorCodeServerNotInitialized
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

type projectAndTextDocumentPosition struct {
	project             *project.Project
	ls                  *ls.LanguageService
	Uri                 lsproto.DocumentUri
	Position            lsproto.Position
	forOriginalLocation bool
}

type response[Resp any] struct {
	complete            bool
	result              Resp
	forOriginalLocation bool
}

func registerMultiProjectReferenceRequestHandler[Req lsproto.HasTextDocumentPosition, Resp any](
	handlers handlerMap,
	info lsproto.RequestInfo[Req, Resp],
	fn func(*Server, context.Context, *ls.LanguageService, Req, *ast.Node, []*ls.SymbolAndEntries) (Resp, error),
	combineResults func(iter.Seq[Resp]) Resp,
) {
	handlers[info.Method] = func(s *Server, ctx context.Context, req *lsproto.RequestMessage) error {
		var params Req
		// Ignore empty params.
		if req.Params != nil {
			params = req.Params.(Req)
		}
		// !!! sheetal: multiple projects that contain the file through symlinks
		defaultProject, defaultLs, allProjects, err := s.session.GetLanguageServiceAndProjectsForFile(ctx, params.TextDocumentURI())
		if err != nil {
			return err
		}
		defer s.recover(req)

		var results collections.SyncMap[tspath.Path, *response[Resp]]
		var defaultDefinition *ls.NonLocalDefinition
		canSearchProject := func(project *project.Project) bool {
			_, searched := results.Load(project.Id())
			return !searched
		}
		wg := core.NewWorkGroup(false)
		var errMu sync.Mutex
		var enqueueItem func(item projectAndTextDocumentPosition)
		enqueueItem = func(item projectAndTextDocumentPosition) {
			var response response[Resp]
			if _, loaded := results.LoadOrStore(item.project.Id(), &response); loaded {
				return
			}
			wg.Queue(func() {
				if ctx.Err() != nil {
					return
				}
				defer s.recover(req)
				// Process the item
				ls := item.ls
				if ls == nil {
					// Get it now
					ls = s.session.GetLanguageServiceForProjectWithFile(ctx, item.project, item.Uri)
					if ls == nil {
						return
					}
				}
				originalNode, symbolsAndEntries, ok := ls.ProvideSymbolsAndEntries(ctx, item.Uri, item.Position, info.Method == lsproto.MethodTextDocumentRename)
				if ok {
					for _, entry := range symbolsAndEntries {
						// Find the default definition that can be in another project
						// Later we will use this load ancestor tree that references this location and expand search
						if item.project == defaultProject && defaultDefinition == nil {
							defaultDefinition = ls.GetNonLocalDefinition(ctx, entry)
						}
						ls.ForEachOriginalDefinitionLocation(ctx, entry, func(uri lsproto.DocumentUri, position lsproto.Position) {
							// Get default configured project for this file
							defProjects, errProjects := s.session.GetProjectsForFile(ctx, uri)
							if errProjects != nil {
								return
							}
							for _, defProject := range defProjects {
								// Optimization: don't enqueue if will be discarded
								if canSearchProject(defProject) {
									enqueueItem(projectAndTextDocumentPosition{
										project:             defProject,
										Uri:                 uri,
										Position:            position,
										forOriginalLocation: true,
									})
								}
							}
						})
					}
				}

				if result, errSearch := fn(s, ctx, ls, params, originalNode, symbolsAndEntries); errSearch == nil {
					response.complete = true
					response.result = result
					response.forOriginalLocation = item.forOriginalLocation
				} else {
					errMu.Lock()
					defer errMu.Unlock()
					if err != nil {
						err = errSearch
					}
				}
			})
		}

		// Initial set of projects and locations in the queue, starting with default project
		enqueueItem(projectAndTextDocumentPosition{
			project:  defaultProject,
			ls:       defaultLs,
			Uri:      params.TextDocumentURI(),
			Position: params.TextDocumentPosition(),
		})
		for _, project := range allProjects {
			if project != defaultProject {
				enqueueItem(projectAndTextDocumentPosition{
					project: project,
					// TODO!! symlinks need to change the URI
					Uri:      params.TextDocumentURI(),
					Position: params.TextDocumentPosition(),
				})
			}
		}

		getResultsIterator := func() iter.Seq[Resp] {
			return func(yield func(Resp) bool) {
				var seenProjects collections.SyncSet[tspath.Path]
				if response, loaded := results.Load(defaultProject.Id()); loaded && response.complete {
					if !yield(response.result) {
						return
					}
				}
				seenProjects.Add(defaultProject.Id())
				for _, project := range allProjects {
					if seenProjects.AddIfAbsent(project.Id()) {
						if response, loaded := results.Load(project.Id()); loaded && response.complete {
							if !yield(response.result) {
								return
							}
						}
					}
				}
				// Prefer the searches from locations for default definition
				results.Range(func(key tspath.Path, response *response[Resp]) bool {
					if !response.forOriginalLocation && seenProjects.AddIfAbsent(key) && response.complete {
						return yield(response.result)
					}
					return true
				})
				// Then the searches from original locations
				results.Range(func(key tspath.Path, response *response[Resp]) bool {
					if response.forOriginalLocation && seenProjects.AddIfAbsent(key) && response.complete {
						return yield(response.result)
					}
					return true
				})
			}
		}

		// Outer loop - to complete work if more is added after completing existing queue
		for {
			// Process existing known projects first
			wg.RunAndWait()
			if ctx.Err() != nil {
				return ctx.Err()
			}
			// No need to use mu here since we are not in parallel at this point
			if err != nil {
				return err
			}

			wg = core.NewWorkGroup(false)
			hasMoreWork := false
			if defaultDefinition != nil {
				requestedProjectTrees := make(map[tspath.Path]struct{})
				results.Range(func(key tspath.Path, response *response[Resp]) bool {
					if response.complete {
						requestedProjectTrees[key] = struct{}{}
					}
					return true
				})

				// Load more projects based on default definition found
				for _, loadedProject := range s.session.GetSnapshotLoadingProjectTree(ctx, requestedProjectTrees).ProjectCollection.Projects() {
					if ctx.Err() != nil {
						return ctx.Err()
					}

					// Can loop forever without this (enqueue here, dequeue above, repeat)
					if !canSearchProject(loadedProject) || loadedProject.GetProgram() == nil {
						continue
					}

					// Enqueue the project and location for further processing
					if loadedProject.HasFile(defaultDefinition.TextDocumentURI().FileName()) {
						enqueueItem(projectAndTextDocumentPosition{
							project:  loadedProject,
							Uri:      defaultDefinition.TextDocumentURI(),
							Position: defaultDefinition.TextDocumentPosition(),
						})
						hasMoreWork = true
					} else if sourcePos := defaultDefinition.GetSourcePosition(); sourcePos != nil && loadedProject.HasFile(sourcePos.TextDocumentURI().FileName()) {
						enqueueItem(projectAndTextDocumentPosition{
							project:  loadedProject,
							Uri:      sourcePos.TextDocumentURI(),
							Position: sourcePos.TextDocumentPosition(),
						})
						hasMoreWork = true
					} else if generatedPos := defaultDefinition.GetGeneratedPosition(); generatedPos != nil && loadedProject.HasFile(generatedPos.TextDocumentURI().FileName()) {
						enqueueItem(projectAndTextDocumentPosition{
							project:  loadedProject,
							Uri:      generatedPos.TextDocumentURI(),
							Position: generatedPos.TextDocumentPosition(),
						})
						hasMoreWork = true
					}
				}
			}
			if !hasMoreWork {
				break
			}
		}

		var resp Resp
		if results.Size() > 1 {
			resp = combineResults(getResultsIterator())
		} else {
			// Single result, return that directly
			for value := range getResultsIterator() {
				resp = value
				break
			}
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
			s.sendError(req.ID, fmt.Errorf("%w: panic handling request %s: %v", lsproto.ErrorCodeInternalError, req.Method, r))
		} else {
			s.Log("unhandled panic in notification", req.Method, r)
		}
	}
}

func (s *Server) handleInitialize(ctx context.Context, params *lsproto.InitializeParams, _ *lsproto.RequestMessage) (lsproto.InitializeResponse, error) {
	if s.initializeParams != nil {
		return nil, lsproto.ErrorCodeInvalidRequest
	}

	s.initializeParams = params
	s.clientCapabilities = resolveClientCapabilities(params.Capabilities)

	if _, err := fmt.Fprint(s.stderr, "Resolved client capabilities: "); err != nil {
		return nil, err
	}
	if err := jsonutil.MarshalIndentWrite(s.stderr, &s.clientCapabilities, "", "\t"); err != nil {
		return nil, err
	}

	s.positionEncoding = lsproto.PositionEncodingKindUTF16
	if slices.Contains(s.clientCapabilities.General.PositionEncodings, lsproto.PositionEncodingKindUTF8) {
		s.positionEncoding = lsproto.PositionEncodingKindUTF8
	}

	if s.initializeParams.Locale != nil {
		s.locale, _ = locale.Parse(*s.initializeParams.Locale)
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
			SelectionRangeProvider: &lsproto.BooleanOrSelectionRangeOptionsOrSelectionRangeRegistrationOptions{
				Boolean: ptrTo(true),
			},
			InlayHintProvider: &lsproto.BooleanOrInlayHintOptionsOrInlayHintRegistrationOptions{
				Boolean: ptrTo(true),
			},
			CodeActionProvider: &lsproto.BooleanOrCodeActionOptions{
				CodeActionOptions: &lsproto.CodeActionOptions{
					CodeActionKinds: &[]lsproto.CodeActionKind{
						lsproto.CodeActionKindQuickFix,
					},
				},
			},
			CallHierarchyProvider: &lsproto.BooleanOrCallHierarchyOptionsOrCallHierarchyRegistrationOptions{
				Boolean: ptrTo(true),
			},
		},
	}

	return response, nil
}

func (s *Server) handleInitialized(ctx context.Context, params *lsproto.InitializedParams) error {
	if s.clientCapabilities.Workspace.DidChangeWatchedFiles.DynamicRegistration {
		s.watchEnabled = true
	}

	cwd := s.cwd
	if s.clientCapabilities.Workspace.WorkspaceFolders &&
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

	var disablePushDiagnostics bool
	if s.initializeParams != nil && s.initializeParams.InitializationOptions != nil {
		if s.initializeParams.InitializationOptions.DisablePushDiagnostics != nil {
			disablePushDiagnostics = *s.initializeParams.InitializationOptions.DisablePushDiagnostics
		}
	}

	s.session = project.NewSession(&project.SessionInit{
		Options: &project.SessionOptions{
			CurrentDirectory:       cwd,
			DefaultLibraryPath:     s.defaultLibraryPath,
			TypingsLocation:        s.typingsLocation,
			PositionEncoding:       s.positionEncoding,
			WatchEnabled:           s.watchEnabled,
			LoggingEnabled:         true,
			DebounceDelay:          500 * time.Millisecond,
			PushDiagnosticsEnabled: !disablePushDiagnostics,
			Locale:                 s.locale,
		},
		FS:          s.fs,
		Logger:      s.logger,
		Client:      s,
		NpmExecutor: s,
		ParseCache:  s.parseCache,
	})

	userPreferences, err := s.RequestConfiguration(ctx)
	if err != nil {
		return err
	}
	s.session.InitializeWithConfig(userPreferences)

	_, err = sendClientRequest(ctx, s, lsproto.ClientRegisterCapabilityInfo, &lsproto.RegistrationParams{
		Registrations: []*lsproto.Registration{
			{
				Id:     "typescript-config-watch-id",
				Method: string(lsproto.MethodWorkspaceDidChangeConfiguration),
				RegisterOptions: &lsproto.RegisterOptions{
					DidChangeConfiguration: &lsproto.DidChangeConfigurationRegistrationOptions{
						Section: &lsproto.StringOrStrings{
							// !!! Both the 'javascript' and 'js/ts' scopes need to be watched for settings as well.
							Strings: &[]string{"typescript"},
						},
					},
				},
			},
		},
	})
	if err != nil {
		return fmt.Errorf("failed to register configuration change watcher: %w", err)
	}

	// !!! temporary.
	// Remove when we have `handleDidChangeConfiguration`/implicit project config support
	// derived from 'js/ts.implicitProjectConfig.*'.
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

func (s *Server) handleDidChangeWorkspaceConfiguration(ctx context.Context, params *lsproto.DidChangeConfigurationParams) error {
	settings, ok := params.Settings.(map[string]any)
	if !ok {
		return nil
	}
	// !!! Both the 'javascript' and 'js/ts' scopes need to be checked for settings as well.
	tsSettings := settings["typescript"]
	userPreferences := s.session.UserPreferences()
	if parsed := userPreferences.Parse(tsSettings); parsed != nil {
		userPreferences = parsed
	}
	s.session.Configure(userPreferences)
	return nil
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
	)
}

func (s *Server) handleDefinition(ctx context.Context, ls *ls.LanguageService, params *lsproto.DefinitionParams) (lsproto.DefinitionResponse, error) {
	return ls.ProvideDefinition(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) handleTypeDefinition(ctx context.Context, ls *ls.LanguageService, params *lsproto.TypeDefinitionParams) (lsproto.TypeDefinitionResponse, error) {
	return ls.ProvideTypeDefinition(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) handleReferences(ctx context.Context, ls *ls.LanguageService, params *lsproto.ReferenceParams, originalNode *ast.Node, symbolAndEntries []*ls.SymbolAndEntries) (lsproto.ReferencesResponse, error) {
	// findAllReferences
	return ls.ProvideReferencesFromSymbolAndEntries(ctx, params, originalNode, symbolAndEntries)
}

func combineReferences(results iter.Seq[lsproto.ReferencesResponse]) lsproto.ReferencesResponse {
	var combined []lsproto.Location
	var seenLocations collections.Set[lsproto.Location]
	for resp := range results {
		if resp.Locations != nil {
			for _, loc := range *resp.Locations {
				if !seenLocations.Has(loc) {
					seenLocations.Add(loc)
					combined = append(combined, loc)
				}
			}
		}
	}
	return lsproto.LocationsOrNull{Locations: &combined}
}

func (s *Server) handleImplementations(ctx context.Context, ls *ls.LanguageService, params *lsproto.ImplementationParams) (lsproto.ImplementationResponse, error) {
	// goToImplementation
	return ls.ProvideImplementations(ctx, params)
}

func (s *Server) handleCompletion(ctx context.Context, languageService *ls.LanguageService, params *lsproto.CompletionParams) (lsproto.CompletionResponse, error) {
	return languageService.ProvideCompletion(
		ctx,
		params.TextDocument.Uri,
		params.Position,
		params.Context,
	)
}

func (s *Server) handleCompletionItemResolve(ctx context.Context, params *lsproto.CompletionItem, reqMsg *lsproto.RequestMessage) (lsproto.CompletionResolveResponse, error) {
	data := params.Data
	languageService, err := s.session.GetLanguageService(ctx, lsconv.FileNameToDocumentURI(data.FileName))
	if err != nil {
		return nil, err
	}
	defer s.recover(reqMsg)
	return languageService.ResolveCompletionItem(
		ctx,
		params,
		data,
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
	snapshot := s.session.GetSnapshotLoadingProjectTree(ctx, nil)
	defer s.recover(reqMsg)

	programs := core.Map(snapshot.ProjectCollection.Projects(), (*project.Project).GetProgram)
	return ls.ProvideWorkspaceSymbols(
		ctx,
		programs,
		snapshot.Converters(),
		snapshot.UserPreferences(),
		params.Query)
}

func (s *Server) handleDocumentSymbol(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentSymbolParams) (lsproto.DocumentSymbolResponse, error) {
	return ls.ProvideDocumentSymbols(ctx, params.TextDocument.Uri)
}

func (s *Server) handleRename(ctx context.Context, ls *ls.LanguageService, params *lsproto.RenameParams, originalNode *ast.Node, symbolAndEntries []*ls.SymbolAndEntries) (lsproto.RenameResponse, error) {
	return ls.ProvideRenameFromSymbolAndEntries(ctx, params, originalNode, symbolAndEntries)
}

func combineRenameResponse(results iter.Seq[lsproto.RenameResponse]) lsproto.RenameResponse {
	combined := make(map[lsproto.DocumentUri][]*lsproto.TextEdit)
	seenChanges := make(map[lsproto.DocumentUri]*collections.Set[lsproto.Range])
	// !!! this is not used any more so we will skip this part of deduplication and combining
	// 	DocumentChanges *[]TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile `json:"documentChanges,omitzero"`
	// 	ChangeAnnotations *map[string]*ChangeAnnotation `json:"changeAnnotations,omitzero"`

	for resp := range results {
		if resp.WorkspaceEdit != nil && resp.WorkspaceEdit.Changes != nil {
			for doc, changes := range *resp.WorkspaceEdit.Changes {
				seenSet, ok := seenChanges[doc]
				if !ok {
					seenSet = &collections.Set[lsproto.Range]{}
					seenChanges[doc] = seenSet
				}
				changesForDoc, exists := combined[doc]
				if !exists {
					changesForDoc = []*lsproto.TextEdit{}
				}
				for _, change := range changes {
					if !seenSet.Has(change.Range) {
						seenSet.Add(change.Range)
						changesForDoc = append(changesForDoc, change)
					}
				}
				combined[doc] = changesForDoc
			}
		}
	}
	if len(combined) > 0 {
		return lsproto.RenameResponse{
			WorkspaceEdit: &lsproto.WorkspaceEdit{
				Changes: &combined,
			},
		}
	}
	return lsproto.RenameResponse{}
}

func (s *Server) handleDocumentHighlight(ctx context.Context, ls *ls.LanguageService, params *lsproto.DocumentHighlightParams) (lsproto.DocumentHighlightResponse, error) {
	return ls.ProvideDocumentHighlights(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) handleSelectionRange(ctx context.Context, ls *ls.LanguageService, params *lsproto.SelectionRangeParams) (lsproto.SelectionRangeResponse, error) {
	return ls.ProvideSelectionRanges(ctx, params)
}

func (s *Server) handleCodeAction(ctx context.Context, ls *ls.LanguageService, params *lsproto.CodeActionParams) (lsproto.CodeActionResponse, error) {
	return ls.ProvideCodeActions(ctx, params)
}

func (s *Server) handleInlayHint(
	ctx context.Context,
	languageService *ls.LanguageService,
	params *lsproto.InlayHintParams,
) (lsproto.InlayHintResponse, error) {
	return languageService.ProvideInlayHint(ctx, params)
}

func (s *Server) handlePrepareCallHierarchy(
	ctx context.Context,
	languageService *ls.LanguageService,
	params *lsproto.CallHierarchyPrepareParams,
) (lsproto.CallHierarchyPrepareResponse, error) {
	return languageService.ProvidePrepareCallHierarchy(ctx, params.TextDocument.Uri, params.Position)
}

func (s *Server) handleCallHierarchyIncomingCalls(
	ctx context.Context,
	params *lsproto.CallHierarchyIncomingCallsParams,
	_ *lsproto.RequestMessage,
) (lsproto.CallHierarchyIncomingCallsResponse, error) {
	languageService, err := s.session.GetLanguageService(ctx, params.Item.Uri)
	if err != nil {
		return lsproto.CallHierarchyIncomingCallsOrNull{}, err
	}
	return languageService.ProvideCallHierarchyIncomingCalls(ctx, params.Item)
}

func (s *Server) handleCallHierarchyOutgoingCalls(
	ctx context.Context,
	params *lsproto.CallHierarchyOutgoingCallsParams,
	_ *lsproto.RequestMessage,
) (lsproto.CallHierarchyOutgoingCallsResponse, error) {
	languageService, err := s.session.GetLanguageService(ctx, params.Item.Uri)
	if err != nil {
		return lsproto.CallHierarchyOutgoingCallsOrNull{}, err
	}
	return languageService.ProvideCallHierarchyOutgoingCalls(ctx, params.Item)
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
	return s.npmInstall(cwd, args)
}

func isBlockingMethod(method lsproto.Method) bool {
	switch method {
	case lsproto.MethodInitialize,
		lsproto.MethodInitialized,
		lsproto.MethodTextDocumentDidOpen,
		lsproto.MethodTextDocumentDidChange,
		lsproto.MethodTextDocumentDidSave,
		lsproto.MethodTextDocumentDidClose,
		lsproto.MethodWorkspaceDidChangeWatchedFiles,
		lsproto.MethodWorkspaceDidChangeConfiguration,
		lsproto.MethodWorkspaceConfiguration:
		return true
	}
	return false
}

func ptrTo[T any](v T) *T {
	return &v
}

func resolveClientCapabilities(caps *lsproto.ClientCapabilities) lsproto.ResolvedClientCapabilities {
	resolved := lsproto.ResolveClientCapabilities(caps)

	// Some clients claim that push and pull diagnostics have different capabilities,
	// including vscode-languageclient v9. Work around this by defaulting any missing
	// pull diagnostic caps with the pull diagnostic equivalents.
	//
	// TODO: remove when we upgrade to vscode-languageclient v10, which fixes this issue.
	publish := resolved.TextDocument.PublishDiagnostics
	diagnostic := &resolved.TextDocument.Diagnostic
	if !diagnostic.RelatedInformation && publish.RelatedInformation {
		diagnostic.RelatedInformation = true
	}
	if !diagnostic.CodeDescriptionSupport && publish.CodeDescriptionSupport {
		diagnostic.CodeDescriptionSupport = true
	}
	if !diagnostic.DataSupport && publish.DataSupport {
		diagnostic.DataSupport = true
	}
	if len(diagnostic.TagSupport.ValueSet) == 0 && len(publish.TagSupport.ValueSet) > 0 {
		diagnostic.TagSupport.ValueSet = publish.TagSupport.ValueSet
	}

	return resolved
}
