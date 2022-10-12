import * as ts from "../_namespaces/ts";

ts.codefix.registerCodeFix({
    errorCodes: [ts.Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES_module.code],
    getCodeActions(context) {
        const { sourceFile, program, preferences } = context;
        const changes = ts.textChanges.ChangeTracker.with(context, changes => {
            const moduleExportsChangedToDefault = convertFileToEsModule(sourceFile, program.getTypeChecker(), changes, ts.getEmitScriptTarget(program.getCompilerOptions()), ts.getQuotePreference(sourceFile, preferences));
            if (moduleExportsChangedToDefault) {
                for (const importingFile of program.getSourceFiles()) {
                    fixImportOfModuleExports(importingFile, sourceFile, changes, ts.getQuotePreference(importingFile, preferences));
                }
            }
        });
        // No support for fix-all since this applies to the whole file at once anyway.
        return [ts.codefix.createCodeFixActionWithoutFixAll("convertToEsModule", changes, ts.Diagnostics.Convert_to_ES_module)];
    },
});

function fixImportOfModuleExports(importingFile: ts.SourceFile, exportingFile: ts.SourceFile, changes: ts.textChanges.ChangeTracker, quotePreference: ts.QuotePreference) {
    for (const moduleSpecifier of importingFile.imports) {
        const imported = ts.getResolvedModule(importingFile, moduleSpecifier.text, ts.getModeForUsageLocation(importingFile, moduleSpecifier));
        if (!imported || imported.resolvedFileName !== exportingFile.fileName) {
            continue;
        }

        const importNode = ts.importFromModuleSpecifier(moduleSpecifier);
        switch (importNode.kind) {
            case ts.SyntaxKind.ImportEqualsDeclaration:
                changes.replaceNode(importingFile, importNode, ts.makeImport(importNode.name, /*namedImports*/ undefined, moduleSpecifier, quotePreference));
                break;
            case ts.SyntaxKind.CallExpression:
                if (ts.isRequireCall(importNode, /*checkArgumentIsStringLiteralLike*/ false)) {
                    changes.replaceNode(importingFile, importNode, ts.factory.createPropertyAccessExpression(ts.getSynthesizedDeepClone(importNode), "default"));
                }
                break;
        }
    }
}

/** @returns Whether we converted a `module.exports =` to a default export. */
function convertFileToEsModule(sourceFile: ts.SourceFile, checker: ts.TypeChecker, changes: ts.textChanges.ChangeTracker, target: ts.ScriptTarget, quotePreference: ts.QuotePreference): ModuleExportsChanged {
    const identifiers: Identifiers = { original: collectFreeIdentifiers(sourceFile), additional: new ts.Set() };
    const exports = collectExportRenames(sourceFile, checker, identifiers);
    convertExportsAccesses(sourceFile, exports, changes);
    let moduleExportsChangedToDefault = false;
    let useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined;
    // Process variable statements first to collect use sites that need to be updated inside other transformations
    for (const statement of ts.filter(sourceFile.statements, ts.isVariableStatement)) {
        const newUseSites = convertVariableStatement(sourceFile, statement, changes, checker, identifiers, target, quotePreference);
        if (newUseSites) {
            ts.copyEntries(newUseSites, useSitesToUnqualify ??= new ts.Map());
        }
    }
    // `convertStatement` will delete entries from `useSitesToUnqualify` when containing statements are replaced
    for (const statement of ts.filter(sourceFile.statements, s => !ts.isVariableStatement(s))) {
        const moduleExportsChanged = convertStatement(sourceFile, statement, checker, changes, identifiers, target, exports, useSitesToUnqualify, quotePreference);
        moduleExportsChangedToDefault = moduleExportsChangedToDefault || moduleExportsChanged;
    }
    // Remaining use sites can be changed directly
    useSitesToUnqualify?.forEach((replacement, original) => {
        changes.replaceNode(sourceFile, original, replacement);
    });

    return moduleExportsChangedToDefault;
}

/**
 * Contains an entry for each renamed export.
 * This is necessary because `exports.x = 0;` does not declare a local variable.
 * Converting this to `export const x = 0;` would declare a local, so we must be careful to avoid shadowing.
 * If there would be shadowing at either the declaration or at any reference to `exports.x` (now just `x`), we must convert to:
 *     const _x = 0;
 *     export { _x as x };
 * This conversion also must place if the exported name is not a valid identifier, e.g. `exports.class = 0;`.
 */
