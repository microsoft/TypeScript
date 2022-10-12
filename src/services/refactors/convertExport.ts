import * as ts from "../_namespaces/ts";

const refactorName = "Convert export";

const defaultToNamedAction = {
    name: "Convert default export to named export",
    description: ts.Diagnostics.Convert_default_export_to_named_export.message,
    kind: "refactor.rewrite.export.named"
};
const namedToDefaultAction = {
    name: "Convert named export to default export",
    description: ts.Diagnostics.Convert_named_export_to_default_export.message,
    kind: "refactor.rewrite.export.default"
};

ts.refactor.registerRefactor(refactorName, {
    kinds: [
        defaultToNamedAction.kind,
        namedToDefaultAction.kind
    ],
    getAvailableActions: function getRefactorActionsToConvertBetweenNamedAndDefaultExports(context): readonly ts.ApplicableRefactorInfo[] {
        const info = getInfo(context, context.triggerReason === "invoked");
        if (!info) return ts.emptyArray;

        if (!ts.refactor.isRefactorErrorInfo(info)) {
            const action = info.wasDefault ? defaultToNamedAction : namedToDefaultAction;
            return [{ name: refactorName, description: action.description, actions: [action] }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return [
                { name: refactorName, description: ts.Diagnostics.Convert_default_export_to_named_export.message, actions: [
                    { ...defaultToNamedAction, notApplicableReason: info.error },
                    { ...namedToDefaultAction, notApplicableReason: info.error },
                ]}
            ];
        }

        return ts.emptyArray;
    },
    getEditsForAction: function getRefactorEditsToConvertBetweenNamedAndDefaultExports(context, actionName): ts.RefactorEditInfo {
        ts.Debug.assert(actionName === defaultToNamedAction.name || actionName === namedToDefaultAction.name, "Unexpected action name");
        const info = getInfo(context);
        ts.Debug.assert(info && !ts.refactor.isRefactorErrorInfo(info), "Expected applicable refactor info");
        const edits = ts.textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, info, t, context.cancellationToken));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    },
});

// If a VariableStatement, will have exactly one VariableDeclaration, with an Identifier for a name.
type ExportToConvert = ts.FunctionDeclaration | ts.ClassDeclaration | ts.InterfaceDeclaration | ts.EnumDeclaration | ts.NamespaceDeclaration | ts.TypeAliasDeclaration | ts.VariableStatement | ts.ExportAssignment;
interface ExportInfo {
    readonly exportNode: ExportToConvert;
    readonly exportName: ts.Identifier; // This is exportNode.name except for VariableStatement_s.
    readonly wasDefault: boolean;
    readonly exportingModuleSymbol: ts.Symbol;
}

function getInfo(context: ts.RefactorContext, considerPartialSpans = true): ExportInfo | ts.refactor.RefactorErrorInfo | undefined {
    const { file, program } = context;
    const span = ts.getRefactorContextSpan(context);
    const token = ts.getTokenAtPosition(file, span.start);
    const exportNode = !!(token.parent && ts.getSyntacticModifierFlags(token.parent) & ts.ModifierFlags.Export) && considerPartialSpans ? token.parent : ts.getParentNodeInSpan(token, file, span);
    if (!exportNode || (!ts.isSourceFile(exportNode.parent) && !(ts.isModuleBlock(exportNode.parent) && ts.isAmbientModule(exportNode.parent.parent)))) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_export_statement) };
    }

    const checker = program.getTypeChecker();
    const exportingModuleSymbol = getExportingModuleSymbol(exportNode, checker);
    const flags = ts.getSyntacticModifierFlags(exportNode) || ((ts.isExportAssignment(exportNode) && !exportNode.isExportEquals) ? ts.ModifierFlags.ExportDefault : ts.ModifierFlags.None);

    const wasDefault = !!(flags & ts.ModifierFlags.Default);
    // If source file already has a default export, don't offer refactor.
    if (!(flags & ts.ModifierFlags.Export) || !wasDefault && exportingModuleSymbol.exports!.has(ts.InternalSymbolName.Default)) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.This_file_already_has_a_default_export) };
    }

    const noSymbolError = (id: ts.Node) =>
        (ts.isIdentifier(id) && checker.getSymbolAtLocation(id)) ? undefined
        : { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Can_only_convert_named_export) };

    switch (exportNode.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.ModuleDeclaration: {
            const node = exportNode as ts.FunctionDeclaration | ts.ClassDeclaration | ts.InterfaceDeclaration | ts.EnumDeclaration | ts.TypeAliasDeclaration | ts.NamespaceDeclaration;
            if (!node.name) return undefined;
            return noSymbolError(node.name)
                || { exportNode: node, exportName: node.name, wasDefault, exportingModuleSymbol };
        }
        case ts.SyntaxKind.VariableStatement: {
            const vs = exportNode as ts.VariableStatement;
            // Must be `export const x = something;`.
            if (!(vs.declarationList.flags & ts.NodeFlags.Const) || vs.declarationList.declarations.length !== 1) {
                return undefined;
            }
            const decl = ts.first(vs.declarationList.declarations);
            if (!decl.initializer) return undefined;
            ts.Debug.assert(!wasDefault, "Can't have a default flag here");
            return noSymbolError(decl.name)
                || { exportNode: vs, exportName: decl.name as ts.Identifier, wasDefault, exportingModuleSymbol };
        }
        case ts.SyntaxKind.ExportAssignment: {
            const node = exportNode as ts.ExportAssignment;
            if (node.isExportEquals) return undefined;
            return noSymbolError(node.expression)
                || { exportNode: node, exportName: node.expression as ts.Identifier, wasDefault, exportingModuleSymbol };
        }
        default:
            return undefined;
    }
}

