/* @internal */
namespace ts.refactor {
const refactorName = "Move to a new file";
const description = ts.getLocaleSpecificMessage(ts.Diagnostics.Move_to_a_new_file);

const moveToNewFileAction = {
    name: refactorName,
    description,
    kind: "refactor.move.newFile",
};
ts.refactor.registerRefactor(refactorName, {
    kinds: [moveToNewFileAction.kind],
    getAvailableActions: function getRefactorActionsToMoveToNewFile(context): readonly ts.ApplicableRefactorInfo[] {
        const statements = getStatementsToMove(context);
        if (context.preferences.allowTextChangesInNewFiles && statements) {
            return [{ name: refactorName, description, actions: [moveToNewFileAction] }];
        }
        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{ name: refactorName, description, actions:
                [{ ...moveToNewFileAction, notApplicableReason: ts.getLocaleSpecificMessage(ts.Diagnostics.Selection_is_not_a_valid_statement_or_statements) }]
            }];
        }
        return ts.emptyArray;
    },
    getEditsForAction: function getRefactorEditsToMoveToNewFile(context, actionName): ts.RefactorEditInfo {
        ts.Debug.assert(actionName === refactorName, "Wrong refactor invoked");
        const statements = ts.Debug.checkDefined(getStatementsToMove(context));
        const edits = ts.textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, statements, t, context.host, context.preferences));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    }
});

interface RangeToMove { readonly toMove: readonly ts.Statement[]; readonly afterLast: ts.Statement | undefined; }
function getRangeToMove(context: ts.RefactorContext): RangeToMove | undefined {
    const { file } = context;
    const range = ts.createTextRangeFromSpan(ts.getRefactorContextSpan(context));
    const { statements } = file;

    const startNodeIndex = ts.findIndex(statements, s => s.end > range.pos);
    if (startNodeIndex === -1) return undefined;

    const startStatement = statements[startNodeIndex];
    if (ts.isNamedDeclaration(startStatement) && startStatement.name && ts.rangeContainsRange(startStatement.name, range)) {
        return { toMove: [statements[startNodeIndex]], afterLast: statements[startNodeIndex + 1] };
    }

    // Can't only partially include the start node or be partially into the next node
    if (range.pos > startStatement.getStart(file)) return undefined;
    const afterEndNodeIndex = ts.findIndex(statements, s => s.end > range.end, startNodeIndex);
    // Can't be partially into the next node
    if (afterEndNodeIndex !== -1 && (afterEndNodeIndex === 0 || statements[afterEndNodeIndex].getStart(file) < range.end)) return undefined;

    return {
        toMove: statements.slice(startNodeIndex, afterEndNodeIndex === -1 ? statements.length : afterEndNodeIndex),
        afterLast: afterEndNodeIndex === -1 ? undefined : statements[afterEndNodeIndex],
    };
}

function doChange(oldFile: ts.SourceFile, program: ts.Program, toMove: ToMove, changes: ts.textChanges.ChangeTracker, host: ts.LanguageServiceHost, preferences: ts.UserPreferences): void {
    const checker = program.getTypeChecker();
    const usage = getUsageInfo(oldFile, toMove.all, checker);

    const currentDirectory = ts.getDirectoryPath(oldFile.fileName);
    const extension = ts.extensionFromPath(oldFile.fileName);
    const newModuleName = makeUniqueModuleName(getNewModuleName(usage.oldFileImportsFromNewFile, usage.movedSymbols), extension, currentDirectory, host);
    const newFileNameWithExtension = newModuleName + extension;

    // If previous file was global, this is easy.
    changes.createNewFile(oldFile, ts.combinePaths(currentDirectory, newFileNameWithExtension), getNewStatementsAndRemoveFromOldFile(oldFile, usage, changes, toMove, program, newModuleName, preferences));

    addNewFileToTsconfig(program, changes, oldFile.fileName, newFileNameWithExtension, ts.hostGetCanonicalFileName(host));
}

interface StatementRange {
    readonly first: ts.Statement;
    readonly afterLast: ts.Statement | undefined;
}
interface ToMove {
    readonly all: readonly ts.Statement[];
    readonly ranges: readonly StatementRange[];
}

function getStatementsToMove(context: ts.RefactorContext): ToMove | undefined {
    const rangeToMove = getRangeToMove(context);
    if (rangeToMove === undefined) return undefined;
    const all: ts.Statement[] = [];
    const ranges: StatementRange[] = [];
    const { toMove, afterLast } = rangeToMove;
    ts.getRangesWhere(toMove, isAllowedStatementToMove, (start, afterEndIndex) => {
        for (let i = start; i < afterEndIndex; i++) all.push(toMove[i]);
        ranges.push({ first: toMove[start], afterLast });
    });
    return all.length === 0 ? undefined : { all, ranges };
}

function isAllowedStatementToMove(statement: ts.Statement): boolean {
    // Filters imports and prologue directives out of the range of statements to move.
    // Imports will be copied to the new file anyway, and may still be needed in the old file.
    // Prologue directives will be copied to the new file and should be left in the old file.
    return !isPureImport(statement) && !ts.isPrologueDirective(statement);
}

