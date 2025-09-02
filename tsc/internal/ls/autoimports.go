package ls

import (
	"context"
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type SymbolExportInfo struct {
	symbol            *ast.Symbol
	moduleSymbol      *ast.Symbol
	moduleFileName    string
	exportKind        ExportKind
	targetFlags       ast.SymbolFlags
	isFromPackageJson bool
}

type symbolExportEntry struct {
	symbol       *ast.Symbol
	moduleSymbol *ast.Symbol
}

type ExportInfoMapKey struct {
	SymbolName        string
	SymbolId          ast.SymbolId
	AmbientModuleName string
	ModuleFile        tspath.Path
}

func newExportInfoMapKey(importedName string, symbol *ast.Symbol, ambientModuleNameKey string, ch *checker.Checker) ExportInfoMapKey {
	return ExportInfoMapKey{
		SymbolName:        importedName,
		SymbolId:          ast.GetSymbolId(ch.SkipAlias(symbol)),
		AmbientModuleName: ambientModuleNameKey,
	}
}

type CachedSymbolExportInfo struct {
	// Used to rehydrate `symbol` and `moduleSymbol` when transient
	id                    int
	symbolTableKey        string
	symbolName            string
	capitalizedSymbolName string
	moduleName            string
	moduleFile            *ast.SourceFile // may be nil
	packageName           string

	symbol            *ast.Symbol // may be nil
	moduleSymbol      *ast.Symbol // may be nil
	moduleFileName    string      // may be ""
	targetFlags       ast.SymbolFlags
	exportKind        ExportKind
	isFromPackageJson bool
}

type exportInfoMap struct {
	exportInfo       collections.MultiMap[ExportInfoMapKey, CachedSymbolExportInfo]
	symbols          map[int]symbolExportEntry
	exportInfoId     int
	usableByFileName tspath.Path
	packages         map[string]string

	globalTypingsCacheLocation string

	// !!! releaseSymbols func()
	// !!! onFileChanged func(oldSourceFile *ast.SourceFile, newSourceFile *ast.SourceFile, typeAcquisitionEnabled bool) bool
}

func (e *exportInfoMap) clear() {
	e.symbols = map[int]symbolExportEntry{}
	e.exportInfo = collections.MultiMap[ExportInfoMapKey, CachedSymbolExportInfo]{}
	e.usableByFileName = ""
}

func (e *exportInfoMap) get(importingFile tspath.Path, ch *checker.Checker, key ExportInfoMapKey) []*SymbolExportInfo {
	if e.usableByFileName != importingFile {
		return nil
	}
	return core.Map(e.exportInfo.Get(key), func(info CachedSymbolExportInfo) *SymbolExportInfo { return e.rehydrateCachedInfo(ch, info) })
}

func (e *exportInfoMap) add(
	importingFile tspath.Path,
	symbol *ast.Symbol,
	symbolTableKey string,
	moduleSymbol *ast.Symbol,
	moduleFile *ast.SourceFile,
	exportKind ExportKind,
	isFromPackageJson bool,
	ch *checker.Checker,
	symbolNameMatch func(string) bool,
	flagMatch func(ast.SymbolFlags) bool,
) {
	if importingFile != e.usableByFileName {
		e.clear()
		e.usableByFileName = importingFile
	}

	packageName := ""
	if moduleFile != nil {
		if nodeModulesPathParts := modulespecifiers.GetNodeModulePathParts(moduleFile.FileName()); nodeModulesPathParts != nil {
			topLevelNodeModulesIndex := nodeModulesPathParts.TopLevelNodeModulesIndex
			topLevelPackageNameIndex := nodeModulesPathParts.TopLevelPackageNameIndex
			packageRootIndex := nodeModulesPathParts.PackageRootIndex
			packageName = module.UnmangleScopedPackageName(modulespecifiers.GetPackageNameFromTypesPackageName(moduleFile.FileName()[topLevelPackageNameIndex+1 : packageRootIndex]))
			if strings.HasPrefix(string(importingFile), string(moduleFile.Path())[0:topLevelNodeModulesIndex]) {
				nodeModulesPath := moduleFile.FileName()[0 : topLevelPackageNameIndex+1]
				if prevDeepestNodeModulesPath, ok := e.packages[packageName]; ok {
					prevDeepestNodeModulesIndex := strings.Index(prevDeepestNodeModulesPath, "/node_modules/")
					if topLevelNodeModulesIndex > prevDeepestNodeModulesIndex {
						e.packages[packageName] = nodeModulesPath
					}
				} else {
					e.packages[packageName] = nodeModulesPath
				}
			}
		}
	}

	isDefault := exportKind == ExportKindDefault
	namedSymbol := symbol
	if isDefault {
		if s := binder.GetLocalSymbolForExportDefault(symbol); s != nil {
			namedSymbol = s
		}
	}
	// 1. A named export must be imported by its key in `moduleSymbol.exports` or `moduleSymbol.members`.
	// 2. A re-export merged with an export from a module augmentation can result in `symbol`
	//    being an external module symbol; the name it is re-exported by will be `symbolTableKey`
	//    (which comes from the keys of `moduleSymbol.exports`.)
	// 3. Otherwise, we have a default/namespace import that can be imported by any name, and
	//    `symbolTableKey` will be something undesirable like `export=` or `default`, so we try to
	//    get a better name.
	names := []string{}
	if exportKind == ExportKindNamed || checker.IsExternalModuleSymbol(namedSymbol) {
		names = append(names, symbolTableKey)
	} else {
		names = getNamesForExportedSymbol(namedSymbol, ch, core.ScriptTargetNone)
	}

	symbolName := names[0]
	if symbolNameMatch != nil && !symbolNameMatch(symbolName) {
		return
	}

	capitalizedSymbolName := ""
	if len(names) > 1 {
		capitalizedSymbolName = names[1]
	}

	moduleName := stringutil.StripQuotes(moduleSymbol.Name)
	id := e.exportInfoId + 1
	target := ch.SkipAlias(symbol)

	if flagMatch != nil && !flagMatch(target.Flags) {
		return
	}

	var storedSymbol, storedModuleSymbol *ast.Symbol

	if symbol.Flags&ast.SymbolFlagsTransient == 0 {
		storedSymbol = symbol
	}
	if moduleSymbol.Flags&ast.SymbolFlagsTransient == 0 {
		storedModuleSymbol = moduleSymbol
	}

	if storedSymbol == nil || storedModuleSymbol == nil {
		e.symbols[id] = symbolExportEntry{storedSymbol, storedModuleSymbol}
	}

	moduleKey := ""
	if !tspath.IsExternalModuleNameRelative(moduleName) {
		moduleKey = moduleName
	}

	moduleFileName := ""
	if moduleFile != nil {
		moduleFileName = moduleFile.FileName()
	}
	e.exportInfo.Add(newExportInfoMapKey(symbolName, symbol, moduleKey, ch), CachedSymbolExportInfo{
		id:                    id,
		symbolTableKey:        symbolTableKey,
		symbolName:            symbolName,
		capitalizedSymbolName: capitalizedSymbolName,
		moduleName:            moduleName,
		moduleFile:            moduleFile,
		moduleFileName:        moduleFileName,
		packageName:           packageName,

		symbol:            storedSymbol,
		moduleSymbol:      storedModuleSymbol,
		exportKind:        exportKind,
		targetFlags:       target.Flags,
		isFromPackageJson: isFromPackageJson,
	})
}

func (e *exportInfoMap) search(
	ch *checker.Checker,
	importingFile tspath.Path,
	preferCapitalized bool,
	matches func(name string, targetFlags ast.SymbolFlags) bool,
	action func(info []*SymbolExportInfo, symbolName string, isFromAmbientModule bool, key ExportInfoMapKey) []*SymbolExportInfo,
) []*SymbolExportInfo {
	if importingFile != e.usableByFileName {
		return nil
	}
	for key, info := range e.exportInfo.M {
		symbolName, ambientModuleName := key.SymbolName, key.AmbientModuleName
		if preferCapitalized && info[0].capitalizedSymbolName != "" {
			symbolName = info[0].capitalizedSymbolName
		}
		if matches(symbolName, info[0].targetFlags) {
			rehydrated := core.Map(info, func(info CachedSymbolExportInfo) *SymbolExportInfo {
				return e.rehydrateCachedInfo(ch, info)
			})
			filtered := core.FilterIndex(rehydrated, func(r *SymbolExportInfo, i int, _ []*SymbolExportInfo) bool {
				return e.isNotShadowedByDeeperNodeModulesPackage(r, info[i].packageName)
			})
			if len(filtered) > 0 {
				if res := action(filtered, symbolName, ambientModuleName != "", key); res != nil {
					return res
				}
			}
		}
	}
	return nil
}

func (e *exportInfoMap) isNotShadowedByDeeperNodeModulesPackage(info *SymbolExportInfo, packageName string) bool {
	if packageName == "" || info.moduleFileName == "" {
		return true
	}
	if e.globalTypingsCacheLocation != "" && strings.HasPrefix(info.moduleFileName, e.globalTypingsCacheLocation) {
		return true
	}
	packageDeepestNodeModulesPath, ok := e.packages[packageName]
	return !ok || strings.HasPrefix(info.moduleFileName, packageDeepestNodeModulesPath)
}

func (e *exportInfoMap) rehydrateCachedInfo(ch *checker.Checker, info CachedSymbolExportInfo) *SymbolExportInfo {
	if info.symbol != nil && info.moduleSymbol != nil {
		return &SymbolExportInfo{
			symbol:            info.symbol,
			moduleSymbol:      info.moduleSymbol,
			moduleFileName:    info.moduleFileName,
			exportKind:        info.exportKind,
			targetFlags:       info.targetFlags,
			isFromPackageJson: info.isFromPackageJson,
		}
	}
	cached := e.symbols[info.id]
	cachedSymbol, cachedModuleSymbol := cached.symbol, cached.moduleSymbol
	if cachedSymbol != nil && cachedModuleSymbol != nil {
		return &SymbolExportInfo{
			symbol:            cachedSymbol,
			moduleSymbol:      cachedModuleSymbol,
			moduleFileName:    info.moduleFileName,
			exportKind:        info.exportKind,
			targetFlags:       info.targetFlags,
			isFromPackageJson: info.isFromPackageJson,
		}
	}

	moduleSymbol := core.Coalesce(info.moduleSymbol, cachedModuleSymbol)
	if moduleSymbol == nil {
		if info.moduleFile != nil {
			moduleSymbol = ch.GetMergedSymbol(info.moduleFile.Symbol)
		} else {
			moduleSymbol = ch.TryFindAmbientModule(info.moduleName)
		}
	}
	if moduleSymbol == nil {
		panic(fmt.Sprintf("Could not find module symbol for %s in exportInfoMap", info.moduleName))
	}
	symbol := core.Coalesce(info.symbol, cachedSymbol)
	if symbol == nil {
		if info.exportKind == ExportKindExportEquals {
			symbol = ch.ResolveExternalModuleSymbol(moduleSymbol)
		} else {
			symbol = ch.TryGetMemberInModuleExportsAndProperties(info.symbolTableKey, moduleSymbol)
		}
	}

	if symbol == nil {
		panic(fmt.Sprintf("Could not find symbol '%s' by key '%s' in module %s", info.symbolName, info.symbolTableKey, moduleSymbol.Name))
	}
	e.symbols[info.id] = symbolExportEntry{symbol, moduleSymbol}
	return &SymbolExportInfo{
		symbol,
		moduleSymbol,
		info.moduleFileName,
		info.exportKind,
		info.targetFlags,
		info.isFromPackageJson,
	}
}

func getNamesForExportedSymbol(defaultExport *ast.Symbol, ch *checker.Checker, scriptTarget core.ScriptTarget) []string {
	var names []string
	forEachNameOfDefaultExport(defaultExport, ch, scriptTarget, func(name, capitalizedName string) string {
		if capitalizedName != "" {
			names = []string{name, capitalizedName}
		} else {
			names = []string{name}
		}
		return name
	})
	return names
}

type packageJsonImportFilter struct {
	allowsImportingAmbientModule func(moduleSymbol *ast.Symbol, host modulespecifiers.ModuleSpecifierGenerationHost) bool
	getSourceFileInfo            func(sourceFile *ast.SourceFile, host modulespecifiers.ModuleSpecifierGenerationHost) packageJsonFilterResult
	/**
	 * Use for a specific module specifier that has already been resolved.
	 * Use `allowsImportingAmbientModule` or `allowsImportingSourceFile` to resolve
	 * the best module specifier for a given module _and_ determine if it's importable.
	 */
	allowsImportingSpecifier func(moduleSpecifier string) bool
}

type packageJsonFilterResult struct {
	importable  bool
	packageName string
}
type projectPackageJsonInfo struct {
	fileName             string
	parseable            bool
	dependencies         map[string]string
	devDependencies      map[string]string
	peerDependencies     map[string]string
	optionalDependencies map[string]string
}

func (info *projectPackageJsonInfo) has(dependencyName string) bool {
	if _, ok := info.dependencies[dependencyName]; ok {
		return true
	}
	if _, ok := info.devDependencies[dependencyName]; ok {
		return true
	}

	if _, ok := info.peerDependencies[dependencyName]; ok {
		return true
	}
	if _, ok := info.optionalDependencies[dependencyName]; ok {
		return true
	}

	return false
}

func (l *LanguageService) getImportCompletionAction(
	ctx context.Context,
	ch *checker.Checker,
	targetSymbol *ast.Symbol,
	moduleSymbol *ast.Symbol,
	sourceFile *ast.SourceFile,
	position int,
	exportMapKey ExportInfoMapKey,
	symbolName string, // !!! needs *string ?
	isJsxTagName bool,
	// formatContext *formattingContext,
	preferences *UserPreferences,
) (string, codeAction) {
	var exportInfos []*SymbolExportInfo
	// `exportMapKey` should be in the `itemData` of each auto-import completion entry and sent in resolving completion entry requests
	exportInfos = l.getExportInfos(ctx, ch, sourceFile, preferences, exportMapKey)
	if len(exportInfos) == 0 {
		panic("Some exportInfo should match the specified exportMapKey")
	}

	isValidTypeOnlyUseSite := ast.IsValidTypeOnlyAliasUseSite(astnav.GetTokenAtPosition(sourceFile, position))
	fix := l.getImportFixForSymbol(ch, sourceFile, exportInfos, position, ptrTo(isValidTypeOnlyUseSite), preferences)
	if fix == nil {
		lineAndChar := l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(position))
		panic(fmt.Sprintf("expected importFix at %s: (%v,%v)", sourceFile.FileName(), lineAndChar.Line, lineAndChar.Character))
	}
	return fix.moduleSpecifier, l.codeActionForFix(ctx, sourceFile, symbolName, fix /*includeSymbolNameInDescription*/, false, preferences)
}

