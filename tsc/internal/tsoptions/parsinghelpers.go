package tsoptions

import (
	"reflect"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func parseTristate(value any) core.Tristate {
	if value == nil {
		return core.TSUnknown
	}
	if v, ok := value.(core.Tristate); ok {
		return v
	}
	if value == true {
		return core.TSTrue
	} else {
		return core.TSFalse
	}
}

func parseStringArray(value any) []string {
	if arr, ok := value.([]any); ok {
		if arr == nil {
			return nil
		}
		result := make([]string, 0, len(arr))
		for _, v := range arr {
			if str, ok := v.(string); ok {
				result = append(result, str)
			}
		}
		return result
	}
	return nil
}

func parseStringMap(value any) *collections.OrderedMap[string, []string] {
	if m, ok := value.(*collections.OrderedMap[string, any]); ok {
		result := collections.NewOrderedMapWithSizeHint[string, []string](m.Size())
		for k, v := range m.Entries() {
			result.Set(k, parseStringArray(v))
		}
		return result
	}
	return nil
}

func parseString(value any) string {
	if str, ok := value.(string); ok {
		return str
	}
	return ""
}

func parseNumber(value any) *int {
	if num, ok := value.(int); ok {
		return &num
	}
	return nil
}

func parseProjectReference(json any) []core.ProjectReference {
	var result []core.ProjectReference
	if v, ok := json.(*collections.OrderedMap[string, any]); ok {
		var reference core.ProjectReference
		if v, ok := v.Get("path"); ok {
			reference.Path = v.(string)
		}
		if v, ok := v.Get("originalPath"); ok {
			reference.OriginalPath = v.(string)
		}
		if v, ok := v.Get("circular"); ok {
			reference.Circular = v.(bool)
		}
		result = append(result, reference)
	}
	return result
}

func parseJsonToStringKey(json any) *collections.OrderedMap[string, any] {
	result := collections.NewOrderedMapWithSizeHint[string, any](6)
	if m, ok := json.(*collections.OrderedMap[string, any]); ok {
		if v, ok := m.Get("include"); ok {
			result.Set("include", v)
		}
		if v, ok := m.Get("exclude"); ok {
			result.Set("exclude", v)
		}
		if v, ok := m.Get("files"); ok {
			result.Set("files", v)
		}
		if v, ok := m.Get("references"); ok {
			result.Set("references", v)
		}
		if v, ok := m.Get("extends"); ok {
			if str, ok := v.(string); ok {
				result.Set("extends", []any{str})
			}
			result.Set("extends", v)
		}
		if v, ok := m.Get("compilerOptions"); ok {
			result.Set("compilerOptions", v)
		}
		if v, ok := m.Get("excludes"); ok {
			result.Set("excludes", v)
		}
	}
	return result
}

type optionParser interface {
	ParseOption(key string, value any) []*ast.Diagnostic
}

type compilerOptionsParser struct {
	*core.CompilerOptions
}

func (o *compilerOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseCompilerOptions(key, value, o.CompilerOptions)
}

type watchOptionsParser struct {
	*core.WatchOptions
}

func (o *watchOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseWatchOptions(key, value, o.WatchOptions)
}

func ParseCompilerOptions(key string, value any, allOptions *core.CompilerOptions) []*ast.Diagnostic {
	if value == nil {
		return nil
	}
	if allOptions == nil {
		return nil
	}
	switch key {
	case "allowJs":
		allOptions.AllowJs = parseTristate(value)
	case "allowSyntheticDefaultImports":
		allOptions.AllowSyntheticDefaultImports = parseTristate(value)
	case "allowNonTsExtensions":
		allOptions.AllowNonTsExtensions = parseTristate(value)
	case "allowUmdGlobalAccess":
		allOptions.AllowUmdGlobalAccess = parseTristate(value)
	case "allowUnreachableCode":
		allOptions.AllowUnreachableCode = parseTristate(value)
	case "allowUnusedLabels":
		allOptions.AllowUnusedLabels = parseTristate(value)
	case "allowArbitraryExtensions":
		allOptions.AllowArbitraryExtensions = parseTristate(value)
	case "alwaysStrict":
		allOptions.AlwaysStrict = parseTristate(value)
	case "assumeChangesOnlyAffectDirectDependencies":
		allOptions.AssumeChangesOnlyAffectDirectDependencies = parseTristate(value)
	case "baseUrl":
		allOptions.BaseUrl = parseString(value)
	case "build":
		allOptions.Build = parseTristate(value)
	case "checkJs":
		allOptions.CheckJs = parseTristate(value)
	case "customConditions":
		allOptions.CustomConditions = parseStringArray(value)
	case "composite":
		allOptions.Composite = parseTristate(value)
	case "declarationDir":
		allOptions.DeclarationDir = parseString(value)
	case "diagnostics":
		allOptions.Diagnostics = parseTristate(value)
	case "disableSizeLimit":
		allOptions.DisableSizeLimit = parseTristate(value)
	case "disableSourceOfProjectReferenceRedirect":
		allOptions.DisableSourceOfProjectReferenceRedirect = parseTristate(value)
	case "disableSolutionSearching":
		allOptions.DisableSolutionSearching = parseTristate(value)
	case "disableReferencedProjectLoad":
		allOptions.DisableReferencedProjectLoad = parseTristate(value)
	case "declarationMap":
		allOptions.DeclarationMap = parseTristate(value)
	case "declaration":
		allOptions.Declaration = parseTristate(value)
	case "extendedDiagnostics":
		allOptions.ExtendedDiagnostics = parseTristate(value)
	case "emitDecoratorMetadata":
		allOptions.EmitDecoratorMetadata = parseTristate(value)
	case "esModuleInterop":
		allOptions.ESModuleInterop = parseTristate(value)
	case "exactOptionalPropertyTypes":
		allOptions.ExactOptionalPropertyTypes = parseTristate(value)
	case "explainFiles":
		allOptions.ExplainFiles = parseTristate(value)
	case "experimentalDecorators":
		allOptions.ExperimentalDecorators = parseTristate(value)
	case "forceConsistentCasingInFileNames":
		allOptions.ForceConsistentCasingInFileNames = parseTristate(value)
	case "generateCpuProfile":
		allOptions.GenerateCpuProfile = parseString(value)
	case "generateTrace":
		allOptions.GenerateTrace = parseString(value)
	case "isolatedModules":
		allOptions.IsolatedModules = parseTristate(value)
	case "ignoreDeprecations":
		allOptions.IgnoreDeprecations = parseString(value)
	case "importHelpers":
		allOptions.ImportHelpers = parseTristate(value)
	case "incremental":
		allOptions.Incremental = parseTristate(value)
	case "init":
		allOptions.Init = parseTristate(value)
	case "inlineSourceMap":
		allOptions.InlineSourceMap = parseTristate(value)
	case "inlineSources":
		allOptions.InlineSources = parseTristate(value)
	case "isolatedDeclarations":
		allOptions.IsolatedDeclarations = parseTristate(value)
	case "jsx":
		allOptions.Jsx = value.(core.JsxEmit)
	case "jsxFactory":
		allOptions.JsxFactory = parseString(value)
	case "jsxFragmentFactory":
		allOptions.JsxFragmentFactory = parseString(value)
	case "jsxImportSource":
		allOptions.JsxImportSource = parseString(value)
	case "keyofStringsOnly":
		allOptions.KeyofStringsOnly = parseTristate(value)
	case "lib":
		if _, ok := value.([]string); ok {
			allOptions.Lib = value.([]string)
		} else {
			allOptions.Lib = parseStringArray(value)
		}
	case "listEmittedFiles":
		allOptions.ListEmittedFiles = parseTristate(value)
	case "listFiles":
		allOptions.ListFiles = parseTristate(value)
	case "listFilesOnly":
		allOptions.ListFilesOnly = parseTristate(value)
	case "locale":
		allOptions.Locale = parseString(value)
	case "mapRoot":
		allOptions.MapRoot = parseString(value)
	case "module":
		allOptions.ModuleKind = value.(core.ModuleKind)
	case "moduleResolution":
		allOptions.ModuleResolution = value.(core.ModuleResolutionKind)
	case "moduleSuffixes":
		allOptions.ModuleSuffixes = parseStringArray(value)
	case "moduleDetection":
		allOptions.ModuleDetection = value.(core.ModuleDetectionKind)
	case "noCheck":
		allOptions.NoCheck = parseTristate(value)
	case "noFallthroughCasesInSwitch":
		allOptions.NoFallthroughCasesInSwitch = parseTristate(value)
	case "noEmitForJsFiles":
		allOptions.NoEmitForJsFiles = parseTristate(value)
	case "noImplicitAny":
		allOptions.NoImplicitAny = parseTristate(value)
	case "noImplicitThis":
		allOptions.NoImplicitThis = parseTristate(value)
	case "noLib":
		allOptions.NoLib = parseTristate(value)
	case "noPropertyAccessFromIndexSignature":
		allOptions.NoPropertyAccessFromIndexSignature = parseTristate(value)
	case "noUncheckedIndexedAccess":
		allOptions.NoUncheckedIndexedAccess = parseTristate(value)
	case "noEmitHelpers":
		allOptions.NoEmitHelpers = parseTristate(value)
	case "noEmitOnError":
		allOptions.NoEmitOnError = parseTristate(value)
	case "noImplicitReturns":
		allOptions.NoImplicitReturns = parseTristate(value)
	case "noUnusedLocals":
		allOptions.NoUnusedLocals = parseTristate(value)
	case "noUnusedParameters":
		allOptions.NoUnusedParameters = parseTristate(value)
	case "noImplicitOverride":
		allOptions.NoImplicitOverride = parseTristate(value)
	case "noUncheckedSideEffectImports":
		allOptions.NoUncheckedSideEffectImports = parseTristate(value)
	case "out":
		allOptions.Out = parseString(value)
	case "outFile":
		allOptions.OutFile = parseString(value)
	case "noResolve":
		allOptions.NoResolve = parseTristate(value)
	case "paths":
		allOptions.Paths = parseStringMap(value)
	case "preserveWatchOutput":
		allOptions.PreserveWatchOutput = parseTristate(value)
	case "preserveConstEnums":
		allOptions.PreserveConstEnums = parseTristate(value)
	case "preserveSymlinks":
		allOptions.PreserveSymlinks = parseTristate(value)
	case "project":
		allOptions.Project = parseString(value)
	case "pretty":
		allOptions.Pretty = parseTristate(value)
	case "resolveJsonModule":
		allOptions.ResolveJsonModule = parseTristate(value)
	case "resolvePackageJsonExports":
		allOptions.ResolvePackageJsonExports = parseTristate(value)
	case "resolvePackageJsonImports":
		allOptions.ResolvePackageJsonImports = parseTristate(value)
	case "reactNamespace":
		allOptions.ReactNamespace = parseString(value)
	case "rootDir":
		allOptions.RootDir = parseString(value)
	case "rootDirs":
		allOptions.RootDirs = parseStringArray(value)
	case "removeComments":
		allOptions.RemoveComments = parseTristate(value)
	case "strict":
		allOptions.Strict = parseTristate(value)
	case "strictBindCallApply":
		allOptions.StrictBindCallApply = parseTristate(value)
	case "strictBuiltinIteratorReturn":
		allOptions.StrictBuiltinIteratorReturn = parseTristate(value)
	case "strictFunctionTypes":
		allOptions.StrictFunctionTypes = parseTristate(value)
	case "strictNullChecks":
		allOptions.StrictNullChecks = parseTristate(value)
	case "strictPropertyInitialization":
		allOptions.StrictPropertyInitialization = parseTristate(value)
	case "skipDefaultLibCheck":
		allOptions.SkipDefaultLibCheck = parseTristate(value)
	case "sourceMap":
		allOptions.SourceMap = parseTristate(value)
	case "sourceRoot":
		allOptions.SourceRoot = parseString(value)
	case "stripInternal":
		allOptions.StripInternal = parseTristate(value)
	case "suppressOutputPathCheck":
		allOptions.SuppressOutputPathCheck = parseTristate(value)
	case "target":
		allOptions.Target = value.(core.ScriptTarget)
	case "traceResolution":
		allOptions.TraceResolution = parseTristate(value)
	case "tsBuildInfoFile":
		allOptions.TsBuildInfoFile = parseString(value)
	case "typeRoots":
		allOptions.TypeRoots = parseStringArray(value)
	case "tscBuild":
		allOptions.TscBuild = parseTristate(value)
	case "types":
		allOptions.Types = parseStringArray(value)
	case "useDefineForClassFields":
		allOptions.UseDefineForClassFields = parseTristate(value)
	case "useUnknownInCatchVariables":
		allOptions.UseUnknownInCatchVariables = parseTristate(value)
	case "verbatimModuleSyntax":
		allOptions.VerbatimModuleSyntax = parseTristate(value)
	case "version":
		allOptions.Version = parseTristate(value)
	case "help":
		allOptions.Help = parseTristate(value)
	case "all":
		allOptions.All = parseTristate(value)
	case "maxNodeModuleJsDepth":
		allOptions.MaxNodeModuleJsDepth = parseNumber(value)
	case "skipLibCheck":
		allOptions.SkipLibCheck = parseTristate(value)
	case "noEmit":
		allOptions.NoEmit = parseTristate(value)
	case "showConfig":
		allOptions.ShowConfig = parseTristate(value)
	case "configFilePath":
		allOptions.ConfigFilePath = parseString(value)
	case "noDtsResolution":
		allOptions.NoDtsResolution = parseTristate(value)
	case "pathsBasePath":
		allOptions.PathsBasePath = parseString(value)
	case "outDir":
		allOptions.OutDir = parseString(value)
	case "newLine":
		allOptions.NewLine = value.(core.NewLineKind)
	case "watch":
		allOptions.Watch = parseTristate(value)
	}
	return nil
}

func ParseWatchOptions(key string, value any, allOptions *core.WatchOptions) []*ast.Diagnostic {
	if allOptions == nil {
		return nil
	}
	switch key {
	case "watchInterval":
		allOptions.Interval = parseNumber(value)
	case "watchFile":
		if value != nil {
			allOptions.FileKind = value.(core.WatchFileKind)
		}
	case "watchDirectory":
		if value != nil {
			allOptions.DirectoryKind = value.(core.WatchDirectoryKind)
		}
	case "fallbackPolling":
		if value != nil {
			allOptions.FallbackPolling = value.(core.PollingKind)
		}
	case "synchronousWatchDirectory":
		allOptions.SyncWatchDir = parseTristate(value)
	case "excludeDirectories":
		allOptions.ExcludeDir = parseStringArray(value)
	case "excludeFiles":
		allOptions.ExcludeFiles = parseStringArray(value)
	}
	return nil
}

// mergeCompilerOptions merges the source compiler options into the target compiler options.
// Fields in the source options will overwrite the corresponding fields in the target options.
func mergeCompilerOptions(targetOptions, sourceOptions *core.CompilerOptions) *core.CompilerOptions {
	if sourceOptions == nil {
		return targetOptions
	}

	targetValue := reflect.ValueOf(targetOptions).Elem()
	sourceValue := reflect.ValueOf(sourceOptions).Elem()

	for i := range targetValue.NumField() {
		targetField := targetValue.Field(i)
		sourceField := sourceValue.Field(i)
		if sourceField.IsZero() {
			continue
		} else {
			targetField.Set(sourceField)
		}
	}
	return targetOptions
}

func convertToOptionsWithAbsolutePaths(optionsBase *collections.OrderedMap[string, any], optionMap map[string]*CommandLineOption, cwd string) *collections.OrderedMap[string, any] {
	// !!! convert to options with absolute paths was previously done with `CompilerOptions` object, but for ease of implementation, we do it pre-conversion.
	// !!! Revisit this choice if/when refactoring when conversion is done in tsconfig parsing
	if optionsBase == nil {
		return nil
	}
	for o, v := range optionsBase.Entries() {
		option := optionMap[o]
		if option == nil || !option.isFilePath {
			continue
		}
		if option.Kind == "list" {
			if arr, ok := v.([]string); ok {
				optionsBase.Set(o, core.Map(arr, func(item string) string {
					return tspath.GetNormalizedAbsolutePath(item, cwd)
				}))
			}
		} else {
			optionsBase.Set(o, tspath.GetNormalizedAbsolutePath(v.(string), cwd))
		}
	}
	return optionsBase
}
