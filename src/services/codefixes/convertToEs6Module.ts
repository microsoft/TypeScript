/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module.code],
        getCodeActions(context) {
            const { sourceFile, program, preferences } = context;
            const changes = textChanges.ChangeTracker.with(context, changes => {
                const moduleExportsChangedToDefault = convertFileToEs6Module(sourceFile, program.getTypeChecker(), changes, program.getCompilerOptions().target!, getQuotePreference(sourceFile, preferences));
                if (moduleExportsChangedToDefault) {
                    for (const importingFile of program.getSourceFiles()) {
                        fixImportOfModuleExports(importingFile, sourceFile, changes, getQuotePreference(importingFile, preferences));
                    }
                }
            });
            // No support for fix-all since this applies to the whole file at once anyway.
            return [createCodeFixActionWithoutFixAll("convertToEs6Module", changes, Diagnostics.Convert_to_ES6_module)];
        },
    });

    function fixImportOfModuleExports(importingFile: SourceFile, exportingFile: SourceFile, changes: textChanges.ChangeTracker, quotePreference: QuotePreference) {
        for (const moduleSpecifier of importingFile.imports) {
            const imported = getResolvedModule(importingFile, moduleSpecifier.text);
            if (!imported || imported.resolvedFileName !== exportingFile.fileName) {
                continue;
            }

            const importNode = importFromModuleSpecifier(moduleSpecifier);
            switch (importNode.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    changes.replaceNode(importingFile, importNode, makeImport(importNode.name, /*namedImports*/ undefined, moduleSpecifier, quotePreference));
                    break;
                case SyntaxKind.CallExpression:
                    if (isRequireCall(importNode, /*checkArgumentIsStringLiteralLike*/ false)) {
                        changes.replaceNode(importingFile, importNode, factory.createPropertyAccessExpression(getSynthesizedDeepClone(importNode), "default"));
                    }
                    break;
            }
        }
    }

    /** @returns Whether we converted a `module.exports =` to a default export. */
    function convertFileToEs6Module(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, target: ScriptTarget, quotePreference: QuotePreference): ModuleExportsChanged {
        const identifiers: Identifiers = { original: collectFreeIdentifiers(sourceFile), additional: new Set() };
        const exports = collectExportRenames(sourceFile, checker, identifiers);
        convertExportsAccesses(sourceFile, exports, changes);
        let moduleExportsChangedToDefault = false;
        for (const statement of sourceFile.statements) {
            const moduleExportsChanged = convertStatement(sourceFile, statement, checker, changes, identifiers, target, exports, quotePreference);
            moduleExportsChangedToDefault = moduleExportsChangedToDefault || moduleExportsChanged;
        }
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
    type ExportRenames = ReadonlyMap<string, string>;

    function collectExportRenames(sourceFile: SourceFile, checker: TypeChecker, identifiers: Identifiers): ExportRenames {
        const res = new Map<string, string>();
        forEachExportReference(sourceFile, node => {
            const { text, originalKeywordKind } = node.name;
            if (!res.has(text) && (originalKeywordKind !== undefined && isNonContextualKeyword(originalKeywordKind)
                || checker.resolveName(text, node, SymbolFlags.Value, /*excludeGlobals*/ true))) {
                // Unconditionally add an underscore in case `text` is a keyword.
                res.set(text, makeUniqueName(`_${text}`, identifiers));
            }
        });
        return res;
    }

    function convertExportsAccesses(sourceFile: SourceFile, exports: ExportRenames, changes: textChanges.ChangeTracker): void {
        forEachExportReference(sourceFile, (node, isAssignmentLhs) => {
            if (isAssignmentLhs) {
                return;
            }
            const { text } = node.name;
            changes.replaceNode(sourceFile, node, factory.createIdentifier(exports.get(text) || text));
        });
    }

    function forEachExportReference(sourceFile: SourceFile, cb: (node: (PropertyAccessExpression & { name: Identifier }), isAssignmentLhs: boolean) => void): void {
        sourceFile.forEachChild(function recur(node) {
            if (isPropertyAccessExpression(node) && isExportsOrModuleExportsOrAlias(sourceFile, node.expression) && isIdentifier(node.name)) {
                const { parent } = node;
                cb(node as typeof node & { name: Identifier }, isBinaryExpression(parent) && parent.left === node && parent.operatorToken.kind === SyntaxKind.EqualsToken);
            }
            node.forEachChild(recur);
        });
    }

    /** Whether `module.exports =` was changed to `export default` */
    type ModuleExportsChanged = boolean;

    function convertStatement(sourceFile: SourceFile, statement: Statement, checker: TypeChecker, changes: textChanges.ChangeTracker, identifiers: Identifiers, target: ScriptTarget, exports: ExportRenames, quotePreference: QuotePreference): ModuleExportsChanged {
        switch (statement.kind) {
            case SyntaxKind.VariableStatement:
                convertVariableStatement(sourceFile, statement as VariableStatement, changes, checker, identifiers, target, quotePreference);
                return false;
            case SyntaxKind.ExpressionStatement: {
                const { expression } = statement as ExpressionStatement;
                switch (expression.kind) {
                    case SyntaxKind.CallExpression: {
                        if (isRequireCall(expression, /*checkArgumentIsStringLiteralLike*/ true)) {
                            // For side-effecting require() call, just make a side-effecting import.
                            changes.replaceNode(sourceFile, statement, makeImport(/*name*/ undefined, /*namedImports*/ undefined, expression.arguments[0], quotePreference));
                        }
                        return false;
                    }
                    case SyntaxKind.BinaryExpression: {
                        const { operatorToken } = expression as BinaryExpression;
                        return operatorToken.kind === SyntaxKind.EqualsToken && convertAssignment(sourceFile, checker, expression as BinaryExpression, changes, exports);
                    }
                }
            }
            // falls through
            default:
                return false;
        }
    }

    function convertVariableStatement(
        sourceFile: SourceFile,
        statement: VariableStatement,
        changes: textChanges.ChangeTracker,
        checker: TypeChecker,
        identifiers: Identifiers,
        target: ScriptTarget,
        quotePreference: QuotePreference,
    ): void {
        const { declarationList } = statement;
        let foundImport = false;
        const newNodes = flatMap(declarationList.declarations, decl => {
            const { name, initializer } = decl;
            if (initializer) {
                if (isExportsOrModuleExportsOrAlias(sourceFile, initializer)) {
                    // `const alias = module.exports;` can be removed.
                    foundImport = true;
                    return [];
                }
                else if (isRequireCall(initializer, /*checkArgumentIsStringLiteralLike*/ true)) {
                    foundImport = true;
                    return convertSingleImport(sourceFile, name, initializer.arguments[0], changes, checker, identifiers, target, quotePreference);
                }
                else if (isPropertyAccessExpression(initializer) && isRequireCall(initializer.expression, /*checkArgumentIsStringLiteralLike*/ true)) {
                    foundImport = true;
                    return convertPropertyAccessImport(name, initializer.name.text, initializer.expression.arguments[0], identifiers, quotePreference);
                }
            }
            // Move it out to its own variable statement. (This will not be used if `!foundImport`)
            return factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([decl], declarationList.flags));
        });
        if (foundImport) {
            // useNonAdjustedEndPosition to ensure we don't eat the newline after the statement.
            changes.replaceNodeWithNodes(sourceFile, statement, newNodes);
        }
    }

    /** Converts `const name = require("moduleSpecifier").propertyName` */
    function convertPropertyAccessImport(name: BindingName, propertyName: string, moduleSpecifier: StringLiteralLike, identifiers: Identifiers, quotePreference: QuotePreference): readonly Node[] {
        switch (name.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern: {
                // `const [a, b] = require("c").d` --> `import { d } from "c"; const [a, b] = d;`
                const tmp  = makeUniqueName(propertyName, identifiers);
                return [
                    makeSingleImport(tmp, propertyName, moduleSpecifier, quotePreference),
                    makeConst(/*modifiers*/ undefined, name, factory.createIdentifier(tmp)),
                ];
            }
            case SyntaxKind.Identifier:
                // `const a = require("b").c` --> `import { c as a } from "./b";
                return [makeSingleImport(name.text, propertyName, moduleSpecifier, quotePreference)];
            default:
                return Debug.assertNever(name, `Convert to ES6 module got invalid syntax form ${(name as BindingName).kind}`);
        }
    }

    function convertAssignment(
        sourceFile: SourceFile,
        checker: TypeChecker,
        assignment: BinaryExpression,
        changes: textChanges.ChangeTracker,
        exports: ExportRenames,
    ): ModuleExportsChanged {
        const { left, right } = assignment;
        if (!isPropertyAccessExpression(left)) {
            return false;
        }

        if (isExportsOrModuleExportsOrAlias(sourceFile, left)) {
            if (isExportsOrModuleExportsOrAlias(sourceFile, right)) {
                // `const alias = module.exports;` or `module.exports = alias;` can be removed.
                changes.delete(sourceFile, assignment.parent);
            }
            else {
                const replacement = isObjectLiteralExpression(right) ? tryChangeModuleExportsObject(right)
                    : isRequireCall(right, /*checkArgumentIsStringLiteralLike*/ true) ? convertReExportAll(right.arguments[0], checker)
                    : undefined;
                if (replacement) {
                    changes.replaceNodeWithNodes(sourceFile, assignment.parent, replacement[0]);
                    return replacement[1];
                }
                else {
                    changes.replaceRangeWithText(sourceFile, createRange(left.getStart(sourceFile), right.pos), "export default");
                    return true;
                }
            }
        }
        else if (isExportsOrModuleExportsOrAlias(sourceFile, left.expression)) {
            convertNamedExport(sourceFile, assignment as BinaryExpression & { left: PropertyAccessExpression }, changes, exports);
        }

        return false;
    }

    /**
     * Convert `module.exports = { ... }` to individual exports..
     * We can't always do this if the module has interesting members -- then it will be a default export instead.
     */
    function tryChangeModuleExportsObject(object: ObjectLiteralExpression): [readonly Statement[], ModuleExportsChanged] | undefined {
        const statements = mapAllOrFail(object.properties, prop => {
            switch (prop.kind) {
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                // TODO: Maybe we should handle this? See fourslash test `refactorConvertToEs6Module_export_object_shorthand.ts`.
                // falls through
                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.SpreadAssignment:
                    return undefined;
                case SyntaxKind.PropertyAssignment:
                    return !isIdentifier(prop.name) ? undefined : convertExportsDotXEquals_replaceNode(prop.name.text, prop.initializer);
                case SyntaxKind.MethodDeclaration:
                    return !isIdentifier(prop.name) ? undefined : functionExpressionToDeclaration(prop.name.text, [factory.createToken(SyntaxKind.ExportKeyword)], prop);
                default:
                    Debug.assertNever(prop, `Convert to ES6 got invalid prop kind ${(prop as ObjectLiteralElementLike).kind}`);
            }
        });
        return statements && [statements, false];
    }

    function convertNamedExport(
        sourceFile: SourceFile,
        assignment: BinaryExpression & { left: PropertyAccessExpression },
        changes: textChanges.ChangeTracker,
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
                makeExportDeclaration([factory.createExportSpecifier(rename, text)]),
            ];
            changes.replaceNodeWithNodes(sourceFile, assignment.parent, newNodes);
        }
        else {
            convertExportsPropertyAssignment(assignment, sourceFile, changes);
        }
    }

    function convertReExportAll(reExported: StringLiteralLike, checker: TypeChecker): [readonly Statement[], ModuleExportsChanged] {
        // `module.exports = require("x");` ==> `export * from "x"; export { default } from "x";`
        const moduleSpecifier = reExported.text;
        const moduleSymbol = checker.getSymbolAtLocation(reExported);
        const exports = moduleSymbol ? moduleSymbol.exports! : emptyMap as ReadonlyCollection<__String>;
        return exports.has(InternalSymbolName.ExportEquals) ? [[reExportDefault(moduleSpecifier)], true] :
            !exports.has(InternalSymbolName.Default) ? [[reExportStar(moduleSpecifier)], false] :
            // If there's some non-default export, must include both `export *` and `export default`.
            exports.size > 1 ? [[reExportStar(moduleSpecifier), reExportDefault(moduleSpecifier)], true] : [[reExportDefault(moduleSpecifier)], true];
    }
    function reExportStar(moduleSpecifier: string): ExportDeclaration {
        return makeExportDeclaration(/*exportClause*/ undefined, moduleSpecifier);
    }
    function reExportDefault(moduleSpecifier: string): ExportDeclaration {
        return makeExportDeclaration([factory.createExportSpecifier(/*propertyName*/ undefined, "default")], moduleSpecifier);
    }

    function convertExportsPropertyAssignment({ left, right, parent }: BinaryExpression & { left: PropertyAccessExpression }, sourceFile: SourceFile, changes: textChanges.ChangeTracker): void {
        const name = left.name.text;
        if ((isFunctionExpression(right) || isArrowFunction(right) || isClassExpression(right)) && (!right.name || right.name.text === name)) {
            // `exports.f = function() {}` -> `export function f() {}` -- Replace `exports.f = ` with `export `, and insert the name after `function`.
            changes.replaceRange(sourceFile, { pos: left.getStart(sourceFile), end: right.getStart(sourceFile) }, factory.createToken(SyntaxKind.ExportKeyword), { suffix: " " });

            if (!right.name) changes.insertName(sourceFile, right, name);

            const semi = findChildOfKind(parent, SyntaxKind.SemicolonToken, sourceFile);
            if (semi) changes.delete(sourceFile, semi);
        }
        else {
            // `exports.f = function g() {}` -> `export const f = function g() {}` -- just replace `exports.` with `export const `
            changes.replaceNodeRangeWithNodes(sourceFile, left.expression, findChildOfKind(left, SyntaxKind.DotToken, sourceFile)!,
                [factory.createToken(SyntaxKind.ExportKeyword), factory.createToken(SyntaxKind.ConstKeyword)],
                { joiner: " ", suffix: " " });
        }
    }

    // TODO: GH#22492 this will cause an error if a change has been made inside the body of the node.
    function convertExportsDotXEquals_replaceNode(name: string | undefined, exported: Expression): Statement {
        const modifiers = [factory.createToken(SyntaxKind.ExportKeyword)];
        switch (exported.kind) {
            case SyntaxKind.FunctionExpression: {
                const { name: expressionName } = exported as FunctionExpression;
                if (expressionName && expressionName.text !== name) {
                    // `exports.f = function g() {}` -> `export const f = function g() {}`
                    return exportConst();
                }
            }

            // falls through
            case SyntaxKind.ArrowFunction:
                // `exports.f = function() {}` --> `export function f() {}`
                return functionExpressionToDeclaration(name, modifiers, exported as FunctionExpression | ArrowFunction);
            case SyntaxKind.ClassExpression:
                // `exports.C = class {}` --> `export class C {}`
                return classExpressionToDeclaration(name, modifiers, exported as ClassExpression);
            default:
                return exportConst();
        }

        function exportConst() {
            // `exports.x = 0;` --> `export const x = 0;`
            return makeConst(modifiers, factory.createIdentifier(name!), exported); // TODO: GH#18217
        }
    }

    /**
     * Converts `const <<name>> = require("x");`.
     * Returns nodes that will replace the variable declaration for the commonjs import.
     * May also make use `changes` to remove qualifiers at the use sites of imports, to change `mod.x` to `x`.
     */
    function convertSingleImport(
        file: SourceFile,
        name: BindingName,
        moduleSpecifier: StringLiteralLike,
        changes: textChanges.ChangeTracker,
        checker: TypeChecker,
        identifiers: Identifiers,
        target: ScriptTarget,
        quotePreference: QuotePreference,
    ): readonly Node[] {
        switch (name.kind) {
            case SyntaxKind.ObjectBindingPattern: {
                const importSpecifiers = mapAllOrFail(name.elements, e =>
                    e.dotDotDotToken || e.initializer || e.propertyName && !isIdentifier(e.propertyName) || !isIdentifier(e.name)
                        ? undefined
                        // (TODO: GH#18217)
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                        : makeImportSpecifier(e.propertyName && (e.propertyName as Identifier).text, e.name.text));
                if (importSpecifiers) {
                    return [makeImport(/*name*/ undefined, importSpecifiers, moduleSpecifier, quotePreference)];
                }
            }
            // falls through -- object destructuring has an interesting pattern and must be a variable declaration
            case SyntaxKind.ArrayBindingPattern: {
                /*
                import x from "x";
                const [a, b, c] = x;
                */
                const tmp = makeUniqueName(moduleSpecifierToValidIdentifier(moduleSpecifier.text, target), identifiers);
                return [
                    makeImport(factory.createIdentifier(tmp), /*namedImports*/ undefined, moduleSpecifier, quotePreference),
                    makeConst(/*modifiers*/ undefined, getSynthesizedDeepClone(name), factory.createIdentifier(tmp)),
                ];
            }
            case SyntaxKind.Identifier:
                return convertSingleIdentifierImport(file, name, moduleSpecifier, changes, checker, identifiers, quotePreference);
            default:
                return Debug.assertNever(name, `Convert to ES6 module got invalid name kind ${(name as BindingName).kind}`);
        }
    }

    /**
     * Convert `import x = require("x").`
     * Also converts uses like `x.y()` to `y()` and uses a named import.
     */
    function convertSingleIdentifierImport(file: SourceFile, name: Identifier, moduleSpecifier: StringLiteralLike, changes: textChanges.ChangeTracker, checker: TypeChecker, identifiers: Identifiers, quotePreference: QuotePreference): readonly Node[] {
        const nameSymbol = checker.getSymbolAtLocation(name);
        // Maps from module property name to name actually used. (The same if there isn't shadowing.)
        const namedBindingsNames = new Map<string, string>();
        // True if there is some non-property use like `x()` or `f(x)`.
        let needDefaultImport = false;

        for (const use of identifiers.original.get(name.text)!) {
            if (checker.getSymbolAtLocation(use) !== nameSymbol || use === name) {
                // This was a use of a different symbol with the same name, due to shadowing. Ignore.
                continue;
            }

            const { parent } = use;
            if (isPropertyAccessExpression(parent)) {
                const { expression, name: { text: propertyName } } = parent;
                Debug.assert(expression === use, "Didn't expect expression === use"); // Else shouldn't have been in `collectIdentifiers`
                let idName = namedBindingsNames.get(propertyName);
                if (idName === undefined) {
                    idName = makeUniqueName(propertyName, identifiers);
                    namedBindingsNames.set(propertyName, idName);
                }
                changes.replaceNode(file, parent, factory.createIdentifier(idName));
            }
            else {
                needDefaultImport = true;
            }
        }

        const namedBindings = namedBindingsNames.size === 0 ? undefined : arrayFrom(mapIterator(namedBindingsNames.entries(), ([propertyName, idName]) =>
            factory.createImportSpecifier(propertyName === idName ? undefined : factory.createIdentifier(propertyName), factory.createIdentifier(idName))));
        if (!namedBindings) {
            // If it was unused, ensure that we at least import *something*.
            needDefaultImport = true;
        }
        return [makeImport(needDefaultImport ? getSynthesizedDeepClone(name) : undefined, namedBindings, moduleSpecifier, quotePreference)];
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
        readonly additional: Set<string>;
    }

    type FreeIdentifiers = ReadonlyMap<string, readonly Identifier[]>;
    function collectFreeIdentifiers(file: SourceFile): FreeIdentifiers {
        const map = createMultiMap<Identifier>();
        forEachFreeIdentifier(file, id => map.add(id.text, id));
        return map;
    }

    /**
     * A free identifier is an identifier that can be accessed through name lookup as a local variable.
     * In the expression `x.y`, `x` is a free identifier, but `y` is not.
     */
    function forEachFreeIdentifier(node: Node, cb: (id: Identifier) => void): void {
        if (isIdentifier(node) && isFreeIdentifier(node)) cb(node);
        node.forEachChild(child => forEachFreeIdentifier(child, cb));
    }

    function isFreeIdentifier(node: Identifier): boolean {
        const { parent } = node;
        switch (parent.kind) {
            case SyntaxKind.PropertyAccessExpression:
                return (parent as PropertyAccessExpression).name !== node;
            case SyntaxKind.BindingElement:
                return (parent as BindingElement).propertyName !== node;
            case SyntaxKind.ImportSpecifier:
                return (parent as ImportSpecifier).propertyName !== node;
            default:
                return true;
        }
    }

    // Node helpers

    function functionExpressionToDeclaration(name: string | undefined, additionalModifiers: readonly Modifier[], fn: FunctionExpression | ArrowFunction | MethodDeclaration): FunctionDeclaration {
        return factory.createFunctionDeclaration(
            getSynthesizedDeepClones(fn.decorators), // TODO: GH#19915 Don't think this is even legal.
            concatenate(additionalModifiers, getSynthesizedDeepClones(fn.modifiers)),
            getSynthesizedDeepClone(fn.asteriskToken),
            name,
            getSynthesizedDeepClones(fn.typeParameters),
            getSynthesizedDeepClones(fn.parameters),
            getSynthesizedDeepClone(fn.type),
            factory.converters.convertToFunctionBlock(getSynthesizedDeepClone(fn.body!)));
    }

    function classExpressionToDeclaration(name: string | undefined, additionalModifiers: readonly Modifier[], cls: ClassExpression): ClassDeclaration {
        return factory.createClassDeclaration(
            getSynthesizedDeepClones(cls.decorators), // TODO: GH#19915 Don't think this is even legal.
            concatenate(additionalModifiers, getSynthesizedDeepClones(cls.modifiers)),
            name,
            getSynthesizedDeepClones(cls.typeParameters),
            getSynthesizedDeepClones(cls.heritageClauses),
            getSynthesizedDeepClones(cls.members));
    }

    function makeSingleImport(localName: string, propertyName: string, moduleSpecifier: StringLiteralLike, quotePreference: QuotePreference): ImportDeclaration {
        return propertyName === "default"
            ? makeImport(factory.createIdentifier(localName), /*namedImports*/ undefined, moduleSpecifier, quotePreference)
            : makeImport(/*name*/ undefined, [makeImportSpecifier(propertyName, localName)], moduleSpecifier, quotePreference);
    }

    function makeImportSpecifier(propertyName: string | undefined, name: string): ImportSpecifier {
        return factory.createImportSpecifier(propertyName !== undefined && propertyName !== name ? factory.createIdentifier(propertyName) : undefined, factory.createIdentifier(name));
    }

    function makeConst(modifiers: readonly Modifier[] | undefined, name: string | BindingName, init: Expression): VariableStatement {
        return factory.createVariableStatement(
            modifiers,
            factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, /*type*/ undefined, init)],
                NodeFlags.Const));
    }

    function makeExportDeclaration(exportSpecifiers: ExportSpecifier[] | undefined, moduleSpecifier?: string): ExportDeclaration {
        return factory.createExportDeclaration(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            /*isTypeOnly*/ false,
            exportSpecifiers && factory.createNamedExports(exportSpecifiers),
            moduleSpecifier === undefined ? undefined : factory.createStringLiteral(moduleSpecifier));
    }
}