type ExportRenames = ts.ReadonlyESMap<string, string>;

function collectExportRenames(sourceFile: ts.SourceFile, checker: ts.TypeChecker, identifiers: Identifiers): ExportRenames {
    const res = new ts.Map<string, string>();
    forEachExportReference(sourceFile, node => {
        const { text, originalKeywordKind } = node.name;
        if (!res.has(text) && (originalKeywordKind !== undefined && ts.isNonContextualKeyword(originalKeywordKind)
            || checker.resolveName(text, node, ts.SymbolFlags.Value, /*excludeGlobals*/ true))) {
            // Unconditionally add an underscore in case `text` is a keyword.
            res.set(text, makeUniqueName(`_${text}`, identifiers));
        }
    });
    return res;
}

function convertExportsAccesses(sourceFile: ts.SourceFile, exports: ExportRenames, changes: ts.textChanges.ChangeTracker): void {
    forEachExportReference(sourceFile, (node, isAssignmentLhs) => {
        if (isAssignmentLhs) {
            return;
        }
        const { text } = node.name;
        changes.replaceNode(sourceFile, node, ts.factory.createIdentifier(exports.get(text) || text));
    });
}

function forEachExportReference(sourceFile: ts.SourceFile, cb: (node: (ts.PropertyAccessExpression & { name: ts.Identifier }), isAssignmentLhs: boolean) => void): void {
    sourceFile.forEachChild(function recur(node) {
        if (ts.isPropertyAccessExpression(node) && ts.isExportsOrModuleExportsOrAlias(sourceFile, node.expression) && ts.isIdentifier(node.name)) {
            const { parent } = node;
            cb(node as typeof node & { name: ts.Identifier }, ts.isBinaryExpression(parent) && parent.left === node && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken);
        }
        node.forEachChild(recur);
    });
}

/** Whether `module.exports =` was changed to `export default` */
type ModuleExportsChanged = boolean;

function convertStatement(
    sourceFile: ts.SourceFile,
    statement: ts.Statement,
    checker: ts.TypeChecker,
    changes: ts.textChanges.ChangeTracker,
    identifiers: Identifiers,
    target: ts.ScriptTarget,
    exports: ExportRenames,
    useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined,
    quotePreference: ts.QuotePreference
): ModuleExportsChanged {
    switch (statement.kind) {
        case ts.SyntaxKind.VariableStatement:
            convertVariableStatement(sourceFile, statement as ts.VariableStatement, changes, checker, identifiers, target, quotePreference);
            return false;
        case ts.SyntaxKind.ExpressionStatement: {
            const { expression } = statement as ts.ExpressionStatement;
            switch (expression.kind) {
                case ts.SyntaxKind.CallExpression: {
                    if (ts.isRequireCall(expression, /*checkArgumentIsStringLiteralLike*/ true)) {
                        // For side-effecting require() call, just make a side-effecting import.
                        changes.replaceNode(sourceFile, statement, ts.makeImport(/*name*/ undefined, /*namedImports*/ undefined, expression.arguments[0], quotePreference));
                    }
                    return false;
                }
                case ts.SyntaxKind.BinaryExpression: {
                    const { operatorToken } = expression as ts.BinaryExpression;
                    return operatorToken.kind === ts.SyntaxKind.EqualsToken && convertAssignment(sourceFile, checker, expression as ts.BinaryExpression, changes, exports, useSitesToUnqualify);
                }
            }
        }
        // falls through
        default:
            return false;
    }
}

