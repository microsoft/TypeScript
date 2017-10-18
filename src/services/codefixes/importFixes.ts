/* @internal */
namespace ts.codefix {
    import ChangeTracker = textChanges.ChangeTracker;

    registerCodeFix({
        errorCodes: [
            Diagnostics.Cannot_find_name_0.code,
            Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
            Diagnostics.Cannot_find_namespace_0.code,
            Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code
        ],
        getCodeActions: getImportCodeActions
    });

    type ImportCodeActionKind = "CodeChange" | "InsertingIntoExistingImport" | "NewImport";
    // Map from module Id to an array of import declarations in that module.
    type ImportDeclarationMap = AnyImportSyntax[][];

    interface ImportCodeAction extends CodeAction {
        kind: ImportCodeActionKind;
        moduleSpecifier?: string;
    }

    interface SymbolContext extends textChanges.TextChangesContext {
        sourceFile: SourceFile;
        symbolName: string;
    }

    interface SymbolAndTokenContext extends SymbolContext {
        symbolToken: Node | undefined;
    }

    interface ImportCodeFixContext extends SymbolAndTokenContext {
        host: LanguageServiceHost;
        checker: TypeChecker;
        compilerOptions: CompilerOptions;
        getCanonicalFileName(fileName: string): string;
        cachedImportDeclarations?: ImportDeclarationMap;
    }

    export interface ImportCodeFixOptions extends ImportCodeFixContext {
        kind: ImportKind;
    }

    const enum ModuleSpecifierComparison {
        Better,
        Equal,
        Worse
    }

    class ImportCodeActionMap {
        private symbolIdToActionMap: ImportCodeAction[][] = [];

        addAction(symbolId: number, newAction: ImportCodeAction) {
            const actions = this.symbolIdToActionMap[symbolId];
            if (!actions) {
                this.symbolIdToActionMap[symbolId] = [newAction];
                return;
            }

            if (newAction.kind === "CodeChange") {
                actions.push(newAction);
                return;
            }

            const updatedNewImports: ImportCodeAction[] = [];
            for (const existingAction of this.symbolIdToActionMap[symbolId]) {
                if (existingAction.kind === "CodeChange") {
                    // only import actions should compare
                    updatedNewImports.push(existingAction);
                    continue;
                }

                switch (this.compareModuleSpecifiers(existingAction.moduleSpecifier, newAction.moduleSpecifier)) {
                    case ModuleSpecifierComparison.Better:
                        // the new one is not worth considering if it is a new import.
                        // However if it is instead a insertion into existing import, the user might want to use
                        // the module specifier even it is worse by our standards. So keep it.
                        if (newAction.kind === "NewImport") {
                            return;
                        }
                        // falls through
                    case ModuleSpecifierComparison.Equal:
                        // the current one is safe. But it is still possible that the new one is worse
                        // than another existing one. For example, you may have new imports from "./foo/bar"
                        // and "bar", when the new one is "bar/bar2" and the current one is "./foo/bar". The new
                        // one and the current one are not comparable (one relative path and one absolute path),
                        // but the new one is worse than the other one, so should not add to the list.
                        updatedNewImports.push(existingAction);
                        break;
                    case ModuleSpecifierComparison.Worse:
                        // the existing one is worse, remove from the list.
                        continue;
                }
            }
            // if we reach here, it means the new one is better or equal to all of the existing ones.
            updatedNewImports.push(newAction);
            this.symbolIdToActionMap[symbolId] = updatedNewImports;
        }

        addActions(symbolId: number, newActions: ImportCodeAction[]) {
            for (const newAction of newActions) {
                this.addAction(symbolId, newAction);
            }
        }

        getAllActions() {
            let result: ImportCodeAction[] = [];
            for (const key in this.symbolIdToActionMap) {
                result = concatenate(result, this.symbolIdToActionMap[key]);
            }
            return result;
        }