func NewExportInfoMap(globalsTypingCacheLocation string) *exportInfoMap {
	return &exportInfoMap{
		packages:                   map[string]string{},
		symbols:                    map[int]symbolExportEntry{},
		exportInfo:                 collections.MultiMap[ExportInfoMapKey, CachedSymbolExportInfo]{},
		globalTypingsCacheLocation: globalsTypingCacheLocation,
	}
}

func (l *LanguageService) isImportable(
	fromFile *ast.SourceFile,
	toFile *ast.SourceFile,
	toModule *ast.Symbol,
	preferences *UserPreferences,
	packageJsonFilter *packageJsonImportFilter,
	// moduleSpecifierResolutionHost ModuleSpecifierResolutionHost,
	// moduleSpecifierCache ModuleSpecifierCache,
) bool {
	// !!! moduleSpecifierResolutionHost := l.GetModuleSpecifierResolutionHost()
	moduleSpecifierResolutionHost := l.GetProgram()

	// Ambient module
	if toFile == nil {
		moduleName := stringutil.StripQuotes(toModule.Name)
		if _, ok := core.NodeCoreModules()[moduleName]; ok {
			if useNodePrefix := shouldUseUriStyleNodeCoreModules(fromFile, l.GetProgram()); useNodePrefix {
				return useNodePrefix == strings.HasPrefix(moduleName, "node:")
			}
		}
		return packageJsonFilter == nil ||
			packageJsonFilter.allowsImportingAmbientModule(toModule, moduleSpecifierResolutionHost) ||
			fileContainsPackageImport(fromFile, moduleName)
	}

	if fromFile == toFile {
		return false
	}

	// !!! moduleSpecifierCache
	// cachedResult := moduleSpecifierCache?.get(fromFile.path, toFile.path, preferences, {})
	// if cachedResult?.isBlockedByPackageJsonDependencies != nil {
	//     return !cachedResult.isBlockedByPackageJsonDependencies || cachedResult.packageName != nil && fileContainsPackageImport(fromFile, cachedResult.packageName)
	// }

	fromPath := fromFile.FileName()
	useCaseSensitiveFileNames := moduleSpecifierResolutionHost.UseCaseSensitiveFileNames()
	globalTypingsCache := l.GetProgram().GetGlobalTypingsCacheLocation()
	modulePaths := modulespecifiers.GetEachFileNameOfModule(
		fromPath,
		toFile.FileName(),
		moduleSpecifierResolutionHost,
		/*preferSymlinks*/ false,
	)
	hasImportablePath := false
	for _, module := range modulePaths {
		file := l.GetProgram().GetSourceFile(module.FileName)

		// Determine to import using toPath only if toPath is what we were looking at
		// or there doesnt exist the file in the program by the symlink
		if file == nil || file != toFile {
			continue
		}

		// If it's in a `node_modules` but is not reachable from here via a global import, don't bother.
		toNodeModules := tspath.ForEachAncestorDirectoryStoppingAtGlobalCache(
			globalTypingsCache,
			module.FileName,
			func(ancestor string) (string, bool) {
				if tspath.GetBaseFileName(ancestor) == "node_modules" {
					return ancestor, true
				} else {
					return "", false
				}
			},
		)
		toNodeModulesParent := ""
		if toNodeModules != "" {
			toNodeModulesParent = tspath.GetDirectoryPath(tspath.GetCanonicalFileName(toNodeModules, useCaseSensitiveFileNames))
		}
		hasImportablePath = toNodeModulesParent != "" ||
			strings.HasPrefix(tspath.GetCanonicalFileName(fromPath, useCaseSensitiveFileNames), toNodeModulesParent) ||
			(globalTypingsCache != "" && strings.HasPrefix(tspath.GetCanonicalFileName(globalTypingsCache, useCaseSensitiveFileNames), toNodeModulesParent))
		if hasImportablePath {
			break
		}
	}

	if packageJsonFilter != nil {
		if hasImportablePath {
			importInfo := packageJsonFilter.getSourceFileInfo(toFile, moduleSpecifierResolutionHost)
			// moduleSpecifierCache?.setBlockedByPackageJsonDependencies(fromFile.path, toFile.path, preferences, {}, importInfo?.packageName, !importInfo?.importable)
			return importInfo.importable || hasImportablePath && importInfo.packageName != "" && fileContainsPackageImport(fromFile, importInfo.packageName)
		}
		return false
	}

	return hasImportablePath
}

