package lsp

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"slices"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type ServerOptions struct {
	In  io.Reader
	Out io.Writer
	Err io.Writer

	Cwd                string
	NewLine            core.NewLineKind
	FS                 vfs.FS
	DefaultLibraryPath string
}

func NewServer(opts *ServerOptions) *Server {
	if opts.Cwd == "" {
		panic("Cwd is required")
	}
	return &Server{
		r:                  lsproto.NewBaseReader(opts.In),
		w:                  lsproto.NewBaseWriter(opts.Out),
		stderr:             opts.Err,
		cwd:                opts.Cwd,
		newLine:            opts.NewLine,
		fs:                 opts.FS,
		defaultLibraryPath: opts.DefaultLibraryPath,
	}
}

var _ project.ServiceHost = (*Server)(nil)

type Server struct {
	r *lsproto.BaseReader
	w *lsproto.BaseWriter

	stderr io.Writer

	requestMethod string
	requestTime   time.Time

	cwd                string
	newLine            core.NewLineKind
	fs                 vfs.FS
	defaultLibraryPath string

	initializeParams *lsproto.InitializeParams
	positionEncoding lsproto.PositionEncodingKind

	logger         *project.Logger
	projectService *project.Service
	converters     *ls.Converters
}

// FS implements project.ProjectServiceHost.
func (s *Server) FS() vfs.FS {
	return s.fs
}

// DefaultLibraryPath implements project.ProjectServiceHost.
func (s *Server) DefaultLibraryPath() string {
	return s.defaultLibraryPath
}

// GetCurrentDirectory implements project.ProjectServiceHost.
func (s *Server) GetCurrentDirectory() string {
	return s.cwd
}

// NewLine implements project.ProjectServiceHost.
func (s *Server) NewLine() string {
	return s.newLine.GetNewLineCharacter()
}

// Trace implements project.ProjectServiceHost.
func (s *Server) Trace(msg string) {
	s.Log(msg)
}

func (s *Server) Run() error {
	for {
		req, err := s.read()
		if err != nil {
			if errors.Is(err, lsproto.ErrInvalidRequest) {
				if err := s.sendError(nil, err); err != nil {
					return err
				}
				continue
			}
			return err
		}

		if s.initializeParams == nil {
			if req.Method == lsproto.MethodInitialize {
				if err := s.handleInitialize(req); err != nil {
					return err
				}
			} else {
				if err := s.sendError(req.ID, lsproto.ErrServerNotInitialized); err != nil {
					return err
				}
			}
			continue
		}

		if err := s.handleMessage(req); err != nil {
			return err
		}
	}
}

func (s *Server) read() (*lsproto.RequestMessage, error) {
	data, err := s.r.Read()
	if err != nil {
		return nil, err
	}

	req := &lsproto.RequestMessage{}
	if err := json.Unmarshal(data, req); err != nil {
		return nil, fmt.Errorf("%w: %w", lsproto.ErrInvalidRequest, err)
	}

	return req, nil
}

func (s *Server) sendResult(id *lsproto.ID, result any) error {
	return s.sendResponse(&lsproto.ResponseMessage{
		ID:     id,
		Result: result,
	})
}

func (s *Server) sendError(id *lsproto.ID, err error) error {
	code := lsproto.ErrInternalError.Code
	if errCode := (*lsproto.ErrorCode)(nil); errors.As(err, &errCode) {
		code = errCode.Code
	}
	// TODO(jakebailey): error data
	return s.sendResponse(&lsproto.ResponseMessage{
		ID: id,
		Error: &lsproto.ResponseError{
			Code:    code,
			Message: err.Error(),
		},
	})
}

func (s *Server) sendResponse(resp *lsproto.ResponseMessage) error {
	if !s.requestTime.IsZero() {
		s.logger.PerfTrace(fmt.Sprintf("%s: %s", s.requestMethod, time.Since(s.requestTime)))
	}
	data, err := json.Marshal(resp)
	if err != nil {
		return err
	}
	return s.w.Write(data)
}

