/* @internal */
namespace ts.refactor {
    const refactorName = "Convert export";
    const actionNameDefaultToNamed = "Convert default export to named export";
    const actionNameNamedToDefault = "Convert named export to default export";
    registerRefactor(refactorName, {
        getAvailableActions(context): ReadonlyArray<ApplicableRefactorInfo> {
            const info = getInfo(context);
            if (!info) return emptyArray;
            const description = info.wasDefault ? Diagnostics.Convert_default_export_to_named_export.message : Diagnostics.Convert_named_export_to_default_export.message;
            const actionName = info.wasDefault ? actionNameDefaultToNamed : actionNameNamedToDefault;
            return [{ name: refactorName, description, actions: [{ name: actionName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === actionNameDefaultToNamed || actionName === actionNameNamedToDefault);
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, Debug.assertDefined(getInfo(context)), t, context.cancellationToken));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        },
    });

    // If a VariableStatement, will have exactly one VariableDeclaration, with an Identifier for a name.
    type ExportToConvert = FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | EnumDeclaration | NamespaceDeclaration | TypeAliasDeclaration | VariableStatement;
    interface Info {
        readonly exportNode: ExportToConvert;
        readonly exportName: Identifier; // This is exportNode.name except for VariableStatement_s.
        readonly wasDefault: boolean;
        readonly exportingModuleSymbol: Symbol;
    }

    function getInfo(context: RefactorContext): Info | undefined {
        const { file } = context;
        const span = getRefactorContextSpan(context);
        const token = getTokenAtPosition(file, span.start);
        const exportNode = getParentNodeInSpan(token, file, span);
        if (!exportNode || (!isSourceFile(exportNode.parent) && !(isModuleBlock(exportNode.parent) && isAmbientModule(exportNode.parent.parent)))) {
            return undefined;
        }

        const exportingModuleSymbol = isSourceFile(exportNode.parent) ? exportNode.parent.symbol : exportNode.parent.parent.symbol;

        const flags = getModifierFlags(exportNode);
        const wasDefault = !!(flags & ModifierFlags.Default);
        // If source file already has a default export, don't offer refactor.
        if (!(flags & ModifierFlags.Export) || !wasDefault && exportingModuleSymbol.exports!.has(InternalSymbolName.Default)) {
            return undefined;
        }

        switch (exportNode.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.ModuleDeclaration: {
                const node = exportNode as FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration | NamespaceDeclaration;
                return node.name && isIdentifier(node.name) ? { exportNode: node, exportName: node.name, wasDefault, exportingModuleSymbol } : undefined;
            }
            case SyntaxKind.VariableStatement: {
                const vs = exportNode as VariableStatement;
                // Must be `export const x = something;`.
                if (!(vs.declarationList.flags & NodeFlags.Const) || vs.declarationList.declarations.length !== 1) {
                    return undefined;
                }
                const decl = first(vs.declarationList.declarations);
                if (!decl.initializer) return undefined;
                Debug.assert(!wasDefault);
                return isIdentifier(decl.name) ? { exportNode: vs, exportName: decl.name, wasDefault, exportingModuleSymbol } : undefined;
            }
            default:
                return undefined;
        }
    }

    function doChange(exportingSourceFile: SourceFile, program: Program, info: Info, changes: textChanges.ChangeTracker, cancellationToken: CancellationToken | undefined): void {
        changeExport(exportingSourceFile, info, changes, program.getTypeChecker());
        changeImports(program, info, changes, cancellationToken);
    }

    function changeExport(exportingSourceFile: SourceFile, { wasDefault, exportNode, exportName }: Info, changes: textChanges.ChangeTracker, checker: TypeChecker): void {
        if (wasDefault) {
            changes.delete(exportingSourceFile, Debug.assertDefined(findModifier(exportNode, SyntaxKind.DefaultKeyword)));
        }
        else {
            const exportKeyword = Debug.assertDefined(findModifier(exportNode, SyntaxKind.ExportKeyword));
            switch (exportNode.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                    changes.insertNodeAfter(exportingSourceFile, exportKeyword, createToken(SyntaxKind.DefaultKeyword));
                    break;
                case SyntaxKind.VariableStatement:
                    // If 'x' isn't used in this file, `export const x = 0;` --> `export default 0;`
                    if (!FindAllReferences.Core.isSymbolReferencedInFile(exportName, checker, exportingSourceFile)) {
                        // We checked in `getInfo` that an initializer exists.
                        changes.replaceNode(exportingSourceFile, exportNode, createExportDefault(Debug.assertDefined(first(exportNode.declarationList.declarations).initializer)));
                        break;
                    }
                    // falls through
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ModuleDeclaration:
                    // `export type T = number;` -> `type T = number; export default T;`
                    changes.deleteModifier(exportingSourceFile, exportKeyword);
                    changes.insertNodeAfter(exportingSourceFile, exportNode, createExportDefault(createIdentifier(exportName.text)));
                    break;
                default:
                    Debug.assertNever(exportNode);
            }
        }
    }

    function changeImports(program: Program, { wasDefault, exportName, exportingModuleSymbol }: Info, changes: textChanges.ChangeTracker, cancellationToken: CancellationToken | undefined): void {
        const checker = program.getTypeChecker();
        const exportSymbol = Debug.assertDefined(checker.getSymbolAtLocation(exportName));
        FindAllReferences.Core.eachExportReference(program.getSourceFiles(), checker, cancellationToken, exportSymbol, exportingModuleSymbol, exportName.text, wasDefault, ref => {
            const importingSourceFile = ref.getSourceFile();
            if (wasDefault) {
                changeDefaultToNamedImport(importingSourceFile, ref, changes, exportName.text);
            }
            else {
                changeNamedToDefaultImport(importingSourceFile, ref, changes);
            }
        });
    }

    function changeDefaultToNamedImport(importingSourceFile: SourceFile, ref: Identifier, changes: textChanges.ChangeTracker, exportName: string): void {
        const { parent } = ref;
        switch (parent.kind) {
            case SyntaxKind.PropertyAccessExpression:
                // `a.default` --> `a.foo`
                changes.replaceNode(importingSourceFile, ref, createIdentifier(exportName));
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
                Debug.assert(clause.name === ref);
                const spec = makeImportSpecifier(exportName, ref.text);
                const { namedBindings } = clause;
                if (!namedBindings) {
                    // `import foo from "./a";` --> `import { foo } from "./a";`
                    changes.replaceNode(importingSourceFile, ref, createNamedImports([spec]));
                }
                else if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                    // `import foo, * as a from "./a";` --> `import * as a from ".a/"; import { foo } from "./a";`
                    changes.deleteRange(importingSourceFile, { pos: ref.getStart(importingSourceFile), end: namedBindings.getStart(importingSourceFile) });
                    const quotePreference = isStringLiteral(clause.parent.moduleSpecifier) ? quotePreferenceFromString(clause.parent.moduleSpecifier, importingSourceFile) : QuotePreference.Double;
                    const newImport = makeImport(/*default*/ undefined, [makeImportSpecifier(exportName, ref.text)], clause.parent.moduleSpecifier, quotePreference);
                    changes.insertNodeAfter(importingSourceFile, clause.parent, newImport);
                }
                else {
                    // `import foo, { bar } from "./a"` --> `import { bar, foo } from "./a";`
                    changes.delete(importingSourceFile, ref);
                    changes.insertNodeAtEndOfList(importingSourceFile, namedBindings.elements, spec);
                }
                break;
            }
            default:
                Debug.failBadSyntaxKind(parent);
        }
    }

    function changeNamedToDefaultImport(importingSourceFile: SourceFile, ref: Identifier, changes: textChanges.ChangeTracker): void {
        const { parent } = ref;
        switch (parent.kind) {
            case SyntaxKind.PropertyAccessExpression:
                // `a.foo` --> `a.default`
                changes.replaceNode(importingSourceFile, ref, createIdentifier("default"));
                break;
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ExportSpecifier: {
                const spec = parent as ImportSpecifier | ExportSpecifier;
                if (spec.kind === SyntaxKind.ImportSpecifier) {
                    // `import { foo } from "./a";` --> `import foo from "./a";`
                    // `import { foo as bar } from "./a";` --> `import bar from "./a";`
                    const defaultImport = createIdentifier(spec.name.text);
                    if (spec.parent.elements.length === 1) {
                        changes.replaceNode(importingSourceFile, spec.parent, defaultImport);
                    }
                    else {
                        changes.delete(importingSourceFile, spec);
                        changes.insertNodeBefore(importingSourceFile, spec.parent, defaultImport);
                    }
                }
                else {
                    // `export { foo } from "./a";` --> `export { default as foo } from "./a";`
                    // `export { foo as bar } from "./a";` --> `export { default as bar } from "./a";`
                    // `export { foo as default } from "./a";` --> `export { default } from "./a";`
                    // (Because `export foo from "./a";` isn't valid syntax.)
                    changes.replaceNode(importingSourceFile, spec, makeExportSpecifier("default", spec.name.text));
                }
                break;
            }
            default:
                Debug.failBadSyntaxKind(parent);
        }

    }

    function makeImportSpecifier(propertyName: string, name: string): ImportSpecifier {
        return createImportSpecifier(propertyName === name ? undefined : createIdentifier(propertyName), createIdentifier(name));
    }

    function makeExportSpecifier(propertyName: string, name: string): ExportSpecifier {
        return createExportSpecifier(propertyName === name ? undefined : createIdentifier(propertyName), createIdentifier(name));
    }
}