func fileContainsPackageImport(sourceFile *ast.SourceFile, packageName string) bool {
	return core.Some(sourceFile.Imports(), func(i *ast.Node) bool {
		text := i.Text()
		return text == packageName || strings.HasPrefix(text, packageName+"/")
	})
}

func isImportableSymbol(symbol *ast.Symbol, ch *checker.Checker) bool {
	return !ch.IsUndefinedSymbol(symbol) && !ch.IsUnknownSymbol(symbol) && !checker.IsKnownSymbol(symbol) // !!! && !checker.IsPrivateIdentifierSymbol(symbol);
}

func getDefaultLikeExportInfo(moduleSymbol *ast.Symbol, ch *checker.Checker) *ExportInfo {
	exportEquals := ch.ResolveExternalModuleSymbol(moduleSymbol)
	if exportEquals != moduleSymbol {
		if defaultExport := ch.TryGetMemberInModuleExports(ast.InternalSymbolNameDefault, exportEquals); defaultExport != nil {
			return &ExportInfo{defaultExport, ExportKindDefault}
		}
		return &ExportInfo{exportEquals, ExportKindExportEquals}
	}
	if defaultExport := ch.TryGetMemberInModuleExports(ast.InternalSymbolNameDefault, moduleSymbol); defaultExport != nil {
		return &ExportInfo{defaultExport, ExportKindDefault}
	}
	return nil
}

type importSpecifierResolverForCompletions struct {
	*ast.SourceFile // importingFile
	*UserPreferences
	l      *LanguageService
	filter *packageJsonImportFilter
}

func (r *importSpecifierResolverForCompletions) packageJsonImportFilter() *packageJsonImportFilter {
	if r.filter == nil {
		r.filter = r.l.createPackageJsonImportFilter(r.SourceFile, *r.UserPreferences)
	}
	return r.filter
}

func (i *importSpecifierResolverForCompletions) getModuleSpecifierForBestExportInfo(
	ch *checker.Checker,
	exportInfo []*SymbolExportInfo,
	position int,
	isValidTypeOnlyUseSite bool,
) *ImportFix {
	// !!! caching
	//  used in completions, usually calculated once per `getCompletionData` call
	var userPreferences UserPreferences
	if i.UserPreferences == nil {
		userPreferences = UserPreferences{}
	} else {
		userPreferences = *i.UserPreferences
	}
	packageJsonImportFilter := i.packageJsonImportFilter()
	_, fixes := i.l.getImportFixes(ch, exportInfo, ptrTo(i.l.converters.PositionToLineAndCharacter(i.SourceFile, core.TextPos(position))), ptrTo(isValidTypeOnlyUseSite), ptrTo(false), i.SourceFile, userPreferences, false /* fromCacheOnly */)
	return i.l.getBestFix(fixes, i.SourceFile, packageJsonImportFilter.allowsImportingSpecifier, userPreferences)
}

func (l *LanguageService) getImportFixForSymbol(
	ch *checker.Checker,
	sourceFile *ast.SourceFile,
	exportInfos []*SymbolExportInfo,
	position int,
	isValidTypeOnlySite *bool,
	preferences *UserPreferences,
) *ImportFix {
	var userPreferences UserPreferences
	if preferences != nil {
		userPreferences = *preferences
	}

	if isValidTypeOnlySite == nil {
		isValidTypeOnlySite = ptrTo(ast.IsValidTypeOnlyAliasUseSite(astnav.GetTokenAtPosition(sourceFile, position)))
	}
	useRequire := getShouldUseRequire(sourceFile, l.GetProgram())
	packageJsonImportFilter := l.createPackageJsonImportFilter(sourceFile, userPreferences)
	_, fixes := l.getImportFixes(ch, exportInfos, ptrTo(l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(position))), isValidTypeOnlySite, &useRequire, sourceFile, userPreferences, false /* fromCacheOnly */)
	return l.getBestFix(fixes, sourceFile, packageJsonImportFilter.allowsImportingSpecifier, userPreferences)
}

func (l *LanguageService) getBestFix(fixes []*ImportFix, sourceFile *ast.SourceFile, allowsImportingSpecifier func(moduleSpecifier string) bool, preferences UserPreferences) *ImportFix {
	if len(fixes) == 0 {
		return nil
	}

	// These will always be placed first if available, and are better than other kinds
	if fixes[0].kind == ImportFixKindUseNamespace || fixes[0].kind == ImportFixKindAddToExisting {
		return fixes[0]
	}

	best := fixes[0]
	for _, fix := range fixes {
		// Takes true branch of conditional if `fix` is better than `best`
		if compareModuleSpecifiers(
			fix,
			best,
			sourceFile,
			l.GetProgram(),
			preferences,
			allowsImportingSpecifier,
			func(fileName string) tspath.Path {
				return tspath.ToPath(fileName, l.GetProgram().GetCurrentDirectory(), l.GetProgram().UseCaseSensitiveFileNames())
			},
		) < 0 {
			best = fix
		}
	}

	return best
}

