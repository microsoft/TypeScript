/* @internal */
namespace ts.codefix {

    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_find_name_0.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const checker = context.program.getTypeChecker();
            const allSourceFiles = context.program.getSourceFiles();
            const useCaseSensitiveFileNames = context.host.useCaseSensitiveFileNames ? context.host.useCaseSensitiveFileNames() : false;

            const token = getTokenAtPosition(sourceFile, context.span.start);
            const name = token.getText();
            const allActions: CodeAction[] = [];

            const allPotentialModules = checker.getAmbientModules();
            for (const otherSourceFile of allSourceFiles) {
                if (otherSourceFile !== sourceFile && otherSourceFile.symbol) {
                    allPotentialModules.push(otherSourceFile.symbol);
                }
            }

            for (const moduleSymbol of allPotentialModules) {
                context.cancellationToken.throwIfCancellationRequested();

                const moduleExports = checker.getExportsOfModule(moduleSymbol);
                if (!moduleExports) {
                    continue;
                }

                const currentTokenMeaning = getMeaningFromLocation(token);

                // check the default export
                const defaultExport = moduleExports["default"];
                if (defaultExport) {
                    const localSymbol = getLocalSymbolForExportDefault(defaultExport);
                    if (localSymbol && localSymbol.name === name && checkSymbolHasMeaning(localSymbol, currentTokenMeaning)) {
                        allActions.push(getCodeActionForImport(moduleSymbol, /*isDefaultExport*/ true));
                    }
                }

                // check exports with the same name
                if (name in moduleExports) {
                    if (checkSymbolHasMeaning(moduleExports[name], currentTokenMeaning)) {
                        allActions.push(getCodeActionForImport(moduleSymbol));
                    }
                }
            }

            return allActions;

            function checkSymbolHasMeaning(symbol: Symbol, meaning: SemanticMeaning) {
                const declarations = symbol.getDeclarations();
                return declarations ? some(symbol.declarations, decl => !!(getMeaningFromDeclaration(decl) & meaning)) : false;
            }

            function getCodeActionForImport(moduleSymbol: Symbol, isDefaultExport?: boolean): CodeAction {
                // Check to see if there are already imports being made from this source in the current file
                const existingDeclaration = forEach(sourceFile.imports, importModuleSpecifier => {
                    const importSymbol = checker.getSymbolAtLocation(importModuleSpecifier);
                    if (importSymbol === moduleSymbol) {
                        return getImportDeclaration(importModuleSpecifier);
                    }
                });

                if (existingDeclaration) {
                    return getCodeActionForExistingImport(existingDeclaration);
                }
                else {
                    return getCodeActionForNewImport();
                }

                function getImportDeclaration(moduleSpecifier: LiteralExpression) {
                    let node: Node = moduleSpecifier;
                    while (node) {
                        if (node.kind === SyntaxKind.ImportDeclaration) {
                            return <ImportDeclaration>node;
                        }
                        if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
                            return <ImportEqualsDeclaration>node;
                        }
                        node = node.parent;
                    }
                    return undefined;
                }

                function getCodeActionForExistingImport(declaration: ImportDeclaration | ImportEqualsDeclaration): CodeAction {
                    let namespacePrefix: string;
                    let moduleSpecifier: string;
                    if (declaration.kind === SyntaxKind.ImportDeclaration) {
                        const namedBindings = declaration.importClause && declaration.importClause.namedBindings;
                        if (namedBindings && namedBindings.kind === SyntaxKind.NamespaceImport) {
                            namespacePrefix = (<NamespaceImport>namedBindings).name.getText();
                        }

                        moduleSpecifier = declaration.moduleSpecifier.getText();
                    }
                    else {
                        namespacePrefix = declaration.name.getText();
                        moduleSpecifier = declaration.moduleReference.getText();
                    }

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
                    if (namespacePrefix) {
                        return createCodeAction(
                            Diagnostics.Change_0_to_1,
                            [name, `${namespacePrefix}.${name}`],
                            `${namespacePrefix}.`,
                            { start: token.getStart(), length: 0 },
                            sourceFile.fileName
                        );
                    }
                    return getCodeActionForNewImport(moduleSpecifier, declaration.getEnd());
                }

