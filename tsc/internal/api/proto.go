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
	handlePrefixProject = 'p'
	handlePrefixSymbol  = 's'
	handlePrefixType    = 't'
	handlePrefixFile    = 'f'
	handlePrefixNode    = 'n'
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

func FileHandle(file *ast.SourceFile) Handle[ast.SourceFile] {
	return createHandle[ast.SourceFile](handlePrefixFile, ast.GetNodeId(file.AsNode()))
}

func NodeHandle(node *ast.Node) Handle[ast.Node] {
	fileHandle := FileHandle(ast.GetSourceFileOfNode(node))
	return Handle[ast.Node](fmt.Sprintf("%s.%d.%d", fileHandle, node.Pos(), node.Kind))
}

func parseNodeHandle(handle Handle[ast.Node]) (Handle[ast.SourceFile], int, ast.Kind, error) {
	parts := strings.SplitN(string(handle), ".", 3)
	if len(parts) != 3 {
		return "", 0, 0, fmt.Errorf("invalid node handle %q", handle)
	}

	fileHandle := Handle[ast.SourceFile](parts[0])
	pos, err := strconv.ParseInt(parts[1], 10, 32)
	if err != nil {
		return "", 0, 0, fmt.Errorf("invalid node handle %q: %w", handle, err)
	}
	kind, err := strconv.ParseInt(parts[2], 10, 16)
	if err != nil {
		return "", 0, 0, fmt.Errorf("invalid node handle %q: %w", handle, err)
	}
	return fileHandle, int(pos), ast.Kind(kind), nil
}

func parseProjectHandle(handle Handle[project.Project]) tspath.Path {
	return tspath.Path(handle[2:])
}

func createHandle[T any](prefix rune, id any) Handle[T] {
	return Handle[T](fmt.Sprintf("%c%016x", prefix, id))
}

const (
	MethodRelease Method = "release"

	MethodAdoptLSPState            Method = "adoptLSPState"
	MethodParseConfigFile          Method = "parseConfigFile"
	MethodLoadProject              Method = "loadProject"
	MethodGetDefaultProjectForFile Method = "getDefaultProjectForFile"
	MethodGetSymbolAtPosition      Method = "getSymbolAtPosition"
	MethodGetSymbolsAtPositions    Method = "getSymbolsAtPositions"
	MethodGetSymbolAtLocation      Method = "getSymbolAtLocation"
	MethodGetSymbolsAtLocations    Method = "getSymbolsAtLocations"
	MethodGetTypeOfSymbol          Method = "getTypeOfSymbol"
	MethodGetTypesOfSymbols        Method = "getTypesOfSymbols"
	MethodGetSourceFile            Method = "getSourceFile"
)

var unmarshalers = map[Method]func([]byte) (any, error){
	MethodRelease:                  unmarshallerFor[string],
	MethodAdoptLSPState:            noParams,
	MethodParseConfigFile:          unmarshallerFor[ParseConfigFileParams],
	MethodLoadProject:              unmarshallerFor[LoadProjectParams],
	MethodGetDefaultProjectForFile: unmarshallerFor[GetDefaultProjectForFileParams],
	MethodGetSourceFile:            unmarshallerFor[GetSourceFileParams],
	MethodGetSymbolAtPosition:      unmarshallerFor[GetSymbolAtPositionParams],
	MethodGetSymbolsAtPositions:    unmarshallerFor[GetSymbolsAtPositionsParams],
	MethodGetSymbolAtLocation:      unmarshallerFor[GetSymbolAtLocationParams],
	MethodGetSymbolsAtLocations:    unmarshallerFor[GetSymbolsAtLocationsParams],
	MethodGetTypeOfSymbol:          unmarshallerFor[GetTypeOfSymbolParams],
	MethodGetTypesOfSymbols:        unmarshallerFor[GetTypesOfSymbolsParams],
}

type ParseConfigFileParams struct {
	FileName string `json:"fileName"`
}

type ConfigFileResponse struct {
	FileNames []string              `json:"fileNames"`
	Options   *core.CompilerOptions `json:"options"`
}

type LoadProjectParams struct {
	ConfigFileName string `json:"configFileName"`
}

type GetDefaultProjectForFileParams struct {
	FileName string `json:"fileName"`
}

type ProjectResponse struct {
	Id              Handle[project.Project] `json:"id"`
	ConfigFileName  string                  `json:"configFileName"`
	RootFiles       []string                `json:"rootFiles"`
	CompilerOptions *core.CompilerOptions   `json:"compilerOptions"`
}

func NewProjectResponse(project *project.Project) *ProjectResponse {
	return &ProjectResponse{
		Id:              ProjectHandle(project),
		ConfigFileName:  project.Name(),
		RootFiles:       project.CommandLine.FileNames(),
		CompilerOptions: project.CommandLine.CompilerOptions(),
	}
}

type GetSymbolAtPositionParams struct {
	Project  Handle[project.Project] `json:"project"`
	FileName string                  `json:"fileName"`
	Position uint32                  `json:"position"`
}

type GetSymbolsAtPositionsParams struct {
	Project   Handle[project.Project] `json:"project"`
	FileName  string                  `json:"fileName"`
	Positions []uint32                `json:"positions"`
}

type GetSymbolAtLocationParams struct {
	Project  Handle[project.Project] `json:"project"`
	Location Handle[ast.Node]        `json:"location"`
}

type GetSymbolsAtLocationsParams struct {
	Project   Handle[project.Project] `json:"project"`
	Locations []Handle[ast.Node]      `json:"locations"`
}

type SymbolResponse struct {
	Id         Handle[ast.Symbol] `json:"id"`
	Name       string             `json:"name"`
	Flags      uint32             `json:"flags"`
	CheckFlags uint32             `json:"checkFlags"`
}

func NewSymbolResponse(symbol *ast.Symbol) *SymbolResponse {
	return &SymbolResponse{
		Id:         SymbolHandle(symbol),
		Name:       symbol.Name,
		Flags:      uint32(symbol.Flags),
		CheckFlags: uint32(symbol.CheckFlags),
	}
}

type GetTypeOfSymbolParams struct {
	Project Handle[project.Project] `json:"project"`
	Symbol  Handle[ast.Symbol]      `json:"symbol"`
}

type GetTypesOfSymbolsParams struct {
	Project Handle[project.Project] `json:"project"`
	Symbols []Handle[ast.Symbol]    `json:"symbols"`
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
	Project  Handle[project.Project] `json:"project"`
	FileName string                  `json:"fileName"`
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
