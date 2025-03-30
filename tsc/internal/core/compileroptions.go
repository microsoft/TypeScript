package core

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/tspath"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=ModuleKind,ScriptTarget -output=compileroptions_stringer_generated.go

type CompilerOptions struct {
	AllowJs                                   Tristate                                  `json:"allowJs,omitzero"`
	AllowArbitraryExtensions                  Tristate                                  `json:"allowArbitraryExtensions,omitzero"`
	AllowSyntheticDefaultImports              Tristate                                  `json:"allowSyntheticDefaultImports,omitzero"`
	AllowImportingTsExtensions                Tristate                                  `json:"allowImportingTsExtensions,omitzero"`
	AllowNonTsExtensions                      Tristate                                  `json:"allowNonTsExtensions,omitzero"`
	AllowUmdGlobalAccess                      Tristate                                  `json:"allowUmdGlobalAccess,omitzero"`
	AllowUnreachableCode                      Tristate                                  `json:"allowUnreachableCode,omitzero"`
	AllowUnusedLabels                         Tristate                                  `json:"allowUnusedLabels,omitzero"`
	AssumeChangesOnlyAffectDirectDependencies Tristate                                  `json:"assumeChangesOnlyAffectDirectDependencies,omitzero"`
	AlwaysStrict                              Tristate                                  `json:"alwaysStrict,omitzero"`
	BaseUrl                                   string                                    `json:"baseUrl,omitzero"`
	Build                                     Tristate                                  `json:"build,omitzero"`
	CheckJs                                   Tristate                                  `json:"checkJs,omitzero"`
	CustomConditions                          []string                                  `json:"customConditions,omitzero"`
	Composite                                 Tristate                                  `json:"composite,omitzero"`
	EmitDeclarationOnly                       Tristate                                  `json:"emitDeclarationOnly,omitzero"`
	EmitBOM                                   Tristate                                  `json:"emitBOM,omitzero"`
	EmitDecoratorMetadata                     Tristate                                  `json:"emitDecoratorMetadata,omitzero"`
	DownlevelIteration                        Tristate                                  `json:"downlevelIteration,omitzero"`
	Declaration                               Tristate                                  `json:"declaration,omitzero"`
	DeclarationDir                            string                                    `json:"declarationDir,omitzero"`
	DeclarationMap                            Tristate                                  `json:"declarationMap,omitzero"`
	DisableSizeLimit                          Tristate                                  `json:"disableSizeLimit,omitzero"`
	DisableSourceOfProjectReferenceRedirect   Tristate                                  `json:"disableSourceOfProjectReferenceRedirect,omitzero"`
	DisableSolutionSearching                  Tristate                                  `json:"disableSolutionSearching,omitzero"`
	DisableReferencedProjectLoad              Tristate                                  `json:"disableReferencedProjectLoad,omitzero"`
	ESModuleInterop                           Tristate                                  `json:"esModuleInterop,omitzero"`
	ExactOptionalPropertyTypes                Tristate                                  `json:"exactOptionalPropertyTypes,omitzero"`
	ExperimentalDecorators                    Tristate                                  `json:"experimentalDecorators,omitzero"`
	ForceConsistentCasingInFileNames          Tristate                                  `json:"forceConsistentCasingInFileNames,omitzero"`
	IsolatedModules                           Tristate                                  `json:"isolatedModules,omitzero"`
	IsolatedDeclarations                      Tristate                                  `json:"isolatedDeclarations,omitzero"`
	IgnoreDeprecations                        string                                    `json:"ignoreDeprecations,omitzero"`
	ImportHelpers                             Tristate                                  `json:"importHelpers,omitzero"`
	InlineSourceMap                           Tristate                                  `json:"inlineSourceMap,omitzero"`
	InlineSources                             Tristate                                  `json:"inlineSources,omitzero"`
	Init                                      Tristate                                  `json:"init,omitzero"`
	Incremental                               Tristate                                  `json:"incremental,omitzero"`
	Jsx                                       JsxEmit                                   `json:"jsx,omitzero"`
	JsxFactory                                string                                    `json:"jsxFactory,omitzero"`
	JsxFragmentFactory                        string                                    `json:"jsxFragmentFactory,omitzero"`
	JsxImportSource                           string                                    `json:"jsxImportSource,omitzero"`
	KeyofStringsOnly                          Tristate                                  `json:"keyofStringsOnly,omitzero"`
	Lib                                       []string                                  `json:"lib,omitzero"`
	Locale                                    string                                    `json:"locale,omitzero"`
	MapRoot                                   string                                    `json:"mapRoot,omitzero"`
	ModuleKind                                ModuleKind                                `json:"module,omitzero"`
	ModuleResolution                          ModuleResolutionKind                      `json:"moduleResolution,omitzero"`
	ModuleSuffixes                            []string                                  `json:"moduleSuffixes,omitzero"`
	ModuleDetection                           ModuleDetectionKind                       `json:"moduleDetectionKind,omitzero"`
	NewLine                                   NewLineKind                               `json:"newLine,omitzero"`
	NoEmit                                    Tristate                                  `json:"noEmit,omitzero"`
	NoCheck                                   Tristate                                  `json:"noCheck,omitzero"`
	NoErrorTruncation                         Tristate                                  `json:"noErrorTruncation,omitzero"`
	NoFallthroughCasesInSwitch                Tristate                                  `json:"noFallthroughCasesInSwitch,omitzero"`
	NoImplicitAny                             Tristate                                  `json:"noImplicitAny,omitzero"`
	NoImplicitThis                            Tristate                                  `json:"noImplicitThis,omitzero"`
	NoImplicitReturns                         Tristate                                  `json:"noImplicitReturns,omitzero"`
	NoEmitHelpers                             Tristate                                  `json:"noEmitHelpers,omitzero"`
	NoLib                                     Tristate                                  `json:"noLib,omitzero"`
	NoPropertyAccessFromIndexSignature        Tristate                                  `json:"noPropertyAccessFromIndexSignature,omitzero"`
	NoUncheckedIndexedAccess                  Tristate                                  `json:"noUncheckedIndexedAccess,omitzero"`
	NoEmitOnError                             Tristate                                  `json:"noEmitOnError,omitzero"`
	NoUnusedLocals                            Tristate                                  `json:"noUnusedLocals,omitzero"`
	NoUnusedParameters                        Tristate                                  `json:"noUnusedParameters,omitzero"`
	NoResolve                                 Tristate                                  `json:"noResolve,omitzero"`
	NoImplicitOverride                        Tristate                                  `json:"noImplicitOverride,omitzero"`
	NoUncheckedSideEffectImports              Tristate                                  `json:"noUncheckedSideEffectImports,omitzero"`
	Out                                       string                                    `json:"out,omitzero"`
	OutDir                                    string                                    `json:"outDir,omitzero"`
	OutFile                                   string                                    `json:"outFile,omitzero"`
	Paths                                     *collections.OrderedMap[string, []string] `json:"paths,omitzero"`
	PreserveConstEnums                        Tristate                                  `json:"preserveConstEnums,omitzero"`
	PreserveSymlinks                          Tristate                                  `json:"preserveSymlinks,omitzero"`
	Project                                   string                                    `json:"project,omitzero"`
	ResolveJsonModule                         Tristate                                  `json:"resolveJsonModule,omitzero"`
	ResolvePackageJsonExports                 Tristate                                  `json:"resolvePackageJsonExports,omitzero"`
	ResolvePackageJsonImports                 Tristate                                  `json:"resolvePackageJsonImports,omitzero"`
	RemoveComments                            Tristate                                  `json:"removeComments,omitzero"`
	RewriteRelativeImportExtensions           Tristate                                  `json:"rewriteRelativeImportExtensions,omitzero"`
	ReactNamespace                            string                                    `json:"reactNamespace,omitzero"`
	RootDir                                   string                                    `json:"rootDir,omitzero"`
	RootDirs                                  []string                                  `json:"rootDirs,omitzero"`
	SkipLibCheck                              Tristate                                  `json:"skipLibCheck,omitzero"`
	Strict                                    Tristate                                  `json:"strict,omitzero"`
	StrictBindCallApply                       Tristate                                  `json:"strictBindCallApply,omitzero"`
	StrictBuiltinIteratorReturn               Tristate                                  `json:"strictBuiltinIteratorReturn,omitzero"`
	StrictFunctionTypes                       Tristate                                  `json:"strictFunctionTypes,omitzero"`
	StrictNullChecks                          Tristate                                  `json:"strictNullChecks,omitzero"`
	StrictPropertyInitialization              Tristate                                  `json:"strictPropertyInitialization,omitzero"`
	StripInternal                             Tristate                                  `json:"stripInternal,omitzero"`
	SkipDefaultLibCheck                       Tristate                                  `json:"skipDefaultLibCheck,omitzero"`
	SourceMap                                 Tristate                                  `json:"sourceMap,omitzero"`
	SourceRoot                                string                                    `json:"sourceRoot,omitzero"`
	SuppressOutputPathCheck                   Tristate                                  `json:"suppressOutputPathCheck,omitzero"`
	Target                                    ScriptTarget                              `json:"target,omitzero"`
	TraceResolution                           Tristate                                  `json:"traceResolution,omitzero"`
	TsBuildInfoFile                           string                                    `json:"tsBuildInfoFile,omitzero"`
	TypeRoots                                 []string                                  `json:"typeRoots,omitzero"`
	Types                                     []string                                  `json:"types,omitzero"`
	UseDefineForClassFields                   Tristate                                  `json:"useDefineForClassFields,omitzero"`
	UseUnknownInCatchVariables                Tristate                                  `json:"useUnknownInCatchVariables,omitzero"`
	VerbatimModuleSyntax                      Tristate                                  `json:"verbatimModuleSyntax,omitzero"`
	MaxNodeModuleJsDepth                      *int                                      `json:"maxNodeModuleJsDepth,omitzero"`

	// Internal fields
	ConfigFilePath      string   `json:"configFilePath,omitzero"`
	NoDtsResolution     Tristate `json:"noDtsResolution,omitzero"`
	PathsBasePath       string   `json:"pathsBasePath,omitzero"`
	Diagnostics         Tristate `json:"diagnostics,omitzero"`
	ExtendedDiagnostics Tristate `json:"extendedDiagnostics,omitzero"`
	GenerateCpuProfile  string   `json:"generateCpuProfile,omitzero"`
	GenerateTrace       string   `json:"generateTrace,omitzero"`
	ListEmittedFiles    Tristate `json:"listEmittedFiles,omitzero"`
	ListFiles           Tristate `json:"listFiles,omitzero"`
	ExplainFiles        Tristate `json:"explainFiles,omitzero"`
	ListFilesOnly       Tristate `json:"listFilesOnly,omitzero"`
	NoEmitForJsFiles    Tristate `json:"noEmitForJsFiles,omitzero"`
	PreserveWatchOutput Tristate `json:"preserveWatchOutput,omitzero"`
	Pretty              Tristate `json:"pretty,omitzero"`
	Version             Tristate `json:"version,omitzero"`
	Watch               Tristate `json:"watch,omitzero"`
	ShowConfig          Tristate `json:"showConfig,omitzero"`
	TscBuild            Tristate `json:"tscBuild,omitzero"`
	Help                Tristate `json:"help,omitzero"`
	All                 Tristate `json:"all,omitzero"`
}

