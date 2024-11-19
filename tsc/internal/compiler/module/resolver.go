package module

import (
	"fmt"
	"path"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// !!! possibly replaceable with ResolvedModule,
// but somewhat nice to know that lowercase types
// are safely mutable during the resolution process
type resolved struct {
	path                     string
	extension                string
	packageId                PackageId
	originalPath             string
	resolvedUsingTsExtension bool
}

type resolutionKindSpecificLoader = func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved

// !!! this seems unnecessary
type searchResult[T any] struct {
	value *T
	stop  bool
}

func newSearchResult[T any](result *T) searchResult[T] {
	return searchResult[T]{value: result, stop: result != nil}
}

type resolutionState struct {
	resolver *Resolver

	// request fields
	moduleName          string
	containingDirectory string
	isConfigLookup      bool
	features            NodeResolutionFeatures
	esmMode             bool
	conditions          []string
	extensions          extensions
	compilerOptions     *core.CompilerOptions

	// state fields
	resultFromCache                 *ResolvedModuleWithFailedLookupLocations
	candidateIsFromPackageJsonField bool
	resolvedPackageDirectory        bool
	failedLookupLocations           []string
	affectingLocations              []string
	diagnostics                     []ast.Diagnostic
}

func newResolutionState(
	moduleName string,
	containingDirectory string,
	resolutionMode core.ResolutionMode,
	compilerOptions *core.CompilerOptions,
	resolver *Resolver,
) *resolutionState {
	state := &resolutionState{
		moduleName:          moduleName,
		containingDirectory: containingDirectory,
		compilerOptions:     compilerOptions,
		resolver:            resolver,
	}
	if compilerOptions.NoDtsResolution == core.TSTrue {
		state.extensions = ExtensionsImplementationFiles
	} else {
		state.extensions = ExtensionsTypeScript | ExtensionsJavaScript | ExtensionsDeclaration
	}
	if compilerOptions.GetResolveJsonModule() {
		state.extensions |= ExtensionsJson
	}

	switch compilerOptions.GetModuleResolutionKind() {
	case core.ModuleResolutionKindNode16:
		state.features = NodeResolutionFeaturesNode16Default
		state.esmMode = resolutionMode == core.ModuleKindESNext
		state.conditions = getConditions(compilerOptions, resolutionMode)
	case core.ModuleResolutionKindNodeNext:
		state.features = NodeResolutionFeaturesNodeNextDefault
		state.esmMode = resolutionMode == core.ModuleKindESNext
		state.conditions = getConditions(compilerOptions, resolutionMode)
	case core.ModuleResolutionKindBundler:
		state.features = getNodeResolutionFeatures(compilerOptions)
		state.conditions = getConditions(compilerOptions, resolutionMode)
	}
	return state
}

type Resolver struct {
	host            ResolutionHost
	cache           ResolutionCache
	compilerOptions *core.CompilerOptions
	// reportDiagnostic: DiagnosticReporter
}

func NewResolver(host ResolutionHost, cache ResolutionCache, options *core.CompilerOptions) *Resolver {
	return &Resolver{
		host:            host,
		cache:           cache,
		compilerOptions: options,
	}
}

func (r *Resolver) traceEnabled() bool {
	return r.compilerOptions.TraceResolution == core.TSTrue
}

func (r *Resolver) GetPackageScopeForPath(directory string) *packagejson.InfoCacheEntry {
	return (&resolutionState{compilerOptions: r.compilerOptions}).getPackageScopeForPath(directory)
}

func (r *Resolver) ResolveTypeReferenceDirective(typeReferenceDirectiveName string, containingFile string, resolutionMode core.ResolutionMode, redirectedReference *ResolvedProjectReference) *ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
	// !!!
	return nil
}

func (r *Resolver) ResolveModuleName(moduleName string, containingFile string, resolutionMode core.ResolutionMode, redirectedReference *ResolvedProjectReference) *ResolvedModuleWithFailedLookupLocations {
	traceEnabled := r.traceEnabled()

	compilerOptions := r.compilerOptions
	if redirectedReference != nil {
		compilerOptions = redirectedReference.CommandLine.Options
	}

	if traceEnabled {
		r.host.Trace(diagnostics.Resolving_module_0_from_1.Format(moduleName, containingFile))
		if redirectedReference != nil {
			r.host.Trace(diagnostics.Using_compiler_options_of_project_reference_redirect_0.Format(redirectedReference.SourceFile.FileName()))
		}
	}
	containingDirectory := tspath.GetDirectoryPath(containingFile)
	var result *ResolvedModuleWithFailedLookupLocations
	if r.cache != nil {
		result, _ = r.cache.getFromDirectoryCache(ModeAwareCacheKey{moduleName, resolutionMode}, containingDirectory, compilerOptions)
	}

	if result != nil {
		if traceEnabled {
			r.host.Trace(diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1.Format(moduleName, containingDirectory))
		}
	} else {
		moduleResolution := compilerOptions.ModuleResolution
		if moduleResolution == core.ModuleResolutionKindUnknown {
			moduleResolution = compilerOptions.GetModuleResolutionKind()
			if traceEnabled {
				r.host.Trace(diagnostics.Module_resolution_kind_is_not_specified_using_0.Format(moduleResolution.String()))
			}
		} else {
			if traceEnabled {
				r.host.Trace(diagnostics.Explicitly_specified_module_resolution_kind_Colon_0.Format(moduleResolution.String()))
			}
		}

		switch moduleResolution {
		case core.ModuleResolutionKindNode16, core.ModuleResolutionKindNodeNext, core.ModuleResolutionKindBundler:
			state := newResolutionState(moduleName, containingFile, resolutionMode, compilerOptions, r)
			result = state.resolveNodeLike()
		default:
			panic(fmt.Sprintf("Unexpected moduleResolution: %d", moduleResolution))
		}

		if r.cache != nil && !r.cache.isReadonly() {
			r.cache.getOrCreateCacheForDirectory(containingDirectory, compilerOptions)[ModeAwareCacheKey{moduleName, resolutionMode}] = result
			if !tspath.IsExternalModuleNameRelative(moduleName) {
				// put result in per-module name cache
				r.cache.getOrCreateCacheForNonRelativeName(ModeAwareCacheKey{moduleName, resolutionMode}, compilerOptions)[containingDirectory] = result
			}
		}
	}

	if traceEnabled {
		if result.IsResolved() {
			if result.PackageId.Name != "" {
				r.host.Trace(diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2.Format(moduleName, result.ResolvedModule.ResolvedFileName, result.ResolvedModule.PackageId.String()))
			} else {
				r.host.Trace(diagnostics.Module_name_0_was_successfully_resolved_to_1.Format(moduleName, result.ResolvedFileName))
			}
		} else {
			r.host.Trace(diagnostics.Module_name_0_was_not_resolved.Format(moduleName))
		}
	}

	return result
}