        private compareModuleSpecifiers(moduleSpecifier1: string, moduleSpecifier2: string): ModuleSpecifierComparison {
            if (moduleSpecifier1 === moduleSpecifier2) {
                return ModuleSpecifierComparison.Equal;
            }

            // if moduleSpecifier1 (ms1) is a substring of ms2, then it is better
            if (moduleSpecifier2.indexOf(moduleSpecifier1) === 0) {
                return ModuleSpecifierComparison.Better;
            }

            if (moduleSpecifier1.indexOf(moduleSpecifier2) === 0) {
                return ModuleSpecifierComparison.Worse;
            }

            // if both are relative paths, and ms1 has fewer levels, then it is better
            if (isExternalModuleNameRelative(moduleSpecifier1) && isExternalModuleNameRelative(moduleSpecifier2)) {
                const regex = new RegExp(directorySeparator, "g");
                const moduleSpecifier1LevelCount = (moduleSpecifier1.match(regex) || []).length;
                const moduleSpecifier2LevelCount = (moduleSpecifier2.match(regex) || []).length;

                return moduleSpecifier1LevelCount < moduleSpecifier2LevelCount
                    ? ModuleSpecifierComparison.Better
                    : moduleSpecifier1LevelCount === moduleSpecifier2LevelCount
                        ? ModuleSpecifierComparison.Equal
                        : ModuleSpecifierComparison.Worse;
            }

            // the equal cases include when the two specifiers are not comparable.
            return ModuleSpecifierComparison.Equal;
        }
    }

    function createCodeAction(
        description: DiagnosticMessage,
        diagnosticArgs: string[],
        changes: FileTextChanges[],
        kind: ImportCodeActionKind,
        moduleSpecifier: string | undefined,
    ): ImportCodeAction {
        return {
            description: formatMessage.apply(undefined, [undefined, description].concat(<any[]>diagnosticArgs)),
            changes,
            kind,
            moduleSpecifier
        };
    }

    function convertToImportCodeFixContext(context: CodeFixContext): ImportCodeFixContext {
        const useCaseSensitiveFileNames = context.host.useCaseSensitiveFileNames ? context.host.useCaseSensitiveFileNames() : false;
        const checker = context.program.getTypeChecker();
        const symbolToken = getTokenAtPosition(context.sourceFile, context.span.start, /*includeJsDocComment*/ false);
        return {
            host: context.host,
            newLineCharacter: context.newLineCharacter,
            rulesProvider: context.rulesProvider,
            sourceFile: context.sourceFile,
            checker,
            compilerOptions: context.program.getCompilerOptions(),
            cachedImportDeclarations: [],
            getCanonicalFileName: createGetCanonicalFileName(useCaseSensitiveFileNames),
            symbolName: symbolToken.getText(),
            symbolToken,
        };
    }

    export const enum ImportKind {
        Named,
        Default,
        Namespace,
    }

    export function getCodeActionForImport(moduleSymbol: Symbol, context: ImportCodeFixOptions): ImportCodeAction[] {
        const declarations = getImportDeclarations(moduleSymbol, context.checker, context.sourceFile, context.cachedImportDeclarations);
        const actions: ImportCodeAction[] = [];
        if (context.symbolToken) {
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
            for (const declaration of declarations) {
                const namespace = getNamespaceImportName(declaration);
                if (namespace) {
                    actions.push(getCodeActionForUseExistingNamespaceImport(namespace.text, context, context.symbolToken));
                }
            }
        }
        actions.push(getCodeActionForAddImport(moduleSymbol, context, declarations));
        return actions;
    }

    function getNamespaceImportName(declaration: AnyImportSyntax): Identifier {
        if (declaration.kind === SyntaxKind.ImportDeclaration) {
            const namedBindings = declaration.importClause && declaration.importClause.namedBindings;
            return namedBindings && namedBindings.kind === SyntaxKind.NamespaceImport ? namedBindings.name : undefined;
        }
        else {
            return declaration.name;
        }
    }

    // TODO(anhans): This doesn't seem important to cache... just use an iterator instead of creating a new array?
    function getImportDeclarations(moduleSymbol: Symbol, checker: TypeChecker, { imports }: SourceFile, cachedImportDeclarations: ImportDeclarationMap = []): ReadonlyArray<AnyImportSyntax> {
        const moduleSymbolId = getUniqueSymbolId(moduleSymbol, checker);
        let cached = cachedImportDeclarations[moduleSymbolId];
        if (!cached) {
            cached = cachedImportDeclarations[moduleSymbolId] = mapDefined(imports, importModuleSpecifier =>
                checker.getSymbolAtLocation(importModuleSpecifier) === moduleSymbol ? getImportDeclaration(importModuleSpecifier) : undefined);
        }
        return cached;
    }

