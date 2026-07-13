package api

import (
	"context"
	"encoding/base64"
	"fmt"
	"slices"
	"strconv"
	"strings"
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
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/pprof"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var sessionIDCounter atomic.Uint64

// snapshotData holds the per-snapshot state including the snapshot itself
// and symbol/type registries scoped to this snapshot.
// Multiple clients may hold references to the same snapshot via ref counting;
// the registries are cleaned up when refCount reaches zero.
type snapshotData struct {
	snapshot *project.Snapshot
	refCount int

	// Symbol IDs come from ast.GetSymbolId, a global atomic counter, so the same
	// *ast.Symbol pointer always has the same unique ID across all projects in the
	// snapshot. Symbols are registered snapshot-wide to ensure identity semantics:
	// querying the same symbol from two different projects returns the same handle.
	symbolRegistry   map[SymbolID]*ast.Symbol
	symbolRegistryMu sync.RWMutex

	// symbolCanonicalProjects records, for each registered symbol, the project it was
	// first observed in. Because symbols are shared snapshot-wide (binder symbols are
	// attached to source files, which can be shared across projects), lookups that need
	// a project context (e.g. member/export ordering, node handle resolution) but don't
	// receive one from the caller default to this canonical project. First-writer wins so
	// the choice is stable. Guarded by symbolRegistryMu.
	symbolCanonicalProjects map[SymbolID]ProjectID

	projectRegistries   map[ProjectID]*projectRegistryData
	projectRegistriesMu sync.RWMutex
}

// projectRegistryData holds per-project type and signature registries.
// Types and signatures use per-checker sequential IDs, so the same local ID
// can appear in multiple projects. Separate maps per project prevent collisions
// and allow clean teardown when a project is removed.
type projectRegistryData struct {
	typeRegistry   map[TypeID]*checker.Type
	typeRegistryMu sync.RWMutex

	signatureRegistry   map[SignatureID]*checker.Signature
	signatureRegistryMu sync.RWMutex
}

// getProgram looks up a program from a project handle within this snapshot.
func (sd *snapshotData) getProgram(projectHandle ProjectID) (*compiler.Program, error) {
	proj, err := sd.getProject(projectHandle)
	if err != nil {
		return nil, err
	}

	program := proj.GetProgram()
	if program == nil {
		return nil, fmt.Errorf("%w: project has no program", ErrClientError)
	}

	return program, nil
}

// getProject looks up a project from a project handle within this snapshot.
func (sd *snapshotData) getProject(projectHandle ProjectID) (*project.Project, error) {
	projectName := parseProjectHandle(projectHandle)
	proj := sd.snapshot.ProjectCollection.GetProjectByPath(projectName)
	if proj == nil {
		return nil, fmt.Errorf("%w: project %s not found", ErrClientError, projectName)
	}
	return proj, nil
}

// nodeHandleFrom creates an index-based node handle (index.kind.path), building a node index table
// for the file on-demand if needed.
func (sd *snapshotData) nodeHandleFrom(node *ast.Node) NodeHandle {
	sourceFile := ast.GetSourceFileOfNode(node)
	path := sourceFile.Path()
	table := encoder.GetNodeIndexTable(sourceFile)
	idx := table.GetIndex(node)
	return NodeHandle(fmt.Sprintf("%d.%d.%s", idx, node.Kind, path))
}

// getOrCreateProjectRegistry returns the registry for the given project, creating it if needed.
func (sd *snapshotData) getOrCreateProjectRegistry(projectID ProjectID) *projectRegistryData {
	if projectID == "" {
		panic("getOrCreateProjectRegistry: empty project ID")
	}
	// Fast path: registry already exists — read lock only.
	sd.projectRegistriesMu.RLock()
	reg := sd.projectRegistries[projectID]
	sd.projectRegistriesMu.RUnlock()
	if reg != nil {
		return reg
	}
	// Slow path: create under write lock.
	sd.projectRegistriesMu.Lock()
	defer sd.projectRegistriesMu.Unlock()
	if sd.projectRegistries[projectID] == nil {
		sd.projectRegistries[projectID] = &projectRegistryData{
			typeRegistry:      make(map[TypeID]*checker.Type),
			signatureRegistry: make(map[SignatureID]*checker.Signature),
		}
	}
	return sd.projectRegistries[projectID]
}

// newSymbolResponse registers a symbol in the snapshot's registry and returns the response.
// canonicalProject is the project the symbol was observed in and must be non-empty; it is recorded
// as the symbol's canonical project (first writer wins) and returned to the client so it can default
// project-scoped follow-up lookups (members/exports, node resolution) to it.
func (sd *snapshotData) newSymbolResponse(symbol *ast.Symbol, canonicalProject ProjectID) *SymbolResponse {
	if symbol == nil {
		return nil
	}

	id, project := sd.registerSymbol(symbol, canonicalProject)
	resp := &SymbolResponse{
		Id:         id,
		Project:    project,
		Name:       ast.EscapeSymbolName(symbol.Name),
		Flags:      uint32(symbol.Flags),
		CheckFlags: uint32(symbol.CheckFlags),
	}

	if len(symbol.Declarations) > 0 {
		resp.Declarations = make([]NodeHandle, len(symbol.Declarations))
		for i, decl := range symbol.Declarations {
			resp.Declarations[i] = sd.nodeHandleFrom(decl)
		}
	}

	if symbol.ValueDeclaration != nil {
		resp.ValueDeclaration = sd.nodeHandleFrom(symbol.ValueDeclaration)
	}

	if symbol.Parent != nil {
		resp.Parent = SymbolHandle(symbol.Parent)
	}

	if symbol.ExportSymbol != nil {
		resp.ExportSymbol = SymbolHandle(symbol.ExportSymbol)
	}

	return resp
}

// registerSymbol registers a symbol in the snapshot's registry and returns its handle along with
// its canonical project. The canonical project is the project the symbol was first observed in
// (first writer wins for stability) and is always non-empty: every symbol handed to a client must
// carry a project so that project-scoped follow-up lookups (members/exports, parent, node
// resolution) have a default context. Callers must supply a non-empty project.
func (sd *snapshotData) registerSymbol(symbol *ast.Symbol, canonicalProject ProjectID) (SymbolID, ProjectID) {
	if symbol == nil {
		return 0, ""
	}
	if canonicalProject == "" {
		panic("registerSymbol requires a non-empty canonical project")
	}
	id := SymbolHandle(symbol)
	sd.symbolRegistryMu.Lock()
	defer sd.symbolRegistryMu.Unlock()
	existing := sd.symbolRegistry[id]
	if existing != nil {
		if existing != symbol {
			panic("duplicate symbol")
		}
	} else {
		sd.symbolRegistry[id] = symbol
	}
	project, ok := sd.symbolCanonicalProjects[id]
	if !ok {
		sd.symbolCanonicalProjects[id] = canonicalProject
		project = canonicalProject
	}
	return id, project
}

// newTypeResponse registers a type in the project's registry and returns the response.
func (sd *snapshotData) newTypeResponse(projectID ProjectID, t *checker.Type) *TypeResponse {
	if t == nil {
		return nil
	}
	return newTypeResponse(t, sd.registerType(projectID, t))
}

func (sd *snapshotData) registerType(projectID ProjectID, t *checker.Type) TypeID {
	if t == nil {
		return 0
	}
	id := TypeHandle(t)
	reg := sd.getOrCreateProjectRegistry(projectID)
	reg.typeRegistryMu.Lock()
	defer reg.typeRegistryMu.Unlock()
	existing := reg.typeRegistry[id]

	if existing != nil {
		if existing != t {
			panic("duplicate type")
		}
		return id
	}
	reg.typeRegistry[id] = t
	return id
}

// resolveSymbolHandle resolves a symbol handle within the snapshot's registry.
func (sd *snapshotData) resolveSymbolHandle(handle SymbolID) (*ast.Symbol, error) {
	if handle == 0 {
		return nil, fmt.Errorf("%w: empty symbol handle", ErrClientError)
	}

	sd.symbolRegistryMu.RLock()
	symbol, ok := sd.symbolRegistry[handle]
	sd.symbolRegistryMu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("%w: symbol handle %d not found in snapshot registry", ErrClientError, handle)
	}

	return symbol, nil
}

// resolveTypeHandle resolves a type handle within the project's registry.
func (sd *snapshotData) resolveTypeHandle(projectID ProjectID, handle TypeID) (*checker.Type, error) {
	if handle == 0 {
		return nil, fmt.Errorf("%w: empty type handle", ErrClientError)
	}
	if projectID == "" {
		return nil, fmt.Errorf("%w: empty project ID for type handle %d", ErrClientError, handle)
	}

	sd.projectRegistriesMu.RLock()
	reg := sd.projectRegistries[projectID]
	sd.projectRegistriesMu.RUnlock()

	if reg == nil {
		return nil, fmt.Errorf("%w: type handle %d not found (no registry for project %s)", ErrClientError, handle, projectID)
	}

	reg.typeRegistryMu.RLock()
	t, ok := reg.typeRegistry[handle]
	reg.typeRegistryMu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("%w: type handle %d not found in project registry", ErrClientError, handle)
	}

	return t, nil
}

// resolveSignatureHandle resolves a signature handle within the project's registry.
func (sd *snapshotData) resolveSignatureHandle(projectID ProjectID, handle SignatureID) (*checker.Signature, error) {
	if handle == 0 {
		return nil, fmt.Errorf("%w: empty signature handle", ErrClientError)
	}
	if projectID == "" {
		return nil, fmt.Errorf("%w: empty project ID for signature handle %d", ErrClientError, handle)
	}

	sd.projectRegistriesMu.RLock()
	reg := sd.projectRegistries[projectID]
	sd.projectRegistriesMu.RUnlock()

	if reg == nil {
		return nil, fmt.Errorf("%w: signature handle %d not found (no registry for project %s)", ErrClientError, handle, projectID)
	}

	reg.signatureRegistryMu.RLock()
	sig, ok := reg.signatureRegistry[handle]
	reg.signatureRegistryMu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("%w: signature handle %d not found in project registry", ErrClientError, handle)
	}

	return sig, nil
}

// newSignatureResponse registers a signature in the project's registry and returns the response.
func (sd *snapshotData) newSignatureResponse(projectID ProjectID, sig *checker.Signature) *SignatureResponse {
	if sig == nil {
		return nil
	}
	resp := &SignatureResponse{
		Id:    sd.registerSignature(projectID, sig),
		Flags: uint32(sig.Flags()),
	}

	if sig.Declaration() != nil {
		resp.Declaration = sd.nodeHandleFrom(sig.Declaration())
	}

	if len(sig.TypeParameters()) > 0 {
		resp.TypeParameters = typeHandles(sig.TypeParameters())
	}

	if len(sig.Parameters()) > 0 {
		resp.Parameters = symbolHandles(sig.Parameters())
	}

	if sig.ThisParameter() != nil {
		resp.ThisParameter = SymbolHandle(sig.ThisParameter())
	}

	if sig.Target() != nil {
		resp.Target = SignatureHandle(sig.Target())
	}

	return resp
}

