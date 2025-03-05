package core

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/tspath"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=ModuleKind,ScriptTarget -output=compileroptions_stringer_generated.go

type CompilerOptions struct {
	AllowJs                                   Tristate                                  `json:"allowJs"`
	AllowArbitraryExtensions                  Tristate                                  `json:"allowArbitraryExtensions"`
	AllowSyntheticDefaultImports              Tristate                                  `json:"allowSyntheticDefaultImports"`
	AllowImportingTsExtensions                Tristate                                  `json:"allowImportingTsExtensions"`
	AllowNonTsExtensions                      Tristate                                  `json:"allowNonTsExtensions"`
	AllowUmdGlobalAccess                      Tristate                                  `json:"allowUmdGlobalAccess"`
	AllowUnreachableCode                      Tristate                                  `json:"allowUnreachableCode"`
	AllowUnusedLabels                         Tristate                                  `json:"allowUnusedLabels"`
	AssumeChangesOnlyAffectDirectDependencies Tristate                                  `json:"assumeChangesOnlyAffectDirectDependencies"`
	AlwaysStrict                              Tristate                                  `json:"alwaysStrict"`
	BaseUrl                                   string                                    `json:"baseUrl"`
	Build                                     Tristate                                  `json:"build"`
	CheckJs                                   Tristate                                  `json:"checkJs"`
	CustomConditions                          []string                                  `json:"customConditions"`
	Composite                                 Tristate                                  `json:"composite"`
	EmitDeclarationOnly                       Tristate                                  `json:"emitDeclarationOnly"`
	EmitBOM                                   Tristate                                  `json:"emitBOM"`
	EmitDecoratorMetadata                     Tristate                                  `json:"emitDecoratorMetadata"`
	DownlevelIteration                        Tristate                                  `json:"downlevelIteration"`
	Declaration                               Tristate                                  `json:"declaration"`
	DeclarationDir                            string                                    `json:"declarationDir"`
	DeclarationMap                            Tristate                                  `json:"declarationMap"`
	DisableSizeLimit                          Tristate                                  `json:"disableSizeLimit"`
	DisableSourceOfProjectReferenceRedirect   Tristate                                  `json:"disableSourceOfProjectReferenceRedirect"`
	DisableSolutionSearching                  Tristate                                  `json:"disableSolutionSearching"`
	DisableReferencedProjectLoad              Tristate                                  `json:"disableReferencedProjectLoad"`
	ESModuleInterop                           Tristate                                  `json:"esModuleInterop"`
	ExactOptionalPropertyTypes                Tristate                                  `json:"exactOptionalPropertyTypes"`
	ExperimentalDecorators                    Tristate                                  `json:"experimentalDecorators"`
	ForceConsistentCasingInFileNames          Tristate                                  `json:"forceConsistentCasingInFileNames"`
	IsolatedModules                           Tristate                                  `json:"isolatedModules"`
	IsolatedDeclarations                      Tristate                                  `json:"isolatedDeclarations"`
	IgnoreDeprecations                        string                                    `json:"ignoreDeprecations"`
	ImportHelpers                             Tristate                                  `json:"importHelpers"`
	InlineSourceMap                           Tristate                                  `json:"inlineSourceMap"`
	InlineSources                             Tristate                                  `json:"inlineSources"`
	Init                                      Tristate                                  `json:"init"`
	Incremental                               Tristate                                  `json:"incremental"`
	Jsx                                       JsxEmit                                   `json:"jsx"`
	JsxFactory                                string                                    `json:"jsxFactory"`
	JsxFragmentFactory                        string                                    `json:"jsxFragmentFactory"`
	JsxImportSource                           string                                    `json:"jsxImportSource"`
	KeyofStringsOnly                          Tristate                                  `json:"keyofStringsOnly"`
	Lib                                       []string                                  `json:"lib"`
	Locale                                    string                                    `json:"locale"`
	MapRoot                                   string                                    `json:"mapRoot"`
	ModuleKind                                ModuleKind                                `json:"module"`
	ModuleResolution                          ModuleResolutionKind                      `json:"moduleResolution"`
	ModuleSuffixes                            []string                                  `json:"moduleSuffixes"`
	ModuleDetection                           ModuleDetectionKind                       `json:"moduleDetectionKind"`
	NewLine                                   NewLineKind                               `json:"newLine"`
	NoEmit                                    Tristate                                  `json:"noEmit"`
	NoCheck                                   Tristate                                  `json:"noCheck"`
	NoErrorTruncation                         Tristate                                  `json:"noErrorTruncation"`
	NoFallthroughCasesInSwitch                Tristate                                  `json:"noFallthroughCasesInSwitch"`
	NoImplicitAny                             Tristate                                  `json:"noImplicitAny"`
	NoImplicitThis                            Tristate                                  `json:"noImplicitThis"`
	NoImplicitReturns                         Tristate                                  `json:"noImplicitReturns"`
	NoEmitHelpers                             Tristate                                  `json:"noEmitHelpers"`
	NoLib                                     Tristate                                  `json:"noLib"`
	NoPropertyAccessFromIndexSignature        Tristate                                  `json:"noPropertyAccessFromIndexSignature"`
	NoUncheckedIndexedAccess                  Tristate                                  `json:"noUncheckedIndexedAccess"`
	NoEmitOnError                             Tristate                                  `json:"noEmitOnError"`
	NoUnusedLocals                            Tristate                                  `json:"noUnusedLocals"`
	NoUnusedParameters                        Tristate                                  `json:"noUnusedParameters"`
	NoResolve                                 Tristate                                  `json:"noResolve"`
	NoImplicitOverride                        Tristate                                  `json:"noImplicitOverride"`
	NoUncheckedSideEffectImports              Tristate                                  `json:"noUncheckedSideEffectImports"`
	Out                                       string                                    `json:"out"`
	OutDir                                    string                                    `json:"outDir"`
	OutFile                                   string                                    `json:"outFile"`
	Paths                                     *collections.OrderedMap[string, []string] `json:"paths"`
	PreserveConstEnums                        Tristate                                  `json:"preserveConstEnums"`
	PreserveSymlinks                          Tristate                                  `json:"preserveSymlinks"`
	Project                                   string                                    `json:"project"`
	ResolveJsonModule                         Tristate                                  `json:"resolveJsonModule"`
	ResolvePackageJsonExports                 Tristate                                  `json:"resolvePackageJsonExports"`
	ResolvePackageJsonImports                 Tristate                                  `json:"resolvePackageJsonImports"`
	RemoveComments                            Tristate                                  `json:"removeComments"`
	RewriteRelativeImportExtensions           Tristate                                  `json:"rewriteRelativeImportExtensions"`
	ReactNamespace                            string                                    `json:"reactNamespace"`
	RootDir                                   string                                    `json:"rootDir"`
	RootDirs                                  []string                                  `json:"rootDirs"`
	SkipLibCheck                              Tristate                                  `json:"skipLibCheck"`
	Strict                                    Tristate                                  `json:"strict"`
	StrictBindCallApply                       Tristate                                  `json:"strictBindCallApply"`
	StrictBuiltinIteratorReturn               Tristate                                  `json:"strictBuiltinIteratorReturn"`
	StrictFunctionTypes                       Tristate                                  `json:"strictFunctionTypes"`
	StrictNullChecks                          Tristate                                  `json:"strictNullChecks"`
	StrictPropertyInitialization              Tristate                                  `json:"strictPropertyInitialization"`
	StripInternal                             Tristate                                  `json:"stripInternal"`
	SkipDefaultLibCheck                       Tristate                                  `json:"skipDefaultLibCheck"`
	SourceMap                                 Tristate                                  `json:"sourceMap"`
	SourceRoot                                string                                    `json:"sourceRoot"`
	SuppressOutputPathCheck                   Tristate                                  `json:"suppressOutputPathCheck"`
	Target                                    ScriptTarget                              `json:"target"`
	TraceResolution                           Tristate                                  `json:"traceResolution"`
	TsBuildInfoFile                           string                                    `json:"tsBuildInfoFile"`
	TypeRoots                                 []string                                  `json:"typeRoots"`
	Types                                     []string                                  `json:"types"`
	UseDefineForClassFields                   Tristate                                  `json:"useDefineForClassFields"`
	UseUnknownInCatchVariables                Tristate                                  `json:"useUnknownInCatchVariables"`
	VerbatimModuleSyntax                      Tristate                                  `json:"verbatimModuleSyntax"`
	MaxNodeModuleJsDepth                      *int                                      `json:"maxNodeModuleJsDepth"`

	// Internal fields
	ConfigFilePath      string   `json:"configFilePath"`
	NoDtsResolution     Tristate `json:"noDtsResolution"`
	PathsBasePath       string   `json:"pathsBasePath"`
	Diagnostics         Tristate `json:"diagnostics"`
	ExtendedDiagnostics Tristate `json:"extendedDiagnostics"`
	GenerateCpuProfile  string   `json:"generateCpuProfile"`
	GenerateTrace       string   `json:"generateTrace"`
	ListEmittedFiles    Tristate `json:"listEmittedFiles"`
	ListFiles           Tristate `json:"listFiles"`
	ExplainFiles        Tristate `json:"explainFiles"`
	ListFilesOnly       Tristate `json:"listFilesOnly"`
	NoEmitForJsFiles    Tristate `json:"noEmitForJsFiles"`
	PreserveWatchOutput Tristate `json:"preserveWatchOutput"`
	Pretty              Tristate `json:"pretty"`
	Version             Tristate `json:"version"`
	Watch               Tristate `json:"watch"`
	ShowConfig          Tristate `json:"showConfig"`
	TscBuild            Tristate `json:"tscBuild"`
}

func (options *CompilerOptions) GetEmitScriptTarget() ScriptTarget {
	if options.Target != ScriptTargetNone {
		return options.Target
	}
	return ScriptTargetES5
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

// SourceFileAffectingCompilerOptions are the CompilerOptions values that when
// changed require a new SourceFile be created.
type SourceFileAffectingCompilerOptions struct {
	// !!! generate this
	Target          ScriptTarget
	Jsx             JsxEmit
	JsxImportSource string
	ImportHelpers   Tristate
	AlwaysStrict    Tristate
	ModuleDetection ModuleDetectionKind
}

func (options *CompilerOptions) SourceFileAffecting() SourceFileAffectingCompilerOptions {
	return SourceFileAffectingCompilerOptions{
		Target:          options.Target,
		Jsx:             options.Jsx,
		JsxImportSource: options.JsxImportSource,
		ImportHelpers:   options.ImportHelpers,
		AlwaysStrict:    options.AlwaysStrict,
		ModuleDetection: options.ModuleDetection,
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
