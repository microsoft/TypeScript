package api

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var (
	ErrInvalidRequest = errors.New("api: invalid request")
	ErrClientError    = errors.New("api: client error")
)

type Method string

type Handle[T any] string

const (
	handlePrefixProject  = 'p'
	handlePrefixSymbol   = 's'
	handlePrefixType     = 't'
	handlePrefixSnapshot = 'n'
)

func ProjectHandle(p *project.Project) Handle[project.Project] {
	return Handle[project.Project](fmt.Sprintf("%c.%s", handlePrefixProject, p.ID()))
}

func SymbolHandle(symbol *ast.Symbol) Handle[ast.Symbol] {
	return createHandle[ast.Symbol](handlePrefixSymbol, ast.GetSymbolId(symbol))
}

func TypeHandle(t *checker.Type) Handle[checker.Type] {
	return createHandle[checker.Type](handlePrefixType, t.Id())
}

// NodeHandleFrom creates a node handle from a node.
// Format: pos.end.kind.path
func NodeHandleFrom(node *ast.Node) Handle[ast.Node] {
	sourceFile := ast.GetSourceFileOfNode(node)
	return Handle[ast.Node](fmt.Sprintf("%d.%d.%d.%s", node.Pos(), node.End(), node.Kind, sourceFile.Path()))
}

// parseNodeHandle parses a node handle into its components.
// Format: pos.end.kind.path
func parseNodeHandle(handle Handle[ast.Node]) (pos int, end int, kind ast.Kind, path tspath.Path, err error) {
	parts := strings.SplitN(string(handle), ".", 4)
	if len(parts) != 4 {
		return 0, 0, 0, "", fmt.Errorf("invalid node handle %q", handle)
	}

	posInt, err := strconv.ParseInt(parts[0], 10, 32)
	if err != nil {
		return 0, 0, 0, "", fmt.Errorf("invalid node handle %q: %w", handle, err)
	}
	endInt, err := strconv.ParseInt(parts[1], 10, 32)
	if err != nil {
		return 0, 0, 0, "", fmt.Errorf("invalid node handle %q: %w", handle, err)
	}
	kindInt, err := strconv.ParseInt(parts[2], 10, 16)
	if err != nil {
		return 0, 0, 0, "", fmt.Errorf("invalid node handle %q: %w", handle, err)
	}
	return int(posInt), int(endInt), ast.Kind(kindInt), tspath.Path(parts[3]), nil
}

func parseProjectHandle(handle Handle[project.Project]) tspath.Path {
	return tspath.Path(handle[2:])
}

func createHandle[T any](prefix rune, id any) Handle[T] {
	return Handle[T](fmt.Sprintf("%c%016x", prefix, id))
}

const (
	MethodRelease Method = "release"

	MethodInitialize               Method = "initialize"
	MethodUpdateSnapshot           Method = "updateSnapshot"
	MethodParseConfigFile          Method = "parseConfigFile"
	MethodGetDefaultProjectForFile Method = "getDefaultProjectForFile"
	MethodGetSymbolAtPosition      Method = "getSymbolAtPosition"
	MethodGetSymbolsAtPositions    Method = "getSymbolsAtPositions"
	MethodGetSymbolAtLocation      Method = "getSymbolAtLocation"
	MethodGetSymbolsAtLocations    Method = "getSymbolsAtLocations"
	MethodGetTypeOfSymbol          Method = "getTypeOfSymbol"
	MethodGetTypesOfSymbols        Method = "getTypesOfSymbols"
	MethodGetSourceFile            Method = "getSourceFile"
	MethodResolveName              Method = "resolveName"
)

// InitializeResponse is returned by the initialize method.
type InitializeResponse struct {
	// UseCaseSensitiveFileNames indicates whether the host file system is case-sensitive.
	UseCaseSensitiveFileNames bool `json:"useCaseSensitiveFileNames"`
	// CurrentDirectory is the server's current working directory.
	CurrentDirectory string `json:"currentDirectory"`
}