func (sd *snapshotData) registerSignature(projectID ProjectID, sig *checker.Signature) SignatureID {
	if sig == nil {
		return 0
	}
	id := SignatureHandle(sig)
	reg := sd.getOrCreateProjectRegistry(projectID)
	reg.signatureRegistryMu.Lock()
	defer reg.signatureRegistryMu.Unlock()
	existing := reg.signatureRegistry[id]

	if existing != nil {
		if existing != sig {
			panic("duplicate signature")
		}
		return id
	}
	reg.signatureRegistry[id] = sig
	return id
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

	// snapshots maps snapshot handles to their data. Each snapshot has its own
	// symbol/type registries.
	//
	// snapshotsMu guards the snapshots map and latestSnapshot. It is held only for
	// short, map-bounded critical sections, never across slow work like a project
	// snapshot update or checker queries. Read handlers (getSnapshotData and the
	// language-service handlers built on it) take it for reading; handleRelease and
	// the bookkeeping tail of handleUpdateSnapshot take it for writing. This is what
	// lets queries against an existing snapshot run concurrently with the building of
	// the next one.
	snapshots   map[SnapshotID]*snapshotData
	snapshotsMu sync.RWMutex

	// latestSnapshot tracks the most recently created snapshot, used as the diff base
	// for the next update. Guarded by snapshotsMu.
	latestSnapshot SnapshotID

	// openProjects and openFiles track the projects and files this session
	// currently holds open in the project session's API state. The session holds
	// at most one ref per project/file (opens are idempotent), so it can release
	// exactly those refs on Close and never send a close for a ref it doesn't hold.
	// Guarded by updateMu.
	openProjects collections.Set[tspath.Path]
	openFiles    collections.Set[tspath.Path]

	// updateMu serializes the whole of handleUpdateSnapshot (and releaseOpenRefs)
	// against other updates. Unlike snapshotsMu it is held across the slow
	// projectSession.APIUpdate call, because building the request from
	// openProjects/openFiles, applying it, committing the ref tracking, and advancing
	// latestSnapshot must be one atomic step; otherwise concurrent updates could
	// double-count refs or diff against a non-adjacent snapshot. Read handlers do NOT
	// take this lock, so an in-flight update never blocks queries against existing
	// snapshots. Lock ordering is updateMu -> snapshotsMu (never the reverse).
	updateMu sync.Mutex

	cpuProfiler pprof.CPUProfiler
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
		snapshots:      make(map[SnapshotID]*snapshotData),
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
func snapshotHandle(snapshot *project.Snapshot) SnapshotID {
	return SnapshotID(snapshot.ID())
}

// getSnapshotData looks up snapshot data by handle.
func (s *Session) getSnapshotData(handle SnapshotID) (*snapshotData, error) {
	s.snapshotsMu.RLock()
	sd, ok := s.snapshots[handle]
	s.snapshotsMu.RUnlock()
	if !ok {
		return nil, fmt.Errorf("%w: snapshot %d not found", ErrClientError, handle)
	}
	return sd, nil
}

// checkerSetup holds the common context needed by handlers that require a type checker.
type checkerSetup struct {
	sd        *snapshotData
	program   *compiler.Program
	checker   *checker.Checker
	done      func()
	projectID ProjectID
}

func (setup checkerSetup) newTypeResponse(t *checker.Type) *TypeResponse {
	return setup.sd.newTypeResponse(setup.projectID, t)
}

func (setup checkerSetup) newSymbolResponse(sym *ast.Symbol) *SymbolResponse {
	return setup.sd.newSymbolResponse(sym, setup.projectID)
}

func (setup checkerSetup) newSignatureResponse(sig *checker.Signature) *SignatureResponse {
	return setup.sd.newSignatureResponse(setup.projectID, sig)
}

func (setup checkerSetup) resolveTypeHandle(id TypeID) (*checker.Type, error) {
	return setup.sd.resolveTypeHandle(setup.projectID, id)
}

func (setup checkerSetup) resolveSymbolHandle(id SymbolID) (*ast.Symbol, error) {
	return setup.sd.resolveSymbolHandle(id)
}

func (setup checkerSetup) resolveSignatureHandle(id SignatureID) (*checker.Signature, error) {
	return setup.sd.resolveSignatureHandle(setup.projectID, id)
}

// setupChecker resolves snapshot, program, and type checker for a project.
// Callers must defer setup.done() to release the checker.
func (s *Session) setupChecker(ctx context.Context, snapshot SnapshotID, projectHandle ProjectID) (checkerSetup, error) {
	sd, err := s.getSnapshotData(snapshot)
	if err != nil {
		return checkerSetup{}, err
	}

	program, err := sd.getProgram(projectHandle)
	if err != nil {
		return checkerSetup{}, err
	}

	c, done := program.GetTypeChecker(core.WithCheckerLifetime(ctx, core.CheckerLifetimeAPI))
	return checkerSetup{
		sd:        sd,
		program:   program,
		checker:   c,
		done:      done,
		projectID: projectHandle,
	}, nil
}

// setupLanguageService creates a LanguageService for the given snapshot/project.
// Unlike setupChecker, this does NOT acquire a checker from the pool, so callers that
// only need an LS (and not a Checker) can avoid blocking on / holding a pooled checker.
//
// The LS acquires its own checker internally (keyed by the ctx's checker lifetime).
// If a handler returns symbol/type/signature handles the client may later re-query
// on the API checker (e.g. completion with IncludeSymbol -> GetTypeOfSymbol), wrap
// ctx with core.WithCheckerLifetime(ctx, core.CheckerLifetimeAPI) so those handles
// are produced on the persistent API checker and stay resolvable. Only safe when the
// LS operation acquires a checker exactly once; nested acquisitions (e.g. find-all-
// references) would deadlock on the single-slot persistent checker.
func (s *Session) setupLanguageService(sd *snapshotData, program *compiler.Program, projectHandle ProjectID, activeFile string) (*ls.LanguageService, error) {
	projectName := parseProjectHandle(projectHandle)
	proj := sd.snapshot.ProjectCollection.GetProjectByPath(projectName)
	if proj == nil {
		return nil, fmt.Errorf("%w: project %s not found", ErrClientError, projectName)
	}
	return ls.NewLanguageService(proj.ID(), program, sd.snapshot, activeFile), nil
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
	case string(MethodGetSourceFileNames):
		return s.handleGetSourceFileNames(ctx, parsed.(*GetSourceFileNamesParams))
	case string(MethodGetSourceFileMetadata):
		return s.handleGetSourceFileMetadata(ctx, parsed.(*GetSourceFileParams))
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
	case string(MethodGetSignaturesOfType):
		return s.handleGetSignaturesOfType(ctx, parsed.(*GetSignaturesOfTypeParams))
	case string(MethodGetResolvedSignature):
		return s.handleGetResolvedSignature(ctx, parsed.(*GetResolvedSignatureParams))
	case string(MethodGetTypeAtLocation):
		return s.handleGetTypeAtLocation(ctx, parsed.(*GetTypeAtLocationParams))
	case string(MethodGetTypeAtLocations):
		return s.handleGetTypeAtLocations(ctx, parsed.(*GetTypeAtLocationsParams))
	case string(MethodGetTypeAtPosition):
		return s.handleGetTypeAtPosition(ctx, parsed.(*GetTypeAtPositionParams))
	case string(MethodGetTypesAtPositions):
		return s.handleGetTypesAtPositions(ctx, parsed.(*GetTypesAtPositionsParams))
	case string(MethodGetParentOfSymbol):
		return s.handleGetParentOfSymbol(ctx, parsed.(*GetSymbolPropertyParams))
	case string(MethodGetMembersOfSymbol):
		return s.handleGetMembersOfSymbol(ctx, parsed.(*GetSymbolPropertyParams))
	case string(MethodGetExportsOfSymbol):
		return s.handleGetExportsOfSymbol(ctx, parsed.(*GetSymbolPropertyParams))
	case string(MethodGetExportSymbolOfSymbol):
		return s.handleGetExportSymbolOfSymbol(ctx, parsed.(*GetSymbolPropertyParams))
	case string(MethodGetSymbolOfType):
		return s.handleGetSymbolOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetTargetOfType):
		return s.handleGetTargetOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetFreshTypeOfType):
		return s.handleGetFreshTypeOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetRegularTypeOfType):
		return s.handleGetRegularTypeOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetTypesOfType):
		return s.handleGetTypesOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetTypeParametersOfType):
		return s.handleGetTypeParametersOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetOuterTypeParametersOfType):
		return s.handleGetOuterTypeParametersOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetLocalTypeParametersOfType):
		return s.handleGetLocalTypeParametersOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetAliasTypeArgumentsOfType):
		return s.handleGetAliasTypeArgumentsOfType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetAliasSymbolOfType):
		return s.handleGetAliasSymbolOfType(ctx, parsed.(*GetTypePropertyParams))
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
	case string(MethodGetTrueTypeOfConditionalType):
		return s.handleGetTrueTypeOfConditionalType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetFalseTypeOfConditionalType):
		return s.handleGetFalseTypeOfConditionalType(ctx, parsed.(*GetTypePropertyParams))
	case string(MethodGetTypeParametersOfSignature):
		return s.handleGetTypeParametersOfSignature(ctx, parsed.(*GetSignaturePropertyParams))
	case string(MethodGetParametersOfSignature):
		return s.handleGetParametersOfSignature(ctx, parsed.(*GetSignaturePropertyParams))
	case string(MethodGetThisParameterOfSignature):
		return s.handleGetThisParameterOfSignature(ctx, parsed.(*GetSignaturePropertyParams))
	case string(MethodGetTargetOfSignature):
		return s.handleGetTargetOfSignature(ctx, parsed.(*GetSignaturePropertyParams))
	case string(MethodGetContextualType):
		return s.handleGetContextualType(ctx, parsed.(*GetContextualTypeParams))
	case string(MethodGetBaseTypeOfLiteralType):
		return s.handleGetBaseTypeOfLiteralType(ctx, parsed.(*GetBaseTypeOfLiteralTypeParams))
	case string(MethodGetNonNullableType):
		return s.handleGetNonNullableType(ctx, parsed.(*GetNonNullableTypeParams))
	case string(MethodGetTypeFromTypeNode):
		return s.handleGetTypeFromTypeNode(ctx, parsed.(*GetTypeFromTypeNodeParams))
	case string(MethodGetWidenedType):
		return s.handleGetWidenedType(ctx, parsed.(*GetWidenedTypeParams))
	case string(MethodGetParameterType):
		return s.handleGetParameterType(ctx, parsed.(*GetParameterTypeParams))
	case string(MethodIsArrayLikeType):
		return s.handleIsArrayLikeType(ctx, parsed.(*IsArrayLikeTypeParams))
	case string(MethodIsTypeAssignableTo):
		return s.handleIsTypeAssignableTo(ctx, parsed.(*IsTypeAssignableToParams))
	case string(MethodGetShorthandAssignmentValueSymbol):
		return s.handleGetShorthandAssignmentValueSymbol(ctx, parsed.(*GetTypeAtLocationParams))
	case string(MethodGetTypeOfSymbolAtLocation):
		return s.handleGetTypeOfSymbolAtLocation(ctx, parsed.(*GetTypeOfSymbolAtLocationParams))
	case string(MethodTypeToTypeNode):
		return s.handleTypeToTypeNode(ctx, parsed.(*TypeToTypeNodeParams))
	case string(MethodSignatureToSignatureDeclaration):
		return s.handleSignatureToSignatureDeclaration(ctx, parsed.(*SignatureToSignatureDeclarationParams))
	case string(MethodTypeToString):
		return s.handleTypeToString(ctx, parsed.(*TypeToTypeNodeParams))
	case string(MethodPrintNode):
		return s.handlePrintNode(ctx, parsed.(*PrintNodeParams))
	case string(MethodIsContextSensitive):
		return s.handleIsContextSensitive(ctx, parsed.(*GetContextualTypeParams))
	case string(MethodGetReturnTypeOfSignature):
		return s.handleGetReturnTypeOfSignature(ctx, parsed.(*CheckerSignatureParams))
	case string(MethodGetRestTypeOfSignature):
		return s.handleGetRestTypeOfSignature(ctx, parsed.(*CheckerSignatureParams))
	case string(MethodGetTypePredicateOfSignature):
		return s.handleGetTypePredicateOfSignature(ctx, parsed.(*CheckerSignatureParams))
	case string(MethodGetBaseTypes):
		return s.handleGetBaseTypes(ctx, parsed.(*CheckerTypeParams))
	case string(MethodGetPropertiesOfType):
		return s.handleGetPropertiesOfType(ctx, parsed.(*CheckerTypeParams))
	case string(MethodGetApparentType):
		return s.handleGetApparentType(ctx, parsed.(*CheckerTypeParams))
	case string(MethodGetPropertyOfType):
		return s.handleGetPropertyOfType(ctx, parsed.(*GetPropertyOfTypeParams))
	case string(MethodGetIndexInfosOfType):
		return s.handleGetIndexInfosOfType(ctx, parsed.(*CheckerTypeParams))
	case string(MethodGetConstraintOfTypeParameter):
		return s.handleGetConstraintOfTypeParameter(ctx, parsed.(*CheckerTypeParams))
	case string(MethodGetBaseConstraintOfType):
		return s.handleGetBaseConstraintOfType(ctx, parsed.(*CheckerTypeParams))
	case string(MethodGetTypeArguments):
		return s.handleGetTypeArguments(ctx, parsed.(*CheckerTypeParams))
	case string(MethodGetImportAdderEdits):
		return s.handleGetImportAdderEdits(ctx, parsed.(*GetImportAdderEditsParams))
	case string(MethodGetConstantValue):
		return s.handleGetConstantValue(ctx, parsed.(*CheckerNodeParams))
	case string(MethodGetSignatureFromDeclaration):
		return s.handleGetSignatureFromDeclaration(ctx, parsed.(*CheckerNodeParams))
	case string(MethodGetExportSpecifierLocalTarget):
		return s.handleGetExportSpecifierLocalTargetSymbol(ctx, parsed.(*CheckerNodeParams))
	case string(MethodGetAliasedSymbol):
		return s.handleGetAliasedSymbol(ctx, parsed.(*CheckerSymbolParams))
	case string(MethodGetImmediateAliasedSymbol):
		return s.handleGetImmediateAliasedSymbol(ctx, parsed.(*CheckerSymbolParams))
	case string(MethodGetExportsOfModule):
		return s.handleGetExportsOfModule(ctx, parsed.(*CheckerSymbolParams))
	case string(MethodGetMemberInModuleExports):
		return s.handleGetMemberInModuleExports(ctx, parsed.(*GetMemberInModuleExportsParams))
	case string(MethodGetJSDocTags):
		return s.handleGetJSDocTags(ctx, parsed.(*CheckerSymbolParams))
	case string(MethodGetDocumentationComment):
		return s.handleGetDocumentationComment(ctx, parsed.(*CheckerSymbolParams))
	case string(MethodIsArrayType):
		return s.handleIsArrayType(ctx, parsed.(*CheckerTypeParams))
	case string(MethodIsTupleType):
		return s.handleIsTupleType(ctx, parsed.(*CheckerTypeParams))
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
	case string(MethodGetWellKnownSymbols):
		return s.handleGetWellKnownSymbols(ctx, parsed.(*GetIntrinsicTypeParams))
	case string(MethodGetWellKnownSignatures):
		return s.handleGetWellKnownSignatures(ctx, parsed.(*GetIntrinsicTypeParams))
	case string(MethodGetSyntacticDiagnostics):
		return s.handleGetSyntacticDiagnostics(ctx, parsed.(*GetDiagnosticsParams))
	case string(MethodGetBindDiagnostics):
		return s.handleGetBindDiagnostics(ctx, parsed.(*GetDiagnosticsParams))
	case string(MethodGetSemanticDiagnostics):
		return s.handleGetSemanticDiagnostics(ctx, parsed.(*GetDiagnosticsParams))
	case string(MethodGetSuggestionDiagnostics):
		return s.handleGetSuggestionDiagnostics(ctx, parsed.(*GetDiagnosticsParams))
	case string(MethodGetDeclarationDiagnostics):
		return s.handleGetDeclarationDiagnostics(ctx, parsed.(*GetDiagnosticsParams))
	case string(MethodGetProgramDiagnostics):
		return s.handleGetProgramDiagnostics(ctx, parsed.(*GetProjectDiagnosticsParams))
	case string(MethodGetGlobalDiagnostics):
		return s.handleGetGlobalDiagnostics(ctx, parsed.(*GetProjectDiagnosticsParams))
	case string(MethodGetConfigFileParsingDiagnostics):
		return s.handleGetConfigFileParsingDiagnostics(ctx, parsed.(*GetProjectDiagnosticsParams))
	case string(MethodStartCPUProfile):
		return s.handleStartCPUProfile(ctx, parsed.(*ProfileParams))
	case string(MethodStopCPUProfile):
		return s.handleStopCPUProfile(ctx)
	case string(MethodSaveHeapProfile):
		return s.handleSaveHeapProfile(ctx, parsed.(*ProfileParams))
	case string(MethodGetReferencesToSymbolInFile):
		return s.handleGetReferencesToSymbolInFile(ctx, parsed.(*GetReferencesToSymbolInFileParams))
	case string(MethodGetReferencedSymbolsForNode):
		return s.handleGetReferencedSymbolsForNode(ctx, parsed.(*GetReferencedSymbolsForNodeParams))
	case string(MethodGetSignatureUsages):
		return s.handleGetSignatureUsages(ctx, parsed.(*GetSignatureUsagesParams))
	case string(MethodGetCompletionsAtPosition):
		return s.handleGetCompletionsAtPosition(ctx, parsed.(*GetCompletionsAtPositionParams))
	default:
		return nil, fmt.Errorf("unknown method: %s", method)
	}
}