func (l *LanguageService) getImportFixes(
	ch *checker.Checker,
	exportInfos []*SymbolExportInfo, // | FutureSymbolExportInfo[],
	usagePosition *lsproto.Position,
	isValidTypeOnlyUseSite *bool,
	useRequire *bool,
	sourceFile *ast.SourceFile, // | FutureSourceFile,
	preferences UserPreferences,
	// importMap *importMap,
	fromCacheOnly bool,
) (int, []*ImportFix) {
	// if importMap == nil { && !!! isFullSourceFile(sourceFile)
	importMap := createExistingImportMap(sourceFile, l.GetProgram(), ch)
	var existingImports []*FixAddToExistingImportInfo
	if importMap != nil {
		existingImports = core.FlatMap(exportInfos, importMap.getImportsForExportInfo)
	}
	var useNamespace []*ImportFix
	if usagePosition != nil {
		if namespaceImport := tryUseExistingNamespaceImport(existingImports, *usagePosition); namespaceImport != nil {
			useNamespace = append(useNamespace, namespaceImport)
		}
	}
	if addToExisting := tryAddToExistingImport(existingImports, isValidTypeOnlyUseSite, ch, l.GetProgram().Options()); addToExisting != nil {
		// Don't bother providing an action to add a new import if we can add to an existing one.
		return 0, append(useNamespace, addToExisting)
	}

	result := l.getFixesForAddImport(
		ch,
		exportInfos,
		existingImports,
		sourceFile,
		usagePosition,
		*isValidTypeOnlyUseSite,
		*useRequire,
		preferences,
		fromCacheOnly,
	)
	computedWithoutCacheCount := 0
	// if result.computedWithoutCacheCount != nil {
	//     computedWithoutCacheCount = *result.computedWithoutCacheCount
	// }
	return computedWithoutCacheCount, append(useNamespace, result...)
}

func (l *LanguageService) createPackageJsonImportFilter(fromFile *ast.SourceFile, preferences UserPreferences) *packageJsonImportFilter {
	packageJsons := []*projectPackageJsonInfo{}
	// packageJsons := (
	//     (host.getPackageJsonsVisibleToFile && host.getPackageJsonsVisibleToFile(fromFile.fileName)) || getPackageJsonsVisibleToFile(fromFile.fileName, host)
	// ).filter(p => p.parseable);

	var usesNodeCoreModules *bool
	ambientModuleCache := map[*ast.Symbol]bool{}
	sourceFileCache := map[*ast.SourceFile]packageJsonFilterResult{}

	getNodeModuleRootSpecifier := func(fullSpecifier string) string {
		components := tspath.GetPathComponents(modulespecifiers.GetPackageNameFromTypesPackageName(fullSpecifier), "")[1:]
		// Scoped packages
		if strings.HasPrefix(components[0], "@") {
			return fmt.Sprintf("%s/%s", components[0], components[1])
		}
		return components[0]
	}

	moduleSpecifierIsCoveredByPackageJson := func(specifier string) bool {
		packageName := getNodeModuleRootSpecifier(specifier)
		for _, packageJson := range packageJsons {
			if packageJson.has(packageName) || packageJson.has(module.GetTypesPackageName(packageName)) {
				return true
			}
		}
		return false
	}

	isAllowedCoreNodeModulesImport := func(moduleSpecifier string) bool {
		// If we're in JavaScript, it can be difficult to tell whether the user wants to import
		// from Node core modules or not. We can start by seeing if the user is actually using
		// any node core modules, as opposed to simply having @types/node accidentally as a
		// dependency of a dependency.
		if /*isFullSourceFile(fromFile) &&*/ ast.IsSourceFileJS(fromFile) && core.NodeCoreModules()[moduleSpecifier] {
			if usesNodeCoreModules == nil {
				usesNodeCoreModules = ptrTo(consumesNodeCoreModules(fromFile))
			}
			if *usesNodeCoreModules {
				return true
			}
		}
		return false
	}

	getNodeModulesPackageNameFromFileName := func(importedFileName string, moduleSpecifierResolutionHost modulespecifiers.ModuleSpecifierGenerationHost) *string {
		if !strings.Contains(importedFileName, "node_modules") {
			return nil
		}
		specifier := modulespecifiers.GetNodeModulesPackageName(
			l.host.GetProgram().Options(),
			fromFile,
			importedFileName,
			moduleSpecifierResolutionHost,
			preferences.ModuleSpecifierPreferences(),
			modulespecifiers.ModuleSpecifierOptions{},
		)
		if specifier == "" {
			return nil
		}
		// Paths here are not node_modules, so we don't care about them;
		// returning anything will trigger a lookup in package.json.
		if !tspath.PathIsRelative(specifier) && !tspath.IsRootedDiskPath(specifier) {
			return ptrTo(getNodeModuleRootSpecifier(specifier))
		}
		return nil
	}

	allowsImportingAmbientModule := func(moduleSymbol *ast.Symbol, moduleSpecifierResolutionHost modulespecifiers.ModuleSpecifierGenerationHost) bool {
		if len(packageJsons) > 0 || moduleSymbol.ValueDeclaration == nil {
			return true
		}

		if cached, ok := ambientModuleCache[moduleSymbol]; ok {
			return cached
		}

		declaredModuleSpecifier := stringutil.StripQuotes(moduleSymbol.Name)
		if isAllowedCoreNodeModulesImport(declaredModuleSpecifier) {
			ambientModuleCache[moduleSymbol] = true
			return true
		}

		declaringSourceFile := ast.GetSourceFileOfNode(moduleSymbol.ValueDeclaration)
		declaringNodeModuleName := getNodeModulesPackageNameFromFileName(declaringSourceFile.FileName(), moduleSpecifierResolutionHost)
		if declaringNodeModuleName == nil {
			ambientModuleCache[moduleSymbol] = true
			return true
		}

		result := moduleSpecifierIsCoveredByPackageJson(*declaringNodeModuleName)
		if !result {
			result = moduleSpecifierIsCoveredByPackageJson(declaredModuleSpecifier)
		}
		ambientModuleCache[moduleSymbol] = result
		return result
	}

	getSourceFileInfo := func(sourceFile *ast.SourceFile, moduleSpecifierResolutionHost modulespecifiers.ModuleSpecifierGenerationHost) packageJsonFilterResult {
		result := packageJsonFilterResult{
			importable:  true,
			packageName: "",
		}

		if len(packageJsons) == 0 {
			return result
		}
		if cached, ok := sourceFileCache[sourceFile]; ok {
			return cached
		}

		if packageName := getNodeModulesPackageNameFromFileName(sourceFile.FileName(), moduleSpecifierResolutionHost); packageName != nil {
			result = packageJsonFilterResult{importable: moduleSpecifierIsCoveredByPackageJson(*packageName), packageName: *packageName}
		}
		sourceFileCache[sourceFile] = result
		return result
	}

	allowsImportingSpecifier := func(moduleSpecifier string) bool {
		if len(packageJsons) == 0 || isAllowedCoreNodeModulesImport(moduleSpecifier) {
			return true
		}
		if tspath.PathIsRelative(moduleSpecifier) || tspath.IsRootedDiskPath(moduleSpecifier) {
			return true
		}
		return moduleSpecifierIsCoveredByPackageJson(moduleSpecifier)
	}

	return &packageJsonImportFilter{
		allowsImportingAmbientModule,
		getSourceFileInfo,
		allowsImportingSpecifier,
	}
}

func consumesNodeCoreModules(sourceFile *ast.SourceFile) bool {
	for _, importStatement := range sourceFile.Imports() {
		if core.NodeCoreModules()[importStatement.Text()] {
			return true
		}
	}
	return false
}

