package api

import (
	"context"
	"encoding/base64"
	"fmt"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/api/encoder"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var sessionIDCounter atomic.Uint64

// snapshotData holds the per-snapshot state including the snapshot itself
// and symbol/type registries scoped to this snapshot.
// Multiple clients may hold references to the same snapshot via ref counting;
// the underlying snapshot is only released when refCount reaches zero.
type snapshotData struct {
	snapshot *project.Snapshot
	release  func()
	refCount int

	symbolRegistry   map[Handle[ast.Symbol]]*ast.Symbol
	symbolRegistryMu sync.RWMutex

	typeRegistry   map[Handle[checker.Type]]*checker.Type
	typeRegistryMu sync.RWMutex

	signatureRegistry   map[Handle[checker.Signature]]*checker.Signature
	signatureNextID     uint64
	signatureRegistryMu sync.RWMutex
}

// getProgram looks up a program from a project handle within this snapshot.
func (sd *snapshotData) getProgram(projectHandle Handle[project.Project]) (*compiler.Program, error) {
	projectName := parseProjectHandle(projectHandle)
	proj := sd.snapshot.ProjectCollection.GetProjectByPath(projectName)
	if proj == nil {
		return nil, fmt.Errorf("%w: project %s not found", ErrClientError, projectName)
	}

	program := proj.GetProgram()
	if program == nil {
		return nil, fmt.Errorf("%w: project has no program", ErrClientError)
	}

	return program, nil
}

// registerSymbol registers a symbol in this snapshot's registry and returns the response.
func (sd *snapshotData) registerSymbol(symbol *ast.Symbol) *SymbolResponse {
	if symbol == nil {
		return nil
	}
	resp := NewSymbolResponse(symbol)

	sd.symbolRegistryMu.Lock()
	sd.symbolRegistry[resp.Id] = symbol
	sd.symbolRegistryMu.Unlock()

	return resp
}

// registerType registers a type in this snapshot's registry and returns the response.
func (sd *snapshotData) registerType(t *checker.Type) *TypeResponse {
	if t == nil {
		return nil
	}
	resp := newTypeData(t)

	sd.typeRegistryMu.Lock()
	sd.typeRegistry[resp.Id] = t
	sd.typeRegistryMu.Unlock()

	return resp
}

// resolveSymbolHandle resolves a symbol handle to a symbol within this snapshot.
func (sd *snapshotData) resolveSymbolHandle(handle Handle[ast.Symbol]) (*ast.Symbol, error) {
	if len(handle) == 0 {
		return nil, fmt.Errorf("%w: empty symbol handle", ErrClientError)
	}

	sd.symbolRegistryMu.RLock()
	symbol, ok := sd.symbolRegistry[handle]
	sd.symbolRegistryMu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("%w: symbol handle %q not found in snapshot registry", ErrClientError, handle)
	}

	return symbol, nil
}

// resolveTypeHandle resolves a type handle to a type within this snapshot.
func (sd *snapshotData) resolveTypeHandle(handle Handle[checker.Type]) (*checker.Type, error) {
	if len(handle) == 0 {
		return nil, fmt.Errorf("%w: empty type handle", ErrClientError)
	}

	sd.typeRegistryMu.RLock()
	t, ok := sd.typeRegistry[handle]
	sd.typeRegistryMu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("%w: type handle %q not found in snapshot registry", ErrClientError, handle)
	}

	return t, nil
}

// registerSignature registers a signature in this snapshot's registry and returns the response.
func (sd *snapshotData) registerSignature(sig *checker.Signature) *SignatureResponse {
	if sig == nil {
		return nil
	}

	sd.signatureRegistryMu.Lock()
	sd.signatureNextID++
	id := sd.signatureNextID
	handle := SignatureHandle(id)
	sd.signatureRegistry[handle] = sig
	sd.signatureRegistryMu.Unlock()

	resp := &SignatureResponse{
		Id:    handle,
		Flags: uint32(sig.Flags()),
	}

	if sig.Declaration() != nil {
		resp.Declaration = NodeHandleFrom(sig.Declaration())
	}

	if len(sig.TypeParameters()) > 0 {
		resp.TypeParameters = make([]Handle[checker.Type], len(sig.TypeParameters()))
		for i, tp := range sig.TypeParameters() {
			resp.TypeParameters[i] = TypeHandle(tp)
			sd.typeRegistryMu.Lock()
			sd.typeRegistry[resp.TypeParameters[i]] = tp
			sd.typeRegistryMu.Unlock()
		}
	}

	if len(sig.Parameters()) > 0 {
		resp.Parameters = make([]Handle[ast.Symbol], len(sig.Parameters()))
		for i, param := range sig.Parameters() {
			resp.Parameters[i] = SymbolHandle(param)
			sd.symbolRegistryMu.Lock()
			sd.symbolRegistry[resp.Parameters[i]] = param
			sd.symbolRegistryMu.Unlock()
		}
	}

	if sig.ThisParameter() != nil {
		resp.ThisParameter = SymbolHandle(sig.ThisParameter())
		sd.symbolRegistryMu.Lock()
		sd.symbolRegistry[resp.ThisParameter] = sig.ThisParameter()
		sd.symbolRegistryMu.Unlock()
	}

	if sig.Target() != nil {
		targetResp := sd.registerSignature(sig.Target())
		if targetResp != nil {
			resp.Target = targetResp.Id
		}
	}

	return resp
}

