package modulespecifiers

import (
	"maps"
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/outputpaths"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func GetModuleSpecifiers(
	moduleSymbol *ast.Symbol,
	checker CheckerShape,
	compilerOptions *core.CompilerOptions,
	importingSourceFile SourceFileForSpecifierGeneration,
	host ModuleSpecifierGenerationHost,
	userPreferences UserPreferences,
	options ModuleSpecifierOptions,
	forAutoImports bool,
) ModuleSpecifiersResult {
	return GetModuleSpecifiersWithInfo(
		moduleSymbol,
		checker,
		compilerOptions,
		importingSourceFile,
		host,
		userPreferences,
		options,
		forAutoImports,
	)
}

func GetModuleSpecifiersWithInfo(
	moduleSymbol *ast.Symbol,
	checker CheckerShape,
	compilerOptions *core.CompilerOptions,
	importingSourceFile SourceFileForSpecifierGeneration,
	host ModuleSpecifierGenerationHost,
	userPreferences UserPreferences,
	options ModuleSpecifierOptions,
	forAutoImports bool,
) ModuleSpecifiersResult {
	ambient := tryGetModuleNameFromAmbientModule(moduleSymbol, checker)
	if len(ambient.name) > 0 {
		if forAutoImports && IsExcludedByRegex(ambient.name.AsString(), userPreferences.AutoImportSpecifierExcludeRegexes) {
			return ModuleSpecifiersResult{Kind: ResultKindAmbient, AmbientModuleSymbol: ambient.symbol}
		}
		return ModuleSpecifiersResult{Specifiers: []tspath.ModuleSpecifier{ambient.name}, Kind: ResultKindAmbient, AmbientModuleSymbol: ambient.symbol}
	}

	moduleSourceFile := ast.GetSourceFileOfModule(moduleSymbol)
	if moduleSourceFile == nil {
		return ModuleSpecifiersResult{}
	}

	// Use original source file name when file is from project reference output
	moduleFileName := host.GetSourceOfProjectReferenceIfOutputIncluded(moduleSourceFile)

	specifiers, kind := GetModuleSpecifiersForFileWithInfo(
		importingSourceFile,
		moduleFileName,
		compilerOptions,
		host,
		userPreferences,
		options,
		forAutoImports,
	)
	return ModuleSpecifiersResult{Specifiers: specifiers, Kind: kind}
}

func GetModuleSpecifiersForFileWithInfo(
	importingSourceFile SourceFileForSpecifierGeneration,
	moduleFileName tspath.RootedFilePath,
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	userPreferences UserPreferences,
	options ModuleSpecifierOptions,
	forAutoImports bool,
) ([]tspath.ModuleSpecifier, ResultKind) {
	modulePaths := getAllModulePathsWorker(
		getInfo(host.GetSourceOfProjectReferenceIfOutputIncluded(importingSourceFile), host),
		moduleFileName,
		host,
		compilerOptions,
		options,
	)

	return computeModuleSpecifiers(
		modulePaths,
		compilerOptions,
		importingSourceFile,
		host,
		userPreferences,
		options,
		forAutoImports,
	)
}

type ambientModuleInfo struct {
	name   tspath.ModuleSpecifier
	symbol *ast.Symbol
}

func tryGetModuleNameFromAmbientModule(moduleSymbol *ast.Symbol, checker CheckerShape) ambientModuleInfo {
	for _, decl := range moduleSymbol.Declarations {
		if ast.IsModuleWithStringLiteralName(decl) && (!ast.IsModuleAugmentationExternal(decl) || !tspath.IsExternalModuleNameRelative(decl.Name().Text())) {
			return ambientModuleInfo{name: tspath.ToModuleSpecifier(decl.Name().Text()), symbol: moduleSymbol}
		}
	}

	// the module could be a namespace, which is export through "export=" from an ambient module.
	/**
	 * declare module "m" {
	 *     namespace ns {
	 *         class c {}
	 *     }
	 *     export = ns;
	 * }
	 */
	// `import {c} from "m";` is valid, in which case, `moduleSymbol` is "ns", but the module name should be "m"
	for _, d := range moduleSymbol.Declarations {
		if !ast.IsModuleDeclaration(d) {
			continue
		}

		possibleContainer := ast.FindAncestor(d, ast.IsModuleWithStringLiteralName)
		if possibleContainer == nil || possibleContainer.Parent == nil || !ast.IsSourceFile(possibleContainer.Parent) {
			continue
		}

		sym, ok := possibleContainer.Symbol().Exports[ast.InternalSymbolNameExportEquals]
		if !ok || sym == nil {
			continue
		}
		exportAssignmentDecl := sym.ValueDeclaration
		if exportAssignmentDecl == nil || exportAssignmentDecl.Kind != ast.KindExportAssignment {
			continue
		}
		exportSymbol := checker.GetSymbolAtLocation(exportAssignmentDecl.Expression())
		if exportSymbol == nil {
			continue
		}
		if exportSymbol.Flags&ast.SymbolFlagsAlias != 0 {
			exportSymbol = checker.GetAliasedSymbol(exportSymbol)
		}
		// TODO: Possible strada bug - isn't this insufficient in the presence of merge symbols?
		if exportSymbol == d.Symbol() {
			return ambientModuleInfo{name: tspath.ToModuleSpecifier(possibleContainer.Name().Text()), symbol: possibleContainer.Symbol()}
		}
	}
	return ambientModuleInfo{}
}

type Info struct {
	CaseSensitivity         tspath.CaseSensitivity
	ImportingSourceFileName tspath.RootedFilePath
	SourceDirectory         tspath.RootedDirectoryPath
}

func getInfo(
	importingSourceFileName tspath.RootedFilePath,
	host ModuleSpecifierGenerationHost,
) Info {
	return Info{
		ImportingSourceFileName: importingSourceFileName,
		SourceDirectory:         importingSourceFileName.Directory(),
		CaseSensitivity:         host.CaseSensitivity(),
	}
}

func getAllModulePaths(
	info Info,
	importedFileName tspath.RootedFilePath,
	host ModuleSpecifierGenerationHost,
	compilerOptions *core.CompilerOptions,
	preferences UserPreferences,
	options ModuleSpecifierOptions,
) []ModulePath {
	// !!! use new cache model
	// importingFilePath := info.CaseSensitivity.PathKey(info.ImportingSourceFileName.AsPath())
	// importedFilePath := info.CaseSensitivity.PathKey(importedFileName.AsPath())
	// cache := host.getModuleSpecifierCache();
	// if (cache != nil) {
	//     cached := cache.get(importingFilePath, importedFilePath, preferences, options);
	//     if (cached.modulePaths) {return cached.modulePaths;}
	// }
	modulePaths := getAllModulePathsWorker(info, importedFileName, host, compilerOptions, options)
	// if (cache != nil) {
	//     cache.setModulePaths(importingFilePath, importedFilePath, preferences, options, modulePaths);
	// }
	return modulePaths
}