function convertVariableStatement(
    sourceFile: ts.SourceFile,
    statement: ts.VariableStatement,
    changes: ts.textChanges.ChangeTracker,
    checker: ts.TypeChecker,
    identifiers: Identifiers,
    target: ts.ScriptTarget,
    quotePreference: ts.QuotePreference,
): ts.ESMap<ts.Node, ts.Node> | undefined {
    const { declarationList } = statement;
    let foundImport = false;
    const converted = ts.map(declarationList.declarations, decl => {
        const { name, initializer } = decl;
        if (initializer) {
            if (ts.isExportsOrModuleExportsOrAlias(sourceFile, initializer)) {
                // `const alias = module.exports;` can be removed.
                foundImport = true;
                return convertedImports([]);
            }
            else if (ts.isRequireCall(initializer, /*checkArgumentIsStringLiteralLike*/ true)) {
                foundImport = true;
                return convertSingleImport(name, initializer.arguments[0], checker, identifiers, target, quotePreference);
            }
            else if (ts.isPropertyAccessExpression(initializer) && ts.isRequireCall(initializer.expression, /*checkArgumentIsStringLiteralLike*/ true)) {
                foundImport = true;
                return convertPropertyAccessImport(name, initializer.name.text, initializer.expression.arguments[0], identifiers, quotePreference);
            }
        }
        // Move it out to its own variable statement. (This will not be used if `!foundImport`)
        return convertedImports([ts.factory.createVariableStatement(/*modifiers*/ undefined, ts.factory.createVariableDeclarationList([decl], declarationList.flags))]);
    });
    if (foundImport) {
        // useNonAdjustedEndPosition to ensure we don't eat the newline after the statement.
        changes.replaceNodeWithNodes(sourceFile, statement, ts.flatMap(converted, c => c.newImports));
        let combinedUseSites: ts.ESMap<ts.Node, ts.Node> | undefined;
        ts.forEach(converted, c => {
            if (c.useSitesToUnqualify) {
                ts.copyEntries(c.useSitesToUnqualify, combinedUseSites ??= new ts.Map());
            }
        });

        return combinedUseSites;
    }
}

/** Converts `const name = require("moduleSpecifier").propertyName` */
function convertPropertyAccessImport(name: ts.BindingName, propertyName: string, moduleSpecifier: ts.StringLiteralLike, identifiers: Identifiers, quotePreference: ts.QuotePreference): ConvertedImports {
    switch (name.kind) {
        case ts.SyntaxKind.ObjectBindingPattern:
        case ts.SyntaxKind.ArrayBindingPattern: {
            // `const [a, b] = require("c").d` --> `import { d } from "c"; const [a, b] = d;`
            const tmp  = makeUniqueName(propertyName, identifiers);
            return convertedImports([
                makeSingleImport(tmp, propertyName, moduleSpecifier, quotePreference),
                makeConst(/*modifiers*/ undefined, name, ts.factory.createIdentifier(tmp)),
            ]);
        }
        case ts.SyntaxKind.Identifier:
            // `const a = require("b").c` --> `import { c as a } from "./b";
            return convertedImports([makeSingleImport(name.text, propertyName, moduleSpecifier, quotePreference)]);
        default:
            return ts.Debug.assertNever(name, `Convert to ES module got invalid syntax form ${(name as ts.BindingName).kind}`);
    }
}

function convertAssignment(
    sourceFile: ts.SourceFile,
    checker: ts.TypeChecker,
    assignment: ts.BinaryExpression,
    changes: ts.textChanges.ChangeTracker,
    exports: ExportRenames,
    useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined,
): ModuleExportsChanged {
    const { left, right } = assignment;
    if (!ts.isPropertyAccessExpression(left)) {
        return false;
    }

    if (ts.isExportsOrModuleExportsOrAlias(sourceFile, left)) {
        if (ts.isExportsOrModuleExportsOrAlias(sourceFile, right)) {
            // `const alias = module.exports;` or `module.exports = alias;` can be removed.
            changes.delete(sourceFile, assignment.parent);
        }
        else {
            const replacement = ts.isObjectLiteralExpression(right) ? tryChangeModuleExportsObject(right, useSitesToUnqualify)
                : ts.isRequireCall(right, /*checkArgumentIsStringLiteralLike*/ true) ? convertReExportAll(right.arguments[0], checker)
                : undefined;
            if (replacement) {
                changes.replaceNodeWithNodes(sourceFile, assignment.parent, replacement[0]);
                return replacement[1];
            }
            else {
                changes.replaceRangeWithText(sourceFile, ts.createRange(left.getStart(sourceFile), right.pos), "export default");
                return true;
            }
        }
    }
    else if (ts.isExportsOrModuleExportsOrAlias(sourceFile, left.expression)) {
        convertNamedExport(sourceFile, assignment as ts.BinaryExpression & { left: ts.PropertyAccessExpression }, changes, exports);
    }

    return false;
}

/**
 * Convert `module.exports = { ... }` to individual exports..
 * We can't always do this if the module has interesting members -- then it will be a default export instead.
 */