// DocumentIdentifier identifies a document by either a file name (plain string) or a URI object.
// On the wire it is string | { uri: string }.
type DocumentIdentifier struct {
	FileName string              `json:"fileName,omitempty"`
	URI      lsproto.DocumentUri `json:"uri,omitempty"`
}

var _ json.UnmarshalerFrom = (*DocumentIdentifier)(nil)

func (d *DocumentIdentifier) UnmarshalJSONFrom(dec *json.Decoder) error {
	// Try reading as a plain string first
	tok, err := dec.ReadToken()
	if err != nil {
		return err
	}
	switch tok.Kind() {
	case '"':
		d.FileName = tok.String()
		return nil
	case '{':
		// Read the object fields
		for dec.PeekKind() != '}' {
			key, err := dec.ReadToken()
			if err != nil {
				return err
			}
			val, err := dec.ReadToken()
			if err != nil {
				return err
			}
			if key.String() == "uri" {
				d.URI = lsproto.DocumentUri(val.String())
			}
		}
		// Consume the closing brace
		if _, err := dec.ReadToken(); err != nil {
			return err
		}
		return nil
	default:
		return fmt.Errorf("DocumentIdentifier: expected string or object, got %v", tok.Kind())
	}
}

func (d DocumentIdentifier) ToFileName() string {
	if d.URI != "" {
		return d.URI.FileName()
	}
	return d.FileName
}

func (d DocumentIdentifier) ToURI() lsproto.DocumentUri {
	if d.URI != "" {
		return d.URI
	}
	return lsconv.FileNameToDocumentURI(d.FileName)
}

func (d DocumentIdentifier) ToAbsoluteFileName(cwd string) string {
	if d.URI != "" {
		return d.URI.FileName()
	}
	return tspath.GetNormalizedAbsolutePath(d.FileName, cwd)
}

func (d DocumentIdentifier) String() string {
	if d.URI != "" {
		return string(d.URI)
	}
	return d.FileName
}

// APIFileChangeSummary lists documents that have been changed, created, or deleted.
type APIFileChangeSummary struct {
	Changed []DocumentIdentifier `json:"changed,omitempty"`
	Created []DocumentIdentifier `json:"created,omitempty"`
	Deleted []DocumentIdentifier `json:"deleted,omitempty"`
}

// APIFileChanges describes file changes to apply when updating a snapshot.
// Either InvalidateAll is true (discard all caches) or Changed/Created/Deleted
// list individual documents.
type APIFileChanges struct {
	InvalidateAll bool                 `json:"invalidateAll,omitempty"`
	Changed       []DocumentIdentifier `json:"changed,omitempty"`
	Created       []DocumentIdentifier `json:"created,omitempty"`
	Deleted       []DocumentIdentifier `json:"deleted,omitempty"`
}

// UpdateSnapshotParams are the parameters for creating a new snapshot.
// All fields are optional. With no fields set, the server adopts the latest LSP state.
type UpdateSnapshotParams struct {
	// OpenProject is the path to a tsconfig.json file to open/load in the new snapshot.
	OpenProject string `json:"openProject,omitempty"`
	// FileChanges describes file system changes since the last snapshot.
	FileChanges *APIFileChanges `json:"fileChanges,omitempty"`
}

// ProjectFileChanges describes what source files changed within a single project.
type ProjectFileChanges struct {
	// ChangedFiles lists source file paths whose content differs.
	ChangedFiles []tspath.Path `json:"changedFiles,omitempty"`
	// DeletedFiles lists source file paths removed from the project's program.
	DeletedFiles []tspath.Path `json:"deletedFiles,omitempty"`
}

// SnapshotChanges describes what changed between the previous latest snapshot
// and the newly created snapshot. Changes are reported per-project so clients
// can track cache refs at the (snapshot, project) level.
type SnapshotChanges struct {
	// ChangedProjects maps project handles to the file changes within that project.
	// Projects not listed here (and not in RemovedProjects) are unchanged.
	ChangedProjects map[Handle[project.Project]]*ProjectFileChanges `json:"changedProjects,omitempty"`
	// RemovedProjects lists project handles that were present in the previous
	// snapshot but absent from the new one.
	RemovedProjects []Handle[project.Project] `json:"removedProjects,omitempty"`
}

