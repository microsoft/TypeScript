package module

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type resolved struct {
	path                     string
	extension                string
	packageId                PackageId
	originalPath             string
	resolvedUsingTsExtension bool
}

func (r *resolved) shouldContinueSearching() bool {
	return r == nil
}

func (r *resolved) isResolved() bool {
	return r != nil && r.path != ""
}

func continueSearching() *resolved {
	return nil
}

type resolutionKindSpecificLoader = func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved

type resolutionState struct {
	resolver *Resolver

	// request fields
	name                string
	containingDirectory string
	isConfigLookup      bool
	features            NodeResolutionFeatures
	esmMode             bool
	conditions          []string
	extensions          extensions
	compilerOptions     *core.CompilerOptions

	// state fields
	candidateIsFromPackageJsonField bool
	resolvedPackageDirectory        bool
	failedLookupLocations           []string
	affectingLocations              []string
	diagnostics                     []ast.Diagnostic
}

func newResolutionState(
	name string,
	containingDirectory string,
	isTypeReferenceDirective bool,
	resolutionMode core.ResolutionMode,
	compilerOptions *core.CompilerOptions,
	redirectedReference *ResolvedProjectReference,
	resolver *Resolver,
) *resolutionState {
	state := &resolutionState{
		name:                name,
		containingDirectory: containingDirectory,
		compilerOptions:     compilerOptions,
		resolver:            resolver,
	}

	if redirectedReference != nil {
		state.compilerOptions = redirectedReference.CommandLine.CompilerOptions
	}

	if isTypeReferenceDirective {
		state.extensions = extensionsDeclaration
	} else if compilerOptions.NoDtsResolution == core.TSTrue {
		state.extensions = extensionsImplementationFiles
	} else {
		state.extensions = extensionsTypeScript | extensionsJavaScript | extensionsDeclaration
	}

	if !isTypeReferenceDirective && compilerOptions.GetResolveJsonModule() {
		state.extensions |= extensionsJson
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
	caches
	host            ResolutionHost
	compilerOptions *core.CompilerOptions
	// reportDiagnostic: DiagnosticReporter
}

func NewResolver(
	host ResolutionHost,
	options *core.CompilerOptions,
) *Resolver {
	return &Resolver{
		host:            host,
		caches:          newCaches(host.GetCurrentDirectory(), host.FS().UseCaseSensitiveFileNames(), options),
		compilerOptions: options,
	}
}

func (r *Resolver) traceEnabled() bool {
	return r.compilerOptions.TraceResolution == core.TSTrue
}

func (r *Resolver) GetPackageScopeForPath(directory string) *packagejson.InfoCacheEntry {
	return (&resolutionState{compilerOptions: r.compilerOptions, resolver: r}).getPackageScopeForPath(directory)
}

func (r *Resolver) GetPackageJsonTypeIfApplicable(path string) string {
	if tspath.FileExtensionIsOneOf(path, []string{tspath.ExtensionMts, tspath.ExtensionCts, tspath.ExtensionMjs, tspath.ExtensionCjs}) {
		return ""
	}

	var moduleResolutionKind core.ModuleResolutionKind
	if r.compilerOptions != nil {
		moduleResolutionKind = r.compilerOptions.GetModuleResolutionKind()
	}

	var packageJsonType string
	shouldLookupFromPackageJson := core.ModuleResolutionKindNode16 <= moduleResolutionKind && moduleResolutionKind <= core.ModuleResolutionKindNodeNext || strings.Contains(path, "/node_modules/")
	if shouldLookupFromPackageJson {
		packageJsonScope := r.GetPackageScopeForPath(tspath.GetDirectoryPath(path))
		if packageJsonScope.Exists() {
			packageJsonType, _ = packageJsonScope.Contents.Type.GetValue()
		}
	}

	return packageJsonType
}

func (r *Resolver) ResolveTypeReferenceDirective(typeReferenceDirectiveName string, containingFile string, resolutionMode core.ResolutionMode, redirectedReference *ResolvedProjectReference) *ResolvedTypeReferenceDirective {
	traceEnabled := r.traceEnabled()

	compilerOptions := r.compilerOptions
	if redirectedReference != nil {
		compilerOptions = redirectedReference.CommandLine.CompilerOptions
	}

	containingDirectory := tspath.GetDirectoryPath(containingFile)

	typeRoots, fromConfig := compilerOptions.GetEffectiveTypeRoots(r.host.GetCurrentDirectory())
	if traceEnabled {
		r.host.Trace(diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_2.Format(typeReferenceDirectiveName, containingFile, strings.Join(typeRoots, ",")))
		if redirectedReference != nil {
			r.host.Trace(diagnostics.Using_compiler_options_of_project_reference_redirect_0.Format(redirectedReference.SourceFile.FileName()))
		}
	}

	state := newResolutionState(typeReferenceDirectiveName, containingDirectory, true /*isTypeReferenceDirective*/, resolutionMode, compilerOptions, redirectedReference, r)
	result := state.resolveTypeReferenceDirective(typeRoots, fromConfig, strings.HasSuffix(containingFile, InferredTypesContainingFile))

	if traceEnabled {
		r.traceTypeReferenceDirectiveResult(typeReferenceDirectiveName, result)
	}
	return result
}

func (r *Resolver) ResolveModuleName(moduleName string, containingFile string, resolutionMode core.ResolutionMode, redirectedReference *ResolvedProjectReference) *ResolvedModule {
	traceEnabled := r.traceEnabled()

	compilerOptions := r.compilerOptions
	if redirectedReference != nil {
		compilerOptions = redirectedReference.CommandLine.CompilerOptions
	}

	if traceEnabled {
		r.host.Trace(diagnostics.Resolving_module_0_from_1.Format(moduleName, containingFile))
		if redirectedReference != nil {
			r.host.Trace(diagnostics.Using_compiler_options_of_project_reference_redirect_0.Format(redirectedReference.SourceFile.FileName()))
		}
	}
	containingDirectory := tspath.GetDirectoryPath(containingFile)

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

	var result *ResolvedModule
	switch moduleResolution {
	case core.ModuleResolutionKindNode16, core.ModuleResolutionKindNodeNext, core.ModuleResolutionKindBundler:
		state := newResolutionState(moduleName, containingDirectory, false /*isTypeReferenceDirective*/, resolutionMode, compilerOptions, redirectedReference, r)
		result = state.resolveNodeLike()
	default:
		panic(fmt.Sprintf("Unexpected moduleResolution: %d", moduleResolution))
	}

	if traceEnabled {
		if result.IsResolved() {
			if result.PackageId.Name != "" {
				r.host.Trace(diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2.Format(moduleName, result.ResolvedFileName, result.PackageId.String()))
			} else {
				r.host.Trace(diagnostics.Module_name_0_was_successfully_resolved_to_1.Format(moduleName, result.ResolvedFileName))
			}
		} else {
			r.host.Trace(diagnostics.Module_name_0_was_not_resolved.Format(moduleName))
		}
	}

	return result
}

func (r *Resolver) resolveConfig(moduleName string, containingFile string) *ResolvedModule {
	containingDirectory := tspath.GetDirectoryPath(containingFile)
	state := newResolutionState(moduleName, containingDirectory, false /*isTypeReferenceDirective*/, core.ModuleKindCommonJS, r.compilerOptions, nil, r)
	state.isConfigLookup = true
	state.extensions = extensionsJson
	return state.resolveNodeLike()
}

func (r *Resolver) traceTypeReferenceDirectiveResult(typeReferenceDirectiveName string, result *ResolvedTypeReferenceDirective) {
	if !result.IsResolved() {
		r.host.Trace(diagnostics.Type_reference_directive_0_was_not_resolved.Format(typeReferenceDirectiveName))
	} else if result.PackageId.Name != "" {
		r.host.Trace(diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3.Format(
			typeReferenceDirectiveName,
			result.ResolvedFileName,
			result.PackageId.String(),
			result.Primary,
		))
	} else {
		r.host.Trace(diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2.Format(
			typeReferenceDirectiveName,
			result.ResolvedFileName,
			result.Primary,
		))
	}
}

func (r *resolutionState) resolveTypeReferenceDirective(typeRoots []string, fromConfig bool, fromInferredTypesContainingFile bool) *ResolvedTypeReferenceDirective {
	// Primary lookup
	if len(typeRoots) > 0 {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Resolving_with_primary_search_path_0.Format(strings.Join(typeRoots, ", ")))
		}
		for _, typeRoot := range typeRoots {
			candidate := r.getCandidateFromTypeRoot(typeRoot)
			directoryExists := r.resolver.host.FS().DirectoryExists(candidate)
			if !directoryExists && r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it.Format(typeRoot))
			}
			if fromConfig {
				// Custom typeRoots resolve as file or directory just like we do modules
				if resolvedFromFile := r.loadModuleFromFile(extensionsDeclaration, candidate, !directoryExists); !resolvedFromFile.shouldContinueSearching() {
					packageDirectory := ParseNodeModuleFromPath(resolvedFromFile.path, false)
					if packageDirectory != "" {
						resolvedFromFile.packageId = r.getPackageId(resolvedFromFile.path, r.getPackageJsonInfo(packageDirectory, false /*onlyRecordFailures*/))
					}
					return r.createResolvedTypeReferenceDirective(resolvedFromFile, true /*primary*/)
				}
			}
			if resolvedFromDirectory := r.loadNodeModuleFromDirectory(extensionsDeclaration, candidate, !directoryExists, true /*considerPackageJson*/); !resolvedFromDirectory.shouldContinueSearching() {
				return r.createResolvedTypeReferenceDirective(resolvedFromDirectory, true /*primary*/)
			}
		}
	} else if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths.Format())
	}

	// Secondary lookup
	var resolved *resolved
	if !fromConfig || !fromInferredTypesContainingFile {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Looking_up_in_node_modules_folder_initial_location_0.Format(r.containingDirectory))
		}
		if !tspath.IsExternalModuleNameRelative(r.name) {
			resolved = r.loadModuleFromNearestNodeModulesDirectory(false /*typesScopeOnly*/)
		} else {
			candidate := normalizePathForCJSResolution(r.containingDirectory, r.name)
			resolved = r.nodeLoadModuleByRelativeName(extensionsDeclaration, candidate, false /*onlyRecordFailures*/, true /*considerPackageJson*/)
		}
	} else if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Resolving_type_reference_directive_for_program_that_specifies_custom_typeRoots_skipping_lookup_in_node_modules_folder.Format())
	}
	return r.createResolvedTypeReferenceDirective(resolved, false /*primary*/)
}

