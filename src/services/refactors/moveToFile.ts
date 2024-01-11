import {
    getModuleSpecifier,
} from "../../compiler/moduleSpecifiers";
import {
    __String,
    AnyImportOrRequireStatement,
    append,
    ApplicableRefactorInfo,
    arrayFrom,
    AssignmentDeclarationKind,
    BinaryExpression,
    BindingElement,
    BindingName,
    CallExpression,
    canHaveDecorators,
    canHaveModifiers,
    canHaveSymbol,
    cast,
    ClassDeclaration,
    codefix,
    combinePaths,
    concatenate,
    contains,
    createModuleSpecifierResolutionHost,
    createTextRangeFromSpan,
    Debug,
    Declaration,
    DeclarationStatement,
    Diagnostics,
    emptyArray,
    EnumDeclaration,
    escapeLeadingUnderscores,
    ExportDeclaration,
    Expression,
    ExpressionStatement,
    extensionFromPath,
    ExternalModuleReference,
    factory,
    fileShouldUseJavaScriptRequire,
    filter,
    find,
    FindAllReferences,
    findIndex,
    findLast,
    firstDefined,
    flatMap,
    forEachKey,
    FunctionDeclaration,
    getAssignmentDeclarationKind,
    GetCanonicalFileName,
    getDecorators,
    getDirectoryPath,
    getLocaleSpecificMessage,
    getModeForUsageLocation,
    getModifiers,
    getPropertySymbolFromBindingElement,
    getQuotePreference,
    getRangesWhere,
    getRefactorContextSpan,
    getRelativePathFromFile,
    getSourceFileOfNode,
    getSynthesizedDeepClone,
    getUniqueName,
    hasJSFileExtension,
    hasSyntacticModifier,
    hasTSFileExtension,
    hostGetCanonicalFileName,
    Identifier,
    ImportDeclaration,
    ImportEqualsDeclaration,
    importFromModuleSpecifier,
    insertImports,
    InterfaceDeclaration,
    InternalSymbolName,
    isArrayLiteralExpression,
    isBinaryExpression,
    isBindingElement,
    isDeclarationName,
    isExportDeclaration,
    isExportSpecifier,
    isExpressionStatement,
    isExternalModuleReference,
    isFunctionLikeDeclaration,
    isIdentifier,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isNamedExports,
    isNamedImports,
    isObjectBindingPattern,
    isObjectLiteralExpression,
    isOmittedExpression,
    isPrologueDirective,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isRequireCall,
    isSourceFile,
    isStatement,
    isStringLiteral,
    isStringLiteralLike,
    isValidTypeOnlyAliasUseSite,
    isVariableDeclaration,
    isVariableDeclarationInitializedToRequire,
    isVariableDeclarationList,
    isVariableStatement,
    LanguageServiceHost,
    last,
    length,
    makeImportIfNecessary,
    makeStringLiteral,
    mapDefined,
    ModifierFlags,
    ModifierLike,
    ModuleDeclaration,
    NamedImportBindings,
    Node,
    NodeFlags,
    nodeSeenTracker,
    normalizePath,
    ObjectBindingElementWithoutPropertyName,
    Program,
    PropertyAccessExpression,
    PropertyAssignment,
    QuotePreference,
    RefactorContext,
    RefactorEditInfo,
    RequireOrImportCall,
    RequireVariableStatement,
    resolvePath,
    ScriptTarget,
    skipAlias,
    some,
    SourceFile,
    Statement,
    StringLiteralLike,
    Symbol,
    SymbolFlags,
    symbolNameNoDefault,
    SyntaxKind,
    takeWhile,
    textChanges,
    TransformFlags,
    tryCast,
    TypeAliasDeclaration,
    TypeChecker,
    TypeNode,
    UserPreferences,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
} from "../_namespaces/ts";
import {
    registerRefactor,
} from "../refactorProvider";

const refactorNameForMoveToFile = "Move to file";
const description = getLocaleSpecificMessage(Diagnostics.Move_to_file);

const moveToFileAction = {
    name: "Move to file",
    description,
    kind: "refactor.move.file",
};
registerRefactor(refactorNameForMoveToFile, {
    kinds: [moveToFileAction.kind],
    getAvailableActions: function getRefactorActionsToMoveToFile(context, interactiveRefactorArguments): readonly ApplicableRefactorInfo[] {
        const statements = getStatementsToMove(context);
        if (!interactiveRefactorArguments) {
            return emptyArray;
        }
        if (context.preferences.allowTextChangesInNewFiles && statements) {
            return [{ name: refactorNameForMoveToFile, description, actions: [moveToFileAction] }];
        }
        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{ name: refactorNameForMoveToFile, description, actions: [{ ...moveToFileAction, notApplicableReason: getLocaleSpecificMessage(Diagnostics.Selection_is_not_a_valid_statement_or_statements) }] }];
        }
        return emptyArray;
    },
    getEditsForAction: function getRefactorEditsToMoveToFile(context, actionName, interactiveRefactorArguments): RefactorEditInfo | undefined {
        Debug.assert(actionName === refactorNameForMoveToFile, "Wrong refactor invoked");
        const statements = Debug.checkDefined(getStatementsToMove(context));
        const { host, program } = context;
        Debug.assert(interactiveRefactorArguments, "No interactive refactor arguments available");
        const targetFile = interactiveRefactorArguments.targetFile;
        if (hasJSFileExtension(targetFile) || hasTSFileExtension(targetFile)) {
            if (host.fileExists(targetFile) && program.getSourceFile(targetFile) === undefined) {
                return error(getLocaleSpecificMessage(Diagnostics.Cannot_move_statements_to_the_selected_file));
            }
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context, context.file, interactiveRefactorArguments.targetFile, context.program, statements, t, context.host, context.preferences));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
        return error(getLocaleSpecificMessage(Diagnostics.Cannot_move_to_file_selected_file_is_invalid));
    },
});

