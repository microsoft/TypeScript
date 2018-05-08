/* @internal */
namespace ts.refactor {
    const refactorName = "Move to a new file";
    registerRefactor(refactorName, {
        getAvailableActions(context): ApplicableRefactorInfo[] {
            if (!context.preferences.allowTextChangesInNewFiles || getStatementsToMove(context) === undefined) return undefined;
            const description = getLocaleSpecificMessage(Diagnostics.Move_to_a_new_file);
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
        if (range.pos > statements[startNodeIndex].getStart(file)) return undefined;
        const afterEndNodeIndex = findIndex(statements, s => s.end > range.end, startNodeIndex);
        // Can't be partially into the next node
        if (afterEndNodeIndex !== -1 && (afterEndNodeIndex === 0 || statements[afterEndNodeIndex].getStart(file) < range.end)) return undefined;

        return statements.slice(startNodeIndex, afterEndNodeIndex === -1 ? statements.length : afterEndNodeIndex);
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

        addNewFileToTsconfig(program, changes, oldFile.fileName, newFileNameWithExtension, hostGetCanonicalFileName(host));
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

    function getNewStatements(
        oldFile: SourceFile, usage: UsageInfo, changes: textChanges.ChangeTracker, toMove: ReadonlyArray<Statement>, program: Program, newModuleName: string,
    ): ReadonlyArray<Statement> {
        const checker = program.getTypeChecker();

        if (!oldFile.externalModuleIndicator && !oldFile.commonJsModuleIndicator) {
            changes.deleteNodeRange(oldFile, first(toMove), last(toMove));
            return toMove;
        }

        const useEs6ModuleSyntax = !!oldFile.externalModuleIndicator;
        const importsFromNewFile = createOldFileImportsFromNewFile(usage.oldFileImportsFromNewFile, newModuleName, useEs6ModuleSyntax);
        if (importsFromNewFile) {
            changes.insertNodeBefore(oldFile, oldFile.statements[0], importsFromNewFile, /*blankLineBetween*/ true);
        }

        deleteUnusedOldImports(oldFile, toMove, changes, usage.unusedImportsFromOldFile, checker);
        changes.deleteNodeRange(oldFile, first(toMove), last(toMove));

        updateImportsInOtherFiles(changes, program, oldFile, usage.movedSymbols, newModuleName);

        return [
            ...getNewFileImportsAndAddExportInOldFile(oldFile, usage.oldImportsNeededByNewFile, usage.newFileImportsFromOldFile, changes, checker, useEs6ModuleSyntax),
            ...addExports(oldFile, toMove, usage.oldFileImportsFromNewFile, useEs6ModuleSyntax),
        ];
    }

    function deleteUnusedOldImports(oldFile: SourceFile, toMove: ReadonlyArray<Statement>, changes: textChanges.ChangeTracker, toDelete: ReadonlySymbolSet, checker: TypeChecker) {
        for (const statement of oldFile.statements) {
            if (contains(toMove, statement)) continue;
            forEachImportInStatement(statement, i => deleteUnusedImports(oldFile, i, changes, name => toDelete.has(checker.getSymbolAtLocation(name))));
        }
    }

    function updateImportsInOtherFiles(changes: textChanges.ChangeTracker, program: Program, oldFile: SourceFile, movedSymbols: ReadonlySymbolSet, newModuleName: string): void {
        const checker = program.getTypeChecker();
        for (const sourceFile of program.getSourceFiles()) {
            if (sourceFile === oldFile) continue;
            for (const statement of sourceFile.statements) {
                forEachImportInStatement(statement, importNode => {
                    const shouldMove = (name: Identifier): boolean => {
                        const symbol = isBindingElement(name.parent)
                            ? getPropertySymbolFromBindingElement(checker, name.parent as BindingElement & { name: Identifier })
                            : skipAlias(checker.getSymbolAtLocation(name), checker);
                        return !!symbol && movedSymbols.has(symbol);
                    };
                    deleteUnusedImports(sourceFile, importNode, changes, shouldMove); // These will be changed to imports from the new file
                    const newModuleSpecifier = combinePaths(getDirectoryPath(moduleSpecifierFromImport(importNode).text), newModuleName);
                    const newImportDeclaration = filterImport(importNode, createLiteral(newModuleSpecifier), shouldMove);
                    if (newImportDeclaration) changes.insertNodeAfter(sourceFile, statement, newImportDeclaration);
                });
            }
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

    function createOldFileImportsFromNewFile(newFileNeedExport: ReadonlySymbolSet, newFileNameWithExtension: string, useEs6Imports: boolean): Statement | undefined {
        let defaultImport: Identifier | undefined;
        const imports: string[] = [];
        newFileNeedExport.forEach(symbol => {
            if (symbol.escapedName === InternalSymbolName.Default) {
                defaultImport = createIdentifier(symbolNameNoDefault(symbol));
            }
            else {
                imports.push(symbol.name);
            }
        });
        return makeImportOrRequire(defaultImport, imports, newFileNameWithExtension, useEs6Imports);
    }

    function makeImportOrRequire(defaultImport: Identifier | undefined, imports: ReadonlyArray<string>, path: string, useEs6Imports: boolean): Statement | undefined {
        path = ensurePathIsNonModuleName(path);
        if (useEs6Imports) {
            const specifiers = imports.map(i => createImportSpecifier(/*propertyName*/ undefined, createIdentifier(i)));
            return makeImportIfNecessary(defaultImport, specifiers, path);
        }
        else {
            Debug.assert(!defaultImport); // If there's a default export, it should have been an es6 module.
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

    function addExports(sourceFile: SourceFile, toMove: ReadonlyArray<Statement>, needExport: ReadonlySymbolSet, useEs6Exports: boolean): ReadonlyArray<Statement> {
        return flatMap(toMove, statement => {
            if (isTopLevelDeclarationStatement(statement) &&
                !isExported(sourceFile, statement, useEs6Exports) &&
                forEachTopLevelDeclaration(statement, d => needExport.has(Debug.assertDefined(d.symbol)))) {
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
                    changes.deleteNode(sourceFile, importDecl);
                }
                break;
            case SyntaxKind.VariableDeclaration:
                deleteUnusedImportsInVariableDeclaration(sourceFile, importDecl, changes, isUnused);
                break;
            default:
                Debug.assertNever(importDecl);
        }
    }
    function deleteUnusedImportsInDeclaration(sourceFile: SourceFile, importDecl: ImportDeclaration, changes: textChanges.ChangeTracker, isUnused: (name: Identifier) => boolean): void {
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
    function deleteUnusedImportsInVariableDeclaration(sourceFile: SourceFile, varDecl: VariableDeclaration, changes: textChanges.ChangeTracker, isUnused: (name: Identifier) => boolean) {
        const { name } = varDecl;
        switch (name.kind) {
            case SyntaxKind.Identifier:
                if (isUnused(name)) {
                    changes.deleteNode(sourceFile, name);
                }
                break;
            case SyntaxKind.ArrayBindingPattern:
                break;
            case SyntaxKind.ObjectBindingPattern:
                if (name.elements.every(e => isIdentifier(e.name) && isUnused(e.name))) {
                    changes.deleteNode(sourceFile,
                        isVariableDeclarationList(varDecl.parent) && varDecl.parent.declarations.length === 1 ? varDecl.parent.parent : varDecl);
                }
                else {
                    for (const element of name.elements) {
                        if (isIdentifier(element.name) && isUnused(element.name)) {
                            changes.deleteNode(sourceFile, element.name);
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
    ): ReadonlyArray<SupportedImportStatement> {
        const copiedOldImports: SupportedImportStatement[] = [];
        for (const oldStatement of oldFile.statements) {
            forEachImportInStatement(oldStatement, i => {
                append(copiedOldImports, filterImport(i, moduleSpecifierFromImport(i), name => importsToCopy.has(checker.getSymbolAtLocation(name))));
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
                if (hasModifier(decl, ModifierFlags.Default)) {
                    oldFileDefault = name;
                }
                else {
                    oldFileNamedImports.push(name.text);
                }
            }
        });

        append(copiedOldImports, makeImportOrRequire(oldFileDefault, oldFileNamedImports, removeFileExtension(getBaseFileName(oldFile.fileName)), useEs6ModuleSyntax));
        return copiedOldImports;
    }

    function makeUniqueModuleName(moduleName: string, extension: string, inDirectory: string, host: LanguageServiceHost): string {
        let newModuleName = moduleName;
        for (let i = 1; ; i++) {
            const name = combinePaths(inDirectory, newModuleName + extension);
            if (!host.fileExists(name)) return newModuleName;
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
    function getUsageInfo(oldFile: SourceFile, toMove: ReadonlyArray<Statement>, checker: TypeChecker): UsageInfo {
        const movedSymbols = new SymbolSet();
        const oldImportsNeededByNewFile = new SymbolSet();
        const newFileImportsFromOldFile = new SymbolSet();

        for (const statement of toMove) {
            forEachTopLevelDeclaration(statement, decl => {
                movedSymbols.add(Debug.assertDefined(isExpressionStatement(decl) ? checker.getSymbolAtLocation(decl.expression.left) : decl.symbol));
            });
        }
        for (const statement of toMove) {
            forEachReference(statement, checker, symbol => {
                if (!symbol.declarations) return;
                for (const decl of symbol.declarations) {
                    if (isInImport(decl)) {
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

    function isInImport(decl: Declaration) {
        switch (decl.kind) {
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportClause:
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
            isRequireCall(decl.initializer, /*checkArgumentIsStringLiteralLike*/ true);
    }

    function filterImport(i: SupportedImport, moduleSpecifier: StringLiteralLike, keep: (name: Identifier) => boolean): SupportedImportStatement | undefined {
        switch (i.kind) {
            case SyntaxKind.ImportDeclaration: {
                const clause = i.importClause;
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
                return Debug.assertNever(i);
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
    type TopLevelDeclaration = NonVariableTopLevelDeclaration | TopLevelVariableDeclaration;
    function isTopLevelDeclaration(node: Node): node is TopLevelDeclaration {
        return isNonVariableTopLevelDeclaration(node) || isVariableDeclaration(node) && isSourceFile(node.parent.parent.parent);
    }

    function isTopLevelDeclarationStatement(node: Node): node is TopLevelDeclarationStatement {
        Debug.assert(isSourceFile(node.parent));
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

    function forEachTopLevelDeclaration<T>(statement: Statement, cb: (node: TopLevelDeclaration) => T): T {
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
                return forEach((statement as VariableStatement).declarationList.declarations as ReadonlyArray<TopLevelVariableDeclaration>, cb);

            case SyntaxKind.ExpressionStatement: {
                const { expression } = statement as ExpressionStatement;
                return isBinaryExpression(expression) && getSpecialPropertyAssignmentKind(expression) === SpecialPropertyAssignmentKind.ExportsProperty
                    ? cb(statement as TopLevelExpressionStatement)
                    : undefined;
            }
        }
    }

    function nameOfTopLevelDeclaration(d: TopLevelDeclaration): Identifier | undefined {
        return d.kind === SyntaxKind.ExpressionStatement ? d.expression.left.name : tryCast(d.name, isIdentifier);
    }

    function getTopLevelDeclarationStatement(d: TopLevelDeclaration): TopLevelDeclarationStatement {
        return isVariableDeclaration(d) ? d.parent.parent : d;
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
            return !isExpressionStatement(decl) && hasModifier(decl, ModifierFlags.Export);
        }
        else {
            return getNamesToExportInCommonJS(decl).some(name => sourceFile.symbol.exports.has(escapeLeadingUnderscores(name)));
        }
    }

    function addExport(decl: TopLevelDeclarationStatement, useEs6Exports: boolean): ReadonlyArray<Statement> | undefined {
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
                return Debug.assertNever(d);
        }
    }
    function addCommonjsExport(decl: TopLevelDeclarationStatement): ReadonlyArray<Statement> | undefined {
        return [decl, ...getNamesToExportInCommonJS(decl).map(createExportAssignment)];
    }
    function getNamesToExportInCommonJS(decl: TopLevelDeclarationStatement): ReadonlyArray<string> {
        switch (decl.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
                return [decl.name.text];
            case SyntaxKind.VariableStatement:
                return mapDefined(decl.declarationList.declarations, d => isIdentifier(d.name) ? d.name.text : undefined);
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                return undefined;
            case SyntaxKind.ExpressionStatement:
                return Debug.fail(); // Shouldn't try to add 'export' keyword to `exports.x = ...`
            default:
                Debug.assertNever(decl);
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
