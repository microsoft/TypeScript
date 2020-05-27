/* @internal */
namespace ts.refactor {
    const refactorName = "Move to a new file";
    registerRefactor(refactorName, {
        getAvailableActions(context): readonly ApplicableRefactorInfo[] {
            if (!context.preferences.allowTextChangesInNewFiles || getStatementsToMove(context) === undefined) return emptyArray;
            const description = getLocaleSpecificMessage(Diagnostics.Move_to_a_new_file);
            return [{ name: refactorName, description, actions: [{ name: refactorName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === refactorName, "Wrong refactor invoked");
            const statements = Debug.checkDefined(getStatementsToMove(context));
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, statements, t, context.host, context.preferences));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
    });

    interface RangeToMove { readonly toMove: readonly Statement[]; readonly afterLast: Statement | undefined; }
    function getRangeToMove(context: RefactorContext): RangeToMove | undefined {
        const { file } = context;
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));
        const { statements } = file;

        const startNodeIndex = findIndex(statements, s => s.end > range.pos);
        if (startNodeIndex === -1) return undefined;

        const startStatement = statements[startNodeIndex];
        if (isNamedDeclaration(startStatement) && startStatement.name && rangeContainsRange(startStatement.name, range)) {
            return { toMove: [statements[startNodeIndex]], afterLast: statements[startNodeIndex + 1] };
        }

        // Can't only partially include the start node or be partially into the next node
        if (range.pos > startStatement.getStart(file)) return undefined;
        const afterEndNodeIndex = findIndex(statements, s => s.end > range.end, startNodeIndex);
        // Can't be partially into the next node
        if (afterEndNodeIndex !== -1 && (afterEndNodeIndex === 0 || statements[afterEndNodeIndex].getStart(file) < range.end)) return undefined;

        return {
            toMove: statements.slice(startNodeIndex, afterEndNodeIndex === -1 ? statements.length : afterEndNodeIndex),
            afterLast: afterEndNodeIndex === -1 ? undefined : statements[afterEndNodeIndex],
        };
    }

    function doChange(oldFile: SourceFile, program: Program, toMove: ToMove, changes: textChanges.ChangeTracker, host: LanguageServiceHost, preferences: UserPreferences): void {
        const checker = program.getTypeChecker();
        const usage = getUsageInfo(oldFile, toMove.all, checker);

        const currentDirectory = getDirectoryPath(oldFile.fileName);
        const extension = extensionFromPath(oldFile.fileName);
        const newModuleName = makeUniqueModuleName(getNewModuleName(usage.movedSymbols), extension, currentDirectory, host);
        const newFileNameWithExtension = newModuleName + extension;

        // If previous file was global, this is easy.
        changes.createNewFile(oldFile, combinePaths(currentDirectory, newFileNameWithExtension), getNewStatementsAndRemoveFromOldFile(oldFile, usage, changes, toMove, program, newModuleName, preferences));

        addNewFileToTsconfig(program, changes, oldFile.fileName, newFileNameWithExtension, hostGetCanonicalFileName(host));
    }

    interface StatementRange {
        readonly first: Statement;
        readonly afterLast: Statement | undefined;
    }
    interface ToMove {
        readonly all: readonly Statement[];
        readonly ranges: readonly StatementRange[];
    }

    // Filters imports out of the range of statements to move. Imports will be copied to the new file anyway, and may still be needed in the old file.
    function getStatementsToMove(context: RefactorContext): ToMove | undefined {
        const rangeToMove = getRangeToMove(context);
        if (rangeToMove === undefined) return undefined;
        const all: Statement[] = [];
        const ranges: StatementRange[] = [];
        const { toMove, afterLast } = rangeToMove;
        getRangesWhere(toMove, s => !isPureImport(s), (start, afterEndIndex) => {
            for (let i = start; i < afterEndIndex; i++) all.push(toMove[i]);
            ranges.push({ first: toMove[start], afterLast });
        });
        return all.length === 0 ? undefined : { all, ranges };
    }

