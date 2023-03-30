import { cast, concatenate, contains, emptyArray, find, flatMap, GetCanonicalFileName, last,length,mapDefined,tryCast } from "../compiler/core";
import { getModuleSpecifier } from "../compiler/moduleSpecifiers";
import { combinePaths, getDirectoryPath, getRelativePathFromFile,normalizePath, resolvePath } from "../compiler/path";
import { AnyImportOrRequireStatement, BindingElement, BindingName, CallExpression, DeclarationStatement, Expression, ExternalModuleReference, Identifier, ImportDeclaration, ImportEqualsDeclaration, InternalSymbolName, ModifierFlags, ModifierLike, NamedImportBindings, Node, NodeFlags, Program, PropertyAssignment, RequireOrImportCall, RequireVariableStatement, ScriptTarget, SourceFile, Statement, StringLiteralLike, SymbolFlags, SyntaxKind, TypeChecker, TypeNode, VariableDeclaration, VariableStatement } from "../compiler/types";
import { canHaveDecorators, canHaveModifiers, canHaveSymbol, codefix, createModuleSpecifierResolutionHost, Debug, escapeLeadingUnderscores, factory,FindAllReferences,getDecorators,getModifiers,getPropertySymbolFromBindingElement,getUniqueName,hasSyntacticModifier,isArrayLiteralExpression, isBindingElement, isExpressionStatement, isExternalModuleReference, isIdentifier, isImportDeclaration, isImportEqualsDeclaration, isObjectLiteralExpression, isPropertyAccessExpression, isPropertyAssignment, isRequireCall, isSourceFile, isStringLiteral, isStringLiteralLike, isVariableDeclaration, isVariableDeclarationList, isVariableStatement, LanguageServiceHost, makeImportIfNecessary, makeStringLiteral, ObjectBindingElementWithoutPropertyName, QuotePreference, skipAlias, symbolNameNoDefault, textChanges } from "./_namespaces/ts";
import { forEachTopLevelDeclaration, isNonVariableTopLevelDeclaration, NonVariableTopLevelDeclaration, ReadonlySymbolSet,StatementRange, TopLevelDeclaration, TopLevelVariableDeclaration } from "./createNewFilename";

export function addNewFileToTsconfig(program: Program, changes: textChanges.ChangeTracker, oldFileName: string, newFileNameWithExtension: string, getCanonicalFileName: GetCanonicalFileName): void {
    const cfg = program.getCompilerOptions().configFile;
    if (!cfg) return;

    const newFileAbsolutePath = normalizePath(combinePaths(oldFileName, "..", newFileNameWithExtension));
    const newFilePath = getRelativePathFromFile(cfg.fileName, newFileAbsolutePath, getCanonicalFileName);

    const cfgObject = cfg.statements[0] && tryCast(cfg.statements[0].expression, isObjectLiteralExpression);
    const filesProp = cfgObject && find(cfgObject.properties, (prop): prop is PropertyAssignment =>
        isPropertyAssignment(prop) && isStringLiteral(prop.name) && prop.name.text === "files");
    if (filesProp && isArrayLiteralExpression(filesProp.initializer)) {
        changes.insertNodeInListAfter(cfg, last(filesProp.initializer.elements), factory.createStringLiteral(newFilePath), filesProp.initializer.elements);
    }
}

export function deleteMovedStatements(sourceFile: SourceFile, moved: readonly StatementRange[], changes: textChanges.ChangeTracker) {
    for (const { first, afterLast } of moved) {
        changes.deleteNodeRangeExcludingEnd(sourceFile, first, afterLast);
    }
}

export function deleteUnusedOldImports(oldFile: SourceFile, toMove: readonly Statement[], changes: textChanges.ChangeTracker, toDelete: ReadonlySymbolSet, checker: TypeChecker) {
    for (const statement of oldFile.statements) {
        if (contains(toMove, statement)) continue;
        forEachImportInStatement(statement, i => deleteUnusedImports(oldFile, i, changes, name => toDelete.has(checker.getSymbolAtLocation(name)!)));
    }
}

