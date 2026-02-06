package api

import (
	"context"
	"encoding/base64"
	"fmt"
	"sync"
	"sync/atomic"

	"github.com/go-json-experiment/json/jsontext"
	"github.com/microsoft/typescript-go/internal/api/encoder"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var sessionIDCounter atomic.Uint64

// Session represents an API session that provides programmatic access
// to TypeScript language services through the LSP server.
// It implements the Handler interface to process incoming API requests.
// The session retains a snapshot until the client explicitly requests an update,
// ensuring consistency across multiple requests.
type Session struct {
	id             string
	projectSession *project.Session

	// This is set to true when using MessagePackProtocol.
	useBinaryResponses bool

	// snapshot is the current snapshot for this session.
	// It is retained until the client requests an update.
	snapshot        *project.Snapshot
	snapshotRelease func()

	// symbolRegistry maps symbol handles to symbols for this session.
	// Symbols are registered when returned to the client and can be
	// released explicitly or when the session closes.
	symbolRegistry   map[Handle[ast.Symbol]]*ast.Symbol
	symbolRegistryMu sync.RWMutex

	// typeRegistry maps type handles to types for this session.
	// Types are registered when returned to the client and can be
	// released explicitly or when the session closes.
	typeRegistry   map[Handle[checker.Type]]*checker.Type
	typeRegistryMu sync.RWMutex
}

// Ensure Session implements Handler
var _ Handler = (*Session)(nil)

// SessionOptions configures an API session.
type SessionOptions struct {
	// UseBinaryResponses enables binary responses for msgpack protocol.
	UseBinaryResponses bool
}

// NewSession creates a new API session with the given project session.
func NewSession(projectSession *project.Session, options *SessionOptions) *Session {
	id := sessionIDCounter.Add(1)
	s := &Session{
		id:             formatSessionID(id),
		projectSession: projectSession,
		symbolRegistry: make(map[Handle[ast.Symbol]]*ast.Symbol),
		typeRegistry:   make(map[Handle[checker.Type]]*checker.Type),
	}
	if options != nil {
		s.useBinaryResponses = options.UseBinaryResponses
	}
	return s
}

// ID returns the unique identifier for this session.
func (s *Session) ID() string {
	return s.id
}

// ProjectSession returns the underlying project session.
func (s *Session) ProjectSession() *project.Session {
	return s.projectSession
}

// ensureSnapshot lazily initializes the snapshot if it's nil.
func (s *Session) ensureSnapshot() {
	if s.snapshot == nil {
		s.snapshot, s.snapshotRelease = s.projectSession.Snapshot()
	}
}

// HandleRequest implements Handler.
func (s *Session) HandleRequest(ctx context.Context, method string, params jsontext.Value) (any, error) {
	// Handle simple methods that don't need param parsing
	switch method {
	case "echo":
		// Return raw binary for msgpack protocol compatibility
		if s.useBinaryResponses {
			return RawBinary(params), nil
		}
		return params, nil
	case "ping":
		return "pong", nil
	}

	parsed, err := unmarshalPayload(method, params)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", ErrInvalidRequest, err)
	}

	// Ensure we have a snapshot for request processing
	s.ensureSnapshot()

	switch method {
	case string(MethodRelease):
		return s.handleRelease(ctx, parsed.(*string))
	case string(MethodAdoptLSPState):
		return s.handleAdoptLSPState(ctx)
	case string(MethodParseConfigFile):
		return s.handleParseConfigFile(ctx, parsed.(*ParseConfigFileParams))
	case string(MethodLoadProject):
		return s.handleLoadProject(ctx, parsed.(*LoadProjectParams))
	case string(MethodGetDefaultProjectForFile):
		return s.handleGetDefaultProjectForFile(ctx, parsed.(*GetDefaultProjectForFileParams))
	case string(MethodGetSourceFile):
		return s.handleGetSourceFile(ctx, parsed.(*GetSourceFileParams))
	case string(MethodGetSymbolAtPosition):
		return s.handleGetSymbolAtPosition(ctx, parsed.(*GetSymbolAtPositionParams))
	case string(MethodGetSymbolsAtPositions):
		return s.handleGetSymbolsAtPositions(ctx, parsed.(*GetSymbolsAtPositionsParams))
	case string(MethodGetSymbolAtLocation):
		return s.handleGetSymbolAtLocation(ctx, parsed.(*GetSymbolAtLocationParams))
	case string(MethodGetSymbolsAtLocations):
		return s.handleGetSymbolsAtLocations(ctx, parsed.(*GetSymbolsAtLocationsParams))
	case string(MethodGetTypeOfSymbol):
		return s.handleGetTypeOfSymbol(ctx, parsed.(*GetTypeOfSymbolParams))
	case string(MethodGetTypesOfSymbols):
		return s.handleGetTypesOfSymbols(ctx, parsed.(*GetTypesOfSymbolsParams))
	default:
		return nil, fmt.Errorf("unknown method: %s", method)
	}
}