func (r *resolutionState) getCandidateFromTypeRoot(typeRoot string) string {
	nameForLookup := r.name
	if strings.HasSuffix(typeRoot, "/node_modules/@types") || strings.HasSuffix(typeRoot, "/node_modules/@types/") {
		nameForLookup = r.mangleScopedPackageName(r.name)
	}
	return tspath.CombinePaths(typeRoot, nameForLookup)
}

func (r *resolutionState) mangleScopedPackageName(name string) string {
	mangled := MangleScopedPackageName(name)
	if r.resolver.traceEnabled() && mangled != name {
		r.resolver.host.Trace(diagnostics.Scoped_package_detected_looking_in_0.Format(mangled))
	}
	return mangled
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

func (r *resolutionState) resolveNodeLike() *ResolvedModule {
	if r.resolver.traceEnabled() {
		conditions := strings.Join(core.Map(r.conditions, func(c string) string { return `'` + c + `'` }), ", ")
		if r.esmMode {
			r.resolver.host.Trace(diagnostics.Resolving_in_0_mode_with_conditions_1.Format("ESM", conditions))
		} else {
			r.resolver.host.Trace(diagnostics.Resolving_in_0_mode_with_conditions_1.Format("CJS", conditions))
		}
	}
	result := r.resolveNodeLikeWorker()
	if r.resolvedPackageDirectory &&
		!r.isConfigLookup &&
		r.features&NodeResolutionFeaturesExports != 0 &&
		r.extensions&(extensionsTypeScript|extensionsDeclaration) != 0 &&
		!tspath.IsExternalModuleNameRelative(r.name) &&
		result.IsResolved() &&
		result.IsExternalLibraryImport &&
		!extensionIsOk(extensionsTypeScript|extensionsDeclaration, result.Extension) &&
		slices.Contains(r.conditions, "import") {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Resolution_of_non_relative_name_failed_trying_with_modern_Node_resolution_features_disabled_to_see_if_npm_library_needs_configuration_update.Format())
		}
		r.features = r.features & ^NodeResolutionFeaturesExports
		r.extensions = r.extensions & (extensionsTypeScript | extensionsDeclaration)
		diagnosticsCount := len(r.diagnostics)
		if diagnosticResult := r.resolveNodeLikeWorker(); diagnosticResult.IsResolved() && diagnosticResult.IsExternalLibraryImport {
			result.AlternateResult = diagnosticResult.ResolvedFileName
		}
		r.diagnostics = r.diagnostics[:diagnosticsCount]
	}
	return result
}

