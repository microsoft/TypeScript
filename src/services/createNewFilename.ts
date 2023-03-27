import { cast, contains, find, findIndex, firstDefined, getRangesWhere, some } from "../compiler/core";
import { combinePaths, getDirectoryPath } from "../compiler/path";
import { AssignmentDeclarationKind, BinaryExpression, BindingElement, BindingName, ClassDeclaration, Declaration, EnumDeclaration, ExpressionStatement, FunctionDeclaration, ImportEqualsDeclaration, InterfaceDeclaration, ModifierFlags, ModuleDeclaration, Node, Program, PropertyAccessExpression, SourceFile, Statement, SymbolFlags, SyntaxKind, TransformFlags, TypeAliasDeclaration, TypeChecker, VariableDeclaration, VariableDeclarationList, VariableStatement } from "../compiler/types";
import { copyEntries, extensionFromPath, forEachEntry, getAssignmentDeclarationKind, hasSyntacticModifier, isDeclarationName, isPrologueDirective, isRequireCall } from "../compiler/utilities";
import { createTextRangeFromSpan, Debug, getRefactorContextSpan, getSymbolId, isBinaryExpression, isBindingElement, isExpressionStatement, isIdentifier, isNamedDeclaration, isOmittedExpression, isSourceFile, isVariableDeclaration, rangeContainsRange, Symbol, symbolNameNoDefault } from "./_namespaces/ts";
import { LanguageServiceHost, RefactorContext } from "./types";

interface ToMove {
    readonly all: readonly Statement[];
    readonly ranges: readonly StatementRange[];
}

interface StatementRange {
    readonly first: Statement;
    readonly afterLast: Statement | undefined;
}

interface ReadonlySymbolSet {
    size(): number;
    has(symbol: Symbol): boolean;
    forEach(cb: (symbol: Symbol) => void): void;
    forEachEntry<T>(cb: (symbol: Symbol) => T | undefined): T | undefined;
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
interface TopLevelVariableDeclaration extends VariableDeclaration { parent: VariableDeclarationList & { parent: VariableStatement; }; }
type TopLevelDeclaration = NonVariableTopLevelDeclaration | TopLevelVariableDeclaration | BindingElement;

/** @internal */
export function createNewFilename(oldFile: SourceFile, program: Program, context: RefactorContext, host: LanguageServiceHost): string {
    const checker = program.getTypeChecker();
    const toMove = getStatementsToMove(context);
    let usage;
    if (toMove) {
        usage = getUsageInfo(oldFile, toMove.all, checker);
        const currentDirectory = getDirectoryPath(oldFile.fileName);
        const extension = extensionFromPath(oldFile.fileName);
        const newFilename = combinePaths(
        // new file is always placed in the same directory as the old file
        currentDirectory,
        // ensures the filename computed below isn't already taken
        makeUniqueFilename(
            // infers a name for the new file from the symbols being moved
            inferNewFilename(usage.oldFileImportsFromNewFile, usage.movedSymbols),
            extension,
            currentDirectory,
            host))
        // new file has same extension as old file
        + extension;
    return newFilename;
    }
    return "";
}

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

function getStatementsToMove(context: RefactorContext): ToMove | undefined {
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

function makeUniqueFilename(proposedFilename: string, extension: string, inDirectory: string, host: LanguageServiceHost): string {
    let newFilename = proposedFilename;
    for (let i = 1; ; i++) {
        const name = combinePaths(inDirectory, newFilename + extension);
        if (!host.fileExists(name)) return newFilename;
        newFilename = `${proposedFilename}.${i}`;
    }
}

function inferNewFilename(importsFromNewFile: ReadonlySymbolSet, movedSymbols: ReadonlySymbolSet): string {
    return importsFromNewFile.forEachEntry(symbolNameNoDefault) || movedSymbols.forEachEntry(symbolNameNoDefault) || "newFile";
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

function isTopLevelDeclaration(node: Node): node is TopLevelDeclaration {
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
interface ReadonlySymbolSet {
    size(): number;
    has(symbol: Symbol): boolean;
    forEach(cb: (symbol: Symbol) => void): void;
    forEachEntry<T>(cb: (symbol: Symbol) => T | undefined): T | undefined;
}

class SymbolSet implements ReadonlySymbolSet {
    private map = new Map<string, Symbol>();
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
    size() {
        return this.map.size;
    }
}