function tryChangeModuleExportsObject(object: ts.ObjectLiteralExpression, useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined): [readonly ts.Statement[], ModuleExportsChanged] | undefined {
    const statements = ts.mapAllOrFail(object.properties, prop => {
        switch (prop.kind) {
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            // TODO: Maybe we should handle this? See fourslash test `refactorConvertToEs6Module_export_object_shorthand.ts`.
            // falls through
            case ts.SyntaxKind.ShorthandPropertyAssignment:
            case ts.SyntaxKind.SpreadAssignment:
                return undefined;
            case ts.SyntaxKind.PropertyAssignment:
                return !ts.isIdentifier(prop.name) ? undefined : convertExportsDotXEquals_replaceNode(prop.name.text, prop.initializer, useSitesToUnqualify);
            case ts.SyntaxKind.MethodDeclaration:
                return !ts.isIdentifier(prop.name) ? undefined : functionExpressionToDeclaration(prop.name.text, [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)], prop, useSitesToUnqualify);
            default:
                ts.Debug.assertNever(prop, `Convert to ES6 got invalid prop kind ${(prop as ts.ObjectLiteralElementLike).kind}`);
        }
    });
    return statements && [statements, false];
}

function convertNamedExport(
    sourceFile: ts.SourceFile,
    assignment: ts.BinaryExpression & { left: ts.PropertyAccessExpression },
    changes: ts.textChanges.ChangeTracker,
    exports: ExportRenames,
): void {
    // If "originalKeywordKind" was set, this is e.g. `exports.
    const { text } = assignment.left.name;
    const rename = exports.get(text);
    if (rename !== undefined) {
        /*
        const _class = 0;
        export { _class as class };
        */
        const newNodes = [
            makeConst(/*modifiers*/ undefined, rename, assignment.right),
            makeExportDeclaration([ts.factory.createExportSpecifier(/*isTypeOnly*/ false, rename, text)]),
        ];
        changes.replaceNodeWithNodes(sourceFile, assignment.parent, newNodes);
    }
    else {
        convertExportsPropertyAssignment(assignment, sourceFile, changes);
    }
}

function convertReExportAll(reExported: ts.StringLiteralLike, checker: ts.TypeChecker): [readonly ts.Statement[], ModuleExportsChanged] {
    // `module.exports = require("x");` ==> `export * from "x"; export { default } from "x";`
    const moduleSpecifier = reExported.text;
    const moduleSymbol = checker.getSymbolAtLocation(reExported);
    const exports = moduleSymbol ? moduleSymbol.exports! : ts.emptyMap as ts.ReadonlyCollection<ts.__String>;
    return exports.has(ts.InternalSymbolName.ExportEquals) ? [[reExportDefault(moduleSpecifier)], true] :
        !exports.has(ts.InternalSymbolName.Default) ? [[reExportStar(moduleSpecifier)], false] :
        // If there's some non-default export, must include both `export *` and `export default`.
        exports.size > 1 ? [[reExportStar(moduleSpecifier), reExportDefault(moduleSpecifier)], true] : [[reExportDefault(moduleSpecifier)], true];
}
function reExportStar(moduleSpecifier: string): ts.ExportDeclaration {
    return makeExportDeclaration(/*exportClause*/ undefined, moduleSpecifier);
}
function reExportDefault(moduleSpecifier: string): ts.ExportDeclaration {
    return makeExportDeclaration([ts.factory.createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, "default")], moduleSpecifier);
}

function convertExportsPropertyAssignment({ left, right, parent }: ts.BinaryExpression & { left: ts.PropertyAccessExpression }, sourceFile: ts.SourceFile, changes: ts.textChanges.ChangeTracker): void {
    const name = left.name.text;
    if ((ts.isFunctionExpression(right) || ts.isArrowFunction(right) || ts.isClassExpression(right)) && (!right.name || right.name.text === name)) {
        // `exports.f = function() {}` -> `export function f() {}` -- Replace `exports.f = ` with `export `, and insert the name after `function`.
        changes.replaceRange(sourceFile, { pos: left.getStart(sourceFile), end: right.getStart(sourceFile) }, ts.factory.createToken(ts.SyntaxKind.ExportKeyword), { suffix: " " });

        if (!right.name) changes.insertName(sourceFile, right, name);

        const semi = ts.findChildOfKind(parent, ts.SyntaxKind.SemicolonToken, sourceFile);
        if (semi) changes.delete(sourceFile, semi);
    }
    else {
        // `exports.f = function g() {}` -> `export const f = function g() {}` -- just replace `exports.` with `export const `
        changes.replaceNodeRangeWithNodes(sourceFile, left.expression, ts.findChildOfKind(left, ts.SyntaxKind.DotToken, sourceFile)!,
            [ts.factory.createToken(ts.SyntaxKind.ExportKeyword), ts.factory.createToken(ts.SyntaxKind.ConstKeyword)],
            { joiner: " ", suffix: " " });
    }
}