func (r *resolutionState) resolveNodeLikeWorker() *ResolvedModule {
	if resolved := r.tryLoadModuleUsingOptionalResolutionSettings(); !resolved.shouldContinueSearching() {
		return r.createResolvedModuleHandlingSymlink(resolved)
	}

	if !tspath.IsExternalModuleNameRelative(r.name) {
		if r.features&NodeResolutionFeaturesImports != 0 && strings.HasPrefix(r.name, "#") {
			if resolved := r.loadModuleFromImports(); !resolved.shouldContinueSearching() {
				return r.createResolvedModuleHandlingSymlink(resolved)
			}
		}
		if r.features&NodeResolutionFeaturesSelfName != 0 {
			if resolved := r.loadModuleFromSelfNameReference(); !resolved.shouldContinueSearching() {
				return r.createResolvedModuleHandlingSymlink(resolved)
			}
		}
		if strings.Contains(r.name, ":") {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Skipping_module_0_that_looks_like_an_absolute_URI_target_file_types_Colon_1.Format(r.name, r.extensions.String()))
			}
			return r.createResolvedModule(nil, false)
		}
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Loading_module_0_from_node_modules_folder_target_file_types_Colon_1.Format(r.name, r.extensions.String()))
		}
		if resolved := r.loadModuleFromNearestNodeModulesDirectory(false /*typesScopeOnly*/); !resolved.shouldContinueSearching() {
			return r.createResolvedModuleHandlingSymlink(resolved)
		}
		if r.extensions&extensionsDeclaration != 0 {
			// !!!
			// if resolved := r.resolveFromTypeRoot(); !resolved.shouldContinueSearching() {
			// 	return r.createResolvedModuleHandlingSymlink(resolved)
			// }
		}
	} else {
		candidate := normalizePathForCJSResolution(r.containingDirectory, r.name)
		resolved := r.nodeLoadModuleByRelativeName(r.extensions, candidate, false, true)
		return r.createResolvedModule(
			resolved,
			resolved != nil && strings.Contains(resolved.path, "/node_modules/"),
		)
	}
	return r.createResolvedModule(nil, false)
}

func (r *resolutionState) loadModuleFromSelfNameReference() *resolved {
	directoryPath := tspath.GetNormalizedAbsolutePath(r.containingDirectory, r.resolver.host.GetCurrentDirectory())
	scope := r.getPackageScopeForPath(directoryPath)
	if !scope.Exists() || scope.Contents.Exports.IsFalsy() {
		// !!! falsy check seems wrong?
		return continueSearching()
	}
	name, ok := scope.Contents.Name.GetValue()
	if !ok {
		return continueSearching()
	}
	parts := tspath.GetPathComponents(r.name, "")
	nameParts := tspath.GetPathComponents(name, "")
	if len(parts) < len(nameParts) || !slices.Equal(nameParts, parts[:len(nameParts)]) {
		return continueSearching()
	}
	trailingParts := parts[len(nameParts):]
	var subpath string
	if len(trailingParts) > 0 {
		subpath = tspath.CombinePaths(".", trailingParts...)
	} else {
		subpath = "."
	}
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
	if r.compilerOptions.GetAllowJS() && !strings.Contains(r.containingDirectory, "/node_modules/") {
		return r.loadModuleFromExports(scope, r.extensions, subpath)
	}
	priorityExtensions := r.extensions & (extensionsTypeScript | extensionsDeclaration)
	secondaryExtensions := r.extensions & ^(extensionsTypeScript | extensionsDeclaration)
	if resolved := r.loadModuleFromExports(scope, priorityExtensions, subpath); !resolved.shouldContinueSearching() {
		return resolved
	}
	return r.loadModuleFromExports(scope, secondaryExtensions, subpath)
}

func (r *resolutionState) loadModuleFromImports() *resolved {
	if r.name == "#" || strings.HasPrefix(r.name, "#/") {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Invalid_import_specifier_0_has_no_possible_resolutions.Format(r.name))
		}
		return continueSearching()
	}
	directoryPath := tspath.GetNormalizedAbsolutePath(r.containingDirectory, r.resolver.host.GetCurrentDirectory())
	scope := r.getPackageScopeForPath(directoryPath)
	if !scope.Exists() {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Directory_0_has_no_containing_package_json_scope_Imports_will_not_resolve.Format(directoryPath))
		}
		return continueSearching()
	}
	if scope.Contents.Imports.Type != packagejson.JSONValueTypeObject {
		// !!! Old compiler only checks for undefined, but then assumes `imports` is an object if present.
		// Maybe should have a new diagnostic for imports of an invalid type. Also, array should be handled?
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.X_package_json_scope_0_has_no_imports_defined.Format(scope.PackageDirectory))
		}
		return continueSearching()
	}

	if result := r.loadModuleFromExportsOrImports(r.extensions, r.name, scope.Contents.Imports.AsObject(), scope /*isImports*/, true); !result.shouldContinueSearching() {
		return result
	}

	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Import_specifier_0_does_not_exist_in_package_json_scope_at_path_1.Format(r.name, scope.PackageDirectory))
	}
	return continueSearching()
}

func (r *resolutionState) loadModuleFromExports(packageInfo *packagejson.InfoCacheEntry, ext extensions, subpath string) *resolved {
	// !!! This is ported exactly, but the falsy check seems wrong
	if !packageInfo.Exists() || packageInfo.Contents.Exports.IsFalsy() {
		return continueSearching()
	}

	if subpath == "." {
		var mainExport packagejson.ExportsOrImports
		switch packageInfo.Contents.Exports.Type {
		case packagejson.JSONValueTypeString, packagejson.JSONValueTypeArray:
			mainExport = packageInfo.Contents.Exports
		case packagejson.JSONValueTypeObject:
			if packageInfo.Contents.Exports.IsConditions() {
				mainExport = packageInfo.Contents.Exports
			} else if dot, ok := packageInfo.Contents.Exports.AsObject().Get("."); ok {
				mainExport = dot
			}
		}
		if mainExport.Type != packagejson.JSONValueTypeNotPresent {
			return r.loadModuleFromTargetExportOrImport(ext, subpath, packageInfo, false /*isImports*/, mainExport, "", false /*isPattern*/, ".")
		}
	} else if packageInfo.Contents.Exports.Type == packagejson.JSONValueTypeObject && packageInfo.Contents.Exports.IsSubpaths() {
		if result := r.loadModuleFromExportsOrImports(ext, subpath, packageInfo.Contents.Exports.AsObject(), packageInfo, false /*isImports*/); !result.shouldContinueSearching() {
			return result
		}
	}

	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1.Format(subpath, packageInfo.PackageDirectory))
	}
	return continueSearching()
}

func (r *resolutionState) loadModuleFromExportsOrImports(
	extensions extensions,
	moduleName string,
	lookupTable *collections.OrderedMap[string, packagejson.ExportsOrImports],
	scope *packagejson.InfoCacheEntry,
	isImports bool,
) *resolved {
	if !strings.HasSuffix(moduleName, "/") && !strings.Contains(moduleName, "*") {
		if target, ok := lookupTable.Get(moduleName); ok {
			return r.loadModuleFromTargetExportOrImport(extensions, moduleName, scope, isImports, target, "", false /*isPattern*/, moduleName)
		}
	}

	expandingKeys := make([]string, 0, lookupTable.Size())
	for key := range lookupTable.Keys() {
		if strings.Count(key, "*") == 1 || strings.HasSuffix(key, "/") {
			expandingKeys = append(expandingKeys, key)
		}
	}
	slices.SortFunc(expandingKeys, ComparePatternKeys)

	for _, potentialTarget := range expandingKeys {
		if r.features&NodeResolutionFeaturesExportsPatternTrailers != 0 && matchesPatternWithTrailer(potentialTarget, moduleName) {
			target, _ := lookupTable.Get(potentialTarget)
			starPos := strings.Index(potentialTarget, "*")
			subpath := moduleName[len(potentialTarget[:starPos]) : len(moduleName)-(len(potentialTarget)-1-starPos)]
			return r.loadModuleFromTargetExportOrImport(extensions, moduleName, scope, isImports, target, subpath, true, potentialTarget)
		} else if strings.HasSuffix(potentialTarget, "*") && strings.HasPrefix(moduleName, potentialTarget[:len(potentialTarget)-1]) {
			target, _ := lookupTable.Get(potentialTarget)
			subpath := moduleName[len(potentialTarget)-1:]
			return r.loadModuleFromTargetExportOrImport(extensions, moduleName, scope, isImports, target, subpath, true, potentialTarget)
		} else if strings.HasPrefix(moduleName, potentialTarget) {
			target, _ := lookupTable.Get(potentialTarget)
			subpath := moduleName[len(potentialTarget):]
			return r.loadModuleFromTargetExportOrImport(extensions, moduleName, scope, isImports, target, subpath, false, potentialTarget)
		}
	}

	return continueSearching()
}