    function getImportDeclaration({ parent }: LiteralExpression): AnyImportSyntax | undefined {
        switch (parent.kind) {
            case SyntaxKind.ImportDeclaration:
                return parent as ImportDeclaration;
            case SyntaxKind.ExternalModuleReference:
                return (parent as ExternalModuleReference).parent;
            default:
                Debug.assert(parent.kind === SyntaxKind.ExportDeclaration);
                // Ignore these, can't add imports to them.
                return undefined;
        }
    }

    function getCodeActionForNewImport(context: SymbolContext & { kind: ImportKind }, moduleSpecifier: string): ImportCodeAction {
        const { kind, sourceFile, newLineCharacter, symbolName } = context;
        const lastImportDeclaration = findLast(sourceFile.statements, isAnyImportSyntax);

        const moduleSpecifierWithoutQuotes = stripQuotes(moduleSpecifier);
        const importDecl = createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createImportClauseOfKind(kind, symbolName), createStringLiteralWithQuoteStyle(sourceFile, moduleSpecifierWithoutQuotes));
        const changes = ChangeTracker.with(context, changeTracker => {
            if (lastImportDeclaration) {
                changeTracker.insertNodeAfter(sourceFile, lastImportDeclaration, importDecl, { suffix: newLineCharacter });
            }
            else {
                changeTracker.insertNodeAt(sourceFile, getSourceFileImportLocation(sourceFile), importDecl, { suffix: `${newLineCharacter}${newLineCharacter}` });
            }
        });