// TODO: GH#22492 this will cause an error if a change has been made inside the body of the node.
function convertExportsDotXEquals_replaceNode(name: string | undefined, exported: ts.Expression, useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined): ts.Statement {
    const modifiers = [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)];
    switch (exported.kind) {
        case ts.SyntaxKind.FunctionExpression: {
            const { name: expressionName } = exported as ts.FunctionExpression;
            if (expressionName && expressionName.text !== name) {
                // `exports.f = function g() {}` -> `export const f = function g() {}`
                return exportConst();
            }
        }

        // falls through
        case ts.SyntaxKind.ArrowFunction:
            // `exports.f = function() {}` --> `export function f() {}`
            return functionExpressionToDeclaration(name, modifiers, exported as ts.FunctionExpression | ts.ArrowFunction, useSitesToUnqualify);
        case ts.SyntaxKind.ClassExpression:
            // `exports.C = class {}` --> `export class C {}`
            return classExpressionToDeclaration(name, modifiers, exported as ts.ClassExpression, useSitesToUnqualify);
        default:
            return exportConst();
    }

    function exportConst() {
        // `exports.x = 0;` --> `export const x = 0;`
        return makeConst(modifiers, ts.factory.createIdentifier(name!), replaceImportUseSites(exported, useSitesToUnqualify)); // TODO: GH#18217
    }
}

function replaceImportUseSites<T extends ts.Node>(node: T, useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined): T;
function replaceImportUseSites<T extends ts.Node>(nodes: ts.NodeArray<T>, useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined): ts.NodeArray<T>;
function replaceImportUseSites<T extends ts.Node>(nodeOrNodes: T | ts.NodeArray<T>, useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined) {
    if (!useSitesToUnqualify || !ts.some(ts.arrayFrom(useSitesToUnqualify.keys()), original => ts.rangeContainsRange(nodeOrNodes, original))) {
        return nodeOrNodes;
    }

    return ts.isArray(nodeOrNodes)
        ? ts.getSynthesizedDeepClonesWithReplacements(nodeOrNodes, /*includeTrivia*/ true, replaceNode)
        : ts.getSynthesizedDeepCloneWithReplacements(nodeOrNodes, /*includeTrivia*/ true, replaceNode);

    function replaceNode(original: ts.Node) {
        // We are replacing `mod.SomeExport` wih `SomeExport`, so we only need to look at PropertyAccessExpressions
        if (original.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const replacement = useSitesToUnqualify!.get(original);
            // Remove entry from `useSitesToUnqualify` so the refactor knows it's taken care of by the parent statement we're replacing
            useSitesToUnqualify!.delete(original);
            return replacement;
        }
    }
}

/**
 * Converts `const <<name>> = require("x");`.
 * Returns nodes that will replace the variable declaration for the commonjs import.
 * May also make use `changes` to remove qualifiers at the use sites of imports, to change `mod.x` to `x`.
 */
function convertSingleImport(
    name: ts.BindingName,
    moduleSpecifier: ts.StringLiteralLike,
    checker: ts.TypeChecker,
    identifiers: Identifiers,
    target: ts.ScriptTarget,
    quotePreference: ts.QuotePreference,
): ConvertedImports {
    switch (name.kind) {
        case ts.SyntaxKind.ObjectBindingPattern: {
            const importSpecifiers = ts.mapAllOrFail(name.elements, e =>
                e.dotDotDotToken || e.initializer || e.propertyName && !ts.isIdentifier(e.propertyName) || !ts.isIdentifier(e.name)
                    ? undefined
                    : makeImportSpecifier(e.propertyName && e.propertyName.text, e.name.text));
            if (importSpecifiers) {
                return convertedImports([ts.makeImport(/*name*/ undefined, importSpecifiers, moduleSpecifier, quotePreference)]);
            }
        }
        // falls through -- object destructuring has an interesting pattern and must be a variable declaration
        case ts.SyntaxKind.ArrayBindingPattern: {
            /*
            import x from "x";
            const [a, b, c] = x;
            */
            const tmp = makeUniqueName(ts.codefix.moduleSpecifierToValidIdentifier(moduleSpecifier.text, target), identifiers);
            return convertedImports([
                ts.makeImport(ts.factory.createIdentifier(tmp), /*namedImports*/ undefined, moduleSpecifier, quotePreference),
                makeConst(/*modifiers*/ undefined, ts.getSynthesizedDeepClone(name), ts.factory.createIdentifier(tmp)),
            ]);
        }
        case ts.SyntaxKind.Identifier:
            return convertSingleIdentifierImport(name, moduleSpecifier, checker, identifiers, quotePreference);
        default:
            return ts.Debug.assertNever(name, `Convert to ES module got invalid name kind ${(name as ts.BindingName).kind}`);
    }
}

