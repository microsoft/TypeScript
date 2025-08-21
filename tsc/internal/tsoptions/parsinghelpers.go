package tsoptions

import (
	"reflect"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
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

func parseProjectReference(json any) []*core.ProjectReference {
	var result []*core.ProjectReference
	if v, ok := json.(*collections.OrderedMap[string, any]); ok {
		var reference core.ProjectReference
		if v, ok := v.Get("path"); ok {
			reference.Path = v.(string)
		}
		if v, ok := v.Get("circular"); ok {
			reference.Circular = v.(bool)
		}
		result = append(result, &reference)
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
		if v, ok := m.Get("typeAcquisition"); ok {
			result.Set("typeAcquisition", v)
		}
	}
	return result
}

type optionParser interface {
	ParseOption(key string, value any) []*ast.Diagnostic
	UnknownOptionDiagnostic() *diagnostics.Message
}

type compilerOptionsParser struct {
	*core.CompilerOptions
}

func (o *compilerOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseCompilerOptions(key, value, o.CompilerOptions)
}

func (o *compilerOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("compilerOptions")
}

type watchOptionsParser struct {
	*core.WatchOptions
}

func (o *watchOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseWatchOptions(key, value, o.WatchOptions)
}

func (o *watchOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("watchOptions")
}

type typeAcquisitionParser struct {
	*core.TypeAcquisition
}

func (o *typeAcquisitionParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseTypeAcquisition(key, value, o.TypeAcquisition)
}

func (o *typeAcquisitionParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("typeAcquisition")
}

type buildOptionsParser struct {
	*core.BuildOptions
}

func (o *buildOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
	return ParseBuildOptions(key, value, o.BuildOptions)
}

func (o *buildOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return extraKeyDiagnostics("buildOptions")
}

func ParseCompilerOptions(key string, value any, allOptions *core.CompilerOptions) []*ast.Diagnostic {
	if value == nil {
		return nil
	}
	if allOptions == nil {
		return nil
	}
	parseCompilerOptions(key, value, allOptions)
	return nil
}

func parseCompilerOptions(key string, value any, allOptions *core.CompilerOptions) (foundKey bool) {
	option := CommandLineCompilerOptionsMap.Get(key)
	if option != nil {
		key = option.Name
	}
	switch key {
	case "allowJs":
		allOptions.AllowJs = parseTristate(value)
	case "allowImportingTsExtensions":
		allOptions.AllowImportingTsExtensions = parseTristate(value)
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
	case "downlevelIteration":
		allOptions.DownlevelIteration = parseTristate(value)
	case "erasableSyntaxOnly":
		allOptions.ErasableSyntaxOnly = parseTristate(value)
	case "emitDeclarationOnly":
		allOptions.EmitDeclarationOnly = parseTristate(value)
	case "extendedDiagnostics":
		allOptions.ExtendedDiagnostics = parseTristate(value)
	case "emitDecoratorMetadata":
		allOptions.EmitDecoratorMetadata = parseTristate(value)
	case "emitBOM":
		allOptions.EmitBOM = parseTristate(value)
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
		allOptions.Jsx = floatOrInt32ToFlag[core.JsxEmit](value)
	case "jsxFactory":
		allOptions.JsxFactory = parseString(value)
	case "jsxFragmentFactory":
		allOptions.JsxFragmentFactory = parseString(value)
	case "jsxImportSource":
		allOptions.JsxImportSource = parseString(value)
	case "lib":
		if _, ok := value.([]string); ok {
			allOptions.Lib = value.([]string)
		} else {
			allOptions.Lib = parseStringArray(value)
		}
	case "libReplacement":
		allOptions.LibReplacement = parseTristate(value)
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
		allOptions.Module = floatOrInt32ToFlag[core.ModuleKind](value)
	case "moduleDetectionKind":
		allOptions.ModuleDetection = floatOrInt32ToFlag[core.ModuleDetectionKind](value)
	case "moduleResolution":
		allOptions.ModuleResolution = floatOrInt32ToFlag[core.ModuleResolutionKind](value)
	case "moduleSuffixes":
		allOptions.ModuleSuffixes = parseStringArray(value)
	case "moduleDetection":
		allOptions.ModuleDetection = floatOrInt32ToFlag[core.ModuleDetectionKind](value)
	case "noCheck":
		allOptions.NoCheck = parseTristate(value)
	case "noFallthroughCasesInSwitch":
		allOptions.NoFallthroughCasesInSwitch = parseTristate(value)
	case "noEmitForJsFiles":
		allOptions.NoEmitForJsFiles = parseTristate(value)
	case "noErrorTruncation":
		allOptions.NoErrorTruncation = parseTristate(value)
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
	case "rewriteRelativeImportExtensions":
		allOptions.RewriteRelativeImportExtensions = parseTristate(value)
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
		allOptions.Target = floatOrInt32ToFlag[core.ScriptTarget](value)
	case "traceResolution":
		allOptions.TraceResolution = parseTristate(value)
	case "tsBuildInfoFile":
		allOptions.TsBuildInfoFile = parseString(value)
	case "typeRoots":
		allOptions.TypeRoots = parseStringArray(value)
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
		allOptions.NewLine = floatOrInt32ToFlag[core.NewLineKind](value)
	case "watch":
		allOptions.Watch = parseTristate(value)
	case "pprofDir":
		allOptions.PprofDir = parseString(value)
	case "singleThreaded":
		allOptions.SingleThreaded = parseTristate(value)
	case "quiet":
		allOptions.Quiet = parseTristate(value)
	default:
		// different than any key above
		return false
	}
	return true
}

func floatOrInt32ToFlag[T ~int32](value any) T {
	if v, ok := value.(T); ok {
		return v
	}
	return T(value.(float64))
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

func ParseTypeAcquisition(key string, value any, allOptions *core.TypeAcquisition) []*ast.Diagnostic {
	if value == nil {
		return nil
	}
	if allOptions == nil {
		return nil
	}
	switch key {
	case "enable":
		allOptions.Enable = parseTristate(value)
	case "include":
		allOptions.Include = parseStringArray(value)
	case "exclude":
		allOptions.Exclude = parseStringArray(value)
	case "disableFilenameBasedTypeAcquisition":
		allOptions.DisableFilenameBasedTypeAcquisition = parseTristate(value)
	}
	return nil
}

func ParseBuildOptions(key string, value any, allOptions *core.BuildOptions) []*ast.Diagnostic {
	if value == nil {
		return nil
	}
	if allOptions == nil {
		return nil
	}
	option := BuildNameMap.Get(key)
	if option != nil {
		key = option.Name
	}
	switch key {
	case "clean":
		allOptions.Clean = parseTristate(value)
	case "dry":
		allOptions.Dry = parseTristate(value)
	case "force":
		allOptions.Force = parseTristate(value)
	case "stopBuildOnErrors":
		allOptions.StopBuildOnErrors = parseTristate(value)
	case "verbose":
		allOptions.Verbose = parseTristate(value)
	}
	return nil
}

// mergeCompilerOptions merges the source compiler options into the target compiler options
// with optional awareness of explicitly set null values in the raw JSON.
// Fields in the source options will overwrite the corresponding fields in the target options,
// including when they are explicitly set to null in the raw configuration (if rawSource is provided).
func mergeCompilerOptions(targetOptions, sourceOptions *core.CompilerOptions, rawSource any) *core.CompilerOptions {
	if sourceOptions == nil {
		return targetOptions
	}

	// Collect explicitly null field names from raw JSON
	var explicitNullFields collections.Set[string]
	if rawSource != nil {
		if rawMap, ok := rawSource.(*collections.OrderedMap[string, any]); ok {
			if compilerOptionsRaw, exists := rawMap.Get("compilerOptions"); exists {
				if compilerOptionsMap, ok := compilerOptionsRaw.(*collections.OrderedMap[string, any]); ok {
					for key, value := range compilerOptionsMap.Entries() {
						if value == nil {
							explicitNullFields.Add(key)
						}
					}
				}
			}
		}
	}

	// Do the merge, handling explicit nulls during the normal merge
	targetValue := reflect.ValueOf(targetOptions).Elem()
	sourceValue := reflect.ValueOf(sourceOptions).Elem()
	targetType := targetValue.Type()

	for i := range targetValue.NumField() {
		targetField := targetValue.Field(i)
		sourceField := sourceValue.Field(i)

		// Get the JSON field name for this struct field and check if it's explicitly null
		if jsonTag := targetType.Field(i).Tag.Get("json"); jsonTag != "" {
			if jsonFieldName, _, _ := strings.Cut(jsonTag, ","); jsonFieldName != "" && explicitNullFields.Has(jsonFieldName) {
				targetField.SetZero()
				continue
			}
		}

		// Normal merge behavior: copy non-zero fields
		if !sourceField.IsZero() {
			targetField.Set(sourceField)
		}
	}

	return targetOptions
}

func convertToOptionsWithAbsolutePaths(optionsBase *collections.OrderedMap[string, any], optionMap CommandLineOptionNameMap, cwd string) *collections.OrderedMap[string, any] {
	// !!! convert to options with absolute paths was previously done with `CompilerOptions` object, but for ease of implementation, we do it pre-conversion.
	// !!! Revisit this choice if/when refactoring when conversion is done in tsconfig parsing
	if optionsBase == nil {
		return nil
	}
	for o, v := range optionsBase.Entries() {
		result, ok := ConvertOptionToAbsolutePath(o, v, optionMap, cwd)
		if ok {
			optionsBase.Set(o, result)
		}
	}
	return optionsBase
}

func ConvertOptionToAbsolutePath(o string, v any, optionMap CommandLineOptionNameMap, cwd string) (any, bool) {
	option := optionMap.Get(o)
	if option == nil {
		return nil, false
	}
	if option.Kind == "list" {
		if option.Elements().IsFilePath {
			if arr, ok := v.([]string); ok {
				return core.Map(arr, func(item string) string {
					return tspath.GetNormalizedAbsolutePath(item, cwd)
				}), true
			}
		}
	} else if option.IsFilePath {
		if value, ok := v.(string); ok {
			return tspath.GetNormalizedAbsolutePath(value, cwd), true
		}
	}
	return nil, false
}