func createExistingImportMap(importingFile *ast.SourceFile, program *compiler.Program, ch *checker.Checker) *importMap {
	m := collections.MultiMap[ast.SymbolId, *ast.Statement]{}
	for _, moduleSpecifier := range importingFile.Imports() {
		i := tryGetImportFromModuleSpecifier(moduleSpecifier)
		if i == nil {
			panic("error: did not expect node kind " + moduleSpecifier.Kind.String())
		} else if ast.IsVariableDeclarationInitializedToRequire(i.Parent) {
			if moduleSymbol := ch.ResolveExternalModuleName(moduleSpecifier); moduleSymbol != nil {
				m.Add(ast.GetSymbolId(moduleSymbol), i.Parent)
			}
		} else if i.Kind == ast.KindImportDeclaration || i.Kind == ast.KindImportEqualsDeclaration || i.Kind == ast.KindJSDocImportTag {
			if moduleSymbol := ch.GetSymbolAtLocation(moduleSpecifier); moduleSymbol != nil {
				m.Add(ast.GetSymbolId(moduleSymbol), i)
			}
		}
	}
	return &importMap{importingFile: importingFile, program: program, m: m}
}

type importMap struct {
	importingFile *ast.SourceFile
	program       *compiler.Program
	m             collections.MultiMap[ast.SymbolId, *ast.Statement] // !!! anyImportOrRequire
}

func (i *importMap) getImportsForExportInfo(info *SymbolExportInfo /* | FutureSymbolExportInfo*/) []*FixAddToExistingImportInfo {
	matchingDeclarations := i.m.Get(ast.GetSymbolId(info.moduleSymbol))
	if len(matchingDeclarations) == 0 {
		return nil
	}

	// Can't use an es6 import for a type in JS.
	if ast.IsSourceFileJS(i.importingFile) && info.targetFlags&ast.SymbolFlagsValue == 0 && !core.Every(matchingDeclarations, ast.IsJSDocImportTag) {
		return nil
	}

	importKind := getImportKind(i.importingFile, info.exportKind, i.program, false)
	return core.Map(matchingDeclarations, func(d *ast.Statement) *FixAddToExistingImportInfo {
		return &FixAddToExistingImportInfo{declaration: d, importKind: importKind, symbol: info.symbol, targetFlags: info.targetFlags}
	})
}

func tryUseExistingNamespaceImport(existingImports []*FixAddToExistingImportInfo, position lsproto.Position) *ImportFix {
	// It is possible that multiple import statements with the same specifier exist in the file.
	// e.g.
	//
	//     import * as ns from "foo";
	//     import { member1, member2 } from "foo";
	//
	//     member3/**/ <-- cusor here
	//
	// in this case we should provie 2 actions:
	//     1. change "member3" to "ns.member3"
	//     2. add "member3" to the second import statement's import list
	// and it is up to the user to decide which one fits best.
	for _, existingImport := range existingImports {
		if existingImport.importKind != ImportKindNamed {
			continue
		}
		var namespacePrefix string
		declaration := existingImport.declaration
		switch declaration.Kind {
		case ast.KindVariableDeclaration, ast.KindImportEqualsDeclaration:
			name := declaration.Name()
			if declaration.Kind == ast.KindVariableDeclaration && (name == nil || name.Kind != ast.KindIdentifier) {
				continue
			}
			namespacePrefix = name.Text()
		case ast.KindJSDocImportTag, ast.KindImportDeclaration:
			importClause := ast.GetImportClauseOfDeclaration(declaration)
			if importClause == nil || importClause.NamedBindings == nil || importClause.NamedBindings.Kind != ast.KindNamespaceImport {
				continue
			}
			namespacePrefix = importClause.NamedBindings.Name().Text()
		default:
			debug.AssertNever(declaration)
		}
		if namespacePrefix == "" {
			continue
		}
		moduleSpecifier := checker.TryGetModuleSpecifierFromDeclaration(declaration)
		if moduleSpecifier != nil && moduleSpecifier.Text() != "" {
			return getUseNamespaceImport(
				moduleSpecifier.Text(),
				modulespecifiers.ResultKindNone,
				namespacePrefix,
				position,
			)
		}
	}
	return nil
}

func tryAddToExistingImport(existingImports []*FixAddToExistingImportInfo, isValidTypeOnlyUseSite *bool, ch *checker.Checker, compilerOptions *core.CompilerOptions) *ImportFix {
	var best *ImportFix

	typeOnly := false
	if isValidTypeOnlyUseSite != nil {
		typeOnly = *isValidTypeOnlyUseSite
	}

	for _, existingImport := range existingImports {
		fix := existingImport.getAddToExistingImportFix(typeOnly, ch, compilerOptions)
		if fix == nil {
			continue
		}
		isTypeOnly := ast.IsTypeOnlyImportDeclaration(fix.importClauseOrBindingPattern)
		if (fix.addAsTypeOnly != AddAsTypeOnlyNotAllowed && isTypeOnly) || (fix.addAsTypeOnly == AddAsTypeOnlyNotAllowed && !isTypeOnly) {
			// Give preference to putting types in existing type-only imports and avoiding conversions
			// of import statements to/from type-only.
			return fix
		}
		if best == nil {
			best = fix
		}
	}
	return best
}

func (info *FixAddToExistingImportInfo) getAddToExistingImportFix(isValidTypeOnlyUseSite bool, ch *checker.Checker, compilerOptions *core.CompilerOptions) *ImportFix {
	if info.importKind == ImportKindCommonJS || info.importKind == ImportKindNamespace || info.declaration.Kind == ast.KindImportEqualsDeclaration {
		// These kinds of imports are not combinable with anything
		return nil
	}

	if info.declaration.Kind == ast.KindVariableDeclaration {
		if (info.importKind == ImportKindNamed || info.importKind == ImportKindDefault) && info.declaration.Name().Kind == ast.KindObjectBindingPattern {
			return getAddToExistingImport(
				info.declaration.Name(),
				info.importKind,
				info.declaration.Initializer().Arguments()[0].Text(),
				modulespecifiers.ResultKindNone,
				AddAsTypeOnlyNotAllowed,
			)
		}
		return nil
	}

	importClause := ast.GetImportClauseOfDeclaration(info.declaration)
	if importClause == nil || !ast.IsStringLiteralLike(info.declaration.ModuleSpecifier()) {
		return nil
	}
	namedBindings := importClause.NamedBindings
	// A type-only import may not have both a default and named imports, so the only way a name can
	// be added to an existing type-only import is adding a named import to existing named bindings.
	if importClause.IsTypeOnly && !(info.importKind == ImportKindNamed && namedBindings != nil) {
		return nil
	}

	// N.B. we don't have to figure out whether to use the main program checker
	// or the AutoImportProvider checker because we're adding to an existing import; the existence of
	// the import guarantees the symbol came from the main program.
	addAsTypeOnly := getAddAsTypeOnly(isValidTypeOnlyUseSite, info.symbol, info.targetFlags, ch, compilerOptions)

	if info.importKind == ImportKindDefault && (importClause.Name() != nil || // Cannot add a default import to a declaration that already has one
		addAsTypeOnly == AddAsTypeOnlyRequired && namedBindings != nil) { // Cannot add a default import as type-only if the import already has named bindings

		return nil
	}

	// Cannot add a named import to a declaration that has a namespace import
	if info.importKind == ImportKindNamed && namedBindings != nil && namedBindings.Kind == ast.KindNamespaceImport {
		return nil
	}

	return getAddToExistingImport(
		importClause.AsNode(),
		info.importKind,
		info.declaration.ModuleSpecifier().Text(),
		modulespecifiers.ResultKindNone,
		addAsTypeOnly,
	)
}

