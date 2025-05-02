import {
    ApplicableRefactorInfo,
    CancellationToken,
    ClassDeclaration,
    Debug,
    Diagnostics,
    emptyArray,
    EnumDeclaration,
    ExportAssignment,
    ExportSpecifier,
    factory,
    FindAllReferences,
    findModifier,
    first,
    FunctionDeclaration,
    getLocaleSpecificMessage,
    getParentNodeInSpan,
    getRefactorContextSpan,
    getSyntacticModifierFlags,
    getTokenAtPosition,
    Identifier,
    ImportClause,
    ImportSpecifier,
    ImportTypeNode,
    InterfaceDeclaration,
    InternalSymbolName,
    isAmbientModule,
    isExportAssignment,
    isExternalModuleAugmentation,
    isIdentifier,
    isModuleBlock,
    isSourceFile,
    isStringLiteral,
    makeImport,
    ModifierFlags,
    ModuleBlock,
    ModuleExportName,
    NamespaceDeclaration,
    Node,
    NodeFlags,
    Program,
    PropertyAccessExpression,
    QuotePreference,
    quotePreferenceFromString,
    RefactorContext,
    RefactorEditInfo,
    SourceFile,
    Symbol,
    SyntaxKind,
    textChanges,
    TypeAliasDeclaration,
    TypeChecker,
    VariableStatement,
} from "../_namespaces/ts.js";
import {
    isRefactorErrorInfo,
    RefactorErrorInfo,
    registerRefactor,
} from "../_namespaces/ts.refactor.js";

const refactorName = "Convert export";

const defaultToNamedAction = {
    name: "Convert default export to named export",
    description: getLocaleSpecificMessage(Diagnostics.Convert_default_export_to_named_export),
    kind: "refactor.rewrite.export.named",
};
const namedToDefaultAction = {
    name: "Convert named export to default export",
    description: getLocaleSpecificMessage(Diagnostics.Convert_named_export_to_default_export),
    kind: "refactor.rewrite.export.default",
};

registerRefactor(refactorName, {
    kinds: [
        defaultToNamedAction.kind,
        namedToDefaultAction.kind,
    ],
    getAvailableActions: function getRefactorActionsToConvertBetweenNamedAndDefaultExports(context): readonly ApplicableRefactorInfo[] {
        const info = getInfo(context, context.triggerReason === "invoked");
        if (!info) return emptyArray;

        if (!isRefactorErrorInfo(info)) {
            const action = info.wasDefault ? defaultToNamedAction : namedToDefaultAction;
            return [{ name: refactorName, description: action.description, actions: [action] }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return [
                {
                    name: refactorName,
                    description: getLocaleSpecificMessage(Diagnostics.Convert_default_export_to_named_export),
                    actions: [
                        { ...defaultToNamedAction, notApplicableReason: info.error },
                        { ...namedToDefaultAction, notApplicableReason: info.error },
                    ],
                },
            ];
        }

        return emptyArray;
    },
    getEditsForAction: function getRefactorEditsToConvertBetweenNamedAndDefaultExports(context, actionName): RefactorEditInfo {
        Debug.assert(actionName === defaultToNamedAction.name || actionName === namedToDefaultAction.name, "Unexpected action name");
        const info = getInfo(context);
        Debug.assert(info && !isRefactorErrorInfo(info), "Expected applicable refactor info");
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, info, t, context.cancellationToken));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    },
});

// If a VariableStatement, will have exactly one VariableDeclaration, with an Identifier for a name.
type ExportToConvert = FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | EnumDeclaration | NamespaceDeclaration | TypeAliasDeclaration | VariableStatement | ExportAssignment;
interface ExportInfo {
    readonly exportNode: ExportToConvert;
    readonly exportName: Identifier; // This is exportNode.name except for VariableStatement_s.
    readonly wasDefault: boolean;
    readonly exportingModuleSymbol: Symbol;
}