        // if this file doesn't have any import statements, insert an import statement and then insert a new line
        // between the only import statement and user code. Otherwise just insert the statement because chances
        // are there are already a new line seperating code and import statements.
        return createCodeAction(
            Diagnostics.Import_0_from_1,
            [symbolName, moduleSpecifierWithoutQuotes],
            changes,
            "NewImport",
            moduleSpecifierWithoutQuotes,
        );
    }

    function createStringLiteralWithQuoteStyle(sourceFile: SourceFile, text: string): StringLiteral {
        const literal = createLiteral(text);
        const firstModuleSpecifier = firstOrUndefined(sourceFile.imports);
        literal.singleQuote = !!firstModuleSpecifier && !isStringDoubleQuoted(firstModuleSpecifier, sourceFile);
        return literal;
    }

    function createImportClauseOfKind(kind: ImportKind, symbolName: string) {
        switch (kind) {
            case ImportKind.Default:
                return createImportClause(createIdentifier(symbolName), /*namedBindings*/ undefined);
            case ImportKind.Namespace:
                return createImportClause(/*name*/ undefined, createNamespaceImport(createIdentifier(symbolName)));
            case ImportKind.Named:
                return createImportClause(/*name*/ undefined, createNamedImports([createImportSpecifier(/*propertyName*/ undefined, createIdentifier(symbolName))]));
            default:
                Debug.assertNever(kind);
        }
    }

    function getModuleSpecifierForNewImport(sourceFile: SourceFile, moduleSymbol: Symbol, options: CompilerOptions, getCanonicalFileName: (file: string) => string, host: LanguageServiceHost): string | undefined {
        const moduleFileName = moduleSymbol.valueDeclaration.getSourceFile().fileName;
        const sourceDirectory = getDirectoryPath(sourceFile.fileName);

        return tryGetModuleNameFromAmbientModule(moduleSymbol) ||
            tryGetModuleNameFromTypeRoots(options, host, getCanonicalFileName, moduleFileName) ||
            tryGetModuleNameAsNodeModule(options, moduleFileName, host, getCanonicalFileName, sourceDirectory) ||
            tryGetModuleNameFromBaseUrl(options, moduleFileName, getCanonicalFileName) ||
            options.rootDirs && tryGetModuleNameFromRootDirs(options.rootDirs, moduleFileName, sourceDirectory, getCanonicalFileName) ||
            removeFileExtension(getRelativePath(moduleFileName, sourceDirectory, getCanonicalFileName));
    }

    function tryGetModuleNameFromAmbientModule(moduleSymbol: Symbol): string | undefined {
        const decl = moduleSymbol.valueDeclaration;
        if (isModuleDeclaration(decl) && isStringLiteral(decl.name)) {
            return decl.name.text;
        }
    }

    function tryGetModuleNameFromBaseUrl(options: CompilerOptions, moduleFileName: string, getCanonicalFileName: (file: string) => string): string | undefined {
        if (!options.baseUrl) {
            return undefined;
        }

        let relativeName = getRelativePathIfInDirectory(moduleFileName, options.baseUrl, getCanonicalFileName);
        if (!relativeName) {
            return undefined;
        }

        const relativeNameWithIndex = removeFileExtension(relativeName);
        relativeName = removeExtensionAndIndexPostFix(relativeName);

        if (options.paths) {
            for (const key in options.paths) {
                for (const pattern of options.paths[key]) {
                    const indexOfStar = pattern.indexOf("*");
                    if (indexOfStar === 0 && pattern.length === 1) {
                        continue;
                    }
                    else if (indexOfStar !== -1) {
                        const prefix = pattern.substr(0, indexOfStar);
                        const suffix = pattern.substr(indexOfStar + 1);
                        if (relativeName.length >= prefix.length + suffix.length &&
                            startsWith(relativeName, prefix) &&
                            endsWith(relativeName, suffix)) {
                            const matchedStar = relativeName.substr(prefix.length, relativeName.length - suffix.length);
                            return key.replace("\*", matchedStar);
                        }
                    }
                    else if (pattern === relativeName || pattern === relativeNameWithIndex) {
                        return key;
                    }
                }
            }
        }

        return relativeName;
    }

    function tryGetModuleNameFromRootDirs(rootDirs: ReadonlyArray<string>, moduleFileName: string, sourceDirectory: string, getCanonicalFileName: (file: string) => string): string | undefined {
        const normalizedTargetPath = getPathRelativeToRootDirs(moduleFileName, rootDirs, getCanonicalFileName);
        if (normalizedTargetPath === undefined) {
            return undefined;
        }

        const normalizedSourcePath = getPathRelativeToRootDirs(sourceDirectory, rootDirs, getCanonicalFileName);
        const relativePath = normalizedSourcePath !== undefined ? getRelativePath(normalizedTargetPath, normalizedSourcePath, getCanonicalFileName) : normalizedTargetPath;
        return removeFileExtension(relativePath);
    }

    function tryGetModuleNameFromTypeRoots(
        options: CompilerOptions,
        host: GetEffectiveTypeRootsHost,
        getCanonicalFileName: (file: string) => string,
        moduleFileName: string,
    ): string | undefined {
        const roots = getEffectiveTypeRoots(options, host);
        return roots && firstDefined(roots, unNormalizedTypeRoot => {
            const typeRoot = toPath(unNormalizedTypeRoot, /*basePath*/ undefined, getCanonicalFileName);
            if (startsWith(moduleFileName, typeRoot)) {
                return removeExtensionAndIndexPostFix(moduleFileName.substring(typeRoot.length + 1));
            }
        });
    }

    function tryGetModuleNameAsNodeModule(
        options: CompilerOptions,
        moduleFileName: string,
        host: LanguageServiceHost,
        getCanonicalFileName: (file: string) => string,
        sourceDirectory: string,
    ): string | undefined {
        if (getEmitModuleResolutionKind(options) !== ModuleResolutionKind.NodeJs) {
            // nothing to do here
            return undefined;
        }

        const parts = getNodeModulePathParts(moduleFileName);

        if (!parts) {
            return undefined;
        }

        // Simplify the full file path to something that can be resolved by Node.

        // If the module could be imported by a directory name, use that directory's name
        let moduleSpecifier = getDirectoryOrExtensionlessFileName(moduleFileName);
        // Get a path that's relative to node_modules or the importing file's path
        moduleSpecifier = getNodeResolvablePath(moduleSpecifier);
        // If the module was found in @types, get the actual Node package name
        return getPackageNameFromAtTypesDirectory(moduleSpecifier);

        function getDirectoryOrExtensionlessFileName(path: string): string {
            // If the file is the main module, it can be imported by the package name
            const packageRootPath = path.substring(0, parts.packageRootIndex);
            const packageJsonPath = combinePaths(packageRootPath, "package.json");
            if (host.fileExists(packageJsonPath)) {
                const packageJsonContent = JSON.parse(host.readFile(packageJsonPath));
                if (packageJsonContent) {
                    const mainFileRelative = packageJsonContent.typings || packageJsonContent.types || packageJsonContent.main;
                    if (mainFileRelative) {
                        const mainExportFile = toPath(mainFileRelative, packageRootPath, getCanonicalFileName);
                        if (mainExportFile === getCanonicalFileName(path)) {
                            return packageRootPath;
                        }
                    }
                }
            }

            // We still have a file name - remove the extension
            const fullModulePathWithoutExtension = removeFileExtension(path);

            // If the file is /index, it can be imported by its directory name
            if (getCanonicalFileName(fullModulePathWithoutExtension.substring(parts.fileNameIndex)) === "/index") {
                return fullModulePathWithoutExtension.substring(0, parts.fileNameIndex);
            }

            return fullModulePathWithoutExtension;
        }

        function getNodeResolvablePath(path: string): string {
            const basePath = path.substring(0, parts.topLevelNodeModulesIndex);
            if (sourceDirectory.indexOf(basePath) === 0) {
                // if node_modules folder is in this folder or any of its parent folders, no need to keep it.
                return path.substring(parts.topLevelPackageNameIndex + 1);
            }
            else {
                return getRelativePath(path, sourceDirectory, getCanonicalFileName);
            }
        }
    }

    function getNodeModulePathParts(fullPath: string) {
        // If fullPath can't be valid module file within node_modules, returns undefined.
        // Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
        // Returns indices:                       ^            ^                                                      ^             ^

        let topLevelNodeModulesIndex = 0;
        let topLevelPackageNameIndex = 0;
        let packageRootIndex = 0;
        let fileNameIndex = 0;

        const enum States {
            BeforeNodeModules,
            NodeModules,
            Scope,
            PackageContent
        }

        let partStart = 0;
        let partEnd = 0;
        let state = States.BeforeNodeModules;

        while (partEnd >= 0) {
            partStart = partEnd;
            partEnd = fullPath.indexOf("/", partStart + 1);
            switch (state) {
                case States.BeforeNodeModules:
                    if (fullPath.indexOf("/node_modules/", partStart) === partStart) {
                        topLevelNodeModulesIndex = partStart;
                        topLevelPackageNameIndex = partEnd;
                        state = States.NodeModules;
                    }
                    break;
                case States.NodeModules:
                case States.Scope:
                    if (state === States.NodeModules && fullPath.charAt(partStart + 1) === "@") {
                        state = States.Scope;
                    }
                    else {
                        packageRootIndex = partEnd;
                        state = States.PackageContent;
                    }
                    break;
                case States.PackageContent:
                    if (fullPath.indexOf("/node_modules/", partStart) === partStart) {
                        state = States.NodeModules;
                    }
                    else {
                        state = States.PackageContent;
                    }
                    break;
            }
        }

        fileNameIndex = partStart;

        return state > States.NodeModules ? { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex } : undefined;
    }

    function getPathRelativeToRootDirs(path: string, rootDirs: ReadonlyArray<string>, getCanonicalFileName: (fileName: string) => string): string | undefined {
        return firstDefined(rootDirs, rootDir => getRelativePathIfInDirectory(path, rootDir, getCanonicalFileName));
    }

    function removeExtensionAndIndexPostFix(fileName: string) {
        fileName = removeFileExtension(fileName);
        if (endsWith(fileName, "/index")) {
            fileName = fileName.substr(0, fileName.length - 6/* "/index".length */);
        }
        return fileName;
    }

    function getRelativePathIfInDirectory(path: string, directoryPath: string, getCanonicalFileName: (fileName: string) => string): string | undefined {
        const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, directoryPath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        return isRootedDiskPath(relativePath) || startsWith(relativePath, "..") ? undefined : relativePath;
    }

    function getRelativePath(path: string, directoryPath: string, getCanonicalFileName: (fileName: string) => string) {
        const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, directoryPath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        return !pathIsRelative(relativePath) ? "./" + relativePath : relativePath;
    }

    function getCodeActionForAddImport(
        moduleSymbol: Symbol,
        ctx: ImportCodeFixOptions,
        declarations: ReadonlyArray<AnyImportSyntax>): ImportCodeAction {
        const fromExistingImport = firstDefined(declarations, declaration => {
            if (declaration.kind === SyntaxKind.ImportDeclaration && declaration.importClause) {
                const changes = tryUpdateExistingImport(ctx, ctx.kind, declaration.importClause);
                if (changes) {
                    const moduleSpecifierWithoutQuotes = stripQuotes(declaration.moduleSpecifier.getText());
                    return createCodeAction(
                        Diagnostics.Add_0_to_existing_import_declaration_from_1,
                        [ctx.symbolName, moduleSpecifierWithoutQuotes],
                        changes,
                        "InsertingIntoExistingImport",
                        moduleSpecifierWithoutQuotes);
                }
            }
        });
        if (fromExistingImport) {
            return fromExistingImport;
        }

        const moduleSpecifier = firstDefined(declarations, moduleSpecifierFromAnyImport)
            || getModuleSpecifierForNewImport(ctx.sourceFile, moduleSymbol, ctx.compilerOptions, ctx.getCanonicalFileName, ctx.host);
        return getCodeActionForNewImport(ctx, moduleSpecifier);
    }

    function moduleSpecifierFromAnyImport(node: AnyImportSyntax): string | undefined {
        const expression = node.kind === SyntaxKind.ImportDeclaration
            ? node.moduleSpecifier
            : node.moduleReference.kind === SyntaxKind.ExternalModuleReference
                ? node.moduleReference.expression
                : undefined;
        return expression && isStringLiteral(expression) ? expression.text : undefined;
    }

    function tryUpdateExistingImport(context: SymbolContext, kind: ImportKind, importClause: ImportClause): FileTextChanges[] | undefined {
        const { symbolName, sourceFile } = context;
        const { name, namedBindings } = importClause;
        switch (kind) {
            case ImportKind.Default:
                return name ? undefined : ChangeTracker.with(context, t =>
                    t.replaceNode(sourceFile, importClause, createImportClause(createIdentifier(symbolName), namedBindings)));

            case ImportKind.Named: {
                const newImportSpecifier = createImportSpecifier(/*propertyName*/ undefined, createIdentifier(symbolName));
                if (namedBindings && namedBindings.kind === SyntaxKind.NamedImports && namedBindings.elements.length !== 0) {
                    // There are already named imports; add another.
                    return ChangeTracker.with(context, t => t.insertNodeInListAfter(
                        sourceFile,
                        namedBindings.elements[namedBindings.elements.length - 1],
                        newImportSpecifier));
                }
                if (!namedBindings || namedBindings.kind === SyntaxKind.NamedImports && namedBindings.elements.length === 0) {
                    return ChangeTracker.with(context, t =>
                        t.replaceNode(sourceFile, importClause, createImportClause(name, createNamedImports([newImportSpecifier]))));
                }
                return undefined;
            }

            case ImportKind.Namespace:
                return namedBindings ? undefined : ChangeTracker.with(context, t =>
                    t.replaceNode(sourceFile, importClause, createImportClause(name, createNamespaceImport(createIdentifier(symbolName)))));

            default:
                Debug.assertNever(kind);
        }
    }

    function getCodeActionForUseExistingNamespaceImport(namespacePrefix: string, context: SymbolContext, symbolToken: Node): ImportCodeAction {
        const { symbolName, sourceFile } = context;

        /**
         * Cases:
         *     import * as ns from "mod"
         *     import default, * as ns from "mod"
         *     import ns = require("mod")
         *
         * Because there is no import list, we alter the reference to include the
         * namespace instead of altering the import declaration. For example, "foo" would
         * become "ns.foo"
         */
        return createCodeAction(
            Diagnostics.Change_0_to_1,
            [symbolName, `${namespacePrefix}.${symbolName}`],
            ChangeTracker.with(context, tracker =>
                tracker.replaceNode(sourceFile, symbolToken, createPropertyAccess(createIdentifier(namespacePrefix), symbolName))),
            "CodeChange",
            /*moduleSpecifier*/ undefined);
    }

    function getImportCodeActions(context: CodeFixContext): ImportCodeAction[] {
        const importFixContext = convertToImportCodeFixContext(context);
        return context.errorCode === Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code
            ? getActionsForUMDImport(importFixContext)
            : getActionsForNonUMDImport(importFixContext, context.program.getSourceFiles(), context.cancellationToken);
    }

    function getActionsForUMDImport(context: ImportCodeFixContext): ImportCodeAction[] {
        const { checker, symbolToken } = context;
        const umdSymbol = checker.getSymbolAtLocation(symbolToken);
        let symbol: ts.Symbol;
        let symbolName: string;
        if (umdSymbol.flags & ts.SymbolFlags.Alias) {
            symbol = checker.getAliasedSymbol(umdSymbol);
            symbolName = context.symbolName;
        }
        else if (isJsxOpeningLikeElement(symbolToken.parent) && symbolToken.parent.tagName === symbolToken) {
            // The error wasn't for the symbolAtLocation, it was for the JSX tag itself, which needs access to e.g. `React`.
            symbol = checker.getAliasedSymbol(checker.resolveName(checker.getJsxNamespace(), symbolToken.parent.tagName, SymbolFlags.Value));
            symbolName = symbol.name;
        }
        else {
            Debug.fail("Either the symbol or the JSX namespace should be a UMD global if we got here");
        }

        return getCodeActionForImport(symbol, { ...context, symbolName, kind: ImportKind.Namespace });
    }

    function getActionsForNonUMDImport(context: ImportCodeFixContext, allSourceFiles: ReadonlyArray<SourceFile>, cancellationToken: CancellationToken): ImportCodeAction[] {
        const { sourceFile, checker, symbolName, symbolToken } = context;
        // "default" is a keyword and not a legal identifier for the import, so we don't expect it here
        Debug.assert(symbolName !== "default");
        const symbolIdActionMap = new ImportCodeActionMap();
        const currentTokenMeaning = getMeaningFromLocation(symbolToken);

        forEachExternalModule(checker, allSourceFiles, moduleSymbol => {
            if (moduleSymbol === sourceFile.symbol) {
                return;
            }

            cancellationToken.throwIfCancellationRequested();
            // check the default export
            const defaultExport = checker.tryGetMemberInModuleExports("default", moduleSymbol);
            if (defaultExport) {
                const localSymbol = getLocalSymbolForExportDefault(defaultExport);
                if (localSymbol && localSymbol.escapedName === symbolName && checkSymbolHasMeaning(localSymbol, currentTokenMeaning)) {
                    // check if this symbol is already used
                    const symbolId = getUniqueSymbolId(localSymbol, checker);
                    symbolIdActionMap.addActions(symbolId, getCodeActionForImport(moduleSymbol, { ...context, kind: ImportKind.Default }));
                }
            }

            // check exports with the same name
            const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol);
            if (exportSymbolWithIdenticalName && checkSymbolHasMeaning(exportSymbolWithIdenticalName, currentTokenMeaning)) {
                const symbolId = getUniqueSymbolId(exportSymbolWithIdenticalName, checker);
                symbolIdActionMap.addActions(symbolId, getCodeActionForImport(moduleSymbol, { ...context, kind: ImportKind.Named }));
            }
        });

        return symbolIdActionMap.getAllActions();
    }

    function checkSymbolHasMeaning({ declarations }: Symbol, meaning: SemanticMeaning): boolean {
        return some(declarations, decl => !!(getMeaningFromDeclaration(decl) & meaning));
    }

    export function forEachExternalModule(checker: TypeChecker, allSourceFiles: ReadonlyArray<SourceFile>, cb: (module: Symbol) => void) {
        for (const ambient of checker.getAmbientModules()) {
            cb(ambient);
        }
        for (const sourceFile of allSourceFiles) {
            if (isExternalOrCommonJsModule(sourceFile)) {
                cb(sourceFile.symbol);
            }
        }
    }
}