func (r *resolutionState) loadModuleFromTargetExportOrImport(extensions extensions, moduleName string, scope *packagejson.InfoCacheEntry, isImports bool, target packagejson.ExportsOrImports, subpath string, isPattern bool, key string) *resolved {
	switch target.Type {
	case packagejson.JSONValueTypeString:
		targetString, _ := target.Value.(string)
		if !isPattern && len(subpath) > 0 && !strings.HasSuffix(targetString, "/") {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1.Format(scope.PackageDirectory, moduleName))
			}
			return continueSearching()
		}
		if !strings.HasPrefix(targetString, "./") {
			if isImports && !strings.HasPrefix(targetString, "../") && !strings.HasPrefix(targetString, "/") && !tspath.IsRootedDiskPath(targetString) {
				combinedLookup := targetString + subpath
				if isPattern {
					combinedLookup = strings.ReplaceAll(targetString, "*", subpath)
				}
				if r.resolver.traceEnabled() {
					r.resolver.host.Trace(diagnostics.Using_0_subpath_1_with_target_2.Format("imports", key, combinedLookup))
					r.resolver.host.Trace(diagnostics.Resolving_module_0_from_1.Format(combinedLookup, scope.PackageDirectory+"/"))
				}
				name, containingDirectory := r.name, r.containingDirectory
				r.name, r.containingDirectory = combinedLookup, scope.PackageDirectory+"/"
				defer func() {
					r.name, r.containingDirectory = name, containingDirectory
				}()
				if result := r.resolveNodeLike(); result.IsResolved() {
					return &resolved{
						path:                     result.ResolvedFileName,
						extension:                result.Extension,
						packageId:                result.PackageId,
						originalPath:             result.OriginalPath,
						resolvedUsingTsExtension: result.ResolvedUsingTsExtension,
					}
				}
				return continueSearching()
			}
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1.Format(scope.PackageDirectory, moduleName))
			}
			return continueSearching()
		}
		var parts []string
		if tspath.PathIsRelative(targetString) {
			parts = tspath.GetPathComponents(targetString, "")[1:]
		} else {
			parts = tspath.GetPathComponents(targetString, "")
		}
		partsAfterFirst := parts[1:]
		if slices.Contains(partsAfterFirst, "..") || slices.Contains(partsAfterFirst, ".") || slices.Contains(partsAfterFirst, "node_modules") {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1.Format(scope.PackageDirectory, moduleName))
			}
			return continueSearching()
		}
		resolvedTarget := tspath.CombinePaths(scope.PackageDirectory, targetString)
		// TODO: Assert that `resolvedTarget` is actually within the package directory? That's what the spec says.... but I'm not sure we need
		// to be in the business of validating everyone's import and export map correctness.
		subpathParts := tspath.GetPathComponents(subpath, "")
		if slices.Contains(subpathParts, "..") || slices.Contains(subpathParts, ".") || slices.Contains(subpathParts, "node_modules") {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1.Format(scope.PackageDirectory, moduleName))
			}
			return continueSearching()
		}

		if r.resolver.traceEnabled() {
			var messageTarget string
			if isPattern {
				messageTarget = strings.ReplaceAll(targetString, "*", subpath)
			} else {
				messageTarget = targetString + subpath
			}
			r.resolver.host.Trace(diagnostics.Using_0_subpath_1_with_target_2.Format(core.IfElse(isImports, "imports", "exports"), key, messageTarget))
		}
		var finalPath string
		if isPattern {
			finalPath = tspath.GetNormalizedAbsolutePath(strings.ReplaceAll(resolvedTarget, "*", subpath), r.resolver.host.GetCurrentDirectory())
		} else {
			finalPath = tspath.GetNormalizedAbsolutePath(resolvedTarget+subpath, r.resolver.host.GetCurrentDirectory())
		}
		if inputLink := r.tryLoadInputFileForPath(finalPath, subpath, tspath.CombinePaths(scope.PackageDirectory, "package.json"), isImports); !inputLink.shouldContinueSearching() {
			return inputLink
		}
		if result := r.loadFileNameFromPackageJSONField(extensions, finalPath, targetString, false /*onlyRecordFailures*/); !result.shouldContinueSearching() {
			result.packageId = r.getPackageId(result.path, scope)
			return result
		}
		return continueSearching()

	case packagejson.JSONValueTypeObject:
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Entering_conditional_exports.Format())
		}
		for condition := range target.AsObject().Keys() {
			if r.conditionMatches(condition) {
				if r.resolver.traceEnabled() {
					r.resolver.host.Trace(diagnostics.Matched_0_condition_1.Format(core.IfElse(isImports, "imports", "exports"), condition))
				}
				subTarget, _ := target.AsObject().Get(condition)
				if result := r.loadModuleFromTargetExportOrImport(extensions, moduleName, scope, isImports, subTarget, subpath, isPattern, key); !result.shouldContinueSearching() {
					if r.resolver.traceEnabled() {
						r.resolver.host.Trace(diagnostics.Resolved_under_condition_0.Format(condition))
					}
					if r.resolver.traceEnabled() {
						r.resolver.host.Trace(diagnostics.Exiting_conditional_exports.Format())
					}
					return result
				} else if r.resolver.traceEnabled() {
					r.resolver.host.Trace(diagnostics.Failed_to_resolve_under_condition_0.Format(condition))
				}
			} else {
				if r.resolver.traceEnabled() {
					r.resolver.host.Trace(diagnostics.Saw_non_matching_condition_0.Format(condition))
				}
			}
		}
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Exiting_conditional_exports.Format())
		}
		return continueSearching()
	case packagejson.JSONValueTypeArray:
		if len(target.AsArray()) == 0 {
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1.Format(scope.PackageDirectory, moduleName))
			}
			return continueSearching()
		}
		for _, elem := range target.AsArray() {
			if result := r.loadModuleFromTargetExportOrImport(extensions, moduleName, scope, isImports, elem, subpath, isPattern, key); !result.shouldContinueSearching() {
				return result
			}
		}

	case packagejson.JSONValueTypeNull:
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.X_package_json_scope_0_explicitly_maps_specifier_1_to_null.Format(scope.PackageDirectory, moduleName))
		}
		return continueSearching()
	}

	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1.Format(scope.PackageDirectory, moduleName))
	}
	return continueSearching()
}