function error(notApplicableReason: string) {
    return { edits: [], renameFilename: undefined, renameLocation: undefined, notApplicableReason };
}

function doChange(context: RefactorContext, oldFile: SourceFile, targetFile: string, program: Program, toMove: ToMove, changes: textChanges.ChangeTracker, host: LanguageServiceHost, preferences: UserPreferences): void {
    const checker = program.getTypeChecker();
    // For a new file
    if (!host.fileExists(targetFile)) {
        changes.createNewFile(oldFile, targetFile, getNewStatementsAndRemoveFromOldFile(oldFile, targetFile, getUsageInfo(oldFile, toMove.all, checker), changes, toMove, program, host, preferences));
        addNewFileToTsconfig(program, changes, oldFile.fileName, targetFile, hostGetCanonicalFileName(host));
    }
    else {
        const targetSourceFile = Debug.checkDefined(program.getSourceFile(targetFile));
        const importAdder = codefix.createImportAdder(targetSourceFile, context.program, context.preferences, context.host);
        getNewStatementsAndRemoveFromOldFile(oldFile, targetSourceFile, getUsageInfo(oldFile, toMove.all, checker, getExistingLocals(targetSourceFile, toMove.all, checker)), changes, toMove, program, host, preferences, importAdder);
    }
}

function getNewStatementsAndRemoveFromOldFile(
    oldFile: SourceFile,
    targetFile: string | SourceFile,
    usage: UsageInfo,
    changes: textChanges.ChangeTracker,
    toMove: ToMove,
    program: Program,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    importAdder?: codefix.ImportAdder,
) {
    const checker = program.getTypeChecker();
    const prologueDirectives = takeWhile(oldFile.statements, isPrologueDirective);
    if (oldFile.externalModuleIndicator === undefined && oldFile.commonJsModuleIndicator === undefined && usage.oldImportsNeededByTargetFile.size === 0 && usage.targetFileImportsFromOldFile.size === 0 && typeof targetFile === "string") {
        deleteMovedStatements(oldFile, toMove.ranges, changes);
        return [...prologueDirectives, ...toMove.all];
    }

    // If the targetFile is a string, it’s the file name for a new file, if it’s a SourceFile, it’s the existing target file.
    const targetFileName = typeof targetFile === "string" ? targetFile : targetFile.fileName;

    const useEsModuleSyntax = !fileShouldUseJavaScriptRequire(targetFileName, program, host, !!oldFile.commonJsModuleIndicator);
    const quotePreference = getQuotePreference(oldFile, preferences);
    const importsFromTargetFile = createOldFileImportsFromTargetFile(oldFile, usage.oldFileImportsFromTargetFile, targetFileName, program, host, useEsModuleSyntax, quotePreference);
    if (importsFromTargetFile) {
        insertImports(changes, oldFile, importsFromTargetFile, /*blankLineBetween*/ true, preferences);
    }

    deleteUnusedOldImports(oldFile, toMove.all, changes, usage.unusedImportsFromOldFile, checker);
    deleteMovedStatements(oldFile, toMove.ranges, changes);
    updateImportsInOtherFiles(changes, program, host, oldFile, usage.movedSymbols, targetFileName, quotePreference);

    const imports = getTargetFileImportsAndAddExportInOldFile(oldFile, targetFileName, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, changes, checker, program, host, useEsModuleSyntax, quotePreference, importAdder);
    const body = addExports(oldFile, toMove.all, usage.oldFileImportsFromTargetFile, useEsModuleSyntax);
    if (typeof targetFile !== "string") {
        if (targetFile.statements.length > 0) {
            moveStatementsToTargetFile(changes, program, body, targetFile, toMove);
        }
        else {
            changes.insertNodesAtEndOfFile(targetFile, body, /*blankLineBetween*/ false);
        }
        if (imports.length > 0) {
            insertImports(changes, targetFile, imports, /*blankLineBetween*/ true, preferences);
        }
    }
    if (importAdder) {
        importAdder.writeFixes(changes, quotePreference);
    }
    if (imports.length && body.length) {
        return [
            ...prologueDirectives,
            ...imports,
            SyntaxKind.NewLineTrivia as const,
            ...body,
        ];
    }

    return [
        ...prologueDirectives,
        ...imports,
        ...body,
    ];
}