// Session represents an API session that provides programmatic access
// to TypeScript language services through the LSP server.
// It implements the Handler interface to process incoming API requests.
// The session supports multiple active snapshots, each with their own
// symbol and type registries for maintaining object identity.
type Session struct {
	id             string
	projectSession *project.Session

	// This is set to true when using MessagePackProtocol.
	useBinaryResponses bool

	// snapshots maps snapshot handles to their data.
	// Each snapshot has its own symbol/type registries.
	snapshots   map[Handle[project.Snapshot]]*snapshotData
	snapshotsMu sync.RWMutex

	// latestSnapshot tracks the most recently created snapshot for computing diffs.
	latestSnapshot Handle[project.Snapshot]
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
		snapshots:      make(map[Handle[project.Snapshot]]*snapshotData),
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

// snapshotHandle creates a snapshot handle from a snapshot's ID.
func snapshotHandle(snapshot *project.Snapshot) Handle[project.Snapshot] {
	return Handle[project.Snapshot](fmt.Sprintf("%c%016x", handlePrefixSnapshot, snapshot.ID()))
}

// getSnapshotData looks up snapshot data by handle.
func (s *Session) getSnapshotData(handle Handle[project.Snapshot]) (*snapshotData, error) {
	s.snapshotsMu.RLock()
	sd, ok := s.snapshots[handle]
	s.snapshotsMu.RUnlock()
	if !ok {
		return nil, fmt.Errorf("%w: snapshot %s not found", ErrClientError, handle)
	}
	return sd, nil
}

// checkerSetup holds the common context needed by handlers that require a type checker.
type checkerSetup struct {
	sd      *snapshotData
	program *compiler.Program
	checker *checker.Checker
	done    func()
}

// setupChecker resolves snapshot, program, and type checker for a project.
// Callers must defer setup.done() to release the checker.
func (s *Session) setupChecker(ctx context.Context, snapshot Handle[project.Snapshot], projectHandle Handle[project.Project]) (checkerSetup, error) {
	sd, err := s.getSnapshotData(snapshot)
	if err != nil {
		return checkerSetup{}, err
	}

	program, err := sd.getProgram(projectHandle)
	if err != nil {
		return checkerSetup{}, err
	}

	c, done := program.GetTypeChecker(ctx)
	return checkerSetup{
		sd:      sd,
		program: program,
		checker: c,
		done:    done,
	}, nil
}

// HandleRequest implements Handler.
func (s *Session) HandleRequest(ctx context.Context, method string, params json.Value) (any, error) {
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

	switch method {
	case string(MethodRelease):
		return s.handleRelease(ctx, parsed.(*ReleaseParams))
	case string(MethodInitialize):
		return s.handleInitialize(ctx)
	case string(MethodUpdateSnapshot):
		return s.handleUpdateSnapshot(ctx, parsed.(*UpdateSnapshotParams))
	case string(MethodParseConfigFile):
		return s.handleParseConfigFile(ctx, parsed.(*ParseConfigFileParams))
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
	case string(MethodGetDeclaredTypeOfSymbol):
		return s.handleGetDeclaredTypeOfSymbol(ctx, parsed.(*GetTypeOfSymbolParams))
	case string(MethodResolveName):
		return s.handleResolveName(ctx, parsed.(*ResolveNameParams))
	case string(MethodGetParentOfSymbol):
		return s.handleGetParentOfSymbol(ctx, parsed.(*GetParentOfSymbolParams))
	case string(MethodGetMembersOfSymbol):
		return s.handleGetMembersOfSymbol(ctx, parsed.(*GetMembersOfSymbolParams))
	case string(MethodGetExportsOfSymbol):
		return s.handleGetExportsOfSymbol(ctx, parsed.(*GetExportsOfSymbolParams))
	case string(MethodGetSymbolOfType):
		return s.handleGetSymbolOfType(ctx, parsed.(*GetSymbolOfTypeParams))
	case string(MethodGetSignaturesOfType):
		return s.handleGetSignaturesOfType(ctx, parsed.(*GetSignaturesOfTypeParams))
	case string(MethodGetTypeAtLocation):
		return s.handleGetTypeAtLocation(ctx, parsed.(*GetTypeAtLocationParams))
	case string(MethodGetTypeAtLocations):
		return s.handleGetTypeAtLocations(ctx, parsed.(*GetTypeAtLocationsParams))
	case string(MethodGetTypeAtPosition):
		return s.handleGetTypeAtPosition(ctx, parsed.(*GetTypeAtPositionParams))
	case string(MethodGetTypesAtPositions):
		return s.handleGetTypesAtPositions(ctx, parsed.(*GetTypesAtPositionsParams))
	case string(MethodGetTargetOfType):
		return s.handleGetTargetOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetTypesOfType):
		return s.handleGetTypesOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetTypeParametersOfType):
		return s.handleGetTypeParametersOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetOuterTypeParametersOfType):
		return s.handleGetOuterTypeParametersOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetLocalTypeParametersOfType):
		return s.handleGetLocalTypeParametersOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetObjectTypeOfType):
		return s.handleGetObjectTypeOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetIndexTypeOfType):
		return s.handleGetIndexTypeOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetCheckTypeOfType):
		return s.handleGetCheckTypeOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetExtendsTypeOfType):
		return s.handleGetExtendsTypeOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetBaseTypeOfType):
		return s.handleGetBaseTypeOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetConstraintOfType):
		return s.handleGetConstraintOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetContextualType):
		return s.handleGetContextualType(ctx, parsed.(*GetContextualTypeParams))
	case string(MethodGetBaseTypeOfLiteralType):
		return s.handleGetBaseTypeOfLiteralType(ctx, parsed.(*GetBaseTypeOfLiteralTypeParams))
	case string(MethodGetShorthandAssignmentValueSymbol):
		return s.handleGetShorthandAssignmentValueSymbol(ctx, parsed.(*GetTypeAtLocationParams))
	case string(MethodGetTypeOfSymbolAtLocation):
		return s.handleGetTypeOfSymbolAtLocation(ctx, parsed.(*GetTypeOfSymbolAtLocationParams))
	case string(MethodTypeToTypeNode):
		return s.handleTypeToTypeNode(ctx, parsed.(*TypeToTypeNodeParams))
	case string(MethodTypeToString):
		return s.handleTypeToString(ctx, parsed.(*TypeToTypeNodeParams))
	case string(MethodPrintNode):
		return s.handlePrintNode(ctx, parsed.(*PrintNodeParams))
	case string(MethodGetAnyType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetAnyType)
	case string(MethodGetStringType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetStringType)
	case string(MethodGetNumberType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetNumberType)
	case string(MethodGetBooleanType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetBooleanType)
	case string(MethodGetVoidType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetVoidType)
	case string(MethodGetUndefinedType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetUndefinedType)
	case string(MethodGetNullType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetNullType)
	case string(MethodGetNeverType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetNeverType)
	case string(MethodGetUnknownType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetUnknownType)
	case string(MethodGetBigIntType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetBigIntType)
	case string(MethodGetESSymbolType):
		return s.handleGetIntrinsicType(ctx, parsed.(*GetIntrinsicTypeParams), (*checker.Checker).GetESSymbolType)
	default:
		return nil, fmt.Errorf("unknown method: %s", method)
	}
}