func (r *resolutionState) getPackageScopeForPath(directory string) *packagejson.InfoCacheEntry {
	result, _ := tspath.ForEachAncestorDirectory(
		directory,
		func(directory string) (*packagejson.InfoCacheEntry, bool) {
			// !!! stop at global cache
			if result := r.getPackageJsonInfo(directory, false /*onlyRecordFailures*/); result != nil {
				return result, true
			}
			return nil, false
		},
	)
	return result
}

func (r *resolutionState) resolveNodeLike() *ResolvedModuleWithFailedLookupLocations {
	if r.resolver.traceEnabled() {
		conditions := strings.Join(core.Map(r.conditions, func(c string) string { return `'` + c + `'` }), ", ")
		if r.esmMode {
			r.resolver.host.Trace(diagnostics.Resolving_in_0_mode_with_conditions_1.Format("ESM", conditions))
		} else {
			r.resolver.host.Trace(diagnostics.Resolving_in_0_mode_with_conditions_1.Format("CJS", conditions))
		}
	}

	if resolved := r.tryLoadModuleUsingOptionalResolutionSettings(); resolved != nil {
		return r.createResolvedModuleWithFailedLookupLocationsHandlingSymlink(resolved)
	}

	if !tspath.IsExternalModuleNameRelative(r.moduleName) {
		if r.features&NodeResolutionFeaturesImports != 0 && strings.HasPrefix(r.moduleName, "#") {
			// !!!
			panic("not implemented")
		}
		if r.features&NodeResolutionFeaturesSelfName != 0 {
			if resolved := r.loadModuleFromSelfNameReference(); resolved != nil {
				return r.createResolvedModuleWithFailedLookupLocationsHandlingSymlink(resolved)
			}
		}
		if strings.Contains(r.moduleName, ":") {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Skipping_module_0_that_looks_like_an_absolute_URI_target_file_types_Colon_1.Format(r.moduleName, r.extensions.String()))
			}
		}
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Loading_module_0_from_node_modules_folder_target_file_types_Colon_1.Format(r.moduleName, r.extensions.String()))
		}
		if resolved := r.loadModuleFromNearestNodeModulesDirectory(false /*typesScopeOnly*/); resolved.stop {
			return r.createResolvedModuleWithFailedLookupLocationsHandlingSymlink(resolved.value)
		}
		if r.extensions&ExtensionsDeclaration != 0 {
			// !!!
			// if resolved := r.resolveFromTypeRoot(); resolved != nil {
			// 	return r.createResolvedModuleWithFailedLookupLocationsHandlingSymlink(resolved)
			// }
		}
	} else {
		candidate := normalizePathForCJSResolution(r.containingDirectory, r.moduleName)
		resolved := r.nodeLoadModuleByRelativeName(r.extensions, candidate, false, true)
		return r.createResolvedModuleWithFailedLookupLocations(
			resolved,
			resolved != nil && strings.Contains(resolved.path, "/node_modules/"),
		)
	}
	return r.createResolvedModuleWithFailedLookupLocations(nil, false)
}

func (r *resolutionState) loadModuleFromSelfNameReference() *resolved {
	directoryPath := tspath.GetNormalizedAbsolutePath(r.containingDirectory, r.resolver.host.GetCurrentDirectory())
	scope := r.getPackageScopeForPath(directoryPath)
	if !scope.Exists() || scope.Contents.Exports.IsFalsy() {
		return nil
	}
	name, ok := scope.Contents.Name.GetValue()
	if !ok {
		return nil
	}
	parts := tspath.GetPathComponents(r.moduleName, "")
	nameParts := tspath.GetPathComponents(name, "")
	if len(parts) < len(nameParts) || !slices.Equal(nameParts, parts[:len(nameParts)]) {
		return nil
	}
	// trailingParts := parts[len(nameParts):]
	// var subpath string
	// if len(trailingParts) > 0 {
	// 	subpath = tspath.CombinePaths(".", trailingParts...)
	// } else {
	// 	subpath = "."
	// }
	// Maybe TODO: splitting extensions into two priorities should be unnecessary, except
	// https://github.com/microsoft/TypeScript/issues/50762 makes the behavior different.
	// As long as that bug exists, we need to do two passes here in self-name loading
	// in order to be consistent with (non-self) library-name loading in
	// `loadModuleFromNearestNodeModulesDirectoryWorker`, which uses two passes in order
	// to prioritize `@types` packages higher up the directory tree over untyped
	// implementation packages. See the selfNameModuleAugmentation.ts test for why this
	// matters.
	//
	// However, there's an exception. If the user has `allowJs` and `declaration`, we need
	// to ensure that self-name imports of their own package can resolve back to their
	// input JS files via `tryLoadInputFileForPath` at a higher priority than their output
	// declaration files, so we need to do a single pass with all extensions for that case.
	if r.compilerOptions.GetAllowJs() && !strings.Contains(r.containingDirectory, "/node_modules/") {
		// !!! return loadModuleFromExports
	}
	// !!!
	// priorityExtensions := r.extensions & (ExtensionsTypeScript | ExtensionsDeclaration)
	// secondaryExtensions := r.extensions & ^(ExtensionsTypeScript | ExtensionsDeclaration)
	// return ...
	return nil
}

func (r *resolutionState) loadModuleFromNearestNodeModulesDirectory(typesScopeOnly bool) searchResult[resolved] {
	mode := core.ResolutionModeCommonJS
	if r.esmMode {
		mode = core.ResolutionModeESM
	}
	// Do (up to) two passes through node_modules:
	//   1. For each ancestor node_modules directory, try to find:
	//      i.  TS/DTS files in the implementation package
	//      ii. DTS files in the @types package
	//   2. For each ancestor node_modules directory, try to find:
	//      i.  JS files in the implementation package
	priorityExtensions := r.extensions & (ExtensionsTypeScript | ExtensionsDeclaration)
	secondaryExtensions := r.extensions & ^(ExtensionsTypeScript | ExtensionsDeclaration)
	// (1)
	if priorityExtensions != 0 {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Searching_all_ancestor_node_modules_directories_for_preferred_extensions_Colon_0.Format(priorityExtensions.String()))
		}
		if result := r.loadModuleFromNearestNodeModulesDirectoryWorker(priorityExtensions, mode, typesScopeOnly); result.stop {
			return result
		}
	}
	// (2)
	if secondaryExtensions != 0 && !typesScopeOnly {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Searching_all_ancestor_node_modules_directories_for_fallback_extensions_Colon_0.Format(secondaryExtensions.String()))
		}
		return r.loadModuleFromNearestNodeModulesDirectoryWorker(secondaryExtensions, mode, typesScopeOnly)
	}
	return newSearchResult[resolved](nil)
}

