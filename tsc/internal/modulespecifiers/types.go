package modulespecifiers

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/symlinks"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type SourceFileForSpecifierGeneration interface {
	PathKey() tspath.PathKey
	FileName() tspath.RootedFilePath
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

type ModuleSpecifiersResult struct {
	Specifiers          []tspath.ModuleSpecifier
	Kind                ResultKind
	AmbientModuleSymbol *ast.Symbol // used to construct an import attributes node, if one is needed
}

type ModulePath struct {
	FileName        tspath.RootedFilePath
	IsInNodeModules bool
	IsRedirect      bool
}

type ModuleSpecifierGenerationHost interface {
	// GetModuleResolutionCache() any // !!! TODO: adapt new resolution cache model
	GetSymlinkCache() *symlinks.KnownSymlinks
	// GetFileIncludeReasons() any // !!! TODO: adapt new resolution cache model
	CommonSourceDirectory() tspath.RootedDirectoryPath
	ContentMapperExtensions() []string
	GetGlobalTypingsCacheLocation() tspath.RootedDirectoryPath
	CaseSensitivity() tspath.CaseSensitivity
	BaseDirectory() tspath.RootedDirectoryPath

	GetProjectReferenceFromSource(path tspath.PathKey) *tsoptions.SourceOutputAndProjectReference
	GetRedirectTargets(path tspath.PathKey) []tspath.RootedFilePath
	GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) tspath.RootedFilePath

	FileExists(path tspath.RootedFilePath) bool

	GetNearestAncestorDirectoryWithPackageJson(dirname tspath.RootedDirectoryPath) tspath.RootedDirectoryPath
	GetPackageJsonInfo(pkgJsonPath tspath.RootedFilePath) *packagejson.InfoCacheEntry
	GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode
	GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule
	GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode
}

type ImportModuleSpecifierPreference string

const (
	ImportModuleSpecifierPreferenceNone            ImportModuleSpecifierPreference = "" // !!!
	ImportModuleSpecifierPreferenceShortest        ImportModuleSpecifierPreference = "shortest"
	ImportModuleSpecifierPreferenceProjectRelative ImportModuleSpecifierPreference = "project-relative"
	ImportModuleSpecifierPreferenceRelative        ImportModuleSpecifierPreference = "relative"
	ImportModuleSpecifierPreferenceNonRelative     ImportModuleSpecifierPreference = "non-relative"
)

type ImportModuleSpecifierEndingPreference string

const (
	ImportModuleSpecifierEndingPreferenceNone    ImportModuleSpecifierEndingPreference = "" // !!!
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