function isPureImport(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
            return true;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return !ts.hasSyntacticModifier(node, ts.ModifierFlags.Export);
        case ts.SyntaxKind.VariableStatement:
            return (node as ts.VariableStatement).declarationList.declarations.every(d => !!d.initializer && ts.isRequireCall(d.initializer, /*checkArgumentIsStringLiteralLike*/ true));
        default:
            return false;
    }
}

function addNewFileToTsconfig(program: ts.Program, changes: ts.textChanges.ChangeTracker, oldFileName: string, newFileNameWithExtension: string, getCanonicalFileName: ts.GetCanonicalFileName): void {
    const cfg = program.getCompilerOptions().configFile;
    if (!cfg) return;

    const newFileAbsolutePath = ts.normalizePath(ts.combinePaths(oldFileName, "..", newFileNameWithExtension));
    const newFilePath = ts.getRelativePathFromFile(cfg.fileName, newFileAbsolutePath, getCanonicalFileName);

    const cfgObject = cfg.statements[0] && ts.tryCast(cfg.statements[0].expression, ts.isObjectLiteralExpression);
    const filesProp = cfgObject && ts.find(cfgObject.properties, (prop): prop is ts.PropertyAssignment =>
        ts.isPropertyAssignment(prop) && ts.isStringLiteral(prop.name) && prop.name.text === "files");
    if (filesProp && ts.isArrayLiteralExpression(filesProp.initializer)) {
        changes.insertNodeInListAfter(cfg, ts.last(filesProp.initializer.elements), ts.factory.createStringLiteral(newFilePath), filesProp.initializer.elements);
    }
}

function getNewStatementsAndRemoveFromOldFile(
    oldFile: ts.SourceFile, usage: UsageInfo, changes: ts.textChanges.ChangeTracker, toMove: ToMove, program: ts.Program, newModuleName: string, preferences: ts.UserPreferences,
) {
    const checker = program.getTypeChecker();
    const prologueDirectives = ts.takeWhile(oldFile.statements, ts.isPrologueDirective);
    if (oldFile.externalModuleIndicator === undefined && oldFile.commonJsModuleIndicator === undefined && usage.oldImportsNeededByNewFile.size() === 0) {
        deleteMovedStatements(oldFile, toMove.ranges, changes);
        return [...prologueDirectives, ...toMove.all];
    }

    const useEsModuleSyntax = !!oldFile.externalModuleIndicator;
    const quotePreference = ts.getQuotePreference(oldFile, preferences);
    const importsFromNewFile = createOldFileImportsFromNewFile(usage.oldFileImportsFromNewFile, newModuleName, useEsModuleSyntax, quotePreference);
    if (importsFromNewFile) {
        ts.insertImports(changes, oldFile, importsFromNewFile, /*blankLineBetween*/ true);
    }

    deleteUnusedOldImports(oldFile, toMove.all, changes, usage.unusedImportsFromOldFile, checker);
    deleteMovedStatements(oldFile, toMove.ranges, changes);
    updateImportsInOtherFiles(changes, program, oldFile, usage.movedSymbols, newModuleName);

    const imports = getNewFileImportsAndAddExportInOldFile(oldFile, usage.oldImportsNeededByNewFile, usage.newFileImportsFromOldFile, changes, checker, useEsModuleSyntax, quotePreference);
    const body = addExports(oldFile, toMove.all, usage.oldFileImportsFromNewFile, useEsModuleSyntax);
    if (imports.length && body.length) {
        return [
            ...prologueDirectives,
            ...imports,
            ts.SyntaxKind.NewLineTrivia as const,
            ...body
        ];
    }

    return [
        ...prologueDirectives,
        ...imports,
        ...body,
    ];
}

function deleteMovedStatements(sourceFile: ts.SourceFile, moved: readonly StatementRange[], changes: ts.textChanges.ChangeTracker) {
    for (const { first, afterLast } of moved) {
        changes.deleteNodeRangeExcludingEnd(sourceFile, first, afterLast);
    }
}

function deleteUnusedOldImports(oldFile: ts.SourceFile, toMove: readonly ts.Statement[], changes: ts.textChanges.ChangeTracker, toDelete: ReadonlySymbolSet, checker: ts.TypeChecker) {
    for (const statement of oldFile.statements) {
        if (ts.contains(toMove, statement)) continue;
        forEachImportInStatement(statement, i => deleteUnusedImports(oldFile, i, changes, name => toDelete.has(checker.getSymbolAtLocation(name)!)));
    }
}