func (r *resolutionState) loadModuleFromNearestNodeModulesDirectoryWorker(ext extensions, mode core.ResolutionMode, typesScopeOnly bool) searchResult[resolved] {
	result, _ := tspath.ForEachAncestorDirectory(
		r.containingDirectory,
		func(directory string) (searchResult[resolved], bool) {
			// !!! stop at global cache
			if tspath.GetBaseFileName(directory) != "node_modules" {
				if resolutionFromCache := r.tryFindNonRelativeModuleNameInCache(ModeAwareCacheKey{r.moduleName, mode}, directory); resolutionFromCache.stop {
					return resolutionFromCache, true
				}
				result := newSearchResult(r.loadModuleFromImmediateNodeModulesDirectory(ext, directory, typesScopeOnly))
				return result, result.stop
			}
			return newSearchResult[resolved](nil), false
		},
	)
	return result
}

func (r *resolutionState) loadModuleFromImmediateNodeModulesDirectory(extensions extensions, directory string, typesScopeOnly bool) *resolved {
	nodeModulesFolder := tspath.CombinePaths(directory, "node_modules")
	nodeModulesFolderExists := r.resolver.host.DirectoryExists(nodeModulesFolder)
	if !nodeModulesFolderExists && r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it.Format(nodeModulesFolder))
	}

	if !typesScopeOnly {
		if packageResult := r.loadModuleFromSpecificNodeModulesDirectory(extensions, nodeModulesFolder, nodeModulesFolderExists); packageResult != nil {
			return packageResult
		}
	}

	if extensions&ExtensionsDeclaration != 0 {
		nodeModulesAtTypes := tspath.CombinePaths(nodeModulesFolder, "@types")
		nodeModulesAtTypesExists := nodeModulesFolderExists && r.resolver.host.DirectoryExists(nodeModulesAtTypes)
		if !nodeModulesAtTypesExists && r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it.Format(nodeModulesAtTypes))
		}
		return r.loadModuleFromSpecificNodeModulesDirectory(extensions, nodeModulesAtTypes, nodeModulesAtTypesExists)
	}

	return nil
}

func (r *resolutionState) loadModuleFromSpecificNodeModulesDirectory(ext extensions, nodeModulesDirectory string, nodeModulesDirectoryExists bool) *resolved {
	candidate := tspath.NormalizePath(tspath.CombinePaths(nodeModulesDirectory, r.moduleName))
	packageName, rest := ParsePackageName(r.moduleName)
	packageDirectory := tspath.CombinePaths(nodeModulesDirectory, packageName)

	var rootPackageInfo *packagejson.InfoCacheEntry
	// First look for a nested package.json, as in `node_modules/foo/bar/package.json`
	packageInfo := r.getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists)
	// But only if we're not respecting export maps (if we are, we might redirect around this location)
	if rest != "" && packageInfo.Exists() {
		if r.features&NodeResolutionFeaturesExports != 0 {
			rootPackageInfo = r.getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists)
		}
		if !rootPackageInfo.Exists() || rootPackageInfo.Contents.Exports.Type == packagejson.JSONValueTypeNotPresent {
			if fromFile := r.loadModuleFromFile(ext, candidate, !nodeModulesDirectoryExists); fromFile != nil {
				return fromFile
			}

			var (
				versionPaths *packagejson.VersionPaths
				traces       []string
			)
			if packageInfo.Exists() {
				versionPaths, traces = packageInfo.Contents.GetVersionPaths(r.resolver.traceEnabled())
				for _, trace := range traces {
					r.resolver.host.Trace(trace)
				}
			}
			if fromDirectory := r.loadNodeModuleFromDirectoryWorker(ext, candidate, !nodeModulesDirectoryExists, packageInfo, versionPaths); fromDirectory != nil {
				fromDirectory.packageId = r.getPackageId(packageDirectory, packageInfo)
				return fromDirectory
			}
		}
	}

	loader := func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
		if rest != "" || !r.esmMode {
			if fromFile := r.loadModuleFromFile(extensions, candidate, onlyRecordFailures); fromFile != nil {
				fromFile.packageId = r.getPackageId(packageDirectory, packageInfo)
				return fromFile
			}
		}
		var (
			versionPaths *packagejson.VersionPaths
			traces       []string
		)
		if packageInfo.Exists() {
			versionPaths, traces = packageInfo.Contents.GetVersionPaths(r.resolver.traceEnabled())
			for _, trace := range traces {
				r.resolver.host.Trace(trace)
			}
		}
		if fromDirectory := r.loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, packageInfo, versionPaths); fromDirectory != nil {
			fromDirectory.packageId = r.getPackageId(packageDirectory, packageInfo)
			return fromDirectory
		}
		// !!! this is ported exactly, but checking for null seems wrong?
		if packageInfo.Exists() &&
			(packageInfo.Contents.Exports.Type == packagejson.JSONValueTypeNotPresent || packageInfo.Contents.Exports.Type == packagejson.JSONValueTypeNull) &&
			!r.esmMode {
			if indexResult := r.loadModuleFromFile(extensions, tspath.CombinePaths(candidate, "index"), onlyRecordFailures); indexResult != nil {
				indexResult.packageId = r.getPackageId(packageDirectory, packageInfo)
				return indexResult
			}
		}
		return nil
	}

	if rest != "" {
		packageInfo = rootPackageInfo
		if packageInfo == nil {
			// Previous `packageInfo` may have been from a nested package.json; ensure we have the one from the package root now.
			packageInfo = r.getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists)
		}
	}
	if packageInfo != nil {
		r.resolvedPackageDirectory = true
		if r.features&NodeResolutionFeaturesExports != 0 &&
			packageInfo.Exists() &&
			packageInfo.Contents.Exports.Type != packagejson.JSONValueTypeNotPresent {
			// !!!
			return nil
		}
		if rest != "" {
			versionPaths, traces := packageInfo.Contents.GetVersionPaths(r.resolver.traceEnabled())
			for _, trace := range traces {
				r.resolver.host.Trace(trace)
			}
			if versionPaths != nil {
				if r.resolver.traceEnabled() {
					r.resolver.host.Trace(diagnostics.X_package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2.Format(versionPaths.Version, core.Version, rest))
				}
				packageDirectoryExists := nodeModulesDirectoryExists && r.resolver.host.DirectoryExists(packageDirectory)
				pathPatterns := tryParsePatterns(versionPaths.GetPaths())
				if fromPaths := r.tryLoadModuleUsingPaths(ext, rest, packageDirectory, versionPaths.GetPaths(), pathPatterns, loader, !packageDirectoryExists); fromPaths.stop {
					return fromPaths.value
				}
			}
		}
	}
	return loader(ext, candidate, !nodeModulesDirectoryExists)
}

