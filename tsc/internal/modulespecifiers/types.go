package modulespecifiers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type SourceFileForSpecifierGeneration interface {
	Path() tspath.Path
	FileName() string
	Imports() []*ast.StringLiteralLike
	IsJS() bool
}

type CheckerShape interface {
	GetSymbolAtLocation(node *ast.Node) *ast.Symbol
	GetAliasedSymbol(symbol *ast.Symbol) *ast.Symbol
}

type ResultKind uint8

const (
	ResultKindNone ResultKind = iota
	ResultKindNodeModules
	ResultKindPaths
	ResultKindRedirect
	ResultKindRelative
	ResultKindAmbient
)

type ModulePath struct {
	FileName        string
	IsInNodeModules bool
	IsRedirect      bool
}

type PackageJsonInfo interface {
	GetDirectory() string
	GetContents() *packagejson.PackageJson
}

type ModuleSpecifierGenerationHost interface {
	// GetModuleResolutionCache() any // !!! TODO: adapt new resolution cache model
	// GetSymlinkCache() any // !!! TODO: adapt new resolution cache model
	// GetFileIncludeReasons() any // !!! TODO: adapt new resolution cache model
	CommonSourceDirectory() string
	GetGlobalTypingsCacheLocation() string
	UseCaseSensitiveFileNames() bool
	GetCurrentDirectory() string

	GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference
	GetRedirectTargets(path tspath.Path) []string
	GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string

	FileExists(path string) bool

	GetNearestAncestorDirectoryWithPackageJson(dirname string) string
	GetPackageJsonInfo(pkgJsonPath string) PackageJsonInfo
	GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode
	GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule
	GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode
}

type ImportModuleSpecifierPreference string

const (
	ImportModuleSpecifierPreferenceNone            ImportModuleSpecifierPreference = ""
	ImportModuleSpecifierPreferenceShortest        ImportModuleSpecifierPreference = "shortest"
	ImportModuleSpecifierPreferenceProjectRelative ImportModuleSpecifierPreference = "project-relative"
	ImportModuleSpecifierPreferenceRelative        ImportModuleSpecifierPreference = "relative"
	ImportModuleSpecifierPreferenceNonRelative     ImportModuleSpecifierPreference = "non-relative"
)

type ImportModuleSpecifierEndingPreference string

const (
	ImportModuleSpecifierEndingPreferenceNone    ImportModuleSpecifierEndingPreference = ""
	ImportModuleSpecifierEndingPreferenceAuto    ImportModuleSpecifierEndingPreference = "auto"
	ImportModuleSpecifierEndingPreferenceMinimal ImportModuleSpecifierEndingPreference = "minimal"
	ImportModuleSpecifierEndingPreferenceIndex   ImportModuleSpecifierEndingPreference = "index"
	ImportModuleSpecifierEndingPreferenceJs      ImportModuleSpecifierEndingPreference = "js"
)

type UserPreferences struct {
	ImportModuleSpecifierPreference   ImportModuleSpecifierPreference
	ImportModuleSpecifierEnding       ImportModuleSpecifierEndingPreference
	AutoImportSpecifierExcludeRegexes []string
}

type ModuleSpecifierOptions struct {
	OverrideImportMode core.ResolutionMode
}

type RelativePreferenceKind uint8

const (
	RelativePreferenceRelative RelativePreferenceKind = iota
	RelativePreferenceNonRelative
	RelativePreferenceShortest
	RelativePreferenceExternalNonRelative
)

type ModuleSpecifierEnding uint8

const (
	ModuleSpecifierEndingMinimal ModuleSpecifierEnding = iota
	ModuleSpecifierEndingIndex
	ModuleSpecifierEndingJsExtension
	ModuleSpecifierEndingTsExtension
)

type MatchingMode uint8

const (
	MatchingModeExact MatchingMode = iota
	MatchingModeDirectory
	MatchingModePattern
)
