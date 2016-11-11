/* @internal */
namespace ts.codefix {

    type ImportCodeActionKind = "CodeChange" | "InsertingIntoExistingImport" | "NewImport";
    interface ImportCodeAction extends CodeAction {
        kind: ImportCodeActionKind,
        moduleSpecifier?: string
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
                if (otherSourceFile !== sourceFile && isExternalOrCommonJsModule(otherSourceFile) && otherSourceFile.symbol) {
                    allPotentialModules.push(otherSourceFile.symbol);
                }
            }

            const currentTokenMeaning = getMeaningFromLocation(token);
            for (const moduleSymbol of allPotentialModules) {
                context.cancellationToken.throwIfCancellationRequested();

                // check the default export
                const defaultExport = checker.tryGetMemberInModuleExports("default", moduleSymbol);
                if (defaultExport) {
                    const localSymbol = getLocalSymbolForExportDefault(defaultExport);
                    if (localSymbol && localSymbol.name === name && checkSymbolHasMeaning(localSymbol, currentTokenMeaning)) {
                        addRange(allActions, getCodeActionForImport(moduleSymbol, /*isDefaultExport*/ true));
                    }
                }

                // check exports with the same name
                const exportWithIdenticalName = checker.tryGetMemberInModuleExports(name, moduleSymbol);
                if (exportWithIdenticalName && checkSymbolHasMeaning(exportWithIdenticalName, currentTokenMeaning)) {
                    addRange(allActions, getCodeActionForImport(moduleSymbol));
                }
            }

            //sort the code actions
            const confirmedActions: ImportCodeAction[] = [];
            for (const action of allActions) {
                switch (action.kind) {
                    case "CodeChange":
                    case "InsertingIntoExistingImport":
                        confirmedActions.push(action);
                        break;
                    case "NewImport":
                        if (action.moduleSpecifier &&
                            some(allActions, otherAction => action.moduleSpecifier !== otherAction.moduleSpecifier && action.moduleSpecifier.indexOf(otherAction.moduleSpecifier) === 0)) {
                            // there is another action with a shorter module specifier. Use that instead.
                            continue;
                        }
                        confirmedActions.push(action);
                }
            }

            return confirmedActions;

            function checkSymbolHasMeaning(symbol: Symbol, meaning: SemanticMeaning) {
                const declarations = symbol.getDeclarations();
                return declarations ? some(symbol.declarations, decl => !!(getMeaningFromDeclaration(decl) & meaning)) : false;
            }

