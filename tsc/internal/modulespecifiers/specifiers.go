package modulespecifiers

import (
	"maps"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func GetModuleSpecifiers(
	moduleSymbol *ast.Symbol,
	checker CheckerShape,
	compilerOptions *core.CompilerOptions,
	importingSourceFile SourceFileForSpecifierGeneration,
	host ModuleSpecifierGenerationHost,
	userPreferences UserPreferences,
	options ModuleSpecifierOptions,
) []string {
	ambient := tryGetModuleNameFromAmbientModule(moduleSymbol, checker)
	if len(ambient) > 0 {
		return []string{ambient}
	}

	moduleSourceFile := ast.GetSourceFileOfModule(moduleSymbol)
	if moduleSourceFile == nil {
		return nil
	}
	modulePaths := getAllModulePathsWorker(
		getInfo(host.GetSourceOfProjectReferenceIfOutputIncluded(importingSourceFile), host),
		moduleSourceFile.FileName(),
		host,
		// compilerOptions,
		// options,
	)

	result := computeModuleSpecifiers(
		modulePaths,
		compilerOptions,
		importingSourceFile,
		host,
		userPreferences,
		options,
		/*forAutoImport*/ false,
	)

	return result
}

func tryGetModuleNameFromAmbientModule(moduleSymbol *ast.Symbol, checker CheckerShape) string {
	for _, decl := range moduleSymbol.Declarations {
		if isNonGlobalAmbientModule(decl) && (!ast.IsModuleAugmentationExternal(decl) || !tspath.IsExternalModuleNameRelative(decl.Name().AsStringLiteral().Text)) {
			return decl.Name().AsStringLiteral().Text
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

		possibleContainer := ast.FindAncestor(d, isNonGlobalAmbientModule)
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
			return possibleContainer.Name().AsStringLiteral().Text
		}
	}
	return ""
}

type Info struct {
	UseCaseSensitiveFileNames bool
	ImportingSourceFileName   string
	SourceDirectory           string
}

func getInfo(
	importingSourceFileName string,
	host ModuleSpecifierGenerationHost,
) Info {
	sourceDirectory := tspath.GetDirectoryPath(importingSourceFileName)
	return Info{
		ImportingSourceFileName:   importingSourceFileName,
		SourceDirectory:           sourceDirectory,
		UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
	}
}

func getAllModulePathsWorker(
	info Info,
	importedFileName string,
	host ModuleSpecifierGenerationHost,
	// compilerOptions *core.CompilerOptions,
	// options ModuleSpecifierOptions,
) []ModulePath {
	// !!! TODO: Caches and symlink cache chicanery to support pulling in non-explicit package.json dep names
	// cache := host.GetModuleResolutionCache() // !!!
	// links := host.GetSymlinkCache() // !!!
	// if cache != nil && links != nil && !strings.Contains(info.ImportingSourceFileName, "/node_modules/") {
	//     // Debug.type<ModuleResolutionHost>(host); // !!!
	//     // Cache resolutions for all `dependencies` of the `package.json` context of the input file.
	//     // This should populate all the relevant symlinks in the symlink cache, and most, if not all, of these resolutions
	//     // should get (re)used.
	//     // const state = getTemporaryModuleResolutionState(cache.getPackageJsonInfoCache(), host, {});
	//     // const packageJson = getPackageScopeForPath(getDirectoryPath(info.importingSourceFileName), state);
	//     // if (packageJson) {
	//     //     const toResolve = getAllRuntimeDependencies(packageJson.contents.packageJsonContent);
	//     //     for (const depName of (toResolve || emptyArray)) {
	//     //         const resolved = resolveModuleName(depName, combinePaths(packageJson.packageDirectory, "package.json"), compilerOptions, host, cache, /*redirectedReference*/ undefined, options.overrideImportMode);
	//     //         links.setSymlinksFromResolution(resolved.resolvedModule);
	//     //     }
	//     // }
	// }

	allFileNames := make(map[string]ModulePath)
	paths := getEachFileNameOfModule(info.ImportingSourceFileName, importedFileName, host, true)
	for _, p := range paths {
		allFileNames[p.FileName] = p
	}

	// Sort by paths closest to importing file Name directory
	sortedPaths := make([]ModulePath, 0, len(paths))
	for directory := info.SourceDirectory; len(allFileNames) != 0; {
		directoryStart := tspath.EnsureTrailingDirectorySeparator(directory)
		var pathsInDirectory []ModulePath
		for fileName, p := range allFileNames {
			if strings.HasPrefix(fileName, directoryStart) {
				pathsInDirectory = append(pathsInDirectory, p)
				delete(allFileNames, fileName)
			}
		}
		if len(pathsInDirectory) > 0 {
			slices.SortStableFunc(pathsInDirectory, comparePathsByRedirectAndNumberOfDirectorySeparators)
			sortedPaths = append(sortedPaths, pathsInDirectory...)
		}
		newDirectory := tspath.GetDirectoryPath(directory)
		if newDirectory == directory {
			break
		}
		directory = newDirectory
	}
	if len(allFileNames) > 0 {
		remainingPaths := slices.Collect(maps.Values(allFileNames))
		slices.SortStableFunc(remainingPaths, comparePathsByRedirectAndNumberOfDirectorySeparators)
		sortedPaths = append(sortedPaths, remainingPaths...)
	}
	return sortedPaths
}

func containsIgnoredPath(s string) bool {
	return strings.Contains(s, "/node_modules/.") ||
		strings.Contains(s, "/.git") ||
		strings.Contains(s, "/.#")
}

func containsNodeModules(s string) bool {
	return strings.Contains(s, "/node_modules/")
}

func getEachFileNameOfModule(
	importingFileName string,
	importedFileName string,
	host ModuleSpecifierGenerationHost,
	preferSymlinks bool,
) []ModulePath {
	cwd := host.GetCurrentDirectory()
	importedPath := tspath.ToPath(importedFileName, cwd, host.UseCaseSensitiveFileNames())
	var referenceRedirect string
	outputAndReference := host.GetOutputAndProjectReference(importedPath)
	if outputAndReference != nil && outputAndReference.OutputDts != "" {
		referenceRedirect = outputAndReference.OutputDts
	}

	redirects := host.GetRedirectTargets(importedPath)
	importedFileNames := make([]string, 0, 2+len(redirects))
	if len(referenceRedirect) > 0 {
		importedFileNames = append(importedFileNames, referenceRedirect)
	}
	importedFileNames = append(importedFileNames, importedFileName)
	importedFileNames = append(importedFileNames, redirects...)
	targets := core.Map(importedFileNames, func(f string) string { return tspath.GetNormalizedAbsolutePath(f, cwd) })
	shouldFilterIgnoredPaths := !core.Every(targets, containsIgnoredPath)

	results := make([]ModulePath, 0, 2)
	if !preferSymlinks {
		// Symlinks inside ignored paths are already filtered out of the symlink cache,
		// so we only need to remove them from the realpath filenames.
		for _, p := range targets {
			if !(shouldFilterIgnoredPaths && containsIgnoredPath(p)) {
				results = append(results, ModulePath{
					FileName:        p,
					IsInNodeModules: containsNodeModules(p),
					IsRedirect:      referenceRedirect == p,
				})
			}
		}
	}

	// !!! TODO: Symlink directory handling
	// const symlinkedDirectories = host.getSymlinkCache?.().getSymlinkedDirectoriesByRealpath();
	// const fullImportedFileName = getNormalizedAbsolutePath(importedFileName, cwd);
	// const result = symlinkedDirectories && forEachAncestorDirectoryStoppingAtGlobalCache(
	//     host,
	//     getDirectoryPath(fullImportedFileName),
	//     realPathDirectory => {
	//         const symlinkDirectories = symlinkedDirectories.get(ensureTrailingDirectorySeparator(toPath(realPathDirectory, cwd, getCanonicalFileName)));
	//         if (!symlinkDirectories) return undefined; // Continue to ancestor directory

	//         // Don't want to a package to globally import from itself (importNameCodeFix_symlink_own_package.ts)
	//         if (startsWithDirectory(importingFileName, realPathDirectory, getCanonicalFileName)) {
	//             return false; // Stop search, each ancestor directory will also hit this condition
	//         }

	//         return forEach(targets, target => {
	//             if (!startsWithDirectory(target, realPathDirectory, getCanonicalFileName)) {
	//                 return;
	//             }

	//             const relative = getRelativePathFromDirectory(realPathDirectory, target, getCanonicalFileName);
	//             for (const symlinkDirectory of symlinkDirectories) {
	//                 const option = resolvePath(symlinkDirectory, relative);
	//                 const result = cb(option, target === referenceRedirect);
	//                 shouldFilterIgnoredPaths = true; // We found a non-ignored path in symlinks, so we can reject ignored-path realpaths
	//                 if (result) return result;
	//             }
	//         });
	//     },
	// );

	if preferSymlinks {
		for _, p := range targets {
			if !(shouldFilterIgnoredPaths && containsIgnoredPath(p)) {
				results = append(results, ModulePath{
					FileName:        p,
					IsInNodeModules: containsNodeModules(p),
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
) []string {
	info := getInfo(importingSourceFile.FileName(), host)
	preferences := getModuleSpecifierPreferences(userPreferences, host, compilerOptions, importingSourceFile, "")

	var existingSpecifier string
	for _, modulePath := range modulePaths {
		targetPath := tspath.ToPath(modulePath.FileName, host.GetCurrentDirectory(), info.UseCaseSensitiveFileNames)
		var existingImport *ast.StringLiteralLike
		for _, importSpecifier := range importingSourceFile.Imports() {
			resolvedModule := host.GetResolvedModuleFromModuleSpecifier(importingSourceFile, importSpecifier)
			if resolvedModule.IsResolved() && tspath.ToPath(resolvedModule.ResolvedFileName, host.GetCurrentDirectory(), info.UseCaseSensitiveFileNames) == targetPath {
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
			existingSpecifier = existingImport.Text()
			break
		}
	}

	if existingSpecifier != "" {
		return []string{existingSpecifier}
	}

	importedFileIsInNodeModules := core.Some(modulePaths, func(p ModulePath) bool { return p.IsInNodeModules })

	// Module specifier priority:
	//   1. "Bare package specifiers" (e.g. "@foo/bar") resulting from a path through node_modules to a package.json's "types" entry
	//   2. Specifiers generated using "paths" from tsconfig
	//   3. Non-relative specfiers resulting from a path through node_modules (e.g. "@foo/bar/path/to/file")
	//   4. Relative paths
	var pathsSpecifiers []string
	var redirectPathsSpecifiers []string
	var nodeModulesSpecifiers []string
	var relativeSpecifiers []string

	for _, modulePath := range modulePaths {
		var specifier string
		if modulePath.IsInNodeModules {
			specifier = tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, userPreferences /*packageNameOnly*/, false, options.OverrideImportMode)
		}
		if len(specifier) > 0 && !(forAutoImport && isExcludedByRegex(specifier, preferences.excludeRegexes)) {
			nodeModulesSpecifiers = append(nodeModulesSpecifiers, specifier)
			if modulePath.IsRedirect {
				// If we got a specifier for a redirect, it was a bare package specifier (e.g. "@foo/bar",
				// not "@foo/bar/path/to/file"). No other specifier will be this good, so stop looking.
				return nodeModulesSpecifiers
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
		if len(local) == 0 || forAutoImport && isExcludedByRegex(local, preferences.excludeRegexes) {
			continue
		}
		if modulePath.IsRedirect {
			redirectPathsSpecifiers = append(redirectPathsSpecifiers, local)
		} else if pathIsBareSpecifier(local) {
			if containsNodeModules(local) {
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
		return pathsSpecifiers
	}
	if len(redirectPathsSpecifiers) > 0 {
		return redirectPathsSpecifiers
	}
	if len(nodeModulesSpecifiers) > 0 {
		return nodeModulesSpecifiers
	}
	return relativeSpecifiers
}

func getLocalModuleSpecifier(
	moduleFileName string,
	info Info,
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	importMode core.ResolutionMode,
	preferences ModuleSpecifierPreferences,
	pathsOnly bool,
) string {
	paths := compilerOptions.Paths
	rootDirs := compilerOptions.RootDirs

	if pathsOnly && paths == nil {
		return ""
	}

	sourceDirectory := info.SourceDirectory

	allowedEndings := preferences.getAllowedEndingsInPreferredOrder(importMode)
	var relativePath string
	if len(rootDirs) > 0 {
		relativePath = tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, allowedEndings, compilerOptions, host)
	}
	if len(relativePath) == 0 {
		relativePath = processEnding(ensurePathIsNonModuleName(tspath.GetRelativePathFromDirectory(sourceDirectory, moduleFileName, tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		})), allowedEndings, compilerOptions, host)
	}

	root := compilerOptions.GetPathsBasePath(host.GetCurrentDirectory())
	baseDirectory := tspath.GetNormalizedAbsolutePath(root, host.GetCurrentDirectory())
	relativeToBaseUrl := getRelativePathIfInSameVolume(moduleFileName, baseDirectory, host.UseCaseSensitiveFileNames())
	if len(relativeToBaseUrl) == 0 {
		if pathsOnly {
			return ""
		}
		return relativePath
	}

	var fromPackageJsonImports string
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
			relativeToBaseUrl,
			paths,
			allowedEndings,
			baseDirectory,
			host,
			compilerOptions,
		)
	}

	if pathsOnly {
		return fromPaths
	}

	var maybeNonRelative string
	if len(fromPackageJsonImports) > 0 {
		maybeNonRelative = fromPackageJsonImports
	} else {
		maybeNonRelative = fromPaths
	}
	if len(maybeNonRelative) == 0 {
		return relativePath
	}

	relativeIsExcluded := isExcludedByRegex(relativePath, preferences.excludeRegexes)
	nonRelativeIsExcluded := isExcludedByRegex(maybeNonRelative, preferences.excludeRegexes)
	if !relativeIsExcluded && nonRelativeIsExcluded {
		return relativePath
	}
	if relativeIsExcluded && !nonRelativeIsExcluded {
		return maybeNonRelative
	}

	if preferences.relativePreference == RelativePreferenceNonRelative && !tspath.PathIsRelative(maybeNonRelative) {
		return maybeNonRelative
	}

	if preferences.relativePreference == RelativePreferenceExternalNonRelative && !tspath.PathIsRelative(maybeNonRelative) {
		var projectDirectory tspath.Path
		if len(compilerOptions.ConfigFilePath) > 0 {
			projectDirectory = tspath.ToPath(compilerOptions.ConfigFilePath, host.GetCurrentDirectory(), host.UseCaseSensitiveFileNames())
		} else {
			projectDirectory = tspath.ToPath(host.GetCurrentDirectory(), host.GetCurrentDirectory(), host.UseCaseSensitiveFileNames())
		}
		canonicalSourceDirectory := tspath.ToPath(sourceDirectory, host.GetCurrentDirectory(), host.UseCaseSensitiveFileNames())
		modulePath := tspath.ToPath(moduleFileName, string(projectDirectory), host.UseCaseSensitiveFileNames())

		sourceIsInternal := strings.HasPrefix(string(canonicalSourceDirectory), string(projectDirectory))
		targetIsInternal := strings.HasPrefix(string(modulePath), string(projectDirectory))
		if sourceIsInternal && !targetIsInternal || !sourceIsInternal && targetIsInternal {
			// 1. The import path crosses the boundary of the tsconfig.json-containing directory.
			//
			//      src/
			//        tsconfig.json
			//        index.ts -------
			//      lib/              | (path crosses tsconfig.json)
			//        imported.ts <---
			//
			return maybeNonRelative
		}

		nearestTargetPackageJson := host.GetNearestAncestorDirectoryWithPackageJson(tspath.GetDirectoryPath(string(modulePath)))
		nearestSourcePackageJson := host.GetNearestAncestorDirectoryWithPackageJson(sourceDirectory)

		if !packageJsonPathsAreEqual(nearestTargetPackageJson, nearestSourcePackageJson, tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		}) {
			// 2. The importing and imported files are part of different packages.
			//
			//      packages/a/
			//        package.json
			//        index.ts --------
			//      packages/b/        | (path crosses package.json)
			//        package.json     |
			//        component.ts <---
			//
			return maybeNonRelative
		}
	}

	// Prefer a relative import over a baseUrl import if it has fewer components.
	if isPathRelativeToParent(maybeNonRelative) || strings.Count(relativePath, "/") < strings.Count(maybeNonRelative, "/") {
		return relativePath
	}
	return maybeNonRelative
}

func processEnding(
	fileName string,
	allowedEndings []ModuleSpecifierEnding,
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
) string {
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionJson, tspath.ExtensionMjs, tspath.ExtensionCjs}) {
		return fileName
	}

	noExtension := tspath.RemoveFileExtension(fileName)
	if fileName == noExtension {
		return fileName
	}

	jsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingJsExtension)
	tsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingTsExtension)
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionMts, tspath.ExtensionCts}) && tsPriority < jsPriority {
		return fileName
	}
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionDmts, tspath.ExtensionMts, tspath.ExtensionDcts, tspath.ExtensionCts}) {
		inputExt := tspath.GetDeclarationFileExtension(fileName)
		ext := getJsExtensionForDeclarationFileExtension(inputExt)
		return tspath.RemoveExtension(fileName, inputExt) + ext
	}

	switch allowedEndings[0] {
	case ModuleSpecifierEndingMinimal:
		withoutIndex := strings.TrimSuffix(noExtension, "/index")
		if host != nil && withoutIndex != noExtension && tryGetAnyFileFromPath(host, withoutIndex) {
			// Can't remove index if there's a file by the same name as the directory.
			// Probably more callers should pass `host` so we can determine this?
			return noExtension
		}
		return withoutIndex
	case ModuleSpecifierEndingIndex:
		return noExtension
	case ModuleSpecifierEndingJsExtension:
		return noExtension + getJSExtensionForFile(fileName, options)
	case ModuleSpecifierEndingTsExtension:
		// declaration files are already handled first with a remap back to input js paths,
		// and mjs/cjs/json are already singled out,
		// so we know fileName has to be either an input .js or .ts path already
		// TODO: possible dead code in strada in this branch to do with declaration file name handling
		return fileName
	default:
		// Debug.assertNever(allowedEndings[0]); // !!!
		return ""
	}
}