func (options *CompilerOptions) GetEmitScriptTarget() ScriptTarget {
	if options.Target != ScriptTargetNone {
		return options.Target
	}
	switch options.GetEmitModuleKind() {
	case ModuleKindNode16:
		return ScriptTargetES2022
	case ModuleKindNodeNext:
		return ScriptTargetESNext
	default:
		return ScriptTargetES5
	}
}

func (options *CompilerOptions) GetEmitModuleKind() ModuleKind {
	if options.ModuleKind != ModuleKindNone {
		return options.ModuleKind
	}
	if options.Target >= ScriptTargetES2015 {
		return ModuleKindES2015
	}
	return ModuleKindCommonJS
}

func (options *CompilerOptions) GetModuleResolutionKind() ModuleResolutionKind {
	if options.ModuleResolution != ModuleResolutionKindUnknown {
		return options.ModuleResolution
	}
	switch options.GetEmitModuleKind() {
	case ModuleKindNode16:
		return ModuleResolutionKindNode16
	case ModuleKindNodeNext:
		return ModuleResolutionKindNodeNext
	default:
		return ModuleResolutionKindBundler
	}
}

func (options *CompilerOptions) GetESModuleInterop() bool {
	if options.ESModuleInterop != TSUnknown {
		return options.ESModuleInterop == TSTrue
	}
	switch options.GetEmitModuleKind() {
	case ModuleKindNode16, ModuleKindNodeNext, ModuleKindPreserve:
		return true
	}
	return false
}