/**
 * Convert `import x = require("x").`
 * Also:
 * - Convert `x.default()` to `x()` to handle ES6 default export
 * - Converts uses like `x.y()` to `y()` and uses a named import.
 */
function convertSingleIdentifierImport(name: ts.Identifier, moduleSpecifier: ts.StringLiteralLike, checker: ts.TypeChecker, identifiers: Identifiers, quotePreference: ts.QuotePreference): ConvertedImports {
    const nameSymbol = checker.getSymbolAtLocation(name);
    // Maps from module property name to name actually used. (The same if there isn't shadowing.)
    const namedBindingsNames = new ts.Map<string, string>();
    // True if there is some non-property use like `x()` or `f(x)`.
    let needDefaultImport = false;
    let useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined;

    for (const use of identifiers.original.get(name.text)!) {
        if (checker.getSymbolAtLocation(use) !== nameSymbol || use === name) {
            // This was a use of a different symbol with the same name, due to shadowing. Ignore.
            continue;
        }

        const { parent } = use;
        if (ts.isPropertyAccessExpression(parent)) {
            const { name: { text: propertyName } } = parent;
            if (propertyName === "default") {
                needDefaultImport = true;

                const importDefaultName = use.getText();
                (useSitesToUnqualify ??= new ts.Map()).set(parent, ts.factory.createIdentifier(importDefaultName));
            }
            else {
                ts.Debug.assert(parent.expression === use, "Didn't expect expression === use"); // Else shouldn't have been in `collectIdentifiers`
                let idName = namedBindingsNames.get(propertyName);
                if (idName === undefined) {
                    idName = makeUniqueName(propertyName, identifiers);
                    namedBindingsNames.set(propertyName, idName);
                }

                (useSitesToUnqualify ??= new ts.Map()).set(parent, ts.factory.createIdentifier(idName));
            }
        }
        else {
            needDefaultImport = true;
        }
    }

    const namedBindings = namedBindingsNames.size === 0 ? undefined : ts.arrayFrom(ts.mapIterator(namedBindingsNames.entries(), ([propertyName, idName]) =>
        ts.factory.createImportSpecifier(/*isTypeOnly*/ false, propertyName === idName ? undefined : ts.factory.createIdentifier(propertyName), ts.factory.createIdentifier(idName))));
    if (!namedBindings) {
        // If it was unused, ensure that we at least import *something*.
        needDefaultImport = true;
    }
    return convertedImports(
        [ts.makeImport(needDefaultImport ? ts.getSynthesizedDeepClone(name) : undefined, namedBindings, moduleSpecifier, quotePreference)],
        useSitesToUnqualify
    );
}

// Identifiers helpers

function makeUniqueName(name: string, identifiers: Identifiers): string {
    while (identifiers.original.has(name) || identifiers.additional.has(name)) {
        name = `_${name}`;
    }
    identifiers.additional.add(name);
    return name;
}

/**
 * Helps us create unique identifiers.
 * `original` refers to the local variable names in the original source file.
 * `additional` is any new unique identifiers we've generated. (e.g., we'll generate `_x`, then `__x`.)
 */
interface Identifiers {
    readonly original: FreeIdentifiers;
    // Additional identifiers we've added. Mutable!
    readonly additional: ts.Set<string>;
}

type FreeIdentifiers = ts.ReadonlyESMap<string, readonly ts.Identifier[]>;
function collectFreeIdentifiers(file: ts.SourceFile): FreeIdentifiers {
    const map = ts.createMultiMap<ts.Identifier>();
    forEachFreeIdentifier(file, id => map.add(id.text, id));
    return map;
}