func tryGetModuleNameFromRootDirs(
	rootDirs []string,
	moduleFileName string,
	sourceDirectory string,
	allowedEndings []ModuleSpecifierEnding,
	compilerOptions *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
) string {
	normalizedTargetPaths := getPathsRelativeToRootDirs(moduleFileName, rootDirs, host.UseCaseSensitiveFileNames())
	if len(normalizedTargetPaths) == 0 {
		return ""
	}

	normalizedSourcePaths := getPathsRelativeToRootDirs(sourceDirectory, rootDirs, host.UseCaseSensitiveFileNames())
	var shortest string
	var shortestSepCount int
	for _, sourcePath := range normalizedSourcePaths {
		for _, targetPath := range normalizedTargetPaths {
			candidate := ensurePathIsNonModuleName(tspath.GetRelativePathFromDirectory(sourcePath, targetPath, tspath.ComparePathsOptions{
				UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
				CurrentDirectory:          host.GetCurrentDirectory(),
			}))
			candidateSepCount := strings.Count(candidate, "/")
			if len(shortest) == 0 || candidateSepCount < shortestSepCount {
				shortest = candidate
				shortestSepCount = candidateSepCount
			}
		}
	}

	if len(shortest) == 0 {
		return ""
	}
	return processEnding(shortest, allowedEndings, compilerOptions, host)
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
) string {
	parts := getNodeModulePathParts(pathObj.FileName)
	if parts == nil {
		return ""
	}

	// Simplify the full file path to something that can be resolved by Node.
	preferences := getModuleSpecifierPreferences(userPreferences, host, options, importingSourceFile, "")
	allowedEndings := preferences.getAllowedEndingsInPreferredOrder(core.ResolutionModeNone)

	caseSensitive := host.UseCaseSensitiveFileNames()
	moduleSpecifier := pathObj.FileName
	isPackageRootPath := false
	if !packageNameOnly {
		packageRootIndex := parts.PackageRootIndex
		var moduleFileName string
		for true {
			// If the module could be imported by a directory name, use that directory's name
			pkgJsonResults := tryDirectoryWithPackageJson(
				*parts,
				pathObj,
				importingSourceFile,
				host,
				overrideMode,
				options,
				allowedEndings,
			)
			moduleFileToTry := pkgJsonResults.moduleFileToTry
			packageRootPath := pkgJsonResults.packageRootPath
			blockedByExports := pkgJsonResults.blockedByExports
			verbatimFromExports := pkgJsonResults.verbatimFromExports
			if blockedByExports {
				return "" // File is under this package.json, but is not publicly exported - there's no way to name it via `node_modules` resolution
			}
			if verbatimFromExports {
				return moduleFileToTry
			}
			//}
			if len(packageRootPath) > 0 {
				moduleSpecifier = packageRootPath
				isPackageRootPath = true
				break
			}
			if len(moduleFileName) == 0 {
				moduleFileName = moduleFileToTry
			}
			// try with next level of directory
			packageRootIndex = core.IndexAfter(pathObj.FileName, "/", packageRootIndex+1)
			if packageRootIndex == -1 {
				moduleSpecifier = processEnding(moduleFileName, allowedEndings, options, host)
				break
			}
		}
	}

	if pathObj.IsRedirect && !isPackageRootPath {
		return ""
	}

	globalTypingsCacheLocation := host.GetGlobalTypingsCacheLocation()
	// Get a path that's relative to node_modules or the importing file's path
	// if node_modules folder is in this folder or any of its parent folders, no need to keep it.
	pathToTopLevelNodeModules := moduleSpecifier[0:parts.TopLevelNodeModulesIndex]

	if !stringutil.HasPrefix(info.SourceDirectory, pathToTopLevelNodeModules, caseSensitive) || len(globalTypingsCacheLocation) > 0 && stringutil.HasPrefix(globalTypingsCacheLocation, pathToTopLevelNodeModules, caseSensitive) {
		return ""
	}

	// If the module was found in @types, get the actual Node package name
	nodeModulesDirectoryName := moduleSpecifier[parts.TopLevelPackageNameIndex+1:]
	return getPackageNameFromTypesPackageName(nodeModulesDirectoryName)
}