func (options *CompilerOptions) GetAllowSyntheticDefaultImports() bool {
	if options.AllowSyntheticDefaultImports != TSUnknown {
		return options.AllowSyntheticDefaultImports == TSTrue
	}
	return options.GetESModuleInterop() ||
		options.GetEmitModuleKind() == ModuleKindSystem ||
		options.GetModuleResolutionKind() == ModuleResolutionKindBundler
}

func (options *CompilerOptions) GetResolveJsonModule() bool {
	if options.ResolveJsonModule != TSUnknown {
		return options.ResolveJsonModule == TSTrue
	}
	return options.GetModuleResolutionKind() == ModuleResolutionKindBundler
}

func (options *CompilerOptions) ShouldPreserveConstEnums() bool {
	return options.PreserveConstEnums == TSTrue || options.IsolatedModules == TSTrue
}

func (options *CompilerOptions) GetAllowJs() bool {
	if options.AllowJs != TSUnknown {
		return options.AllowJs == TSTrue
	}
	return options.CheckJs == TSTrue
}

func (options *CompilerOptions) GetJSXTransformEnabled() bool {
	jsx := options.Jsx
	return jsx == JsxEmitReact || jsx == JsxEmitReactJSX || jsx == JsxEmitReactJSXDev
}

func (options *CompilerOptions) GetEffectiveTypeRoots(currentDirectory string) (result []string, fromConfig bool) {
	if options.TypeRoots != nil {
		return options.TypeRoots, true
	}
	var baseDir string
	if options.ConfigFilePath != "" {
		baseDir = tspath.GetDirectoryPath(options.ConfigFilePath)
	} else {
		baseDir = currentDirectory
		if baseDir == "" {
			// This was accounted for in the TS codebase, but only for third-party API usage
			// where the module resolution host does not provide a getCurrentDirectory().
			panic("cannot get effective type roots without a config file path or current directory")
		}
	}

	typeRoots := make([]string, 0, strings.Count(baseDir, "/"))
	tspath.ForEachAncestorDirectory(baseDir, func(dir string) (any, bool) {
		typeRoots = append(typeRoots, tspath.CombinePaths(dir, "node_modules", "@types"))
		return nil, false
	})
	return typeRoots, false
}