// UpdateSnapshotResponse is returned by updateSnapshot.
type UpdateSnapshotResponse struct {
	// Snapshot is the handle for the newly created snapshot.
	Snapshot Handle[project.Snapshot] `json:"snapshot"`
	// Projects is the list of projects in the snapshot.
	Projects []*ProjectResponse `json:"projects"`
	// Changes describes source file differences from the previous snapshot.
	// Nil for the first snapshot in a session.
	Changes *SnapshotChanges `json:"changes,omitempty"`
}

var unmarshalers = map[Method]func([]byte) (any, error){
	MethodRelease:                  unmarshallerFor[ReleaseParams],
	MethodInitialize:               noParams,
	MethodUpdateSnapshot:           unmarshallerFor[UpdateSnapshotParams],
	MethodParseConfigFile:          unmarshallerFor[ParseConfigFileParams],
	MethodGetDefaultProjectForFile: unmarshallerFor[GetDefaultProjectForFileParams],
	MethodGetSourceFile:            unmarshallerFor[GetSourceFileParams],
	MethodGetSymbolAtPosition:      unmarshallerFor[GetSymbolAtPositionParams],
	MethodGetSymbolsAtPositions:    unmarshallerFor[GetSymbolsAtPositionsParams],
	MethodGetSymbolAtLocation:      unmarshallerFor[GetSymbolAtLocationParams],
	MethodGetSymbolsAtLocations:    unmarshallerFor[GetSymbolsAtLocationsParams],
	MethodGetTypeOfSymbol:          unmarshallerFor[GetTypeOfSymbolParams],
	MethodGetTypesOfSymbols:        unmarshallerFor[GetTypesOfSymbolsParams],
	MethodResolveName:              unmarshallerFor[ResolveNameParams],
}

type ParseConfigFileParams struct {
	File DocumentIdentifier `json:"file"`
}

// ReleaseParams are the parameters for the release method.
type ReleaseParams struct {
	Handle string `json:"handle"`
}

type ConfigFileResponse struct {
	FileNames []string              `json:"fileNames"`
	Options   *core.CompilerOptions `json:"options"`
}

type GetDefaultProjectForFileParams struct {
	Snapshot Handle[project.Snapshot] `json:"snapshot"`
	File     DocumentIdentifier       `json:"file"`
}

type ProjectResponse struct {
	Id              Handle[project.Project] `json:"id"`
	ConfigFileName  string                  `json:"configFileName"`
	RootFiles       []string                `json:"rootFiles"`
	CompilerOptions *core.CompilerOptions   `json:"compilerOptions"`
}

func NewProjectResponse(p *project.Project) *ProjectResponse {
	return &ProjectResponse{
		Id:              ProjectHandle(p),
		ConfigFileName:  p.Name(),
		RootFiles:       p.CommandLine.FileNames(),
		CompilerOptions: p.CommandLine.CompilerOptions(),
	}
}

type GetSymbolAtPositionParams struct {
	Snapshot Handle[project.Snapshot] `json:"snapshot"`
	Project  Handle[project.Project]  `json:"project"`
	File     DocumentIdentifier       `json:"file"`
	Position uint32                   `json:"position"`
}

type GetSymbolsAtPositionsParams struct {
	Snapshot  Handle[project.Snapshot] `json:"snapshot"`
	Project   Handle[project.Project]  `json:"project"`
	File      DocumentIdentifier       `json:"file"`
	Positions []uint32                 `json:"positions"`
}

type GetSymbolAtLocationParams struct {
	Snapshot Handle[project.Snapshot] `json:"snapshot"`
	Project  Handle[project.Project]  `json:"project"`
	Location Handle[ast.Node]         `json:"location"`
}