function getTargetFileImportsAndAddExportInOldFile(
    oldFile: SourceFile,
    targetFile: string,
    importsToCopy: Map<Symbol, boolean>,
    targetFileImportsFromOldFile: Set<Symbol>,
    changes: textChanges.ChangeTracker,
    checker: TypeChecker,
    program: Program,
    host: LanguageServiceHost,
    useEsModuleSyntax: boolean,
    quotePreference: QuotePreference,
    importAdder?: codefix.ImportAdder,
): readonly AnyImportOrRequireStatement[] {
    const copiedOldImports: AnyImportOrRequireStatement[] = [];
    /**
     * Recomputing the imports is preferred with importAdder because it manages multiple import additions for a file and writes then to a ChangeTracker,
     * but sometimes it fails because of unresolved imports from files, or when a source file is not available for the target file (in this case when creating a new file).
     * So in that case, fall back to copying the import verbatim.
     */
    if (importAdder) {
        importsToCopy.forEach((isValidTypeOnlyUseSite, symbol) => {
            try {
                importAdder.addImportFromExportedSymbol(skipAlias(symbol, checker), isValidTypeOnlyUseSite);
            }
            catch {
                for (const oldStatement of oldFile.statements) {
                    forEachImportInStatement(oldStatement, i => {
                        append(copiedOldImports, filterImport(i, factory.createStringLiteral(moduleSpecifierFromImport(i).text), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
                    });
                }
            }
        });
    }
    else {
        const targetSourceFile = program.getSourceFile(targetFile); // Would be undefined for a new file
        for (const oldStatement of oldFile.statements) {
            forEachImportInStatement(oldStatement, i => {
                // Recomputing module specifier
                const moduleSpecifier = moduleSpecifierFromImport(i);
                const resolved = program.getResolvedModule(oldFile, moduleSpecifier.text, getModeForUsageLocation(oldFile, moduleSpecifier));
                const fileName = resolved?.resolvedModule?.resolvedFileName;
                if (fileName && targetSourceFile) {
                    const newModuleSpecifier = getModuleSpecifier(program.getCompilerOptions(), targetSourceFile, targetSourceFile.fileName, fileName, createModuleSpecifierResolutionHost(program, host));
                    append(copiedOldImports, filterImport(i, makeStringLiteral(newModuleSpecifier, quotePreference), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
                }
                else {
                    append(copiedOldImports, filterImport(i, factory.createStringLiteral(moduleSpecifierFromImport(i).text), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
                }
            });
        }
    }

    // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
    const targetFileSourceFile = program.getSourceFile(targetFile);
    let oldFileDefault: Identifier | undefined;
    const oldFileNamedImports: string[] = [];
    const markSeenTop = nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
    targetFileImportsFromOldFile.forEach(symbol => {
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
            if (importAdder && checker.isUnknownSymbol(symbol)) {
                importAdder.addImportFromExportedSymbol(skipAlias(symbol, checker));
            }
            else {
                if (hasSyntacticModifier(decl, ModifierFlags.Default)) {
                    oldFileDefault = name;
                }
                else {
                    oldFileNamedImports.push(name.text);
                }
            }
        }
    });
    return targetFileSourceFile
        ? append(copiedOldImports, makeImportOrRequire(targetFileSourceFile, oldFileDefault, oldFileNamedImports, oldFile.fileName, program, host, useEsModuleSyntax, quotePreference))
        : append(copiedOldImports, makeImportOrRequire(oldFile, oldFileDefault, oldFileNamedImports, oldFile.fileName, program, host, useEsModuleSyntax, quotePreference));
}

/** @internal */
export function addNewFileToTsconfig(program: Program, changes: textChanges.ChangeTracker, oldFileName: string, newFileNameWithExtension: string, getCanonicalFileName: GetCanonicalFileName): void {
    const cfg = program.getCompilerOptions().configFile;
    if (!cfg) return;

    const newFileAbsolutePath = normalizePath(combinePaths(oldFileName, "..", newFileNameWithExtension));
    const newFilePath = getRelativePathFromFile(cfg.fileName, newFileAbsolutePath, getCanonicalFileName);

    const cfgObject = cfg.statements[0] && tryCast(cfg.statements[0].expression, isObjectLiteralExpression);
    const filesProp = cfgObject && find(cfgObject.properties, (prop): prop is PropertyAssignment => isPropertyAssignment(prop) && isStringLiteral(prop.name) && prop.name.text === "files");
    if (filesProp && isArrayLiteralExpression(filesProp.initializer)) {
        changes.insertNodeInListAfter(cfg, last(filesProp.initializer.elements), factory.createStringLiteral(newFilePath), filesProp.initializer.elements);
    }
}

/** @internal */
export function deleteMovedStatements(sourceFile: SourceFile, moved: readonly StatementRange[], changes: textChanges.ChangeTracker) {
    for (const { first, afterLast } of moved) {
        changes.deleteNodeRangeExcludingEnd(sourceFile, first, afterLast);
    }
}

/** @internal */
export function deleteUnusedOldImports(oldFile: SourceFile, toMove: readonly Statement[], changes: textChanges.ChangeTracker, toDelete: Set<Symbol>, checker: TypeChecker) {
    for (const statement of oldFile.statements) {
        if (contains(toMove, statement)) continue;
        forEachImportInStatement(statement, i => deleteUnusedImports(oldFile, i, changes, name => toDelete.has(checker.getSymbolAtLocation(name)!)));
    }
}

/** @internal */
export function updateImportsInOtherFiles(
    changes: textChanges.ChangeTracker,
    program: Program,
    host: LanguageServiceHost,
    oldFile: SourceFile,
    movedSymbols: Set<Symbol>,
    targetFileName: string,
    quotePreference: QuotePreference,
): void {
    const checker = program.getTypeChecker();
    for (const sourceFile of program.getSourceFiles()) {
        if (sourceFile === oldFile) continue;
        for (const statement of sourceFile.statements) {
            forEachImportInStatement(statement, importNode => {
                if (checker.getSymbolAtLocation(moduleSpecifierFromImport(importNode)) !== oldFile.symbol) return;

                const shouldMove = (name: Identifier): boolean => {
                    const symbol = isBindingElement(name.parent)
                        ? getPropertySymbolFromBindingElement(checker, name.parent as ObjectBindingElementWithoutPropertyName)
                        : skipAlias(checker.getSymbolAtLocation(name)!, checker);
                    return !!symbol && movedSymbols.has(symbol);
                };
                deleteUnusedImports(sourceFile, importNode, changes, shouldMove); // These will be changed to imports from the new file

                const pathToTargetFileWithExtension = resolvePath(getDirectoryPath(oldFile.path), targetFileName);
                const newModuleSpecifier = getModuleSpecifier(program.getCompilerOptions(), sourceFile, sourceFile.fileName, pathToTargetFileWithExtension, createModuleSpecifierResolutionHost(program, host));
                const newImportDeclaration = filterImport(importNode, makeStringLiteral(newModuleSpecifier, quotePreference), shouldMove);
                if (newImportDeclaration) changes.insertNodeAfter(sourceFile, statement, newImportDeclaration);

                const ns = getNamespaceLikeImport(importNode);
                if (ns) updateNamespaceLikeImport(changes, sourceFile, checker, movedSymbols, newModuleSpecifier, ns, importNode, quotePreference);
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
    movedSymbols: Set<Symbol>,
    newModuleSpecifier: string,
    oldImportId: Identifier,
    oldImportNode: SupportedImport,
    quotePreference: QuotePreference,
): void {
    const preferredNewNamespaceName = codefix.moduleSpecifierToValidIdentifier(newModuleSpecifier, ScriptTarget.ESNext);
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
            changes.replaceNode(sourceFile, ref, factory.createIdentifier(newNamespaceName));
        }
        changes.insertNodeAfter(sourceFile, oldImportNode, updateNamespaceLikeImportNode(oldImportNode, preferredNewNamespaceName, newModuleSpecifier, quotePreference));
    }
}

function updateNamespaceLikeImportNode(node: SupportedImport, newNamespaceName: string, newModuleSpecifier: string, quotePreference: QuotePreference): Node {
    const newNamespaceId = factory.createIdentifier(newNamespaceName);
    const newModuleString = makeStringLiteral(newModuleSpecifier, quotePreference);
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
            return factory.createImportDeclaration(
                /*modifiers*/ undefined,
                factory.createImportClause(/*isTypeOnly*/ false, /*name*/ undefined, factory.createNamespaceImport(newNamespaceId)),
                newModuleString,
                /*attributes*/ undefined,
            );
        case SyntaxKind.ImportEqualsDeclaration:
            return factory.createImportEqualsDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, newNamespaceId, factory.createExternalModuleReference(newModuleString));
        case SyntaxKind.VariableDeclaration:
            return factory.createVariableDeclaration(newNamespaceId, /*exclamationToken*/ undefined, /*type*/ undefined, createRequireCall(newModuleString));
        default:
            return Debug.assertNever(node, `Unexpected node kind ${(node as SupportedImport).kind}`);
    }
}

function createRequireCall(moduleSpecifier: StringLiteralLike): CallExpression {
    return factory.createCallExpression(factory.createIdentifier("require"), /*typeArguments*/ undefined, [moduleSpecifier]);
}

/** @internal */
export function moduleSpecifierFromImport(i: SupportedImport): StringLiteralLike {
    return (i.kind === SyntaxKind.ImportDeclaration ? i.moduleSpecifier
        : i.kind === SyntaxKind.ImportEqualsDeclaration ? i.moduleReference.expression
        : i.initializer.arguments[0]);
}

/** @internal */
export function forEachImportInStatement(statement: Statement, cb: (importNode: SupportedImport) => void): void {
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
            if (decl.initializer && isRequireCall(decl.initializer, /*requireStringLiteralLikeArgument*/ true)) {
                cb(decl as SupportedImport);
            }
        }
    }
}

/** @internal */
export type SupportedImport =
    | ImportDeclaration & { moduleSpecifier: StringLiteralLike; }
    | ImportEqualsDeclaration & { moduleReference: ExternalModuleReference & { expression: StringLiteralLike; }; }
    | VariableDeclaration & { initializer: RequireOrImportCall; };

/** @internal */
export type SupportedImportStatement =
    | ImportDeclaration
    | ImportEqualsDeclaration
    | VariableStatement;

/** @internal */
export function createOldFileImportsFromTargetFile(
    sourceFile: SourceFile,
    targetFileNeedExport: Set<Symbol>,
    targetFileNameWithExtension: string,
    program: Program,
    host: LanguageServiceHost,
    useEs6Imports: boolean,
    quotePreference: QuotePreference,
): AnyImportOrRequireStatement | undefined {
    let defaultImport: Identifier | undefined;
    const imports: string[] = [];
    targetFileNeedExport.forEach(symbol => {
        if (symbol.escapedName === InternalSymbolName.Default) {
            defaultImport = factory.createIdentifier(symbolNameNoDefault(symbol)!);
        }
        else {
            imports.push(symbol.name);
        }
    });
    return makeImportOrRequire(sourceFile, defaultImport, imports, targetFileNameWithExtension, program, host, useEs6Imports, quotePreference);
}

/** @internal */
export function makeImportOrRequire(
    sourceFile: SourceFile,
    defaultImport: Identifier | undefined,
    imports: readonly string[],
    targetFileNameWithExtension: string,
    program: Program,
    host: LanguageServiceHost,
    useEs6Imports: boolean,
    quotePreference: QuotePreference,
): AnyImportOrRequireStatement | undefined {
    const pathToTargetFile = resolvePath(getDirectoryPath(sourceFile.path), targetFileNameWithExtension);
    const pathToTargetFileWithCorrectExtension = getModuleSpecifier(program.getCompilerOptions(), sourceFile, sourceFile.fileName, pathToTargetFile, createModuleSpecifierResolutionHost(program, host));

    if (useEs6Imports) {
        const specifiers = imports.map(i => factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, factory.createIdentifier(i)));
        return makeImportIfNecessary(defaultImport, specifiers, pathToTargetFileWithCorrectExtension, quotePreference);
    }
    else {
        Debug.assert(!defaultImport, "No default import should exist"); // If there's a default export, it should have been an es6 module.
        const bindingElements = imports.map(i => factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, i));
        return bindingElements.length
            ? makeVariableStatement(factory.createObjectBindingPattern(bindingElements), /*type*/ undefined, createRequireCall(makeStringLiteral(pathToTargetFileWithCorrectExtension, quotePreference))) as RequireVariableStatement
            : undefined;
    }
}

function makeVariableStatement(name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined, flags: NodeFlags = NodeFlags.Const) {
    return factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, type, initializer)], flags));
}