export function updateImportsInOtherFiles(
    changes: textChanges.ChangeTracker, program: Program, host: LanguageServiceHost, oldFile: SourceFile, movedSymbols: ReadonlySymbolSet, newFilename: string, quotePreference: QuotePreference
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
                        : skipAlias(checker.getSymbolAtLocation(name)!, checker); // TODO: GH#18217
                    return !!symbol && movedSymbols.has(symbol);
                };
                deleteUnusedImports(sourceFile, importNode, changes, shouldMove); // These will be changed to imports from the new file

                const pathToNewFileWithExtension = resolvePath(getDirectoryPath(oldFile.path), newFilename);
                const newModuleSpecifier = getModuleSpecifier(program.getCompilerOptions(), sourceFile, sourceFile.path, pathToNewFileWithExtension, createModuleSpecifierResolutionHost(program, host));
                const newImportDeclaration = filterImport(importNode, makeStringLiteral(newModuleSpecifier, quotePreference), shouldMove);
                if (newImportDeclaration) changes.insertNodeAfter(sourceFile, statement, newImportDeclaration);

                const ns = getNamespaceLikeImport(importNode);
                if (ns) updateNamespaceLikeImport(changes, sourceFile, checker, movedSymbols, newModuleSpecifier, ns, importNode, quotePreference);
            });
        }
    }
}

export function getNamespaceLikeImport(node: SupportedImport): Identifier | undefined {
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

export function updateNamespaceLikeImport(
    changes: textChanges.ChangeTracker,
    sourceFile: SourceFile,
    checker: TypeChecker,
    movedSymbols: ReadonlySymbolSet,
    newModuleSpecifier: string,
    oldImportId: Identifier,
    oldImportNode: SupportedImport,
    quotePreference: QuotePreference
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
                /*assertClause*/ undefined);
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

export function moduleSpecifierFromImport(i: SupportedImport): StringLiteralLike {
    return (i.kind === SyntaxKind.ImportDeclaration ? i.moduleSpecifier
        : i.kind === SyntaxKind.ImportEqualsDeclaration ? i.moduleReference.expression
        : i.initializer.arguments[0]);
}

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

type SupportedImport =
    | ImportDeclaration & { moduleSpecifier: StringLiteralLike }
    | ImportEqualsDeclaration & { moduleReference: ExternalModuleReference & { expression: StringLiteralLike } }
    | VariableDeclaration & { initializer: RequireOrImportCall };
export type SupportedImportStatement =
    | ImportDeclaration
    | ImportEqualsDeclaration
    | VariableStatement;

export function createOldFileImportsFromNewFile(
    sourceFile: SourceFile,
    newFileNeedExport: ReadonlySymbolSet,
    newFileNameWithExtension: string,
    program: Program,
    host: LanguageServiceHost,
    useEs6Imports: boolean,
    quotePreference: QuotePreference
): AnyImportOrRequireStatement | undefined {
    let defaultImport: Identifier | undefined;
    const imports: string[] = [];
    newFileNeedExport.forEach(symbol => {
        if (symbol.escapedName === InternalSymbolName.Default) {
            defaultImport = factory.createIdentifier(symbolNameNoDefault(symbol)!); // TODO: GH#18217
        }
        else {
            imports.push(symbol.name);
        }
    });
    return makeImportOrRequire(sourceFile, defaultImport, imports, newFileNameWithExtension, program, host, useEs6Imports, quotePreference);
}

export function makeImportOrRequire(
    sourceFile: SourceFile,
    defaultImport: Identifier | undefined,
    imports: readonly string[],
    newFileNameWithExtension: string,
    program: Program,
    host: LanguageServiceHost,
    useEs6Imports: boolean,
    quotePreference: QuotePreference
): AnyImportOrRequireStatement | undefined {
    const pathToNewFile = resolvePath(getDirectoryPath(sourceFile.path), newFileNameWithExtension);
    const pathToNewFileWithCorrectExtension = getModuleSpecifier(program.getCompilerOptions(), sourceFile, sourceFile.path, pathToNewFile, createModuleSpecifierResolutionHost(program, host));

    if (useEs6Imports) {
        const specifiers = imports.map(i => factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, factory.createIdentifier(i)));
        return makeImportIfNecessary(defaultImport, specifiers, pathToNewFileWithCorrectExtension, quotePreference);
    }
    else {
        Debug.assert(!defaultImport, "No default import should exist"); // If there's a default export, it should have been an es6 module.
        const bindingElements = imports.map(i => factory.createBindingElement(/*dotDotDotToken*/ undefined, /*propertyName*/ undefined, i));
        return bindingElements.length
            ? makeVariableStatement(factory.createObjectBindingPattern(bindingElements), /*type*/ undefined, createRequireCall(makeStringLiteral(pathToNewFileWithCorrectExtension, quotePreference))) as RequireVariableStatement
            : undefined;
    }
}

