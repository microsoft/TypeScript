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

func ParseTristate(value any) core.Tristate {
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

func ParseStringArray(value any) []string {
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
			result.Set(k, ParseStringArray(v))
		}
		return result
	}
	return nil
}

func ParseString(value any) string {
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
		allOptions.AllowJs = ParseTristate(value)
	case "allowImportingTsExtensions":
		allOptions.AllowImportingTsExtensions = ParseTristate(value)
	case "allowSyntheticDefaultImports":
		allOptions.AllowSyntheticDefaultImports = ParseTristate(value)
	case "allowNonTsExtensions":
		allOptions.AllowNonTsExtensions = ParseTristate(value)
	case "allowUmdGlobalAccess":
		allOptions.AllowUmdGlobalAccess = ParseTristate(value)
	case "allowUnreachableCode":
		allOptions.AllowUnreachableCode = ParseTristate(value)
	case "allowUnusedLabels":
		allOptions.AllowUnusedLabels = ParseTristate(value)
	case "allowArbitraryExtensions":
		allOptions.AllowArbitraryExtensions = ParseTristate(value)
	case "alwaysStrict":
		allOptions.AlwaysStrict = ParseTristate(value)
	case "assumeChangesOnlyAffectDirectDependencies":
		allOptions.AssumeChangesOnlyAffectDirectDependencies = ParseTristate(value)
	case "baseUrl":
		allOptions.BaseUrl = ParseString(value)
	case "build":
		allOptions.Build = ParseTristate(value)
	case "checkJs":
		allOptions.CheckJs = ParseTristate(value)
	case "customConditions":
		allOptions.CustomConditions = ParseStringArray(value)
	case "composite":
		allOptions.Composite = ParseTristate(value)
	case "declarationDir":
		allOptions.DeclarationDir = ParseString(value)
	case "diagnostics":
		allOptions.Diagnostics = ParseTristate(value)
	case "disableSizeLimit":
		allOptions.DisableSizeLimit = ParseTristate(value)
	case "disableSourceOfProjectReferenceRedirect":
		allOptions.DisableSourceOfProjectReferenceRedirect = ParseTristate(value)
	case "disableSolutionSearching":
		allOptions.DisableSolutionSearching = ParseTristate(value)
	case "disableReferencedProjectLoad":
		allOptions.DisableReferencedProjectLoad = ParseTristate(value)
	case "declarationMap":
		allOptions.DeclarationMap = ParseTristate(value)
	case "declaration":
		allOptions.Declaration = ParseTristate(value)
	case "downlevelIteration":
		allOptions.DownlevelIteration = ParseTristate(value)
	case "erasableSyntaxOnly":
		allOptions.ErasableSyntaxOnly = ParseTristate(value)
	case "emitDeclarationOnly":
		allOptions.EmitDeclarationOnly = ParseTristate(value)
	case "extendedDiagnostics":
		allOptions.ExtendedDiagnostics = ParseTristate(value)
	case "emitDecoratorMetadata":
		allOptions.EmitDecoratorMetadata = ParseTristate(value)
	case "emitBOM":
		allOptions.EmitBOM = ParseTristate(value)
	case "esModuleInterop":
		allOptions.ESModuleInterop = ParseTristate(value)
	case "exactOptionalPropertyTypes":
		allOptions.ExactOptionalPropertyTypes = ParseTristate(value)
	case "explainFiles":
		allOptions.ExplainFiles = ParseTristate(value)
	case "experimentalDecorators":
		allOptions.ExperimentalDecorators = ParseTristate(value)
	case "forceConsistentCasingInFileNames":
		allOptions.ForceConsistentCasingInFileNames = ParseTristate(value)
	case "generateCpuProfile":
		allOptions.GenerateCpuProfile = ParseString(value)
	case "generateTrace":
		allOptions.GenerateTrace = ParseString(value)
	case "isolatedModules":
		allOptions.IsolatedModules = ParseTristate(value)
	case "ignoreDeprecations":
		allOptions.IgnoreDeprecations = ParseString(value)
	case "importHelpers":
		allOptions.ImportHelpers = ParseTristate(value)
	case "incremental":
		allOptions.Incremental = ParseTristate(value)
	case "init":
		allOptions.Init = ParseTristate(value)
	case "inlineSourceMap":
		allOptions.InlineSourceMap = ParseTristate(value)
	case "inlineSources":
		allOptions.InlineSources = ParseTristate(value)
	case "isolatedDeclarations":
		allOptions.IsolatedDeclarations = ParseTristate(value)
	case "jsx":
		allOptions.Jsx = floatOrInt32ToFlag[core.JsxEmit](value)
	case "jsxFactory":
		allOptions.JsxFactory = ParseString(value)
	case "jsxFragmentFactory":
		allOptions.JsxFragmentFactory = ParseString(value)
	case "jsxImportSource":
		allOptions.JsxImportSource = ParseString(value)
	case "lib":
		if _, ok := value.([]string); ok {
			allOptions.Lib = value.([]string)
		} else {
			allOptions.Lib = ParseStringArray(value)
		}
	case "libReplacement":
		allOptions.LibReplacement = ParseTristate(value)
	case "listEmittedFiles":
		allOptions.ListEmittedFiles = ParseTristate(value)
	case "listFiles":
		allOptions.ListFiles = ParseTristate(value)
	case "listFilesOnly":
		allOptions.ListFilesOnly = ParseTristate(value)
	case "locale":
		allOptions.Locale = ParseString(value)
	case "mapRoot":
		allOptions.MapRoot = ParseString(value)
	case "module":
		allOptions.Module = floatOrInt32ToFlag[core.ModuleKind](value)
	case "moduleDetectionKind":
		allOptions.ModuleDetection = floatOrInt32ToFlag[core.ModuleDetectionKind](value)
	case "moduleResolution":
		allOptions.ModuleResolution = floatOrInt32ToFlag[core.ModuleResolutionKind](value)
	case "moduleSuffixes":
		allOptions.ModuleSuffixes = ParseStringArray(value)
	case "moduleDetection":
		allOptions.ModuleDetection = floatOrInt32ToFlag[core.ModuleDetectionKind](value)
	case "noCheck":
		allOptions.NoCheck = ParseTristate(value)
	case "noFallthroughCasesInSwitch":
		allOptions.NoFallthroughCasesInSwitch = ParseTristate(value)
	case "noEmitForJsFiles":
		allOptions.NoEmitForJsFiles = ParseTristate(value)
	case "noErrorTruncation":
		allOptions.NoErrorTruncation = ParseTristate(value)
	case "noImplicitAny":
		allOptions.NoImplicitAny = ParseTristate(value)
	case "noImplicitThis":
		allOptions.NoImplicitThis = ParseTristate(value)
	case "noLib":
		allOptions.NoLib = ParseTristate(value)
	case "noPropertyAccessFromIndexSignature":
		allOptions.NoPropertyAccessFromIndexSignature = ParseTristate(value)
	case "noUncheckedIndexedAccess":
		allOptions.NoUncheckedIndexedAccess = ParseTristate(value)
	case "noEmitHelpers":
		allOptions.NoEmitHelpers = ParseTristate(value)
	case "noEmitOnError":
		allOptions.NoEmitOnError = ParseTristate(value)
	case "noImplicitReturns":
		allOptions.NoImplicitReturns = ParseTristate(value)
	case "noUnusedLocals":
		allOptions.NoUnusedLocals = ParseTristate(value)
	case "noUnusedParameters":
		allOptions.NoUnusedParameters = ParseTristate(value)
	case "noImplicitOverride":
		allOptions.NoImplicitOverride = ParseTristate(value)
	case "noUncheckedSideEffectImports":
		allOptions.NoUncheckedSideEffectImports = ParseTristate(value)
	case "outFile":
		allOptions.OutFile = ParseString(value)
	case "noResolve":
		allOptions.NoResolve = ParseTristate(value)
	case "paths":
		allOptions.Paths = parseStringMap(value)
	case "preserveWatchOutput":
		allOptions.PreserveWatchOutput = ParseTristate(value)
	case "preserveConstEnums":
		allOptions.PreserveConstEnums = ParseTristate(value)
	case "preserveSymlinks":
		allOptions.PreserveSymlinks = ParseTristate(value)
	case "project":
		allOptions.Project = ParseString(value)
	case "pretty":
		allOptions.Pretty = ParseTristate(value)
	case "resolveJsonModule":
		allOptions.ResolveJsonModule = ParseTristate(value)
	case "resolvePackageJsonExports":
		allOptions.ResolvePackageJsonExports = ParseTristate(value)
	case "resolvePackageJsonImports":
		allOptions.ResolvePackageJsonImports = ParseTristate(value)
	case "reactNamespace":
		allOptions.ReactNamespace = ParseString(value)
	case "rewriteRelativeImportExtensions":
		allOptions.RewriteRelativeImportExtensions = ParseTristate(value)
	case "rootDir":
		allOptions.RootDir = ParseString(value)
	case "rootDirs":
		allOptions.RootDirs = ParseStringArray(value)
	case "removeComments":
		allOptions.RemoveComments = ParseTristate(value)
	case "strict":
		allOptions.Strict = ParseTristate(value)
	case "strictBindCallApply":
		allOptions.StrictBindCallApply = ParseTristate(value)
	case "strictBuiltinIteratorReturn":
		allOptions.StrictBuiltinIteratorReturn = ParseTristate(value)
	case "strictFunctionTypes":
		allOptions.StrictFunctionTypes = ParseTristate(value)
	case "strictNullChecks":
		allOptions.StrictNullChecks = ParseTristate(value)
	case "strictPropertyInitialization":
		allOptions.StrictPropertyInitialization = ParseTristate(value)
	case "skipDefaultLibCheck":
		allOptions.SkipDefaultLibCheck = ParseTristate(value)
	case "sourceMap":
		allOptions.SourceMap = ParseTristate(value)
	case "sourceRoot":
		allOptions.SourceRoot = ParseString(value)
	case "stripInternal":
		allOptions.StripInternal = ParseTristate(value)
	case "suppressOutputPathCheck":
		allOptions.SuppressOutputPathCheck = ParseTristate(value)
	case "target":
		allOptions.Target = floatOrInt32ToFlag[core.ScriptTarget](value)
	case "traceResolution":
		allOptions.TraceResolution = ParseTristate(value)
	case "tsBuildInfoFile":
		allOptions.TsBuildInfoFile = ParseString(value)
	case "typeRoots":
		allOptions.TypeRoots = ParseStringArray(value)
	case "types":
		allOptions.Types = ParseStringArray(value)
	case "useDefineForClassFields":
		allOptions.UseDefineForClassFields = ParseTristate(value)
	case "useUnknownInCatchVariables":
		allOptions.UseUnknownInCatchVariables = ParseTristate(value)
	case "verbatimModuleSyntax":
		allOptions.VerbatimModuleSyntax = ParseTristate(value)
	case "version":
		allOptions.Version = ParseTristate(value)
	case "help":
		allOptions.Help = ParseTristate(value)
	case "all":
		allOptions.All = ParseTristate(value)
	case "maxNodeModuleJsDepth":
		allOptions.MaxNodeModuleJsDepth = parseNumber(value)
	case "skipLibCheck":
		allOptions.SkipLibCheck = ParseTristate(value)
	case "noEmit":
		allOptions.NoEmit = ParseTristate(value)
	case "showConfig":
		allOptions.ShowConfig = ParseTristate(value)
	case "configFilePath":
		allOptions.ConfigFilePath = ParseString(value)
	case "noDtsResolution":
		allOptions.NoDtsResolution = ParseTristate(value)
	case "pathsBasePath":
		allOptions.PathsBasePath = ParseString(value)
	case "outDir":
		allOptions.OutDir = ParseString(value)
	case "newLine":
		allOptions.NewLine = floatOrInt32ToFlag[core.NewLineKind](value)
	case "watch":
		allOptions.Watch = ParseTristate(value)
	case "pprofDir":
		allOptions.PprofDir = ParseString(value)
	case "singleThreaded":
		allOptions.SingleThreaded = ParseTristate(value)
	case "quiet":
		allOptions.Quiet = ParseTristate(value)
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
		allOptions.SyncWatchDir = ParseTristate(value)
	case "excludeDirectories":
		allOptions.ExcludeDir = ParseStringArray(value)
	case "excludeFiles":
		allOptions.ExcludeFiles = ParseStringArray(value)
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
		allOptions.Enable = ParseTristate(value)
	case "include":
		allOptions.Include = ParseStringArray(value)
	case "exclude":
		allOptions.Exclude = ParseStringArray(value)
	case "disableFilenameBasedTypeAcquisition":
		allOptions.DisableFilenameBasedTypeAcquisition = ParseTristate(value)
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
		allOptions.Clean = ParseTristate(value)
	case "dry":
		allOptions.Dry = ParseTristate(value)
	case "force":
		allOptions.Force = ParseTristate(value)
	case "stopBuildOnErrors":
		allOptions.StopBuildOnErrors = ParseTristate(value)
	case "verbose":
		allOptions.Verbose = ParseTristate(value)
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