            function getCodeActionForImport(moduleSymbol: Symbol, isDefault?: boolean): ImportCodeAction[] {
                // Check to see if there are already imports being made from this source in the current file
                const existingDeclarations: (ImportDeclaration | ImportEqualsDeclaration)[] = [];
                for (const importModuleSpecifier of sourceFile.imports) {
                    const importSymbol = checker.getSymbolAtLocation(importModuleSpecifier);
                    if (importSymbol === moduleSymbol) {
                        existingDeclarations.push(getImportDeclaration(importModuleSpecifier));
                    }
                }

                if (existingDeclarations.length > 0) {
                    // With an existing import statement, there are more than one actions the user can do.
                    return getCodeActionsForExistingImport(existingDeclarations);
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

                function getCodeActionsForExistingImport(declarations: (ImportDeclaration | ImportEqualsDeclaration)[]): ImportCodeAction[] {
                    const actions: ImportCodeAction[] = [];

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
                    let namespaceImportDeclaration: ImportDeclaration | ImportEqualsDeclaration;
                    let namedImportDeclaration: ImportDeclaration;
                    let existingModuleSpecifier: string;
                    for (const declaration of declarations) {
                        if (declaration.kind === SyntaxKind.ImportDeclaration) {
                            const namedBindings = declaration.importClause && declaration.importClause.namedBindings;
                            if (namedBindings && namedBindings.kind === SyntaxKind.NamespaceImport) {
                                // case:
                                // import * as ns from "foo"
                                namespaceImportDeclaration = declaration;
                            }
                            else {
                                // cases:
                                // import default from "foo"
                                // import { bar } from "foo" or combination with the first one
                                // import "foo"
                                namedImportDeclaration = declaration;
                            }
                            existingModuleSpecifier = declaration.moduleSpecifier.getText();
                        }
                        else {
                            // case:
                            // import foo = require("foo")
                            namespaceImportDeclaration = declaration;
                            existingModuleSpecifier = declaration.name.getText();
                        }
                    }

                    if (namespaceImportDeclaration) {
                        actions.push(getCodeActionForNamespaceImport(namespaceImportDeclaration));
                    }

                    if (namedImportDeclaration && namedImportDeclaration.importClause &&
                        (namedImportDeclaration.importClause.name || namedImportDeclaration.importClause.namedBindings)) {
                        /**
                         * If the existing import declaration already has a named import list, just
                         * insert the identifier into that list.
                         */
                        const textChange = getTextChangeForImportClause(namedImportDeclaration.importClause);
                        const moduleSpecifierWithoutQuotes = stripQuotes(namedImportDeclaration.moduleSpecifier.getText());
                        actions.push(createCodeAction(
                            Diagnostics.Add_0_to_existing_import_declaration_from_1,
                            [name, moduleSpecifierWithoutQuotes],
                            textChange.newText,
                            textChange.span,
                            sourceFile.fileName,
                            "InsertingIntoExistingImport",
                            moduleSpecifierWithoutQuotes
                        ));
                    }
                    else {
                        // we need to create a new import statement, but the existing module specifier can be reused.
                        actions.push(getCodeActionForNewImport(existingModuleSpecifier));
                    }
                    return actions;

                    function getTextChangeForImportClause(importClause: ImportClause): TextChange {
                        const newImportText = isDefault ? `default as ${name}` : name;
                        const importList = <NamedImports>importClause.namedBindings;
                        // case 1:
                        // original text: import default from "module"
                        // change to: import default, { name } from "module"
                        if (!importList && importClause.name) {
                            const start = importClause.name.getEnd();
                            return {
                                newText: `, { ${newImportText} }`,
                                span: { start, length: 0 }
                            };
                        }

                        // case 2:
                        // original text: import {} from "module"
                        // change to: import { name } from "module"
                        if (importList.elements.length === 0) {
                            const start = importList.getStart();
                            return {
                                newText: `{ ${newImportText} }`,
                                span: { start, length: importList.getEnd() - start }
                            };
                        }

                        // case 3:
                        // original text: import { foo, bar } from "module"
                        // change to: import { foo, bar, name } from "module"
                        const insertPoint = importList.elements[importList.elements.length - 1].getEnd();
                        /**
                         * If the import list has one import per line, preserve that. Otherwise, insert on same line as last element
                         *     import {
                         *         foo
                         *     } from "./module";
                         */
                        const startLine = getLineOfLocalPosition(sourceFile, importList.getStart());
                        const endLine = getLineOfLocalPosition(sourceFile, importList.getEnd());
                        const oneImportPerLine = endLine - startLine > importList.elements.length;

                        return {
                            newText: `,${oneImportPerLine ? context.newLineCharacter : " "}${newImportText}`,
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
                            "CodeChange"
                        );
                    }
                }

                function getCodeActionForNewImport(moduleSpecifier?: string): ImportCodeAction {
                    // insert after any existing imports
                    let lastModuleSpecifierEnd = -1;
                    for (const moduleSpecifier of sourceFile.imports) {
                        const end = moduleSpecifier.getEnd();
                        if (!lastModuleSpecifierEnd || end > lastModuleSpecifierEnd) {
                            lastModuleSpecifierEnd = end;
                        }
                    }
                    const insertPos = lastModuleSpecifierEnd > 0 ? lastModuleSpecifierEnd + 1 : sourceFile.getStart();

                    const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
                    const moduleSpecifierWithoutQuotes = stripQuotes(moduleSpecifier || getModuleSpecifierForNewImport());
                    const importStatementText = isDefault
                        ? `import ${name} from "${moduleSpecifierWithoutQuotes}"`
                        : `import { ${name} } from "${moduleSpecifierWithoutQuotes}"`;

                    // if this file doesn't have any import statements, insert an import statement and then insert a new line
                    // between the only import statement and user code. Otherwise just insert the statement because chances
                    // are there are already a new line seperating code and import statements.
                    const newText = insertPos === sourceFile.getStart()
                        ? `${importStatementText};${context.newLineCharacter}${context.newLineCharacter}`
                        : `${context.newLineCharacter}${importStatementText};`;

                    return createCodeAction(
                        Diagnostics.Import_0_from_1,
                        [name, `"${moduleSpecifierWithoutQuotes}"`],
                        newText,
                        { start: insertPos, length: 0 },
                        sourceFile.fileName,
                        "NewImport",
                        moduleSpecifierWithoutQuotes
                    );

                    function getModuleSpecifierForNewImport() {
                        const fileName = sourceFile.path;
                        const moduleFileName = moduleSymbol.valueDeclaration.getSourceFile().path;
                        const sourceDirectory = getDirectoryPath(fileName);
                        const options = context.program.getCompilerOptions();

                        return tryGetModuleNameFromAmbientModule() ||
                            tryGetModuleNameFromBaseUrl() ||
                            tryGetModuleNameFromRootDirs() ||
                            tryGetModuleNameFromTypeRoots() ||
                            tryGetModuleNameAsNodeModule() ||
                            removeFileExtension(getRelativePath(moduleFileName, sourceDirectory));

                        function tryGetModuleNameFromAmbientModule(): string {
                            if (moduleSymbol.valueDeclaration.kind !== SyntaxKind.SourceFile) {
                                return moduleSymbol.name;
                            }
                        }

                        function tryGetModuleNameFromBaseUrl() {
                            if (!options.baseUrl) {
                                return undefined;
                            }

                            const normalizedBaseUrl = toPath(options.baseUrl, getDirectoryPath(options.baseUrl), getCanonicalFileName);
                            let relativeName = tryRemoveParentDirectoryName(moduleFileName, normalizedBaseUrl);
                            if (!relativeName) {
                                return undefined;
                            }

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
                                const normalizedRootDirs = map(options.rootDirs, rootDir => toPath(rootDir, /*basePath*/ undefined, getCanonicalFileName));
                                const normalizedTargetPath = getPathRelativeToRootDirs(moduleFileName, normalizedRootDirs);
                                const normalizedSourcePath = getPathRelativeToRootDirs(sourceDirectory, normalizedRootDirs);
                                if (normalizedTargetPath !== undefined) {
                                    const relativePath = normalizedSourcePath !== undefined ? getRelativePath(normalizedTargetPath, normalizedSourcePath) : normalizedTargetPath;
                                    return removeFileExtension(relativePath);
                                }
                            }
                            return undefined;
                        }

                        function tryGetModuleNameFromTypeRoots() {
                            const typeRoots = getEffectiveTypeRoots(options, context.host);
                            if (typeRoots) {
                                const normalizedTypeRoots = map(typeRoots, typeRoot => toPath(typeRoot, /*basePath*/ undefined, getCanonicalFileName));
                                for (const typeRoot of normalizedTypeRoots) {
                                    if (startsWith(moduleFileName, typeRoot)) {
                                        let relativeFileName = moduleFileName.substring(typeRoot.length + 1);
                                        return removeExtensionAndIndexPostFix(relativeFileName);
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
                            if (endsWith(relativeFileName, "/index")) {
                                relativeFileName = getDirectoryPath(relativeFileName);
                            }
                            else {
                                try {
                                    const moduleDirectory = getDirectoryPath(moduleFileName);
                                    const packageJsonContent = JSON.parse(context.host.readFile(combinePaths(moduleDirectory, "package.json")));
                                    if (packageJsonContent && packageJsonContent.main) {
                                        const mainExportFile = toPath(packageJsonContent.main, moduleDirectory, getCanonicalFileName);
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

                    function getPathRelativeToRootDirs(path: Path, rootDirs: Path[]) {
                        for (const rootDir of rootDirs) {
                            const relativeName = tryRemoveParentDirectoryName(path, rootDir);
                            if (relativeName !== undefined) {
                                return relativeName;
                            }
                        }
                        return undefined;
                    }

                    function removeExtensionAndIndexPostFix(fileName: string) {
                        fileName = removeFileExtension(fileName);
                        if (endsWith(fileName, "/index")) {
                            fileName = fileName.substr(0, fileName.length - 6/* "/index".length */);
                        }
                        return fileName;
                    }

                    function getRelativePath(path: string, directoryPath: string) {
                        const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, directoryPath, getCanonicalFileName, false);
                        return moduleHasNonRelativeName(relativePath) ? "./" + relativePath : relativePath;
                    }

                    function tryRemoveParentDirectoryName(path: Path, parentDirectory: Path) {
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

            function createCodeAction(
                description: DiagnosticMessage,
                diagnosticArgs: string[],
                newText: string,
                span: TextSpan,
                fileName: string,
                kind: ImportCodeActionKind,
                moduleSpecifier?: string): ImportCodeAction {
                return {
                    description: formatMessage.apply(undefined, [undefined, description].concat(<any[]>diagnosticArgs)),
                    changes: [{ fileName, textChanges: [{ newText, span }] }],
                    kind,
                    moduleSpecifier
                };
            }
        }
    });
}