/** @internal */
export function addExports(sourceFile: SourceFile, toMove: readonly Statement[], needExport: Set<Symbol>, useEs6Exports: boolean): readonly Statement[] {
    return flatMap(toMove, statement => {
        if (
            isTopLevelDeclarationStatement(statement) &&
            !isExported(sourceFile, statement, useEs6Exports) &&
            forEachTopLevelDeclaration(statement, d => needExport.has(Debug.checkDefined(tryCast(d, canHaveSymbol)?.symbol)))
        ) {
            const exports = addExport(getSynthesizedDeepClone(statement), useEs6Exports);
            if (exports) return exports;
        }
        return getSynthesizedDeepClone(statement);
    });
}

function isExported(sourceFile: SourceFile, decl: TopLevelDeclarationStatement, useEs6Exports: boolean, name?: Identifier): boolean {
    if (useEs6Exports) {
        return !isExpressionStatement(decl) && hasSyntacticModifier(decl, ModifierFlags.Export) || !!(name && sourceFile.symbol && sourceFile.symbol.exports?.has(name.escapedText));
    }
    return !!sourceFile.symbol && !!sourceFile.symbol.exports &&
        getNamesToExportInCommonJS(decl).some(name => sourceFile.symbol.exports!.has(escapeLeadingUnderscores(name)));
}

