package compiler

import (
	"fmt"
	"math/bits"
	"strings"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/utils"
)

type ModuleResolutionHost interface {
	FileExists(fileName string) bool
	ReadFile(fileName string) string
	Trace(msg string)
	DirectoryExists(directoryName string) bool
	Realpath(path string) string
	GetCurrentDirectory() string
	GetDirectories(path string) []string
	UseCaseSensitiveFileNames() bool
}

const (
	ResolutionModeNone     ResolutionMode = ResolutionMode(int32(ModuleKindNone))
	ResolutionModeCommonJS ResolutionMode = ResolutionMode(int32(ModuleKindCommonJS))
	ResolutionModeESM      ResolutionMode = ResolutionMode(int32(ModuleKindES2015))
)

type ModeAwareCacheKey struct {
	name string
	mode ResolutionMode
}

type ModeAwareCache[T any] map[ModeAwareCacheKey]T

type ParsedCommandLine struct {
	options *CompilerOptions
}

type ResolvedProjectReference struct {
	commandLine ParsedCommandLine
	sourceFile  *SourceFile
	references  []*ResolvedProjectReference
}

type PerDirectoryResolutionCache[T any] interface {
	getFromDirectoryCache(nameAndMode ModeAwareCacheKey, directoryName string, redirectedReference *ResolvedProjectReference) T
	getOrCreateCacheForDirectory(directoryName string, redirectedReference *ResolvedProjectReference) ModeAwareCache[T]
	clear()
	isReadonly() bool
	// update(options: CompilerOptions): void
	// /** @internal */ directoryToModuleNameMap: CacheWithRedirects<Path, ModeAwareCache<T>>;
}

type NonRelativeNameResolutionCache[T any] interface {
	getFromNonRelativeNameCache(nameAndMode ModeAwareCacheKey, directoryName string, redirectedReference *ResolvedProjectReference) T
	getOrCreateCacheForNonRelativeName(nameAndMode ModeAwareCacheKey, redirectedReference *ResolvedProjectReference) map[string]T
}

