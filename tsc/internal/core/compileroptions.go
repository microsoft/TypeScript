package core

import (
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type PluginImport struct {
	Name string `json:"name"`
}

// noCopy may be embedded into structs which must not be copied
// after the first use.
//
// See https://golang.org/issues/8005#issuecomment-190753527
// for details.
type noCopy struct{}

// Lock is a no-op used by -copylocks checker from `go vet`.
func (*noCopy) Lock()   {}
func (*noCopy) Unlock() {}

var EmptyCompilerOptions = &CompilerOptions{}

func (options *CompilerOptions) GetEmitScriptTarget() ScriptTarget {
	if options.Target != ScriptTargetNone {
		return options.Target
	}
	return ScriptTargetLatestStandard
}

func (options *CompilerOptions) GetEmitModuleKind() ModuleKind {
	if options.Module != ModuleKindNone {
		return options.Module
	}

	target := options.GetEmitScriptTarget()
	if target == ScriptTargetESNext {
		return ModuleKindESNext
	}
	if target >= ScriptTargetES2022 {
		return ModuleKindES2022
	}
	if target >= ScriptTargetES2020 {
		return ModuleKindES2020
	}
	if target >= ScriptTargetES2015 {
		return ModuleKindES2015
	}
	return ModuleKindCommonJS
}

func (options *CompilerOptions) GetModuleResolutionKind() ModuleResolutionKind {
	switch options.ModuleResolution {
	case ModuleResolutionKindUnknown, ModuleResolutionKindClassic, ModuleResolutionKindNode10:
		switch options.GetEmitModuleKind() {
		case ModuleKindNode16, ModuleKindNode18, ModuleKindNode20:
			return ModuleResolutionKindNode16
		case ModuleKindNodeNext:
			return ModuleResolutionKindNodeNext
		default:
			return ModuleResolutionKindBundler
		}
	default:
		return options.ModuleResolution
	}
}

func (options *CompilerOptions) GetEmitModuleDetectionKind() ModuleDetectionKind {
	if options.ModuleDetection != ModuleDetectionKindNone {
		return options.ModuleDetection
	}
	moduleKind := options.GetEmitModuleKind()
	if ModuleKindNode16 <= moduleKind && moduleKind <= ModuleKindNodeNext {
		return ModuleDetectionKindForce
	}
	return ModuleDetectionKindAuto
}

func (options *CompilerOptions) GetResolvePackageJsonExports() bool {
	return options.ResolvePackageJsonExports.IsTrueOrUnknown()
}

func (options *CompilerOptions) GetResolvePackageJsonImports() bool {
	return options.ResolvePackageJsonImports.IsTrueOrUnknown()
}

func (options *CompilerOptions) GetAllowImportingTsExtensions() bool {
	return options.AllowImportingTsExtensions.IsTrue() || options.RewriteRelativeImportExtensions.IsTrue()
}

func (options *CompilerOptions) AllowImportingTsExtensionsFrom(fileName string) bool {
	return options.GetAllowImportingTsExtensions() || tspath.IsDeclarationFileName(fileName)
}

func (options *CompilerOptions) GetResolveJsonModule() bool {
	if options.ResolveJsonModule != TSUnknown {
		return options.ResolveJsonModule == TSTrue
	}
	switch options.GetEmitModuleKind() {
	// TODO in 6.0: add Node16/Node18
	case ModuleKindNode20, ModuleKindNodeNext:
		return true
	}
	return options.GetModuleResolutionKind() == ModuleResolutionKindBundler
}

func (options *CompilerOptions) ShouldPreserveConstEnums() bool {
	return options.PreserveConstEnums == TSTrue || options.GetIsolatedModules()
}

func (options *CompilerOptions) GetAllowJS() bool {
	if options.AllowJs != TSUnknown {
		return options.AllowJs == TSTrue
	}
	return options.CheckJs == TSTrue
}

func (options *CompilerOptions) GetJSXTransformEnabled() bool {
	jsx := options.Jsx
	return jsx == JsxEmitReact || jsx == JsxEmitReactJSX || jsx == JsxEmitReactJSXDev
}

func (options *CompilerOptions) GetStrictOptionValue(value Tristate) bool {
	if value != TSUnknown {
		return value == TSTrue
	}
	return options.Strict != TSFalse
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

// UsesWildcardTypes returns true if this option's types array includes "*"
func (options *CompilerOptions) UsesWildcardTypes() bool {
	return slices.Contains(options.Types, "*")
}

func (options *CompilerOptions) GetIsolatedModules() bool {
	return options.IsolatedModules == TSTrue || options.VerbatimModuleSyntax == TSTrue
}

func (options *CompilerOptions) IsIncremental() bool {
	return options.Incremental.IsTrue() || options.Composite.IsTrue()
}

func (options *CompilerOptions) GetEmitStandardClassFields() bool {
	return options.UseDefineForClassFields != TSFalse && options.GetEmitScriptTarget() >= ScriptTargetES2022
}

func (options *CompilerOptions) GetUseDefineForClassFields() bool {
	if options.UseDefineForClassFields == TSUnknown {
		return options.GetEmitScriptTarget() >= ScriptTargetES2022
	}
	return options.UseDefineForClassFields == TSTrue
}

func (options *CompilerOptions) GetEmitDeclarations() bool {
	return options.Declaration.IsTrue() || options.Composite.IsTrue()
}

func (options *CompilerOptions) GetAreDeclarationMapsEnabled() bool {
	return options.DeclarationMap == TSTrue && options.GetEmitDeclarations()
}

func (options *CompilerOptions) HasJsonModuleEmitEnabled() bool {
	switch options.GetEmitModuleKind() {
	case ModuleKindSystem, ModuleKindUMD:
		return false
	}
	return true
}

func (options *CompilerOptions) GetPathsBasePath(currentDirectory string) string {
	if options.Paths.Size() == 0 {
		return ""
	}
	if options.PathsBasePath != "" {
		return options.PathsBasePath
	}
	return currentDirectory
}

func (moduleKind ModuleKind) IsNonNodeESM() bool {
	return moduleKind >= ModuleKindES2015 && moduleKind <= ModuleKindESNext
}

func (moduleKind ModuleKind) SupportsImportAttributes() bool {
	return ModuleKindNode18 <= moduleKind && moduleKind <= ModuleKindNodeNext ||
		moduleKind == ModuleKindPreserve ||
		moduleKind == ModuleKindESNext
}

type ResolutionMode = ModuleKind // ModuleKindNone | ModuleKindCommonJS | ModuleKindESNext

const (
	ResolutionModeNone     = ModuleKindNone
	ResolutionModeCommonJS = ModuleKindCommonJS
	ResolutionModeESM      = ModuleKindESNext
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
	case ModuleResolutionKindClassic:
		return "Classic"
	case ModuleResolutionKindNode10:
		return "Node10"
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

func GetNewLineKind(s string) NewLineKind {
	switch s {
	case "\r\n":
		return NewLineKindCRLF
	case "\n":
		return NewLineKindLF
	default:
		return NewLineKindNone
	}
}

func (newLine NewLineKind) GetNewLineCharacter() string {
	switch newLine {
	case NewLineKindCRLF:
		return "\r\n"
	default:
		return "\n"
	}
}

func (j JsxEmit) String() string {
	switch j {
	case JsxEmitNone:
		panic("should not use zero value of JsxEmit")
	case JsxEmitPreserve:
		return "preserve"
	case JsxEmitReactNative:
		return "react-native"
	case JsxEmitReact:
		return "react"
	case JsxEmitReactJSX:
		return "react-jsx"
	case JsxEmitReactJSXDev:
		return "react-jsxdev"
	default:
		panic("unhandled case in JsxEmit.String")
	}
}