func (s *Session) handleStartCPUProfile(_ context.Context, params *ProfileParams) (any, error) {
	if params == nil || params.Dir == "" {
		return nil, fmt.Errorf("%w: dir is required", ErrClientError)
	}
	if err := s.cpuProfiler.StartCPUProfile(params.Dir); err != nil {
		return nil, fmt.Errorf("%w: failed to start CPU profile: %w", ErrClientError, err)
	}
	return nil, nil
}

func (s *Session) handleStopCPUProfile(_ context.Context) (*ProfileResult, error) {
	filePath, err := s.cpuProfiler.StopCPUProfile()
	if err != nil {
		return nil, fmt.Errorf("%w: failed to stop CPU profile: %w", ErrClientError, err)
	}
	return &ProfileResult{File: filePath}, nil
}

func (s *Session) handleSaveHeapProfile(_ context.Context, params *ProfileParams) (*ProfileResult, error) {
	if params == nil || params.Dir == "" {
		return nil, fmt.Errorf("%w: dir is required", ErrClientError)
	}
	filePath, err := pprof.SaveHeapProfile(params.Dir)
	if err != nil {
		return nil, fmt.Errorf("%w: failed to save heap profile: %w", ErrClientError, err)
	}
	return &ProfileResult{File: filePath}, nil
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

// handleUpdateSnapshot creates a new snapshot, optionally opening or closing
// projects and files. With no args, it adopts the latest LSP state. Opens and
// closes are ref-counted per session: the session holds at most one ref per
// project/file, so repeated opens are idempotent and a close only releases a ref
// the session is actually holding.
func (s *Session) handleUpdateSnapshot(ctx context.Context, params *UpdateSnapshotParams) (*UpdateSnapshotResponse, error) {
	// Fully serialize updates: snapshot creation, ref tracking, and the
	// latestSnapshot/diff bookkeeping must be atomic with respect to other updates,
	// otherwise concurrent updates could compute diffs against a non-adjacent
	// snapshot or leave latestSnapshot pointing at a stale snapshot.
	s.updateMu.Lock()
	defer s.updateMu.Unlock()

	fileChanges := s.toFileChangeSummary(params.FileChanges)

	apiRequest := &project.APISnapshotRequest{}

	// Open projects: only take a new ref for projects we aren't already holding open.
	var openedProjects []tspath.Path
	for _, p := range params.OpenProjects {
		configFileName := p.ToAbsoluteFileName(s.projectSession.GetCurrentDirectory())
		configPath := s.toPath(configFileName)
		if s.openProjects.Has(configPath) {
			continue
		}
		if apiRequest.OpenProjects == nil {
			apiRequest.OpenProjects = collections.NewSetWithSizeHint[string](len(params.OpenProjects))
		}
		apiRequest.OpenProjects.Add(configFileName)
		openedProjects = append(openedProjects, configPath)
	}

	// Close projects: only release a ref we currently hold.
	var closedProjects []tspath.Path
	for _, p := range params.CloseProjects {
		configPath := s.toPath(p.ToAbsoluteFileName(s.projectSession.GetCurrentDirectory()))
		if !s.openProjects.Has(configPath) {
			continue
		}
		if apiRequest.CloseProjects == nil {
			apiRequest.CloseProjects = collections.NewSetWithSizeHint[tspath.Path](len(params.CloseProjects))
		}
		apiRequest.CloseProjects.Add(configPath)
		closedProjects = append(closedProjects, configPath)
	}

	// Open files: only open files we aren't already holding open, so each file is
	// held by at most one API ref from this session.
	var openedFiles []tspath.Path
	for _, f := range params.OpenFiles {
		uri := f.ToURI(s.projectSession.GetCurrentDirectory())
		path := s.toPath(uri.FileName())
		if s.openFiles.Has(path) {
			continue
		}
		if apiRequest.OpenFiles == nil {
			apiRequest.OpenFiles = collections.NewSetWithSizeHint[lsproto.DocumentUri](len(params.OpenFiles))
		}
		apiRequest.OpenFiles.Add(uri)
		openedFiles = append(openedFiles, path)
	}

	// Close files: only release a ref we currently hold.
	var closedFiles []tspath.Path
	for _, f := range params.CloseFiles {
		path := s.toPath(f.ToURI(s.projectSession.GetCurrentDirectory()).FileName())
		if !s.openFiles.Has(path) {
			continue
		}
		if apiRequest.CloseFiles == nil {
			apiRequest.CloseFiles = collections.NewSetWithSizeHint[tspath.Path](len(params.CloseFiles))
		}
		apiRequest.CloseFiles.Add(path)
		closedFiles = append(closedFiles, path)
	}

	// Even when nothing is opened or closed, APIUpdate ensures all projects and
	// files opened by the API are up to date. For an API connected to an LSP server,
	// this brings the API state up to date with the LSP state and ensures projects
	// the API cares about are ready to be queried.
	snapshot, err := s.projectSession.APIUpdate(ctx, fileChanges, apiRequest)
	if err != nil {
		// APIUpdate returns a ref'd snapshot even on error; release it.
		snapshot.Deref(s.projectSession)
		return nil, fmt.Errorf("%w: failed to update snapshot: %w", ErrClientError, err)
	}

	// Commit ref tracking now that the update succeeded.
	for _, configPath := range openedProjects {
		s.openProjects.Add(configPath)
	}
	for _, configPath := range closedProjects {
		s.openProjects.Delete(configPath)
	}
	for _, path := range openedFiles {
		s.openFiles.Add(path)
	}
	for _, path := range closedFiles {
		s.openFiles.Delete(path)
	}

	// Create or ref-count snapshot data, then atomically read the previous latest
	// snapshot (the diff base) and advance latestSnapshot to the new handle.
	// If the same snapshot ID is returned (no changes), we increment the ref count
	// so each client-side Snapshot can be disposed independently.
	handle := snapshotHandle(snapshot)
	s.snapshotsMu.Lock()
	sd, exists := s.snapshots[handle]
	if exists {
		// Same snapshot already stored — release the caller's ref since
		// the stored snapshot already has one, and bump the API refcount.
		snapshot.Deref(s.projectSession)
		sd.refCount++
	} else {
		sd = &snapshotData{
			snapshot:                snapshot,
			refCount:                1,
			symbolRegistry:          make(map[SymbolID]*ast.Symbol),
			symbolCanonicalProjects: make(map[SymbolID]ProjectID),
			projectRegistries:       make(map[ProjectID]*projectRegistryData),
		}
		s.snapshots[handle] = sd
	}
	prevSD := s.snapshots[s.latestSnapshot]
	s.latestSnapshot = handle
	s.snapshotsMu.Unlock()

	// Build projects list
	projects := snapshot.ProjectCollection.Projects()
	projectResponses := make([]*ProjectResponse, 0, len(projects))
	for _, proj := range projects {
		if proj.CommandLine == nil {
			continue
		}
		projectResponses = append(projectResponses, NewProjectResponse(proj))
	}

	// Compute changes from the previous latest snapshot
	var changes *SnapshotChanges
	if prevSD != nil {
		changes = computeSnapshotChanges(prevSD.snapshot, snapshot)
	}

	return &UpdateSnapshotResponse{
		Snapshot: handle,
		Projects: projectResponses,
		Changes:  changes,
	}, nil
}

// handleRelease decrements the ref count for a snapshot.
// The snapshot and its registries are only cleaned up when the ref count reaches zero.
func (s *Session) handleRelease(ctx context.Context, params *ReleaseParams) (any, error) {
	if params == nil || params.Snapshot == 0 {
		return nil, fmt.Errorf("%w: empty handle", ErrClientError)
	}

	s.snapshotsMu.Lock()
	sd := s.snapshots[params.Snapshot]
	if sd == nil {
		s.snapshotsMu.Unlock()
		return nil, fmt.Errorf("%w: snapshot %d not found", ErrClientError, params.Snapshot)
	}
	sd.refCount--
	if sd.refCount <= 0 {
		delete(s.snapshots, params.Snapshot)
		// Release the API session's ref on the project snapshot.
		sd.snapshot.Deref(s.projectSession)
	}
	s.snapshotsMu.Unlock()
	return true, nil
}

// handleGetDefaultProjectForFile returns the default project for a given file,
// or nil if no project currently contains the file.
func (s *Session) handleGetDefaultProjectForFile(ctx context.Context, params *GetDefaultProjectForFileParams) (*ProjectResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	uri := params.File.ToURI(s.projectSession.GetCurrentDirectory())
	proj := sd.snapshot.GetDefaultProject(uri)
	if proj == nil {
		return nil, nil
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

	// Encode the full source file.
	data, _, err := encoder.EncodeSourceFile(sourceFile)
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

// handleGetSourceFileNames returns file names of all source files in a project.
func (s *Session) handleGetSourceFileNames(ctx context.Context, params *GetSourceFileNamesParams) ([]string, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFiles := program.GetSourceFiles()
	result := make([]string, len(sourceFiles))
	for i, sourceFile := range sourceFiles {
		result[i] = sourceFile.FileName()
	}
	return result, nil
}

// handleGetSourceFileMetadata returns program-stored metadata for a single source file.
// The client fetches this lazily per file and caches it.
func (s *Session) handleGetSourceFileMetadata(ctx context.Context, params *GetSourceFileParams) (*SourceFileMetadata, error) {
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
		return nil, nil
	}

	metaData := program.GetSourceFileMetaData(sourceFile.Path())
	return &SourceFileMetadata{
		IsDefaultLibrary:      program.IsSourceFileDefaultLibrary(sourceFile.Path()),
		IsFromExternalLibrary: program.IsSourceFileFromExternalLibrary(sourceFile),
		PackageJsonType:       metaData.PackageJsonType,
		PackageJsonDirectory:  metaData.PackageJsonDirectory,
		ImpliedNodeFormat:     metaData.ImpliedNodeFormat,
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

	positionMap := sourceFile.GetPositionMap()
	node := astnav.GetTouchingPropertyName(sourceFile, positionMap.UTF16ToUTF8(int(params.Position)))
	if node == nil {
		return nil, nil
	}

	symbol := setup.checker.GetSymbolAtLocation(node)
	if symbol == nil {
		return nil, nil
	}

	return setup.newSymbolResponse(symbol), nil
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

	positionMap := sourceFile.GetPositionMap()
	results := make([]*SymbolResponse, len(params.Positions))
	for i, pos := range params.Positions {
		node := astnav.GetTouchingPropertyName(sourceFile, positionMap.UTF16ToUTF8(int(pos)))
		if node == nil {
			continue
		}
		symbol := setup.checker.GetSymbolAtLocation(node)
		if symbol != nil {
			results[i] = setup.newSymbolResponse(symbol)
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

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
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

	return setup.newSymbolResponse(symbol), nil
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
		node, err := setup.sd.resolveNodeHandle(setup.program, loc)
		if err != nil {
			return nil, err
		}
		if node == nil {
			continue
		}
		symbol := setup.checker.GetSymbolAtLocation(node)
		if symbol != nil {
			results[i] = setup.newSymbolResponse(symbol)
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

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetTypeOfSymbol(symbol)), nil
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
		symbol, err := setup.resolveSymbolHandle(symHandle)
		if err != nil {
			return nil, err
		}
		// resolveSymbolHandle errors on an unresolvable handle and GetTypeOfSymbol
		// never returns nil, so every element resolves to a type (error type at worst).
		results[i] = setup.newTypeResponse(setup.checker.GetTypeOfSymbol(symbol))
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

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetDeclaredTypeOfSymbol(symbol)), nil
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
		location, err = setup.sd.resolveNodeHandle(setup.program, params.Location)
		if err != nil {
			return nil, err
		}
	} else if params.File != nil && params.Position != nil {
		sourceFile := setup.program.GetSourceFile(params.File.ToFileName())
		if sourceFile == nil {
			return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, *params.File)
		}
		location = astnav.GetTouchingPropertyName(sourceFile, sourceFile.GetPositionMap().UTF16ToUTF8(int(*params.Position)))
	}

	symbol := setup.checker.ResolveName(params.Name, location, ast.SymbolFlags(params.Meaning), params.ExcludeGlobals)
	if symbol == nil {
		return nil, nil
	}

	return setup.newSymbolResponse(symbol), nil
}

// handleGetSignaturesOfType returns the call or construct signatures of a type.
func (s *Session) handleGetSignaturesOfType(ctx context.Context, params *GetSignaturesOfTypeParams) ([]*SignatureResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	sigs := setup.checker.GetSignaturesOfType(t, checker.SignatureKind(params.Kind))
	results := make([]*SignatureResponse, len(sigs))
	for i, sig := range sigs {
		results[i] = setup.newSignatureResponse(sig)
	}

	return results, nil
}

// handleGetResolvedSignature returns the resolved signature of a call-like expression.
func (s *Session) handleGetResolvedSignature(ctx context.Context, params *GetResolvedSignatureParams) (*SignatureResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}

	return setup.newSignatureResponse(setup.checker.GetResolvedSignature(node)), nil
}

// handleGetTypeAtLocation returns the type at a node location.
func (s *Session) handleGetTypeAtLocation(ctx context.Context, params *GetTypeAtLocationParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetTypeAtLocation(node)), nil
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
		node, err := setup.sd.resolveNodeHandle(setup.program, loc)
		if err != nil {
			return nil, err
		}
		// resolveNodeHandle errors on an unresolvable handle and GetTypeAtLocation
		// never returns nil, so every element resolves to a type (error type at worst).
		results[i] = setup.newTypeResponse(setup.checker.GetTypeAtLocation(node))
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

	positionMap := sourceFile.GetPositionMap()
	node := astnav.GetTouchingPropertyName(sourceFile, positionMap.UTF16ToUTF8(int(params.Position)))
	if node == nil {
		return nil, nil
	}

	t := setup.checker.GetTypeAtLocation(node)
	if t == nil {
		return nil, nil
	}

	return setup.newTypeResponse(t), nil
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

	positionMap := sourceFile.GetPositionMap()
	results := make([]*TypeResponse, len(params.Positions))
	for i, pos := range params.Positions {
		node := astnav.GetTouchingPropertyName(sourceFile, positionMap.UTF16ToUTF8(int(pos)))
		if node == nil {
			continue
		}
		t := setup.checker.GetTypeAtLocation(node)
		if t != nil {
			results[i] = setup.newTypeResponse(t)
		}
	}

	return results, nil
}