func (s *Server) handleMessage(req *lsproto.RequestMessage) error {
	s.requestTime = time.Now()
	s.requestMethod = string(req.Method)

	params := req.Params
	switch params.(type) {
	case *lsproto.InitializeParams:
		return s.sendError(req.ID, lsproto.ErrInvalidRequest)
	case *lsproto.InitializedParams:
		return s.handleInitialized(req)
	case *lsproto.DidOpenTextDocumentParams:
		return s.handleDidOpen(req)
	case *lsproto.DidChangeTextDocumentParams:
		return s.handleDidChange(req)
	case *lsproto.DidSaveTextDocumentParams:
		return s.handleDidSave(req)
	case *lsproto.DidCloseTextDocumentParams:
		return s.handleDidClose(req)
	case *lsproto.DocumentDiagnosticParams:
		return s.handleDocumentDiagnostic(req)
	case *lsproto.HoverParams:
		return s.handleHover(req)
	case *lsproto.DefinitionParams:
		return s.handleDefinition(req)
	default:
		switch req.Method {
		case lsproto.MethodShutdown:
			s.projectService.Close()
			return s.sendResult(req.ID, nil)
		case lsproto.MethodExit:
			return nil
		default:
			s.Log("unknown method", req.Method)
			if req.ID != nil {
				return s.sendError(req.ID, lsproto.ErrInvalidRequest)
			}
			return nil
		}
	}
}

func (s *Server) handleInitialize(req *lsproto.RequestMessage) error {
	s.initializeParams = req.Params.(*lsproto.InitializeParams)

	s.positionEncoding = lsproto.PositionEncodingKindUTF16
	if genCapabilities := s.initializeParams.Capabilities.General; genCapabilities != nil && genCapabilities.PositionEncodings != nil {
		if slices.Contains(*genCapabilities.PositionEncodings, lsproto.PositionEncodingKindUTF8) {
			s.positionEncoding = lsproto.PositionEncodingKindUTF8
		}
	}

	return s.sendResult(req.ID, &lsproto.InitializeResult{
		ServerInfo: &lsproto.ServerInfo{
			Name:    "typescript-go",
			Version: ptrTo(core.Version),
		},
		Capabilities: &lsproto.ServerCapabilities{
			PositionEncoding: ptrTo(s.positionEncoding),
			TextDocumentSync: &lsproto.TextDocumentSyncOptionsOrTextDocumentSyncKind{
				TextDocumentSyncOptions: &lsproto.TextDocumentSyncOptions{
					OpenClose: ptrTo(true),
					Change:    ptrTo(lsproto.TextDocumentSyncKindIncremental),
					Save: &lsproto.BooleanOrSaveOptions{
						SaveOptions: &lsproto.SaveOptions{
							IncludeText: ptrTo(true),
						},
					},
				},
			},
			HoverProvider: &lsproto.BooleanOrHoverOptions{
				Boolean: ptrTo(true),
			},
			DefinitionProvider: &lsproto.BooleanOrDefinitionOptions{
				Boolean: ptrTo(true),
			},
			DiagnosticProvider: &lsproto.DiagnosticOptionsOrDiagnosticRegistrationOptions{
				DiagnosticOptions: &lsproto.DiagnosticOptions{
					InterFileDependencies: true,
				},
			},
		},
	})
}

func (s *Server) handleInitialized(req *lsproto.RequestMessage) error {
	s.logger = project.NewLogger([]io.Writer{s.stderr}, "" /*file*/, project.LogLevelVerbose)
	s.projectService = project.NewService(s, project.ServiceOptions{
		Logger:           s.logger,
		PositionEncoding: s.positionEncoding,
	})

	s.converters = ls.NewConverters(s.positionEncoding, func(fileName string) ls.ScriptInfo {
		return s.projectService.GetScriptInfo(fileName)
	})

	return nil
}

func (s *Server) handleDidOpen(req *lsproto.RequestMessage) error {
	params := req.Params.(*lsproto.DidOpenTextDocumentParams)
	s.projectService.OpenFile(ls.DocumentURIToFileName(params.TextDocument.Uri), params.TextDocument.Text, ls.LanguageKindToScriptKind(params.TextDocument.LanguageId), "")
	return nil
}

func (s *Server) handleDidChange(req *lsproto.RequestMessage) error {
	params := req.Params.(*lsproto.DidChangeTextDocumentParams)
	scriptInfo := s.projectService.GetScriptInfo(ls.DocumentURIToFileName(params.TextDocument.Uri))
	if scriptInfo == nil {
		return s.sendError(req.ID, lsproto.ErrRequestFailed)
	}

	changes := make([]ls.TextChange, len(params.ContentChanges))
	for i, change := range params.ContentChanges {
		if partialChange := change.TextDocumentContentChangePartial; partialChange != nil {
			if textChange, err := s.converters.FromLSPTextChange(partialChange, scriptInfo.FileName()); err != nil {
				return s.sendError(req.ID, err)
			} else {
				changes[i] = textChange
			}
		} else if wholeChange := change.TextDocumentContentChangeWholeDocument; wholeChange != nil {
			changes[i] = ls.TextChange{
				TextRange: core.NewTextRange(0, len(scriptInfo.Text())),
				NewText:   wholeChange.Text,
			}
		} else {
			return s.sendError(req.ID, lsproto.ErrInvalidRequest)
		}
	}

	s.projectService.ChangeFile(ls.DocumentURIToFileName(params.TextDocument.Uri), changes)
	return nil
}