function updateImportsInOtherFiles(changes: ts.textChanges.ChangeTracker, program: ts.Program, oldFile: ts.SourceFile, movedSymbols: ReadonlySymbolSet, newModuleName: string): void {
    const checker = program.getTypeChecker();
    for (const sourceFile of program.getSourceFiles()) {
        if (sourceFile === oldFile) continue;
        for (const statement of sourceFile.statements) {
            forEachImportInStatement(statement, importNode => {
                if (checker.getSymbolAtLocation(moduleSpecifierFromImport(importNode)) !== oldFile.symbol) return;

                const shouldMove = (name: ts.Identifier): boolean => {
                    const symbol = ts.isBindingElement(name.parent)
                        ? ts.getPropertySymbolFromBindingElement(checker, name.parent as ts.ObjectBindingElementWithoutPropertyName)
                        : ts.skipAlias(checker.getSymbolAtLocation(name)!, checker); // TODO: GH#18217
                    return !!symbol && movedSymbols.has(symbol);
                };
                deleteUnusedImports(sourceFile, importNode, changes, shouldMove); // These will be changed to imports from the new file
                const newModuleSpecifier = ts.combinePaths(ts.getDirectoryPath(moduleSpecifierFromImport(importNode).text), newModuleName);
                const newImportDeclaration = filterImport(importNode, ts.factory.createStringLiteral(newModuleSpecifier), shouldMove);
                if (newImportDeclaration) changes.insertNodeAfter(sourceFile, statement, newImportDeclaration);

                const ns = getNamespaceLikeImport(importNode);
                if (ns) updateNamespaceLikeImport(changes, sourceFile, checker, movedSymbols, newModuleName, newModuleSpecifier, ns, importNode);
            });
        }
    }
}

function getNamespaceLikeImport(node: SupportedImport): ts.Identifier | undefined {
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
            return node.importClause && node.importClause.namedBindings && node.importClause.namedBindings.kind === ts.SyntaxKind.NamespaceImport ?
                node.importClause.namedBindings.name : undefined;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return node.name;
        case ts.SyntaxKind.VariableDeclaration:
            return ts.tryCast(node.name, ts.isIdentifier);
        default:
            return ts.Debug.assertNever(node, `Unexpected node kind ${(node as SupportedImport).kind}`);
    }
}

function updateNamespaceLikeImport(
    changes: ts.textChanges.ChangeTracker,
    sourceFile: ts.SourceFile,
    checker: ts.TypeChecker,
    movedSymbols: ReadonlySymbolSet,
    newModuleName: string,
    newModuleSpecifier: string,
    oldImportId: ts.Identifier,
    oldImportNode: SupportedImport,
): void {
    const preferredNewNamespaceName = ts.codefix.moduleSpecifierToValidIdentifier(newModuleName, ts.ScriptTarget.ESNext);
    let needUniqueName = false;
    const toChange: ts.Identifier[] = [];
    ts.FindAllReferences.Core.eachSymbolReferenceInFile(oldImportId, checker, sourceFile, ref => {
        if (!ts.isPropertyAccessExpression(ref.parent)) return;
        needUniqueName = needUniqueName || !!checker.resolveName(preferredNewNamespaceName, ref, ts.SymbolFlags.All, /*excludeGlobals*/ true);
        if (movedSymbols.has(checker.getSymbolAtLocation(ref.parent.name)!)) {
            toChange.push(ref);
        }
    });

    if (toChange.length) {
        const newNamespaceName = needUniqueName ? ts.getUniqueName(preferredNewNamespaceName, sourceFile) : preferredNewNamespaceName;
        for (const ref of toChange) {
            changes.replaceNode(sourceFile, ref, ts.factory.createIdentifier(newNamespaceName));
        }
        changes.insertNodeAfter(sourceFile, oldImportNode, updateNamespaceLikeImportNode(oldImportNode, newModuleName, newModuleSpecifier));
    }
}

function updateNamespaceLikeImportNode(node: SupportedImport, newNamespaceName: string, newModuleSpecifier: string): ts.Node {
    const newNamespaceId = ts.factory.createIdentifier(newNamespaceName);
    const newModuleString = ts.factory.createStringLiteral(newModuleSpecifier);
    switch (node.kind) {
        case ts.SyntaxKind.ImportDeclaration:
            return ts.factory.createImportDeclaration(
                /*modifiers*/ undefined,
                ts.factory.createImportClause(/*isTypeOnly*/ false, /*name*/ undefined, ts.factory.createNamespaceImport(newNamespaceId)),
                newModuleString,
                /*assertClause*/ undefined);
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return ts.factory.createImportEqualsDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, newNamespaceId, ts.factory.createExternalModuleReference(newModuleString));
        case ts.SyntaxKind.VariableDeclaration:
            return ts.factory.createVariableDeclaration(newNamespaceId, /*exclamationToken*/ undefined, /*type*/ undefined, createRequireCall(newModuleString));
        default:
            return ts.Debug.assertNever(node, `Unexpected node kind ${(node as SupportedImport).kind}`);
    }
}

function moduleSpecifierFromImport(i: SupportedImport): ts.StringLiteralLike {
    return (i.kind === ts.SyntaxKind.ImportDeclaration ? i.moduleSpecifier
        : i.kind === ts.SyntaxKind.ImportEqualsDeclaration ? i.moduleReference.expression
        : i.initializer.arguments[0]);
}

function forEachImportInStatement(statement: ts.Statement, cb: (importNode: SupportedImport) => void): void {
    if (ts.isImportDeclaration(statement)) {
        if (ts.isStringLiteral(statement.moduleSpecifier)) cb(statement as SupportedImport);
    }
    else if (ts.isImportEqualsDeclaration(statement)) {
        if (ts.isExternalModuleReference(statement.moduleReference) && ts.isStringLiteralLike(statement.moduleReference.expression)) {
            cb(statement as SupportedImport);
        }
    }
    else if (ts.isVariableStatement(statement)) {
        for (const decl of statement.declarationList.declarations) {
            if (decl.initializer && ts.isRequireCall(decl.initializer, /*checkArgumentIsStringLiteralLike*/ true)) {
                cb(decl as SupportedImport);
            }
        }
    }
}

