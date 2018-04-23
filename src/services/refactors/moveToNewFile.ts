/* @internal */
namespace ts.refactor {
    const refactorName = "Move to new file";
    registerRefactor(refactorName, {
        getAvailableActions(context): ApplicableRefactorInfo[] {
            if (getStatementsToMove(context) === undefined) return undefined;
            const description = getLocaleSpecificMessage(Diagnostics.Move_to_new_file);
            return [{ name: refactorName, description, actions: [{ name: refactorName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === refactorName);
            const statements = Debug.assertDefined(getStatementsToMove(context));
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, statements, t, context.host));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
    });

    function getStatementsToMove(context: RefactorContext): ReadonlyArray<Statement> | undefined {
        const { file } = context;
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));
        const { statements } = file;

        const startNodeIndex = findIndex(statements, s => s.end > range.pos);
        if (startNodeIndex === -1) return undefined;
        // Can't only partially include the start node or be partially into the next node
        const okStart = range.pos <= statements[startNodeIndex].getStart(file);
        const afterEndNodeIndex = findIndex(statements, s => s.end > range.end, startNodeIndex);
        // Can't be partially into the next node
        const okEnd = afterEndNodeIndex === -1 || afterEndNodeIndex !== 0 && statements[afterEndNodeIndex].getStart(file) >= range.end;
        return okStart && okEnd ? statements.slice(startNodeIndex, afterEndNodeIndex === -1 ? statements.length : afterEndNodeIndex) : undefined;
    }

    function doChange(oldFile: SourceFile, program: Program, toMove: ReadonlyArray<Statement>, changes: textChanges.ChangeTracker, host: LanguageServiceHost): void {
        const checker = program.getTypeChecker();
        const usage = getUsageInfo(oldFile, toMove, checker);

        const currentDirectory = getDirectoryPath(oldFile.fileName);
        const extension = extensionFromPath(oldFile.fileName);
        const newModuleName = makeUniqueModuleName(getNewModuleName(usage.movedSymbols), extension, currentDirectory, host);
        const newFileNameWithExtension = newModuleName + extension;

        // If previous file was global, this is easy.
        changes.createNewFile(oldFile, combinePaths(currentDirectory, newFileNameWithExtension), getNewStatements(oldFile, usage, changes, toMove, program, newModuleName));
    }

    function getNewStatements(
        oldFile: SourceFile, usage: UsageInfo, changes: textChanges.ChangeTracker, toMove: ReadonlyArray<Statement>, program: Program, newModuleName: string,
    ): ReadonlyArray<Statement> {
        const checker = program.getTypeChecker();

        if (!oldFile.externalModuleIndicator) {
            changes.deleteNodeRange(oldFile, first(toMove), last(toMove));
            return toMove;
        }

        const importsFromNewFile = createOldFileImportsFromNewFile(usage.oldFileImportsFromNewFile, newModuleName);
        if (importsFromNewFile) {
            changes.insertNodeBefore(oldFile, oldFile.statements[0], importsFromNewFile, /*blankLineBetween*/ true);
        }

        deleteUnusedOldImports(oldFile, toMove, changes, usage.unusedImportsFromOldFile, checker);
        changes.deleteNodeRange(oldFile, first(toMove), last(toMove));

        updateImportsInOtherFiles(changes, program, oldFile, usage.movedSymbols, newModuleName);

        return [
            ...getNewFileImportsAndAddExportInOldFile(oldFile, usage.oldImportsNeededByNewFile, usage.newFileImportsFromOldFile, changes, checker),
            ...addExports(toMove, usage.oldFileImportsFromNewFile),
        ];
    }

    function deleteUnusedOldImports(oldFile: SourceFile, toMove: ReadonlyArray<Statement>, changes: textChanges.ChangeTracker, toDelete: ReadonlySymbolSet, checker: TypeChecker) {
        for (const statement of oldFile.statements) {
            if (!contains(toMove, statement) && isImportDeclaration(statement)) {
                deleteUnusedImports(oldFile, statement, changes, name => toDelete.has(checker.getSymbolAtLocation(name)));
            }
        }
    }