function doChange(exportingSourceFile: ts.SourceFile, program: ts.Program, info: ExportInfo, changes: ts.textChanges.ChangeTracker, cancellationToken: ts.CancellationToken | undefined): void {
    changeExport(exportingSourceFile, info, changes, program.getTypeChecker());
    changeImports(program, info, changes, cancellationToken);
}

function changeExport(exportingSourceFile: ts.SourceFile, { wasDefault, exportNode, exportName }: ExportInfo, changes: ts.textChanges.ChangeTracker, checker: ts.TypeChecker): void {
    if (wasDefault) {
        if (ts.isExportAssignment(exportNode) && !exportNode.isExportEquals) {
            const exp = exportNode.expression as ts.Identifier;
            const spec = makeExportSpecifier(exp.text, exp.text);
            changes.replaceNode(exportingSourceFile, exportNode, ts.factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, ts.factory.createNamedExports([spec])));
        }
        else {
            changes.delete(exportingSourceFile, ts.Debug.checkDefined(ts.findModifier(exportNode, ts.SyntaxKind.DefaultKeyword), "Should find a default keyword in modifier list"));
        }
    }
    else {
        const exportKeyword = ts.Debug.checkDefined(ts.findModifier(exportNode, ts.SyntaxKind.ExportKeyword), "Should find an export keyword in modifier list");
        switch (exportNode.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
                changes.insertNodeAfter(exportingSourceFile, exportKeyword, ts.factory.createToken(ts.SyntaxKind.DefaultKeyword));
                break;
            case ts.SyntaxKind.VariableStatement:
                // If 'x' isn't used in this file and doesn't have type definition, `export const x = 0;` --> `export default 0;`
                const decl = ts.first(exportNode.declarationList.declarations);
                if (!ts.FindAllReferences.Core.isSymbolReferencedInFile(exportName, checker, exportingSourceFile) && !decl.type) {
                    // We checked in `getInfo` that an initializer exists.
                    changes.replaceNode(exportingSourceFile, exportNode, ts.factory.createExportDefault(ts.Debug.checkDefined(decl.initializer, "Initializer was previously known to be present")));
                    break;
                }
                // falls through
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
                // `export type T = number;` -> `type T = number; export default T;`
                changes.deleteModifier(exportingSourceFile, exportKeyword);
                changes.insertNodeAfter(exportingSourceFile, exportNode, ts.factory.createExportDefault(ts.factory.createIdentifier(exportName.text)));
                break;
            default:
                ts.Debug.fail(`Unexpected exportNode kind ${(exportNode as ExportToConvert).kind}`);
        }
    }
}

function changeImports(program: ts.Program, { wasDefault, exportName, exportingModuleSymbol }: ExportInfo, changes: ts.textChanges.ChangeTracker, cancellationToken: ts.CancellationToken | undefined): void {
    const checker = program.getTypeChecker();
    const exportSymbol = ts.Debug.checkDefined(checker.getSymbolAtLocation(exportName), "Export name should resolve to a symbol");
    ts.FindAllReferences.Core.eachExportReference(program.getSourceFiles(), checker, cancellationToken, exportSymbol, exportingModuleSymbol, exportName.text, wasDefault, ref => {
        if (exportName === ref) return;
        const importingSourceFile = ref.getSourceFile();
        if (wasDefault) {
            changeDefaultToNamedImport(importingSourceFile, ref, changes, exportName.text);
        }
        else {
            changeNamedToDefaultImport(importingSourceFile, ref, changes);
        }
    });
}