type SupportedImport =
    | ts.ImportDeclaration & { moduleSpecifier: ts.StringLiteralLike }
    | ts.ImportEqualsDeclaration & { moduleReference: ts.ExternalModuleReference & { expression: ts.StringLiteralLike } }
    | ts.VariableDeclaration & { initializer: ts.RequireOrImportCall };
type SupportedImportStatement =
    | ts.ImportDeclaration
    | ts.ImportEqualsDeclaration
    | ts.VariableStatement;

function createOldFileImportsFromNewFile(newFileNeedExport: ReadonlySymbolSet, newFileNameWithExtension: string, useEs6Imports: boolean, quotePreference: ts.QuotePreference): ts.AnyImportOrRequireStatement | undefined {
    let defaultImport: ts.Identifier | undefined;
    const imports: string[] = [];
    newFileNeedExport.forEach(symbol => {
        if (symbol.escapedName === ts.InternalSymbolName.Default) {
            defaultImport = ts.factory.createIdentifier(ts.symbolNameNoDefault(symbol)!); // TODO: GH#18217
        }
        else {
            imports.push(symbol.name);
        }
    });
    return makeImportOrRequire(defaultImport, imports, newFileNameWithExtension, useEs6Imports, quotePreference);
}

function makeImportOrRequire(defaultImport: ts.Identifier | undefined, imports: readonly string[], path: string, useEs6Imports: boolean, quotePreference: ts.QuotePreference): ts.AnyImportOrRequireStatement | undefined {
    path = ts.ensurePathIsNonModuleName(path);
    if (useEs6Imports) {
        const specifiers = imports.map(i => ts.factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.factory.createIdentifier(i)));
        return ts.makeImportIfNecessary(defaultImport, specifiers, path, quotePreference);
    }
    else {
        ts.Debug.assert(!defaultImport, "No default import should exist"); // If there's a default export, it should have been an es6 module.
        const bindingElements = imports.map(i => ts.factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, i));
        return bindingElements.length
            ? makeVariableStatement(ts.factory.createObjectBindingPattern(bindingElements), /*type*/ undefined, createRequireCall(ts.factory.createStringLiteral(path))) as ts.RequireVariableStatement
            : undefined;
    }
}

function makeVariableStatement(name: ts.BindingName, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined, flags: ts.NodeFlags = ts.NodeFlags.Const) {
    return ts.factory.createVariableStatement(/*modifiers*/ undefined, ts.factory.createVariableDeclarationList([ts.factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, type, initializer)], flags));
}

function createRequireCall(moduleSpecifier: ts.StringLiteralLike): ts.CallExpression {
    return ts.factory.createCallExpression(ts.factory.createIdentifier("require"), /*typeArguments*/ undefined, [moduleSpecifier]);
}

function addExports(sourceFile: ts.SourceFile, toMove: readonly ts.Statement[], needExport: ReadonlySymbolSet, useEs6Exports: boolean): readonly ts.Statement[] {
    return ts.flatMap(toMove, statement => {
        if (isTopLevelDeclarationStatement(statement) &&
            !isExported(sourceFile, statement, useEs6Exports) &&
            forEachTopLevelDeclaration(statement, d => needExport.has(ts.Debug.checkDefined(d.symbol)))) {
            const exports = addExport(statement, useEs6Exports);
            if (exports) return exports;
        }
        return statement;
    });
}