func (s *Session) handleGetParentOfSymbol(_ context.Context, params *GetSymbolPropertyParams) (*SymbolResponse, error) {
	return s.resolveSymbolPropertyOfSymbol(params, func(sym *ast.Symbol) *ast.Symbol { return sym.Parent })
}

func (s *Session) handleGetMembersOfSymbol(ctx context.Context, params *GetSymbolPropertyParams) ([]*SymbolResponse, error) {
	return s.resolveSymbolTablePropertyOfSymbol(ctx, params, func(symbol *ast.Symbol) ast.SymbolTable {
		return symbol.Members
	})
}

func (s *Session) handleGetExportsOfSymbol(ctx context.Context, params *GetSymbolPropertyParams) ([]*SymbolResponse, error) {
	return s.resolveSymbolTablePropertyOfSymbol(ctx, params, func(symbol *ast.Symbol) ast.SymbolTable {
		return symbol.Exports
	})
}

func (s *Session) handleGetExportSymbolOfSymbol(_ context.Context, params *GetSymbolPropertyParams) (*SymbolResponse, error) {
	return s.resolveSymbolPropertyOfSymbol(params, func(sym *ast.Symbol) *ast.Symbol { return sym.ExportSymbol })
}

func (s *Session) handleGetSymbolOfType(_ context.Context, params *GetTypePropertyParams) (*SymbolResponse, error) {
	return s.resolveSymbolPropertyOfType(params, (*checker.Type).Symbol)
}