function changeDefaultToNamedImport(importingSourceFile: ts.SourceFile, ref: ts.Identifier, changes: ts.textChanges.ChangeTracker, exportName: string): void {
    const { parent } = ref;
    switch (parent.kind) {
        case ts.SyntaxKind.PropertyAccessExpression:
            // `a.default` --> `a.foo`
            changes.replaceNode(importingSourceFile, ref, ts.factory.createIdentifier(exportName));
            break;
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ExportSpecifier: {
            const spec = parent as ts.ImportSpecifier | ts.ExportSpecifier;
            // `default as foo` --> `foo`, `default as bar` --> `foo as bar`
            changes.replaceNode(importingSourceFile, spec, makeImportSpecifier(exportName, spec.name.text));
            break;
        }
        case ts.SyntaxKind.ImportClause: {
            const clause = parent as ts.ImportClause;
            ts.Debug.assert(clause.name === ref, "Import clause name should match provided ref");
            const spec = makeImportSpecifier(exportName, ref.text);
            const { namedBindings } = clause;
            if (!namedBindings) {
                // `import foo from "./a";` --> `import { foo } from "./a";`
                changes.replaceNode(importingSourceFile, ref, ts.factory.createNamedImports([spec]));
            }
            else if (namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
                // `import foo, * as a from "./a";` --> `import * as a from ".a/"; import { foo } from "./a";`
                changes.deleteRange(importingSourceFile, { pos: ref.getStart(importingSourceFile), end: namedBindings.getStart(importingSourceFile) });
                const quotePreference = ts.isStringLiteral(clause.parent.moduleSpecifier) ? ts.quotePreferenceFromString(clause.parent.moduleSpecifier, importingSourceFile) : ts.QuotePreference.Double;
                const newImport = ts.makeImport(/*default*/ undefined, [makeImportSpecifier(exportName, ref.text)], clause.parent.moduleSpecifier, quotePreference);
                changes.insertNodeAfter(importingSourceFile, clause.parent, newImport);
            }
            else {
                // `import foo, { bar } from "./a"` --> `import { bar, foo } from "./a";`
                changes.delete(importingSourceFile, ref);
                changes.insertNodeAtEndOfList(importingSourceFile, namedBindings.elements, spec);
            }
            break;
        }
        case ts.SyntaxKind.ImportType:
            const importTypeNode = parent as ts.ImportTypeNode;
            changes.replaceNode(importingSourceFile, parent, ts.factory.createImportTypeNode(importTypeNode.argument, importTypeNode.assertions, ts.factory.createIdentifier(exportName), importTypeNode.typeArguments, importTypeNode.isTypeOf));
            break;
        default:
            ts.Debug.failBadSyntaxKind(parent);
    }
}

function changeNamedToDefaultImport(importingSourceFile: ts.SourceFile, ref: ts.Identifier, changes: ts.textChanges.ChangeTracker): void {
    const parent = ref.parent as ts.PropertyAccessExpression | ts.ImportSpecifier | ts.ExportSpecifier;
    switch (parent.kind) {
        case ts.SyntaxKind.PropertyAccessExpression:
            // `a.foo` --> `a.default`
            changes.replaceNode(importingSourceFile, ref, ts.factory.createIdentifier("default"));
            break;
        case ts.SyntaxKind.ImportSpecifier: {
            // `import { foo } from "./a";` --> `import foo from "./a";`
            // `import { foo as bar } from "./a";` --> `import bar from "./a";`
            const defaultImport = ts.factory.createIdentifier(parent.name.text);
            if (parent.parent.elements.length === 1) {
                changes.replaceNode(importingSourceFile, parent.parent, defaultImport);
            }
            else {
                changes.delete(importingSourceFile, parent);
                changes.insertNodeBefore(importingSourceFile, parent.parent, defaultImport);
            }
            break;
        }
        case ts.SyntaxKind.ExportSpecifier: {
            // `export { foo } from "./a";` --> `export { default as foo } from "./a";`
            // `export { foo as bar } from "./a";` --> `export { default as bar } from "./a";`
            // `export { foo as default } from "./a";` --> `export { default } from "./a";`
            // (Because `export foo from "./a";` isn't valid syntax.)
            changes.replaceNode(importingSourceFile, parent, makeExportSpecifier("default", parent.name.text));
            break;
        }
        default:
            ts.Debug.assertNever(parent, `Unexpected parent kind ${(parent as ts.Node).kind}`);
    }

}

function makeImportSpecifier(propertyName: string, name: string): ts.ImportSpecifier {
    return ts.factory.createImportSpecifier(/*isTypeOnly*/ false, propertyName === name ? undefined : ts.factory.createIdentifier(propertyName), ts.factory.createIdentifier(name));
}

function makeExportSpecifier(propertyName: string, name: string): ts.ExportSpecifier {
    return ts.factory.createExportSpecifier(/*isTypeOnly*/ false, propertyName === name ? undefined : ts.factory.createIdentifier(propertyName), ts.factory.createIdentifier(name));
}

function getExportingModuleSymbol(node: ts.Node, checker: ts.TypeChecker) {
    const parent = node.parent;
    if (ts.isSourceFile(parent)) {
        return parent.symbol;
    }
    const symbol = parent.parent.symbol;
    if (symbol.valueDeclaration && ts.isExternalModuleAugmentation(symbol.valueDeclaration)) {
        return checker.getMergedSymbol(symbol);
    }
    return symbol;
}