function deleteUnusedImports(sourceFile: ts.SourceFile, importDecl: SupportedImport, changes: ts.textChanges.ChangeTracker, isUnused: (name: ts.Identifier) => boolean): void {
    switch (importDecl.kind) {
        case ts.SyntaxKind.ImportDeclaration:
            deleteUnusedImportsInDeclaration(sourceFile, importDecl, changes, isUnused);
            break;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            if (isUnused(importDecl.name)) {
                changes.delete(sourceFile, importDecl);
            }
            break;
        case ts.SyntaxKind.VariableDeclaration:
            deleteUnusedImportsInVariableDeclaration(sourceFile, importDecl, changes, isUnused);
            break;
        default:
            ts.Debug.assertNever(importDecl, `Unexpected import decl kind ${(importDecl as SupportedImport).kind}`);
    }
}
function deleteUnusedImportsInDeclaration(sourceFile: ts.SourceFile, importDecl: ts.ImportDeclaration, changes: ts.textChanges.ChangeTracker, isUnused: (name: ts.Identifier) => boolean): void {
    if (!importDecl.importClause) return;
    const { name, namedBindings } = importDecl.importClause;
    const defaultUnused = !name || isUnused(name);
    const namedBindingsUnused = !namedBindings ||
        (namedBindings.kind === ts.SyntaxKind.NamespaceImport ? isUnused(namedBindings.name) : namedBindings.elements.length !== 0 && namedBindings.elements.every(e => isUnused(e.name)));
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
                    ts.factory.updateImportClause(importDecl.importClause, importDecl.importClause.isTypeOnly, name, /*namedBindings*/ undefined)
                );
            }
            else if (namedBindings.kind === ts.SyntaxKind.NamedImports) {
                for (const element of namedBindings.elements) {
                    if (isUnused(element.name)) changes.delete(sourceFile, element);
                }
            }
        }
    }
}
function deleteUnusedImportsInVariableDeclaration(sourceFile: ts.SourceFile, varDecl: ts.VariableDeclaration, changes: ts.textChanges.ChangeTracker, isUnused: (name: ts.Identifier) => boolean) {
    const { name } = varDecl;
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
            if (isUnused(name)) {
                if (varDecl.initializer && ts.isRequireCall(varDecl.initializer, /*requireStringLiteralLikeArgument*/ true)) {
                    changes.delete(sourceFile,
                        ts.isVariableDeclarationList(varDecl.parent) && ts.length(varDecl.parent.declarations) === 1 ? varDecl.parent.parent : varDecl);
                }
                else {
                    changes.delete(sourceFile, name);
                }
            }
            break;
        case ts.SyntaxKind.ArrayBindingPattern:
            break;
        case ts.SyntaxKind.ObjectBindingPattern:
            if (name.elements.every(e => ts.isIdentifier(e.name) && isUnused(e.name))) {
                changes.delete(sourceFile,
                    ts.isVariableDeclarationList(varDecl.parent) && varDecl.parent.declarations.length === 1 ? varDecl.parent.parent : varDecl);
            }
            else {
                for (const element of name.elements) {
                    if (ts.isIdentifier(element.name) && isUnused(element.name)) {
                        changes.delete(sourceFile, element.name);
                    }
                }
            }
            break;
    }
}