func (l *LanguageService) getFixesForAddImport(
	ch *checker.Checker,
	exportInfos []*SymbolExportInfo, // !!! | readonly FutureSymbolExportInfo[],
	existingImports []*FixAddToExistingImportInfo,
	sourceFile *ast.SourceFile, // !!! | FutureSourceFile,
	usagePosition *lsproto.Position,
	isValidTypeOnlyUseSite bool,
	useRequire bool,
	preferences UserPreferences,
	fromCacheOnly bool,
) []*ImportFix {
	// tries to create a new import statement using an existing import specifier
	var importWithExistingSpecifier *ImportFix

	for _, existingImport := range existingImports {
		if fix := existingImport.getNewImportFromExistingSpecifier(isValidTypeOnlyUseSite, useRequire, ch, l.GetProgram().Options()); fix != nil {
			importWithExistingSpecifier = fix
			break
		}
	}

	if importWithExistingSpecifier != nil {
		return []*ImportFix{importWithExistingSpecifier}
	}

	return l.getNewImportFixes(ch, sourceFile, usagePosition, isValidTypeOnlyUseSite, useRequire, exportInfos, preferences, fromCacheOnly)
}

func (l *LanguageService) getNewImportFixes(
	ch *checker.Checker,
	sourceFile *ast.SourceFile, // | FutureSourceFile,
	usagePosition *lsproto.Position,
	isValidTypeOnlyUseSite bool,
	useRequire bool,
	exportInfos []*SymbolExportInfo, // !!! (SymbolExportInfo | FutureSymbolExportInfo)[],
	preferences UserPreferences,
	fromCacheOnly bool,
) []*ImportFix /* FixAddNewImport | FixAddJsdocTypeImport */ {
	isJs := tspath.HasJSFileExtension(sourceFile.FileName())
	compilerOptions := l.GetProgram().Options()
	// !!! packagejsonAutoimportProvider
	// getChecker := createGetChecker(program, host)// memoized typechecker based on `isFromPackageJson` bool

	getModuleSpecifiers := func(moduleSymbol *ast.Symbol, checker *checker.Checker) ([]string, modulespecifiers.ResultKind) {
		return modulespecifiers.GetModuleSpecifiersWithInfo(moduleSymbol, checker, compilerOptions, sourceFile, l.GetProgram(), preferences.ModuleSpecifierPreferences(), modulespecifiers.ModuleSpecifierOptions{}, true /*forAutoImport*/)
	}
	// fromCacheOnly
	//     ? (exportInfo: SymbolExportInfo | FutureSymbolExportInfo) => moduleSpecifiers.tryGetModuleSpecifiersFromCache(exportInfo.moduleSymbol, sourceFile, moduleSpecifierResolutionHost, preferences)
	//     : (exportInfo: SymbolExportInfo | FutureSymbolExportInfo, checker: TypeChecker) => moduleSpecifiers.getModuleSpecifiersWithCacheInfo(exportInfo.moduleSymbol, checker, compilerOptions, sourceFile, moduleSpecifierResolutionHost, preferences, /*options*/ nil, /*forAutoImport*/ true);

	// computedWithoutCacheCount = 0;
	var fixes []*ImportFix /* FixAddNewImport | FixAddJsdocTypeImport */
	for i, exportInfo := range exportInfos {
		moduleSpecifiers, moduleSpecifierKind := getModuleSpecifiers(exportInfo.moduleSymbol, ch)
		importedSymbolHasValueMeaning := exportInfo.targetFlags&ast.SymbolFlagsValue != 0
		addAsTypeOnly := getAddAsTypeOnly(isValidTypeOnlyUseSite, exportInfo.symbol, exportInfo.targetFlags, ch, compilerOptions)
		// computedWithoutCacheCount += computedWithoutCache ? 1 : 0;
		for _, moduleSpecifier := range moduleSpecifiers {
			if modulespecifiers.ContainsNodeModules(moduleSpecifier) {
				continue
			}
			if !importedSymbolHasValueMeaning && isJs && usagePosition != nil {
				// `position` should only be undefined at a missing jsx namespace, in which case we shouldn't be looking for pure types.
				fixes = append(fixes, getAddJsdocTypeImport(
					moduleSpecifier,
					moduleSpecifierKind,
					usagePosition,
					exportInfo,
					ptrTo(i > 0)), // isReExport
				)
				continue
			}
			importKind := getImportKind(sourceFile, exportInfo.exportKind, l.GetProgram(), false)
			var qualification *Qualification
			if usagePosition != nil && importKind == ImportKindCommonJS && exportInfo.exportKind == ExportKindNamed {
				// Compiler options are restricting our import options to a require, but we need to access
				// a named export or property of the exporting module. We need to import the entire module
				// and insert a property access, e.g. `writeFile` becomes
				//
				// import fs = require("fs"); // or const in JS
				// fs.writeFile
				exportEquals := ch.ResolveExternalModuleSymbol(exportInfo.moduleSymbol)
				var namespacePrefix *string
				if exportEquals != exportInfo.moduleSymbol {
					namespacePrefix = strPtrTo(forEachNameOfDefaultExport(
						exportEquals,
						ch,
						compilerOptions.GetEmitScriptTarget(),
						func(a, _ string) string { return a }, // Identity
					))
				}
				if namespacePrefix == nil {
					namespacePrefix = ptrTo(moduleSymbolToValidIdentifier(
						exportInfo.moduleSymbol,
						compilerOptions.GetEmitScriptTarget(),
						/*forceCapitalize*/ false,
					))
				}
				qualification = &Qualification{*usagePosition, *namespacePrefix}
			}
			fixes = append(fixes, getNewAddNewImport(
				moduleSpecifier,
				moduleSpecifierKind,
				importKind,
				useRequire,
				addAsTypeOnly,
				exportInfo,
				ptrTo(i > 0), // isReExport
				qualification,
			))
		}
	}

	return fixes
}

func getAddAsTypeOnly(
	isValidTypeOnlyUseSite bool,
	symbol *ast.Symbol,
	targetFlags ast.SymbolFlags,
	ch *checker.Checker,
	compilerOptions *core.CompilerOptions,
) AddAsTypeOnly {
	if !isValidTypeOnlyUseSite {
		// Can't use a type-only import if the usage is an emitting position
		return AddAsTypeOnlyNotAllowed
	}
	if symbol != nil && compilerOptions.VerbatimModuleSyntax.IsTrue() &&
		(targetFlags&ast.SymbolFlagsValue == 0 || ch.GetTypeOnlyAliasDeclaration(symbol) != nil) {
		// A type-only import is required for this symbol if under these settings if the symbol will
		// be erased, which will happen if the target symbol is purely a type or if it was exported/imported
		// as type-only already somewhere between this import and the target.
		return AddAsTypeOnlyRequired
	}
	return AddAsTypeOnlyAllowed
}

func getShouldUseRequire(
	sourceFile *ast.SourceFile, // !!! | FutureSourceFile
	program *compiler.Program,
) bool {
	// 1. TypeScript files don't use require variable declarations
	if !tspath.HasJSFileExtension(sourceFile.FileName()) {
		return false
	}

	// 2. If the current source file is unambiguously CJS or ESM, go with that
	switch {
	case sourceFile.CommonJSModuleIndicator != nil && sourceFile.ExternalModuleIndicator == nil:
		return true
	case sourceFile.ExternalModuleIndicator != nil && sourceFile.CommonJSModuleIndicator == nil:
		return false
	}

	// 3. If there's a tsconfig/jsconfig, use its module setting
	if program.Options().ConfigFilePath != "" {
		return program.Options().GetEmitModuleKind() < core.ModuleKindES2015
	}

	// 4. In --module nodenext, assume we're not emitting JS -> JS, so use
	//    whatever syntax Node expects based on the detected module kind
	//    TODO: consider removing `impliedNodeFormatForEmit`
	switch program.GetImpliedNodeFormatForEmit(sourceFile) {
	case core.ModuleKindCommonJS:
		return true
	case core.ModuleKindESNext:
		return false
	}

	// 5. Match the first other JS file in the program that's unambiguously CJS or ESM
	for _, otherFile := range program.GetSourceFiles() {
		switch {
		case otherFile == sourceFile, !ast.IsSourceFileJS(otherFile), program.IsSourceFileFromExternalLibrary(otherFile):
			continue
		case otherFile.CommonJSModuleIndicator != nil && otherFile.ExternalModuleIndicator == nil:
			return true
		case otherFile.ExternalModuleIndicator != nil && otherFile.CommonJSModuleIndicator == nil:
			return false
		}
	}

	// 6. Literally nothing to go on
	return true
}

