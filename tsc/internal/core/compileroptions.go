package core

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
)

//go:generate go run golang.org/x/tools/cmd/stringer -type=ModuleKind,ScriptTarget -output=compileroptions_stringer_generated.go

type CompilerOptions struct {
	AllowJs                            Tristate             `json:"allowJs"`
	AllowSyntheticDefaultImports       Tristate             `json:"allowSyntheticDefaultImports"`
	AllowUmdGlobalAccess               Tristate             `json:"allowUmdGlobalAccess"`
	AllowUnreachableCode               Tristate             `json:"allowUnreachableCode"`
	AllowUnusedLabels                  Tristate             `json:"allowUnusedLabels"`
	CheckJs                            Tristate             `json:"checkJs"`
	CustomConditions                   []string             `json:"customConditions"`
	ESModuleInterop                    Tristate             `json:"esModuleInterop"`
	ExactOptionalPropertyTypes         Tristate             `json:"exactOptionalPropertyTypes"`
	ExperimentalDecorators             Tristate             `json:"experimentalDecorators"`
	IsolatedModules                    Tristate             `json:"isolatedModules"`
	Jsx                                JsxEmit              `json:"jsx"`
	Lib                                []string             `json:"lib"`
	LegacyDecorators                   Tristate             `json:"legacyDecorators"`
	ModuleKind                         ModuleKind           `json:"module"`
	ModuleResolution                   ModuleResolutionKind `json:"moduleResolution"`
	ModuleSuffixes                     []string             `json:"moduleSuffixes"`
	ModuleDetection                    ModuleDetectionKind  `json:"moduleDetectionKind"`
	NoFallthroughCasesInSwitch         Tristate             `json:"noFallthroughCasesInSwitch"`
	NoImplicitAny                      Tristate             `json:"noImplicitAny"`
	NoImplicitThis                     Tristate             `json:"noImplicitThis"`
	NoPropertyAccessFromIndexSignature Tristate             `json:"noPropertyAccessFromIndexSignature"`
	NoUncheckedIndexedAccess           Tristate             `json:"noUncheckedIndexedAccess"`
	Paths                              map[string][]string  `json:"paths"`
	PreserveConstEnums                 Tristate             `json:"preserveConstEnums"`
	PreserveSymlinks                   Tristate             `json:"preserveSymlinks"`
	ResolveJsonModule                  Tristate             `json:"resolveJsonModule"`
	ResolvePackageJsonExports          Tristate             `json:"resolvePackageJsonExports"`
	ResolvePackageJsonImports          Tristate             `json:"resolvePackageJsonImports"`
	Strict                             Tristate             `json:"strict"`
	StrictBindCallApply                Tristate             `json:"strictBindCallApply"`
	StrictFunctionTypes                Tristate             `json:"strictFunctionTypes"`
	StrictNullChecks                   Tristate             `json:"strictNullChecks"`
	StrictPropertyInitialization       Tristate             `json:"strictPropertyInitialization"`
	Target                             ScriptTarget         `json:"target"`
	TraceResolution                    Tristate             `json:"traceResolution"`
	TypeRoots                          []string             `json:"typeRoots"`
	Types                              []string             `json:"types"`
	UseDefineForClassFields            Tristate             `json:"useDefineForClassFields"`
	UseUnknownInCatchVariables         Tristate             `json:"useUnknownInCatchVariables"`
	VerbatimModuleSyntax               Tristate             `json:"verbatimModuleSyntax"`

	// Internal fields
	ConfigFilePath  string   `json:"configFilePath"`
	NoDtsResolution Tristate `json:"noDtsResolution"`
	PathsBasePath   string   `json:"pathsBasePath"`
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
	NewLineKindCRLF NewLineKind = 0
	NewLineKindLF   NewLineKind = 1
)

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
