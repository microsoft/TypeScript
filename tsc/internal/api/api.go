package api

import (
	"context"
	"errors"
	"fmt"
	"sync"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/api/encoder"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type handleMap[T any] map[Handle[T]]*T

type APIOptions struct {
	Logger *project.Logger
}

type API struct {
	host    APIHost
	options APIOptions

	documentStore      *project.DocumentStore
	configFileRegistry *project.ConfigFileRegistry

	projects  handleMap[project.Project]
	filesMu   sync.Mutex
	files     handleMap[ast.SourceFile]
	symbolsMu sync.Mutex
	symbols   handleMap[ast.Symbol]
	typesMu   sync.Mutex
	types     handleMap[checker.Type]
}

var _ project.ProjectHost = (*API)(nil)

func NewAPI(host APIHost, options APIOptions) *API {
	api := &API{
		host:     host,
		options:  options,
		projects: make(handleMap[project.Project]),
		files:    make(handleMap[ast.SourceFile]),
		symbols:  make(handleMap[ast.Symbol]),
		types:    make(handleMap[checker.Type]),
	}

	api.documentStore = project.NewDocumentStore(project.DocumentStoreOptions{
		ComparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		},
		Hooks: project.DocumentRegistryHooks{
			OnReleaseDocument: func(file *ast.SourceFile) {
				_ = api.releaseHandle(string(FileHandle(file)))
			},
		},
	})

	api.configFileRegistry = &project.ConfigFileRegistry{
		Host: api,
	}
	return api
}

// DefaultLibraryPath implements ProjectHost.
func (api *API) DefaultLibraryPath() string {
	return api.host.DefaultLibraryPath()
}

// TypingsInstaller implements ProjectHost
func (api *API) TypingsInstaller() *project.TypingsInstaller {
	return nil
}

// DocumentStore implements ProjectHost.
func (api *API) DocumentStore() *project.DocumentStore {
	return api.documentStore
}

// ConfigFileRegistry implements ProjectHost.
func (api *API) ConfigFileRegistry() *project.ConfigFileRegistry {
	return api.configFileRegistry
}

// FS implements ProjectHost.
func (api *API) FS() vfs.FS {
	return api.host.FS()
}

// GetCurrentDirectory implements ProjectHost.
func (api *API) GetCurrentDirectory() string {
	return api.host.GetCurrentDirectory()
}

// Log implements ProjectHost.
func (api *API) Log(s string) {
	api.options.Logger.Info(s)
}

// Log implements ProjectHost.
func (api *API) Trace(s string) {
	api.options.Logger.Info(s)
}

// PositionEncoding implements ProjectHost.
func (api *API) PositionEncoding() lsproto.PositionEncodingKind {
	return lsproto.PositionEncodingKindUTF8
}

// Client implements ProjectHost.
func (api *API) Client() project.Client {
	return nil
}

// IsWatchEnabled implements ProjectHost.
func (api *API) IsWatchEnabled() bool {
	return false
}

func (api *API) HandleRequest(ctx context.Context, method string, payload []byte) ([]byte, error) {
	params, err := unmarshalPayload(method, payload)
	if err != nil {
		return nil, err
	}

	switch Method(method) {
	case MethodRelease:
		if id, ok := params.(*string); ok {
			return nil, api.releaseHandle(*id)
		} else {
			return nil, fmt.Errorf("expected string for release handle, got %T", params)
		}
	case MethodGetSourceFile:
		params := params.(*GetSourceFileParams)
		sourceFile, err := api.GetSourceFile(params.Project, params.FileName)
		if err != nil {
			return nil, err
		}
		return encoder.EncodeSourceFile(sourceFile, string(FileHandle(sourceFile)))
	case MethodParseConfigFile:
		return encodeJSON(api.ParseConfigFile(params.(*ParseConfigFileParams).FileName))
	case MethodLoadProject:
		return encodeJSON(api.LoadProject(params.(*LoadProjectParams).ConfigFileName))
	case MethodGetSymbolAtPosition:
		params := params.(*GetSymbolAtPositionParams)
		return encodeJSON(api.GetSymbolAtPosition(ctx, params.Project, params.FileName, int(params.Position)))
	case MethodGetSymbolsAtPositions:
		params := params.(*GetSymbolsAtPositionsParams)
		return encodeJSON(core.TryMap(params.Positions, func(position uint32) (any, error) {
			return api.GetSymbolAtPosition(ctx, params.Project, params.FileName, int(position))
		}))
	case MethodGetSymbolAtLocation:
		params := params.(*GetSymbolAtLocationParams)
		return encodeJSON(api.GetSymbolAtLocation(ctx, params.Project, params.Location))
	case MethodGetSymbolsAtLocations:
		params := params.(*GetSymbolsAtLocationsParams)
		return encodeJSON(core.TryMap(params.Locations, func(location Handle[ast.Node]) (any, error) {
			return api.GetSymbolAtLocation(ctx, params.Project, location)
		}))
	case MethodGetTypeOfSymbol:
		params := params.(*GetTypeOfSymbolParams)
		return encodeJSON(api.GetTypeOfSymbol(ctx, params.Project, params.Symbol))
	case MethodGetTypesOfSymbols:
		params := params.(*GetTypesOfSymbolsParams)
		return encodeJSON(core.TryMap(params.Symbols, func(symbol Handle[ast.Symbol]) (any, error) {
			return api.GetTypeOfSymbol(ctx, params.Project, symbol)
		}))
	default:
		return nil, fmt.Errorf("unhandled API method %q", method)
	}
}

func (api *API) Close() {
	api.options.Logger.Close()
}

