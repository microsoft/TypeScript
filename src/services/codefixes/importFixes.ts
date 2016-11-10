/* @internal */
namespace ts.codefix {

    // The order of the kinds also determines their priority.
    // the ones comes first should be presenteed to the user first too.
    enum ImportCodeActionKind {
        CodeChange,
        InsertingIntoExistingImport,
        NewImportWithNonRelativeModuleSpecifier,
        NewImportWithRelativeModuleSpecifier,
    }

    interface ImportCodeAction extends CodeAction {
        kind: ImportCodeActionKind
    }

    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_find_name_0.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const checker = context.program.getTypeChecker();
            const allSourceFiles = context.program.getSourceFiles();
            const useCaseSensitiveFileNames = context.host.useCaseSensitiveFileNames ? context.host.useCaseSensitiveFileNames() : false;

            const token = getTokenAtPosition(sourceFile, context.span.start);
            const name = token.getText();
            const allActions: ImportCodeAction[] = [];

            const allPotentialModules = checker.getAmbientModules();
            for (const otherSourceFile of allSourceFiles) {
                if (otherSourceFile !== sourceFile && otherSourceFile.symbol) {
                    allPotentialModules.push(otherSourceFile.symbol);
                }
            }

            const currentTokenMeaning = getMeaningFromLocation(token);
            for (const moduleSymbol of allPotentialModules) {
                context.cancellationToken.throwIfCancellationRequested();

                const moduleExports = checker.getExportsOfModule(moduleSymbol);
                if (!moduleExports) {
                    continue;
                }

                // check the default export
                const defaultExport = moduleExports["default"];
                if (defaultExport) {
                    const localSymbol = getLocalSymbolForExportDefault(defaultExport);
                    if (localSymbol && localSymbol.name === name && checkSymbolHasMeaning(localSymbol, currentTokenMeaning)) {
                        addRange(allActions, getCodeActionForImport(moduleSymbol, /*isDefaultExport*/ true));
                    }
                }

                // check exports with the same name
                if (name in moduleExports) {
                    if (checkSymbolHasMeaning(moduleExports[name], currentTokenMeaning)) {
                        addRange(allActions, getCodeActionForImport(moduleSymbol));
                    }
                }
            }

            //sort the code actions

            return allActions;

            function checkSymbolHasMeaning(symbol: Symbol, meaning: SemanticMeaning) {
                const declarations = symbol.getDeclarations();
                return declarations ? some(symbol.declarations, decl => !!(getMeaningFromDeclaration(decl) & meaning)) : false;
            }