func (r *resolutionState) tryLoadInputFileForPath(finalPath string, entry string, packagePath string, isImports bool) *resolved {
	// !!!
	return continueSearching()
}

func (r *resolutionState) loadModuleFromNearestNodeModulesDirectory(typesScopeOnly bool) *resolved {
	mode := core.ResolutionModeCommonJS
	if r.esmMode || r.conditionMatches("import") {
		mode = core.ResolutionModeESM
	}
	// Do (up to) two passes through node_modules:
	//   1. For each ancestor node_modules directory, try to find:
	//      i.  TS/DTS files in the implementation package
	//      ii. DTS files in the @types package
	//   2. For each ancestor node_modules directory, try to find:
	//      i.  JS files in the implementation package
	priorityExtensions := r.extensions & (extensionsTypeScript | extensionsDeclaration)
	secondaryExtensions := r.extensions & ^(extensionsTypeScript | extensionsDeclaration)
	// (1)
	if priorityExtensions != 0 {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Searching_all_ancestor_node_modules_directories_for_preferred_extensions_Colon_0.Format(priorityExtensions.String()))
		}
		if result := r.loadModuleFromNearestNodeModulesDirectoryWorker(priorityExtensions, mode, typesScopeOnly); !result.shouldContinueSearching() {
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
	return continueSearching()
}

func (r *resolutionState) loadModuleFromNearestNodeModulesDirectoryWorker(ext extensions, mode core.ResolutionMode, typesScopeOnly bool) *resolved {
	result, _ := tspath.ForEachAncestorDirectory(
		r.containingDirectory,
		func(directory string) (result *resolved, stop bool) {
			// !!! stop at global cache
			if tspath.GetBaseFileName(directory) != "node_modules" {
				result := r.loadModuleFromImmediateNodeModulesDirectory(ext, directory, typesScopeOnly)
				return result, !result.shouldContinueSearching()
			}
			return continueSearching(), false
		},
	)
	return result
}

func (r *resolutionState) loadModuleFromImmediateNodeModulesDirectory(extensions extensions, directory string, typesScopeOnly bool) *resolved {
	nodeModulesFolder := tspath.CombinePaths(directory, "node_modules")
	nodeModulesFolderExists := r.resolver.host.FS().DirectoryExists(nodeModulesFolder)
	if !nodeModulesFolderExists && r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it.Format(nodeModulesFolder))
	}

	if !typesScopeOnly {
		if packageResult := r.loadModuleFromSpecificNodeModulesDirectory(extensions, r.name, nodeModulesFolder, nodeModulesFolderExists); !packageResult.shouldContinueSearching() {
			return packageResult
		}
	}

	if extensions&extensionsDeclaration != 0 {
		nodeModulesAtTypes := tspath.CombinePaths(nodeModulesFolder, "@types")
		nodeModulesAtTypesExists := nodeModulesFolderExists && r.resolver.host.FS().DirectoryExists(nodeModulesAtTypes)
		if !nodeModulesAtTypesExists && r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it.Format(nodeModulesAtTypes))
		}
		return r.loadModuleFromSpecificNodeModulesDirectory(extensionsDeclaration, r.mangleScopedPackageName(r.name), nodeModulesAtTypes, nodeModulesAtTypesExists)
	}

	return continueSearching()
}

func (r *resolutionState) loadModuleFromSpecificNodeModulesDirectory(ext extensions, moduleName string, nodeModulesDirectory string, nodeModulesDirectoryExists bool) *resolved {
	candidate := tspath.NormalizePath(tspath.CombinePaths(nodeModulesDirectory, moduleName))
	packageName, rest := ParsePackageName(moduleName)
	packageDirectory := tspath.CombinePaths(nodeModulesDirectory, packageName)

	var rootPackageInfo *packagejson.InfoCacheEntry
	// First look for a nested package.json, as in `node_modules/foo/bar/package.json`
	packageInfo := r.getPackageJsonInfo(candidate, !nodeModulesDirectoryExists)
	// But only if we're not respecting export maps (if we are, we might redirect around this location)
	if rest != "" && packageInfo.Exists() {
		if r.features&NodeResolutionFeaturesExports != 0 {
			rootPackageInfo = r.getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists)
		}
		if !rootPackageInfo.Exists() || rootPackageInfo.Contents.Exports.Type == packagejson.JSONValueTypeNotPresent {
			if fromFile := r.loadModuleFromFile(ext, candidate, !nodeModulesDirectoryExists); !fromFile.shouldContinueSearching() {
				return fromFile
			}

			if fromDirectory := r.loadNodeModuleFromDirectoryWorker(ext, candidate, !nodeModulesDirectoryExists, packageInfo); !fromDirectory.shouldContinueSearching() {
				fromDirectory.packageId = r.getPackageId(packageDirectory, packageInfo)
				return fromDirectory
			}
		}
	}

	loader := func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
		if rest != "" || !r.esmMode {
			if fromFile := r.loadModuleFromFile(extensions, candidate, onlyRecordFailures); !fromFile.shouldContinueSearching() {
				fromFile.packageId = r.getPackageId(packageDirectory, packageInfo)
				return fromFile
			}
		}
		if fromDirectory := r.loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, packageInfo); !fromDirectory.shouldContinueSearching() {
			fromDirectory.packageId = r.getPackageId(packageDirectory, packageInfo)
			return fromDirectory
		}
		// !!! this is ported exactly, but checking for null seems wrong?
		if packageInfo.Exists() &&
			(packageInfo.Contents.Exports.Type == packagejson.JSONValueTypeNotPresent || packageInfo.Contents.Exports.Type == packagejson.JSONValueTypeNull) &&
			r.esmMode {
			// EsmMode disables index lookup in `loadNodeModuleFromDirectoryWorker` generally, however non-relative package resolutions still assume
			// a default `index.js` entrypoint if no `main` or `exports` are present
			if indexResult := r.loadModuleFromFile(extensions, tspath.CombinePaths(candidate, "index"), onlyRecordFailures); !indexResult.shouldContinueSearching() {
				indexResult.packageId = r.getPackageId(packageDirectory, packageInfo)
				return indexResult
			}
		}
		return continueSearching()
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
			// package exports are higher priority than file/directory/typesVersions lookups and (and, if there's exports present, blocks them)
			return r.loadModuleFromExports(packageInfo, ext, tspath.CombinePaths(".", rest))
		}
		if rest != "" {
			versionPaths := packageInfo.Contents.GetVersionPaths(r.getTraceFunc())
			if versionPaths.Exists() {
				if r.resolver.traceEnabled() {
					r.resolver.host.Trace(diagnostics.X_package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2.Format(versionPaths.Version, core.Version, rest))
				}
				packageDirectoryExists := nodeModulesDirectoryExists && r.resolver.host.FS().DirectoryExists(packageDirectory)
				pathPatterns := tryParsePatterns(versionPaths.GetPaths())
				if fromPaths := r.tryLoadModuleUsingPaths(ext, rest, packageDirectory, versionPaths.GetPaths(), pathPatterns, loader, !packageDirectoryExists); !fromPaths.shouldContinueSearching() {
					return fromPaths
				}
			}
		}
	}
	return loader(ext, candidate, !nodeModulesDirectoryExists)
}