// HandleNotification implements Handler.
func (s *Session) HandleNotification(ctx context.Context, method string, params jsontext.Value) error {
	// TODO: Implement notification handling
	return nil
}

func (s *Session) handleAdoptLSPState(ctx context.Context) (any, error) {
	releaseOldSnapshot := s.snapshotRelease
	s.snapshot, s.snapshotRelease = s.projectSession.Snapshot()
	if releaseOldSnapshot != nil {
		releaseOldSnapshot()
	}

	return nil, nil
}

// handleRelease releases a handle from the session's registries.
// The handle can be a symbol handle (prefix 's') or a type handle (prefix 't').
func (s *Session) handleRelease(ctx context.Context, handle *string) (any, error) {
	if handle == nil || len(*handle) == 0 {
		return nil, fmt.Errorf("%w: empty handle", ErrClientError)
	}

	h := *handle
	if len(h) < 1 {
		return nil, fmt.Errorf("%w: invalid handle %q", ErrClientError, h)
	}

	prefix := h[0]
	switch prefix {
	case handlePrefixSymbol:
		s.symbolRegistryMu.Lock()
		delete(s.symbolRegistry, Handle[ast.Symbol](h))
		s.symbolRegistryMu.Unlock()
		return true, nil

	case handlePrefixType:
		s.typeRegistryMu.Lock()
		delete(s.typeRegistry, Handle[checker.Type](h))
		s.typeRegistryMu.Unlock()
		return true, nil

	default:
		return nil, fmt.Errorf("%w: unknown handle type %q", ErrClientError, prefix)
	}
}

// handleGetDefaultProjectForFile returns the default project for a given file.
func (s *Session) handleGetDefaultProjectForFile(ctx context.Context, params *GetDefaultProjectForFileParams) (*ProjectResponse, error) {
	uri := lsconv.FileNameToDocumentURI(params.FileName)
	proj := s.snapshot.GetDefaultProject(uri)
	if proj == nil {
		return nil, fmt.Errorf("%w: no project found for file %s", ErrClientError, params.FileName)
	}

	return NewProjectResponse(proj), nil
}

// handleParseConfigFile parses a tsconfig.json file and returns its contents.
func (s *Session) handleParseConfigFile(ctx context.Context, params *ParseConfigFileParams) (*ConfigFileResponse, error) {
	configFileName := s.toAbsoluteFileName(params.FileName)
	configFileContent, ok := s.projectSession.FS().ReadFile(configFileName)
	if !ok {
		return nil, fmt.Errorf("%w: could not read file %q", ErrClientError, configFileName)
	}

	configDir := tspath.GetDirectoryPath(configFileName)
	tsConfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(
		configFileName,
		s.toPath(configFileName),
		configFileContent,
	)
	parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
		tsConfigSourceFile,
		s.projectSession,
		configDir,
		nil, /*existingOptions*/
		nil, /*existingOptionsRaw*/
		configFileName,
		nil, /*resolutionStack*/
		nil, /*extraFileExtensions*/
		nil, /*extendedConfigCache*/
	)

	return &ConfigFileResponse{
		FileNames: parsedCommandLine.FileNames(),
		Options:   parsedCommandLine.CompilerOptions(),
	}, nil
}

// handleLoadProject explicitly loads a TypeScript project from a config file.
func (s *Session) handleLoadProject(ctx context.Context, params *LoadProjectParams) (*ProjectResponse, error) {
	configFileName := s.toAbsoluteFileName(params.ConfigFileName)
	proj, snapshot, release, err := s.projectSession.OpenProject(ctx, configFileName)
	if err != nil {
		return nil, fmt.Errorf("%w: failed to load project: %w", ErrClientError, err)
	}

	// Refresh snapshot after loading a new project
	if s.snapshotRelease != nil {
		s.snapshotRelease()
	}
	s.snapshot, s.snapshotRelease = snapshot, release

	return NewProjectResponse(proj), nil
}