func (options *CompilerOptions) GetIsolatedModules() bool {
	return options.IsolatedModules == TSTrue || options.VerbatimModuleSyntax == TSTrue
}

func (options *CompilerOptions) GetEmitStandardClassFields() bool {
	return options.UseDefineForClassFields != TSFalse && options.GetEmitScriptTarget() >= ScriptTargetES2022
}

func (options *CompilerOptions) GetEmitDeclarations() bool {
	// !!!
	return false
}

func (options *CompilerOptions) GetAreDeclarationMapsEnabled() bool {
	// !!!
	return false
}

func (options *CompilerOptions) HasJsonModuleEmitEnabled() bool {
	switch options.GetEmitModuleKind() {
	case ModuleKindNone, ModuleKindSystem, ModuleKindUMD:
		return false
	}
	return true
}

// SourceFileAffectingCompilerOptions are the CompilerOptions values that when
// changed require a new SourceFile be created.
type SourceFileAffectingCompilerOptions struct {
	// !!! generate this
	Target               ScriptTarget
	Jsx                  JsxEmit
	JsxImportSource      string
	ImportHelpers        Tristate
	AlwaysStrict         Tristate
	ModuleDetection      ModuleDetectionKind
	AllowUnreachableCode Tristate
	AllowUnusedLabels    Tristate
	PreserveConstEnums   Tristate
	IsolatedModules      Tristate
}

func (options *CompilerOptions) SourceFileAffecting() SourceFileAffectingCompilerOptions {
	return SourceFileAffectingCompilerOptions{
		Target:               options.Target,
		Jsx:                  options.Jsx,
		JsxImportSource:      options.JsxImportSource,
		ImportHelpers:        options.ImportHelpers,
		AlwaysStrict:         options.AlwaysStrict,
		ModuleDetection:      options.ModuleDetection,
		AllowUnreachableCode: options.AllowUnreachableCode,
		AllowUnusedLabels:    options.AllowUnusedLabels,
		PreserveConstEnums:   options.PreserveConstEnums,
		IsolatedModules:      options.IsolatedModules,
	}
}

type ModuleDetectionKind int32

const (
	ModuleDetectionKindNone   ModuleDetectionKind = 0
	ModuleDetectionKindAuto   ModuleDetectionKind = 1
	ModuleDetectionKindLegacy ModuleDetectionKind = 2
	ModuleDetectionKindForce  ModuleDetectionKind = 3
)

type ModuleKind int32