// HandleNotification implements Handler.
func (s *Session) HandleNotification(ctx context.Context, method string, params json.Value) error {
	// TODO: Implement notification handling
	return nil
}

func (s *Session) handleInitialize(ctx context.Context) (*InitializeResponse, error) {
	return &InitializeResponse{
		UseCaseSensitiveFileNames: s.projectSession.FS().UseCaseSensitiveFileNames(),
		CurrentDirectory:          s.projectSession.GetCurrentDirectory(),
	}, nil
}

// handleUpdateSnapshot creates a new snapshot, optionally opening a project.
// With no args, it adopts the latest LSP state.
// With OpenProject set, it opens the specified project in the new snapshot.
func (s *Session) handleUpdateSnapshot(ctx context.Context, params *UpdateSnapshotParams) (*UpdateSnapshotResponse, error) {
	var snapshot *project.Snapshot
	var release func()

	fileChanges := s.toFileChangeSummary(params.FileChanges)

	if params.OpenProject != "" {
		configFileName := s.toAbsoluteFileName(params.OpenProject)
		_, newSnapshot, newRelease, err := s.projectSession.APIOpenProject(ctx, configFileName, fileChanges)
		if err != nil {
			return nil, fmt.Errorf("%w: failed to load project: %w", ErrClientError, err)
		}
		snapshot, release = newSnapshot, newRelease
	} else {
		// Even when fileChanges is empty, APIUpdateWithFileChanges ensures all projects
		// opened by the API are up to date. For an API connected to an LSP server, this
		// brings the API state up to date with the LSP state and ensures projects the
		// API cares about are ready to be queried.
		snapshot, release = s.projectSession.APIUpdateWithFileChanges(ctx, fileChanges)
	}

	// Create or ref-count snapshot data.
	// If the same snapshot ID is returned (no changes), we increment the
	// ref count so each client-side Snapshot can be disposed independently.
	handle := snapshotHandle(snapshot)
	s.snapshotsMu.Lock()
	sd, exists := s.snapshots[handle]
	if exists {
		sd.refCount++
		// Release the duplicate reference from the server; the existing
		// snapshotData already holds the snapshot alive.
		release()
	} else {
		sd = &snapshotData{
			snapshot:          snapshot,
			release:           release,
			refCount:          1,
			symbolRegistry:    make(map[Handle[ast.Symbol]]*ast.Symbol),
			typeRegistry:      make(map[Handle[checker.Type]]*checker.Type),
			signatureRegistry: make(map[Handle[checker.Signature]]*checker.Signature),
		}
		s.snapshots[handle] = sd
	}
	s.snapshotsMu.Unlock()

	// Build projects list
	projects := snapshot.ProjectCollection.Projects()
	projectResponses := make([]*ProjectResponse, len(projects))
	for i, proj := range projects {
		projectResponses[i] = NewProjectResponse(proj)
	}

	// Compute changes from the previous latest snapshot
	var changes *SnapshotChanges
	s.snapshotsMu.RLock()
	prevSD := s.snapshots[s.latestSnapshot]
	s.snapshotsMu.RUnlock()
	if prevSD != nil {
		changes = computeSnapshotChanges(prevSD.snapshot, snapshot)
	}

	// Update the latest snapshot
	s.snapshotsMu.Lock()
	s.latestSnapshot = handle
	s.snapshotsMu.Unlock()

	return &UpdateSnapshotResponse{
		Snapshot: handle,
		Projects: projectResponses,
		Changes:  changes,
	}, nil
}