func getAllModulePathsWorker(
	info Info,
	importedFileName tspath.RootedFilePath,
	host ModuleSpecifierGenerationHost,
	compilerOptions *core.CompilerOptions,
	options ModuleSpecifierOptions,
) []ModulePath {
	allFileNames := make(map[tspath.RootedFilePath]ModulePath)
	paths := GetEachFileNameOfModule(info.ImportingSourceFileName, importedFileName, host, true)
	for _, p := range paths {
		allFileNames[p.FileName] = p
	}

	caseSensitivity := info.CaseSensitivity
	comparePaths := func(a, b ModulePath) int {
		return comparePathsByRedirect(a, b, caseSensitivity)
	}

	// Sort by paths closest to importing file Name directory
	sortedPaths := make([]ModulePath, 0, len(paths))
	for directory := info.SourceDirectory; len(allFileNames) != 0; {
		var pathsInDirectory []ModulePath
		for fileName, p := range allFileNames {
			if caseSensitivity.StartsWithDirectory(fileName, directory) {
				pathsInDirectory = append(pathsInDirectory, p)
				delete(allFileNames, fileName)
			}
		}
		if len(pathsInDirectory) > 0 {
			slices.SortFunc(pathsInDirectory, comparePaths)
			sortedPaths = append(sortedPaths, pathsInDirectory...)
		}
		newDirectory := directory.AsPath().Directory()
		if newDirectory == directory {
			break
		}
		directory = newDirectory
	}
	if len(allFileNames) > 0 {
		remainingPaths := slices.Collect(maps.Values(allFileNames))
		slices.SortFunc(remainingPaths, comparePaths)
		sortedPaths = append(sortedPaths, remainingPaths...)
	}
	return sortedPaths
}

// containsIgnoredPath checks if a path contains patterns that should be ignored.
// This is a local helper that duplicates tspath.ContainsIgnoredPath for performance.
func containsIgnoredPath(fileName tspath.RootedFilePath) bool {
	return strings.Contains(fileName.AsString(), "/node_modules/.") ||
		strings.Contains(fileName.AsString(), "/.git") ||
		strings.Contains(fileName.AsString(), ".#")
}

func moduleSpecifierContainsNodeModules(specifier tspath.ModuleSpecifier) bool {
	return strings.Contains(specifier.AsString(), "/node_modules/")
}

// GetEachFileNameOfModule returns all possible file paths for a module, including symlink alternatives.
// This function handles symlink resolution and provides multiple path options for module resolution.
func GetEachFileNameOfModule(
	importingFileName tspath.RootedFilePath,
	importedFileName tspath.RootedFilePath,
	host ModuleSpecifierGenerationHost,
	preferSymlinks bool,
) []ModulePath {
	caseSensitivity := host.CaseSensitivity()
	importedPath := caseSensitivity.PathKey(tspath.RootedPath(importedFileName))
	var referenceRedirect tspath.RootedFilePath
	outputAndReference := host.GetProjectReferenceFromSource(importedPath)
	if outputAndReference != nil && outputAndReference.OutputDts != "" {
		referenceRedirect = outputAndReference.OutputDts
	}

	redirects := host.GetRedirectTargets(importedPath)
	importedFileNames := make([]tspath.RootedFilePath, 0, 2+len(redirects))
	if referenceRedirect != "" {
		importedFileNames = append(importedFileNames, referenceRedirect)
	}
	importedFileNames = append(importedFileNames, importedFileName)
	importedFileNames = append(importedFileNames, redirects...)
	targets := importedFileNames
	shouldFilterIgnoredPaths := !core.Every(targets, containsIgnoredPath)

	results := make([]ModulePath, 0, 2)
	if !preferSymlinks {
		for _, p := range targets {
			if !(shouldFilterIgnoredPaths && containsIgnoredPath(p)) {
				results = append(results, ModulePath{
					FileName:        p,
					IsInNodeModules: p.ContainsLowercaseDirectorySequence("/node_modules/"),
					IsRedirect:      referenceRedirect == p,
				})
			}
		}
	}

	symlinkCache := host.GetSymlinkCache()
	if symlinkCache != nil {
		tspath.ForEachAncestorDirectoryPathStoppingAtGlobalCache(
			host.GetGlobalTypingsCacheLocation(),
			importedFileName.Directory(),
			func(realPathDirectory tspath.RootedDirectoryPath) (bool, bool) {
				symlinkSet, ok := symlinkCache.DirectoriesByRealpath().Load(caseSensitivity.PathKey(realPathDirectory.AsPath()))
				if !ok {
					return false, false
				} // Continue to ancestor directory

				// Don't want to a package to globally import from itself (importNameCodeFix_symlink_own_package.ts)
				if caseSensitivity.ContainsFilePath(realPathDirectory, importingFileName) {
					return false, true // Stop search, each ancestor directory will also hit this condition
				}

				for _, target := range targets {
					relative, ok := caseSensitivity.RelativeFilePathFromDirectory(realPathDirectory, target)
					if !ok {
						continue
					}
					symlinkSet.Range(func(symlinkDirectory tspath.RootedDirectoryPath) bool {
						option := symlinkDirectory.ResolveRelativeFile(relative)
						results = append(results, ModulePath{
							FileName:        option,
							IsInNodeModules: option.ContainsLowercaseDirectorySequence("/node_modules/"),
							IsRedirect:      target == referenceRedirect,
						})
						shouldFilterIgnoredPaths = true // We found a non-ignored path in symlinks, so we can reject ignored-path realpaths
						return true
					})
				}

				return false, false
			},
		)
	}

	if preferSymlinks {
		for _, p := range targets {
			if !(shouldFilterIgnoredPaths && containsIgnoredPath(p)) {
				results = append(results, ModulePath{
					FileName:        p,
					IsInNodeModules: p.ContainsLowercaseDirectorySequence("/node_modules/"),
					IsRedirect:      referenceRedirect == p,
				})
			}
		}
	}

	return results
}