func (r *resolutionState) createResolvedModuleHandlingSymlink(resolved *resolved) *ResolvedModule {
	isExternalLibraryImport := resolved != nil && strings.Contains(resolved.path, "/node_modules/")
	if r.compilerOptions.PreserveSymlinks != core.TSTrue &&
		isExternalLibraryImport &&
		resolved.originalPath == "" &&
		!tspath.IsExternalModuleNameRelative(r.name) {
		originalPath, resolvedFileName := r.getOriginalAndResolvedFileName(resolved.path)
		if originalPath != "" {
			resolved.path = resolvedFileName
			resolved.originalPath = originalPath
		}
	}
	return r.createResolvedModule(resolved, isExternalLibraryImport)
}

func (r *resolutionState) createResolvedModule(resolved *resolved, isExternalLibraryImport bool) *ResolvedModule {
	var resolvedModule ResolvedModule
	resolvedModule.LookupLocations = LookupLocations{
		FailedLookupLocations: r.failedLookupLocations,
		AffectingLocations:    r.affectingLocations,
		ResolutionDiagnostics: r.diagnostics,
	}

	if resolved != nil {
		resolvedModule.ResolvedFileName = resolved.path
		resolvedModule.OriginalPath = resolved.originalPath
		resolvedModule.IsExternalLibraryImport = isExternalLibraryImport
		resolvedModule.ResolvedUsingTsExtension = resolved.resolvedUsingTsExtension
		resolvedModule.Extension = resolved.extension
		resolvedModule.PackageId = resolved.packageId
	}
	return &resolvedModule
}

func (r *resolutionState) createResolvedTypeReferenceDirective(resolved *resolved, primary bool) *ResolvedTypeReferenceDirective {
	var resolvedTypeReferenceDirective ResolvedTypeReferenceDirective
	resolvedTypeReferenceDirective.LookupLocations = LookupLocations{
		FailedLookupLocations: r.failedLookupLocations,
		AffectingLocations:    r.affectingLocations,
		ResolutionDiagnostics: r.diagnostics,
	}

	if resolved.isResolved() {
		if !tspath.ExtensionIsTs(resolved.extension) {
			panic("expected a TypeScript file extension")
		}
		resolvedTypeReferenceDirective.ResolvedFileName = resolved.path
		resolvedTypeReferenceDirective.Primary = primary
		resolvedTypeReferenceDirective.PackageId = resolved.packageId
		resolvedTypeReferenceDirective.IsExternalLibraryImport = strings.Contains(resolved.path, "/node_modules/")

		if r.compilerOptions.PreserveSymlinks != core.TSTrue {
			originalPath, resolvedFileName := r.getOriginalAndResolvedFileName(resolved.path)
			if originalPath != "" {
				resolvedTypeReferenceDirective.ResolvedFileName = resolvedFileName
				resolvedTypeReferenceDirective.OriginalPath = originalPath
			}
		}
	}
	return &resolvedTypeReferenceDirective
}

func (r *resolutionState) getOriginalAndResolvedFileName(fileName string) (string, string) {
	resolvedFileName := r.realPath(fileName)
	comparePathsOptions := tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: r.resolver.host.FS().UseCaseSensitiveFileNames(),
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
	return r.tryLoadModuleUsingPathsIfEligible()
}

func (r *resolutionState) tryLoadModuleUsingPathsIfEligible() *resolved {
	if r.compilerOptions.Paths.Size() > 0 && !tspath.PathIsRelative(r.name) {
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.X_paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0.Format(r.name))
		}
	} else {
		return continueSearching()
	}
	baseDirectory := getPathsBasePath(r.compilerOptions, r.resolver.host.GetCurrentDirectory())
	pathPatterns := r.resolver.getParsedPatternsForPaths()
	return r.tryLoadModuleUsingPaths(
		r.extensions,
		r.name,
		baseDirectory,
		r.compilerOptions.Paths,
		pathPatterns,
		func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
			return r.nodeLoadModuleByRelativeName(extensions, candidate, onlyRecordFailures, true /*considerPackageJson*/)
		},
		false, /*onlyRecordFailures*/
	)
}

func (r *resolutionState) tryLoadModuleUsingPaths(extensions extensions, moduleName string, containingDirectory string, paths *collections.OrderedMap[string, []string], pathPatterns *parsedPatterns, loader resolutionKindSpecificLoader, onlyRecordFailures bool) *resolved {
	if matchedPattern := matchPatternOrExact(pathPatterns, moduleName); matchedPattern.IsValid() {
		matchedStar := matchedPattern.MatchedText(moduleName)
		if r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.Module_name_0_matched_pattern_1.Format(moduleName, matchedPattern.Text))
		}
		for _, subst := range paths.GetOrZero(matchedPattern.Text) {
			path := strings.Replace(subst, "*", matchedStar, 1)
			candidate := tspath.NormalizePath(tspath.CombinePaths(containingDirectory, path))
			if r.resolver.traceEnabled() {
				r.resolver.host.Trace(diagnostics.Trying_substitution_0_candidate_module_location_Colon_1.Format(subst, path))
			}
			// A path mapping may have an extension
			if extension := tspath.TryGetExtensionFromPath(subst); extension != "" {
				if path, ok := r.tryFile(candidate, onlyRecordFailures /*onlyRecordFailures*/); ok {
					return &resolved{
						path:      path,
						extension: extension,
					}
				}
			}
			if resolved := loader(extensions, candidate, onlyRecordFailures || !r.resolver.host.FS().DirectoryExists(tspath.GetDirectoryPath(candidate))); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
	}
	return continueSearching()
}