// handleRelease decrements the ref count for a snapshot.
// The snapshot and its registries are only cleaned up when the ref count reaches zero.
func (s *Session) handleRelease(ctx context.Context, params *ReleaseParams) (any, error) {
	if params == nil || len(params.Handle) == 0 {
		return nil, fmt.Errorf("%w: empty handle", ErrClientError)
	}

	h := params.Handle
	if h[0] != handlePrefixSnapshot {
		return nil, fmt.Errorf("%w: can only release snapshot handles, got prefix %q", ErrClientError, h[0])
	}

	snapshotHandle := Handle[project.Snapshot](h)
	var shouldRelease bool
	var sd *snapshotData

	s.snapshotsMu.Lock()
	sd = s.snapshots[snapshotHandle]
	if sd == nil {
		s.snapshotsMu.Unlock()
		return nil, fmt.Errorf("%w: snapshot %s not found", ErrClientError, snapshotHandle)
	}
	sd.refCount--
	if sd.refCount <= 0 {
		delete(s.snapshots, snapshotHandle)
		shouldRelease = true
	}
	s.snapshotsMu.Unlock()

	if shouldRelease {
		sd.release()
	}
	return true, nil
}

// handleGetDefaultProjectForFile returns the default project for a given file.
func (s *Session) handleGetDefaultProjectForFile(ctx context.Context, params *GetDefaultProjectForFileParams) (*ProjectResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	uri := params.File.ToURI()
	proj := sd.snapshot.GetDefaultProject(uri)
	if proj == nil {
		return nil, fmt.Errorf("%w: no project found for file %v", ErrClientError, params.File)
	}

	return NewProjectResponse(proj), nil
}

// handleParseConfigFile parses a tsconfig.json file and returns its contents.
func (s *Session) handleParseConfigFile(ctx context.Context, params *ParseConfigFileParams) (*ConfigFileResponse, error) {
	configFileName := params.File.ToAbsoluteFileName(s.projectSession.GetCurrentDirectory())
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

// handleGetSourceFile returns a source file from a project within a snapshot.
func (s *Session) handleGetSourceFile(ctx context.Context, params *GetSourceFileParams) (any, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile := program.GetSourceFile(params.File.ToFileName())
	if sourceFile == nil {
		if s.useBinaryResponses {
			return RawBinary(nil), nil
		}
		return nil, nil
	}

	// Encode the full source file
	data, err := encoder.EncodeSourceFile(sourceFile)
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
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sourceFile := setup.program.GetSourceFile(params.File.ToFileName())
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, params.File)
	}

	node := astnav.GetTouchingPropertyName(sourceFile, int(params.Position))
	if node == nil {
		return nil, nil
	}

	symbol := setup.checker.GetSymbolAtLocation(node)
	if symbol == nil {
		return nil, nil
	}

	return setup.sd.registerSymbol(symbol), nil
}

// handleGetSymbolsAtPositions returns symbols at multiple positions in a file.
func (s *Session) handleGetSymbolsAtPositions(ctx context.Context, params *GetSymbolsAtPositionsParams) ([]*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sourceFile := setup.program.GetSourceFile(params.File.ToFileName())
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, params.File)
	}

	results := make([]*SymbolResponse, len(params.Positions))
	for i, pos := range params.Positions {
		node := astnav.GetTouchingPropertyName(sourceFile, int(pos))
		if node == nil {
			continue
		}
		symbol := setup.checker.GetSymbolAtLocation(node)
		if symbol != nil {
			results[i] = setup.sd.registerSymbol(symbol)
		}
	}

	return results, nil
}