type pkgJsonDirAttemptResult struct {
	moduleFileToTry     string
	packageRootPath     string
	blockedByExports    bool
	verbatimFromExports bool
}

func tryDirectoryWithPackageJson(
	parts NodeModulePathParts,
	pathObj ModulePath,
	importingSourceFile SourceFileForSpecifierGeneration,
	host ModuleSpecifierGenerationHost,
	overrideMode core.ResolutionMode,
	options *core.CompilerOptions,
	allowedEndings []ModuleSpecifierEnding,
) pkgJsonDirAttemptResult {
	rootIdx := parts.PackageRootIndex
	if rootIdx == -1 {
		rootIdx = len(pathObj.FileName) // TODO: possible strada bug? -1 in js slice removes characters from the end, in go it panics - js behavior seems unwanted here?
	}
	packageRootPath := pathObj.FileName[0:rootIdx]
	packageJsonPath := tspath.CombinePaths(packageRootPath, "package.json")
	moduleFileToTry := pathObj.FileName
	maybeBlockedByTypesVersions := false
	packageJson := host.GetPackageJsonInfo(packageJsonPath)
	if packageJson == nil {
		// No package.json exists; an index.js will still resolve as the package name
		fileName := moduleFileToTry[parts.PackageRootIndex+1:]
		if fileName == "index.d.ts" || fileName == "index.js" || fileName == "index.ts" || fileName == "index.tsx" {
			return pkgJsonDirAttemptResult{moduleFileToTry: moduleFileToTry, packageRootPath: packageRootPath}
		}
	}

	importMode := overrideMode
	if importMode == core.ResolutionModeNone {
		importMode = host.GetDefaultResolutionModeForFile(importingSourceFile)
	}

	var packageJsonContent *packagejson.PackageJson
	if packageJson != nil {
		packageJsonContent = packageJson.GetContents()
	}

	if options.GetResolvePackageJsonImports() {
		// The package name that we found in node_modules could be different from the package
		// name in the package.json content via url/filepath dependency specifiers. We need to
		// use the actual directory name, so don't look at `packageJsonContent.name` here.
		nodeModulesDirectoryName := packageRootPath[parts.TopLevelPackageNameIndex+1:]
		packageName := getPackageNameFromTypesPackageName(nodeModulesDirectoryName)
		conditions := module.GetConditions(options, importMode)

		var fromExports string
		if packageJsonContent != nil && packageJsonContent.Fields.Exports.Type != packagejson.JSONValueTypeNotPresent {
			fromExports = tryGetModuleNameFromExports(
				options,
				host,
				pathObj.FileName,
				packageRootPath,
				packageName,
				packageJsonContent.Fields.Exports,
				conditions,
			)
		}
		if len(fromExports) > 0 {
			return pkgJsonDirAttemptResult{
				moduleFileToTry:     fromExports,
				verbatimFromExports: true,
			}
		}
		if packageJsonContent != nil && packageJsonContent.Fields.Exports.Type != packagejson.JSONValueTypeNotPresent {
			return pkgJsonDirAttemptResult{
				moduleFileToTry:  pathObj.FileName,
				blockedByExports: true,
			}
		}
	}

	var versionPaths packagejson.VersionPaths
	if packageJsonContent != nil && packageJsonContent.TypesVersions.Type == packagejson.JSONValueTypeObject {
		versionPaths = packageJsonContent.GetVersionPaths(nil)
	}
	if versionPaths.GetPaths() != nil {
		subModuleName := pathObj.FileName[len(packageRootPath)+1:]
		fromPaths := tryGetModuleNameFromPaths(
			subModuleName,
			versionPaths.GetPaths(),
			allowedEndings,
			packageRootPath,
			host,
			options,
		)
		if len(fromPaths) == 0 {
			maybeBlockedByTypesVersions = true
		} else {
			moduleFileToTry = tspath.CombinePaths(packageRootPath, fromPaths)
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
		mainExportFile := tspath.ToPath(mainFileRelative, packageRootPath, host.UseCaseSensitiveFileNames())
		compareOpt := tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		}
		if tspath.ComparePaths(tspath.RemoveFileExtension(string(mainExportFile)), tspath.RemoveFileExtension(moduleFileToTry), compareOpt) == 0 {
			// ^ An arbitrary removal of file extension for this comparison is almost certainly wrong
			return pkgJsonDirAttemptResult{packageRootPath: packageRootPath, moduleFileToTry: moduleFileToTry}
		} else if packageJsonContent == nil || packageJsonContent.Type.Value != "module" &&
			!tspath.FileExtensionIsOneOf(moduleFileToTry, tspath.ExtensionsNotSupportingExtensionlessResolution) &&
			stringutil.HasPrefix(moduleFileToTry, string(mainExportFile), host.UseCaseSensitiveFileNames()) &&
			tspath.ComparePaths(tspath.GetDirectoryPath(moduleFileToTry), tspath.RemoveTrailingDirectorySeparator(string(mainExportFile)), compareOpt) == 0 &&
			tspath.RemoveFileExtension(tspath.GetBaseFileName(moduleFileToTry)) == "index" {
			// if mainExportFile is a directory, which contains moduleFileToTry, we just try index file
			// example mainExportFile: `pkg/lib` and moduleFileToTry: `pkg/lib/index`, we can use packageRootPath
			// but this behavior is deprecated for packages with "type": "module", so we only do this for packages without "type": "module"
			// and make sure that the extension on index.{???} is something that supports omitting the extension
			return pkgJsonDirAttemptResult{packageRootPath: packageRootPath, moduleFileToTry: moduleFileToTry}
		}
	}

	return pkgJsonDirAttemptResult{moduleFileToTry: moduleFileToTry}
}