/** @internal */
export function deleteUnusedImports(sourceFile: SourceFile, importDecl: SupportedImport, changes: textChanges.ChangeTracker, isUnused: (name: Identifier) => boolean): void {
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
                    factory.updateImportClause(importDecl.importClause, importDecl.importClause.isTypeOnly, name, /*namedBindings*/ undefined),
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
                if (varDecl.initializer && isRequireCall(varDecl.initializer, /*requireStringLiteralLikeArgument*/ true)) {
                    changes.delete(sourceFile, isVariableDeclarationList(varDecl.parent) && length(varDecl.parent.declarations) === 1 ? varDecl.parent.parent : varDecl);
                }
                else {
                    changes.delete(sourceFile, name);
                }
            }
            break;
        case SyntaxKind.ArrayBindingPattern:
            break;
        case SyntaxKind.ObjectBindingPattern:
            if (name.elements.every(e => isIdentifier(e.name) && isUnused(e.name))) {
                changes.delete(sourceFile, isVariableDeclarationList(varDecl.parent) && varDecl.parent.declarations.length === 1 ? varDecl.parent.parent : varDecl);
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

/** @internal */
export type TopLevelDeclarationStatement = NonVariableTopLevelDeclaration | VariableStatement;

function isTopLevelDeclarationStatement(node: Node): node is TopLevelDeclarationStatement {
    Debug.assert(isSourceFile(node.parent), "Node parent should be a SourceFile");
    return isNonVariableTopLevelDeclaration(node) || isVariableStatement(node);
}

function addExport(decl: TopLevelDeclarationStatement, useEs6Exports: boolean): readonly Statement[] | undefined {
    return useEs6Exports ? [addEs6Export(decl)] : addCommonjsExport(decl);
}

function addEs6Export(d: TopLevelDeclarationStatement): TopLevelDeclarationStatement {
    const modifiers = canHaveModifiers(d) ? concatenate([factory.createModifier(SyntaxKind.ExportKeyword)], getModifiers(d)) : undefined;
    switch (d.kind) {
        case SyntaxKind.FunctionDeclaration:
            return factory.updateFunctionDeclaration(d, modifiers, d.asteriskToken, d.name, d.typeParameters, d.parameters, d.type, d.body);
        case SyntaxKind.ClassDeclaration:
            const decorators = canHaveDecorators(d) ? getDecorators(d) : undefined;
            return factory.updateClassDeclaration(d, concatenate<ModifierLike>(decorators, modifiers), d.name, d.typeParameters, d.heritageClauses, d.members);
        case SyntaxKind.VariableStatement:
            return factory.updateVariableStatement(d, modifiers, d.declarationList);
        case SyntaxKind.ModuleDeclaration:
            return factory.updateModuleDeclaration(d, modifiers, d.name, d.body);
        case SyntaxKind.EnumDeclaration:
            return factory.updateEnumDeclaration(d, modifiers, d.name, d.members);
        case SyntaxKind.TypeAliasDeclaration:
            return factory.updateTypeAliasDeclaration(d, modifiers, d.name, d.typeParameters, d.type);
        case SyntaxKind.InterfaceDeclaration:
            return factory.updateInterfaceDeclaration(d, modifiers, d.name, d.typeParameters, d.heritageClauses, d.members);
        case SyntaxKind.ImportEqualsDeclaration:
            return factory.updateImportEqualsDeclaration(d, modifiers, d.isTypeOnly, d.name, d.moduleReference);
        case SyntaxKind.ExpressionStatement:
            // Shouldn't try to add 'export' keyword to `exports.x = ...`
            return Debug.fail();
        default:
            return Debug.assertNever(d, `Unexpected declaration kind ${(d as DeclarationStatement).kind}`);
    }
}
function addCommonjsExport(decl: TopLevelDeclarationStatement): readonly Statement[] | undefined {
    return [decl, ...getNamesToExportInCommonJS(decl).map(createExportAssignment)];
}

/** Creates `exports.x = x;` */
function createExportAssignment(name: string): Statement {
    return factory.createExpressionStatement(
        factory.createBinaryExpression(
            factory.createPropertyAccessExpression(factory.createIdentifier("exports"), factory.createIdentifier(name)),
            SyntaxKind.EqualsToken,
            factory.createIdentifier(name),
        ),
    );
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
            // Shouldn't try to add 'export' keyword to `exports.x = ...`
            return Debug.fail("Can't export an ExpressionStatement");
        default:
            return Debug.assertNever(decl, `Unexpected decl kind ${(decl as TopLevelDeclarationStatement).kind}`);
    }
}