func (r *resolutionState) tryFindNonRelativeModuleNameInCache(nameAndMode ModeAwareCacheKey, directory string) searchResult[resolved] {
	if r.resolver.cache != nil {
		if result, ok := r.resolver.cache.getFromNonRelativeNameCache(nameAndMode, directory, r.compilerOptions); ok {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1.Format(nameAndMode.name, directory))
			}
			r.resultFromCache = result
			if result.IsResolved() {
				// !!! wtf are these types
				return newSearchResult(&resolved{
					path:                     result.ResolvedFileName,
					extension:                result.Extension,
					packageId:                result.PackageId,
					originalPath:             result.OriginalPath,
					resolvedUsingTsExtension: result.ResolvedUsingTsExtension,
				})
			}
		}
	}
	return newSearchResult[resolved](nil)
}

func (r *resolutionState) createResolvedModuleWithFailedLookupLocationsHandlingSymlink(resolved *resolved) *ResolvedModuleWithFailedLookupLocations {
	isExternalLibraryImport := resolved != nil && strings.Contains(resolved.path, "/node_modules/")
	if r.resultFromCache == nil &&
		r.compilerOptions.PreserveSymlinks != core.TSTrue &&
		isExternalLibraryImport &&
		resolved.originalPath == "" &&
		!tspath.IsExternalModuleNameRelative(r.moduleName) {
		originalPath, resolvedFileName := r.getOriginalAndResolvedFileName(resolved.path)
		if originalPath != "" {
			result := *resolved
			result.path = resolvedFileName
			result.originalPath = originalPath
			resolved = &result
		}
	}
	return r.createResolvedModuleWithFailedLookupLocations(resolved, isExternalLibraryImport)
}

func (r *resolutionState) createResolvedModuleWithFailedLookupLocations(resolved *resolved, isExternalLibraryImport bool) *ResolvedModuleWithFailedLookupLocations {
	if r.resultFromCache != nil {
		var result *ResolvedModuleWithFailedLookupLocations
		if !r.resolver.cache.isReadonly() {
			result = r.resultFromCache
		} else {
			cloned := *r.resultFromCache
			result = &cloned
		}
		result.FailedLookupLocations = slices.Concat(result.FailedLookupLocations, r.failedLookupLocations)
		result.AffectingLocations = slices.Concat(result.AffectingLocations, r.affectingLocations)
		result.ResolutionDiagnostics = slices.Concat(result.ResolutionDiagnostics, r.resultFromCache.ResolutionDiagnostics)
		return result
	}
	var resolvedModule ResolvedModule
	if resolved != nil {
		resolvedModule = ResolvedModule{
			ResolvedFileName:         resolved.path,
			OriginalPath:             resolved.originalPath,
			IsExternalLibraryImport:  isExternalLibraryImport,
			ResolvedUsingTsExtension: resolved.resolvedUsingTsExtension,
			Extension:                resolved.extension,
			PackageId:                resolved.packageId,
		}
	}
	return &ResolvedModuleWithFailedLookupLocations{
		WithFailedLookupLocations: WithFailedLookupLocations{
			FailedLookupLocations: r.failedLookupLocations,
			AffectingLocations:    r.affectingLocations,
			ResolutionDiagnostics: r.diagnostics,
		},
		ResolvedModule: resolvedModule,
	}
}

func (r *resolutionState) getOriginalAndResolvedFileName(fileName string) (string, string) {
	resolvedFileName := r.realPath(fileName)
	comparePathsOptions := tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: r.resolver.host.UseCaseSensitiveFileNames(),
		CurrentDirectory:          r.resolver.host.GetCurrentDirectory(),
	}
	if tspath.ComparePaths(fileName, resolvedFileName, comparePathsOptions) == 0 {
		// If the fileName and realpath are differing only in casing, prefer fileName
		// so that we can issue correct errors for casing under forceConsistentCasingInFileNames
		return "", fileName
	}
	return fileName, resolvedFileName
}

func (r *resolutionState) tryLoadModuleUsingOptionalResolutionSettings() *resolved {
	return r.tryLoadModuleUsingPathsIfEligible().value
}

func (r *resolutionState) tryLoadModuleUsingPathsIfEligible() searchResult[resolved] {
	if len(r.compilerOptions.Paths) > 0 && !tspath.PathIsRelative(r.moduleName) {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.X_paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0.Format(r.moduleName))
		}
	}
	baseDirectory := getPathsBasePath(r.compilerOptions, r.resolver.host.GetCurrentDirectory())
	pathPatterns := tryParsePatterns(r.compilerOptions.Paths)
	return r.tryLoadModuleUsingPaths(
		r.extensions,
		r.moduleName,
		baseDirectory,
		r.compilerOptions.Paths,
		pathPatterns,
		func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
			return r.nodeLoadModuleByRelativeName(extensions, candidate, onlyRecordFailures, true /*considerPackageJson*/)
		},
		false, /*onlyRecordFailures*/
	)
}