function getNewFileImportsAndAddExportInOldFile(
    oldFile: ts.SourceFile,
    importsToCopy: ReadonlySymbolSet,
    newFileImportsFromOldFile: ReadonlySymbolSet,
    changes: ts.textChanges.ChangeTracker,
    checker: ts.TypeChecker,
    useEsModuleSyntax: boolean,
    quotePreference: ts.QuotePreference,
): readonly SupportedImportStatement[] {
    const copiedOldImports: SupportedImportStatement[] = [];
    for (const oldStatement of oldFile.statements) {
        forEachImportInStatement(oldStatement, i => {
            ts.append(copiedOldImports, filterImport(i, moduleSpecifierFromImport(i), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
        });
    }

    // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
    let oldFileDefault: ts.Identifier | undefined;
    const oldFileNamedImports: string[] = [];
    const markSeenTop = ts.nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
    newFileImportsFromOldFile.forEach(symbol => {
        if (!symbol.declarations) {
            return;
        }
        for (const decl of symbol.declarations) {
            if (!isTopLevelDeclaration(decl)) continue;
            const name = nameOfTopLevelDeclaration(decl);
            if (!name) continue;

            const top = getTopLevelDeclarationStatement(decl);
            if (markSeenTop(top)) {
                addExportToChanges(oldFile, top, name, changes, useEsModuleSyntax);
            }
            if (ts.hasSyntacticModifier(decl, ts.ModifierFlags.Default)) {
                oldFileDefault = name;
            }
            else {
                oldFileNamedImports.push(name.text);
            }
        }
    });

    ts.append(copiedOldImports, makeImportOrRequire(oldFileDefault, oldFileNamedImports, ts.removeFileExtension(ts.getBaseFileName(oldFile.fileName)), useEsModuleSyntax, quotePreference));
    return copiedOldImports;
}

function makeUniqueModuleName(moduleName: string, extension: string, inDirectory: string, host: ts.LanguageServiceHost): string {
    let newModuleName = moduleName;
    for (let i = 1; ; i++) {
        const name = ts.combinePaths(inDirectory, newModuleName + extension);
        if (!host.fileExists(name)) return newModuleName;
        newModuleName = `${moduleName}.${i}`;
    }
}

function getNewModuleName(importsFromNewFile: ReadonlySymbolSet, movedSymbols: ReadonlySymbolSet): string {
    return importsFromNewFile.forEachEntry(ts.symbolNameNoDefault) || movedSymbols.forEachEntry(ts.symbolNameNoDefault) || "newFile";
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
function getUsageInfo(oldFile: ts.SourceFile, toMove: readonly ts.Statement[], checker: ts.TypeChecker): UsageInfo {
    const movedSymbols = new SymbolSet();
    const oldImportsNeededByNewFile = new SymbolSet();
    const newFileImportsFromOldFile = new SymbolSet();

    const containsJsx = ts.find(toMove, statement => !!(statement.transformFlags & ts.TransformFlags.ContainsJsx));
    const jsxNamespaceSymbol = getJsxNamespaceSymbol(containsJsx);
    if (jsxNamespaceSymbol) { // Might not exist (e.g. in non-compiling code)
        oldImportsNeededByNewFile.add(jsxNamespaceSymbol);
    }

    for (const statement of toMove) {
        forEachTopLevelDeclaration(statement, decl => {
            movedSymbols.add(ts.Debug.checkDefined(ts.isExpressionStatement(decl) ? checker.getSymbolAtLocation(decl.expression.left) : decl.symbol, "Need a symbol here"));
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
        if (ts.contains(toMove, statement)) continue;

        // jsxNamespaceSymbol will only be set iff it is in oldImportsNeededByNewFile.
        if (jsxNamespaceSymbol && !!(statement.transformFlags & ts.TransformFlags.ContainsJsx)) {
            unusedImportsFromOldFile.delete(jsxNamespaceSymbol);
        }

        forEachReference(statement, checker, symbol => {
            if (movedSymbols.has(symbol)) oldFileImportsFromNewFile.add(symbol);
            unusedImportsFromOldFile.delete(symbol);
        });
    }

    return { movedSymbols, newFileImportsFromOldFile, oldFileImportsFromNewFile, oldImportsNeededByNewFile, unusedImportsFromOldFile };

    function getJsxNamespaceSymbol(containsJsx: ts.Node | undefined) {
        if (containsJsx === undefined) {
            return undefined;
        }

        const jsxNamespace = checker.getJsxNamespace(containsJsx);

        // Strictly speaking, this could resolve to a symbol other than the JSX namespace.
        // This will produce erroneous output (probably, an incorrectly copied import) but
        // is expected to be very rare and easily reversible.
        const jsxNamespaceSymbol = checker.resolveName(jsxNamespace, containsJsx, ts.SymbolFlags.Namespace, /*excludeGlobals*/ true);

        return !!jsxNamespaceSymbol && ts.some(jsxNamespaceSymbol.declarations, isInImport)
            ? jsxNamespaceSymbol
            : undefined;
    }
}

// Below should all be utilities

function isInImport(decl: ts.Declaration) {
    switch (decl.kind) {
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ImportClause:
        case ts.SyntaxKind.NamespaceImport:
            return true;
        case ts.SyntaxKind.VariableDeclaration:
            return isVariableDeclarationInImport(decl as ts.VariableDeclaration);
        case ts.SyntaxKind.BindingElement:
            return ts.isVariableDeclaration(decl.parent.parent) && isVariableDeclarationInImport(decl.parent.parent);
        default:
            return false;
    }
}
function isVariableDeclarationInImport(decl: ts.VariableDeclaration) {
    return ts.isSourceFile(decl.parent.parent.parent) &&
        !!decl.initializer && ts.isRequireCall(decl.initializer, /*checkArgumentIsStringLiteralLike*/ true);
}

function filterImport(i: SupportedImport, moduleSpecifier: ts.StringLiteralLike, keep: (name: ts.Identifier) => boolean): SupportedImportStatement | undefined {
    switch (i.kind) {
        case ts.SyntaxKind.ImportDeclaration: {
            const clause = i.importClause;
            if (!clause) return undefined;
            const defaultImport = clause.name && keep(clause.name) ? clause.name : undefined;
            const namedBindings = clause.namedBindings && filterNamedBindings(clause.namedBindings, keep);
            return defaultImport || namedBindings
                ? ts.factory.createImportDeclaration(/*modifiers*/ undefined, ts.factory.createImportClause(/*isTypeOnly*/ false, defaultImport, namedBindings), moduleSpecifier, /*assertClause*/ undefined)
                : undefined;
        }
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return keep(i.name) ? i : undefined;
        case ts.SyntaxKind.VariableDeclaration: {
            const name = filterBindingName(i.name, keep);
            return name ? makeVariableStatement(name, i.type, createRequireCall(moduleSpecifier), i.parent.flags) : undefined;
        }
        default:
            return ts.Debug.assertNever(i, `Unexpected import kind ${(i as SupportedImport).kind}`);
    }
}
function filterNamedBindings(namedBindings: ts.NamedImportBindings, keep: (name: ts.Identifier) => boolean): ts.NamedImportBindings | undefined {
    if (namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
        return keep(namedBindings.name) ? namedBindings : undefined;
    }
    else {
        const newElements = namedBindings.elements.filter(e => keep(e.name));
        return newElements.length ? ts.factory.createNamedImports(newElements) : undefined;
    }
}
function filterBindingName(name: ts.BindingName, keep: (name: ts.Identifier) => boolean): ts.BindingName | undefined {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
            return keep(name) ? name : undefined;
        case ts.SyntaxKind.ArrayBindingPattern:
            return name;
        case ts.SyntaxKind.ObjectBindingPattern: {
            // We can't handle nested destructurings or property names well here, so just copy them all.
            const newElements = name.elements.filter(prop => prop.propertyName || !ts.isIdentifier(prop.name) || keep(prop.name));
            return newElements.length ? ts.factory.createObjectBindingPattern(newElements) : undefined;
        }
    }
}

function forEachReference(node: ts.Node, checker: ts.TypeChecker, onReference: (s: ts.Symbol) => void) {
    node.forEachChild(function cb(node) {
        if (ts.isIdentifier(node) && !ts.isDeclarationName(node)) {
            const sym = checker.getSymbolAtLocation(node);
            if (sym) onReference(sym);
        }
        else {
            node.forEachChild(cb);
        }
    });
}

interface ReadonlySymbolSet {
    size(): number;
    has(symbol: ts.Symbol): boolean;
    forEach(cb: (symbol: ts.Symbol) => void): void;
    forEachEntry<T>(cb: (symbol: ts.Symbol) => T | undefined): T | undefined;
}

class SymbolSet implements ReadonlySymbolSet {
    private map = new ts.Map<string, ts.Symbol>();
    add(symbol: ts.Symbol): void {
        this.map.set(String(ts.getSymbolId(symbol)), symbol);
    }
    has(symbol: ts.Symbol): boolean {
        return this.map.has(String(ts.getSymbolId(symbol)));
    }
    delete(symbol: ts.Symbol): void {
        this.map.delete(String(ts.getSymbolId(symbol)));
    }
    forEach(cb: (symbol: ts.Symbol) => void): void {
        this.map.forEach(cb);
    }
    forEachEntry<T>(cb: (symbol: ts.Symbol) => T | undefined): T | undefined {
        return ts.forEachEntry(this.map, cb);
    }
    clone(): SymbolSet {
        const clone = new SymbolSet();
        ts.copyEntries(this.map, clone.map);
        return clone;
    }
    size() {
        return this.map.size;
    }
}

type TopLevelExpressionStatement = ts.ExpressionStatement & { expression: ts.BinaryExpression & { left: ts.PropertyAccessExpression } }; // 'exports.x = ...'
type NonVariableTopLevelDeclaration =
    | ts.FunctionDeclaration
    | ts.ClassDeclaration
    | ts.EnumDeclaration
    | ts.TypeAliasDeclaration
    | ts.InterfaceDeclaration
    | ts.ModuleDeclaration
    | TopLevelExpressionStatement
    | ts.ImportEqualsDeclaration;
type TopLevelDeclarationStatement = NonVariableTopLevelDeclaration | ts.VariableStatement;
interface TopLevelVariableDeclaration extends ts.VariableDeclaration { parent: ts.VariableDeclarationList & { parent: ts.VariableStatement; }; }
type TopLevelDeclaration = NonVariableTopLevelDeclaration | TopLevelVariableDeclaration | ts.BindingElement;
function isTopLevelDeclaration(node: ts.Node): node is TopLevelDeclaration {
    return isNonVariableTopLevelDeclaration(node) && ts.isSourceFile(node.parent) || ts.isVariableDeclaration(node) && ts.isSourceFile(node.parent.parent.parent);
}

function sourceFileOfTopLevelDeclaration(node: TopLevelDeclaration): ts.Node {
    return ts.isVariableDeclaration(node) ? node.parent.parent.parent : node.parent;
}

function isTopLevelDeclarationStatement(node: ts.Node): node is TopLevelDeclarationStatement {
    ts.Debug.assert(ts.isSourceFile(node.parent), "Node parent should be a SourceFile");
    return isNonVariableTopLevelDeclaration(node) || ts.isVariableStatement(node);
}

function isNonVariableTopLevelDeclaration(node: ts.Node): node is NonVariableTopLevelDeclaration {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return true;
        default:
            return false;
    }
}

function forEachTopLevelDeclaration<T>(statement: ts.Statement, cb: (node: TopLevelDeclaration) => T): T | undefined {
    switch (statement.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return cb(statement as ts.FunctionDeclaration | ts.ClassDeclaration | ts.EnumDeclaration | ts.ModuleDeclaration | ts.TypeAliasDeclaration | ts.InterfaceDeclaration | ts.ImportEqualsDeclaration);

        case ts.SyntaxKind.VariableStatement:
            return ts.firstDefined((statement as ts.VariableStatement).declarationList.declarations, decl => forEachTopLevelDeclarationInBindingName(decl.name, cb));

        case ts.SyntaxKind.ExpressionStatement: {
            const { expression } = statement as ts.ExpressionStatement;
            return ts.isBinaryExpression(expression) && ts.getAssignmentDeclarationKind(expression) === ts.AssignmentDeclarationKind.ExportsProperty
                ? cb(statement as TopLevelExpressionStatement)
                : undefined;
        }
    }
}
function forEachTopLevelDeclarationInBindingName<T>(name: ts.BindingName, cb: (node: TopLevelDeclaration) => T): T | undefined {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
            return cb(ts.cast(name.parent, (x): x is TopLevelVariableDeclaration | ts.BindingElement => ts.isVariableDeclaration(x) || ts.isBindingElement(x)));
        case ts.SyntaxKind.ArrayBindingPattern:
        case ts.SyntaxKind.ObjectBindingPattern:
            return ts.firstDefined(name.elements, em => ts.isOmittedExpression(em) ? undefined : forEachTopLevelDeclarationInBindingName(em.name, cb));
        default:
            return ts.Debug.assertNever(name, `Unexpected name kind ${(name as ts.BindingName).kind}`);
    }
}

function nameOfTopLevelDeclaration(d: TopLevelDeclaration): ts.Identifier | undefined {
    return ts.isExpressionStatement(d) ? ts.tryCast(d.expression.left.name, ts.isIdentifier) : ts.tryCast(d.name, ts.isIdentifier);
}

function getTopLevelDeclarationStatement(d: TopLevelDeclaration): TopLevelDeclarationStatement {
    switch (d.kind) {
        case ts.SyntaxKind.VariableDeclaration:
            return d.parent.parent;
        case ts.SyntaxKind.BindingElement:
            return getTopLevelDeclarationStatement(
                ts.cast(d.parent.parent, (p): p is TopLevelVariableDeclaration | ts.BindingElement => ts.isVariableDeclaration(p) || ts.isBindingElement(p)));
        default:
            return d;
    }
}

function addExportToChanges(sourceFile: ts.SourceFile, decl: TopLevelDeclarationStatement, name: ts.Identifier, changes: ts.textChanges.ChangeTracker, useEs6Exports: boolean): void {
    if (isExported(sourceFile, decl, useEs6Exports, name)) return;
    if (useEs6Exports) {
        if (!ts.isExpressionStatement(decl)) changes.insertExportModifier(sourceFile, decl);
    }
    else {
        const names = getNamesToExportInCommonJS(decl);
        if (names.length !== 0) changes.insertNodesAfter(sourceFile, decl, names.map(createExportAssignment));
    }
}

function isExported(sourceFile: ts.SourceFile, decl: TopLevelDeclarationStatement, useEs6Exports: boolean, name?: ts.Identifier): boolean {
    if (useEs6Exports) {
        return !ts.isExpressionStatement(decl) && ts.hasSyntacticModifier(decl, ts.ModifierFlags.Export) || !!(name && sourceFile.symbol.exports?.has(name.escapedText));
    }
    return !!sourceFile.symbol && !!sourceFile.symbol.exports &&
        getNamesToExportInCommonJS(decl).some(name => sourceFile.symbol.exports!.has(ts.escapeLeadingUnderscores(name)));
}

function addExport(decl: TopLevelDeclarationStatement, useEs6Exports: boolean): readonly ts.Statement[] | undefined {
    return useEs6Exports ? [addEs6Export(decl)] : addCommonjsExport(decl);
}
function addEs6Export(d: TopLevelDeclarationStatement): TopLevelDeclarationStatement {
    const modifiers = ts.canHaveModifiers(d) ? ts.concatenate([ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], ts.getModifiers(d)) : undefined;
    switch (d.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
            return ts.factory.updateFunctionDeclaration(d, modifiers, d.asteriskToken, d.name, d.typeParameters, d.parameters, d.type, d.body);
        case ts.SyntaxKind.ClassDeclaration:
            const decorators = ts.canHaveDecorators(d) ? ts.getDecorators(d) : undefined;
            return ts.factory.updateClassDeclaration(d, ts.concatenate<ts.ModifierLike>(decorators, modifiers), d.name, d.typeParameters, d.heritageClauses, d.members);
        case ts.SyntaxKind.VariableStatement:
            return ts.factory.updateVariableStatement(d, modifiers, d.declarationList);
        case ts.SyntaxKind.ModuleDeclaration:
            return ts.factory.updateModuleDeclaration(d, modifiers, d.name, d.body);
        case ts.SyntaxKind.EnumDeclaration:
            return ts.factory.updateEnumDeclaration(d, modifiers, d.name, d.members);
        case ts.SyntaxKind.TypeAliasDeclaration:
            return ts.factory.updateTypeAliasDeclaration(d, modifiers, d.name, d.typeParameters, d.type);
        case ts.SyntaxKind.InterfaceDeclaration:
            return ts.factory.updateInterfaceDeclaration(d, modifiers, d.name, d.typeParameters, d.heritageClauses, d.members);
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return ts.factory.updateImportEqualsDeclaration(d, modifiers, d.isTypeOnly, d.name, d.moduleReference);
        case ts.SyntaxKind.ExpressionStatement:
            return ts.Debug.fail(); // Shouldn't try to add 'export' keyword to `exports.x = ...`
        default:
            return ts.Debug.assertNever(d, `Unexpected declaration kind ${(d as ts.DeclarationStatement).kind}`);
    }
}
function addCommonjsExport(decl: TopLevelDeclarationStatement): readonly ts.Statement[] | undefined {
    return [decl, ...getNamesToExportInCommonJS(decl).map(createExportAssignment)];
}
function getNamesToExportInCommonJS(decl: TopLevelDeclarationStatement): readonly string[] {
    switch (decl.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
            return [decl.name!.text]; // TODO: GH#18217
        case ts.SyntaxKind.VariableStatement:
            return ts.mapDefined(decl.declarationList.declarations, d => ts.isIdentifier(d.name) ? d.name.text : undefined);
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return ts.emptyArray;
        case ts.SyntaxKind.ExpressionStatement:
            return ts.Debug.fail("Can't export an ExpressionStatement"); // Shouldn't try to add 'export' keyword to `exports.x = ...`
        default:
            return ts.Debug.assertNever(decl, `Unexpected decl kind ${(decl as TopLevelDeclarationStatement).kind}`);
    }
}

/** Creates `exports.x = x;` */
function createExportAssignment(name: string): ts.Statement {
    return ts.factory.createExpressionStatement(
        ts.factory.createBinaryExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier("exports"), ts.factory.createIdentifier(name)),
            ts.SyntaxKind.EqualsToken,
            ts.factory.createIdentifier(name)));
}
}