/**
 * @param forceImportKeyword Indicates that the user has already typed `import`, so the result must start with `import`.
 * (In other words, do not allow `const x = require("...")` for JS files.)
 *
 * @internal
 */
func getImportKind(importingFile *ast.SourceFile /*| FutureSourceFile*/, exportKind ExportKind, program *compiler.Program, forceImportKeyword bool) ImportKind {
	if program.Options().VerbatimModuleSyntax.IsTrue() && program.GetEmitModuleFormatOfFile(importingFile) == core.ModuleKindCommonJS {
		// TODO: if the exporting file is ESM under nodenext, or `forceImport` is given in a JS file, this is impossible
		return ImportKindCommonJS
	}
	switch exportKind {
	case ExportKindNamed:
		return ImportKindNamed
	case ExportKindDefault:
		return ImportKindDefault
	case ExportKindExportEquals:
		return getExportEqualsImportKind(importingFile, program.Options(), forceImportKeyword)
	case ExportKindUMD:
		return getUmdImportKind(importingFile, program, forceImportKeyword)
	case ExportKindModule:
		return ImportKindNamespace
	}
	panic("unexpected export kind: " + exportKind.String())
}

func getExportEqualsImportKind(importingFile *ast.SourceFile /* | FutureSourceFile*/, compilerOptions *core.CompilerOptions, forceImportKeyword bool) ImportKind {
	allowSyntheticDefaults := compilerOptions.GetAllowSyntheticDefaultImports()
	isJS := tspath.HasJSFileExtension(importingFile.FileName())
	// 1. 'import =' will not work in es2015+ TS files, so the decision is between a default
	//    and a namespace import, based on allowSyntheticDefaultImports/esModuleInterop.
	if !isJS && compilerOptions.GetEmitModuleKind() >= core.ModuleKindES2015 {
		if allowSyntheticDefaults {
			return ImportKindDefault
		}
		return ImportKindNamespace
	}
	// 2. 'import =' will not work in JavaScript, so the decision is between a default import,
	//    a namespace import, and const/require.
	if isJS {
		if importingFile.ExternalModuleIndicator != nil || forceImportKeyword {
			if allowSyntheticDefaults {
				return ImportKindDefault
			}
			return ImportKindNamespace
		}
		return ImportKindCommonJS
	}
	// 3. At this point the most correct choice is probably 'import =', but people
	//    really hate that, so look to see if the importing file has any precedent
	//    on how to handle it.
	for _, statement := range importingFile.Statements.Nodes {
		// `import foo` parses as an ImportEqualsDeclaration even though it could be an ImportDeclaration
		if ast.IsImportEqualsDeclaration(statement) && !ast.NodeIsMissing(statement.AsImportEqualsDeclaration().ModuleReference) {
			return ImportKindCommonJS
		}
	}
	// 4. We have no precedent to go on, so just use a default import if
	//    allowSyntheticDefaultImports/esModuleInterop is enabled.
	if allowSyntheticDefaults {
		return ImportKindDefault
	}
	return ImportKindCommonJS
}

func getUmdImportKind(importingFile *ast.SourceFile /* | FutureSourceFile */, program *compiler.Program, forceImportKeyword bool) ImportKind {
	// Import a synthetic `default` if enabled.
	if program.Options().GetAllowSyntheticDefaultImports() {
		return ImportKindDefault
	}

	// When a synthetic `default` is unavailable, use `import..require` if the module kind supports it.
	moduleKind := program.Options().GetEmitModuleKind()
	switch moduleKind {
	case core.ModuleKindCommonJS:
		if tspath.HasJSFileExtension(importingFile.FileName()) && (importingFile.ExternalModuleIndicator != nil || forceImportKeyword) {
			return ImportKindNamespace
		}
		return ImportKindCommonJS
	case core.ModuleKindES2015, core.ModuleKindES2020, core.ModuleKindES2022, core.ModuleKindESNext, core.ModuleKindNone, core.ModuleKindPreserve:
		// Fall back to the `import * as ns` style import.
		return ImportKindNamespace
	case core.ModuleKindNode16, core.ModuleKindNode18, core.ModuleKindNodeNext:
		if program.GetImpliedNodeFormatForEmit(importingFile) == core.ModuleKindESNext {
			return ImportKindNamespace
		}
		return ImportKindCommonJS
	default:
		panic(`Unexpected moduleKind :` + moduleKind.String())
	}
}

/**
 * May call `cb` multiple times with the same name.
 * Terminates when `cb` returns a truthy value.
 */
func forEachNameOfDefaultExport(defaultExport *ast.Symbol, ch *checker.Checker, scriptTarget core.ScriptTarget, cb func(name string, capitalizedName string) string) string {
	var chain []*ast.Symbol
	current := defaultExport
	seen := collections.Set[*ast.Symbol]{}

	for current != nil {
		// The predecessor to this function also looked for a name on the `localSymbol`
		// of default exports, but I think `getDefaultLikeExportNameFromDeclaration`
		// accomplishes the same thing via syntax - no tests failed when I removed it.
		fromDeclaration := getDefaultLikeExportNameFromDeclaration(current)
		if fromDeclaration != "" {
			final := cb(fromDeclaration, "")
			if final != "" {
				return final
			}
		}

		if current.Name != ast.InternalSymbolNameDefault && current.Name != ast.InternalSymbolNameExportEquals {
			if final := cb(current.Name, ""); final != "" {
				return final
			}
		}

		chain = append(chain, current)
		if !seen.AddIfAbsent(current) {
			break
		}
		if current.Flags&ast.SymbolFlagsAlias != 0 {
			current = ch.GetImmediateAliasedSymbol(current)
		} else {
			current = nil
		}
	}

	for _, symbol := range chain {
		if symbol.Parent != nil && checker.IsExternalModuleSymbol(symbol.Parent) {
			final := cb(
				moduleSymbolToValidIdentifier(symbol.Parent, scriptTarget /*forceCapitalize*/, false),
				moduleSymbolToValidIdentifier(symbol.Parent, scriptTarget /*forceCapitalize*/, true),
			)
			if final != "" {
				return final
			}
		}
	}
	return ""
}

func getDefaultLikeExportNameFromDeclaration(symbol *ast.Symbol) string {
	for _, d := range symbol.Declarations {
		// "export default" in this case. See `ExportAssignment`for more details.
		if ast.IsExportAssignment(d) {
			if innerExpression := ast.SkipOuterExpressions(d.Expression(), ast.OEKAll); ast.IsIdentifier(innerExpression) {
				return innerExpression.Text()
			}
			continue
		}
		// "export { ~ as default }"
		if ast.IsExportSpecifier(d) && d.Symbol().Flags == ast.SymbolFlagsAlias && d.PropertyName() != nil {
			if d.PropertyName().Kind == ast.KindIdentifier {
				return d.PropertyName().Text()
			}
			continue
		}
		// GH#52694
		if name := ast.GetNameOfDeclaration(d); name != nil && name.Kind == ast.KindIdentifier {
			return name.Text()
		}
		if symbol.Parent != nil && !checker.IsExternalModuleSymbol(symbol.Parent) {
			return symbol.Parent.Name
		}
	}
	return ""
}