func (r *resolutionState) tryLoadModuleUsingPaths(extensions extensions, moduleName string, containingDirectory string, paths map[string][]string, pathPatterns parsedPatterns, loader resolutionKindSpecificLoader, onlyRecordFailures bool) searchResult[resolved] {
	if matchedPattern := matchPatternOrExact(pathPatterns, moduleName); matchedPattern.IsValid() {
		matchedStar := matchedPattern.MatchedText(moduleName)
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Module_name_0_matched_pattern_1.Format(moduleName, matchedPattern.Text))
		}
		for _, subst := range paths[matchedPattern.Text] {
			path := strings.Replace(subst, "*", matchedStar, 1)
			candidate := tspath.NormalizePath(tspath.CombinePaths(containingDirectory, path))
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Trying_substitution_0_candidate_module_location_Colon_1.Format(subst, path))
			}
			// A path mapping may have an extension
			if extension := tspath.TryGetExtensionFromPath(subst); extension != "" {
				if path, ok := r.tryFile(candidate, onlyRecordFailures /*onlyRecordFailures*/); ok {
					return newSearchResult(&resolved{
						path:      path,
						extension: extension,
					})
				}
			}
			if resolved := loader(extensions, candidate, onlyRecordFailures || !r.resolver.host.DirectoryExists(tspath.GetDirectoryPath(candidate))); resolved != nil {
				return newSearchResult(resolved)
			}
		}
	}
	return newSearchResult[resolved](nil)
}

func (r *resolutionState) nodeLoadModuleByRelativeName(extensions extensions, candidate string, onlyRecordFailures bool, considerPackageJson bool) *resolved {
	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_types_Colon_1.Format(candidate, extensions.String()))
	}
	if !tspath.HasTrailingDirectorySeparator(candidate) {
		if !onlyRecordFailures {
			parentOfCandidate := tspath.GetDirectoryPath(candidate)
			if !r.resolver.host.DirectoryExists(parentOfCandidate) {
				if r.resolver.traceEnabled() {
					r.resolver.host.Trace(diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it.Format(parentOfCandidate))
				}
				onlyRecordFailures = true
			}
		}
		resolvedFromFile := r.loadModuleFromFile(extensions, candidate, onlyRecordFailures)
		if resolvedFromFile != nil {
			if considerPackageJson {
				if packageDirectory := ParseNodeModuleFromPath(resolvedFromFile.path /*isFolder*/, false); packageDirectory != "" {
					resolvedFromFile.packageId = r.getPackageId(resolvedFromFile.path, r.getPackageJsonInfo(packageDirectory /*onlyRecordFailures*/, false))
				}
			}
			return resolvedFromFile
		}
	}
	if !onlyRecordFailures {
		candidateExists := r.resolver.host.DirectoryExists(candidate)
		if !candidateExists {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it.Format(candidate))
			}
			onlyRecordFailures = true
		}
	}
	// esm mode relative imports shouldn't do any directory lookups (either inside `package.json`
	// files or implicit `index.js`es). This is a notable departure from cjs norms, where `./foo/pkg`
	// could have been redirected by `./foo/pkg/package.json` to an arbitrary location!
	if !r.esmMode {
		return r.loadNodeModuleFromDirectory(extensions, candidate, onlyRecordFailures, considerPackageJson)
	}
	return nil
}

func (r *resolutionState) loadModuleFromFile(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
	// ./foo.js -> ./foo.ts
	resolvedByReplacingExtension := r.loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures)
	if resolvedByReplacingExtension != nil {
		return resolvedByReplacingExtension
	}

	// ./foo -> ./foo.ts
	if !r.esmMode {
		return r.tryAddingExtensions(candidate, extensions, "", onlyRecordFailures)
	}

	return nil
}

func (r *resolutionState) loadModuleFromFileNoImplicitExtensions(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
	base := path.Base(candidate)
	if !strings.Contains(base, ".") {
		return nil // extensionless import, no lookups performed, since we don't support extensionless files
	}
	extensionless := tspath.RemoveFileExtension(candidate)
	if extensionless == candidate {
		// Once TS native extensions are handled, handle arbitrary extensions for declaration file mapping
		extensionless = candidate[:strings.LastIndex(candidate, ".")]
	}

	extension := candidate[len(extensionless):]
	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.File_name_0_has_a_1_extension_stripping_it.Format(candidate, extension))
	}
	return r.tryAddingExtensions(extensionless, extensions, extension, onlyRecordFailures)
}