/** @internal */
export function filterImport(i: SupportedImport, moduleSpecifier: StringLiteralLike, keep: (name: Identifier) => boolean): SupportedImportStatement | undefined {
    switch (i.kind) {
        case SyntaxKind.ImportDeclaration: {
            const clause = i.importClause;
            if (!clause) return undefined;
            const defaultImport = clause.name && keep(clause.name) ? clause.name : undefined;
            const namedBindings = clause.namedBindings && filterNamedBindings(clause.namedBindings, keep);
            return defaultImport || namedBindings
                ? factory.createImportDeclaration(/*modifiers*/ undefined, factory.createImportClause(clause.isTypeOnly, defaultImport, namedBindings), getSynthesizedDeepClone(moduleSpecifier), /*attributes*/ undefined)
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
        return newElements.length ? factory.createNamedImports(newElements) : undefined;
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
            return newElements.length ? factory.createObjectBindingPattern(newElements) : undefined;
        }
    }
}

/** @internal */
export function nameOfTopLevelDeclaration(d: TopLevelDeclaration): Identifier | undefined {
    return isExpressionStatement(d) ? tryCast(d.expression.left.name, isIdentifier) : tryCast(d.name, isIdentifier);
}

/** @internal */
export function getTopLevelDeclarationStatement(d: TopLevelDeclaration): TopLevelDeclarationStatement {
    switch (d.kind) {
        case SyntaxKind.VariableDeclaration:
            return d.parent.parent;
        case SyntaxKind.BindingElement:
            return getTopLevelDeclarationStatement(
                cast(d.parent.parent, (p): p is TopLevelVariableDeclaration | BindingElement => isVariableDeclaration(p) || isBindingElement(p)),
            );
        default:
            return d;
    }
}

/** @internal */
export function addExportToChanges(sourceFile: SourceFile, decl: TopLevelDeclarationStatement, name: Identifier, changes: textChanges.ChangeTracker, useEs6Exports: boolean): void {
    if (isExported(sourceFile, decl, useEs6Exports, name)) return;
    if (useEs6Exports) {
        if (!isExpressionStatement(decl)) changes.insertExportModifier(sourceFile, decl);
    }
    else {
        const names = getNamesToExportInCommonJS(decl);
        if (names.length !== 0) changes.insertNodesAfter(sourceFile, decl, names.map(createExportAssignment));
    }
}

/** @internal */
export interface ToMove {
    readonly all: readonly Statement[];
    readonly ranges: readonly StatementRange[];
}

/** @internal */
export interface StatementRange {
    readonly first: Statement;
    readonly afterLast: Statement | undefined;
}

/** @internal */
export interface UsageInfo {
    // Symbols whose declarations are moved from the old file to the new file.
    readonly movedSymbols: Set<Symbol>;

    // Symbols declared in the old file that must be imported by the new file. (May not already be exported.)
    readonly targetFileImportsFromOldFile: Set<Symbol>;
    // Subset of movedSymbols that are still used elsewhere in the old file and must be imported back.
    readonly oldFileImportsFromTargetFile: Set<Symbol>;

    readonly oldImportsNeededByTargetFile: Map<Symbol, boolean>;
    // Subset of oldImportsNeededByTargetFile that are will no longer be used in the old file.
    readonly unusedImportsFromOldFile: Set<Symbol>;
}

/** @internal */
export type TopLevelExpressionStatement = ExpressionStatement & { expression: BinaryExpression & { left: PropertyAccessExpression; }; }; // 'exports.x = ...'

/** @internal */
export type NonVariableTopLevelDeclaration =
    | FunctionDeclaration
    | ClassDeclaration
    | EnumDeclaration
    | TypeAliasDeclaration
    | InterfaceDeclaration
    | ModuleDeclaration
    | TopLevelExpressionStatement
    | ImportEqualsDeclaration;

/** @internal */
export interface TopLevelVariableDeclaration extends VariableDeclaration {
    parent: VariableDeclarationList & { parent: VariableStatement; };
}

/** @internal */
export type TopLevelDeclaration = NonVariableTopLevelDeclaration | TopLevelVariableDeclaration | BindingElement;

/** @internal */
export function createNewFileName(oldFile: SourceFile, program: Program, context: RefactorContext, host: LanguageServiceHost): string {
    const checker = program.getTypeChecker();
    const toMove = getStatementsToMove(context);
    let usage;
    if (toMove) {
        usage = getUsageInfo(oldFile, toMove.all, checker);
        const currentDirectory = getDirectoryPath(oldFile.fileName);
        const extension = extensionFromPath(oldFile.fileName);
        const newFileName = combinePaths(
            // new file is always placed in the same directory as the old file
            currentDirectory,
            // ensures the filename computed below isn't already taken
            makeUniqueFilename(
                // infers a name for the new file from the symbols being moved
                inferNewFileName(usage.oldFileImportsFromTargetFile, usage.movedSymbols),
                extension,
                currentDirectory,
                host,
            ),
        )
            // new file has same extension as old file
            + extension;
        return newFileName;
    }
    return "";
}

interface RangeToMove {
    readonly toMove: readonly Statement[];
    readonly afterLast: Statement | undefined;
}

function getRangeToMove(context: RefactorContext): RangeToMove | undefined {
    const { file } = context;
    const range = createTextRangeFromSpan(getRefactorContextSpan(context));
    const { statements } = file;

    let startNodeIndex = findIndex(statements, s => s.end > range.pos);
    if (startNodeIndex === -1) return undefined;
    const startStatement = statements[startNodeIndex];

    const overloadRangeToMove = getOverloadRangeToMove(file, startStatement);
    if (overloadRangeToMove) {
        startNodeIndex = overloadRangeToMove.start;
    }

    let endNodeIndex = findIndex(statements, s => s.end >= range.end, startNodeIndex);
    /**
     * [|const a = 2;
     * function foo() {
     * }
     * |]
     */
    if (endNodeIndex !== -1 && range.end <= statements[endNodeIndex].getStart()) {
        endNodeIndex--;
    }
    const endingOverloadRangeToMove = getOverloadRangeToMove(file, statements[endNodeIndex]);
    if (endingOverloadRangeToMove) {
        endNodeIndex = endingOverloadRangeToMove.end;
    }

    return {
        toMove: statements.slice(startNodeIndex, endNodeIndex === -1 ? statements.length : endNodeIndex + 1),
        afterLast: endNodeIndex === -1 ? undefined : statements[endNodeIndex + 1],
    };
}