func forEachExternalModuleToImportFrom(
	ch *checker.Checker,
	program *compiler.Program,
	preferences *UserPreferences,
	// useAutoImportProvider bool,
	cb func(module *ast.Symbol, moduleFile *ast.SourceFile, checker *checker.Checker, isFromPackageJson bool),
) {
	// !!! excludePatterns
	// excludePatterns := preferences.autoImportFileExcludePatterns && getIsExcludedPatterns(preferences, useCaseSensitiveFileNames)

	forEachExternalModule(
		ch,
		program.GetSourceFiles(),
		// !!! excludePatterns,
		func(module *ast.Symbol, file *ast.SourceFile) {
			cb(module, file, ch, false)
		},
	)

	// !!! autoImportProvider
	// if  autoImportProvider := useAutoImportProvider && l.getPackageJsonAutoImportProvider(); autoImportProvider != nil {
	//     // start := timestamp();
	//     forEachExternalModule(autoImportProvider.getTypeChecker(), autoImportProvider.getSourceFiles(), excludePatterns, host, func (module *ast.Symbol, file *ast.SourceFile) {
	//         if (file && !program.getSourceFile(file.FileName()) || !file && !checker.resolveName(module.Name, /*location*/ nil, ast.SymbolFlagsModule, /*excludeGlobals*/ false)) {
	//             // The AutoImportProvider filters files already in the main program out of its *root* files,
	//             // but non-root files can still be present in both programs, and already in the export info map
	//             // at this point. This doesn't create any incorrect behavior, but is a waste of time and memory,
	//             // so we filter them out here.
	//             cb(module, file, autoImportProvide.checker, /*isFromPackageJson*/ true);
	//         }
	//     });
	//     // host.log?.(`forEachExternalModuleToImportFrom autoImportProvider: ${timestamp() - start}`);
	// }
}

func forEachExternalModule(
	ch *checker.Checker,
	allSourceFiles []*ast.SourceFile,
	// excludePatterns []RegExp,
	cb func(moduleSymbol *ast.Symbol, sourceFile *ast.SourceFile),
) {
	// !!! excludePatterns
	// isExcluded := excludePatterns && getIsExcluded(excludePatterns, host)

	for _, ambient := range ch.GetAmbientModules() {
		if !strings.Contains(ambient.Name, "*") /*  && !(excludePatterns && ambient.Declarations.every(func (d){ return isExcluded(d.getSourceFile())})) */ {
			cb(ambient, nil /*sourceFile*/)
		}
	}
	for _, sourceFile := range allSourceFiles {
		if ast.IsExternalOrCommonJSModule(sourceFile) /* && !isExcluded(sourceFile) */ {
			cb(ch.GetMergedSymbol(sourceFile.Symbol), sourceFile)
		}
	}
}

// ======================== generate code actions =======================

func (l *LanguageService) codeActionForFix(
	ctx context.Context,
	sourceFile *ast.SourceFile,
	symbolName string,
	fix *ImportFix,
	includeSymbolNameInDescription bool,
	preferences *UserPreferences,
) codeAction {
	tracker := l.newChangeTracker(ctx) // !!! changetracker.with
	diag := l.codeActionForFixWorker(tracker, sourceFile, symbolName, fix, includeSymbolNameInDescription, preferences)
	changes := tracker.getChanges()[sourceFile.FileName()]
	return codeAction{description: diag.Message(), changes: changes}
}

func (l *LanguageService) codeActionForFixWorker(
	changeTracker *changeTracker,
	sourceFile *ast.SourceFile,
	symbolName string,
	fix *ImportFix,
	includeSymbolNameInDescription bool,
	preferences *UserPreferences,
) *diagnostics.Message {
	switch fix.kind {
	case ImportFixKindUseNamespace:
		changeTracker.addNamespaceQualifier(sourceFile, fix.qualification())
		return diagnostics.FormatMessage(diagnostics.Change_0_to_1, symbolName, `${fix.namespacePrefix}.${symbolName}`)
	case ImportFixKindJsdocTypeImport:
		// !!! not implemented
		// changeTracker.addImportType(changeTracker, sourceFile, fix, quotePreference);
		// return diagnostics.FormatMessage(diagnostics.Change_0_to_1, symbolName, getImportTypePrefix(fix.moduleSpecifier, quotePreference) + symbolName);
	case ImportFixKindAddToExisting:
		changeTracker.doAddExistingFix(
			sourceFile,
			fix.importClauseOrBindingPattern,
			core.IfElse(fix.importKind == ImportKindDefault, &Import{name: symbolName, addAsTypeOnly: fix.addAsTypeOnly}, nil),
			core.IfElse(fix.importKind == ImportKindNamed, []*Import{{name: symbolName, addAsTypeOnly: fix.addAsTypeOnly}}, nil),
			// nil /*removeExistingImportSpecifiers*/,
			preferences,
		)
		moduleSpecifierWithoutQuotes := stringutil.StripQuotes(fix.moduleSpecifier)
		if includeSymbolNameInDescription {
			return diagnostics.FormatMessage(diagnostics.Import_0_from_1, symbolName, moduleSpecifierWithoutQuotes)
		}
		return diagnostics.FormatMessage(diagnostics.Update_import_from_0, moduleSpecifierWithoutQuotes)
	case ImportFixKindAddNew:
		var declarations []*ast.Statement
		defaultImport := core.IfElse(fix.importKind == ImportKindDefault, &Import{name: symbolName, addAsTypeOnly: fix.addAsTypeOnly}, nil)
		namedImports := core.IfElse(fix.importKind == ImportKindNamed, []*Import{{name: symbolName, addAsTypeOnly: fix.addAsTypeOnly}}, nil)
		var namespaceLikeImport *Import
		qualification := fix.qualification()
		if fix.importKind == ImportKindNamespace || fix.importKind == ImportKindCommonJS {
			namespaceLikeImport = &Import{kind: fix.importKind, addAsTypeOnly: fix.addAsTypeOnly, name: symbolName}
			if qualification != nil && qualification.namespacePrefix != "" {
				namespaceLikeImport.name = qualification.namespacePrefix
			}
		}

		if fix.useRequire {
			// !!! require
			// declarations = getNewRequires(fixAddNew.moduleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, l.GetProgram().Options(), preferences)
		} else {
			declarations = changeTracker.getNewImports(fix.moduleSpecifier, defaultImport, namedImports, namespaceLikeImport, l.GetProgram().Options(), preferences)
		}

		changeTracker.insertImports(
			sourceFile,
			declarations,
			/*blankLineBetween*/ true,
			preferences,
		)
		if qualification != nil {
			changeTracker.addNamespaceQualifier(sourceFile, qualification)
		}
		if includeSymbolNameInDescription {
			return diagnostics.FormatMessage(diagnostics.Import_0_from_1, symbolName, fix.moduleSpecifier)
		}
		return diagnostics.FormatMessage(diagnostics.Add_import_from_0, fix.moduleSpecifier)
	case ImportFixKindPromoteTypeOnly:
		// !!! type only
		// promotedDeclaration := promoteFromTypeOnly(changes, fix.typeOnlyAliasDeclaration, program, sourceFile, preferences);
		// if promotedDeclaration.Kind == ast.KindImportSpecifier {
		// return diagnostics.FormatMessage(diagnostics.Remove_type_from_import_of_0_from_1, symbolName, getModuleSpecifierText(promotedDeclaration.parent.parent))
		// }
		// return diagnostics.FormatMessage(diagnostics.Remove_type_from_import_declaration_from_0, getModuleSpecifierText(promotedDeclaration));
	default:
		panic(fmt.Sprintf(`Unexpected fix kind %v`, fix.kind))
	}
	return nil
}

func getModuleSpecifierText(promotedDeclaration *ast.ImportDeclaration) string {
	if promotedDeclaration.Kind == ast.KindImportEqualsDeclaration {
		importEqualsDeclaration := promotedDeclaration.AsImportEqualsDeclaration()
		if ast.IsExternalModuleReference(importEqualsDeclaration.ModuleReference) {
			expr := importEqualsDeclaration.ModuleReference.Expression()
			if expr != nil && expr.Kind == ast.KindStringLiteral {
				return expr.Text()
			}

		}
		return importEqualsDeclaration.ModuleReference.Text()
	}
	return promotedDeclaration.Parent.ModuleSpecifier().Text()
}