func (s *Session) handleGetTargetOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, (*checker.Type).Target)
}

func (s *Session) handleGetFreshTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsLiteralType().FreshType() })
}

func (s *Session) handleGetRegularTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsLiteralType().RegularType() })
}

func (s *Session) handleGetTypesOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayPropertyOfType(params, (*checker.Type).Types)
}

func (s *Session) handleGetTypeParametersOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayPropertyOfType(params, func(t *checker.Type) []*checker.Type { return t.AsInterfaceType().TypeParameters() })
}

func (s *Session) handleGetOuterTypeParametersOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayPropertyOfType(params, func(t *checker.Type) []*checker.Type { return t.AsInterfaceType().OuterTypeParameters() })
}

func (s *Session) handleGetLocalTypeParametersOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayPropertyOfType(params, func(t *checker.Type) []*checker.Type { return t.AsInterfaceType().LocalTypeParameters() })
}

func (s *Session) handleGetAliasTypeArgumentsOfType(_ context.Context, params *GetTypePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayPropertyOfType(params, func(t *checker.Type) []*checker.Type {
		if t.Alias() == nil {
			return nil
		}
		return t.Alias().TypeArguments()
	})
}

func (s *Session) handleGetAliasSymbolOfType(_ context.Context, params *GetTypePropertyParams) (*SymbolResponse, error) {
	return s.resolveSymbolPropertyOfType(params, func(t *checker.Type) *ast.Symbol {
		if t.Alias() == nil {
			return nil
		}
		return t.Alias().Symbol()
	})
}

func (s *Session) handleGetObjectTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsIndexedAccessType().ObjectType() })
}

func (s *Session) handleGetIndexTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsIndexedAccessType().IndexType() })
}

func (s *Session) handleGetCheckTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsConditionalType().CheckType() })
}

func (s *Session) handleGetExtendsTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsConditionalType().ExtendsType() })
}

func (s *Session) handleGetBaseTypeOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsSubstitutionType().BaseType() })
}

func (s *Session) handleGetConstraintOfType(_ context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	return s.resolveTypePropertyOfType(params, func(t *checker.Type) *checker.Type { return t.AsSubstitutionType().SubstConstraint() })
}

func (s *Session) handleGetTypeParametersOfSignature(_ context.Context, params *GetSignaturePropertyParams) ([]*TypeResponse, error) {
	return s.resolveTypeArrayPropertyOfSignature(params, (*checker.Signature).TypeParameters)
}

func (s *Session) handleGetParametersOfSignature(_ context.Context, params *GetSignaturePropertyParams) ([]*SymbolResponse, error) {
	return s.resolveSymbolArrayPropertyOfSignature(params, (*checker.Signature).Parameters)
}

func (s *Session) handleGetThisParameterOfSignature(_ context.Context, params *GetSignaturePropertyParams) (*SymbolResponse, error) {
	return s.resolveSymbolPropertyOfSignature(params, (*checker.Signature).ThisParameter)
}

func (s *Session) handleGetTargetOfSignature(_ context.Context, params *GetSignaturePropertyParams) (*SignatureResponse, error) {
	return s.resolveSignaturePropertyOfSignature(params, (*checker.Signature).Target)
}

func (s *Session) handleGetImportAdderEdits(ctx context.Context, params *GetImportAdderEditsParams) ([]*TextEdit, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	projectPath := parseProjectHandle(params.Project)
	workingSnapshot := sd.snapshot
	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}
	sourceFile := program.GetSourceFile(params.File.ToFileName())
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, params.File)
	}

	userPreferences := workingSnapshot.UserPreferences()
	if registry := workingSnapshot.AutoImportRegistry(); registry == nil ||
		!registry.IsPreparedForImportingFile(sourceFile.FileName(), projectPath, userPreferences) {
		preparedSnapshot := s.projectSession.GetSnapshotWithAutoImports(ctx, workingSnapshot, params.File.ToURI(s.projectSession.GetCurrentDirectory()))
		defer preparedSnapshot.Deref(s.projectSession)

		workingSnapshot = preparedSnapshot
		proj := workingSnapshot.ProjectCollection.GetProjectByPath(projectPath)
		if proj == nil {
			return nil, fmt.Errorf("%w: project %s not found", ErrClientError, projectPath)
		}
		program = proj.GetProgram()
		if program == nil {
			return nil, fmt.Errorf("%w: project has no program", ErrClientError)
		}
		sourceFile = program.GetSourceFile(params.File.ToFileName())
		if sourceFile == nil {
			return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, params.File)
		}
		userPreferences = workingSnapshot.UserPreferences()
	}

	registry := workingSnapshot.AutoImportRegistry()
	if registry == nil {
		return []*TextEdit{}, nil
	}

	ch, done := program.GetTypeChecker(ctx)
	defer done()

	view := autoimport.NewView(
		registry,
		sourceFile,
		projectPath,
		program,
		userPreferences.ModuleSpecifierPreferences(),
	)
	importAdder := autoimport.NewImportAdder(
		ctx,
		program,
		ch,
		sourceFile,
		view,
		workingSnapshot.GetPreferences(sourceFile.FileName()).FormatCodeSettings,
		workingSnapshot.Converters(),
		userPreferences,
	)

	for i, action := range params.Actions {
		switch action.Kind {
		case ImportAdderActionKindImportSymbol:
			if action.Symbol == 0 {
				return nil, fmt.Errorf("%w: import adder action %d missing symbol", ErrClientError, i)
			}
			symbol, err := sd.resolveSymbolHandle(action.Symbol)
			if err != nil {
				return nil, err
			}
			isValidTypeOnlyUseSite := true
			if action.IsValidTypeOnlyUseSite != nil {
				isValidTypeOnlyUseSite = *action.IsValidTypeOnlyUseSite
			}
			importAdder.AddImportFromExportedSymbol(symbol, isValidTypeOnlyUseSite)
		default:
			return nil, fmt.Errorf("%w: unknown import adder action kind %q", ErrClientError, action.Kind)
		}
	}

	if !importAdder.HasFixes() {
		return []*TextEdit{}, nil
	}
	return toAPITextEdits(sourceFile, workingSnapshot.Converters(), importAdder.Edits()), nil
}

func toAPITextEdits(sourceFile *ast.SourceFile, converters *lsconv.Converters, edits []*lsproto.TextEdit) []*TextEdit {
	positionMap := sourceFile.GetPositionMap()
	result := make([]*TextEdit, len(edits))
	for i, edit := range edits {
		start := converters.LineAndCharacterToPosition(sourceFile, edit.Range.Start)
		end := converters.LineAndCharacterToPosition(sourceFile, edit.Range.End)
		result[i] = &TextEdit{
			Pos:     positionMap.UTF8ToUTF16(int(start)),
			End:     positionMap.UTF8ToUTF16(int(end)),
			NewText: edit.NewText,
		}
	}
	return result
}

// resolveTypePropertyOfType resolves a type property of type `Type` and returns a type response.
func (s *Session) resolveTypePropertyOfType(params *GetTypePropertyParams, getter func(*checker.Type) *checker.Type) (*TypeResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	t, err := sd.resolveTypeHandle(params.Project, params.Type)
	if err != nil {
		return nil, err
	}

	result := getter(t)
	if result == nil {
		return nil, nil
	}

	return sd.newTypeResponse(params.Project, result), nil
}

// resolveTypeArrayPropertyOfType resolves a type property of an array of types and returns an array of type responses.
func (s *Session) resolveTypeArrayPropertyOfType(params *GetTypePropertyParams, getter func(*checker.Type) []*checker.Type) ([]*TypeResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	t, err := sd.resolveTypeHandle(params.Project, params.Type)
	if err != nil {
		return nil, err
	}

	types := getter(t)
	if len(types) == 0 {
		return nil, nil
	}

	results := make([]*TypeResponse, len(types))
	for i, sub := range types {
		results[i] = sd.newTypeResponse(params.Project, sub)
	}
	return results, nil
}

// resolveSymbolPropertyOfType resolves a type property of type `Symbol` and returns a symbol response.
func (s *Session) resolveSymbolPropertyOfType(params *GetTypePropertyParams, getter func(*checker.Type) *ast.Symbol) (*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	t, err := sd.resolveTypeHandle(params.Project, params.Type)
	if err != nil {
		return nil, err
	}

	result := getter(t)
	if result == nil {
		return nil, nil
	}
	return sd.newSymbolResponse(result, params.Project), nil
}

// resolveSymbolTablePropertyOfSymbol resolves a symbol property of type `Symbol` and returns a symbol response.
func (s *Session) resolveSymbolPropertyOfSymbol(params *GetSymbolPropertyParams, getter func(*ast.Symbol) *ast.Symbol) (*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	symbol, err := sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	result := getter(symbol)
	if result == nil {
		return nil, nil
	}
	return sd.newSymbolResponse(result, params.Project), nil
}

// resolveSymbolTablePropertyOfSymbol resolves a symbol property of type `SymbolTable` and returns an array of symbol responses.
// Results are sorted using the checker's canonical symbol ordering so that API consumers receive
// a stable, deterministic order instead of Go's randomized map iteration order.
func (s *Session) resolveSymbolTablePropertyOfSymbol(ctx context.Context, params *GetSymbolPropertyParams, getter func(*ast.Symbol) ast.SymbolTable) ([]*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	symbol, err := sd.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	symbolTable := getter(symbol)
	if len(symbolTable) == 0 {
		return nil, nil
	}
	if len(symbolTable) == 1 {
		for _, sub := range symbolTable {
			return []*SymbolResponse{sd.newSymbolResponse(sub, params.Project)}, nil
		}
	}

	// More than one symbol, need a checker to sort
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbols := make([]*ast.Symbol, 0, len(symbolTable))
	for _, sub := range symbolTable {
		symbols = append(symbols, sub)
	}
	slices.SortFunc(symbols, setup.checker.CompareSymbols)

	results := make([]*SymbolResponse, len(symbols))
	for i, sub := range symbols {
		results[i] = setup.newSymbolResponse(sub)
	}
	return results, nil
}