/**
 * A free identifier is an identifier that can be accessed through name lookup as a local variable.
 * In the expression `x.y`, `x` is a free identifier, but `y` is not.
 */
function forEachFreeIdentifier(node: ts.Node, cb: (id: ts.Identifier) => void): void {
    if (ts.isIdentifier(node) && isFreeIdentifier(node)) cb(node);
    node.forEachChild(child => forEachFreeIdentifier(child, cb));
}

function isFreeIdentifier(node: ts.Identifier): boolean {
    const { parent } = node;
    switch (parent.kind) {
        case ts.SyntaxKind.PropertyAccessExpression:
            return (parent as ts.PropertyAccessExpression).name !== node;
        case ts.SyntaxKind.BindingElement:
            return (parent as ts.BindingElement).propertyName !== node;
        case ts.SyntaxKind.ImportSpecifier:
            return (parent as ts.ImportSpecifier).propertyName !== node;
        default:
            return true;
    }
}

// Node helpers

function functionExpressionToDeclaration(name: string | undefined, additionalModifiers: readonly ts.Modifier[], fn: ts.FunctionExpression | ts.ArrowFunction | ts.MethodDeclaration, useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined): ts.FunctionDeclaration {
    return ts.factory.createFunctionDeclaration(
        ts.concatenate(additionalModifiers, ts.getSynthesizedDeepClones(fn.modifiers)),
        ts.getSynthesizedDeepClone(fn.asteriskToken),
        name,
        ts.getSynthesizedDeepClones(fn.typeParameters),
        ts.getSynthesizedDeepClones(fn.parameters),
        ts.getSynthesizedDeepClone(fn.type),
        ts.factory.converters.convertToFunctionBlock(replaceImportUseSites(fn.body!, useSitesToUnqualify)));
}

function classExpressionToDeclaration(name: string | undefined, additionalModifiers: readonly ts.Modifier[], cls: ts.ClassExpression, useSitesToUnqualify: ts.ESMap<ts.Node, ts.Node> | undefined): ts.ClassDeclaration {
    return ts.factory.createClassDeclaration(
        ts.concatenate(additionalModifiers, ts.getSynthesizedDeepClones(cls.modifiers)),
        name,
        ts.getSynthesizedDeepClones(cls.typeParameters),
        ts.getSynthesizedDeepClones(cls.heritageClauses),
        replaceImportUseSites(cls.members, useSitesToUnqualify));
}

function makeSingleImport(localName: string, propertyName: string, moduleSpecifier: ts.StringLiteralLike, quotePreference: ts.QuotePreference): ts.ImportDeclaration {
    return propertyName === "default"
        ? ts.makeImport(ts.factory.createIdentifier(localName), /*namedImports*/ undefined, moduleSpecifier, quotePreference)
        : ts.makeImport(/*name*/ undefined, [makeImportSpecifier(propertyName, localName)], moduleSpecifier, quotePreference);
}

function makeImportSpecifier(propertyName: string | undefined, name: string): ts.ImportSpecifier {
    return ts.factory.createImportSpecifier(/*isTypeOnly*/ false, propertyName !== undefined && propertyName !== name ? ts.factory.createIdentifier(propertyName) : undefined, ts.factory.createIdentifier(name));
}

function makeConst(modifiers: readonly ts.Modifier[] | undefined, name: string | ts.BindingName, init: ts.Expression): ts.VariableStatement {
    return ts.factory.createVariableStatement(
        modifiers,
        ts.factory.createVariableDeclarationList(
            [ts.factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, /*type*/ undefined, init)],
            ts.NodeFlags.Const));
}

function makeExportDeclaration(exportSpecifiers: ts.ExportSpecifier[] | undefined, moduleSpecifier?: string): ts.ExportDeclaration {
    return ts.factory.createExportDeclaration(
        /*modifiers*/ undefined,
        /*isTypeOnly*/ false,
        exportSpecifiers && ts.factory.createNamedExports(exportSpecifiers),
        moduleSpecifier === undefined ? undefined : ts.factory.createStringLiteral(moduleSpecifier));
}

interface ConvertedImports {
    newImports: readonly ts.Node[];
    useSitesToUnqualify?: ts.ESMap<ts.Node, ts.Node>;
}

function convertedImports(newImports: readonly ts.Node[], useSitesToUnqualify?: ts.ESMap<ts.Node, ts.Node>): ConvertedImports {
    return {
        newImports,
        useSitesToUnqualify
    };
}