func tryGetModuleNameFromExports(
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	targetFilePath string,
	packageDirectory string,
	packageName string,
	exports packagejson.ExportsOrImports,
	conditions []string,
) string {
	if exports.IsSubpaths() {
		// sub-mappings
		// 3 cases:
		// * directory mappings (legacyish, key ends with / (technically allows index/extension resolution under cjs mode))
		// * pattern mappings (contains a *)
		// * exact mappings (no *, does not end with /)
		for k, subk := range exports.AsObject().Entries() {
			subPackageName := tspath.GetNormalizedAbsolutePath(tspath.CombinePaths(packageName, k), "")
			mode := MatchingModeExact
			if strings.HasSuffix(k, "/") {
				mode = MatchingModeDirectory
			} else if strings.Contains(k, "*") {
				mode = MatchingModePattern
			}
			result := tryGetModuleNameFromExportsOrImports(options, host, targetFilePath, packageDirectory, subPackageName, subk, conditions, mode /*isImports*/, false /*preferTsExtension*/, false)
			if len(result) > 0 {
				return result
			}
		}
	}
	return tryGetModuleNameFromExportsOrImports(
		options,
		host,
		targetFilePath,
		packageDirectory,
		packageName,
		exports,
		conditions,
		MatchingModeExact,
		/*isImports*/ false,
		/*preferTsExtension*/ false,
	)
}