const (
	ModuleKindNone     ModuleKind = 0
	ModuleKindCommonJS ModuleKind = 1
	ModuleKindAMD      ModuleKind = 2
	ModuleKindUMD      ModuleKind = 3
	ModuleKindSystem   ModuleKind = 4
	// NOTE: ES module kinds should be contiguous to more easily check whether a module kind is *any* ES module kind.
	//       Non-ES module kinds should not come between ES2015 (the earliest ES module kind) and ESNext (the last ES
	//       module kind).
	ModuleKindES2015 ModuleKind = 5
	ModuleKindES2020 ModuleKind = 6
	ModuleKindES2022 ModuleKind = 7
	ModuleKindESNext ModuleKind = 99
	// Node16+ is an amalgam of commonjs (albeit updated) and es2022+, and represents a distinct module system from es2020/esnext
	ModuleKindNode16   ModuleKind = 100
	ModuleKindNodeNext ModuleKind = 199
	// Emit as written
	ModuleKindPreserve ModuleKind = 200
)

type ResolutionMode = ModuleKind // ModuleKindNone | ModuleKindCommonJS | ModuleKindESNext

const (
	ResolutionModeNone     = ModuleKindNone
	ResolutionModeCommonJS = ModuleKindCommonJS
	ResolutionModeESM      = ModuleKindESNext
)

type ModuleResolutionKind int32

const (
	ModuleResolutionKindUnknown ModuleResolutionKind = 0
	// Starting with node16, node's module resolver has significant departures from traditional cjs resolution
	// to better support ECMAScript modules and their use within node - however more features are still being added.
	// TypeScript's Node ESM support was introduced after Node 12 went end-of-life, and Node 14 is the earliest stable
	// version that supports both pattern trailers - *but*, Node 16 is the first version that also supports ECMAScript 2022.
	// In turn, we offer both a `NodeNext` moving resolution target, and a `Node16` version-anchored resolution target
	ModuleResolutionKindNode16   ModuleResolutionKind = 3
	ModuleResolutionKindNodeNext ModuleResolutionKind = 99 // Not simply `Node16` so that compiled code linked against TS can use the `Next` value reliably (same as with `ModuleKind`)
	ModuleResolutionKindBundler  ModuleResolutionKind = 100
)

// We don't use stringer on this for now, because these values
// are user-facing in --traceResolution, and stringer currently
// lacks the ability to remove the "ModuleResolutionKind" prefix
// when generating code for multiple types into the same output
// file. Additionally, since there's no TS equivalent of
// `ModuleResolutionKindUnknown`, we want to panic on that case,
// as it probably represents a mistake when porting TS to Go.
func (m ModuleResolutionKind) String() string {
	switch m {
	case ModuleResolutionKindUnknown:
		panic("should not use zero value of ModuleResolutionKind")
	case ModuleResolutionKindNode16:
		return "Node16"
	case ModuleResolutionKindNodeNext:
		return "NodeNext"
	case ModuleResolutionKindBundler:
		return "Bundler"
	default:
		panic("unhandled case in ModuleResolutionKind.String")
	}
}

type NewLineKind int32

const (
	NewLineKindNone NewLineKind = 0
	NewLineKindCRLF NewLineKind = 1
	NewLineKindLF   NewLineKind = 2
)

func (newLine NewLineKind) GetNewLineCharacter() string {
	switch newLine {
	case NewLineKindCRLF:
		return "\r\n"
	default:
		return "\n"
	}
}

type ScriptTarget int32

const (
	ScriptTargetNone   ScriptTarget = 0
	ScriptTargetES3    ScriptTarget = 0 // Deprecated
	ScriptTargetES5    ScriptTarget = 1
	ScriptTargetES2015 ScriptTarget = 2
	ScriptTargetES2016 ScriptTarget = 3
	ScriptTargetES2017 ScriptTarget = 4
	ScriptTargetES2018 ScriptTarget = 5
	ScriptTargetES2019 ScriptTarget = 6
	ScriptTargetES2020 ScriptTarget = 7
	ScriptTargetES2021 ScriptTarget = 8
	ScriptTargetES2022 ScriptTarget = 9
	ScriptTargetES2023 ScriptTarget = 10
	ScriptTargetES2024 ScriptTarget = 11
	ScriptTargetESNext ScriptTarget = 99
	ScriptTargetJSON   ScriptTarget = 100
	ScriptTargetLatest ScriptTarget = ScriptTargetESNext
)

type JsxEmit int32

const (
	JsxEmitNone        JsxEmit = 0
	JsxEmitPreserve    JsxEmit = 1
	JsxEmitReactNative JsxEmit = 2
	JsxEmitReact       JsxEmit = 3
	JsxEmitReactJSX    JsxEmit = 4
	JsxEmitReactJSXDev JsxEmit = 5
)