func (r *resolutionState) nodeLoadModuleByRelativeName(extensions extensions, candidate string, onlyRecordFailures bool, considerPackageJson bool) *resolved {
	if r.resolver.traceEnabled() {
		r.resolver.host.Trace(diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_types_Colon_1.Format(candidate, extensions.String()))
	}
	if !tspath.HasTrailingDirectorySeparator(candidate) {
		if !onlyRecordFailures {
			parentOfCandidate := tspath.GetDirectoryPath(candidate)
			if !r.resolver.host.FS().DirectoryExists(parentOfCandidate) {
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
		candidateExists := r.resolver.host.FS().DirectoryExists(candidate)
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
	return continueSearching()
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

	return continueSearching()
}

func (r *resolutionState) loadModuleFromFileNoImplicitExtensions(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
	base := tspath.GetBaseFileName(candidate)
	if !strings.Contains(base, ".") {
		return continueSearching() // extensionless import, no lookups performed, since we don't support extensionless files
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
		onlyRecordFailures = directory != "" && !r.resolver.host.FS().DirectoryExists(directory)
	}

	switch originalExtension {
	case tspath.ExtensionMjs, tspath.ExtensionMts, tspath.ExtensionDmts:
		if extensions&extensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionMts, extensionless, originalExtension == tspath.ExtensionMts || originalExtension == tspath.ExtensionDmts, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDmts, extensionless, originalExtension == tspath.ExtensionMts || originalExtension == tspath.ExtensionDmts, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionMjs, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		return continueSearching()
	case tspath.ExtensionCjs, tspath.ExtensionCts, tspath.ExtensionDcts:
		if extensions&extensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionCts, extensionless, originalExtension == tspath.ExtensionCts || originalExtension == tspath.ExtensionDcts, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDcts, extensionless, originalExtension == tspath.ExtensionCts || originalExtension == tspath.ExtensionDcts, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionCjs, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		return continueSearching()
	case tspath.ExtensionJson:
		if extensions&extensionsDeclaration != 0 {
			if resolved := r.tryExtension(".d.json.ts", extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsJson != 0 {
			if resolved := r.tryExtension(tspath.ExtensionJson, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		return continueSearching()
	case tspath.ExtensionTsx, tspath.ExtensionJsx:
		// basically idendical to the ts/js case below, but prefers matching tsx and jsx files exactly before falling back to the ts or js file path
		// (historically, we disallow having both a a.ts and a.tsx file in the same compilation, since their outputs clash)
		// TODO: We should probably error if `"./a.tsx"` resolved to `"./a.ts"`, right?
		if extensions&extensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionTsx, extensionless, originalExtension == tspath.ExtensionTsx, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionTs, extensionless, originalExtension == tspath.ExtensionTsx, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDts, extensionless, originalExtension == tspath.ExtensionTsx, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionJsx, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionJs, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		return continueSearching()
	case tspath.ExtensionTs, tspath.ExtensionDts, tspath.ExtensionJs, "":
		if extensions&extensionsTypeScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionTs, extensionless, originalExtension == tspath.ExtensionTs || originalExtension == tspath.ExtensionDts, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionTsx, extensionless, originalExtension == tspath.ExtensionTs || originalExtension == tspath.ExtensionDts, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsDeclaration != 0 {
			if resolved := r.tryExtension(tspath.ExtensionDts, extensionless, originalExtension == tspath.ExtensionTs || originalExtension == tspath.ExtensionDts, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if extensions&extensionsJavaScript != 0 {
			if resolved := r.tryExtension(tspath.ExtensionJs, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
			if resolved := r.tryExtension(tspath.ExtensionJsx, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		if r.isConfigLookup {
			if resolved := r.tryExtension(tspath.ExtensionJson, extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		return continueSearching()
	default:
		if extensions&extensionsDeclaration != 0 && !tspath.IsDeclarationFileName(extensionless+originalExtension) {
			if resolved := r.tryExtension(".d"+originalExtension+".ts", extensionless, false, onlyRecordFailures); !resolved.shouldContinueSearching() {
				return resolved
			}
		}
		return continueSearching()
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
	return continueSearching()
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
		if r.resolver.host.FS().FileExists(fileName) {
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
	var packageInfo *packagejson.InfoCacheEntry
	if considerPackageJson {
		packageInfo = r.getPackageJsonInfo(candidate, onlyRecordFailures)
	}

	return r.loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, packageInfo)
}

func (r *resolutionState) loadNodeModuleFromDirectoryWorker(ext extensions, candidate string, onlyRecordFailures bool, packageInfo *packagejson.InfoCacheEntry) *resolved {
	var (
		packageFile                      string
		onlyRecordFailuresForPackageFile bool
		versionPaths                     packagejson.VersionPaths
	)
	if packageInfo.Exists() && tspath.ComparePaths(candidate, packageInfo.PackageDirectory, tspath.ComparePathsOptions{UseCaseSensitiveFileNames: r.resolver.host.FS().UseCaseSensitiveFileNames()}) == 0 {
		if file, ok := r.getPackageFile(ext, packageInfo); ok {
			packageFile = file
			onlyRecordFailuresForPackageFile = !r.resolver.host.FS().DirectoryExists(tspath.GetDirectoryPath(file))
		}
	}

	loader := func(extensions extensions, candidate string, onlyRecordFailures bool) *resolved {
		if fromFile := r.loadFileNameFromPackageJSONField(extensions, candidate, packageFile, onlyRecordFailures); !fromFile.shouldContinueSearching() {
			return fromFile
		}

		// Even if `extensions == extensionsDeclaration`, we can still look up a .ts file as a result of package.json "types"
		// !!! should we not set this before the filename lookup above?
		expandedExtensions := extensions
		if extensions == extensionsDeclaration {
			expandedExtensions = extensionsTypeScript | extensionsDeclaration
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

	if versionPaths.Exists() && (packageFile == "" || tspath.ContainsPath(candidate, packageFile, tspath.ComparePathsOptions{})) {
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
		if result := r.tryLoadModuleUsingPaths(ext, moduleName, candidate, versionPaths.GetPaths(), pathPatterns, loader, onlyRecordFailuresForPackageFile); !result.shouldContinueSearching() {
			if result.packageId.Name != "" {
				// !!! are these asserts really necessary?
				panic("expected packageId to be empty")
			}
			return result
		}
	}

	if packageFile != "" {
		if packageFileResult := loader(ext, packageFile, onlyRecordFailuresForPackageFile); !packageFileResult.shouldContinueSearching() {
			if packageFileResult.packageId.Name != "" {
				// !!! are these asserts really necessary?
				panic("expected packageId to be empty")
			}
			return packageFileResult
		}
	}

	// ESM mode resolutions don't do package 'index' lookups
	if !r.esmMode {
		return r.loadModuleFromFile(ext, indexPath, onlyRecordFailures || !r.resolver.host.FS().DirectoryExists(candidate))
	}
	return continueSearching()
}

// This function is only ever called with paths written in package.json files - never
// module specifiers written in source files - and so it always allows the
// candidate to end with a TS extension (but will also try substituting a JS extension for a TS extension).
func (r *resolutionState) loadFileNameFromPackageJSONField(extensions extensions, candidate string, packageJSONValue string, onlyRecordFailures bool) *resolved {
	if extensions&extensionsTypeScript != 0 && tspath.HasImplementationTSFileExtension(candidate) || extensions&extensionsDeclaration != 0 && tspath.IsDeclarationFileName(candidate) {
		if path, ok := r.tryFile(candidate, onlyRecordFailures); ok {
			extension := tspath.TryExtractTSExtension(path)
			return &resolved{
				path:                     path,
				extension:                extension,
				resolvedUsingTsExtension: !strings.HasSuffix(packageJSONValue, extension),
			}
		}
		return continueSearching()
	}

	if r.isConfigLookup && extensions&extensionsJson != 0 && tspath.FileExtensionIs(candidate, tspath.ExtensionJson) {
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
	if extensions&extensionsDeclaration != 0 {
		if packageFile, ok := r.getPackageJSONPathField("typings", &packageInfo.Contents.Typings, packageInfo.PackageDirectory); ok {
			return packageFile, ok
		}
		if packageFile, ok := r.getPackageJSONPathField("types", &packageInfo.Contents.Types, packageInfo.PackageDirectory); ok {
			return packageFile, ok
		}
	}
	if extensions&(extensionsImplementationFiles|extensionsDeclaration) != 0 {
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

	if existing := r.resolver.packageJsonInfoCache.Get(packageJsonPath); existing != nil {
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

	directoryExists := r.resolver.host.FS().DirectoryExists(packageDirectory)
	if directoryExists && r.resolver.host.FS().FileExists(packageJsonPath) {
		// Ignore error
		contents, _ := r.resolver.host.FS().ReadFile(packageJsonPath)
		packageJsonContent, _ := packagejson.Parse([]byte(contents))
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
		if !r.resolver.packageJsonInfoCache.IsReadonly {
			r.resolver.packageJsonInfoCache.Set(packageJsonPath, result)
		}
		r.affectingLocations = append(r.affectingLocations, packageJsonPath)
		return result
	} else {
		if directoryExists && r.resolver.traceEnabled() {
			r.resolver.host.Trace(diagnostics.File_0_does_not_exist.Format(packageJsonPath))
		}
		if !r.resolver.packageJsonInfoCache.IsReadonly {
			r.resolver.packageJsonInfoCache.Set(packageJsonPath, &packagejson.InfoCacheEntry{
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
	rp := tspath.NormalizePath(r.resolver.host.FS().Realpath(path))
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

func (r *resolutionState) conditionMatches(condition string) bool {
	if condition == "default" || slices.Contains(r.conditions, condition) {
		return true
	}
	if !slices.Contains(r.conditions, "types") {
		return false // only apply versioned types conditions if the types condition is applied
	}
	if !strings.HasPrefix(condition, "types@") {
		return false
	}
	if versionRange, ok := semver.TryParseVersionRange(condition[len("types@"):]); ok {
		return versionRange.Test(&typeScriptVersion)
	}
	return false
}

func (r *resolutionState) getTraceFunc() func(string) {
	if r.resolver.traceEnabled() {
		return r.resolver.host.Trace
	}
	return nil
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
	offset := prevSeparatorIndex + 1
	nextSeparatorIndex := strings.Index(path[offset:], "/")
	if nextSeparatorIndex == -1 {
		if isFolder {
			return len(path)
		}
		return prevSeparatorIndex
	}
	return nextSeparatorIndex + offset
}

func getPathsBasePath(options *core.CompilerOptions, currentDirectory string) string {
	if options.Paths.Size() == 0 {
		return ""
	}
	if options.PathsBasePath != "" {
		return options.PathsBasePath
	}
	return currentDirectory
}

type parsedPatterns struct {
	matchableStringSet core.Set[string]
	patterns           []core.Pattern
}

func (r *Resolver) getParsedPatternsForPaths() *parsedPatterns {
	r.parsedPatternsForPathsOnce.Do(func() {
		r.parsedPatternsForPaths = tryParsePatterns(r.compilerOptions.Paths)
	})
	return r.parsedPatternsForPaths
}

func tryParsePatterns(pathMappings *collections.OrderedMap[string, []string]) *parsedPatterns {
	paths := pathMappings.Keys()

	numPatterns := 0
	for path := range paths {
		if pattern := core.TryParsePattern(path); pattern.IsValid() && pattern.StarIndex == -1 {
			numPatterns++
		}
	}
	numMatchables := pathMappings.Size() - numPatterns

	var patterns []core.Pattern
	var matchableStringSet core.Set[string]
	if numPatterns != 0 {
		patterns = make([]core.Pattern, 0, numPatterns)
	}
	if numMatchables != 0 {
		matchableStringSet = *core.NewSetWithSizeHint[string](numMatchables)
	}

	for path := range paths {
		if pattern := core.TryParsePattern(path); pattern.IsValid() {
			if pattern.StarIndex == -1 {
				matchableStringSet.Add(path)
			} else {
				patterns = append(patterns, pattern)
			}
		}
	}
	return &parsedPatterns{
		matchableStringSet: matchableStringSet,
		patterns:           patterns,
	}
}

func matchPatternOrExact(patterns *parsedPatterns, candidate string) core.Pattern {
	if patterns.matchableStringSet.Has(candidate) {
		return core.Pattern{
			Text:      candidate,
			StarIndex: -1,
		}
	}
	if len(patterns.patterns) == 0 {
		return core.Pattern{}
	}
	return core.FindBestPatternMatch(patterns.patterns, core.Identity, candidate)
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

func matchesPatternWithTrailer(target string, name string) bool {
	if strings.HasSuffix(target, "*") {
		return false
	}
	starPos := strings.Index(target, "*")
	if starPos == -1 {
		return false
	}
	return strings.HasPrefix(name, target[:starPos]) && strings.HasSuffix(name, target[starPos+1:])
}

/** True if `extension` is one of the supported `extensions`. */
func extensionIsOk(extensions extensions, extension string) bool {
	return (extensions&extensionsJavaScript != 0 && (extension == tspath.ExtensionJs || extension == tspath.ExtensionJsx || extension == tspath.ExtensionMjs || extension == tspath.ExtensionCjs) ||
		(extensions&extensionsTypeScript != 0 && (extension == tspath.ExtensionTs || extension == tspath.ExtensionTsx || extension == tspath.ExtensionMts || extension == tspath.ExtensionCts)) ||
		(extensions&extensionsDeclaration != 0 && (extension == tspath.ExtensionDts || extension == tspath.ExtensionDmts || extension == tspath.ExtensionDcts)) ||
		(extensions&extensionsJson != 0 && extension == tspath.ExtensionJson))
}

func ResolveConfig(moduleName string, containingFile string, host ResolutionHost) *ResolvedModule {
	resolver := NewResolver(host, &core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext})
	return resolver.resolveConfig(moduleName, containingFile)
}

func GetAutomaticTypeDirectiveNames(options *core.CompilerOptions, host ResolutionHost) []string {
	if options.Types != nil {
		return options.Types
	}

	var result []string
	typeRoots, _ := options.GetEffectiveTypeRoots(host.GetCurrentDirectory())
	for _, root := range typeRoots {
		if host.FS().DirectoryExists(root) {
			for _, typeDirectivePath := range host.FS().GetAccessibleEntries(root).Directories {
				normalized := tspath.NormalizePath(typeDirectivePath)
				packageJsonPath := tspath.CombinePaths(root, normalized, "package.json")
				isNotNeededPackage := false
				if host.FS().FileExists(packageJsonPath) {
					contents, _ := host.FS().ReadFile(packageJsonPath)
					packageJsonContent, _ := packagejson.Parse([]byte(contents))
					// `types-publisher` sometimes creates packages with `"typings": null` for packages that don't provide their own types.
					// See `createNotNeededPackageJSON` in the types-publisher` repo.
					isNotNeededPackage = packageJsonContent.Typings.Null
				}
				if !isNotNeededPackage {
					baseFileName := tspath.GetBaseFileName(normalized)
					if !strings.HasPrefix(baseFileName, ".") {
						result = append(result, baseFileName)
					}
				}
			}
		}
	}
	return result
}