// handleGetSymbolAtLocation returns the symbol at a node location.
func (s *Session) handleGetSymbolAtLocation(ctx context.Context, params *GetSymbolAtLocationParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := s.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	symbol := setup.checker.GetSymbolAtLocation(node)
	if symbol == nil {
		return nil, nil
	}

	return setup.sd.registerSymbol(symbol), nil
}

// handleGetSymbolsAtLocations returns symbols at multiple node locations.
func (s *Session) handleGetSymbolsAtLocations(ctx context.Context, params *GetSymbolsAtLocationsParams) ([]*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	results := make([]*SymbolResponse, len(params.Locations))
	for i, loc := range params.Locations {
		node, err := s.resolveNodeHandle(setup.program, loc)
		if err != nil {
			return nil, err
		}
		if node == nil {
			continue
		}
		symbol := setup.checker.GetSymbolAtLocation(node)
		if symbol != nil {
			results[i] = setup.sd.registerSymbol(symbol)
		}
	}

	return results, nil
}

// handleGetTypeOfSymbol returns the type of a symbol.
func (s *Session) handleGetTypeOfSymbol(ctx context.Context, params *GetTypeOfSymbolParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	t := setup.checker.GetTypeOfSymbol(symbol)
	if t == nil {
		return nil, nil
	}

	return setup.sd.registerType(t), nil
}

// handleGetTypesOfSymbols returns the types of multiple symbols.
func (s *Session) handleGetTypesOfSymbols(ctx context.Context, params *GetTypesOfSymbolsParams) ([]*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	results := make([]*TypeResponse, len(params.Symbols))
	for i, symHandle := range params.Symbols {
		symbol, err := setup.sd.resolveSymbolHandle(symHandle)
		if err != nil {
			return nil, err
		}
		if symbol == nil {
			continue
		}
		t := setup.checker.GetTypeOfSymbol(symbol)
		if t != nil {
			results[i] = setup.sd.registerType(t)
		}
	}

	return results, nil
}

// handleGetDeclaredTypeOfSymbol returns the declared type of a symbol (e.g. the type alias body for type alias symbols).
func (s *Session) handleGetDeclaredTypeOfSymbol(ctx context.Context, params *GetTypeOfSymbolParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	t := setup.checker.GetDeclaredTypeOfSymbol(symbol)
	if t == nil {
		return nil, nil
	}

	return setup.sd.registerType(t), nil
}

// handleResolveName resolves a name to a symbol at a given location.
func (s *Session) handleResolveName(ctx context.Context, params *ResolveNameParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	// Resolve location node - either from node handle or from fileName+position
	var location *ast.Node
	if params.Location != "" {
		location, err = s.resolveNodeHandle(setup.program, params.Location)
		if err != nil {
			return nil, err
		}
	} else if params.File != nil && params.Position != nil {
		sourceFile := setup.program.GetSourceFile(params.File.ToFileName())
		if sourceFile == nil {
			return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, *params.File)
		}
		location = astnav.GetTouchingPropertyName(sourceFile, int(*params.Position))
	}

	symbol := setup.checker.ResolveName(params.Name, location, ast.SymbolFlags(params.Meaning), params.ExcludeGlobals)
	if symbol == nil {
		return nil, nil
	}

	return setup.sd.registerSymbol(symbol), nil
}

// handleGetParentOfSymbol returns the parent of a symbol.
func (s *Session) handleGetParentOfSymbol(ctx context.Context, params *GetParentOfSymbolParams) (*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	symbol, err := sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	parent := symbol.Parent
	if parent == nil {
		return nil, nil
	}

	return sd.registerSymbol(parent), nil
}

// handleGetMembersOfSymbol returns the members of a symbol.
func (s *Session) handleGetMembersOfSymbol(ctx context.Context, params *GetMembersOfSymbolParams) ([]*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	symbol, err := sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	if symbol.Members == nil {
		return nil, nil
	}

	results := make([]*SymbolResponse, 0, len(symbol.Members))
	for _, member := range symbol.Members {
		results = append(results, sd.registerSymbol(member))
	}

	return results, nil
}

// handleGetExportsOfSymbol returns the exports of a symbol.
func (s *Session) handleGetExportsOfSymbol(ctx context.Context, params *GetExportsOfSymbolParams) ([]*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	symbol, err := sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	if symbol.Exports == nil {
		return nil, nil
	}

	results := make([]*SymbolResponse, 0, len(symbol.Exports))
	for _, exp := range symbol.Exports {
		results = append(results, sd.registerSymbol(exp))
	}

	return results, nil
}