function getInfo(context: RefactorContext, considerPartialSpans = true): ExportInfo | RefactorErrorInfo | undefined {
    const { file, program } = context;
    const span = getRefactorContextSpan(context);
    const token = getTokenAtPosition(file, span.start);
    const exportNode = !!(token.parent && getSyntacticModifierFlags(token.parent) & ModifierFlags.Export) && considerPartialSpans ? token.parent : getParentNodeInSpan(token, file, span);
    if (!exportNode || (!isSourceFile(exportNode.parent) && !(isModuleBlock(exportNode.parent) && isAmbientModule(exportNode.parent.parent)))) {
        return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_export_statement) };
    }

    const checker = program.getTypeChecker();
    const exportingModuleSymbol = getExportingModuleSymbol(exportNode.parent, checker);
    const flags = getSyntacticModifierFlags(exportNode) || ((isExportAssignment(exportNode) && !exportNode.isExportEquals) ? ModifierFlags.ExportDefault : ModifierFlags.None);

    const wasDefault = !!(flags & ModifierFlags.Default);
    // If source file already has a default export, don't offer refactor.
    if (!(flags & ModifierFlags.Export) || !wasDefault && exportingModuleSymbol.exports!.has(InternalSymbolName.Default)) {
        return { error: getLocaleSpecificMessage(Diagnostics.This_file_already_has_a_default_export) };
    }

    const noSymbolError = (id: Node) =>
        (isIdentifier(id) && checker.getSymbolAtLocation(id)) ? undefined
            : { error: getLocaleSpecificMessage(Diagnostics.Can_only_convert_named_export) };

    switch (exportNode.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.ModuleDeclaration: {
            const node = exportNode as FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration | NamespaceDeclaration;
            if (!node.name) return undefined;
            return noSymbolError(node.name)
                || { exportNode: node, exportName: node.name, wasDefault, exportingModuleSymbol };
        }
        case SyntaxKind.VariableStatement: {
            const vs = exportNode as VariableStatement;
            // Must be `export const x = something;`.
            if (!(vs.declarationList.flags & NodeFlags.Const) || vs.declarationList.declarations.length !== 1) {
                return undefined;
            }
            const decl = first(vs.declarationList.declarations);
            if (!decl.initializer) return undefined;
            Debug.assert(!wasDefault, "Can't have a default flag here");
            return noSymbolError(decl.name)
                || { exportNode: vs, exportName: decl.name as Identifier, wasDefault, exportingModuleSymbol };
        }
        case SyntaxKind.ExportAssignment: {
            const node = exportNode as ExportAssignment;
            if (node.isExportEquals) return undefined;
            return noSymbolError(node.expression)
                || { exportNode: node, exportName: node.expression as Identifier, wasDefault, exportingModuleSymbol };
        }
        default:
            return undefined;
    }
}

function doChange(exportingSourceFile: SourceFile, program: Program, info: ExportInfo, changes: textChanges.ChangeTracker, cancellationToken: CancellationToken | undefined): void {
    changeExport(exportingSourceFile, info, changes, program.getTypeChecker());
    changeImports(program, info, changes, cancellationToken);
}

function changeExport(exportingSourceFile: SourceFile, { wasDefault, exportNode, exportName }: ExportInfo, changes: textChanges.ChangeTracker, checker: TypeChecker): void {
    if (wasDefault) {
        if (isExportAssignment(exportNode) && !exportNode.isExportEquals) {
            const exp = exportNode.expression as Identifier;
            const spec = makeExportSpecifier(exp.text, exp.text);
            changes.replaceNode(exportingSourceFile, exportNode, factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, factory.createNamedExports([spec])));
        }
        else {
            changes.delete(exportingSourceFile, Debug.checkDefined(findModifier(exportNode, SyntaxKind.DefaultKeyword), "Should find a default keyword in modifier list"));
        }
    }
    else {
        const exportKeyword = Debug.checkDefined(findModifier(exportNode, SyntaxKind.ExportKeyword), "Should find an export keyword in modifier list");
        switch (exportNode.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
                changes.insertNodeAfter(exportingSourceFile, exportKeyword, factory.createToken(SyntaxKind.DefaultKeyword));
                break;
            case SyntaxKind.VariableStatement:
                // If 'x' isn't used in this file and doesn't have type definition, `export const x = 0;` --> `export default 0;`
                const decl = first(exportNode.declarationList.declarations);
                if (!FindAllReferences.Core.isSymbolReferencedInFile(exportName, checker, exportingSourceFile) && !decl.type) {
                    // We checked in `getInfo` that an initializer exists.
                    changes.replaceNode(exportingSourceFile, exportNode, factory.createExportDefault(Debug.checkDefined(decl.initializer, "Initializer was previously known to be present")));
                    break;
                }
                // falls through
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.ModuleDeclaration:
                // `export type T = number;` -> `type T = number; export default T;`
                changes.deleteModifier(exportingSourceFile, exportKeyword);
                changes.insertNodeAfter(exportingSourceFile, exportNode, factory.createExportDefault(factory.createIdentifier(exportName.text)));
                break;
            default:
                Debug.fail(`Unexpected exportNode kind ${(exportNode as ExportToConvert).kind}`);
        }
    }
}