func (api *API) ParseConfigFile(configFileName string) (*ConfigFileResponse, error) {
	configFileName = api.toAbsoluteFileName(configFileName)
	configFileContent, ok := api.host.FS().ReadFile(configFileName)
	if !ok {
		return nil, fmt.Errorf("could not read file %q", configFileName)
	}
	configDir := tspath.GetDirectoryPath(configFileName)
	tsConfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(configFileName, api.toPath(configFileName), configFileContent)
	parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
		tsConfigSourceFile,
		api.host,
		configDir,
		nil, /*existingOptions*/
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

func (api *API) LoadProject(configFileName string) (*ProjectResponse, error) {
	configFileName = api.toAbsoluteFileName(configFileName)
	configFilePath := api.toPath(configFileName)
	p := project.NewConfiguredProject(configFileName, configFilePath, api)
	if err := p.LoadConfig(); err != nil {
		return nil, err
	}
	p.GetProgram()
	data := NewProjectResponse(p)
	api.projects[data.Id] = p
	return data, nil
}

func (api *API) GetSymbolAtPosition(ctx context.Context, projectId Handle[project.Project], fileName string, position int) (*SymbolResponse, error) {
	project, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project not found")
	}
	languageService, done := project.GetLanguageServiceForRequest(ctx)
	defer done()
	symbol, err := languageService.GetSymbolAtPosition(ctx, fileName, position)
	if err != nil || symbol == nil {
		return nil, err
	}
	data := NewSymbolResponse(symbol)
	api.symbolsMu.Lock()
	defer api.symbolsMu.Unlock()
	api.symbols[data.Id] = symbol
	return data, nil
}

func (api *API) GetSymbolAtLocation(ctx context.Context, projectId Handle[project.Project], location Handle[ast.Node]) (*SymbolResponse, error) {
	project, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project not found")
	}
	fileHandle, pos, kind, err := parseNodeHandle(location)
	if err != nil {
		return nil, err
	}
	api.filesMu.Lock()
	defer api.filesMu.Unlock()
	sourceFile, ok := api.files[fileHandle]
	if !ok {
		return nil, fmt.Errorf("file %q not found", fileHandle)
	}
	token := astnav.GetTokenAtPosition(sourceFile, pos)
	if token == nil {
		return nil, fmt.Errorf("token not found at position %d in file %q", pos, sourceFile.FileName())
	}
	node := ast.FindAncestorKind(token, kind)
	if node == nil {
		return nil, fmt.Errorf("node of kind %s not found at position %d in file %q", kind.String(), pos, sourceFile.FileName())
	}
	languageService, done := project.GetLanguageServiceForRequest(ctx)
	defer done()
	symbol := languageService.GetSymbolAtLocation(ctx, node)
	if symbol == nil {
		return nil, nil
	}
	data := NewSymbolResponse(symbol)
	api.symbolsMu.Lock()
	defer api.symbolsMu.Unlock()
	api.symbols[data.Id] = symbol
	return data, nil
}

func (api *API) GetTypeOfSymbol(ctx context.Context, projectId Handle[project.Project], symbolHandle Handle[ast.Symbol]) (*TypeResponse, error) {
	project, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project not found")
	}
	api.symbolsMu.Lock()
	defer api.symbolsMu.Unlock()
	symbol, ok := api.symbols[symbolHandle]
	if !ok {
		return nil, fmt.Errorf("symbol %q not found", symbolHandle)
	}
	languageService, done := project.GetLanguageServiceForRequest(ctx)
	defer done()
	t := languageService.GetTypeOfSymbol(ctx, symbol)
	if t == nil {
		return nil, nil
	}
	return NewTypeData(t), nil
}

func (api *API) GetSourceFile(projectId Handle[project.Project], fileName string) (*ast.SourceFile, error) {
	project, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project not found")
	}
	sourceFile := project.GetProgram().GetSourceFile(fileName)
	if sourceFile == nil {
		return nil, fmt.Errorf("source file %q not found", fileName)
	}
	api.filesMu.Lock()
	defer api.filesMu.Unlock()
	api.files[FileHandle(sourceFile)] = sourceFile
	return sourceFile, nil
}

func (api *API) releaseHandle(handle string) error {
	switch handle[0] {
	case handlePrefixProject:
		projectId := Handle[project.Project](handle)
		project, ok := api.projects[projectId]
		if !ok {
			return fmt.Errorf("project %q not found", handle)
		}
		delete(api.projects, projectId)
		project.Close()
	case handlePrefixFile:
		fileId := Handle[ast.SourceFile](handle)
		api.filesMu.Lock()
		defer api.filesMu.Unlock()
		_, ok := api.files[fileId]
		if !ok {
			return fmt.Errorf("file %q not found", handle)
		}
		delete(api.files, fileId)
	case handlePrefixSymbol:
		symbolId := Handle[ast.Symbol](handle)
		api.symbolsMu.Lock()
		defer api.symbolsMu.Unlock()
		_, ok := api.symbols[symbolId]
		if !ok {
			return fmt.Errorf("symbol %q not found", handle)
		}
		delete(api.symbols, symbolId)
	case handlePrefixType:
		typeId := Handle[checker.Type](handle)
		api.typesMu.Lock()
		defer api.typesMu.Unlock()
		_, ok := api.types[typeId]
		if !ok {
			return fmt.Errorf("type %q not found", handle)
		}
		delete(api.types, typeId)
	default:
		return fmt.Errorf("unhandled handle type %q", handle[0])
	}
	return nil
}

func (api *API) toAbsoluteFileName(fileName string) string {
	return tspath.GetNormalizedAbsolutePath(fileName, api.host.GetCurrentDirectory())
}

func (api *API) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, api.host.GetCurrentDirectory(), api.host.FS().UseCaseSensitiveFileNames())
}

func encodeJSON(v any, err error) ([]byte, error) {
	if err != nil {
		return nil, err
	}
	return json.Marshal(v)
}