// resolveSymbolArrayPropertyOfSignature resolves a signature property of an array of symbols and returns an array of symbol responses.
func (s *Session) resolveSymbolArrayPropertyOfSignature(params *GetSignaturePropertyParams, getter func(*checker.Signature) []*ast.Symbol) ([]*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	sig, err := sd.resolveSignatureHandle(params.Project, params.Signature)
	if err != nil {
		return nil, err
	}

	symbols := getter(sig)
	if len(symbols) == 0 {
		return nil, nil
	}

	results := make([]*SymbolResponse, len(symbols))
	for i, sym := range symbols {
		results[i] = sd.newSymbolResponse(sym, params.Project)
	}
	return results, nil
}

// resolveSymbolPropertyOfSignature resolves a signature property of type `Symbol` and returns a symbol response.
func (s *Session) resolveSymbolPropertyOfSignature(params *GetSignaturePropertyParams, getter func(*checker.Signature) *ast.Symbol) (*SymbolResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	sig, err := sd.resolveSignatureHandle(params.Project, params.Signature)
	if err != nil {
		return nil, err
	}

	result := getter(sig)
	if result == nil {
		return nil, nil
	}
	return sd.newSymbolResponse(result, params.Project), nil
}

func (s *Session) resolveTypeArrayPropertyOfSignature(params *GetSignaturePropertyParams, getter func(signature *checker.Signature) []*checker.Type) ([]*TypeResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	sig, err := sd.resolveSignatureHandle(params.Project, params.Signature)
	if err != nil {
		return nil, err
	}

	types := getter(sig)
	if len(types) == 0 {
		return nil, nil
	}

	results := make([]*TypeResponse, len(types))
	for i, sub := range types {
		results[i] = sd.newTypeResponse(params.Project, sub)
	}
	return results, nil
}

func (s *Session) resolveSignaturePropertyOfSignature(params *GetSignaturePropertyParams, getter func(*checker.Signature) *checker.Signature) (*SignatureResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	sig, err := sd.resolveSignatureHandle(params.Project, params.Signature)
	if err != nil {
		return nil, err
	}

	result := getter(sig)
	if result == nil {
		return nil, nil
	}
	return sd.newSignatureResponse(params.Project, result), nil
}

// handleGetContextualType returns the contextual type for a node.
func (s *Session) handleGetContextualType(ctx context.Context, params *GetContextualTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
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

	return setup.newTypeResponse(t), nil
}

// handleGetBaseTypeOfLiteralType returns the base type of a literal type (e.g. number for 42).
func (s *Session) handleGetBaseTypeOfLiteralType(ctx context.Context, params *GetBaseTypeOfLiteralTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetBaseTypeOfLiteralType(t)), nil
}

// handleGetNonNullableType returns the type with null and undefined removed.
func (s *Session) handleGetNonNullableType(ctx context.Context, params *GetNonNullableTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetNonNullableType(t)), nil
}

// handleGetTypeFromTypeNode returns the type for a type node.
func (s *Session) handleGetTypeFromTypeNode(ctx context.Context, params *GetTypeFromTypeNodeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetTypeFromTypeNode(node)), nil
}

// handleGetWidenedType returns the widened type.
func (s *Session) handleGetWidenedType(ctx context.Context, params *GetWidenedTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetWidenedType(t)), nil
}

// handleGetParameterType returns the type of a parameter at a given index in a signature.
func (s *Session) handleGetParameterType(ctx context.Context, params *GetParameterTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sig, err := setup.resolveSignatureHandle(params.Signature)
	if err != nil {
		return nil, err
	}

	if params.Index < 0 {
		return nil, fmt.Errorf("%w: invalid parameter index", ErrClientError)
	}

	return setup.newTypeResponse(setup.checker.GetTypeAtPosition(sig, int(params.Index))), nil
}

// handleIsArrayLikeType returns whether a type is array-like.
func (s *Session) handleIsArrayLikeType(ctx context.Context, params *IsArrayLikeTypeParams) (bool, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return false, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return false, err
	}

	return setup.checker.IsArrayLikeType(t), nil
}

// handleIsTypeAssignableTo returns whether source is assignable to target.
func (s *Session) handleIsTypeAssignableTo(ctx context.Context, params *IsTypeAssignableToParams) (bool, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return false, err
	}
	defer setup.done()

	source, err := setup.resolveTypeHandle(params.Source)
	if err != nil {
		return false, err
	}
	target, err := setup.resolveTypeHandle(params.Target)
	if err != nil {
		return false, err
	}

	return setup.checker.IsTypeAssignableTo(source, target), nil
}

// handleGetShorthandAssignmentValueSymbol returns the value symbol of a shorthand property assignment.
func (s *Session) handleGetShorthandAssignmentValueSymbol(ctx context.Context, params *GetTypeAtLocationParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
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

	return setup.newSymbolResponse(symbol), nil
}

// handleGetTypeOfSymbolAtLocation returns the narrowed type of a symbol at a specific location.
func (s *Session) handleGetTypeOfSymbolAtLocation(ctx context.Context, params *GetTypeOfSymbolAtLocationParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetTypeOfSymbolAtLocation(symbol, node)), nil
}

// handleTypeToTypeNode converts a Type to a TypeNode AST and returns it as binary-encoded data.
func (s *Session) handleTypeToTypeNode(ctx context.Context, params *TypeToTypeNodeParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	var enclosingDeclaration *ast.Node
	if params.Location != "" {
		enclosingDeclaration, err = setup.sd.resolveNodeHandle(setup.program, params.Location)
		if err != nil {
			return nil, err
		}
	}

	typeNode := setup.checker.TypeToTypeNode(t, enclosingDeclaration, nodebuilder.Flags(params.Flags), nil)
	if typeNode == nil {
		return nil, nil
	}

	data, _, err := encoder.EncodeNode(typeNode.AsNode(), nil)
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

func (s *Session) handleSignatureToSignatureDeclaration(ctx context.Context, params *SignatureToSignatureDeclarationParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sig, err := setup.resolveSignatureHandle(params.Signature)
	if err != nil {
		return nil, err
	}

	var enclosingDeclaration *ast.Node
	if params.Location != "" {
		enclosingDeclaration, err = setup.sd.resolveNodeHandle(setup.program, params.Location)
		if err != nil {
			return nil, err
		}
	}

	node := setup.checker.SignatureToSignatureDeclaration(sig, ast.Kind(params.Kind), enclosingDeclaration, nodebuilder.Flags(params.Flags))
	if node == nil {
		return nil, nil
	}

	data, _, err := encoder.EncodeNode(node.AsNode(), nil)
	if err != nil {
		return nil, fmt.Errorf("failed to encode signature declaration: %w", err)
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

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	var enclosingDeclaration *ast.Node
	if params.Location != "" {
		enclosingDeclaration, err = setup.sd.resolveNodeHandle(setup.program, params.Location)
		if err != nil {
			return nil, err
		}
	}

	if params.Flags != 0 {
		return setup.checker.TypeToStringEx(t, enclosingDeclaration, checker.TypeFormatFlags(params.Flags), nil), nil
	}
	return setup.checker.TypeToStringEx(t, enclosingDeclaration, checker.TypeFormatFlagsAllowUniqueESSymbolType|checker.TypeFormatFlagsUseAliasDefinedOutsideCurrentScope, nil), nil
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

	p := printer.NewPrinter(printer.PrinterOptions{
		PreserveSourceNewlines:        params.PreserveSourceNewlines,
		NeverAsciiEscape:              params.NeverAsciiEscape,
		TerminateUnterminatedLiterals: params.TerminateUnterminatedLiterals,
	}, printer.PrintHandlers{}, nil)
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

	return setup.newTypeResponse(t), nil
}

// handleGetWellKnownSymbols returns the handle ids of the per-checker singleton
// symbols (unknown, undefined, arguments) so the client can identify them by id.
func (s *Session) handleGetWellKnownSymbols(ctx context.Context, params *GetIntrinsicTypeParams) (*WellKnownSymbolsResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	unknown, _ := setup.sd.registerSymbol(setup.checker.GetUnknownSymbol(), setup.projectID)
	undefined, _ := setup.sd.registerSymbol(setup.checker.GetUndefinedSymbol(), setup.projectID)
	arguments, _ := setup.sd.registerSymbol(setup.checker.GetArgumentsSymbol(), setup.projectID)
	return &WellKnownSymbolsResponse{
		Unknown:   unknown,
		Undefined: undefined,
		Arguments: arguments,
	}, nil
}

// handleGetWellKnownSignatures returns the handle id of the per-checker unknown
// signature so the client can identify it by id.
func (s *Session) handleGetWellKnownSignatures(ctx context.Context, params *GetIntrinsicTypeParams) (*WellKnownSignaturesResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	return &WellKnownSignaturesResponse{
		Unknown: setup.sd.registerSignature(setup.projectID, setup.checker.GetUnknownSignature()),
	}, nil
}

// handleIsContextSensitive returns whether a node is context-sensitive.
func (s *Session) handleIsContextSensitive(ctx context.Context, params *GetContextualTypeParams) (bool, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return false, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return false, err
	}
	if node == nil {
		return false, nil
	}

	return setup.checker.IsContextSensitive(node), nil
}

// handleGetReturnTypeOfSignature returns the return type of a signature.
func (s *Session) handleGetReturnTypeOfSignature(ctx context.Context, params *CheckerSignatureParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sig, err := setup.resolveSignatureHandle(params.Signature)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetReturnTypeOfSignature(sig)), nil
}

// handleGetRestTypeOfSignature returns the rest type of a signature.
func (s *Session) handleGetRestTypeOfSignature(ctx context.Context, params *CheckerSignatureParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sig, err := setup.resolveSignatureHandle(params.Signature)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetRestTypeOfSignature(sig)), nil
}

// handleGetTypePredicateOfSignature returns the type predicate of a signature.
func (s *Session) handleGetTypePredicateOfSignature(ctx context.Context, params *CheckerSignatureParams) (*TypePredicateResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	sig, err := setup.resolveSignatureHandle(params.Signature)
	if err != nil {
		return nil, err
	}

	pred := setup.checker.GetTypePredicateOfSignature(sig)
	if pred == nil {
		return nil, nil
	}

	resp := &TypePredicateResponse{
		Kind:           int32(pred.Kind()),
		ParameterIndex: pred.ParameterIndex(),
		ParameterName:  pred.ParameterName(),
	}
	if pred.Type() != nil {
		resp.Type = setup.newTypeResponse(pred.Type())
	}

	return resp, nil
}

// handleIsArrayType returns whether a type is Array<T> or ReadonlyArray<T>.
func (s *Session) handleIsArrayType(ctx context.Context, params *CheckerTypeParams) (bool, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return false, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return false, err
	}

	return setup.checker.IsArrayType(t), nil
}

