package module

import (
	"fmt"
	"math/bits"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ResolutionHost interface {
	FileExists(fileName string) bool
	ReadFile(fileName string) (text string, ok bool)
	Trace(msg string)
	DirectoryExists(directoryName string) bool
	Realpath(path string) string
	GetCurrentDirectory() string
	GetDirectories(path string) []string
	UseCaseSensitiveFileNames() bool
}

type ModeAwareCacheKey struct {
	name string
	mode core.ResolutionMode
}

type ModeAwareCache[T any] map[ModeAwareCacheKey]T

type ParsedCommandLine struct {
	Options *core.CompilerOptions
}

type ResolvedProjectReference struct {
	CommandLine ParsedCommandLine
	SourceFile  *ast.SourceFile
	References  []*ResolvedProjectReference
}

type PerDirectoryResolutionCache[T any] interface {
	getFromDirectoryCache(nameAndMode ModeAwareCacheKey, directoryName string, compilerOptions *core.CompilerOptions) (T, bool)
	getOrCreateCacheForDirectory(directoryName string, compilerOptions *core.CompilerOptions) ModeAwareCache[T]
	clear()
	isReadonly() bool
	// update(options: CompilerOptions): void
	// /** @internal */ directoryToModuleNameMap: CacheWithRedirects<Path, ModeAwareCache<T>>;
}

type NonRelativeNameResolutionCache[T any] interface {
	getFromNonRelativeNameCache(nameAndMode ModeAwareCacheKey, directoryName string, compilerOptions *core.CompilerOptions) (T, bool)
	getOrCreateCacheForNonRelativeName(nameAndMode ModeAwareCacheKey, compilerOptions *core.CompilerOptions) map[string]T
}

type ResolutionCache interface {
	PerDirectoryResolutionCache[*ResolvedModuleWithFailedLookupLocations]
	NonRelativeNameResolutionCache[*ResolvedModuleWithFailedLookupLocations]
	getPackageJsonInfoCache() *packagejson.InfoCache
}

type NodeResolutionFeatures int32

const (
	NodeResolutionFeaturesNone    NodeResolutionFeatures = 0
	NodeResolutionFeaturesImports NodeResolutionFeatures = 1 << iota
	NodeResolutionFeaturesSelfName
	NodeResolutionFeaturesExports
	NodeResolutionFeaturesExportsPatternTrailers

	NodeResolutionFeaturesAll             = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers
	NodeResolutionFeaturesNode16Default   = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers
	NodeResolutionFeaturesNodeNextDefault = NodeResolutionFeaturesAll
	NodeResolutionFeaturesBundlerDefault  = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers
)

type PackageId struct {
	Name             string
	SubModuleName    string
	Version          string
	PeerDependencies string
}

func (p *PackageId) String() string {
	return fmt.Sprintf("%s@%s%s", p.Name, p.Version, p.PeerDependencies)
}

func (p *PackageId) PackageName() string {
	if p.SubModuleName != "" {
		return p.Name + "/" + p.SubModuleName
	}
	return p.Name
}

type WithFailedLookupLocations struct {
	FailedLookupLocations []string
	AffectingLocations    []string
	ResolutionDiagnostics []ast.Diagnostic
}

type ResolvedModule struct {
	ResolvedFileName         string
	OriginalPath             string
	Extension                string
	ResolvedUsingTsExtension bool
	PackageId                PackageId
	IsExternalLibraryImport  bool
}

type ResolvedModuleWithFailedLookupLocations struct {
	WithFailedLookupLocations
	ResolvedModule
}

func (r *ResolvedModuleWithFailedLookupLocations) IsResolved() bool {
	return r.ResolvedModule.ResolvedFileName != ""
}

type ResolvedTypeReferenceDirective struct {
	Primary                 bool
	ResolvedFileName        string
	OriginalPath            string
	PackageId               PackageId
	IsExternalLibraryImport bool
}

type ResolvedTypeReferenceDirectiveWithFailedLookupLocations struct {
	WithFailedLookupLocations
	ResolvedTypeReferenceDirective
}

type extensions int32

const (
	ExtensionsTypeScript extensions = 1 << iota
	ExtensionsJavaScript
	ExtensionsDeclaration
	ExtensionsJson

	ExtensionsImplementationFiles = ExtensionsTypeScript | ExtensionsJavaScript
)

func (e extensions) String() string {
	result := make([]string, 0, bits.OnesCount(uint(e)))
	if e&ExtensionsTypeScript != 0 {
		result = append(result, "TypeScript")
	}
	if e&ExtensionsJavaScript != 0 {
		result = append(result, "JavaScript")
	}
	if e&ExtensionsDeclaration != 0 {
		result = append(result, "Declaration")
	}
	if e&ExtensionsJson != 0 {
		result = append(result, "JSON")
	}
	return strings.Join(result, ", ")
}

func (e extensions) Array() []string {
	result := []string{}
	if e&ExtensionsTypeScript != 0 {
		result = append(result, tspath.ExtensionTs, tspath.ExtensionTsx)
	}
	if e&ExtensionsJavaScript != 0 {
		result = append(result, tspath.ExtensionJs, tspath.ExtensionJsx)
	}
	if e&ExtensionsDeclaration != 0 {
		result = append(result, tspath.ExtensionDts)
	}
	if e&ExtensionsJson != 0 {
		result = append(result, tspath.ExtensionJson)
	}
	return result
}