func computeModuleSpecifiers(
	modulePaths []ModulePath,
	compilerOptions *core.CompilerOptions,
	importingSourceFile SourceFileForSpecifierGeneration,
	host ModuleSpecifierGenerationHost,
	userPreferences UserPreferences,
	options ModuleSpecifierOptions,
	forAutoImport bool,
) ([]tspath.ModuleSpecifier, ResultKind) {
	info := getInfo(importingSourceFile.FileName(), host)
	preferences := getModuleSpecifierPreferences(userPreferences, host, compilerOptions, importingSourceFile, "")
	caseSensitivity := info.CaseSensitivity

	var existingSpecifier tspath.ModuleSpecifier
	for _, modulePath := range modulePaths {
		targetPath := caseSensitivity.PathKey(tspath.RootedPath(modulePath.FileName))
		var existingImport *ast.StringLiteralLike
		for _, importSpecifier := range importingSourceFile.Imports() {
			resolvedModule := host.GetResolvedModuleFromModuleSpecifier(importingSourceFile, importSpecifier)
			if resolvedModule.IsResolved() && resolvedModule.ResolvedPath == targetPath {
				existingImport = importSpecifier
				break
			}
		}
		if existingImport != nil {
			if preferences.relativePreference == RelativePreferenceNonRelative && tspath.PathIsRelative(existingImport.Text()) {
				// If the preference is for non-relative and the module specifier is relative, ignore it
				continue
			}
			existingMode := host.GetModeForUsageLocation(importingSourceFile, existingImport)
			targetMode := options.OverrideImportMode
			if targetMode == core.ResolutionModeNone {
				targetMode = host.GetDefaultResolutionModeForFile(importingSourceFile)
			}
			if existingMode != targetMode && existingMode != core.ResolutionModeNone && targetMode != core.ResolutionModeNone {
				// If the candidate import mode doesn't match the mode we're generating for, don't consider it
				continue
			}
			existingSpecifier = tspath.ToModuleSpecifier(existingImport.Text())
			break
		}
	}

	if existingSpecifier != "" {
		return []tspath.ModuleSpecifier{existingSpecifier}, ResultKindNone
	}

	importedFileIsInNodeModules := core.Some(modulePaths, func(p ModulePath) bool { return p.IsInNodeModules })

	// Module specifier priority:
	//   1. "Bare package specifiers" (e.g. "@foo/bar") resulting from a path through node_modules to a package.json's "types" entry
	//   2. Specifiers generated using "paths" from tsconfig
	//   3. Non-relative specfiers resulting from a path through node_modules (e.g. "@foo/bar/path/to/file")
	//   4. Relative paths
	var pathsSpecifiers []tspath.ModuleSpecifier
	var redirectPathsSpecifiers []tspath.ModuleSpecifier
	var nodeModulesSpecifiers []tspath.ModuleSpecifier
	var relativeSpecifiers []tspath.ModuleSpecifier

	for _, modulePath := range modulePaths {
		var specifier tspath.ModuleSpecifier
		if modulePath.IsInNodeModules {
			specifier = tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, userPreferences /*packageNameOnly*/, false, options.OverrideImportMode)
		}
		if len(specifier) > 0 && !(forAutoImport && IsExcludedByRegex(specifier.AsString(), preferences.excludeRegexes)) {
			nodeModulesSpecifiers = append(nodeModulesSpecifiers, specifier)
			if modulePath.IsRedirect {
				// If we got a specifier for a redirect, it was a bare package specifier (e.g. "@foo/bar",
				// not "@foo/bar/path/to/file"). No other specifier will be this good, so stop looking.
				return nodeModulesSpecifiers, ResultKindNodeModules
			}
		}

		importMode := options.OverrideImportMode
		if importMode == core.ResolutionModeNone {
			importMode = host.GetDefaultResolutionModeForFile(importingSourceFile)
		}
		local := getLocalModuleSpecifier(
			modulePath.FileName,
			info,
			compilerOptions,
			host,
			importMode,
			preferences,
			/*pathsOnly*/ modulePath.IsRedirect || len(specifier) > 0,
		)
		if len(local) == 0 || forAutoImport && IsExcludedByRegex(local.AsString(), preferences.excludeRegexes) {
			continue
		}
		if modulePath.IsRedirect {
			redirectPathsSpecifiers = append(redirectPathsSpecifiers, local)
		} else if PathIsBareSpecifier(local) {
			if moduleSpecifierContainsNodeModules(local) {
				// We could be in this branch due to inappropriate use of `baseUrl`, not intentional `paths`
				// usage. It's impossible to reason about where to prioritize baseUrl-generated module
				// specifiers, but if they contain `/node_modules/`, they're going to trigger a portability
				// error, so *at least* don't prioritize those.
				relativeSpecifiers = append(relativeSpecifiers, local)
			} else {
				pathsSpecifiers = append(pathsSpecifiers, local)
			}
		} else if forAutoImport || !importedFileIsInNodeModules || modulePath.IsInNodeModules {
			// Why this extra conditional, not just an `else`? If some path to the file contained
			// 'node_modules', but we can't create a non-relative specifier (e.g. "@foo/bar/path/to/file"),
			// that means we had to go through a *sibling's* node_modules, not one we can access directly.
			// If some path to the file was in node_modules but another was not, this likely indicates that
			// we have a monorepo structure with symlinks. In this case, the non-nodeModules path is
			// probably the realpath, e.g. "../bar/path/to/file", but a relative path to another package
			// in a monorepo is probably not portable. So, the module specifier we actually go with will be
			// the relative path through node_modules, so that the declaration emitter can produce a
			// portability error. (See declarationEmitReexportedSymlinkReference3)
			relativeSpecifiers = append(relativeSpecifiers, local)
		}
	}

	if len(pathsSpecifiers) > 0 {
		return pathsSpecifiers, ResultKindPaths
	}
	if len(redirectPathsSpecifiers) > 0 {
		return redirectPathsSpecifiers, ResultKindRedirect
	}
	if len(nodeModulesSpecifiers) > 0 {
		return nodeModulesSpecifiers, ResultKindNodeModules
	}
	return relativeSpecifiers, ResultKindRelative
}

func getLocalModuleSpecifier(
	moduleFileName tspath.RootedFilePath,
	info Info,
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	importMode core.ResolutionMode,
	preferences ModuleSpecifierPreferences,
	pathsOnly bool,
) tspath.ModuleSpecifier {
	paths := compilerOptions.Paths
	rootDirs := compilerOptions.GetEffectiveRootDirs()

	if pathsOnly && paths == nil {
		return ""
	}

	sourceDirectory := info.SourceDirectory

	allowedEndings := preferences.getAllowedEndingsInPreferredOrder(importMode)
	var relativePath tspath.ModuleSpecifier
	if len(rootDirs) > 0 {
		relativePath = tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, allowedEndings, compilerOptions, host)
	}
	if len(relativePath) == 0 {
		relativePathFromSource, ok := host.CaseSensitivity().RelativePathFromDirectory(sourceDirectory, moduleFileName)
		path := moduleFileName.AsString()
		if ok {
			path = relativePathFromSource.AsModuleSpecifier().AsString()
		}
		relativePath = processEnding(
			tspath.ToModuleSpecifier(path),
			moduleFileName,
			allowedEndings,
			compilerOptions,
			host,
		)
	}

	if (paths == nil && !compilerOptions.GetResolvePackageJsonImports()) || preferences.relativePreference == RelativePreferenceRelative {
		if pathsOnly {
			return ""
		}
		return relativePath
	}

	baseDirectory := host.BaseDirectory()
	if pathsBasePath := compilerOptions.GetPathsBasePath(baseDirectory); pathsBasePath != "" {
		baseDirectory = pathsBasePath
	}
	relativeToBaseUrl := getRelativePathIfInSameVolume(moduleFileName, baseDirectory, host.CaseSensitivity())
	if len(relativeToBaseUrl) == 0 {
		if pathsOnly {
			return ""
		}
		return relativePath
	}

	var fromPackageJsonImports tspath.ModuleSpecifier
	if !pathsOnly {
		fromPackageJsonImports = tryGetModuleNameFromPackageJsonImports(
			moduleFileName,
			sourceDirectory,
			compilerOptions,
			host,
			importMode,
			prefersTsExtension(allowedEndings),
		)
	}

	var fromPaths string
	if (pathsOnly || len(fromPackageJsonImports) == 0) && paths != nil {
		fromPaths = tryGetModuleNameFromPaths(
			relativeToBaseUrl.AsString(),
			moduleFileName,
			paths,
			allowedEndings,
			baseDirectory,
			host,
			compilerOptions,
		)
	}

	if pathsOnly {
		return tspath.ToModuleSpecifier(fromPaths)
	}

	var maybeNonRelative string
	if len(fromPackageJsonImports) > 0 {
		maybeNonRelative = fromPackageJsonImports.AsString()
	} else {
		maybeNonRelative = fromPaths
	}
	if len(maybeNonRelative) == 0 {
		return relativePath
	}

	relativeIsExcluded := IsExcludedByRegex(relativePath.AsString(), preferences.excludeRegexes)
	nonRelativeIsExcluded := IsExcludedByRegex(maybeNonRelative, preferences.excludeRegexes)
	if !relativeIsExcluded && nonRelativeIsExcluded {
		return relativePath
	}
	if relativeIsExcluded && !nonRelativeIsExcluded {
		return tspath.ToModuleSpecifier(maybeNonRelative)
	}

	if preferences.relativePreference == RelativePreferenceNonRelative && !tspath.PathIsRelative(maybeNonRelative) {
		return tspath.ToModuleSpecifier(maybeNonRelative)
	}

	if preferences.relativePreference == RelativePreferenceExternalNonRelative && !tspath.PathIsRelative(maybeNonRelative) {
		var projectDirectory tspath.PathKey
		if configFileName := compilerOptions.ConfigFilePath; configFileName != "" {
			projectDirectory = host.CaseSensitivity().PathKey(configFileName.Directory().AsPath())
		} else {
			projectDirectory = host.CaseSensitivity().PathKey(host.BaseDirectory().AsPath())
		}
		caseSensitivity := host.CaseSensitivity()
		canonicalSourceDirectory := caseSensitivity.PathKey(sourceDirectory.AsPath())
		modulePath := caseSensitivity.PathKey(tspath.RootedPath(moduleFileName))

		sourceIsInternal := projectDirectory.ContainsPath(canonicalSourceDirectory)
		targetIsInternal := projectDirectory.ContainsPath(modulePath)
		if sourceIsInternal && !targetIsInternal || !sourceIsInternal && targetIsInternal {
			// 1. The import path crosses the boundary of the tsconfig.json-containing directory.
			//
			//      src/
			//        tsconfig.json
			//        index.ts -------
			//      lib/              | (path crosses tsconfig.json)
			//        imported.ts <---
			//
			return tspath.ToModuleSpecifier(maybeNonRelative)
		}

		nearestTargetPackageJson := host.GetNearestAncestorDirectoryWithPackageJson(moduleFileName.Directory())
		nearestSourcePackageJson := host.GetNearestAncestorDirectoryWithPackageJson(sourceDirectory)

		if !packageJsonPathsAreEqual(nearestTargetPackageJson, nearestSourcePackageJson, host.CaseSensitivity()) {
			// 2. The importing and imported files are part of different packages.
			//
			//      packages/a/
			//        package.json
			//        index.ts --------
			//      packages/b/        | (path crosses package.json)
			//        package.json     |
			//        component.ts <---
			//
			return tspath.ToModuleSpecifier(maybeNonRelative)
		}

		return relativePath
	}

	// Prefer a relative import over a baseUrl import if it has fewer components.
	if strings.HasPrefix(maybeNonRelative, "..") || CountPathComponents(relativePath.AsString()) < CountPathComponents(maybeNonRelative) {
		return relativePath
	}
	return tspath.ToModuleSpecifier(maybeNonRelative)
}