func (s *Server) handleDidSave(req *lsproto.RequestMessage) error {
	params := req.Params.(*lsproto.DidSaveTextDocumentParams)
	s.projectService.MarkFileSaved(ls.DocumentURIToFileName(params.TextDocument.Uri), *params.Text)
	return nil
}

func (s *Server) handleDidClose(req *lsproto.RequestMessage) error {
	params := req.Params.(*lsproto.DidCloseTextDocumentParams)
	s.projectService.CloseFile(ls.DocumentURIToFileName(params.TextDocument.Uri))
	return nil
}

func (s *Server) handleDocumentDiagnostic(req *lsproto.RequestMessage) error {
	params := req.Params.(*lsproto.DocumentDiagnosticParams)
	file, project := s.getFileAndProject(params.TextDocument.Uri)
	diagnostics := project.LanguageService().GetDocumentDiagnostics(file.FileName())
	lspDiagnostics := make([]*lsproto.Diagnostic, len(diagnostics))
	for i, diag := range diagnostics {
		if lspDiagnostic, err := s.converters.ToLSPDiagnostic(diag); err != nil {
			return s.sendError(req.ID, err)
		} else {
			lspDiagnostics[i] = lspDiagnostic
		}
	}
	return s.sendResult(req.ID, &lsproto.DocumentDiagnosticReport{
		RelatedFullDocumentDiagnosticReport: &lsproto.RelatedFullDocumentDiagnosticReport{
			FullDocumentDiagnosticReport: lsproto.FullDocumentDiagnosticReport{
				Kind:  lsproto.StringLiteralFull{},
				Items: lspDiagnostics,
			},
		},
	})
}

func (s *Server) handleHover(req *lsproto.RequestMessage) error {
	params := req.Params.(*lsproto.HoverParams)
	file, project := s.getFileAndProject(params.TextDocument.Uri)
	pos, err := s.converters.LineAndCharacterToPositionForFile(params.Position, file.FileName())
	if err != nil {
		return s.sendError(req.ID, err)
	}

	hoverText := project.LanguageService().ProvideHover(file.FileName(), pos)
	return s.sendResult(req.ID, &lsproto.Hover{
		Contents: lsproto.MarkupContentOrMarkedStringOrMarkedStrings{
			MarkupContent: &lsproto.MarkupContent{
				Kind:  lsproto.MarkupKindMarkdown,
				Value: codeFence("ts", hoverText),
			},
		},
	})
}

func (s *Server) handleDefinition(req *lsproto.RequestMessage) error {
	params := req.Params.(*lsproto.DefinitionParams)
	file, project := s.getFileAndProject(params.TextDocument.Uri)
	pos, err := s.converters.LineAndCharacterToPositionForFile(params.Position, file.FileName())
	if err != nil {
		return s.sendError(req.ID, err)
	}

	locations := project.LanguageService().ProvideDefinitions(file.FileName(), pos)
	lspLocations := make([]lsproto.Location, len(locations))
	for i, loc := range locations {
		if lspLocation, err := s.converters.ToLSPLocation(loc); err != nil {
			return s.sendError(req.ID, err)
		} else {
			lspLocations[i] = lspLocation
		}
	}

	return s.sendResult(req.ID, &lsproto.Definition{Locations: &lspLocations})
}

func (s *Server) getFileAndProject(uri lsproto.DocumentUri) (*project.ScriptInfo, *project.Project) {
	fileName := ls.DocumentURIToFileName(uri)
	return s.projectService.EnsureDefaultProjectForFile(fileName)
}

func (s *Server) Log(msg ...any) {
	fmt.Fprintln(s.stderr, msg...)
}

func codeFence(lang string, code string) string {
	if code == "" {
		return ""
	}
	ticks := 3
	for strings.Contains(code, strings.Repeat("`", ticks)) {
		ticks++
	}
	var result strings.Builder
	result.Grow(len(code) + len(lang) + 2*ticks + 2)
	for range ticks {
		result.WriteByte('`')
	}
	result.WriteString(lang)
	result.WriteByte('\n')
	result.WriteString(code)
	result.WriteByte('\n')
	for range ticks {
		result.WriteByte('`')
	}
	return result.String()
}

func ptrTo[T any](v T) *T {
	return &v
}