function makeVariableStatement(name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined, flags: NodeFlags = NodeFlags.Const) {
    return factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, type, initializer)], flags));
}

export function addExports(sourceFile: SourceFile, toMove: readonly Statement[], needExport: ReadonlySymbolSet, useEs6Exports: boolean): readonly Statement[] {
    return flatMap(toMove, statement => {
        if (isTopLevelDeclarationStatement(statement) &&
            !isExported(sourceFile, statement, useEs6Exports) &&
            forEachTopLevelDeclaration(statement, d => needExport.has(Debug.checkDefined(tryCast(d, canHaveSymbol)?.symbol)))) {
            const exports = addExport(statement, useEs6Exports);
            if (exports) return exports;
        }
        return statement;
    });
}

export function isExported(sourceFile: SourceFile, decl: TopLevelDeclarationStatement, useEs6Exports: boolean, name?: Identifier): boolean {
    if (useEs6Exports) {
        return !isExpressionStatement(decl) && hasSyntacticModifier(decl, ModifierFlags.Export) || !!(name && sourceFile.symbol.exports?.has(name.escapedText));
    }
    return !!sourceFile.symbol && !!sourceFile.symbol.exports &&
        getNamesToExportInCommonJS(decl).some(name => sourceFile.symbol.exports!.has(escapeLeadingUnderscores(name)));
}

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
                    factory.updateImportClause(importDecl.importClause, importDecl.importClause.isTypeOnly, name, /*namedBindings*/ undefined)
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
                    changes.delete(sourceFile,
                        isVariableDeclarationList(varDecl.parent) && length(varDecl.parent.declarations) === 1 ? varDecl.parent.parent : varDecl);
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

type TopLevelDeclarationStatement = NonVariableTopLevelDeclaration | VariableStatement;

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
            return Debug.fail(); // Shouldn't try to add 'export' keyword to `exports.x = ...`
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
            factory.createIdentifier(name)));
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

export function filterImport(i: SupportedImport, moduleSpecifier: StringLiteralLike, keep: (name: Identifier) => boolean): SupportedImportStatement | undefined {
    switch (i.kind) {
        case SyntaxKind.ImportDeclaration: {
            const clause = i.importClause;
            if (!clause) return undefined;
            const defaultImport = clause.name && keep(clause.name) ? clause.name : undefined;
            const namedBindings = clause.namedBindings && filterNamedBindings(clause.namedBindings, keep);
            return defaultImport || namedBindings
                ? factory.createImportDeclaration(/*modifiers*/ undefined, factory.createImportClause(clause.isTypeOnly, defaultImport, namedBindings), moduleSpecifier, /*assertClause*/ undefined)
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

export function nameOfTopLevelDeclaration(d: TopLevelDeclaration): Identifier | undefined {
    return isExpressionStatement(d) ? tryCast(d.expression.left.name, isIdentifier) : tryCast(d.name, isIdentifier);
}

export function getTopLevelDeclarationStatement(d: TopLevelDeclaration): TopLevelDeclarationStatement {
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