func (r *resolutionState) tryAddingExtensions(extensionless string, extensions extensions, originalExtension string, onlyRecordFailures bool) *resolved {
	if !onlyRecordFailures {
		directory := tspath.GetDirectoryPath(extensionless)
		onlyRecordFailures = directory != "" && !r.resolver.host.DirectoryExists(directory)
	}

	switch originalExtension {
	case tspath.ExtensionMjs, tspath.ExtensionMts, tspath.ExtensionDmts:
		if extensions&ExtensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionMts, extensionless, originalExtension == tspath.ExtensionMts || originalExtension == tspath.ExtensionDmts, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDmts, extensionless, originalExtension == tspath.ExtensionMts || originalExtension == tspath.ExtensionDmts, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionMjs, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		return nil
	case tspath.ExtensionCjs, tspath.ExtensionCts, tspath.ExtensionDcts:
		if extensions&ExtensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionCts, extensionless, originalExtension == tspath.ExtensionCts || originalExtension == tspath.ExtensionDcts, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDcts, extensionless, originalExtension == tspath.ExtensionCts || originalExtension == tspath.ExtensionDcts, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionCjs, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		return nil
	case tspath.ExtensionJson:
		if extensions&ExtensionsDeclaration != 0 {
			if resolved := r.tryExtension(".d.json.ts", extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsJson != 0 {
			if resolved := r.tryExtension(tspath.ExtensionJson, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		return nil
	case tspath.ExtensionTsx, tspath.ExtensionJsx:
		// basically idendical to the ts/js case below, but prefers matching tsx and jsx files exactly before falling back to the ts or js file path
		// (historically, we disallow having both a a.ts and a.tsx file in the same compilation, since their outputs clash)
		// TODO: We should probably error if `"./a.tsx"` resolved to `"./a.ts"`, right?
		if extensions&ExtensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionTsx, extensionless, originalExtension == tspath.ExtensionTsx, onlyRecordFailures); resolved != nil {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionTs, extensionless, originalExtension == tspath.ExtensionTsx, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDts, extensionless, originalExtension == tspath.ExtensionTsx, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionJsx, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionJs, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		return nil
	case tspath.ExtensionTs, tspath.ExtensionDts, tspath.ExtensionJs, "":
		if extensions&ExtensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionTs, extensionless, originalExtension == tspath.ExtensionTs || originalExtension == tspath.ExtensionDts, onlyRecordFailures); resolved != nil {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionTsx, extensionless, originalExtension == tspath.ExtensionTs || originalExtension == tspath.ExtensionDts, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDts, extensionless, originalExtension == tspath.ExtensionTs || originalExtension == tspath.ExtensionDts, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if extensions&ExtensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionJs, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionJsx, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		if r.isConfigLookup {
			if resolved := r.tryExtension(tspath.ExtensionJson, extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		return nil
	default:
		if extensions&ExtensionsDeclaration != 0 && !tspath.IsDeclarationFileName(extensionless+originalExtension) {
			if resolved := r.tryExtension(".d"+originalExtension+".ts", extensionless, false, onlyRecordFailures); resolved != nil {
				return resolved
			}
		}
		return nil
	}
}

func (r *resolutionState) tryExtension(extension string, extensionless string, resolvedUsingTsExtension bool, onlyRecordFailures bool) *resolved {
	fileName := extensionless + extension
	if path, ok := r.tryFile(fileName, onlyRecordFailures); ok {
		return &resolved{
			path:                     path,
			extension:                extension,
			resolvedUsingTsExtension: !r.candidateIsFromPackageJsonField && resolvedUsingTsExtension,
		}
	}
	return nil
}

func (r *resolutionState) tryFile(fileName string, onlyRecordFailures bool) (string, bool) {
	if len(r.compilerOptions.ModuleSuffixes) == 0 {
		return fileName, r.tryFileLookup(fileName, onlyRecordFailures)
	}

	ext := tspath.TryGetExtensionFromPath(fileName)
	fileNameNoExtension := tspath.RemoveExtension(fileName, ext)
	for _, suffix := range r.compilerOptions.ModuleSuffixes {
		path := fileNameNoExtension + suffix + ext
		if r.tryFileLookup(path, onlyRecordFailures) {
			return path, true
		}
	}
	return fileName, false
}

func (r *resolutionState) tryFileLookup(fileName string, onlyRecordFailures bool) bool {
	if !onlyRecordFailures {
		if r.resolver.host.FileExists(fileName) {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.File_0_exists_use_it_as_a_name_resolution_result.Format(fileName))
			}
			return true
		} else if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.File_0_does_not_exist.Format(fileName))
		}
	}
	r.failedLookupLocations = append(r.failedLookupLocations, fileName)
	return false
}

func (r *resolutionState) loadNodeModuleFromDirectory(extensions extensions, candidate string, onlyRecordFailures bool, considerPackageJson bool) *resolved {
	var (
		packageInfo  *packagejson.InfoCacheEntry
		versionPaths *packagejson.VersionPaths
	)

	if considerPackageJson {
		packageInfo = r.getPackageJsonInfo(candidate, onlyRecordFailures)
		if packageInfo.Exists() {
			var traces []string
			versionPaths, traces = packageInfo.Contents.GetVersionPaths(r.resolver.traceEnabled())
			for _, trace := range traces {
				r.resolver.host.Trace(trace)
			}
		}
	}

	return r.loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, packageInfo, versionPaths)
}

func (r *resolutionState) loadNodeModuleFromDirectoryWorker(ext extensions, candidate string, onlyRecordFailures bool, packageInfo *packagejson.InfoCacheEntry, versionPaths *packagejson.VersionPaths) *resolved {
	var (
		packageFile                      string
		onlyRecordFailuresForPackageFile bool
	)
	if packageInfo != nil {
		if file, ok := r.getPackageFile(ext, packageInfo); ok {
			packageFile = file
			onlyRecordFailuresForPackageFile = !r.resolver.host.DirectoryExists(tspath.GetDirectoryPath(file))
		}
	}

	loader := func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
		if fromFile := r.loadFileNameFromPackageJSONField(extensions, candidate, packageFile, onlyRecordFailures); fromFile != nil {
			return fromFile
		}

		// Even if `extensions == ExtensionsDeclaration`, we can still look up a .ts file as a result of package.json "types"
		// !!! should we not set this before the filename lookup above?
		expandedExtensions := extensions
		if extensions == ExtensionsDeclaration {
			expandedExtensions = ExtensionsTypeScript | ExtensionsDeclaration
		}

		// Disable `esmMode` for the resolution of the package path for CJS-mode packages (so the `main` field can omit extensions)
		saveESMMode := r.esmMode
		saveCandidateIsFromPackageJsonField := r.candidateIsFromPackageJsonField
		r.candidateIsFromPackageJsonField = true
		if packageInfo.Exists() && packageInfo.Contents.Type.Value != "module" {
			r.esmMode = false
		}
		result := r.nodeLoadModuleByRelativeName(expandedExtensions, candidate, onlyRecordFailures, false /*considerPackageJson*/)
		r.esmMode = saveESMMode
		r.candidateIsFromPackageJsonField = saveCandidateIsFromPackageJsonField
		return result
	}

	var indexPath string
	if r.isConfigLookup {
		indexPath = tspath.CombinePaths(candidate, "tsconfig")
	} else {
		indexPath = tspath.CombinePaths(candidate, "index")
	}

	if versionPaths != nil && (packageFile == "" || tspath.ContainsPath(candidate, packageFile, tspath.ComparePathsOptions{})) {
		var moduleName string
		if packageFile != "" {
			moduleName = tspath.GetRelativePathFromDirectory(candidate, packageFile, tspath.ComparePathsOptions{})
		} else {
			moduleName = tspath.GetRelativePathFromDirectory(candidate, indexPath, tspath.ComparePathsOptions{})
		}
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.X_package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2.Format(versionPaths.Version, core.Version, moduleName))
		}
		pathPatterns := tryParsePatterns(versionPaths.GetPaths())
		if result := r.tryLoadModuleUsingPaths(ext, moduleName, candidate, versionPaths.GetPaths(), pathPatterns, loader, onlyRecordFailuresForPackageFile); result.stop {
			if result.value.packageId.Name != "" {
				// !!! are these asserts really necessary?
				panic("expected packageId to be empty")
			}
			return result.value
		}
	}

	if packageFile != "" {
		if packageFileResult := loader(ext, candidate, onlyRecordFailuresForPackageFile); packageFileResult != nil {
			if packageFileResult.packageId.Name != "" {
				// !!! are these asserts really necessary?
				panic("expected packageId to be empty")
			}
			return packageFileResult
		}
	}

	// ESM mode resolutions don't do package 'index' lookups
	if !r.esmMode {
		return r.loadModuleFromFile(ext, indexPath, onlyRecordFailures || !r.resolver.host.DirectoryExists(candidate))
	}
	return nil
}