// handleGetSymbolOfType returns the symbol associated with a type.
func (s *Session) handleGetSymbolOfType(ctx context.Context, params *GetSymbolOfTypeParams) (*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	t, err := sd.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	symbol := t.Symbol()
	if symbol == nil {
		return nil, nil
	}

	return sd.registerSymbol(symbol), nil
}

// handleGetSignaturesOfType returns the call or construct signatures of a type.
func (s *Session) handleGetSignaturesOfType(ctx context.Context, params *GetSignaturesOfTypeParams) ([]*SignatureResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.sd.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	sigs := setup.checker.GetSignaturesOfType(t, checker.SignatureKind(params.Kind))
	results := make([]*SignatureResponse, len(sigs))
	for i, sig := range sigs {
		results[i] = setup.sd.registerSignature(sig)
	}

	return results, nil
}

// handleGetTypeAtLocation returns the type at a node location.
func (s *Session) handleGetTypeAtLocation(ctx context.Context, params *GetTypeAtLocationParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := s.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	t := setup.checker.GetTypeAtLocation(node)
	if t == nil {
		return nil, nil
	}

	return setup.sd.registerType(t), nil
}

// handleGetTypeAtLocations returns types at multiple node locations.
func (s *Session) handleGetTypeAtLocations(ctx context.Context, params *GetTypeAtLocationsParams) ([]*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	results := make([]*TypeResponse, len(params.Locations))
	for i, loc := range params.Locations {
		node, err := s.resolveNodeHandle(setup.program, loc)
		if err != nil {
			return nil, err
		}
		if node == nil {
			continue
		}
		t := setup.checker.GetTypeAtLocation(node)
		if t != nil {
			results[i] = setup.sd.registerType(t)
		}
	}

	return results, nil
}

// handleGetTypeAtPosition returns the type at a position in a file.
func (s *Session) handleGetTypeAtPosition(ctx context.Context, params *GetTypeAtPositionParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sourceFile := setup.program.GetSourceFile(params.File.ToFileName())
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, params.File)
	}

	node := astnav.GetTouchingPropertyName(sourceFile, int(params.Position))
	if node == nil {
		return nil, nil
	}

	t := setup.checker.GetTypeAtLocation(node)
	if t == nil {
		return nil, nil
	}

	return setup.sd.registerType(t), nil
}

// handleGetTypesAtPositions returns types at multiple positions in a file.
func (s *Session) handleGetTypesAtPositions(ctx context.Context, params *GetTypesAtPositionsParams) ([]*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sourceFile := setup.program.GetSourceFile(params.File.ToFileName())
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, params.File)
	}

	results := make([]*TypeResponse, len(params.Positions))
	for i, pos := range params.Positions {
		node := astnav.GetTouchingPropertyName(sourceFile, int(pos))
		if node == nil {
			continue
		}
		t := setup.checker.GetTypeAtLocation(node)
		if t != nil {
			results[i] = setup.sd.registerType(t)
		}
	}

	return results, nil
}

// resolveTypeProperty resolves a type handle and returns a single sub-type.
func (s *Session) resolveTypeProperty(params *GetTypePropertyParams, getter func(*checker.Type) *checker.Type) (*TypeResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	t, err := sd.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	result := getter(t)
	if result == nil {
		return nil, nil
	}

	return sd.registerType(result), nil
}

// resolveTypeArrayProperty resolves a type handle and returns an array of sub-types.
func (s *Session) resolveTypeArrayProperty(params *GetTypePropertyParams, getter func(*checker.Type) []*checker.Type) ([]*TypeResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	t, err := sd.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	types := getter(t)
	if len(types) == 0 {
		return nil, nil
	}

	results := make([]*TypeResponse, len(types))
	for i, sub := range types {
		results[i] = sd.registerType(sub)
	}
	return results, nil
}

func (s *Session) handleGetTargetOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypeProperty(params, (*checker.Type).Target)
}

func (s *Session) handleGetTypesOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayProperty(params, (*checker.Type).Types)
}

func (s *Session) handleGetTypeParametersOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayProperty(params, func(t *checker.Type) []*checker.Type {
		return t.AsInterfaceType().TypeParameters()
	})
}

func (s *Session) handleGetOuterTypeParametersOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayProperty(params, func(t *checker.Type) []*checker.Type {
		return t.AsInterfaceType().OuterTypeParameters()
	})
}

func (s *Session) handleGetLocalTypeParametersOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayProperty(params, func(t *checker.Type) []*checker.Type {
		return t.AsInterfaceType().LocalTypeParameters()
	})
}

func (s *Session) handleGetObjectTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypeProperty(params, func(t *checker.Type) *checker.Type {
		return t.AsIndexedAccessType().ObjectType()
	})
}

func (s *Session) handleGetIndexTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypeProperty(params, func(t *checker.Type) *checker.Type {
		return t.AsIndexedAccessType().IndexType()
	})
}

func (s *Session) handleGetCheckTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypeProperty(params, func(t *checker.Type) *checker.Type {
		return t.AsConditionalType().CheckType()
	})
}