                function getCodeActionForNewImport(moduleSpecifier?: string, insertPos?: number): CodeAction {
                    // if not specified an insert position, try to insert after any existing imports
                    if (!insertPos) {
                        let lastModuleSpecifierEnd = -1;
                        for (const moduleSpecifier of sourceFile.imports) {
                            const end = moduleSpecifier.getEnd();
                            if (!lastModuleSpecifierEnd || end > lastModuleSpecifierEnd) {
                                lastModuleSpecifierEnd = end;
                            }
                        }
                        insertPos = lastModuleSpecifierEnd > 0 ? lastModuleSpecifierEnd + 1 : sourceFile.getStart();
                    }

                    const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
                    moduleSpecifier = stripQuotes(moduleSpecifier || getModuleSpecifierForNewImport());
                    const prefixNewLine = insertPos === sourceFile.getStart() ? "" : context.newLineCharacter;
                    const importStatementText = isDefaultExport
                        ? `import ${name} from "${moduleSpecifier}"`
                        : `import { ${name} } from "${moduleSpecifier}"`;

                    return createCodeAction(
                        Diagnostics.Import_0_from_1,
                        [name, `"${moduleSpecifier}"`],
                        `${prefixNewLine}${importStatementText};`,
                        { start: insertPos, length: 0 },
                        sourceFile.fileName
                    );

                    function getModuleSpecifierForNewImport() {
                        const fileName = normalizeFileName(sourceFile.fileName);
                        const moduleFileName = normalizeFileName(moduleSymbol.valueDeclaration.getSourceFile().fileName);
                        const sourceDirectory = getDirectoryPath(fileName);
                        const options = context.program.getCompilerOptions();

                        return tryGetModuleNameFromAmbientModule() ||
                            tryGetModuleNameFromExistingUses() ||
                            tryGetModuleNameFromBaseUrl() ||
                            tryGetModuleNameFromRootDirs() ||
                            tryGetModuleNameFromTypeRoots() ||
                            tryGetModuleNameAsNodeModule() ||
                            removeFileExtension(getRelativePath(moduleFileName, sourceDirectory));

                        function normalizeFileName(fileName: string) {
                            return getCanonicalFileName(normalizeSlashes(fileName));
                        }

                        function tryGetModuleNameFromAmbientModule(): string {
                            if (moduleSymbol.valueDeclaration.kind !== SyntaxKind.SourceFile) {
                                return moduleSymbol.name;
                            }
                        }

                        function tryGetModuleNameFromExistingUses(): string {
                            for (const file of context.program.getSourceFiles()) {
                                if (file === sourceFile || !file.resolvedModules) {
                                    continue;
                                }

                                for (const moduleName in file.resolvedModules) {
                                    if (!moduleHasNonRelativeName(moduleName)) {
                                        continue;
                                    }

                                    const resolvedModule = file.resolvedModules[moduleName];
                                    if (resolvedModule && resolvedModule.resolvedFileName && normalizeFileName(resolvedModule.resolvedFileName) === moduleFileName) {
                                        return moduleName;
                                    }
                                }
                            }
                        }

                        function tryGetModuleNameFromBaseUrl() {
                            if (!options.baseUrl) {
                                return undefined;
                            }

                            let relativeName = tryRemoveParentDirectoryName(moduleFileName, options.baseUrl);
                            if (!relativeName) {
                                return undefined;
                            }

                            relativeName = removeFileExtension(relativeName);

                            if (options.paths) {
                                // TODO: handle longest match support
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
                                        else if (pattern === relativeName) {
                                            return key;
                                        }
                                    }
                                }
                            }

                            return relativeName;
                        }

                        function tryGetModuleNameFromRootDirs() {
                            if (options.rootDirs) {
                                const normalizedTargetPath = getPathRelativeToRootDirs(moduleFileName, options.rootDirs);
                                const normalizedSourcePath = getPathRelativeToRootDirs(sourceDirectory, options.rootDirs);
                                if (normalizedTargetPath !== undefined) {
                                    const relativePath = normalizedSourcePath !== undefined ? getRelativePath(normalizedTargetPath, normalizedSourcePath) : normalizedTargetPath;
                                    return removeFileExtension(relativePath);
                                }
                            }
                            return undefined;
                        }