// This function is only ever called with paths written in package.json files - never
// module specifiers written in source files - and so it always allows the
// candidate to end with a TS extension (but will also try substituting a JS extension for a TS extension).
func (r *resolutionState) loadFileNameFromPackageJSONField(extensions extensions, candidate string, packageJSONValue string, onlyRecordFailures bool) *resolved {
	if extensions&ExtensionsTypeScript != 0 && tspath.HasImplementationTSFileExtension(candidate) || extensions&ExtensionsDeclaration != 0 && tspath.IsDeclarationFileName(candidate) {
		if path, ok := r.tryFile(candidate, onlyRecordFailures); ok {
			extension := tspath.TryExtractTSExtension(path)
			return &resolved{
				path:                     path,
				extension:                extension,
				resolvedUsingTsExtension: strings.HasSuffix(packageJSONValue, extension),
			}
		}
	}

	if r.isConfigLookup && extensions&ExtensionsJson != 0 && tspath.FileExtensionIs(candidate, tspath.ExtensionJson) {
		if path, ok := r.tryFile(candidate, onlyRecordFailures); ok {
			return &resolved{
				path:      path,
				extension: tspath.ExtensionJson,
			}
		}
	}

	return r.loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures)
}

func (r *resolutionState) getPackageFile(extensions extensions, packageInfo *packagejson.InfoCacheEntry) (string, bool) {
	if !packageInfo.Exists() {
		return "", false
	}
	if r.isConfigLookup {
		return r.getPackageJSONPathField("tsconfig", &packageInfo.Contents.TSConfig, packageInfo.PackageDirectory)
	}
	if extensions&ExtensionsDeclaration != 0 {
		if packageFile, ok := r.getPackageJSONPathField("typings", &packageInfo.Contents.Typings, packageInfo.PackageDirectory); ok {
			return packageFile, ok
		}
		if packageFile, ok := r.getPackageJSONPathField("types", &packageInfo.Contents.Types, packageInfo.PackageDirectory); ok {
			return packageFile, ok
		}
	}
	if extensions&(ExtensionsImplementationFiles|ExtensionsDeclaration) != 0 {
		return r.getPackageJSONPathField("main", &packageInfo.Contents.Main, packageInfo.PackageDirectory)
	}
	return "", false
}

func (r *resolutionState) getPackageJsonInfo(packageDirectory string, onlyRecordFailures bool) *packagejson.InfoCacheEntry {
	packageJsonPath := tspath.CombinePaths(packageDirectory, "package.json")
	if onlyRecordFailures {
		r.failedLookupLocations = append(r.failedLookupLocations, packageJsonPath)
		return nil
	}

	var packageJsonInfoCache *packagejson.InfoCache
	if r.resolver.cache != nil {
		if packageJsonInfoCache = r.resolver.cache.getPackageJsonInfoCache(); packageJsonInfoCache != nil {
			if existing := packageJsonInfoCache.Get(packageJsonPath); existing != nil {
				if existing.Contents != nil {
					if r.resolver.traceEnabled() {
						r.resolver.host.Trace(diagnostics.File_0_exists_according_to_earlier_cached_lookups.Format(packageJsonPath))
					}
					r.affectingLocations = append(r.affectingLocations, packageJsonPath)
					if existing.PackageDirectory == packageDirectory {
						return existing
					}
					// https://github.com/microsoft/TypeScript/pull/50740
					return &packagejson.InfoCacheEntry{
						PackageDirectory: packageDirectory,
						DirectoryExists:  true,
						Contents:         existing.Contents,
					}
				} else {
					if existing.DirectoryExists && r.resolver.traceEnabled() {
						r.resolver.host.Trace(diagnostics.File_0_does_not_exist_according_to_earlier_cached_lookups.Format(packageJsonPath))
					}
					r.failedLookupLocations = append(r.failedLookupLocations, packageJsonPath)
					return nil
				}
			}
		}
	}

	directoryExists := r.resolver.host.DirectoryExists(packageDirectory)
	if directoryExists && r.resolver.host.FileExists(packageJsonPath) {
		// Ignore error
		packageJsonContent, _ := packagejson.Parse([]byte(r.resolver.host.ReadFile(packageJsonPath)))
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Found_package_json_at_0.Format(packageJsonPath))
		}
		result := &packagejson.InfoCacheEntry{
			PackageDirectory: packageDirectory,
			DirectoryExists:  true,
			Contents: &packagejson.PackageJson{
				Fields: packageJsonContent,
			},
		}
		if packageJsonInfoCache != nil && !packageJsonInfoCache.IsReadonly {
			packageJsonInfoCache.Set(packageJsonPath, result)
		}
		r.affectingLocations = append(r.affectingLocations, packageJsonPath)
		return result
	} else {
		if directoryExists && r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.File_0_does_not_exist.Format(packageJsonPath))
		}
		if packageJsonInfoCache != nil && !packageJsonInfoCache.IsReadonly {
			packageJsonInfoCache.Set(packageJsonPath, &packagejson.InfoCacheEntry{
				PackageDirectory: packageDirectory,
				DirectoryExists:  directoryExists,
			})
		}
		r.failedLookupLocations = append(r.failedLookupLocations, packageJsonPath)
	}
	return nil
}

func (r *resolutionState) getPackageId(resolvedFileName string, packageInfo *packagejson.InfoCacheEntry) PackageId {
	if packageInfo.Exists() {
		packageJsonContent := packageInfo.Contents
		if name, ok := packageJsonContent.Name.GetValue(); ok {
			if version, ok := packageJsonContent.Version.GetValue(); ok {
				var subModuleName string
				if len(resolvedFileName) > len(packageInfo.PackageDirectory) {
					subModuleName = resolvedFileName[len(packageInfo.PackageDirectory)+1:]
				}
				return PackageId{
					Name:             name,
					Version:          version,
					SubModuleName:    subModuleName,
					PeerDependencies: r.readPackageJsonPeerDependencies(packageInfo),
				}
			}
		}
	}
	return PackageId{}
}