func (s *Session) handleGetExtendsTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypeProperty(params, func(t *checker.Type) *checker.Type {
		return t.AsConditionalType().ExtendsType()
	})
}

func (s *Session) handleGetBaseTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypeProperty(params, func(t *checker.Type) *checker.Type {
		return t.AsSubstitutionType().BaseType()
	})
}

func (s *Session) handleGetConstraintOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypeProperty(params, func(t *checker.Type) *checker.Type {
		return t.AsSubstitutionType().SubstConstraint()
	})
}

// handleGetContextualType returns the contextual type for a node.
func (s *Session) handleGetContextualType(ctx context.Context, params *GetContextualTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := s.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	t := setup.checker.GetContextualType(node, checker.ContextFlagsNone)
	if t == nil {
		return nil, nil
	}

	return setup.sd.registerType(t), nil
}

// handleGetBaseTypeOfLiteralType returns the base type of a literal type (e.g. number for 42).
func (s *Session) handleGetBaseTypeOfLiteralType(ctx context.Context, params *GetBaseTypeOfLiteralTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.sd.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	result := setup.checker.GetBaseTypeOfLiteralType(t)
	if result == nil {
		return nil, nil
	}

	return setup.sd.registerType(result), nil
}

// handleGetShorthandAssignmentValueSymbol returns the value symbol of a shorthand property assignment.
func (s *Session) handleGetShorthandAssignmentValueSymbol(ctx context.Context, params *GetTypeAtLocationParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := s.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	symbol := setup.checker.GetShorthandAssignmentValueSymbol(node)
	if symbol == nil {
		return nil, nil
	}

	return setup.sd.registerSymbol(symbol), nil
}

// handleGetTypeOfSymbolAtLocation returns the narrowed type of a symbol at a specific location.
func (s *Session) handleGetTypeOfSymbolAtLocation(ctx context.Context, params *GetTypeOfSymbolAtLocationParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	node, err := s.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	t := setup.checker.GetTypeOfSymbolAtLocation(symbol, node)
	if t == nil {
		return nil, nil
	}

	return setup.sd.registerType(t), nil
}

// handleTypeToTypeNode converts a Type to a TypeNode AST and returns it as binary-encoded data.
func (s *Session) handleTypeToTypeNode(ctx context.Context, params *TypeToTypeNodeParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.sd.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	var enclosingDeclaration *ast.Node
	if params.Location != "" {
		enclosingDeclaration, err = s.resolveNodeHandle(setup.program, params.Location)
		if err != nil {
			return nil, err
		}
	}

	typeNode := setup.checker.TypeToTypeNode(t, enclosingDeclaration, nodebuilder.Flags(params.Flags), nil)
	if typeNode == nil {
		return nil, nil
	}

	data, err := encoder.EncodeNode(typeNode.AsNode(), nil)
	if err != nil {
		return nil, fmt.Errorf("failed to encode type node: %w", err)
	}

	if s.useBinaryResponses {
		return RawBinary(data), nil
	}
	return &SourceFileResponse{
		Data: base64.StdEncoding.EncodeToString(data),
	}, nil
}

// handleTypeToString converts a Type to its string representation.
func (s *Session) handleTypeToString(ctx context.Context, params *TypeToTypeNodeParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.sd.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	var enclosingDeclaration *ast.Node
	if params.Location != "" {
		enclosingDeclaration, err = s.resolveNodeHandle(setup.program, params.Location)
		if err != nil {
			return nil, err
		}
	}

	if params.Flags != 0 {
		return setup.checker.TypeToStringEx(t, enclosingDeclaration, checker.TypeFormatFlags(params.Flags)), nil
	}
	return setup.checker.TypeToStringEx(t, enclosingDeclaration, checker.TypeFormatFlagsAllowUniqueESSymbolType|checker.TypeFormatFlagsUseAliasDefinedOutsideCurrentScope), nil
}

// handlePrintNode decodes a binary-encoded AST node and prints it to text.
func (s *Session) handlePrintNode(_ context.Context, params *PrintNodeParams) (string, error) {
	data, err := base64.StdEncoding.DecodeString(params.Data)
	if err != nil {
		return "", fmt.Errorf("%w: invalid base64 data: %w", ErrClientError, err)
	}

	node, err := encoder.DecodeNodes(data)
	if err != nil {
		return "", fmt.Errorf("%w: failed to decode AST: %w", ErrClientError, err)
	}

	p := printer.NewPrinter(printer.PrinterOptions{}, printer.PrintHandlers{}, nil)
	return p.Emit(node, nil), nil
}

// handleGetIntrinsicType returns an intrinsic type (any, string, number, etc.).
func (s *Session) handleGetIntrinsicType(ctx context.Context, params *GetIntrinsicTypeParams, getter func(*checker.Checker) *checker.Type) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t := getter(setup.checker)
	if t == nil {
		return nil, nil
	}

	return setup.sd.registerType(t), nil
}