    function updateImportsInOtherFiles(changes: textChanges.ChangeTracker, program: Program, oldFile: SourceFile, movedSymbols: ReadonlySymbolSet, newModuleName: string): void {
        const checker = program.getTypeChecker();
        for (const sourceFile of program.getSourceFiles()) {
            if (sourceFile === oldFile) continue;
            for (const statement of sourceFile.statements) {
                if (!isImportDeclaration(statement) || !isStringLiteral(statement.moduleSpecifier)) continue;

                const shouldMove = (name: Identifier): boolean => movedSymbols.has(skipAlias(checker.getSymbolAtLocation(name), checker));
                deleteUnusedImports(sourceFile, statement, changes, shouldMove);
                const newModuleSpecifier = combinePaths(getDirectoryPath(statement.moduleSpecifier.text), newModuleName);
                const newImportDeclaration = filterImport(statement, createLiteral(newModuleSpecifier), shouldMove);
                if (newImportDeclaration) changes.insertNodeAfter(sourceFile, statement, newImportDeclaration);
            }
        }
    }

    function createOldFileImportsFromNewFile(newFileNeedExport: ReadonlySymbolSet, newFileNameWithExtension: string): ImportDeclaration | undefined {
        let defaultImport: Identifier | undefined;
        const imports: ImportSpecifier[] = [];
        newFileNeedExport.forEach(symbol => {
            if (symbol.escapedName === InternalSymbolName.Default) {
                defaultImport = createIdentifier(symbolNameNoDefault(symbol));
            }
            else {
                imports.push(createImportSpecifier(undefined, createIdentifier(symbol.name)));
            }
        });
        return makeImportIfNecessary(defaultImport, imports, ensurePathIsRelative(newFileNameWithExtension));
    }

    function addExports(toMove: ReadonlyArray<Statement>, needExport: ReadonlySymbolSet): ReadonlyArray<Statement> {
        return toMove.map(statement => {
            return !hasModifier(statement, ModifierFlags.Export) && forEachTopLevelDeclaration(statement, d => needExport.has(Debug.assertDefined(d.symbol)))
                ? addExport(statement as TopLevelDeclarationStatement)
                : statement;
        });
    }

    function deleteUnusedImports(sourceFile: SourceFile, importDecl: ImportDeclaration, changes: textChanges.ChangeTracker, isUnused: (name: Identifier) => boolean): void {
        if (!importDecl.importClause) return;
        const { name, namedBindings } = importDecl.importClause;
        const defaultUnused = !name || isUnused(name);
        const namedBindingsUnused = !namedBindings ||
            (namedBindings.kind === SyntaxKind.NamespaceImport ? isUnused(namedBindings.name) : namedBindings.elements.every(e => isUnused(e.name)));
        if (defaultUnused && namedBindingsUnused) {
            changes.deleteNode(sourceFile, importDecl);
        }
        else {
            if (name && defaultUnused) {
                changes.deleteNode(sourceFile, name);
            }
            if (namedBindings) {
                if (namedBindingsUnused) {
                    changes.deleteNode(sourceFile, namedBindings);
                }
                else if (namedBindings.kind === SyntaxKind.NamedImports) {
                    for (const element of namedBindings.elements) {
                        if (isUnused(element.name)) changes.deleteNodeInList(sourceFile, element);
                    }
                }
            }
        }
    }

    function getNewFileImportsAndAddExportInOldFile(
        oldFile: SourceFile,
        importsToCopy: ReadonlySymbolSet,
        newFileImportsFromOldFile: ReadonlySymbolSet,
        changes: textChanges.ChangeTracker,
        checker: TypeChecker,
    ): ReadonlyArray<ImportDeclaration> {
        const copiedOldImports = mapDefined(oldFile.statements, oldStatement =>
            isImportDeclaration(oldStatement)
                ? filterImport(oldStatement, oldStatement.moduleSpecifier, name => importsToCopy.has(checker.getSymbolAtLocation(name)))
                : undefined);

        // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
        let oldFileDefault: Identifier | undefined;
        const oldFileNamedImports: ImportSpecifier[] = [];
        const markSeenTop = nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
        newFileImportsFromOldFile.forEach(symbol => {
            for (const decl of symbol.declarations) {
                if (!isTopLevelDeclaration(decl) || !isIdentifier(decl.name)) continue;

                const top = getTopLevelDeclarationStatement(decl);
                if (markSeenTop(top) && !hasModifier(top, ModifierFlags.Export)) {
                    changes.insertExportModifier(oldFile, top);
                }
                if (hasModifier(decl, ModifierFlags.Default)) {
                    oldFileDefault = decl.name;
                }
                else {
                    oldFileNamedImports.push(createImportSpecifier(undefined, decl.name));
                }
            }
        });

        const oldFileImport = makeImportIfNecessary(oldFileDefault, oldFileNamedImports, `./${removeFileExtension(getBaseFileName(oldFile.fileName))}`);
        return [...copiedOldImports, ...(oldFileImport ? [oldFileImport] : emptyArray)];
    }