type ModuleResolutionCache interface {
	PerDirectoryResolutionCache[*ResolvedModuleWithFailedLookupLocations]
	NonRelativeNameResolutionCache[*ResolvedModuleWithFailedLookupLocations]
	getPackageJsonInfoCache() PackageJsonInfoCache
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

type ResolvedModule struct {
	resolvedFileName         string
	isExternalLibraryImport  bool
	resolvedUsingTsExtension bool
}

type PackageId struct {
	name             string
	subModuleName    string
	version          string
	peerDependencies string
}

func (p PackageId) String() string {
	return fmt.Sprintf("%s@%s%s", p.name, p.version, p.peerDependencies)
}

func (p PackageId) PackageName() string {
	if p.subModuleName != "" {
		return p.name + "/" + p.subModuleName
	}
	return p.name
}

type ResolvedModuleFull struct {
	ResolvedModule
	originalPath string
	extension    string
	packageId    PackageId
}

type WithFailedLookupLocations struct {
	failedLookupLocations []string
	affectingLocations    []string
	resolutionDiagnostics []Diagnostic
}

type ResolvedModuleWithFailedLookupLocations struct {
	WithFailedLookupLocations
	isResolved      bool
	resolvedModule  ResolvedModuleFull
	alternateResult string
}

type ResolvedTypeReferenceDirective struct {
	primary                 bool
	resolvedFileName        string
	originalPath            string
	packageId               PackageId
	isExternalLibraryImport bool
}

type ResolvedTypeReferenceDirectiveWithFailedLookupLocations struct {
	WithFailedLookupLocations
	resolvedTypeReferenceDirective ResolvedTypeReferenceDirective
}

type Resolved struct {
	path                     string
	extension                string
	packageId                PackageId
	isSymlink                bool
	originalPath             string
	resolvedUsingTsExtension bool
}

type PathAndPackageId struct {
	fileName  string
	packageId PackageId
}

type PathAndExtension struct {
	path                     string
	ext                      string
	resolvedUsingTsExtension bool
}

type Extensions int32

const (
	ExtensionsTypeScript Extensions = 1 << iota
	ExtensionsJavaScript
	ExtensionsDeclaration
	ExtensionsJson

	ExtensionsImplementationFiles = ExtensionsTypeScript | ExtensionsJavaScript
)

func (e Extensions) String() string {
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

func extensionsToExtensionsArray(extensions Extensions) []string {
	result := []string{}
	if extensions&ExtensionsTypeScript != 0 {
		result = append(result, ExtensionTs, ExtensionTsx)
	}
	if extensions&ExtensionsJavaScript != 0 {
		result = append(result, ExtensionJs, ExtensionJsx)
	}
	if extensions&ExtensionsDeclaration != 0 {
		result = append(result, ExtensionDts)
	}
	if extensions&ExtensionsJson != 0 {
		result = append(result, ExtensionJson)
	}
	return result
}

func resolvedTypeScriptOnly(resolved *Resolved) *PathAndPackageId {
	if resolved == nil {
		return nil
	}
	if !extensionIsTs(resolved.extension) {
		panic(fmt.Sprintf("Expected resolved extension to be a TypeScript extension, but got %s", resolved.extension))
	}
	return &PathAndPackageId{
		fileName:  resolved.path,
		packageId: resolved.packageId,
	}
}

type ModuleResolver struct {
	host                       ModuleResolutionHost
	cache                      ModuleResolutionCache
	compilerOptions            *CompilerOptions
	failedLookupLocations      []string
	affectingLocations         []string
	resultFromCache            *ResolvedModuleWithFailedLookupLocations
	packageJsonInfoCache       *PackageJsonInfoCache
	features                   NodeResolutionFeatures
	conditions                 []string
	requestContainingDirectory string
	// reportDiagnostic: DiagnosticReporter
	isConfigLookup                  bool
	candidateIsFromPackageJsonField bool
	resolvedPackageDirectory        bool
	esmMode                         bool
}

func NewModuleResolver(host ModuleResolutionHost, cache ModuleResolutionCache, options *CompilerOptions) *ModuleResolver {
	return &ModuleResolver{
		host:            host,
		cache:           cache,
		compilerOptions: options,
	}
}

func (r *ModuleResolver) resolveModuleName(moduleName string, containingFile string, resolutionMode ResolutionMode, redirectedReference *ResolvedProjectReference) *ResolvedModuleWithFailedLookupLocations {
	traceEnabled := r.compilerOptions.TraceResolution == TSTrue
	if redirectedReference != nil {
		r.compilerOptions = redirectedReference.commandLine.options
	}
	if traceEnabled {
		r.host.Trace(formatMessage(diagnostics.Resolving_module_0_from_1, moduleName, containingFile))
		if redirectedReference != nil {
			r.host.Trace(formatMessage(diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName))
		}
	}
	containingDirectory := tspath.GetDirectoryPath(containingFile)
	var result *ResolvedModuleWithFailedLookupLocations
	if r.cache != nil {
		result = r.cache.getFromDirectoryCache(ModeAwareCacheKey{moduleName, resolutionMode}, containingDirectory, redirectedReference)
	}

	if result != nil {
		if traceEnabled {
			r.host.Trace(formatMessage(diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory))
		}
	} else {
		moduleResolution := r.compilerOptions.ModuleResolution
		if moduleResolution == ModuleResolutionKindUnknown {
			moduleResolution = getEmitModuleResolutionKind(r.compilerOptions)
			if traceEnabled {
				r.host.Trace(formatMessage(diagnostics.Module_resolution_kind_is_not_specified_using_0, moduleResolution.String()))
			}
		} else {
			if traceEnabled {
				r.host.Trace(formatMessage(diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, moduleResolution.String()))
			}
		}

		switch moduleResolution {
		case ModuleResolutionKindNode16:
			result = r.resolveNode16(moduleName, containingFile, resolutionMode, redirectedReference)
		case ModuleResolutionKindNodeNext:
			result = r.resolveNodeNext(moduleName, containingFile, resolutionMode, redirectedReference)
		case ModuleResolutionKindBundler:
			var conditions []string
			if resolutionMode != ModuleKindNone {
				conditions = getConditions(r.compilerOptions, resolutionMode)
			}
			result = r.resolveBundler(moduleName, containingFile, resolutionMode, redirectedReference, conditions)
		default:
			panic(fmt.Sprintf("Unexpected moduleResolution: %d", moduleResolution))
		}

		if r.cache != nil && !r.cache.isReadonly() {
			r.cache.getOrCreateCacheForDirectory(containingDirectory, redirectedReference)[ModeAwareCacheKey{moduleName, resolutionMode}] = result
			if !isExternalModuleNameRelative(moduleName) {
				// put result in per-module name cache
				r.cache.getOrCreateCacheForNonRelativeName(ModeAwareCacheKey{moduleName, resolutionMode}, redirectedReference)[containingDirectory] = result
			}
		}
	}

	if traceEnabled {
		if result.isResolved {
			if result.resolvedModule.packageId.name != "" {
				r.host.Trace(formatMessage(diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2, moduleName, result.resolvedModule.resolvedFileName, result.resolvedModule.packageId.String()))
			} else {
				r.host.Trace(formatMessage(diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName))
			}
		} else {
			r.host.Trace(formatMessage(diagnostics.Module_name_0_was_not_resolved, moduleName))
		}
	}

	return result
}

func (r *ModuleResolver) resolveNode16(moduleName string, containingFile string, resolutionMode ResolutionMode, redirectedReference *ResolvedProjectReference) *ResolvedModuleWithFailedLookupLocations {
	return nil
}

func (r *ModuleResolver) resolveNodeNext(moduleName string, containingFile string, resolutionMode ResolutionMode, redirectedReference *ResolvedProjectReference) *ResolvedModuleWithFailedLookupLocations {
	return nil
}

func (r *ModuleResolver) resolveBundler(moduleName string, containingFile string, resolutionMode ResolutionMode, redirectedReference *ResolvedProjectReference, conditions []string) *ResolvedModuleWithFailedLookupLocations {
	return nil
}

func getConditions(options *CompilerOptions, resolutionMode ResolutionMode) []string {
	moduleResolution := getEmitModuleResolutionKind(options)
	if resolutionMode == ModuleKindNone && moduleResolution == ModuleResolutionKindBundler {
		resolutionMode = ModuleKindESNext
	}
	conditions := make([]string, 0, 3+len(options.CustomConditions))
	if resolutionMode == ModuleKindESNext {
		conditions = append(conditions, "import")
	} else {
		conditions = append(conditions, "require")
	}
	if moduleResolution != ModuleResolutionKindBundler {
		conditions = append(conditions, "node")
	}
	conditions = utils.Concatenate(conditions, options.CustomConditions)
	return conditions
}