function changeImports(program: Program, { wasDefault, exportName, exportingModuleSymbol }: ExportInfo, changes: textChanges.ChangeTracker, cancellationToken: CancellationToken | undefined): void {
    const checker = program.getTypeChecker();
    const exportSymbol = Debug.checkDefined(checker.getSymbolAtLocation(exportName), "Export name should resolve to a symbol");
    FindAllReferences.Core.eachExportReference(program.getSourceFiles(), checker, cancellationToken, exportSymbol, exportingModuleSymbol, exportName.text, wasDefault, ref => {
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

function changeDefaultToNamedImport(importingSourceFile: SourceFile, ref: ModuleExportName, changes: textChanges.ChangeTracker, exportName: string): void {
    const { parent } = ref;
    switch (parent.kind) {
        case SyntaxKind.PropertyAccessExpression:
            // `a.default` --> `a.foo`
            changes.replaceNode(importingSourceFile, ref, factory.createIdentifier(exportName));
            break;
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.ExportSpecifier: {
            const spec = parent as ImportSpecifier | ExportSpecifier;
            // `default as foo` --> `foo`, `default as bar` --> `foo as bar`
            changes.replaceNode(importingSourceFile, spec, makeImportSpecifier(exportName, spec.name.text));
            break;
        }
        case SyntaxKind.ImportClause: {
            const clause = parent as ImportClause;
            Debug.assert(clause.name === ref, "Import clause name should match provided ref");
            const spec = makeImportSpecifier(exportName, ref.text);
            const { namedBindings } = clause;
            if (!namedBindings) {
                // `import foo from "./a";` --> `import { foo } from "./a";`
                changes.replaceNode(importingSourceFile, ref, factory.createNamedImports([spec]));
            }
            else if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                // `import foo, * as a from "./a";` --> `import * as a from ".a/"; import { foo } from "./a";`
                changes.deleteRange(importingSourceFile, { pos: ref.getStart(importingSourceFile), end: namedBindings.getStart(importingSourceFile) });
                const quotePreference = isStringLiteral(clause.parent.moduleSpecifier) ? quotePreferenceFromString(clause.parent.moduleSpecifier, importingSourceFile) : QuotePreference.Double;
                const newImport = makeImport(/*defaultImport*/ undefined, [makeImportSpecifier(exportName, ref.text)], clause.parent.moduleSpecifier, quotePreference);
                changes.insertNodeAfter(importingSourceFile, clause.parent, newImport);
            }
            else {
                // `import foo, { bar } from "./a"` --> `import { bar, foo } from "./a";`
                changes.delete(importingSourceFile, ref);
                changes.insertNodeAtEndOfList(importingSourceFile, namedBindings.elements, spec);
            }
            break;
        }
        case SyntaxKind.ImportType:
            const importTypeNode = parent as ImportTypeNode;
            changes.replaceNode(importingSourceFile, parent, factory.createImportTypeNode(importTypeNode.argument, importTypeNode.attributes, factory.createIdentifier(exportName), importTypeNode.typeArguments, importTypeNode.isTypeOf));
            break;
        default:
            Debug.failBadSyntaxKind(parent);
    }
}

function changeNamedToDefaultImport(importingSourceFile: SourceFile, ref: ModuleExportName, changes: textChanges.ChangeTracker): void {
    const parent = ref.parent as PropertyAccessExpression | ImportSpecifier | ExportSpecifier;
    switch (parent.kind) {
        case SyntaxKind.PropertyAccessExpression:
            // `a.foo` --> `a.default`
            changes.replaceNode(importingSourceFile, ref, factory.createIdentifier("default"));
            break;
        case SyntaxKind.ImportSpecifier: {
            // `import { foo } from "./a";` --> `import foo from "./a";`
            // `import { foo as bar } from "./a";` --> `import bar from "./a";`
            const defaultImport = factory.createIdentifier(parent.name.text);
            if (parent.parent.elements.length === 1) {
                changes.replaceNode(importingSourceFile, parent.parent, defaultImport);
            }
            else {
                changes.delete(importingSourceFile, parent);
                changes.insertNodeBefore(importingSourceFile, parent.parent, defaultImport);
            }
            break;
        }
        case SyntaxKind.ExportSpecifier: {
            // `export { foo } from "./a";` --> `export { default as foo } from "./a";`
            // `export { foo as bar } from "./a";` --> `export { default as bar } from "./a";`
            // `export { foo as default } from "./a";` --> `export { default } from "./a";`
            // (Because `export foo from "./a";` isn't valid syntax.)
            changes.replaceNode(importingSourceFile, parent, makeExportSpecifier("default", parent.name.text));
            break;
        }
        default:
            Debug.assertNever(parent, `Unexpected parent kind ${(parent as Node).kind}`);
    }
}

function makeImportSpecifier(propertyName: string, name: string): ImportSpecifier {
    return factory.createImportSpecifier(/*isTypeOnly*/ false, propertyName === name ? undefined : factory.createIdentifier(propertyName), factory.createIdentifier(name));
}

function makeExportSpecifier(propertyName: string, name: string): ExportSpecifier {
    return factory.createExportSpecifier(/*isTypeOnly*/ false, propertyName === name ? undefined : factory.createIdentifier(propertyName), factory.createIdentifier(name));
}

function getExportingModuleSymbol(parent: SourceFile | ModuleBlock, checker: TypeChecker) {
    if (isSourceFile(parent)) {
        return parent.symbol;
    }
    const symbol = parent.parent.symbol;
    if (symbol.valueDeclaration && isExternalModuleAugmentation(symbol.valueDeclaration)) {
        return checker.getMergedSymbol(symbol);
    }
    return symbol;
}