// resolveNodeHandle resolves a node handle to an AST node.
// Node handles encode: pos.end.kind.path
func (s *Session) resolveNodeHandle(program *compiler.Program, handle Handle[ast.Node]) (*ast.Node, error) {
	pos, end, kind, path, err := parseNodeHandle(handle)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", ErrClientError, err)
	}

	// Find the source file by path
	sourceFile := program.GetSourceFileByPath(path)
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %s", ErrClientError, path)
	}

	// If the handle refers to the source file itself, return it directly
	if kind == ast.KindSourceFile {
		return sourceFile.AsNode(), nil
	}

	// Find the node at the position with the expected kind and end
	node := ast.GetNodeAtPosition(sourceFile, pos, true /*includeJSDoc*/)
	if node == nil {
		return nil, nil
	}

	// Verify the kind and end match
	if node.Kind != kind || node.End() != end {
		// Try to find the exact node by walking children
		var found *ast.Node
		node.ForEachChild(func(child *ast.Node) bool {
			if child.Pos() == pos && child.End() == end && child.Kind == kind {
				found = child
				return true
			}
			return false
		})
		if found != nil {
			return found, nil
		}
		// Return the node we found even if it doesn't match exactly
	}

	return node, nil
}

// computeSnapshotChanges computes the per-project source file differences between
// two snapshots. It uses DiffOrderedMaps on projects to find changed/removed projects,
// then DiffMaps on FilesByPath for each changed project to collect file-level changes.
func computeSnapshotChanges(prev *project.Snapshot, next *project.Snapshot) *SnapshotChanges {
	prevProjects := prev.ProjectCollection.ProjectsByPath()
	nextProjects := next.ProjectCollection.ProjectsByPath()

	var changes SnapshotChanges

	collections.DiffOrderedMaps(prevProjects, nextProjects,
		// onAdded: new project — nothing to retain from previous snapshot.
		func(_ tspath.Path, _ *project.Project) {},
		// onRemoved: project removed entirely.
		func(_ tspath.Path, oldProj *project.Project) {
			changes.RemovedProjects = append(changes.RemovedProjects, ProjectHandle(oldProj))
		},
		// onModified: project changed, diff its files.
		func(_ tspath.Path, oldProj *project.Project, newProj *project.Project) {
			if oldProj.GetProgram() == newProj.GetProgram() {
				return
			}
			var oldFiles, newFiles map[tspath.Path]*ast.SourceFile
			if p := oldProj.GetProgram(); p != nil {
				oldFiles = p.FilesByPath()
			}
			if p := newProj.GetProgram(); p != nil {
				newFiles = p.FilesByPath()
			}
			var projectChanges ProjectFileChanges
			core.DiffMaps(oldFiles, newFiles,
				nil, // onAdded: new file in project, not a change.
				func(path tspath.Path, _ *ast.SourceFile) {
					projectChanges.DeletedFiles = append(projectChanges.DeletedFiles, path)
				},
				func(path tspath.Path, _ *ast.SourceFile, _ *ast.SourceFile) {
					projectChanges.ChangedFiles = append(projectChanges.ChangedFiles, path)
				},
			)
			if len(projectChanges.ChangedFiles) > 0 || len(projectChanges.DeletedFiles) > 0 {
				if changes.ChangedProjects == nil {
					changes.ChangedProjects = make(map[Handle[project.Project]]*ProjectFileChanges)
				}
				changes.ChangedProjects[ProjectHandle(newProj)] = &projectChanges
			}
		},
	)

	return &changes
}

// Close closes the session and releases all active snapshots,
// regardless of their ref counts.
func (s *Session) Close() {
	s.snapshotsMu.Lock()
	defer s.snapshotsMu.Unlock()
	for handle, sd := range s.snapshots {
		sd.release()
		delete(s.snapshots, handle)
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

// toFileChangeSummary converts API file changes to a project.FileChangeSummary.
func (s *Session) toFileChangeSummary(changes *APIFileChanges) project.FileChangeSummary {
	if changes == nil {
		return project.FileChangeSummary{}
	}
	var summary project.FileChangeSummary
	if changes.InvalidateAll {
		summary.InvalidateAll = true
		summary.IncludesWatchChangeOutsideNodeModules = true
		return summary
	}
	for _, doc := range changes.Changed {
		uri := doc.ToURI()
		summary.Changed.Add(uri)
	}
	for _, doc := range changes.Created {
		uri := doc.ToURI()
		summary.Created.Add(uri)
	}
	for _, doc := range changes.Deleted {
		uri := doc.ToURI()
		summary.Deleted.Add(uri)
	}
	if summary.Changed.Len()+summary.Created.Len()+summary.Deleted.Len() > 0 {
		summary.IncludesWatchChangeOutsideNodeModules = true
	}
	return summary
}