func (r *resolutionState) readPackageJsonPeerDependencies(packageJsonInfo *packagejson.InfoCacheEntry) string {
	peerDependencies := packageJsonInfo.Contents.PeerDependencies
	ok := r.validatePackageJSONField("peerDependencies", &peerDependencies)
	if !ok || len(peerDependencies.Value) == 0 {
		return ""
	}
	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.X_package_json_has_a_peerDependencies_field.Message())
	}
	packageDirectory := r.realPath(packageJsonInfo.PackageDirectory)
	nodeModules := packageDirectory[:strings.LastIndex(packageDirectory, "/node_modules")+len("/node_modules")] + "/"
	builder := strings.Builder{}
	for name := range peerDependencies.Value {
		peerPackageJson := r.getPackageJsonInfo(nodeModules+name /*onlyRecordFailures*/, false)
		if peerPackageJson != nil {
			version := peerPackageJson.Contents.Version.Value
			builder.WriteString("+")
			builder.WriteString(name)
			builder.WriteString("@")
			builder.WriteString(version)
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Found_peerDependency_0_with_1_version.Format(name, version))
			}
		} else if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Failed_to_find_peerDependency_0.Format(name))
		}
	}
	return builder.String()
}

func (r *resolutionState) realPath(path string) string {
	rp := tspath.NormalizePath(r.resolver.host.Realpath(path))
	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Resolving_real_path_for_0_result_1.Format(path, rp))
	}
	return rp
}

func (r *resolutionState) validatePackageJSONField(fieldName string, field packagejson.TypeValidatedField) bool {
	if field.IsPresent() {
		if field.IsValid() {
			return true
		}
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2.Format(fieldName, field.ExpectedJSONType(), field.ActualJSONType()))
		}
	}
	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.X_package_json_does_not_have_a_0_field.Format(fieldName))
	}
	return false
}

func (r *resolutionState) getPackageJSONPathField(fieldName string, field *packagejson.Expected[string], directory string) (string, bool) {
	if !r.validatePackageJSONField(fieldName, field) {
		return "", false
	}
	if field.Value == "" {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.X_package_json_had_a_falsy_0_field.Format(fieldName))
		}
		return "", false
	}
	path := tspath.NormalizePath(tspath.CombinePaths(directory, field.Value))
	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.X_package_json_has_0_field_1_that_references_2.Format(fieldName, field.Value, path))
	}
	return path, true
}

func getConditions(options *core.CompilerOptions, resolutionMode core.ResolutionMode) []string {
	moduleResolution := options.GetModuleResolutionKind()
	if resolutionMode == core.ModuleKindNone && moduleResolution == core.ModuleResolutionKindBundler {
		resolutionMode = core.ModuleKindESNext
	}
	conditions := make([]string, 0, 3+len(options.CustomConditions))
	if resolutionMode == core.ModuleKindESNext {
		conditions = append(conditions, "import")
	} else {
		conditions = append(conditions, "require")
	}

	if options.NoDtsResolution != core.TSTrue {
		conditions = append(conditions, "types")
	}
	if moduleResolution != core.ModuleResolutionKindBundler {
		conditions = append(conditions, "node")
	}
	conditions = core.Concatenate(conditions, options.CustomConditions)
	return conditions
}

func getNodeResolutionFeatures(options *core.CompilerOptions) NodeResolutionFeatures {
	features := NodeResolutionFeaturesNone

	switch options.GetModuleResolutionKind() {
	case core.ModuleResolutionKindNode16:
		features = NodeResolutionFeaturesNode16Default
	case core.ModuleResolutionKindNodeNext:
		features = NodeResolutionFeaturesNodeNextDefault
	case core.ModuleResolutionKindBundler:
		features = NodeResolutionFeaturesBundlerDefault
	}
	if options.ResolvePackageJsonExports == core.TSTrue {
		features |= NodeResolutionFeaturesExports
	} else if options.ResolvePackageJsonExports == core.TSFalse {
		features &^= NodeResolutionFeaturesExports
	}
	if options.ResolvePackageJsonImports == core.TSTrue {
		features |= NodeResolutionFeaturesImports
	} else if options.ResolvePackageJsonImports == core.TSFalse {
		features &^= NodeResolutionFeaturesImports
	}
	return features
}

func moveToNextDirectorySeparatorIfAvailable(path string, prevSeparatorIndex int, isFolder bool) int {
	nextSeparatorIndex := strings.Index(path[prevSeparatorIndex+1:], "/")
	if nextSeparatorIndex == -1 {
		if isFolder {
			return len(path)
		}
		return prevSeparatorIndex
	}
	return nextSeparatorIndex
}

func getPathsBasePath(options *core.CompilerOptions, currentDirectory string) string {
	if len(options.Paths) == 0 {
		return ""
	}
	if options.PathsBasePath != "" {
		return options.PathsBasePath
	}
	return currentDirectory
}

type parsedPatterns struct {
	matchableStringSet collections.OrderedSet[string]
	patterns           []core.Pattern
}

func tryParsePatterns(paths map[string][]string) parsedPatterns {
	// !!! TS has a weakmap cache
	// We could store a cache on Resolver, but maybe we can wait and profile
	matchableStringSet := collections.OrderedSet[string]{}
	patterns := make([]core.Pattern, 0, len(paths))
	for path := range paths {
		if pattern := core.TryParsePattern(path); pattern.IsValid() {
			if pattern.StarIndex == -1 {
				matchableStringSet.Add(path)
			} else {
				patterns = append(patterns, pattern)
			}
		}
	}
	return parsedPatterns{
		matchableStringSet: matchableStringSet,
		patterns:           patterns,
	}
}

func matchPatternOrExact(patterns parsedPatterns, candidate string) core.Pattern {
	if patterns.matchableStringSet.Has(candidate) {
		return core.Pattern{
			Text:      candidate,
			StarIndex: -1,
		}
	}
	if len(patterns.patterns) == 0 {
		return core.Pattern{}
	}
	return core.FindBestPatternMatch(patterns.patterns, candidate)
}

// If you import from "." inside a containing directory "/foo", the result of `tspath.NormalizePath`
// would be "/foo", but this loses the information that `foo` is a directory and we intended
// to look inside of it. The Node CommonJS resolution algorithm doesn't call this out
// (https://nodejs.org/api/modules.html#all-together), but it seems that module paths ending
// in `.` are actually normalized to `./` before proceeding with the resolution algorithm.
func normalizePathForCJSResolution(containingDirectory string, moduleName string) string {
	combined := tspath.CombinePaths(containingDirectory, moduleName)
	parts := tspath.GetPathComponents(combined, "")
	lastPart := parts[len(parts)-1]
	if lastPart == "." || lastPart == ".." {
		return tspath.EnsureTrailingDirectorySeparator(tspath.NormalizePath(combined))
	}
	return tspath.NormalizePath(combined)
}