func processEnding(
	specifier tspath.ModuleSpecifier,
	sourceFileName tspath.RootedFilePath,
	allowedEndings []ModuleSpecifierEnding,
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
) tspath.ModuleSpecifier {
	fileName := specifier.AsString()
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionJson, tspath.ExtensionMjs, tspath.ExtensionCjs}) {
		return specifier
	}

	noExtension := tspath.RemoveFileExtension(fileName)
	if fileName == noExtension {
		return specifier
	}

	jsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingJsExtension)
	tsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingTsExtension)
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionMts, tspath.ExtensionCts}) && tsPriority != -1 && tsPriority < jsPriority {
		return specifier
	}
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionDmts, tspath.ExtensionDcts}) {
		inputExt := tspath.GetDeclarationFileExtension(fileName)
		ext := GetJSExtensionForDeclarationFileExtension(inputExt)
		return tspath.ToModuleSpecifier(tspath.RemoveExtension(fileName, inputExt) + ext)
	}
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionMts, tspath.ExtensionCts}) {
		return tspath.ToModuleSpecifier(noExtension + getJSExtensionForFile(fileName, options))
	}
	if !tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionDts}) && tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionTs}) && strings.Contains(fileName, ".d.") {
		// `foo.d.json.ts` and the like - remap back to `foo.json`
		if result := TryGetRealFileNameForNonJSDeclarationFileName(fileName); result != "" {
			return tspath.ToModuleSpecifier(result)
		}
	}

	switch allowedEndings[0] {
	case ModuleSpecifierEndingMinimal:
		withoutIndex := strings.TrimSuffix(noExtension, "/index")
		if host != nil && withoutIndex != noExtension && tryGetAnyFileFromPath(host, tspath.RootedFilePathFromPath(sourceFileName.Directory().AsPath())) {
			// Can't remove index if there's a file by the same name as the directory.
			// Probably more callers should pass `host` so we can determine this?
			return tspath.ToModuleSpecifier(noExtension)
		}
		return tspath.ToModuleSpecifier(withoutIndex)
	case ModuleSpecifierEndingIndex:
		return tspath.ToModuleSpecifier(noExtension)
	case ModuleSpecifierEndingJsExtension:
		return tspath.ToModuleSpecifier(noExtension + getJSExtensionForFile(fileName, options))
	case ModuleSpecifierEndingTsExtension:
		// For now, we don't know if this import is going to be type-only, which means we don't
		// know if a .d.ts extension is valid, so use no extension or a .js extension
		if tspath.IsDeclarationFileName(fileName) {
			extensionlessPriority := -1
			for i, e := range allowedEndings {
				if e == ModuleSpecifierEndingMinimal || e == ModuleSpecifierEndingIndex {
					extensionlessPriority = i
					break
				}
			}
			if extensionlessPriority != -1 && extensionlessPriority < jsPriority {
				return tspath.ToModuleSpecifier(noExtension)
			}
			return tspath.ToModuleSpecifier(noExtension + getJSExtensionForFile(fileName, options))
		}
		return specifier
	default:
		debug.AssertNever(allowedEndings[0])
		return ""
	}
}

func tryGetModuleNameFromRootDirs(
	rootDirs []tspath.RootedDirectoryPath,
	moduleFileName tspath.RootedFilePath,
	sourceDirectory tspath.RootedDirectoryPath,
	allowedEndings []ModuleSpecifierEnding,
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
) tspath.ModuleSpecifier {
	normalizedTargetPaths := getPathsRelativeToRootDirs(moduleFileName, rootDirs, host.CaseSensitivity())
	if len(normalizedTargetPaths) == 0 {
		return ""
	}

	normalizedSourcePaths := getPathsRelativeToRootDirs(tspath.RootedFilePathFromPath(sourceDirectory.AsPath()), rootDirs, host.CaseSensitivity())
	var shortest tspath.ModuleSpecifier
	var shortestSepCount int
	for _, sourcePath := range normalizedSourcePaths {
		for _, targetPath := range normalizedTargetPaths {
			candidate := host.CaseSensitivity().RelativePathFromRelativeDirectory(sourcePath, targetPath).AsModuleSpecifier()
			candidateSepCount := strings.Count(candidate.AsString(), "/")
			if len(shortest) == 0 || candidateSepCount < shortestSepCount {
				shortest = candidate
				shortestSepCount = candidateSepCount
			}
		}
	}

	if len(shortest) == 0 {
		return ""
	}
	return processEnding(shortest, moduleFileName, allowedEndings, compilerOptions, host)
}