            function getCodeActionForImport(moduleSymbol: Symbol, isDefaultExport?: boolean): ImportCodeAction[] {
                // Check to see if there are already imports being made from this source in the current file
                const existingDeclarations: (ImportDeclaration | ImportEqualsDeclaration)[] = [];
                for (const importModuleSpecifier of sourceFile.imports) {
                    const importSymbol = checker.getSymbolAtLocation(importModuleSpecifier);
                    if (importSymbol === moduleSymbol) {
                        existingDeclarations.push(getImportDeclaration(importModuleSpecifier));
                    }
                }

                if (existingDeclarations.length > 0) {
                    return getCodeActionForExistingImport(existingDeclarations);
                }
                else {
                    return [getCodeActionForNewImport()];
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

                function getCodeActionForExistingImport(declarations: (ImportDeclaration | ImportEqualsDeclaration)[]): ImportCodeAction[] {
                    const actions: ImportCodeAction[] = [];

                    // It is possible that multiple import statements with the same specifier exist in the file.
                    // e.g.
                    //     // File 1
                    //     import * as ns from "foo";
                    //     import defaultFunction from "foo";
                    //     import { member1, member2 } from "foo";
                    //      
                    //     member3 // <-- cusor here
                    //
                    // in this case we should provie 2 actions:
                    //     1. change "member3" to "ns.member3"
                    //     2. add "member3" to the third import statement's import list
                    // and it is up to the user to decide which one fits best.
                    let namespaceImport: ImportDeclaration | ImportEqualsDeclaration;
                    let namedImportWithImportList: ImportDeclaration;
                    let namedImportWithoutImportList: ImportDeclaration;
                    for (const declaration of declarations) {
                        if (declaration.kind === SyntaxKind.ImportDeclaration) {
                            const namedBindings = declaration.importClause && declaration.importClause.namedBindings;
                            if (namedBindings) { 
                                if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                                    namespaceImport = declaration;
                                }
                                else {
                                    namedImportWithImportList = declaration;
                                }
                            }
                            else {
                                namedImportWithoutImportList = declaration;
                            }
                        }
                        else {
                            namespaceImport = declaration;
                        }
                    }

                    if (namespaceImport) {
                        actions.push(getCodeActionForNamespaceImport(namespaceImport));
                    }

                    if (namedImportWithImportList) {
                        /**
                         * If the existing import declaration already has a named import list, just
                         * insert the identifier into that list.
                         */
                        const textChange = getTextChangeForImportList(<NamedImports>namedImportWithImportList.importClause.namedBindings);
                        actions.push(createCodeAction(
                            Diagnostics.Add_0_to_existing_import_declaration_from_1,
                            [name, namedImportWithImportList.moduleSpecifier.getText()],
                            textChange.newText,
                            textChange.span,
                            sourceFile.fileName,
                            ImportCodeActionKind.InsertingIntoExistingImport
                        ));
                    }
                    else if (namedImportWithoutImportList) {
                        // insert a new import statement in a new lines
                        actions.push(getCodeActionForNewImport(namedImportWithoutImportList.moduleSpecifier.getText(), namedImportWithoutImportList.getEnd()));
                    }
                    return actions;

                    function getTextChangeForImportList(importList: NamedImports): TextChange {
                        const newImportText = isDefaultImport ? `default as ${name}` : name;
                        if (importList.elements.length === 0) {
                            const start = importList.getStart();
                            return {
                                newText: `{ ${newImportText} }`,
                                span: { start, length: importList.getEnd() - start }
                            };
                        }

                        // Insert after the last element
                        const insertPoint = importList.elements[importList.elements.length - 1].getEnd();

                        // If the import list has one import per line, preserve that. Otherwise, insert on same line as last element
                        let oneImportPerLine: boolean;
                        if (importList.elements.length === 1) {
                            /**
                             * If there is only one symbol being imported, still check to see if it's set up for multi-line imports like this:
                             *     import {
                             *         foo
                             *     } from "./module";
                             */
                            const startLine = getLineOfLocalPosition(sourceFile, importList.getStart());
                            const endLine = getLineOfLocalPosition(sourceFile, importList.getEnd());
                            oneImportPerLine = endLine - startLine >= 2;
                        }
                        else {
                            const startLine = getLineOfLocalPosition(sourceFile, importList.elements[0].getStart());
                            const endLine = getLineOfLocalPosition(sourceFile, insertPoint);
                            oneImportPerLine = endLine - startLine >= importList.elements.length - 1;
                        }

                        return {
                            newText: `,${oneImportPerLine ? context.newLineCharacter : ""}${newImportText}`,
                            span: { start: insertPoint, length: 0 }
                        };
                    }

                    function getCodeActionForNamespaceImport(declaration: ImportDeclaration | ImportEqualsDeclaration): ImportCodeAction {
                        let namespacePrefix: string;
                        if (declaration.kind === SyntaxKind.ImportDeclaration) {
                            namespacePrefix = (<NamespaceImport>declaration.importClause.namedBindings).name.getText();
                        }
                        else {
                            namespacePrefix = declaration.name.getText();
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
                        return createCodeAction(
                            Diagnostics.Change_0_to_1,
                            [name, `${namespacePrefix}.${name}`],
                            `${namespacePrefix}.`,
                            { start: token.getStart(), length: 0 },
                            sourceFile.fileName,
                            ImportCodeActionKind.CodeChange
                        );
                    }
                }

                function getCodeActionForNewImport(moduleSpecifier?: string, insertPos?: number): ImportCodeAction {
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
                    const importStatementText = isDefaultExport
                        ? `import ${name} from "${moduleSpecifier}"`
                        : `import { ${name} } from "${moduleSpecifier}"`;
                    const newText = insertPos === sourceFile.getStart() 
                        ? `${importStatementText};${context.newLineCharacter}`
                        : `${context.newLineCharacter}${importStatementText};`;

                    return createCodeAction(
                        Diagnostics.Import_0_from_1,
                        [name, `"${moduleSpecifier}"`],
                        newText,
                        { start: insertPos, length: 0 },
                        sourceFile.fileName,
                        moduleHasNonRelativeName(moduleSpecifier) ? ImportCodeActionKind.NewImportWithNonRelativeModuleSpecifier : ImportCodeActionKind.NewImportWithRelativeModuleSpecifier
                    );

                    function getModuleSpecifierForNewImport() {
                        const fileName = normalizeFileName(sourceFile.fileName);
                        const moduleFileName = normalizeFileName(moduleSymbol.valueDeclaration.getSourceFile().fileName);
                        const sourceDirectory = getDirectoryPath(fileName);
                        const options = context.program.getCompilerOptions();

                        return tryGetModuleNameFromAmbientModule() ||
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
                            if (typesRoots) {
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

                            if (startsWith(relativeFileName, "@types/")) {
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
                                catch (e) { }
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

            function createCodeAction(description: DiagnosticMessage, diagnosticArgs: string[], newText: string, span: TextSpan, fileName: string, kind: ImportCodeActionKind): ImportCodeAction {
                return {
                    description: formatMessage.apply(undefined, [undefined, description].concat(<any[]>diagnosticArgs)),
                    changes: [{ fileName, textChanges: [{ newText, span }] }],
                    kind
                };
            }
        }
    });
}