func tryGetModuleNameFromPackageJsonImports(
	moduleFileName string,
	sourceDirectory string,
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	importMode core.ResolutionMode,
	preferTsExtension bool,
) string {
	if !options.GetResolvePackageJsonImports() {
		return ""
	}

	ancestorDirectoryWithPackageJson := host.GetNearestAncestorDirectoryWithPackageJson(sourceDirectory)
	if len(ancestorDirectoryWithPackageJson) == 0 {
		return ""
	}
	packageJsonPath := tspath.CombinePaths(ancestorDirectoryWithPackageJson, "package.json")

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
			if !strings.HasPrefix(k, "#") || k == "#" || strings.HasPrefix(k, "#/") {
				continue // invalid imports entry
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
				return result
			}
		}
	}

	return ""
}

type specPair struct {
	ending ModuleSpecifierEnding
	value  string
}

func tryGetModuleNameFromPaths(
	relativeToBaseUrl string,
	paths *collections.OrderedMap[string, []string],
	allowedEndings []ModuleSpecifierEnding,
	baseDirectory string,
	host ModuleSpecifierGenerationHost,
	compilerOptions *core.CompilerOptions,
) string {
	caseSensitive := host.UseCaseSensitiveFileNames()
	for key, values := range paths.Entries() {
		for _, patternText := range values {
			normalized := tspath.NormalizePath(patternText)
			pattern := getRelativePathIfInSameVolume(normalized, baseDirectory, caseSensitive)
			if len(pattern) == 0 {
				pattern = normalized
			}
			indexOfStar := strings.Index(pattern, "*")

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
					relativeToBaseUrl,
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
					value:  relativeToBaseUrl,
				})
			}

			if indexOfStar != -1 {
				prefix := pattern[0:indexOfStar]
				suffix := pattern[indexOfStar+1:]
				for _, c := range candidates {
					value := c.value
					if len(value) >= len(prefix)+len(suffix) &&
						stringutil.HasPrefix(value, prefix, caseSensitive) && // TODO: possible strada bug: these are not case-switched in strada
						stringutil.HasSuffix(value, suffix, caseSensitive) &&
						validateEnding(c, relativeToBaseUrl, compilerOptions, host) {
						matchedStar := value[len(prefix) : len(value)-len(suffix)]
						if !tspath.PathIsRelative(matchedStar) {
							return replaceFirstStar(key, matchedStar)
						}
					}
				}
			} else if core.Some(candidates, func(c specPair) bool { return c.ending != ModuleSpecifierEndingMinimal && pattern == c.value }) ||
				core.Some(candidates, func(c specPair) bool {
					return c.ending == ModuleSpecifierEndingMinimal && pattern == c.value && validateEnding(c, relativeToBaseUrl, compilerOptions, host)
				}) {
				return key
			}
		}
	}
	return ""
}