// handleGetSourceFile returns a source file from a project.
func (s *Session) handleGetSourceFile(ctx context.Context, params *GetSourceFileParams) (any, error) {
	projectName := parseProjectHandle(params.Project)
	proj := s.snapshot.ProjectCollection.GetProjectByPath(projectName)
	if proj == nil {
		return nil, fmt.Errorf("%w: project %s not found", ErrClientError, projectName)
	}

	program := proj.GetProgram()
	if program == nil {
		return nil, fmt.Errorf("%w: project has no program", ErrClientError)
	}

	sourceFile := program.GetSourceFile(params.FileName)
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %s", ErrClientError, params.FileName)
	}

	// Encode the source file to binary format
	handle := FileHandle(sourceFile)
	data, err := encoder.EncodeSourceFile(sourceFile, string(handle))
	if err != nil {
		return nil, fmt.Errorf("failed to encode source file: %w", err)
	}

	// Return raw binary for msgpack protocol, or base64 for JSON
	if s.useBinaryResponses {
		return RawBinary(data), nil
	}
	return &SourceFileResponse{
		Data: base64.StdEncoding.EncodeToString(data),
	}, nil
}

// handleGetSymbolAtPosition returns the symbol at a position in a file.
func (s *Session) handleGetSymbolAtPosition(ctx context.Context, params *GetSymbolAtPositionParams) (*SymbolResponse, error) {
	program, err := s.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile := program.GetSourceFile(params.FileName)
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %s", ErrClientError, params.FileName)
	}

	node := astnav.GetTouchingPropertyName(sourceFile, int(params.Position))
	if node == nil {
		return nil, nil
	}

	checker, done := program.GetTypeChecker(ctx)
	defer done()

	symbol := checker.GetSymbolAtLocation(node)
	if symbol == nil {
		return nil, nil
	}

	return s.registerSymbol(symbol), nil
}

// handleGetSymbolsAtPositions returns symbols at multiple positions in a file.
func (s *Session) handleGetSymbolsAtPositions(ctx context.Context, params *GetSymbolsAtPositionsParams) ([]*SymbolResponse, error) {
	program, err := s.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile := program.GetSourceFile(params.FileName)
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %s", ErrClientError, params.FileName)
	}

	checker, done := program.GetTypeChecker(ctx)
	defer done()

	results := make([]*SymbolResponse, len(params.Positions))
	for i, pos := range params.Positions {
		node := astnav.GetTouchingPropertyName(sourceFile, int(pos))
		if node == nil {
			continue
		}
		symbol := checker.GetSymbolAtLocation(node)
		if symbol != nil {
			results[i] = s.registerSymbol(symbol)
		}
	}

	return results, nil
}

// handleGetSymbolAtLocation returns the symbol at a node location.
func (s *Session) handleGetSymbolAtLocation(ctx context.Context, params *GetSymbolAtLocationParams) (*SymbolResponse, error) {
	program, err := s.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	node, err := s.resolveNodeHandle(program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	checker, done := program.GetTypeChecker(ctx)
	defer done()

	symbol := checker.GetSymbolAtLocation(node)
	if symbol == nil {
		return nil, nil
	}

	return s.registerSymbol(symbol), nil
}

// handleGetSymbolsAtLocations returns symbols at multiple node locations.
func (s *Session) handleGetSymbolsAtLocations(ctx context.Context, params *GetSymbolsAtLocationsParams) ([]*SymbolResponse, error) {
	program, err := s.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	checker, done := program.GetTypeChecker(ctx)
	defer done()

	results := make([]*SymbolResponse, len(params.Locations))
	for i, loc := range params.Locations {
		node, err := s.resolveNodeHandle(program, loc)
		if err != nil {
			return nil, err
		}
		if node == nil {
			continue
		}
		symbol := checker.GetSymbolAtLocation(node)
		if symbol != nil {
			results[i] = s.registerSymbol(symbol)
		}
	}

	return results, nil
}

// handleGetTypeOfSymbol returns the type of a symbol.
func (s *Session) handleGetTypeOfSymbol(ctx context.Context, params *GetTypeOfSymbolParams) (*TypeResponse, error) {
	program, err := s.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	symbol, err := s.resolveSymbolHandle(program, params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	checker, done := program.GetTypeChecker(ctx)
	defer done()

	t := checker.GetTypeOfSymbol(symbol)
	if t == nil {
		return nil, nil
	}

	return s.registerType(t), nil
}

// handleGetTypesOfSymbols returns the types of multiple symbols.
func (s *Session) handleGetTypesOfSymbols(ctx context.Context, params *GetTypesOfSymbolsParams) ([]*TypeResponse, error) {
	program, err := s.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	checker, done := program.GetTypeChecker(ctx)
	defer done()

	results := make([]*TypeResponse, len(params.Symbols))
	for i, symHandle := range params.Symbols {
		symbol, err := s.resolveSymbolHandle(program, symHandle)
		if err != nil {
			return nil, err
		}
		if symbol == nil {
			continue
		}
		t := checker.GetTypeOfSymbol(symbol)
		if t != nil {
			results[i] = s.registerType(t)
		}
	}

	return results, nil
}

// getProgram is a helper to get a program from a project handle.
func (s *Session) getProgram(projectHandle Handle[project.Project]) (*compiler.Program, error) {
	projectName := parseProjectHandle(projectHandle)
	proj := s.snapshot.ProjectCollection.GetProjectByPath(projectName)
	if proj == nil {
		return nil, fmt.Errorf("%w: project %s not found", ErrClientError, projectName)
	}

	program := proj.GetProgram()
	if program == nil {
		return nil, fmt.Errorf("%w: project has no program", ErrClientError)
	}

	return program, nil
}

// resolveNodeHandle resolves a node handle to an AST node.
// Node handles encode: fileHandle.pos.kind
func (s *Session) resolveNodeHandle(program *compiler.Program, handle Handle[ast.Node]) (*ast.Node, error) {
	fileHandle, pos, kind, err := parseNodeHandle(handle)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", ErrClientError, err)
	}

	// Find the source file - for now we iterate; could optimize with a map
	var sourceFile *ast.SourceFile
	for _, sf := range program.GetSourceFiles() {
		if FileHandle(sf) == fileHandle {
			sourceFile = sf
			break
		}
	}
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found for handle %s", ErrClientError, fileHandle)
	}

	// Find the node at the position with the expected kind
	node := ast.GetNodeAtPosition(sourceFile, pos, true /*includeJSDoc*/)
	if node == nil {
		return nil, nil
	}

	// Verify the kind matches
	if node.Kind != kind {
		// Try to find the exact node by walking children
		var found *ast.Node
		node.ForEachChild(func(child *ast.Node) bool {
			if child.Pos() == pos && child.Kind == kind {
				found = child
				return true
			}
			return false
		})
		if found != nil {
			return found, nil
		}
		// Return the node we found even if kind doesn't match exactly
	}

	return node, nil
}