type GetSymbolsAtLocationsParams struct {
	Snapshot  Handle[project.Snapshot] `json:"snapshot"`
	Project   Handle[project.Project]  `json:"project"`
	Locations []Handle[ast.Node]       `json:"locations"`
}

type SymbolResponse struct {
	Id               Handle[ast.Symbol] `json:"id"`
	Name             string             `json:"name"`
	Flags            uint32             `json:"flags"`
	CheckFlags       uint32             `json:"checkFlags"`
	Declarations     []Handle[ast.Node] `json:"declarations,omitempty"`
	ValueDeclaration Handle[ast.Node]   `json:"valueDeclaration,omitempty"`
}

func NewSymbolResponse(symbol *ast.Symbol) *SymbolResponse {
	resp := &SymbolResponse{
		Id:         SymbolHandle(symbol),
		Name:       symbol.Name,
		Flags:      uint32(symbol.Flags),
		CheckFlags: uint32(symbol.CheckFlags),
	}

	// Add declarations
	if len(symbol.Declarations) > 0 {
		resp.Declarations = make([]Handle[ast.Node], len(symbol.Declarations))
		for i, decl := range symbol.Declarations {
			resp.Declarations[i] = NodeHandleFrom(decl)
		}
	}

	// Add value declaration
	if symbol.ValueDeclaration != nil {
		resp.ValueDeclaration = NodeHandleFrom(symbol.ValueDeclaration)
	}

	return resp
}

type GetTypeOfSymbolParams struct {
	Snapshot Handle[project.Snapshot] `json:"snapshot"`
	Project  Handle[project.Project]  `json:"project"`
	Symbol   Handle[ast.Symbol]       `json:"symbol"`
}

type GetTypesOfSymbolsParams struct {
	Snapshot Handle[project.Snapshot] `json:"snapshot"`
	Project  Handle[project.Project]  `json:"project"`
	Symbols  []Handle[ast.Symbol]     `json:"symbols"`
}

type TypeResponse struct {
	Id    Handle[checker.Type] `json:"id"`
	Flags uint32               `json:"flags"`
}

func NewTypeData(t *checker.Type) *TypeResponse {
	return &TypeResponse{
		Id:    TypeHandle(t),
		Flags: uint32(t.Flags()),
	}
}

type GetSourceFileParams struct {
	Snapshot Handle[project.Snapshot] `json:"snapshot"`
	Project  Handle[project.Project]  `json:"project"`
	File     DocumentIdentifier       `json:"file"`
}

type ResolveNameParams struct {
	Snapshot       Handle[project.Snapshot] `json:"snapshot"`
	Project        Handle[project.Project]  `json:"project"`
	Name           string                   `json:"name"`
	Location       Handle[ast.Node]         `json:"location,omitempty"`       // Optional: node handle for location context
	File           *DocumentIdentifier      `json:"file,omitempty"`           // Optional: file for location context (alternative to Location)
	Position       *uint32                  `json:"position,omitempty"`       // Optional: position in file for location context (with File)
	Meaning        uint32                   `json:"meaning"`                  // SymbolFlags for what kind of symbol to find
	ExcludeGlobals bool                     `json:"excludeGlobals,omitempty"` // Whether to exclude global symbols
}

// SourceFileResponse contains the binary-encoded AST data for a source file.
// The Data field is base64-encoded binary data in the encoder's format.
type SourceFileResponse struct {
	Data string `json:"data"`
}

func unmarshalPayload(method string, payload json.Value) (any, error) {
	unmarshaler, ok := unmarshalers[Method(method)]
	if !ok {
		return nil, fmt.Errorf("unknown API method %q", method)
	}
	return unmarshaler(payload)
}

func unmarshallerFor[T any](data []byte) (any, error) {
	var v T
	if err := json.Unmarshal(data, &v); err != nil {
		return nil, fmt.Errorf("failed to unmarshal %T: %w", (*T)(nil), err)
	}
	return &v, nil
}

func noParams(data []byte) (any, error) {
	return nil, nil
}