func validateEnding(c specPair, relativeToBaseUrl string, compilerOptions *core.CompilerOptions, host ModuleSpecifierGenerationHost) bool {
	// Optimization: `removeExtensionAndIndexPostFix` can query the file system (a good bit) if `ending` is `Minimal`, the basename
	// is 'index', and a `host` is provided. To avoid that until it's unavoidable, we ran the function with no `host` above. Only
	// here, after we've checked that the minimal ending is indeed a match (via the length and prefix/suffix checks / `some` calls),
	// do we check that the host-validated result is consistent with the answer we got before. If it's not, it falls back to the
	// `ModuleSpecifierEnding.Index` result, which should already be in the list of candidates if `Minimal` was. (Note: the assumption here is
	// that every module resolution mode that supports dropping extensions also supports dropping `/index`. Like literally
	// everything else in this file, this logic needs to be updated if that's not true in some future module resolution mode.)
	return c.ending != ModuleSpecifierEndingMinimal || c.value == processEnding(relativeToBaseUrl, []ModuleSpecifierEnding{c.ending}, compilerOptions, host)
}

func tryGetModuleNameFromExportsOrImports(
	options *core.CompilerOptions,
	host ModuleSpecifierGenerationHost,
	targetFilePath string,
	packageDirectory string,
	packageName string,
	exports packagejson.ExportsOrImports,
	conditions []string,
	mode MatchingMode,
	isImports bool,
	preferTsExtension bool,
) string {
	switch exports.Type {
	case packagejson.JSONValueTypeNotPresent:
		return ""
	case packagejson.JSONValueTypeString:
		strValue := exports.Value.(string)

		// possible strada bug? Always uses compilerOptions of the host project, not those applicable to the targeted package.json!
		var outputFile string
		var declarationFile string
		if isImports {
			outputFile = outputpaths.GetOutputJSFileNameWorker(targetFilePath, options, host)
			declarationFile = outputpaths.GetOutputDeclarationFileNameWorker(targetFilePath, options, host)
		}

		pathOrPattern := tspath.GetNormalizedAbsolutePath(tspath.CombinePaths(packageDirectory, strValue), "")
		var extensionSwappedTarget string
		if tspath.HasTSFileExtension(targetFilePath) {
			extensionSwappedTarget = tspath.RemoveFileExtension(targetFilePath) + tryGetJSExtensionForFile(targetFilePath, options)
		}
		canTryTsExtension := preferTsExtension && tspath.HasImplementationTSFileExtension(targetFilePath)

		compareOpts := tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		}

		switch mode {
		case MatchingModeExact:
			if len(extensionSwappedTarget) > 0 && tspath.ComparePaths(extensionSwappedTarget, pathOrPattern, compareOpts) == 0 ||
				tspath.ComparePaths(targetFilePath, pathOrPattern, compareOpts) == 0 ||
				len(outputFile) > 0 && tspath.ComparePaths(outputFile, pathOrPattern, compareOpts) == 0 ||
				len(declarationFile) > 0 && tspath.ComparePaths(declarationFile, pathOrPattern, compareOpts) == 0 {
				return packageName
			}
		case MatchingModeDirectory:
			if canTryTsExtension && tspath.ContainsPath(targetFilePath, pathOrPattern, compareOpts) {
				fragment := tspath.GetRelativePathFromDirectory(pathOrPattern, targetFilePath, compareOpts)
				return tspath.GetNormalizedAbsolutePath(tspath.CombinePaths(tspath.CombinePaths(packageName, strValue), fragment), "")
			}
			if len(extensionSwappedTarget) > 0 && tspath.ContainsPath(pathOrPattern, extensionSwappedTarget, compareOpts) {
				fragment := tspath.GetRelativePathFromDirectory(pathOrPattern, extensionSwappedTarget, compareOpts)
				return tspath.GetNormalizedAbsolutePath(tspath.CombinePaths(tspath.CombinePaths(packageName, strValue), fragment), "")
			}
			if !canTryTsExtension && tspath.ContainsPath(pathOrPattern, targetFilePath, compareOpts) {
				fragment := tspath.GetRelativePathFromDirectory(pathOrPattern, targetFilePath, compareOpts)
				return tspath.GetNormalizedAbsolutePath(tspath.CombinePaths(tspath.CombinePaths(packageName, strValue), fragment), "")
			}
			if len(outputFile) > 0 && tspath.ContainsPath(pathOrPattern, outputFile, compareOpts) {
				fragment := tspath.GetRelativePathFromDirectory(pathOrPattern, outputFile, compareOpts)
				return tspath.CombinePaths(packageName, fragment)
			}
			if len(declarationFile) > 0 && tspath.ContainsPath(pathOrPattern, declarationFile, compareOpts) {
				fragment := tspath.GetRelativePathFromDirectory(pathOrPattern, declarationFile, compareOpts)
				jsExtension := getJSExtensionForFile(declarationFile, options)
				fragmentWithJsExtension := tspath.ChangeExtension(fragment, jsExtension)
				return tspath.CombinePaths(packageName, fragmentWithJsExtension)
			}
		case MatchingModePattern:
			starPos := strings.Index(pathOrPattern, "*")
			leadingSlice := pathOrPattern[0:starPos]
			trailingSlice := pathOrPattern[starPos+1:]
			caseSensitive := host.UseCaseSensitiveFileNames()
			if canTryTsExtension && stringutil.HasPrefix(targetFilePath, leadingSlice, caseSensitive) && stringutil.HasSuffix(targetFilePath, trailingSlice, caseSensitive) {
				starReplacement := targetFilePath[len(leadingSlice) : len(targetFilePath)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if len(extensionSwappedTarget) > 0 && stringutil.HasPrefix(extensionSwappedTarget, leadingSlice, caseSensitive) && stringutil.HasSuffix(extensionSwappedTarget, trailingSlice, caseSensitive) {
				starReplacement := extensionSwappedTarget[len(leadingSlice) : len(extensionSwappedTarget)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if !canTryTsExtension && stringutil.HasPrefix(targetFilePath, leadingSlice, caseSensitive) && stringutil.HasSuffix(targetFilePath, trailingSlice, caseSensitive) {
				starReplacement := targetFilePath[len(leadingSlice) : len(targetFilePath)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if len(outputFile) > 0 && stringutil.HasPrefix(outputFile, leadingSlice, caseSensitive) && stringutil.HasSuffix(outputFile, trailingSlice, caseSensitive) {
				starReplacement := outputFile[len(leadingSlice) : len(outputFile)-len(trailingSlice)]
				return replaceFirstStar(packageName, starReplacement)
			}
			if len(declarationFile) > 0 && stringutil.HasPrefix(declarationFile, leadingSlice, caseSensitive) && stringutil.HasSuffix(declarationFile, trailingSlice, caseSensitive) {
				starReplacement := declarationFile[len(leadingSlice) : len(declarationFile)-len(trailingSlice)]
				substituted := replaceFirstStar(packageName, starReplacement)
				jsExtension := tryGetJSExtensionForFile(declarationFile, options)
				if len(jsExtension) > 0 {
					return tspath.ChangeFullExtension(substituted, jsExtension)
				}
			}
		}
		return ""
	case packagejson.JSONValueTypeArray:
		arr := exports.AsArray()
		for _, e := range arr {
			result := tryGetModuleNameFromExportsOrImports(options, host, targetFilePath, packageDirectory, packageName, e, conditions, mode, isImports, preferTsExtension)
			if len(result) > 0 {
				return result
			}
		}
	case packagejson.JSONValueTypeObject:
		// conditional mapping
		obj := exports.AsObject()
		for key, value := range obj.Entries() {
			if key == "default" || slices.Contains(conditions, key) || isApplicableVersionedTypesKey(conditions, key) {
				result := tryGetModuleNameFromExportsOrImports(options, host, targetFilePath, packageDirectory, packageName, value, conditions, mode, isImports, preferTsExtension)
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