func tryGetModuleNameAsNodeModule(
	pathObj ModulePath,
	info Info,
	importingSourceFile SourceFileForSpecifierGeneration,
	host ModuleSpecifierGenerationHost,
	options *core.CompilerOptions,
	userPreferences UserPreferences,
	packageNameOnly bool,
	overrideMode core.ResolutionMode,
) tspath.ModuleSpecifier {
	parts := GetNodeModulePathParts(pathObj.FileName)
	if parts == nil {
		return ""
	}

	// Simplify the full file path to something that can be resolved by Node.
	preferences := getModuleSpecifierPreferences(userPreferences, host, options, importingSourceFile, "")
	allowedEndings := preferences.getAllowedEndingsInPreferredOrder(core.ResolutionModeNone)

	caseSensitivity := host.CaseSensitivity()
	moduleSpecifier := pathObj.FileName.AsString()
	isPackageRootPath := false
	if !packageNameOnly {
		if parts.IsDirectNodeModulesFile {
			moduleSpecifier = processEnding(pathObj.FileName.AsModuleSpecifier(), pathObj.FileName, allowedEndings, options, host).AsString()
		} else {
			var moduleFileName tspath.RootedFilePath
			packageRootDirectory := parts.PackageRootDirectory
			relativeComponents := strings.Split(parts.PackageRelativePath.AsString(), "/")
			for i := 0; ; i++ {
				packagePath, ok := packageRootDirectory.AsPath().RelativeTo(parts.TopLevelNodeModulesDirectory)
				if !ok {
					return ""
				}
				// If the module could be imported by a directory name, use that directory's name
				pkgJsonResults := tryDirectoryWithPackageJson(
					packageRootDirectory,
					parts.PackageRootDirectory,
					packagePath.AsString(),
					pathObj,
					importingSourceFile,
					host,
					overrideMode,
					options,
					allowedEndings,
				)
				moduleFileToTry := pkgJsonResults.moduleFileToTry
				resolvedPackageRoot := pkgJsonResults.packageRootDirectory
				blockedByExports := pkgJsonResults.blockedByExports
				if blockedByExports {
					return "" // File is under this package.json, but is not publicly exported - there's no way to name it via `node_modules` resolution
				}
				if pkgJsonResults.verbatimFromExports != "" {
					return pkgJsonResults.verbatimFromExports
				}
				//}
				if resolvedPackageRoot != "" {
					moduleSpecifier = resolvedPackageRoot.AsString()
					isPackageRootPath = true
					break
				}
				if len(moduleFileName) == 0 {
					moduleFileName = moduleFileToTry
				}
				if i >= len(relativeComponents)-1 {
					moduleSpecifier = processEnding(moduleFileName.AsModuleSpecifier(), moduleFileName, allowedEndings, options, host).AsString()
					break
				}
				packageRootDirectory = packageRootDirectory.ResolveDirectory(relativeComponents[i])
			}
		}
	}

	if pathObj.IsRedirect && !isPackageRootPath {
		return ""
	}

	globalTypingsCacheLocation := host.GetGlobalTypingsCacheLocation()
	// Get a path that's relative to node_modules or the importing file's path
	// if node_modules folder is in this folder or any of its parent folders, no need to keep it.
	if !caseSensitivity.ContainsPath(parts.TopLevelNodeModulesSearchRoot, info.SourceDirectory.AsPath()) ||
		globalTypingsCacheLocation != "" && caseSensitivity.ContainsPath(parts.TopLevelNodeModulesSearchRoot, globalTypingsCacheLocation.AsPath()) {
		return ""
	}

	// If the module was found in @types, get the actual Node package name
	nodeModulesPrefix := tspath.EnsureTrailingDirectorySeparator(parts.TopLevelNodeModulesDirectory.AsString())
	if !strings.HasPrefix(moduleSpecifier, nodeModulesPrefix) {
		return ""
	}
	nodeModulesDirectoryName := moduleSpecifier[len(nodeModulesPrefix):]
	return tspath.ToModuleSpecifier(module.GetPackageNameFromTypesPackageName(nodeModulesDirectoryName))
}

type pkgJsonDirAttemptResult struct {
	moduleFileToTry      tspath.RootedFilePath
	packageRootDirectory tspath.RootedDirectoryPath
	blockedByExports     bool
	verbatimFromExports  tspath.ModuleSpecifier
}

func tryDirectoryWithPackageJson(
	packageRootDirectory tspath.RootedDirectoryPath,
	packageBaseDirectory tspath.RootedDirectoryPath,
	packageName string,
	pathObj ModulePath,
	importingSourceFile SourceFileForSpecifierGeneration,
	host ModuleSpecifierGenerationHost,
	overrideMode core.ResolutionMode,
	options *core.CompilerOptions,
	allowedEndings []ModuleSpecifierEnding,
) pkgJsonDirAttemptResult {
	packageJsonPath := packageRootDirectory.ResolveFile("package.json")
	moduleFileToTry := pathObj.FileName
	maybeBlockedByTypesVersions := false
	packageJson := host.GetPackageJsonInfo(packageJsonPath)
	if packageJson == nil {
		// No package.json exists; an index.js will still resolve as the package name
		relative, ok := moduleFileToTry.RelativeTo(packageBaseDirectory)
		if !ok {
			panic("module file was not contained by package root")
		}
		fileName := relative.AsString()
		if fileName == "index.d.ts" || fileName == "index.js" || fileName == "index.ts" || fileName == "index.tsx" {
			return pkgJsonDirAttemptResult{moduleFileToTry: moduleFileToTry, packageRootDirectory: packageRootDirectory}
		} else {
			return pkgJsonDirAttemptResult{moduleFileToTry: moduleFileToTry}
		}
	}

	importMode := overrideMode
	if importMode == core.ResolutionModeNone {
		importMode = host.GetDefaultResolutionModeForFile(importingSourceFile)
	}

	packageJsonContent := packageJson.GetContents()
	if options.GetResolvePackageJsonExports() {
		// The package name that we found in node_modules could be different from the package
		// name in the package.json content via url/filepath dependency specifiers. We need to
		// use the actual directory name, so don't look at `packageJsonContent.name` here.
		packageName := module.GetPackageNameFromTypesPackageName(packageName)

		// Determine resolution mode for package.json exports condition matching.
		// TypeScript's tryDirectoryWithPackageJson uses the importing file's mode (moduleSpecifiers.ts:1257),
		// but this causes incorrect exports resolution. We fix this by checking the target file's extension
		// using the logic from getImpliedNodeFormatForEmitWorker (program.ts:4827-4838).
		// .cjs/.cts/.d.cts → CommonJS → "require" condition
		// .mjs/.mts/.d.mts → ESM → "import" condition
		if pathObj.FileName.ExtensionIsOneOf([]string{tspath.ExtensionCjs, tspath.ExtensionCts, tspath.ExtensionDcts}) {
			importMode = core.ResolutionModeCommonJS
		} else if pathObj.FileName.ExtensionIsOneOf([]string{tspath.ExtensionMjs, tspath.ExtensionMts, tspath.ExtensionDmts}) {
			importMode = core.ResolutionModeESM
		}

		conditions := module.GetConditions(options, importMode)

		var fromExports tspath.ModuleSpecifier
		if packageJsonContent != nil && packageJsonContent.Fields.Exports.Type != packagejson.JSONValueTypeNotPresent {
			fromExports = tryGetModuleNameFromExports(
				options,
				host,
				pathObj.FileName,
				packageRootDirectory,
				packageName,
				packageJsonContent.Fields.Exports,
				conditions,
			)
		}
		if len(fromExports) > 0 {
			return pkgJsonDirAttemptResult{
				verbatimFromExports: fromExports,
			}
		}
		if packageJsonContent != nil && packageJsonContent.Fields.Exports.Type != packagejson.JSONValueTypeNotPresent {
			return pkgJsonDirAttemptResult{
				moduleFileToTry:  moduleFileToTry,
				blockedByExports: true,
			}
		}
	}

	var versionPaths packagejson.VersionPaths
	if packageJsonContent != nil && packageJsonContent.TypesVersions.Type == packagejson.JSONValueTypeObject {
		versionPaths = packageJsonContent.GetVersionPaths(nil)
	}
	if versionPaths.GetPaths() != nil {
		subModuleName, ok := moduleFileToTry.RelativeTo(packageRootDirectory)
		if !ok {
			panic("module file was not contained by package root")
		}
		fromPaths := tryGetModuleNameFromPaths(
			subModuleName.AsString(),
			moduleFileToTry,
			versionPaths.GetPaths(),
			allowedEndings,
			packageRootDirectory,
			host,
			options,
		)
		if len(fromPaths) == 0 {
			maybeBlockedByTypesVersions = true
		} else {
			moduleFileToTry = packageRootDirectory.ResolveFile(fromPaths)
		}
	}
	// If the file is the main module, it can be imported by the package name
	mainFileRelative := "index.js"
	if packageJsonContent != nil {
		if packageJsonContent.Typings.Valid {
			mainFileRelative = packageJsonContent.Typings.Value
		} else if packageJsonContent.Types.Valid {
			mainFileRelative = packageJsonContent.Types.Value
		} else if packageJsonContent.Main.Valid {
			mainFileRelative = packageJsonContent.Main.Value
		}
	}

	if len(mainFileRelative) > 0 && !(maybeBlockedByTypesVersions && module.MatchPatternOrExact(module.TryParsePatterns(versionPaths.GetPaths()), mainFileRelative) != core.Pattern{}) {
		// The 'main' file is also subject to mapping through typesVersions, and we couldn't come up with a path
		// explicitly through typesVersions, so if it matches a key in typesVersions now, it's not reachable.
		// (The only way this can happen is if some file in a package that's not resolvable from outside the
		// package got pulled into the program anyway, e.g. transitively through a file that *is* reachable. It
		// happens very easily in fourslash tests though, since every test file listed gets included. See
		// importNameCodeFix_typesVersions.ts for an example.)
		caseSensitivity := host.CaseSensitivity()
		packageType := ""
		if packageJsonContent != nil {
			packageType = packageJsonContent.Type.Value
		}
		if isPackageMainFile(moduleFileToTry, packageRootDirectory, mainFileRelative, packageType, caseSensitivity) {
			return pkgJsonDirAttemptResult{packageRootDirectory: packageRootDirectory, moduleFileToTry: moduleFileToTry}
		}
	}

	return pkgJsonDirAttemptResult{moduleFileToTry: moduleFileToTry}
}