/** @internal */
export function getStatementsToMove(context: RefactorContext): ToMove | undefined {
    const rangeToMove = getRangeToMove(context);
    if (rangeToMove === undefined) return undefined;
    const all: Statement[] = [];
    const ranges: StatementRange[] = [];
    const { toMove, afterLast } = rangeToMove;
    getRangesWhere(toMove, isAllowedStatementToMove, (start, afterEndIndex) => {
        for (let i = start; i < afterEndIndex; i++) all.push(toMove[i]);
        ranges.push({ first: toMove[start], afterLast });
    });
    return all.length === 0 ? undefined : { all, ranges };
}

function isAllowedStatementToMove(statement: Statement): boolean {
    // Filters imports and prologue directives out of the range of statements to move.
    // Imports will be copied to the new file anyway, and may still be needed in the old file.
    // Prologue directives will be copied to the new file and should be left in the old file.
    return !isPureImport(statement) && !isPrologueDirective(statement);
}

function isPureImport(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
            return true;
        case SyntaxKind.ImportEqualsDeclaration:
            return !hasSyntacticModifier(node, ModifierFlags.Export);
        case SyntaxKind.VariableStatement:
            return (node as VariableStatement).declarationList.declarations.every(d => !!d.initializer && isRequireCall(d.initializer, /*requireStringLiteralLikeArgument*/ true));
        default:
            return false;
    }
}