    function isPureImport(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                return true;
            case SyntaxKind.ImportEqualsDeclaration:
                return !hasSyntacticModifier(node, ModifierFlags.Export);
            case SyntaxKind.VariableStatement:
                return (node as VariableStatement).declarationList.declarations.every(d => !!d.initializer && isRequireCall(d.initializer, /*checkArgumentIsStringLiteralLike*/ true));
            default:
                return false;
        }
    }

    function addNewFileToTsconfig(program: Program, changes: textChanges.ChangeTracker, oldFileName: string, newFileNameWithExtension: string, getCanonicalFileName: GetCanonicalFileName): void {
        const cfg = program.getCompilerOptions().configFile;
        if (!cfg) return;

        const newFileAbsolutePath = normalizePath(combinePaths(oldFileName, "..", newFileNameWithExtension));
        const newFilePath = getRelativePathFromFile(cfg.fileName, newFileAbsolutePath, getCanonicalFileName);

        const cfgObject = cfg.statements[0] && tryCast(cfg.statements[0].expression, isObjectLiteralExpression);
        const filesProp = cfgObject && find(cfgObject.properties, (prop): prop is PropertyAssignment =>
            isPropertyAssignment(prop) && isStringLiteral(prop.name) && prop.name.text === "files");
        if (filesProp && isArrayLiteralExpression(filesProp.initializer)) {
            changes.insertNodeInListAfter(cfg, last(filesProp.initializer.elements), createLiteral(newFilePath), filesProp.initializer.elements);
        }
    }

    function getNewStatementsAndRemoveFromOldFile(
        oldFile: SourceFile, usage: UsageInfo, changes: textChanges.ChangeTracker, toMove: ToMove, program: Program, newModuleName: string, preferences: UserPreferences,
    ): readonly Statement[] {
        const checker = program.getTypeChecker();

        if (!oldFile.externalModuleIndicator && !oldFile.commonJsModuleIndicator) {
            deleteMovedStatements(oldFile, toMove.ranges, changes);
            return toMove.all;
        }

        const useEs6ModuleSyntax = !!oldFile.externalModuleIndicator;
        const quotePreference = getQuotePreference(oldFile, preferences);
        const importsFromNewFile = createOldFileImportsFromNewFile(usage.oldFileImportsFromNewFile, newModuleName, useEs6ModuleSyntax, quotePreference);
        if (importsFromNewFile) {
            insertImports(changes, oldFile, importsFromNewFile, /*blankLineBetween*/ true);
        }

        deleteUnusedOldImports(oldFile, toMove.all, changes, usage.unusedImportsFromOldFile, checker);
        deleteMovedStatements(oldFile, toMove.ranges, changes);

        updateImportsInOtherFiles(changes, program, oldFile, usage.movedSymbols, newModuleName);

        return [
            ...getNewFileImportsAndAddExportInOldFile(oldFile, usage.oldImportsNeededByNewFile, usage.newFileImportsFromOldFile, changes, checker, useEs6ModuleSyntax, quotePreference),
            ...addExports(oldFile, toMove.all, usage.oldFileImportsFromNewFile, useEs6ModuleSyntax),
        ];
    }

    function deleteMovedStatements(sourceFile: SourceFile, moved: readonly StatementRange[], changes: textChanges.ChangeTracker) {
        for (const { first, afterLast } of moved) {
            changes.deleteNodeRangeExcludingEnd(sourceFile, first, afterLast);
        }
    }

    function deleteUnusedOldImports(oldFile: SourceFile, toMove: readonly Statement[], changes: textChanges.ChangeTracker, toDelete: ReadonlySymbolSet, checker: TypeChecker) {
        for (const statement of oldFile.statements) {
            if (contains(toMove, statement)) continue;
            forEachImportInStatement(statement, i => deleteUnusedImports(oldFile, i, changes, name => toDelete.has(checker.getSymbolAtLocation(name)!)));
        }
    }

    function updateImportsInOtherFiles(changes: textChanges.ChangeTracker, program: Program, oldFile: SourceFile, movedSymbols: ReadonlySymbolSet, newModuleName: string): void {
        const checker = program.getTypeChecker();
        for (const sourceFile of program.getSourceFiles()) {
            if (sourceFile === oldFile) continue;
            for (const statement of sourceFile.statements) {
                forEachImportInStatement(statement, importNode => {
                    if (checker.getSymbolAtLocation(moduleSpecifierFromImport(importNode)) !== oldFile.symbol) return;

                    const shouldMove = (name: Identifier): boolean => {
                        const symbol = isBindingElement(name.parent)
                            ? getPropertySymbolFromBindingElement(checker, name.parent as ObjectBindingElementWithoutPropertyName)
                            : skipAlias(checker.getSymbolAtLocation(name)!, checker); // TODO: GH#18217
                        return !!symbol && movedSymbols.has(symbol);
                    };
                    deleteUnusedImports(sourceFile, importNode, changes, shouldMove); // These will be changed to imports from the new file
                    const newModuleSpecifier = combinePaths(getDirectoryPath(moduleSpecifierFromImport(importNode).text), newModuleName);
                    const newImportDeclaration = filterImport(importNode, createLiteral(newModuleSpecifier), shouldMove);
                    if (newImportDeclaration) changes.insertNodeAfter(sourceFile, statement, newImportDeclaration);

                    const ns = getNamespaceLikeImport(importNode);
                    if (ns) updateNamespaceLikeImport(changes, sourceFile, checker, movedSymbols, newModuleName, newModuleSpecifier, ns, importNode);
                });
            }
        }
    }

    function getNamespaceLikeImport(node: SupportedImport): Identifier | undefined {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                return node.importClause && node.importClause.namedBindings && node.importClause.namedBindings.kind === SyntaxKind.NamespaceImport ?
                    node.importClause.namedBindings.name : undefined;
            case SyntaxKind.ImportEqualsDeclaration:
                return node.name;
            case SyntaxKind.VariableDeclaration:
                return tryCast(node.name, isIdentifier);
            default:
                return Debug.assertNever(node, `Unexpected node kind ${(node as SupportedImport).kind}`);
        }
    }

    function updateNamespaceLikeImport(
        changes: textChanges.ChangeTracker,
        sourceFile: SourceFile,
        checker: TypeChecker,
        movedSymbols: ReadonlySymbolSet,
        newModuleName: string,
        newModuleSpecifier: string,
        oldImportId: Identifier,
        oldImportNode: SupportedImport,
    ): void {
        const preferredNewNamespaceName = codefix.moduleSpecifierToValidIdentifier(newModuleName, ScriptTarget.ESNext);
        let needUniqueName = false;
        const toChange: Identifier[] = [];
        FindAllReferences.Core.eachSymbolReferenceInFile(oldImportId, checker, sourceFile, ref => {
            if (!isPropertyAccessExpression(ref.parent)) return;
            needUniqueName = needUniqueName || !!checker.resolveName(preferredNewNamespaceName, ref, SymbolFlags.All, /*excludeGlobals*/ true);
            if (movedSymbols.has(checker.getSymbolAtLocation(ref.parent.name)!)) {
                toChange.push(ref);
            }
        });

        if (toChange.length) {
            const newNamespaceName = needUniqueName ? getUniqueName(preferredNewNamespaceName, sourceFile) : preferredNewNamespaceName;
            for (const ref of toChange) {
                changes.replaceNode(sourceFile, ref, createIdentifier(newNamespaceName));
            }
            changes.insertNodeAfter(sourceFile, oldImportNode, updateNamespaceLikeImportNode(oldImportNode, newModuleName, newModuleSpecifier));
        }
    }

    function updateNamespaceLikeImportNode(node: SupportedImport, newNamespaceName: string, newModuleSpecifier: string): Node {
        const newNamespaceId = createIdentifier(newNamespaceName);
        const newModuleString = createLiteral(newModuleSpecifier);
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                return createImportDeclaration(
                    /*decorators*/ undefined, /*modifiers*/ undefined,
                    createImportClause(/*name*/ undefined, createNamespaceImport(newNamespaceId)),
                    newModuleString);
            case SyntaxKind.ImportEqualsDeclaration:
                return createImportEqualsDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, newNamespaceId, createExternalModuleReference(newModuleString));
            case SyntaxKind.VariableDeclaration:
                return createVariableDeclaration(newNamespaceId, /*type*/ undefined, createRequireCall(newModuleString));
            default:
                return Debug.assertNever(node, `Unexpected node kind ${(node as SupportedImport).kind}`);
        }
    }

    function moduleSpecifierFromImport(i: SupportedImport): StringLiteralLike {
        return (i.kind === SyntaxKind.ImportDeclaration ? i.moduleSpecifier
            : i.kind === SyntaxKind.ImportEqualsDeclaration ? i.moduleReference.expression
            : i.initializer.arguments[0]);
    }

    function forEachImportInStatement(statement: Statement, cb: (importNode: SupportedImport) => void): void {
        if (isImportDeclaration(statement)) {
            if (isStringLiteral(statement.moduleSpecifier)) cb(statement as SupportedImport);
        }
        else if (isImportEqualsDeclaration(statement)) {
            if (isExternalModuleReference(statement.moduleReference) && isStringLiteralLike(statement.moduleReference.expression)) {
                cb(statement as SupportedImport);
            }
        }
        else if (isVariableStatement(statement)) {
            for (const decl of statement.declarationList.declarations) {
                if (decl.initializer && isRequireCall(decl.initializer, /*checkArgumentIsStringLiteralLike*/ true)) {
                    cb(decl as SupportedImport);
                }
            }
        }
    }

    type SupportedImport =
        | ImportDeclaration & { moduleSpecifier: StringLiteralLike }
        | ImportEqualsDeclaration & { moduleReference: ExternalModuleReference & { expression: StringLiteralLike } }
        | VariableDeclaration & { initializer: RequireOrImportCall };
    type SupportedImportStatement =
        | ImportDeclaration
        | ImportEqualsDeclaration
        | VariableStatement;

    function createOldFileImportsFromNewFile(newFileNeedExport: ReadonlySymbolSet, newFileNameWithExtension: string, useEs6Imports: boolean, quotePreference: QuotePreference): Statement | undefined {
        let defaultImport: Identifier | undefined;
        const imports: string[] = [];
        newFileNeedExport.forEach(symbol => {
            if (symbol.escapedName === InternalSymbolName.Default) {
                defaultImport = createIdentifier(symbolNameNoDefault(symbol)!); // TODO: GH#18217
            }
            else {
                imports.push(symbol.name);
            }
        });
        return makeImportOrRequire(defaultImport, imports, newFileNameWithExtension, useEs6Imports, quotePreference);
    }

    function makeImportOrRequire(defaultImport: Identifier | undefined, imports: readonly string[], path: string, useEs6Imports: boolean, quotePreference: QuotePreference): Statement | undefined {
        path = ensurePathIsNonModuleName(path);
        if (useEs6Imports) {
            const specifiers = imports.map(i => createImportSpecifier(/*propertyName*/ undefined, createIdentifier(i)));
            return makeImportIfNecessary(defaultImport, specifiers, path, quotePreference);
        }
        else {
            Debug.assert(!defaultImport, "No default import should exist"); // If there's a default export, it should have been an es6 module.
            const bindingElements = imports.map(i => createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, i));
            return bindingElements.length
                ? makeVariableStatement(createObjectBindingPattern(bindingElements), /*type*/ undefined, createRequireCall(createLiteral(path)))
                : undefined;
        }
    }

    function makeVariableStatement(name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined, flags: NodeFlags = NodeFlags.Const) {
        return createVariableStatement(/*modifiers*/ undefined, createVariableDeclarationList([createVariableDeclaration(name, type, initializer)], flags));
    }

    function createRequireCall(moduleSpecifier: StringLiteralLike): CallExpression {
        return createCall(createIdentifier("require"), /*typeArguments*/ undefined, [moduleSpecifier]);
    }

    function addExports(sourceFile: SourceFile, toMove: readonly Statement[], needExport: ReadonlySymbolSet, useEs6Exports: boolean): readonly Statement[] {
        return flatMap(toMove, statement => {
            if (isTopLevelDeclarationStatement(statement) &&
                !isExported(sourceFile, statement, useEs6Exports) &&
                forEachTopLevelDeclaration(statement, d => needExport.has(Debug.checkDefined(d.symbol)))) {
                const exports = addExport(statement, useEs6Exports);
                if (exports) return exports;
            }
            return statement;
        });
    }

    function deleteUnusedImports(sourceFile: SourceFile, importDecl: SupportedImport, changes: textChanges.ChangeTracker, isUnused: (name: Identifier) => boolean): void {
        switch (importDecl.kind) {
            case SyntaxKind.ImportDeclaration:
                deleteUnusedImportsInDeclaration(sourceFile, importDecl, changes, isUnused);
                break;
            case SyntaxKind.ImportEqualsDeclaration:
                if (isUnused(importDecl.name)) {
                    changes.delete(sourceFile, importDecl);
                }
                break;
            case SyntaxKind.VariableDeclaration:
                deleteUnusedImportsInVariableDeclaration(sourceFile, importDecl, changes, isUnused);
                break;
            default:
                Debug.assertNever(importDecl, `Unexpected import decl kind ${(importDecl as SupportedImport).kind}`);
        }
    }
    function deleteUnusedImportsInDeclaration(sourceFile: SourceFile, importDecl: ImportDeclaration, changes: textChanges.ChangeTracker, isUnused: (name: Identifier) => boolean): void {
        if (!importDecl.importClause) return;
        const { name, namedBindings } = importDecl.importClause;
        const defaultUnused = !name || isUnused(name);
        const namedBindingsUnused = !namedBindings ||
            (namedBindings.kind === SyntaxKind.NamespaceImport ? isUnused(namedBindings.name) : namedBindings.elements.length !== 0 && namedBindings.elements.every(e => isUnused(e.name)));
        if (defaultUnused && namedBindingsUnused) {
            changes.delete(sourceFile, importDecl);
        }
        else {
            if (name && defaultUnused) {
                changes.delete(sourceFile, name);
            }
            if (namedBindings) {
                if (namedBindingsUnused) {
                    changes.replaceNode(
                        sourceFile,
                        importDecl.importClause,
                        updateImportClause(importDecl.importClause, name, /*namedBindings*/ undefined, importDecl.importClause.isTypeOnly)
                    );
                }
                else if (namedBindings.kind === SyntaxKind.NamedImports) {
                    for (const element of namedBindings.elements) {
                        if (isUnused(element.name)) changes.delete(sourceFile, element);
                    }
                }
            }
        }
    }
    function deleteUnusedImportsInVariableDeclaration(sourceFile: SourceFile, varDecl: VariableDeclaration, changes: textChanges.ChangeTracker, isUnused: (name: Identifier) => boolean) {
        const { name } = varDecl;
        switch (name.kind) {
            case SyntaxKind.Identifier:
                if (isUnused(name)) {
                    changes.delete(sourceFile, name);
                }
                break;
            case SyntaxKind.ArrayBindingPattern:
                break;
            case SyntaxKind.ObjectBindingPattern:
                if (name.elements.every(e => isIdentifier(e.name) && isUnused(e.name))) {
                    changes.delete(sourceFile,
                        isVariableDeclarationList(varDecl.parent) && varDecl.parent.declarations.length === 1 ? varDecl.parent.parent : varDecl);
                }
                else {
                    for (const element of name.elements) {
                        if (isIdentifier(element.name) && isUnused(element.name)) {
                            changes.delete(sourceFile, element.name);
                        }
                    }
                }
                break;
        }
    }

    function getNewFileImportsAndAddExportInOldFile(
        oldFile: SourceFile,
        importsToCopy: ReadonlySymbolSet,
        newFileImportsFromOldFile: ReadonlySymbolSet,
        changes: textChanges.ChangeTracker,
        checker: TypeChecker,
        useEs6ModuleSyntax: boolean,
        quotePreference: QuotePreference,
    ): readonly SupportedImportStatement[] {
        const copiedOldImports: SupportedImportStatement[] = [];
        for (const oldStatement of oldFile.statements) {
            forEachImportInStatement(oldStatement, i => {
                append(copiedOldImports, filterImport(i, moduleSpecifierFromImport(i), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
            });
        }

        // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
        let oldFileDefault: Identifier | undefined;
        const oldFileNamedImports: string[] = [];
        const markSeenTop = nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
        newFileImportsFromOldFile.forEach(symbol => {
            for (const decl of symbol.declarations) {
                if (!isTopLevelDeclaration(decl)) continue;
                const name = nameOfTopLevelDeclaration(decl);
                if (!name) continue;

                const top = getTopLevelDeclarationStatement(decl);
                if (markSeenTop(top)) {
                    addExportToChanges(oldFile, top, changes, useEs6ModuleSyntax);
                }
                if (hasSyntacticModifier(decl, ModifierFlags.Default)) {
                    oldFileDefault = name;
                }
                else {
                    oldFileNamedImports.push(name.text);
                }
            }
        });

        append(copiedOldImports, makeImportOrRequire(oldFileDefault, oldFileNamedImports, removeFileExtension(getBaseFileName(oldFile.fileName)), useEs6ModuleSyntax, quotePreference));
        return copiedOldImports;
    }

    function makeUniqueModuleName(moduleName: string, extension: string, inDirectory: string, host: LanguageServiceHost): string {
        let newModuleName = moduleName;
        for (let i = 1; ; i++) {
            const name = combinePaths(inDirectory, newModuleName + extension);
            if (!host.fileExists!(name)) return newModuleName; // TODO: GH#18217
            newModuleName = `${moduleName}.${i}`;
        }
    }

    function getNewModuleName(movedSymbols: ReadonlySymbolSet): string {
        return movedSymbols.forEachEntry(symbolNameNoDefault) || "newFile";
    }

    interface UsageInfo {
        // Symbols whose declarations are moved from the old file to the new file.
        readonly movedSymbols: ReadonlySymbolSet;

        // Symbols declared in the old file that must be imported by the new file. (May not already be exported.)
        readonly newFileImportsFromOldFile: ReadonlySymbolSet;
        // Subset of movedSymbols that are still used elsewhere in the old file and must be imported back.
        readonly oldFileImportsFromNewFile: ReadonlySymbolSet;

        readonly oldImportsNeededByNewFile: ReadonlySymbolSet;
        // Subset of oldImportsNeededByNewFile that are will no longer be used in the old file.
        readonly unusedImportsFromOldFile: ReadonlySymbolSet;
    }
    function getUsageInfo(oldFile: SourceFile, toMove: readonly Statement[], checker: TypeChecker): UsageInfo {
        const movedSymbols = new SymbolSet();
        const oldImportsNeededByNewFile = new SymbolSet();
        const newFileImportsFromOldFile = new SymbolSet();

        const containsJsx = find(toMove, statement => !!(statement.transformFlags & TransformFlags.ContainsJsx));
        const jsxNamespaceSymbol = getJsxNamespaceSymbol(containsJsx);
        if (jsxNamespaceSymbol) { // Might not exist (e.g. in non-compiling code)
            oldImportsNeededByNewFile.add(jsxNamespaceSymbol);
        }

        for (const statement of toMove) {
            forEachTopLevelDeclaration(statement, decl => {
                movedSymbols.add(Debug.checkDefined(isExpressionStatement(decl) ? checker.getSymbolAtLocation(decl.expression.left) : decl.symbol, "Need a symbol here"));
            });
        }
        for (const statement of toMove) {
            forEachReference(statement, checker, symbol => {
                if (!symbol.declarations) return;
                for (const decl of symbol.declarations) {
                    if (isInImport(decl)) {
                        oldImportsNeededByNewFile.add(symbol);
                    }
                    else if (isTopLevelDeclaration(decl) && sourceFileOfTopLevelDeclaration(decl) === oldFile && !movedSymbols.has(symbol)) {
                        newFileImportsFromOldFile.add(symbol);
                    }
                }
            });
        }

        const unusedImportsFromOldFile = oldImportsNeededByNewFile.clone();

        const oldFileImportsFromNewFile = new SymbolSet();
        for (const statement of oldFile.statements) {
            if (contains(toMove, statement)) continue;

            // jsxNamespaceSymbol will only be set iff it is in oldImportsNeededByNewFile.
            if (jsxNamespaceSymbol && !!(statement.transformFlags & TransformFlags.ContainsJsx)) {
                unusedImportsFromOldFile.delete(jsxNamespaceSymbol);
            }

            forEachReference(statement, checker, symbol => {
                if (movedSymbols.has(symbol)) oldFileImportsFromNewFile.add(symbol);
                unusedImportsFromOldFile.delete(symbol);
            });
        }

        return { movedSymbols, newFileImportsFromOldFile, oldFileImportsFromNewFile, oldImportsNeededByNewFile, unusedImportsFromOldFile };

        function getJsxNamespaceSymbol(containsJsx: Node | undefined) {
            if (containsJsx === undefined) {
                return undefined;
            }

            const jsxNamespace = checker.getJsxNamespace(containsJsx);

            // Strictly speaking, this could resolve to a symbol other than the JSX namespace.
            // This will produce erroneous output (probably, an incorrectly copied import) but
            // is expected to be very rare and easily reversible.
            const jsxNamespaceSymbol = checker.resolveName(jsxNamespace, containsJsx, SymbolFlags.Namespace, /*excludeGlobals*/ true);

            return !!jsxNamespaceSymbol && some(jsxNamespaceSymbol.declarations, isInImport)
                ? jsxNamespaceSymbol
                : undefined;
        }
    }

    // Below should all be utilities

    function isInImport(decl: Declaration) {
        switch (decl.kind) {
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportClause:
            case SyntaxKind.NamespaceImport:
                return true;
            case SyntaxKind.VariableDeclaration:
                return isVariableDeclarationInImport(decl as VariableDeclaration);
            case SyntaxKind.BindingElement:
                return isVariableDeclaration(decl.parent.parent) && isVariableDeclarationInImport(decl.parent.parent);
            default:
                return false;
        }
    }
    function isVariableDeclarationInImport(decl: VariableDeclaration) {
        return isSourceFile(decl.parent.parent.parent) &&
            !!decl.initializer && isRequireCall(decl.initializer, /*checkArgumentIsStringLiteralLike*/ true);
    }

    function filterImport(i: SupportedImport, moduleSpecifier: StringLiteralLike, keep: (name: Identifier) => boolean): SupportedImportStatement | undefined {
        switch (i.kind) {
            case SyntaxKind.ImportDeclaration: {
                const clause = i.importClause;
                if (!clause) return undefined;
                const defaultImport = clause.name && keep(clause.name) ? clause.name : undefined;
                const namedBindings = clause.namedBindings && filterNamedBindings(clause.namedBindings, keep);
                return defaultImport || namedBindings
                    ? createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createImportClause(defaultImport, namedBindings), moduleSpecifier)
                    : undefined;
            }
            case SyntaxKind.ImportEqualsDeclaration:
                return keep(i.name) ? i : undefined;
            case SyntaxKind.VariableDeclaration: {
                const name = filterBindingName(i.name, keep);
                return name ? makeVariableStatement(name, i.type, createRequireCall(moduleSpecifier), i.parent.flags) : undefined;
            }
            default:
                return Debug.assertNever(i, `Unexpected import kind ${(i as SupportedImport).kind}`);
        }
    }
    function filterNamedBindings(namedBindings: NamedImportBindings, keep: (name: Identifier) => boolean): NamedImportBindings | undefined {
        if (namedBindings.kind === SyntaxKind.NamespaceImport) {
            return keep(namedBindings.name) ? namedBindings : undefined;
        }
        else {
            const newElements = namedBindings.elements.filter(e => keep(e.name));
            return newElements.length ? createNamedImports(newElements) : undefined;
        }
    }
    function filterBindingName(name: BindingName, keep: (name: Identifier) => boolean): BindingName | undefined {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return keep(name) ? name : undefined;
            case SyntaxKind.ArrayBindingPattern:
                return name;
            case SyntaxKind.ObjectBindingPattern: {
                // We can't handle nested destructurings or property names well here, so just copy them all.
                const newElements = name.elements.filter(prop => prop.propertyName || !isIdentifier(prop.name) || keep(prop.name));
                return newElements.length ? createObjectBindingPattern(newElements) : undefined;
            }
        }
    }

    function forEachReference(node: Node, checker: TypeChecker, onReference: (s: Symbol) => void) {
        node.forEachChild(function cb(node) {
            if (isIdentifier(node) && !isDeclarationName(node)) {
                const sym = checker.getSymbolAtLocation(node);
                if (sym) onReference(sym);
            }
            else {
                node.forEachChild(cb);
            }
        });
    }

    interface ReadonlySymbolSet {
        has(symbol: Symbol): boolean;
        forEach(cb: (symbol: Symbol) => void): void;
        forEachEntry<T>(cb: (symbol: Symbol) => T | undefined): T | undefined;
    }
    class SymbolSet implements ReadonlySymbolSet {
        private map = createMap<Symbol>();
        add(symbol: Symbol): void {
            this.map.set(String(getSymbolId(symbol)), symbol);
        }
        has(symbol: Symbol): boolean {
            return this.map.has(String(getSymbolId(symbol)));
        }
        delete(symbol: Symbol): void {
            this.map.delete(String(getSymbolId(symbol)));
        }
        forEach(cb: (symbol: Symbol) => void): void {
            this.map.forEach(cb);
        }
        forEachEntry<T>(cb: (symbol: Symbol) => T | undefined): T | undefined {
            return forEachEntry(this.map, cb);
        }
        clone(): SymbolSet {
            const clone = new SymbolSet();
            copyEntries(this.map, clone.map);
            return clone;
        }
    }

    type TopLevelExpressionStatement = ExpressionStatement & { expression: BinaryExpression & { left: PropertyAccessExpression } }; // 'exports.x = ...'
    type NonVariableTopLevelDeclaration =
        | FunctionDeclaration
        | ClassDeclaration
        | EnumDeclaration
        | TypeAliasDeclaration
        | InterfaceDeclaration
        | ModuleDeclaration
        | TopLevelExpressionStatement
        | ImportEqualsDeclaration;
    type TopLevelDeclarationStatement = NonVariableTopLevelDeclaration | VariableStatement;
    interface TopLevelVariableDeclaration extends VariableDeclaration { parent: VariableDeclarationList & { parent: VariableStatement; }; }
    type TopLevelDeclaration = NonVariableTopLevelDeclaration | TopLevelVariableDeclaration | BindingElement;
    function isTopLevelDeclaration(node: Node): node is TopLevelDeclaration {
        return isNonVariableTopLevelDeclaration(node) && isSourceFile(node.parent) || isVariableDeclaration(node) && isSourceFile(node.parent.parent.parent);
    }

    function sourceFileOfTopLevelDeclaration(node: TopLevelDeclaration): Node {
        return isVariableDeclaration(node) ? node.parent.parent.parent : node.parent;
    }

    function isTopLevelDeclarationStatement(node: Node): node is TopLevelDeclarationStatement {
        Debug.assert(isSourceFile(node.parent), "Node parent should be a SourceFile");
        return isNonVariableTopLevelDeclaration(node) || isVariableStatement(node);
    }

    function isNonVariableTopLevelDeclaration(node: Node): node is NonVariableTopLevelDeclaration {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                return true;
            default:
                return false;
        }
    }

    function forEachTopLevelDeclaration<T>(statement: Statement, cb: (node: TopLevelDeclaration) => T): T | undefined {
        switch (statement.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                return cb(statement as FunctionDeclaration | ClassDeclaration | EnumDeclaration | ModuleDeclaration | TypeAliasDeclaration | InterfaceDeclaration | ImportEqualsDeclaration);

            case SyntaxKind.VariableStatement:
                return firstDefined((statement as VariableStatement).declarationList.declarations, decl => forEachTopLevelDeclarationInBindingName(decl.name, cb));

            case SyntaxKind.ExpressionStatement: {
                const { expression } = statement as ExpressionStatement;
                return isBinaryExpression(expression) && getAssignmentDeclarationKind(expression) === AssignmentDeclarationKind.ExportsProperty
                    ? cb(statement as TopLevelExpressionStatement)
                    : undefined;
            }
        }
    }
    function forEachTopLevelDeclarationInBindingName<T>(name: BindingName, cb: (node: TopLevelDeclaration) => T): T | undefined {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return cb(cast(name.parent, (x): x is TopLevelVariableDeclaration | BindingElement => isVariableDeclaration(x) || isBindingElement(x)));
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ObjectBindingPattern:
                return firstDefined(name.elements, em => isOmittedExpression(em) ? undefined : forEachTopLevelDeclarationInBindingName(em.name, cb));
            default:
                return Debug.assertNever(name, `Unexpected name kind ${(name as BindingName).kind}`);
        }
    }

    function nameOfTopLevelDeclaration(d: TopLevelDeclaration): Identifier | undefined {
        return isExpressionStatement(d) ? tryCast(d.expression.left.name, isIdentifier) : tryCast(d.name, isIdentifier);
    }

    function getTopLevelDeclarationStatement(d: TopLevelDeclaration): TopLevelDeclarationStatement {
        switch (d.kind) {
            case SyntaxKind.VariableDeclaration:
                return d.parent.parent;
            case SyntaxKind.BindingElement:
                return getTopLevelDeclarationStatement(
                    cast(d.parent.parent, (p): p is TopLevelVariableDeclaration | BindingElement => isVariableDeclaration(p) || isBindingElement(p)));
            default:
                return d;
        }
    }

    function addExportToChanges(sourceFile: SourceFile, decl: TopLevelDeclarationStatement, changes: textChanges.ChangeTracker, useEs6Exports: boolean): void {
        if (isExported(sourceFile, decl, useEs6Exports)) return;
        if (useEs6Exports) {
            if (!isExpressionStatement(decl)) changes.insertExportModifier(sourceFile, decl);
        }
        else {
            const names = getNamesToExportInCommonJS(decl);
            if (names.length !== 0) changes.insertNodesAfter(sourceFile, decl, names.map(createExportAssignment));
        }
    }

    function isExported(sourceFile: SourceFile, decl: TopLevelDeclarationStatement, useEs6Exports: boolean): boolean {
        if (useEs6Exports) {
            return !isExpressionStatement(decl) && hasSyntacticModifier(decl, ModifierFlags.Export);
        }
        else {
            return getNamesToExportInCommonJS(decl).some(name => sourceFile.symbol.exports!.has(escapeLeadingUnderscores(name)));
        }
    }

    function addExport(decl: TopLevelDeclarationStatement, useEs6Exports: boolean): readonly Statement[] | undefined {
        return useEs6Exports ? [addEs6Export(decl)] : addCommonjsExport(decl);
    }
    function addEs6Export(d: TopLevelDeclarationStatement): TopLevelDeclarationStatement {
        const modifiers = concatenate([createModifier(SyntaxKind.ExportKeyword)], d.modifiers);
        switch (d.kind) {
            case SyntaxKind.FunctionDeclaration:
                return updateFunctionDeclaration(d, d.decorators, modifiers, d.asteriskToken, d.name, d.typeParameters, d.parameters, d.type, d.body);
            case SyntaxKind.ClassDeclaration:
                return updateClassDeclaration(d, d.decorators, modifiers, d.name, d.typeParameters, d.heritageClauses, d.members);
            case SyntaxKind.VariableStatement:
                return updateVariableStatement(d, modifiers, d.declarationList);
            case SyntaxKind.ModuleDeclaration:
                return updateModuleDeclaration(d, d.decorators, modifiers, d.name, d.body);
            case SyntaxKind.EnumDeclaration:
                return updateEnumDeclaration(d, d.decorators, modifiers, d.name, d.members);
            case SyntaxKind.TypeAliasDeclaration:
                return updateTypeAliasDeclaration(d, d.decorators, modifiers, d.name, d.typeParameters, d.type);
            case SyntaxKind.InterfaceDeclaration:
                return updateInterfaceDeclaration(d, d.decorators, modifiers, d.name, d.typeParameters, d.heritageClauses, d.members);
            case SyntaxKind.ImportEqualsDeclaration:
                return updateImportEqualsDeclaration(d, d.decorators, modifiers, d.name, d.moduleReference);
            case SyntaxKind.ExpressionStatement:
                return Debug.fail(); // Shouldn't try to add 'export' keyword to `exports.x = ...`
            default:
                return Debug.assertNever(d, `Unexpected declaration kind ${(d as DeclarationStatement).kind}`);
        }
    }
    function addCommonjsExport(decl: TopLevelDeclarationStatement): readonly Statement[] | undefined {
        return [decl, ...getNamesToExportInCommonJS(decl).map(createExportAssignment)];
    }
    function getNamesToExportInCommonJS(decl: TopLevelDeclarationStatement): readonly string[] {
        switch (decl.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
                return [decl.name!.text]; // TODO: GH#18217
            case SyntaxKind.VariableStatement:
                return mapDefined(decl.declarationList.declarations, d => isIdentifier(d.name) ? d.name.text : undefined);
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                return emptyArray;
            case SyntaxKind.ExpressionStatement:
                return Debug.fail("Can't export an ExpressionStatement"); // Shouldn't try to add 'export' keyword to `exports.x = ...`
            default:
                return Debug.assertNever(decl, `Unexpected decl kind ${(decl as TopLevelDeclarationStatement).kind}`);
        }
    }

    /** Creates `exports.x = x;` */
    function createExportAssignment(name: string): Statement {
        return createExpressionStatement(
            createBinary(
                createPropertyAccess(createIdentifier("exports"), createIdentifier(name)),
                SyntaxKind.EqualsToken,
                createIdentifier(name)));
    }
}