func isPackageMainFile(
	moduleFileName tspath.RootedFilePath,
	packageRootDirectory tspath.RootedDirectoryPath,
	mainFileRelative string,
	packageType string,
	caseSensitivity tspath.CaseSensitivity,
) bool {
	mainIsDirectory := tspath.HasTrailingDirectorySeparator(mainFileRelative)
	mainExportFile := packageRootDirectory.ResolveFile(mainFileRelative)

	if !mainIsDirectory && caseSensitivity.CompareFilePaths(mainExportFile.RemoveFileExtension(), moduleFileName.RemoveFileExtension()) == 0 {
		// An arbitrary removal of file extension for this comparison is almost certainly wrong.
		return true
	}
	mainExportDirectory := tspath.RootedDirectoryPathFromPath(tspath.RootedPath(mainExportFile))
	return packageType != "module" &&
		!moduleFileName.ExtensionIsOneOf(tspath.ExtensionsNotSupportingExtensionlessResolution) &&
		caseSensitivity.ComparePaths(moduleFileName.Directory().AsPath(), mainExportDirectory.AsPath()) == 0 &&
		moduleFileName.RemoveFileExtension().BaseName() == "index"
}

func tryGetModuleNameFromExports(
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	targetFileName tspath.RootedFilePath,
	packageDirectory tspath.RootedDirectoryPath,
	packageName string,
	exports packagejson.ExportsOrImports,
	conditions []string,
) tspath.ModuleSpecifier {
	if exports.IsSubpaths() {
		// sub-mappings
		// 3 cases:
		// * directory mappings (legacyish, key ends with / (technically allows index/extension resolution under cjs mode))
		// * pattern mappings (contains a *)
		// * exact mappings (no *, does not end with /)
		for k, subk := range exports.AsObject().Entries() {
			subPackageName := tspath.ResolvePathWithoutTrailingDirectorySeparator(packageName, k)
			mode := MatchingModeExact
			if strings.HasSuffix(k, "/") {
				mode = MatchingModeDirectory
			} else if strings.Contains(k, "*") {
				mode = MatchingModePattern
			}
			result := tryGetModuleNameFromExportsOrImports(options, host, targetFileName, packageDirectory, subPackageName, subk, conditions, mode /*isImports*/, false /*preferTsExtension*/, false)
			if len(result) > 0 {
				return tspath.ToModuleSpecifier(result)
			}
		}
	}
	return tspath.ToModuleSpecifier(tryGetModuleNameFromExportsOrImports(
		options,
		host,
		targetFileName,
		packageDirectory,
		packageName,
		exports,
		conditions,
		MatchingModeExact,
		/*isImports*/ false,
		/*preferTsExtension*/ false,
	))
}

func tryGetModuleNameFromPackageJsonImports(
	moduleFileName tspath.RootedFilePath,
	sourceDirectory tspath.RootedDirectoryPath,
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	importMode core.ResolutionMode,
	preferTsExtension bool,
) tspath.ModuleSpecifier {
	if !options.GetResolvePackageJsonImports() {
		return ""
	}

	ancestorDirectoryWithPackageJson := host.GetNearestAncestorDirectoryWithPackageJson(sourceDirectory)
	if len(ancestorDirectoryWithPackageJson) == 0 {
		return ""
	}
	packageJsonPath := ancestorDirectoryWithPackageJson.ResolveFile("package.json")

	info := host.GetPackageJsonInfo(packageJsonPath)
	if info == nil {
		return ""
	}

	imports := info.GetContents().Fields.Imports
	switch imports.Type {
	case packagejson.JSONValueTypeNotPresent, packagejson.JSONValueTypeArray, packagejson.JSONValueTypeString:
		return "" // not present or invalid for imports
	case packagejson.JSONValueTypeObject:
		conditions := module.GetConditions(options, importMode)
		top := imports.AsObject()
		entries := top.Entries()
		for k, value := range entries {
			if k == "#" || k == "#/" || !strings.HasPrefix(k, "#") {
				continue // invalid imports entry
			}
			if strings.HasPrefix(k, "#/") && options.GetModuleResolutionKind() != core.ModuleResolutionKindNodeNext && options.GetModuleResolutionKind() != core.ModuleResolutionKindBundler {
				continue // "#/" imports keys are only valid in nodenext/bundler
			}
			mode := MatchingModeExact
			if strings.HasSuffix(k, "/") {
				mode = MatchingModeDirectory
			} else if strings.Contains(k, "*") {
				mode = MatchingModePattern
			}
			result := tryGetModuleNameFromExportsOrImports(
				options,
				host,
				moduleFileName,
				ancestorDirectoryWithPackageJson,
				k,
				value,
				conditions,
				mode,
				true,
				preferTsExtension,
			)
			if len(result) > 0 {
				return tspath.ToModuleSpecifier(result)
			}
		}
	}

	return ""
}

type specPair struct {
	ending ModuleSpecifierEnding
	value  tspath.ModuleSpecifier
}