    function makeUniqueModuleName(moduleName: string, extension: string, inDirectory: string, host: LanguageServiceHost): string {
        while (true) {
            const name = combinePaths(inDirectory, moduleName + extension);
            if (!host.fileExists(name)) return moduleName;
            moduleName += "0";
        }
    }

    function getNewModuleName(movedSymbols: ReadonlySymbolSet): string {
        let name: string | undefined;
        movedSymbols.forEach(s => { if (name === undefined) name = symbolNameNoDefault(s); });
        return name === undefined ? "newFile" : name;
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
    function getUsageInfo(oldFile: SourceFile, toMove: ReadonlyArray<Statement>, checker: TypeChecker): UsageInfo {
        const movedSymbols = new SymbolSet();
        const oldImportsNeededByNewFile = new SymbolSet();
        const newFileImportsFromOldFile = new SymbolSet();

        for (const statement of toMove) {
            forEachTopLevelDeclaration(statement, decl => {
                movedSymbols.add(Debug.assertDefined(decl.symbol));
            });

            forEachReference(statement, checker, symbol => {
                if (!symbol.declarations) return;
                for (const decl of symbol.declarations) {
                    if (isImportSpecifier(decl) || isImportClause(decl.parent)) {
                        oldImportsNeededByNewFile.add(symbol);
                    }
                    else if (isTopLevelDeclaration(decl) && !movedSymbols.has(symbol)) {
                        newFileImportsFromOldFile.add(symbol);
                    }
                }
            });
        }

        const unusedImportsFromOldFile = oldImportsNeededByNewFile.clone();

        const oldFileImportsFromNewFile = new SymbolSet();
        for (const statement of oldFile.statements) {
            if (contains(toMove, statement)) continue;

            forEachReference(statement, checker, symbol => {
                if (movedSymbols.has(symbol)) oldFileImportsFromNewFile.add(symbol);
                unusedImportsFromOldFile.delete(symbol);
            });
        }

        return { movedSymbols, newFileImportsFromOldFile, oldFileImportsFromNewFile, oldImportsNeededByNewFile, unusedImportsFromOldFile };
    }

    // Below should all be utilities

    function filterImport(i: ImportDeclaration, moduleSpecifier: Expression, keep: (name: Identifier) => boolean): ImportDeclaration | undefined {
        const clause = i.importClause;
        const defaultImport = clause.name && keep(clause.name) ? clause.name : undefined;
        const namedBindings = clause.namedBindings && filterNamedBindings(clause.namedBindings, keep);
        return defaultImport || namedBindings ? createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createImportClause(defaultImport, namedBindings), moduleSpecifier) : undefined;
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
        clone(): SymbolSet {
            const clone = new SymbolSet();
            copyEntries(this.map, clone.map);
            return clone;
        }
    }

    type NonVariableTopLevelDeclaration = FunctionDeclaration | ClassDeclaration | EnumDeclaration | TypeAliasDeclaration | InterfaceDeclaration | ModuleDeclaration;
    type TopLevelDeclarationStatement = NonVariableTopLevelDeclaration | VariableStatement;
    interface TopLevelVariableDeclaration extends VariableDeclaration { parent: VariableDeclarationList & { parent: VariableStatement; }; }
    type TopLevelDeclaration = NonVariableTopLevelDeclaration | TopLevelVariableDeclaration;
    function isTopLevelDeclaration(node: Node): node is TopLevelDeclaration {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.InterfaceDeclaration:
                return isSourceFile(node.parent);
            case SyntaxKind.VariableDeclaration:
                return isSourceFile((node as VariableDeclaration).parent.parent.parent);
        }
    }

    function forEachTopLevelDeclaration<T>(statement: Statement, cb: (node: TopLevelDeclaration) => T): T {
        switch (statement.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.InterfaceDeclaration:
                return cb(statement as FunctionDeclaration | ClassDeclaration | EnumDeclaration | ModuleDeclaration | TypeAliasDeclaration | InterfaceDeclaration);

            case SyntaxKind.VariableStatement:
                return forEach((statement as VariableStatement).declarationList.declarations as ReadonlyArray<TopLevelVariableDeclaration>, cb);
        }
    }

    function getTopLevelDeclarationStatement(d: TopLevelDeclaration): TopLevelDeclarationStatement {
        return isVariableDeclaration(d) ? d.parent.parent : d;
    }

    function addExport(d: TopLevelDeclarationStatement): TopLevelDeclarationStatement {
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
            default:
                Debug.assertNever(d);
        }
    }
}