// resolveSymbolHandle resolves a symbol handle to a symbol.
// Symbol handles are registered when returned to clients.
func (s *Session) resolveSymbolHandle(program *compiler.Program, handle Handle[ast.Symbol]) (*ast.Symbol, error) {
	if len(handle) == 0 {
		return nil, fmt.Errorf("%w: empty symbol handle", ErrClientError)
	}

	s.symbolRegistryMu.RLock()
	symbol, ok := s.symbolRegistry[handle]
	s.symbolRegistryMu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("%w: symbol handle %q not found in session registry", ErrClientError, handle)
	}

	return symbol, nil
}

// registerSymbol registers a symbol in the session's registry and returns the response.
func (s *Session) registerSymbol(symbol *ast.Symbol) *SymbolResponse {
	if symbol == nil {
		return nil
	}
	resp := NewSymbolResponse(symbol)

	s.symbolRegistryMu.Lock()
	s.symbolRegistry[resp.Id] = symbol
	s.symbolRegistryMu.Unlock()

	return resp
}

// registerType registers a type in the session's registry and returns the response.
func (s *Session) registerType(t *checker.Type) *TypeResponse {
	if t == nil {
		return nil
	}
	resp := NewTypeData(t)

	s.typeRegistryMu.Lock()
	s.typeRegistry[resp.Id] = t
	s.typeRegistryMu.Unlock()

	return resp
}

// resolveTypeHandle resolves a type handle to a type.
// Type handles are registered when returned to clients.
func (s *Session) resolveTypeHandle(handle Handle[checker.Type]) (*checker.Type, error) {
	if len(handle) == 0 {
		return nil, fmt.Errorf("%w: empty type handle", ErrClientError)
	}

	s.typeRegistryMu.RLock()
	t, ok := s.typeRegistry[handle]
	s.typeRegistryMu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("%w: type handle %q not found in session registry", ErrClientError, handle)
	}

	return t, nil
}

// Close closes the session and triggers the onClose callback.
func (s *Session) Close() {
	if s.snapshotRelease != nil {
		s.snapshotRelease()
		s.snapshotRelease = nil
		s.snapshot = nil
	}
}

func formatSessionID(id uint64) string {
	return fmt.Sprintf("api-session-%d", id)
}

// toAbsoluteFileName converts a file name to an absolute path.
func (s *Session) toAbsoluteFileName(fileName string) string {
	return tspath.GetNormalizedAbsolutePath(fileName, s.projectSession.GetCurrentDirectory())
}

// toPath converts a file name to a normalized path.
func (s *Session) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, s.projectSession.GetCurrentDirectory(), s.projectSession.FS().UseCaseSensitiveFileNames())
}