func tryGetModuleNameFromPaths(
	relativeToBaseUrl string,
	fileName tspath.RootedFilePath,
	paths *collections.OrderedMap[string, []string],
	allowedEndings []ModuleSpecifierEnding,
	baseDirectory tspath.RootedDirectoryPath,
	host ModuleSpecifierGenerationHost,
	compilerOptions *core.CompilerOptions,
) string {
	caseSensitivity := host.CaseSensitivity()
	for key, values := range paths.Entries() {
		for _, patternText := range values {
			normalized := tspath.NormalizePath(patternText)
			pattern := resolvePathPatternIfInSameVolume(normalized, baseDirectory, caseSensitivity)
			if len(pattern) == 0 {
				pattern = normalized
			}
			prefix, suffix, ok := strings.Cut(pattern, "*")

			// In module resolution, if `pattern` itself has an extension, a file with that extension is looked up directly,
			// meaning a '.ts' or '.d.ts' extension is allowed to resolve. This is distinct from the case where a '*' substitution
			// causes a module specifier to have an extension, i.e. the extension comes from the module specifier in a JS/TS file
			// and matches the '*'. For example:
			//
			// Module Specifier      | Path Mapping (key: [pattern]) | Interpolation       | Resolution Action
			// ---------------------->------------------------------->--------------------->---------------------------------------------------------------
			// import "@app/foo"    -> "@app/*": ["./src/app/*.ts"] -> "./src/app/foo.ts" -> tryFile("./src/app/foo.ts") || [continue resolution algorithm]
			// import "@app/foo.ts" -> "@app/*": ["./src/app/*"]    -> "./src/app/foo.ts" -> [continue resolution algorithm]
			//
			// (https://github.com/microsoft/TypeScript/blob/ad4ded80e1d58f0bf36ac16bea71bc10d9f09895/src/compiler/moduleNameResolver.ts#L2509-L2516)
			//
			// The interpolation produced by both scenarios is identical, but only in the former, where the extension is encoded in
			// the path mapping rather than in the module specifier, will we prioritize a file lookup on the interpolation result.
			// (In fact, currently, the latter scenario will necessarily fail since no resolution mode recognizes '.ts' as a valid
			// extension for a module specifier.)
			//
			// Here, this means we need to be careful about whether we generate a match from the target filename (typically with a
			// .ts extension) or the possible relative module specifiers representing that file:
			//
			// Filename            | Relative Module Specifier Candidates         | Path Mapping                 | Filename Result    | Module Specifier Results
			// --------------------<----------------------------------------------<------------------------------<-------------------||----------------------------
			// dist/haha.d.ts      <- dist/haha, dist/haha.js                     <- "@app/*": ["./dist/*.d.ts"] <- @app/haha        || (none)
			// dist/haha.d.ts      <- dist/haha, dist/haha.js                     <- "@app/*": ["./dist/*"]      <- (none)           || @app/haha, @app/haha.js
			// dist/foo/index.d.ts <- dist/foo, dist/foo/index, dist/foo/index.js <- "@app/*": ["./dist/*.d.ts"] <- @app/foo/index   || (none)
			// dist/foo/index.d.ts <- dist/foo, dist/foo/index, dist/foo/index.js <- "@app/*": ["./dist/*"]      <- (none)           || @app/foo, @app/foo/index, @app/foo/index.js
			// dist/wow.js.js      <- dist/wow.js, dist/wow.js.js                 <- "@app/*": ["./dist/*.js"]   <- @app/wow.js      || @app/wow, @app/wow.js
			//
			// The "Filename Result" can be generated only if `pattern` has an extension. Care must be taken that the list of
			// relative module specifiers to run the interpolation (a) is actually valid for the module resolution mode, (b) takes
			// into account the existence of other files (e.g. 'dist/wow.js' cannot refer to 'dist/wow.js.js' if 'dist/wow.js'
			// exists) and (c) that they are ordered by preference. The last row shows that the filename result and module
			// specifier results are not mutually exclusive. Note that the filename result is a higher priority in module
			// resolution, but as long criteria (b) above is met, I don't think its result needs to be the highest priority result
			// in module specifier generation. I have included it last, as it's difficult to tell exactly where it should be
			// sorted among the others for a particular value of `importModuleSpecifierEnding`.

			var candidates []specPair
			for _, ending := range allowedEndings {
				result := processEnding(
					tspath.ToModuleSpecifier(relativeToBaseUrl),
					fileName,
					[]ModuleSpecifierEnding{ending},
					compilerOptions,
					host,
				)
				candidates = append(candidates, specPair{
					ending: ending,
					value:  result,
				})
			}
			if len(tspath.TryGetExtensionFromPath(pattern)) > 0 {
				candidates = append(candidates, specPair{
					ending: ModuleSpecifierEndingJsExtension,
					value:  tspath.ToModuleSpecifier(relativeToBaseUrl),
				})
			}

			if ok {
				for _, c := range candidates {
					value := c.value.AsString()
					if len(value) >= len(prefix)+len(suffix) &&
						stringutil.HasPrefix(value, prefix, caseSensitivity.IsCaseSensitive()) && // TODO: possible strada bug: these are not case-switched in strada
						stringutil.HasSuffix(value, suffix, caseSensitivity.IsCaseSensitive()) &&
						validateEnding(c, relativeToBaseUrl, fileName, compilerOptions, host) {
						matchedStar := value[len(prefix) : len(value)-len(suffix)]
						if !tspath.PathIsRelative(matchedStar) {
							return replaceFirstStar(key, matchedStar)
						}
					}
				}
			} else if core.Some(candidates, func(c specPair) bool {
				return c.ending != ModuleSpecifierEndingMinimal && pattern == c.value.AsString()
			}) ||
				core.Some(candidates, func(c specPair) bool {
					return c.ending == ModuleSpecifierEndingMinimal && pattern == c.value.AsString() && validateEnding(c, relativeToBaseUrl, fileName, compilerOptions, host)
				}) {
				return key
			}
		}
	}
	return ""
}

func validateEnding(c specPair, relativeToBaseUrl string, fileName tspath.RootedFilePath, compilerOptions *core.CompilerOptions, host ModuleSpecifierGenerationHost) bool {
	// Optimization: `removeExtensionAndIndexPostFix` can query the file system (a good bit) if `ending` is `Minimal`, the basename
	// is 'index', and a `host` is provided. To avoid that until it's unavoidable, we ran the function with no `host` above. Only
	// here, after we've checked that the minimal ending is indeed a match (via the length and prefix/suffix checks / `some` calls),
	// do we check that the host-validated result is consistent with the answer we got before. If it's not, it falls back to the
	// `ModuleSpecifierEnding.Index` result, which should already be in the list of candidates if `Minimal` was. (Note: the assumption here is
	// that every module resolution mode that supports dropping extensions also supports dropping `/index`. Like literally
	// everything else in this file, this logic needs to be updated if that's not true in some future module resolution mode.)
	return c.ending != ModuleSpecifierEndingMinimal || c.value == processEnding(tspath.ToModuleSpecifier(relativeToBaseUrl), fileName, []ModuleSpecifierEnding{c.ending}, compilerOptions, host)
}