                        function tryGetModuleNameFromTypeRoots() {
                            const typesRoots = getEffectiveTypeRoots(options, context.host);
                            for (const typeRoot of typesRoots) {
                                if (startsWith(moduleFileName, typeRoot)) {
                                    let relativeFileName = moduleFileName.substring(typeRoot.length + 1);
                                    relativeFileName = removeFileExtension(relativeFileName);

                                    if (endsWith(relativeFileName, "/index")) {
                                        relativeFileName = relativeFileName.substr(0, relativeFileName.length - 6/* "/index".length */);
                                    }

                                    return relativeFileName;
                                }
                            }
                        }

                        function tryGetModuleNameAsNodeModule() {
                            if (getEmitModuleResolutionKind(options) !== ModuleResolutionKind.NodeJs) {
                                // nothing to do here
                                return undefined;
                            }

                            const indexOfNodeModules = moduleFileName.indexOf("node_modules");
                            if (indexOfNodeModules < 0) {
                                return undefined;
                            }

                            let relativeFileName: string;
                            if (sourceDirectory.indexOf(moduleFileName.substring(0, indexOfNodeModules - 1)) === 0) {
                                // if node_modules folder is in this folder or any of its parent folder, no need to keep it.
                                relativeFileName = moduleFileName.substring(indexOfNodeModules + 13 /* "node_modules\".length */);
                            }
                            else {
                                relativeFileName = getRelativePath(moduleFileName, sourceDirectory);
                            }

                            relativeFileName = removeFileExtension(relativeFileName);

                            if(startsWith(relativeFileName, "@types/")) {
                                relativeFileName = relativeFileName.substr(7 /*"@types/.length"*/);
                            }

                            if (endsWith(relativeFileName, "/index")) {
                                relativeFileName = getDirectoryPath(relativeFileName);
                            }
                            else {
                                try {
                                    const moduleDirectory = getDirectoryPath(moduleFileName);
                                    const packageJsonContent = JSON.parse(context.host.readFile(combinePaths(moduleDirectory, "package.json")));
                                    if (packageJsonContent && packageJsonContent.main) {
                                        const mainExportFile = isRootedDiskPath(packageJsonContent.main) 
                                            ? normalizeFileName(packageJsonContent.main)
                                            : getCanonicalFileName(normalizePath(combinePaths(moduleDirectory, packageJsonContent.main)));
                                        if (removeFileExtension(mainExportFile) === removeFileExtension(moduleFileName)) {
                                            relativeFileName = getDirectoryPath(relativeFileName);
                                        }
                                    }
                                }
                                catch(e) { }
                            }

                            return relativeFileName;
                        }
                    }

                    function getPathRelativeToRootDirs(fileName: string, rootDirs: string[]) {
                        for (const rootDir of rootDirs) {
                            const relativeName = tryRemoveParentDirectoryName(fileName, rootDir);
                            if (relativeName !== undefined) {
                                return relativeName;
                            }
                        }
                        return undefined;
                    }

                    function getRelativePath(path: string, directoryPath: string) {
                        const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, directoryPath, getCanonicalFileName, false);
                        return moduleHasNonRelativeName(relativePath) ? "./" + relativePath : relativePath;
                    }

                    function tryRemoveParentDirectoryName(path: string, parentDirectory: string) {
                        const index = path.indexOf(parentDirectory);
                        if (index === 0) {
                            return endsWith(parentDirectory, directorySeparator)
                                ? path.substring(parentDirectory.length)
                                : path.substring(parentDirectory.length + 1);
                        }
                        return undefined;
                    }
                }

            }

            function createCodeAction(description: DiagnosticMessage, diagnosticArgs: string[], newText: string, span: TextSpan, fileName: string): CodeAction {
                return {
                    description: formatMessage.apply(undefined, [undefined, description].concat(<any[]>diagnosticArgs)),
                    changes: [{ fileName, textChanges: [{ newText, span }] }]
                };
            }
        }
    });
}