// handleIsTupleType returns whether a type is a tuple type.
func (s *Session) handleIsTupleType(ctx context.Context, params *CheckerTypeParams) (bool, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return false, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return false, err
	}

	return checker.IsTupleType(t), nil
}

// handleGetBaseTypes returns the base types of an interface/class type.
func (s *Session) handleGetBaseTypes(ctx context.Context, params *CheckerTypeParams) ([]*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	baseTypes := setup.checker.GetBaseTypes(t)
	if len(baseTypes) == 0 {
		return nil, nil
	}

	results := make([]*TypeResponse, len(baseTypes))
	for i, bt := range baseTypes {
		results[i] = setup.newTypeResponse(bt)
	}

	return results, nil
}

// handleGetPropertiesOfType returns the properties of a type.
func (s *Session) handleGetPropertiesOfType(ctx context.Context, params *CheckerTypeParams) ([]*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	props := setup.checker.GetPropertiesOfType(t)
	if len(props) == 0 {
		return nil, nil
	}

	results := make([]*SymbolResponse, len(props))
	for i, prop := range props {
		results[i] = setup.newSymbolResponse(prop)
	}

	return results, nil
}

// handleGetApparentType returns the apparent type of a type.
func (s *Session) handleGetApparentType(ctx context.Context, params *CheckerTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	return setup.newTypeResponse(setup.checker.GetApparentType(t)), nil
}

// handleGetIndexInfosOfType returns the index infos of a type.
func (s *Session) handleGetIndexInfosOfType(ctx context.Context, params *CheckerTypeParams) ([]*IndexInfoResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	infos := setup.checker.GetIndexInfosOfType(t)
	if len(infos) == 0 {
		return nil, nil
	}

	results := make([]*IndexInfoResponse, len(infos))
	for i, info := range infos {
		results[i] = &IndexInfoResponse{
			KeyType:    *setup.newTypeResponse(info.KeyType()),
			ValueType:  *setup.newTypeResponse(info.ValueType()),
			IsReadonly: info.IsReadonly(),
		}
		if info.Declaration() != nil {
			results[i].Declaration = setup.sd.nodeHandleFrom(info.Declaration())
		}
	}

	return results, nil
}

// handleGetConstraintOfTypeParameter returns the constraint of a type parameter.
func (s *Session) handleGetConstraintOfTypeParameter(ctx context.Context, params *CheckerTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	constraint := setup.checker.GetConstraintOfTypeParameter(t)
	if constraint == nil {
		return nil, nil
	}

	return setup.newTypeResponse(constraint), nil
}

// handleGetBaseConstraintOfType returns the base constraint of an instantiable type.
func (s *Session) handleGetBaseConstraintOfType(ctx context.Context, params *CheckerTypeParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	constraint := setup.checker.GetBaseConstraintOfType(t)
	if constraint == nil {
		return nil, nil
	}

	return setup.newTypeResponse(constraint), nil
}

// handleGetPropertyOfType returns a named property symbol of a type.
func (s *Session) handleGetPropertyOfType(ctx context.Context, params *GetPropertyOfTypeParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	prop := setup.checker.GetPropertyOfType(t, params.Name)
	if prop == nil {
		return nil, nil
	}

	return setup.newSymbolResponse(prop), nil
}

// handleGetConstantValue returns the constant value of an enum member or const enum access.
func (s *Session) handleGetConstantValue(ctx context.Context, params *CheckerNodeParams) (any, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	return literalValueToJSON(setup.checker.GetConstantValue(node)), nil
}

// handleGetSignatureFromDeclaration returns the signature of a function-like declaration.
func (s *Session) handleGetSignatureFromDeclaration(ctx context.Context, params *CheckerNodeParams) (*SignatureResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}

	return setup.newSignatureResponse(setup.checker.GetSignatureFromDeclaration(node)), nil
}

// handleGetExportSpecifierLocalTargetSymbol returns the local target symbol of an export specifier.
func (s *Session) handleGetExportSpecifierLocalTargetSymbol(ctx context.Context, params *CheckerNodeParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	node, err := setup.sd.resolveNodeHandle(setup.program, params.Location)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	symbol := setup.checker.GetExportSpecifierLocalTargetSymbol(node)
	if symbol == nil {
		return nil, nil
	}

	return setup.newSymbolResponse(symbol), nil
}

// handleGetAliasedSymbol resolves an alias symbol to its target.
func (s *Session) handleGetAliasedSymbol(ctx context.Context, params *CheckerSymbolParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}

	return setup.newSymbolResponse(setup.checker.GetAliasedSymbol(symbol)), nil
}

// handleGetImmediateAliasedSymbol resolves one level of alias indirection.
func (s *Session) handleGetImmediateAliasedSymbol(ctx context.Context, params *CheckerSymbolParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	aliased := setup.checker.GetImmediateAliasedSymbol(symbol)
	if aliased == nil {
		return nil, nil
	}

	return setup.newSymbolResponse(aliased), nil
}

// handleGetExportsOfModule returns the resolved exports of a module symbol,
// including those introduced by `export *` and re-exports.
func (s *Session) handleGetExportsOfModule(ctx context.Context, params *CheckerSymbolParams) ([]*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	exports := setup.checker.GetExportsOfModule(symbol)
	if len(exports) == 0 {
		return nil, nil
	}
	slices.SortFunc(exports, setup.checker.CompareSymbols)

	results := make([]*SymbolResponse, len(exports))
	for i, exp := range exports {
		results[i] = setup.newSymbolResponse(exp)
	}

	return results, nil
}

// handleGetMemberInModuleExports returns an export by name from a module symbol.
func (s *Session) handleGetMemberInModuleExports(ctx context.Context, params *GetMemberInModuleExportsParams) (*SymbolResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	member := setup.checker.TryGetMemberInModuleExports(params.Name, symbol)
	if member == nil {
		return nil, nil
	}

	return setup.newSymbolResponse(member), nil
}

// handleGetJSDocTags returns the JSDoc tags of a symbol as structured name/text pairs.
func (s *Session) handleGetJSDocTags(ctx context.Context, params *CheckerSymbolParams) ([]*JSDocTagInfo, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	langSvc, err := s.setupLanguageService(setup.sd, setup.program, params.Project, "")
	if err != nil {
		return nil, err
	}

	tags := langSvc.GetSymbolJSDocTags(symbol)
	if len(tags) == 0 {
		return nil, nil
	}
	results := make([]*JSDocTagInfo, len(tags))
	for i, tag := range tags {
		results[i] = &JSDocTagInfo{Name: tag.Name, Text: tag.Text}
	}
	return results, nil
}

// handleGetDocumentationComment returns the rendered documentation comment of a symbol as plain text.
func (s *Session) handleGetDocumentationComment(ctx context.Context, params *CheckerSymbolParams) (string, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return "", err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return "", err
	}
	if symbol == nil {
		return "", nil
	}

	langSvc, err := s.setupLanguageService(setup.sd, setup.program, params.Project, "")
	if err != nil {
		return "", err
	}

	return langSvc.GetSymbolDocumentationComment(setup.checker, symbol), nil
}

// handleGetTypeArguments returns the type arguments of a type reference.
func (s *Session) handleGetTypeArguments(ctx context.Context, params *CheckerTypeParams) ([]*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	typeArgs := setup.checker.GetTypeArguments(t)
	if len(typeArgs) == 0 {
		return nil, nil
	}

	results := make([]*TypeResponse, len(typeArgs))
	for i, ta := range typeArgs {
		results[i] = setup.newTypeResponse(ta)
	}

	return results, nil
}

func (s *Session) handleGetTrueTypeOfConditionalType(ctx context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.sd.resolveTypeHandle(params.Project, params.Type)
	if err != nil {
		return nil, err
	}

	return setup.sd.newTypeResponse(params.Project, setup.checker.GetTrueTypeOfConditionalType(t)), nil
}

func (s *Session) handleGetFalseTypeOfConditionalType(ctx context.Context, params *GetTypePropertyParams) (*TypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.sd.resolveTypeHandle(params.Project, params.Type)
	if err != nil {
		return nil, err
	}

	return setup.sd.newTypeResponse(params.Project, setup.checker.GetFalseTypeOfConditionalType(t)), nil
}

func (sd *snapshotData) resolveNodeHandle(program *compiler.Program, handle NodeHandle) (*ast.Node, error) {
	s := string(handle)
	// Format: "index.kind.path" — we need index and path, kind is informational only.
	firstDot := strings.IndexByte(s, '.')
	if firstDot == -1 {
		return nil, fmt.Errorf("%w: invalid node handle %q", ErrClientError, handle)
	}
	secondDot := strings.IndexByte(s[firstDot+1:], '.')
	if secondDot == -1 {
		return nil, fmt.Errorf("%w: invalid node handle %q", ErrClientError, handle)
	}
	secondDot += firstDot + 1 // adjust to absolute index

	idx, err := strconv.ParseUint(s[:firstDot], 10, 32)
	if err != nil {
		return nil, fmt.Errorf("%w: invalid node handle %q: %w", ErrClientError, handle, err)
	}
	path := tspath.Path(s[secondDot+1:])

	sourceFile := program.GetSourceFileByPath(path)
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: node handle %q could not be resolved (file may not be loaded or handle may be stale)", ErrClientError, handle)
	}
	table := encoder.GetNodeIndexTable(sourceFile)

	if table != nil && idx < uint64(len(table.Nodes)) {
		node := table.Nodes[idx]
		if node != nil {
			return node, nil
		}
	}
	return nil, fmt.Errorf("%w: node handle %q could not be resolved (file may not be loaded or handle may be stale)", ErrClientError, handle)
}