func tryGetModuleNameFromExportsOrImports(
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	targetFileName tspath.RootedFilePath,
	packageDirectory tspath.RootedDirectoryPath,
	packageName string,
	exports packagejson.ExportsOrImports,
	conditions []string,
	mode MatchingMode,
	isImports bool,
	preferTsExtension bool,
) string {
	packageSpecifier := tspath.ToModuleSpecifier(packageName)
	switch exports.Type {
	case packagejson.JSONValueTypeNotPresent:
		return ""
	case packagejson.JSONValueTypeString:
		strValue := exports.Value.(string)

		// possible strada bug? Always uses compilerOptions of the host project, not those applicable to the targeted package.json!
		var outputFile tspath.RootedFilePath
		var declarationFile tspath.RootedFilePath
		if isImports {
			outputFile = outputpaths.GetOutputJSFileNameWorker(targetFileName, options, host)
			declarationFile = outputpaths.GetOutputDeclarationFileNameWorker(targetFileName, options, host)
		}

		var extensionSwappedTarget tspath.RootedFilePath
		if targetFileName.HasTSFileExtension() {
			extensionSwappedTarget = targetFileName.RemoveFileExtension().AppendSuffix(module.TryGetJSExtensionForFileName(targetFileName, options))
		}
		canTryTsExtension := preferTsExtension && targetFileName.HasImplementationTSFileExtension()

		caseSensitivity := host.CaseSensitivity()

		switch mode {
		case MatchingModeExact:
			if tspath.HasTrailingDirectorySeparator(strValue) {
				return ""
			}
			resolvedTarget := packageDirectory.ResolveFile(strValue)
			if len(extensionSwappedTarget) > 0 && caseSensitivity.CompareFilePaths(extensionSwappedTarget, resolvedTarget) == 0 ||
				caseSensitivity.CompareFilePaths(targetFileName, resolvedTarget) == 0 ||
				len(outputFile) > 0 && caseSensitivity.CompareFilePaths(outputFile, resolvedTarget) == 0 ||
				len(declarationFile) > 0 && caseSensitivity.CompareFilePaths(declarationFile, resolvedTarget) == 0 {
				return packageName
			}
		case MatchingModeDirectory:
			resolvedTarget := packageDirectory.ResolveDirectory(tspath.RemoveTrailingDirectorySeparator(strValue))
			if canTryTsExtension && caseSensitivity.ContainsPath(tspath.RootedDirectoryPathFromPath(
				tspath.RootedPath(targetFileName),
			),

				tspath.RootedPath(resolvedTarget)) {
				fragment, _ := caseSensitivity.RelativePathFromDirectory(resolvedTarget, targetFileName)
				return packageSpecifier.Resolve(strValue, fragment.AsString()).AsString()
			}
			if len(extensionSwappedTarget) > 0 && caseSensitivity.ContainsFilePath(resolvedTarget, extensionSwappedTarget) {
				fragment, _ := caseSensitivity.RelativePathFromDirectory(resolvedTarget, extensionSwappedTarget)
				return packageSpecifier.Resolve(strValue, fragment.AsString()).AsString()
			}
			if !canTryTsExtension && caseSensitivity.ContainsFilePath(resolvedTarget, targetFileName) {
				fragment, _ := caseSensitivity.RelativePathFromDirectory(resolvedTarget, targetFileName)
				return packageSpecifier.Resolve(strValue, fragment.AsString()).AsString()
			}
			if len(outputFile) > 0 && caseSensitivity.ContainsFilePath(resolvedTarget, outputFile) {
				fragment, _ := caseSensitivity.RelativePathFromDirectory(resolvedTarget, outputFile)
				return packageSpecifier.CombineRelative(fragment).AsString()
			}
			if len(declarationFile) > 0 && caseSensitivity.ContainsFilePath(resolvedTarget, declarationFile) {
				fragment, _ := caseSensitivity.RelativePathFromDirectory(resolvedTarget, declarationFile)
				jsExtension := getJSExtensionForFileName(declarationFile, options)
				fragmentWithJsExtension := fragment.ChangeExtension(jsExtension)
				return packageSpecifier.CombineRelative(fragmentWithJsExtension).AsString()
			}
		case MatchingModePattern:
			pathOrPattern := tspath.ResolvePath(packageDirectory.AsString(), strValue)
			leadingSlice, trailingSlice, _ := strings.Cut(pathOrPattern, "*")
			caseSensitivity := host.CaseSensitivity()
			targetFilePath := targetFileName.AsString()
			if canTryTsExtension && stringutil.HasPrefixAndSuffixWithoutOverlap(targetFilePath, leadingSlice, trailingSlice, caseSensitivity.IsCaseSensitive()) {
				starReplacement := targetFilePath[len(leadingSlice) : len(targetFilePath)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if extensionSwappedTargetString := extensionSwappedTarget.AsString(); len(extensionSwappedTargetString) > 0 && stringutil.HasPrefixAndSuffixWithoutOverlap(extensionSwappedTargetString, leadingSlice, trailingSlice, caseSensitivity.IsCaseSensitive()) {
				starReplacement := extensionSwappedTargetString[len(leadingSlice) : len(extensionSwappedTargetString)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if !canTryTsExtension && stringutil.HasPrefixAndSuffixWithoutOverlap(targetFilePath, leadingSlice, trailingSlice, caseSensitivity.IsCaseSensitive()) {
				starReplacement := targetFilePath[len(leadingSlice) : len(targetFilePath)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if outputFileString := outputFile.AsString(); len(outputFileString) > 0 && stringutil.HasPrefixAndSuffixWithoutOverlap(outputFileString, leadingSlice, trailingSlice, caseSensitivity.IsCaseSensitive()) {
				starReplacement := outputFileString[len(leadingSlice) : len(outputFileString)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if declarationFileString := declarationFile.AsString(); len(declarationFileString) > 0 && stringutil.HasPrefixAndSuffixWithoutOverlap(declarationFileString, leadingSlice, trailingSlice, caseSensitivity.IsCaseSensitive()) {
				starReplacement := declarationFileString[len(leadingSlice) : len(declarationFileString)-len(trailingSlice)]
				substituted := replaceFirstStar(packageName, starReplacement)
				jsExtension := module.TryGetJSExtensionForFileName(declarationFile, options)
				if len(jsExtension) > 0 {
					return tspath.ChangeFullExtension(substituted, jsExtension)
				}
			}
		}
		return ""
	case packagejson.JSONValueTypeArray:
		arr := exports.AsArray()
		for _, e := range arr {
			result := tryGetModuleNameFromExportsOrImports(options, host, targetFileName, packageDirectory, packageName, e, conditions, mode, isImports, preferTsExtension)
			if len(result) > 0 {
				return result
			}
		}
	case packagejson.JSONValueTypeObject:
		// conditional mapping
		obj := exports.AsObject()
		for key, value := range obj.Entries() {
			if key == "default" || slices.Contains(conditions, key) || slices.Contains(conditions, "types") && module.IsApplicableVersionedTypesKey(key) {
				result := tryGetModuleNameFromExportsOrImports(options, host, targetFileName, packageDirectory, packageName, value, conditions, mode, isImports, preferTsExtension)
				if len(result) > 0 {
					return result
				}
			}
		}
	case packagejson.JSONValueTypeNull:
		return ""
	}
	return ""
}

// `importingSourceFile` and `importingSourceFileName`? Why not just use `importingSourceFile.path`?
// Because when this is called by the declaration emitter, `importingSourceFile` is the implementation
// file, but `importingSourceFileName` and `toFileName` refer to declaration files (the former to the
// one currently being produced; the latter to the one being imported). We need an implementation file
// just to get its `impliedNodeFormat` and to detect certain preferences from existing import module
// specifiers.
func GetModuleSpecifier(
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	importingSourceFile *ast.SourceFile, // !!! | FutureSourceFile
	importingSourceFileName tspath.RootedFilePath,
	oldImportSpecifier tspath.ModuleSpecifier, // used only in updatingModuleSpecifier
	toFileName tspath.RootedFilePath,
	options ModuleSpecifierOptions,
) tspath.ModuleSpecifier {
	return getModuleSpecifierWithPreferences(
		compilerOptions,
		host,
		importingSourceFile,
		importingSourceFileName,
		oldImportSpecifier,
		toFileName,
		UserPreferences{},
		options,
	)
}

func UpdateModuleSpecifier(
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	importingSourceFile *ast.SourceFile,
	importingSourceFileName tspath.RootedFilePath,
	oldImportSpecifier tspath.ModuleSpecifier,
	toFileName tspath.RootedFilePath,
	userPreferences UserPreferences,
	options ModuleSpecifierOptions,
) tspath.ModuleSpecifier {
	return getModuleSpecifierWithPreferences(
		compilerOptions,
		host,
		importingSourceFile,
		importingSourceFileName,
		oldImportSpecifier,
		toFileName,
		userPreferences,
		options,
	)
}

func getModuleSpecifierWithPreferences(
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	importingSourceFile *ast.SourceFile, // !!! | FutureSourceFile
	importingSourceFileName tspath.RootedFilePath,
	oldImportSpecifier tspath.ModuleSpecifier, // used only in updatingModuleSpecifier
	toFileName tspath.RootedFilePath,
	userPreferences UserPreferences,
	options ModuleSpecifierOptions,
) tspath.ModuleSpecifier {
	info := getInfo(importingSourceFileName, host)
	modulePaths := getAllModulePaths(info, toFileName, host, compilerOptions, userPreferences, options)
	preferences := getModuleSpecifierPreferences(userPreferences, host, compilerOptions, importingSourceFile, oldImportSpecifier.AsString())

	resolutionMode := options.OverrideImportMode
	if resolutionMode == core.ResolutionModeNone {
		resolutionMode = host.GetDefaultResolutionModeForFile(importingSourceFile)
	}

	for _, modulePath := range modulePaths {
		if firstDefined := tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, userPreferences, false /*packageNameOnly*/, options.OverrideImportMode); len(firstDefined) > 0 {
			return firstDefined
		}
	}

	return getLocalModuleSpecifier(toFileName, info, compilerOptions, host, resolutionMode, preferences, false)
}
