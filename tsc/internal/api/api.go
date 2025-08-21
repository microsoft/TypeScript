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
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type handleMap[T any] map[Handle[T]]*T

type APIInit struct {
	Logger         logging.Logger
	FS             vfs.FS
	SessionOptions *project.SessionOptions
}

type API struct {
	logger  logging.Logger
	session *project.Session

	projects  map[Handle[project.Project]]tspath.Path
	filesMu   sync.Mutex
	files     handleMap[ast.SourceFile]
	symbolsMu sync.Mutex
	symbols   handleMap[ast.Symbol]
	typesMu   sync.Mutex
	types     handleMap[checker.Type]
}

func NewAPI(init *APIInit) *API {
	api := &API{
		session: project.NewSession(&project.SessionInit{
			Logger:  init.Logger,
			FS:      init.FS,
			Options: init.SessionOptions,
		}),
		projects: make(map[Handle[project.Project]]tspath.Path),
		files:    make(handleMap[ast.SourceFile]),
		symbols:  make(handleMap[ast.Symbol]),
		types:    make(handleMap[checker.Type]),
	}

	return api
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
		return encodeJSON(api.LoadProject(ctx, params.(*LoadProjectParams).ConfigFileName))
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
	api.session.Close()
}

func (api *API) ParseConfigFile(configFileName string) (*ConfigFileResponse, error) {
	configFileName = api.toAbsoluteFileName(configFileName)
	configFileContent, ok := api.session.FS().ReadFile(configFileName)
	if !ok {
		return nil, fmt.Errorf("could not read file %q", configFileName)
	}
	configDir := tspath.GetDirectoryPath(configFileName)
	tsConfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(configFileName, api.toPath(configFileName), configFileContent)
	parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
		tsConfigSourceFile,
		api.session,
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

func (api *API) LoadProject(ctx context.Context, configFileName string) (*ProjectResponse, error) {
	project, err := api.session.OpenProject(ctx, api.toAbsoluteFileName(configFileName))
	if err != nil {
		return nil, err
	}
	data := NewProjectResponse(project)
	api.projects[data.Id] = project.ConfigFilePath()
	return data, nil
}

func (api *API) GetSymbolAtPosition(ctx context.Context, projectId Handle[project.Project], fileName string, position int) (*SymbolResponse, error) {
	projectPath, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project ID not found")
	}
	snapshot, release := api.session.Snapshot()
	defer release()
	project := snapshot.ProjectCollection.GetProjectByPath(projectPath)
	if project == nil {
		return nil, errors.New("project not found")
	}

	languageService := ls.NewLanguageService(project, snapshot.Converters())
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
	projectPath, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project ID not found")
	}
	snapshot, release := api.session.Snapshot()
	defer release()
	project := snapshot.ProjectCollection.GetProjectByPath(projectPath)
	if project == nil {
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
	languageService := ls.NewLanguageService(project, snapshot.Converters())
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
	projectPath, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project ID not found")
	}
	snapshot, release := api.session.Snapshot()
	defer release()
	project := snapshot.ProjectCollection.GetProjectByPath(projectPath)
	if project == nil {
		return nil, errors.New("project not found")
	}

	api.symbolsMu.Lock()
	defer api.symbolsMu.Unlock()
	symbol, ok := api.symbols[symbolHandle]
	if !ok {
		return nil, fmt.Errorf("symbol %q not found", symbolHandle)
	}
	languageService := ls.NewLanguageService(project, snapshot.Converters())
	t := languageService.GetTypeOfSymbol(ctx, symbol)
	if t == nil {
		return nil, nil
	}
	return NewTypeData(t), nil
}

func (api *API) GetSourceFile(projectId Handle[project.Project], fileName string) (*ast.SourceFile, error) {
	projectPath, ok := api.projects[projectId]
	if !ok {
		return nil, errors.New("project ID not found")
	}
	snapshot, release := api.session.Snapshot()
	defer release()
	project := snapshot.ProjectCollection.GetProjectByPath(projectPath)
	if project == nil {
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
		_, ok := api.projects[projectId]
		if !ok {
			return fmt.Errorf("project %q not found", handle)
		}
		delete(api.projects, projectId)
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
	return tspath.GetNormalizedAbsolutePath(fileName, api.session.GetCurrentDirectory())
}

func (api *API) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, api.session.GetCurrentDirectory(), api.session.FS().UseCaseSensitiveFileNames())
}

func encodeJSON(v any, err error) ([]byte, error) {
	if err != nil {
		return nil, err
	}
	return json.Marshal(v)
}