// computeSnapshotChanges computes the per-project source file differences between
// two snapshots. It uses DiffOrderedMaps on projects to find changed/removed projects,
// then DiffMaps on FilesByPath for each changed project to collect file-level changes.
func computeSnapshotChanges(prev *project.Snapshot, next *project.Snapshot) *SnapshotChanges {
	prevProjects := prev.ProjectCollection.ProjectsByPath()
	nextProjects := next.ProjectCollection.ProjectsByPath()

	var changes SnapshotChanges

	collections.DiffOrderedMaps(
		prevProjects, nextProjects,
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
			core.DiffMaps(
				oldFiles, newFiles,
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
					changes.ChangedProjects = make(map[ProjectID]*ProjectFileChanges)
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
	s.releaseOpenRefs()

	s.snapshotsMu.Lock()
	defer s.snapshotsMu.Unlock()
	for handle, sd := range s.snapshots {
		sd.snapshot.Deref(s.projectSession)
		delete(s.snapshots, handle)
	}
}

// releaseOpenRefs releases every project and file ref this session is holding open
// in the project session. This keeps the API's ref counts balanced when an API
// session is shut down while sharing a longer-lived project session (e.g. one
// backing an LSP server), so API-opened projects and files aren't leaked. Only
// refs the session currently holds are closed, so it never over-releases.
func (s *Session) releaseOpenRefs() {
	s.updateMu.Lock()
	defer s.updateMu.Unlock()

	if s.openProjects.Len() == 0 && s.openFiles.Len() == 0 {
		return
	}

	apiRequest := &project.APISnapshotRequest{}
	if s.openProjects.Len() > 0 {
		apiRequest.CloseProjects = s.openProjects.Clone()
	}
	if s.openFiles.Len() > 0 {
		apiRequest.CloseFiles = s.openFiles.Clone()
	}
	snapshot, err := s.projectSession.APIUpdate(context.Background(), project.FileChangeSummary{}, apiRequest)
	// APIUpdate returns a ref'd snapshot even on error; always release it.
	snapshot.Deref(s.projectSession)
	if err != nil {
		return
	}

	s.openProjects.Clear()
	s.openFiles.Clear()
}

func formatSessionID(id uint64) string {
	return fmt.Sprintf("api-session-%d", id)
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
	cwd := s.projectSession.GetCurrentDirectory()
	for _, doc := range changes.Changed {
		uri := doc.ToURI(cwd)
		summary.Changed.Add(uri)
	}
	for _, doc := range changes.Created {
		uri := doc.ToURI(cwd)
		summary.Created.Add(uri)
	}
	for _, doc := range changes.Deleted {
		uri := doc.ToURI(cwd)
		summary.Deleted.Add(uri)
	}
	if summary.Changed.Len()+summary.Created.Len()+summary.Deleted.Len() > 0 {
		summary.IncludesWatchChangeOutsideNodeModules = true
	}
	return summary
}

// handleGetSyntacticDiagnostics returns syntactic diagnostics for a file or all files.
func (s *Session) handleGetSyntacticDiagnostics(ctx context.Context, params *GetDiagnosticsParams) ([]*DiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile, err := s.resolveOptionalSourceFile(program, params.File)
	if err != nil {
		return nil, err
	}

	diags := program.GetSyntacticDiagnostics(ctx, sourceFile)
	return NewDiagnosticResponses(diags), nil
}

// handleGetBindDiagnostics returns bind diagnostics for a file or all files.
func (s *Session) handleGetBindDiagnostics(ctx context.Context, params *GetDiagnosticsParams) ([]*DiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile, err := s.resolveOptionalSourceFile(program, params.File)
	if err != nil {
		return nil, err
	}

	diags := program.GetBindDiagnostics(ctx, sourceFile)
	return NewDiagnosticResponses(diags), nil
}

// handleGetSemanticDiagnostics returns semantic diagnostics for a file or all files.
func (s *Session) handleGetSemanticDiagnostics(ctx context.Context, params *GetDiagnosticsParams) ([]*DiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile, err := s.resolveOptionalSourceFile(program, params.File)
	if err != nil {
		return nil, err
	}

	diags := program.GetSemanticDiagnostics(ctx, sourceFile)
	return NewDiagnosticResponses(diags), nil
}

// handleGetSuggestionDiagnostics returns suggestion diagnostics for a file or all files.
func (s *Session) handleGetSuggestionDiagnostics(ctx context.Context, params *GetDiagnosticsParams) ([]*DiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile, err := s.resolveOptionalSourceFile(program, params.File)
	if err != nil {
		return nil, err
	}

	diags := program.GetSuggestionDiagnostics(ctx, sourceFile)
	return NewDiagnosticResponses(diags), nil
}

// handleGetDeclarationDiagnostics returns declaration diagnostics for a file or all files.
func (s *Session) handleGetDeclarationDiagnostics(ctx context.Context, params *GetDiagnosticsParams) ([]*DiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	sourceFile, err := s.resolveOptionalSourceFile(program, params.File)
	if err != nil {
		return nil, err
	}

	diags := program.GetDeclarationDiagnostics(ctx, sourceFile)
	return NewDiagnosticResponses(diags), nil
}

// handleGetConfigFileParsingDiagnostics returns config file parsing diagnostics.
func (s *Session) handleGetConfigFileParsingDiagnostics(ctx context.Context, params *GetProjectDiagnosticsParams) ([]*DiagnosticResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	diags := program.GetConfigFileParsingDiagnostics()
	return NewDiagnosticResponses(diags), nil
}

// handleGetProgramDiagnostics returns program-wide diagnostics, including options diagnostics.
func (s *Session) handleGetProgramDiagnostics(ctx context.Context, params *GetProjectDiagnosticsParams) ([]*DiagnosticResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	diags := program.GetProgramDiagnostics()
	return NewDiagnosticResponses(diags), nil
}

// handleGetGlobalDiagnostics returns global (non-file-specific) semantic diagnostics.
func (s *Session) handleGetGlobalDiagnostics(ctx context.Context, params *GetProjectDiagnosticsParams) ([]*DiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}

	proj, err := sd.getProject(params.Project)
	if err != nil {
		return nil, err
	}

	program := proj.GetProgram()
	if program == nil {
		return nil, fmt.Errorf("%w: project has no program", ErrClientError)
	}

	// Global diagnostics are accumulated lazily by the project's checker pool as
	// files are checked. Force a full semantic pass so any global (non-file-specific)
	// diagnostics are produced; otherwise this would return an empty result for
	// projects using an external checker pool (the typical API case), since
	// compiler.Program.GetGlobalDiagnostics only reports for the internal pool.
	program.GetSemanticDiagnostics(ctx, nil)

	diags := core.Filter(proj.GetProjectDiagnostics(ctx), func(d *ast.Diagnostic) bool {
		return d.File() == nil
	})
	return NewDiagnosticResponses(diags), nil
}

// resolveOptionalSourceFile resolves an optional DocumentIdentifier to a source file.
// Returns nil if the identifier is nil (meaning all files).
func (s *Session) resolveOptionalSourceFile(program *compiler.Program, file *DocumentIdentifier) (*ast.SourceFile, error) {
	if file == nil {
		return nil, nil
	}
	sourceFile := program.GetSourceFile(file.ToFileName())
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, file)
	}
	return sourceFile, nil
}

// handleGetReferencesToSymbolInFile returns node handles for all identifiers in a file that reference the given symbol.
func (s *Session) handleGetReferencesToSymbolInFile(ctx context.Context, params *GetReferencesToSymbolInFileParams) ([]NodeHandle, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	symbol, err := setup.resolveSymbolHandle(params.Symbol)
	if err != nil {
		return nil, err
	}
	if symbol == nil {
		return nil, nil
	}

	sourceFile := setup.program.GetSourceFile(params.File.ToFileName())
	if sourceFile == nil {
		return nil, fmt.Errorf("%w: source file not found: %v", ErrClientError, params.File)
	}

	nodes := setup.checker.GetReferencesToSymbolInFile(sourceFile, symbol)
	result := make([]NodeHandle, len(nodes))
	for i, node := range nodes {
		result[i] = setup.sd.nodeHandleFrom(node)
	}
	return result, nil
}

func (s *Session) handleGetSignatureUsages(ctx context.Context, params *GetSignatureUsagesParams) ([]SignatureUsageResponse, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}
	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	signatureDecl, err := sd.resolveNodeHandle(program, params.SignatureDecl)
	if err != nil {
		return nil, err
	}
	if signatureDecl == nil {
		return nil, nil
	}

	langSvc, err := s.setupLanguageService(sd, program, params.Project, "")
	if err != nil {
		return nil, err
	}

	usages := langSvc.GetSignatureUsages(ctx, signatureDecl)
	if usages == nil {
		return nil, nil
	}

	result := make([]SignatureUsageResponse, 0, len(usages))
	for _, u := range usages {
		entry := SignatureUsageResponse{
			Name: sd.nodeHandleFrom(u.Name),
		}
		if u.Call != nil {
			entry.Call = sd.nodeHandleFrom(u.Call)
		}
		result = append(result, entry)
	}
	return result, nil
}

// handleGetCompletionsAtPosition returns completions at a position in a document.
func (s *Session) handleGetCompletionsAtPosition(ctx context.Context, params *GetCompletionsAtPositionParams) (*CompletionInfoResponse, error) {
	if params.IncludeSymbol {
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeAPI)
	}
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
		return nil, nil
	}
	langSvc, err := s.setupLanguageService(sd, program, params.Project, "")
	if err != nil {
		return nil, err
	}
	positionMap := sourceFile.GetPositionMap()
	internalPos := positionMap.UTF16ToUTF8(int(params.Position))
	result, err := langSvc.GetCompletionsAtPosition(ctx, sourceFile, internalPos, params.TriggerCharacter, params.IncludeSymbol)
	if err != nil || result == nil {
		return nil, err
	}
	entries := make([]*CompletionEntryResponse, 0, len(result.Items))
	for _, item := range result.Items {
		entry := &CompletionEntryResponse{
			Name:       item.Label,
			SortText:   item.SortText,
			InsertText: item.InsertText,
			FilterText: item.FilterText,
			Detail:     item.Detail,
		}
		if item.Kind != nil {
			entry.Kind = uint32(*item.Kind)
		}
		if item.LabelDetails != nil {
			entry.LabelDetails = &CompletionEntryLabelDetailsResponse{
				Detail:      item.LabelDetails.Detail,
				Description: item.LabelDetails.Description,
			}
		}
		if item.Symbol != nil {
			entry.Symbol = sd.newSymbolResponse(item.Symbol, params.Project)
		}
		entries = append(entries, entry)
	}
	return &CompletionInfoResponse{
		IsIncomplete: result.IsIncomplete,
		Entries:      entries,
	}, nil
}

// handleGetReferencedSymbolsForNode returns node handles for all references found at a node.
func (s *Session) handleGetReferencedSymbolsForNode(ctx context.Context, params *GetReferencedSymbolsForNodeParams) ([]ReferencedSymbolEntry, error) {
	sd, err := s.getSnapshotData(params.Snapshot)
	if err != nil {
		return nil, err
	}
	program, err := sd.getProgram(params.Project)
	if err != nil {
		return nil, err
	}

	node, err := sd.resolveNodeHandle(program, params.Node)
	if err != nil {
		return nil, err
	}
	if node == nil {
		return nil, nil
	}

	langSvc, err := s.setupLanguageService(sd, program, params.Project, "")
	if err != nil {
		return nil, err
	}

	sourceFiles := program.GetSourceFiles()
	entries := langSvc.GetReferencedSymbolsForNode(ctx, params.Position, node, sourceFiles)
	if entries == nil {
		return nil, nil
	}

	var result []ReferencedSymbolEntry
	for _, entry := range entries {
		defNode := entry.DefinitionNode()
		if defNode == nil {
			continue
		}
		var refs []NodeHandle
		for _, ref := range entry.References() {
			if ref.IsNodeEntry() {
				refs = append(refs, sd.nodeHandleFrom(ref.Node()))
			}
		}
		re := ReferencedSymbolEntry{
			Definition: sd.nodeHandleFrom(defNode),
			References: refs,
		}
		if sym := entry.DefinitionSymbol(); sym != nil {
			re.Symbol = sd.newSymbolResponse(sym, params.Project)
		}
		result = append(result, re)
	}
	return result, nil
}