/** @internal */
export function getUsageInfo(oldFile: SourceFile, toMove: readonly Statement[], checker: TypeChecker, existingTargetLocals: ReadonlySet<Symbol> = new Set()): UsageInfo {
    const movedSymbols = new Set<Symbol>();
    const oldImportsNeededByTargetFile = new Map<Symbol, /*isValidTypeOnlyUseSite*/ boolean>();
    const targetFileImportsFromOldFile = new Set<Symbol>();

    const containsJsx = find(toMove, statement => !!(statement.transformFlags & TransformFlags.ContainsJsx));
    const jsxNamespaceSymbol = getJsxNamespaceSymbol(containsJsx);

    if (jsxNamespaceSymbol) { // Might not exist (e.g. in non-compiling code)
        oldImportsNeededByTargetFile.set(jsxNamespaceSymbol, false);
    }

    for (const statement of toMove) {
        forEachTopLevelDeclaration(statement, decl => {
            movedSymbols.add(Debug.checkDefined(isExpressionStatement(decl) ? checker.getSymbolAtLocation(decl.expression.left) : decl.symbol, "Need a symbol here"));
        });
    }

    const unusedImportsFromOldFile = new Set<Symbol>();
    for (const statement of toMove) {
        forEachReference(statement, checker, (symbol, isValidTypeOnlyUseSite) => {
            if (!symbol.declarations) {
                return;
            }
            if (existingTargetLocals.has(skipAlias(symbol, checker))) {
                unusedImportsFromOldFile.add(symbol);
                return;
            }
            for (const decl of symbol.declarations) {
                if (isInImport(decl)) {
                    const prevIsTypeOnly = oldImportsNeededByTargetFile.get(symbol);
                    oldImportsNeededByTargetFile.set(symbol, prevIsTypeOnly === undefined ? isValidTypeOnlyUseSite : prevIsTypeOnly && isValidTypeOnlyUseSite);
                }
                else if (isTopLevelDeclaration(decl) && sourceFileOfTopLevelDeclaration(decl) === oldFile && !movedSymbols.has(symbol)) {
                    targetFileImportsFromOldFile.add(symbol);
                }
            }
        });
    }

    for (const unusedImport of oldImportsNeededByTargetFile.keys()) {
        unusedImportsFromOldFile.add(unusedImport);
    }

    const oldFileImportsFromTargetFile = new Set<Symbol>();
    for (const statement of oldFile.statements) {
        if (contains(toMove, statement)) continue;

        // jsxNamespaceSymbol will only be set iff it is in oldImportsNeededByTargetFile.
        if (jsxNamespaceSymbol && !!(statement.transformFlags & TransformFlags.ContainsJsx)) {
            unusedImportsFromOldFile.delete(jsxNamespaceSymbol);
        }

        forEachReference(statement, checker, symbol => {
            if (movedSymbols.has(symbol)) oldFileImportsFromTargetFile.add(symbol);
            unusedImportsFromOldFile.delete(symbol);
        });
    }

    return { movedSymbols, targetFileImportsFromOldFile, oldFileImportsFromTargetFile, oldImportsNeededByTargetFile, unusedImportsFromOldFile };

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

function makeUniqueFilename(proposedFilename: string, extension: string, inDirectory: string, host: LanguageServiceHost): string {
    let newFilename = proposedFilename;
    for (let i = 1;; i++) {
        const name = combinePaths(inDirectory, newFilename + extension);
        if (!host.fileExists(name)) return newFilename;
        newFilename = `${proposedFilename}.${i}`;
    }
}

function inferNewFileName(importsFromNewFile: Set<Symbol>, movedSymbols: Set<Symbol>): string {
    return forEachKey(importsFromNewFile, symbolNameNoDefault) || forEachKey(movedSymbols, symbolNameNoDefault) || "newFile";
}

function forEachReference(node: Node, checker: TypeChecker, onReference: (s: Symbol, isValidTypeOnlyUseSite: boolean) => void) {
    node.forEachChild(function cb(node) {
        if (isIdentifier(node) && !isDeclarationName(node)) {
            const sym = checker.getSymbolAtLocation(node);
            if (sym) onReference(sym, isValidTypeOnlyAliasUseSite(node));
        }
        else {
            node.forEachChild(cb);
        }
    });
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
        !!decl.initializer && isRequireCall(decl.initializer, /*requireStringLiteralLikeArgument*/ true);
}

/** @internal */
export function isTopLevelDeclaration(node: Node): node is TopLevelDeclaration {
    return isNonVariableTopLevelDeclaration(node) && isSourceFile(node.parent) || isVariableDeclaration(node) && isSourceFile(node.parent.parent.parent);
}
function sourceFileOfTopLevelDeclaration(node: TopLevelDeclaration): Node {
    return isVariableDeclaration(node) ? node.parent.parent.parent : node.parent;
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

function moveStatementsToTargetFile(changes: textChanges.ChangeTracker, program: Program, statements: readonly Statement[], targetFile: SourceFile, toMove: ToMove) {
    const removedExports = new Set<ExportDeclaration>();
    const targetExports = targetFile.symbol?.exports;
    if (targetExports) {
        const checker = program.getTypeChecker();
        const targetToSourceExports = new Map<ExportDeclaration, Set<TopLevelDeclaration>>();

        for (const node of toMove.all) {
            if (isTopLevelDeclarationStatement(node) && hasSyntacticModifier(node, ModifierFlags.Export)) {
                forEachTopLevelDeclaration(node, declaration => {
                    const targetDeclarations = canHaveSymbol(declaration) ? targetExports.get(declaration.symbol.escapedName)?.declarations : undefined;
                    const exportDeclaration = firstDefined(targetDeclarations, d =>
                        isExportDeclaration(d) ? d :
                            isExportSpecifier(d) ? tryCast(d.parent.parent, isExportDeclaration) : undefined);
                    if (exportDeclaration && exportDeclaration.moduleSpecifier) {
                        targetToSourceExports.set(exportDeclaration, (targetToSourceExports.get(exportDeclaration) || new Set()).add(declaration));
                    }
                });
            }
        }

        for (const [exportDeclaration, topLevelDeclarations] of arrayFrom(targetToSourceExports)) {
            if (exportDeclaration.exportClause && isNamedExports(exportDeclaration.exportClause) && length(exportDeclaration.exportClause.elements)) {
                const elements = exportDeclaration.exportClause.elements;
                const updatedElements = filter(elements, elem => find(skipAlias(elem.symbol, checker).declarations, d => isTopLevelDeclaration(d) && topLevelDeclarations.has(d)) === undefined);

                if (length(updatedElements) === 0) {
                    changes.deleteNode(targetFile, exportDeclaration);
                    removedExports.add(exportDeclaration);
                    continue;
                }

                if (length(updatedElements) < length(elements)) {
                    changes.replaceNode(targetFile, exportDeclaration, factory.updateExportDeclaration(exportDeclaration, exportDeclaration.modifiers, exportDeclaration.isTypeOnly, factory.updateNamedExports(exportDeclaration.exportClause, factory.createNodeArray(updatedElements, elements.hasTrailingComma)), exportDeclaration.moduleSpecifier, exportDeclaration.attributes));
                }
            }
        }
    }

    const lastReExport = findLast(targetFile.statements, n => isExportDeclaration(n) && !!n.moduleSpecifier && !removedExports.has(n));
    if (lastReExport) {
        changes.insertNodesBefore(targetFile, lastReExport, statements, /*blankLineBetween*/ true);
    }
    else {
        changes.insertNodesAfter(targetFile, targetFile.statements[targetFile.statements.length - 1], statements);
    }
}

function getOverloadRangeToMove(sourceFile: SourceFile, statement: Statement) {
    if (isFunctionLikeDeclaration(statement)) {
        const declarations = statement.symbol.declarations;
        if (declarations === undefined || length(declarations) <= 1 || !contains(declarations, statement)) {
            return undefined;
        }
        const firstDecl = declarations[0];
        const lastDecl = declarations[length(declarations) - 1];
        const statementsToMove = mapDefined(declarations, d => getSourceFileOfNode(d) === sourceFile && isStatement(d) ? d : undefined);
        const end = findIndex(sourceFile.statements, s => s.end >= lastDecl.end);
        const start = findIndex(sourceFile.statements, s => s.end >= firstDecl.end);
        return { toMove: statementsToMove, start, end };
    }
    return undefined;
}

function getExistingLocals(sourceFile: SourceFile, statements: readonly Statement[], checker: TypeChecker) {
    const existingLocals = new Set<Symbol>();
    for (const moduleSpecifier of sourceFile.imports) {
        const declaration = importFromModuleSpecifier(moduleSpecifier);
        if (
            isImportDeclaration(declaration) && declaration.importClause &&
            declaration.importClause.namedBindings && isNamedImports(declaration.importClause.namedBindings)
        ) {
            for (const e of declaration.importClause.namedBindings.elements) {
                const symbol = checker.getSymbolAtLocation(e.propertyName || e.name);
                if (symbol) {
                    existingLocals.add(skipAlias(symbol, checker));
                }
            }
        }
        if (isVariableDeclarationInitializedToRequire(declaration.parent) && isObjectBindingPattern(declaration.parent.name)) {
            for (const e of declaration.parent.name.elements) {
                const symbol = checker.getSymbolAtLocation(e.propertyName || e.name);
                if (symbol) {
                    existingLocals.add(skipAlias(symbol, checker));
                }
            }
        }
    }

    for (const statement of statements) {
        forEachReference(statement, checker, s => {
            const symbol = skipAlias(s, checker);
            if (symbol.valueDeclaration && getSourceFileOfNode(symbol.valueDeclaration) === sourceFile) {
                existingLocals.add(symbol);
            }
        });
    }
    return existingLocals;
}
