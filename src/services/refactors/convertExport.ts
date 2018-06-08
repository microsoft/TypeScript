/* @internal */
namespace ts.refactor {
    const refactorName = "Convert export";
    const actionNameDefaultToNamed = "Convert default export to named export";
    const actionNameNamedToDefault = "Convert named export to default export";
    registerRefactor(refactorName, {
        getAvailableActions(context): ApplicableRefactorInfo[] | undefined {
            const info = getInfo(context);
            if (!info) return undefined;
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

    type ExportToConvert = (FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | EnumDeclaration | NamespaceDeclaration) & { readonly name: Identifier };
    interface Info {
        readonly exportNode: ExportToConvert;
        readonly wasDefault: boolean;
    }

    function getInfo(context: RefactorContext): Info | undefined {
        const { file } = context;
        const span = getRefactorContextSpan(context);
        const token = getTokenAtPosition(file, span.start, /*includeJsDocComment*/ false);
        const exportNode = getParentNodeInSpan(token, file, span);
        if (!exportNode || exportNode.parent !== file) return undefined;

        const flags = getModifierFlags(exportNode);
        const wasDefault = !!(flags & ModifierFlags.Default);
        // If source file already has a default export, don't offer refactor.
        if (!(flags & ModifierFlags.Export) || !wasDefault && file.symbol.exports!.has(InternalSymbolName.Default)) {
            return undefined;
        }

        switch (exportNode.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ModuleDeclaration:
                return isIdentifier((exportNode as ExportToConvert).name) ? { exportNode: exportNode as ExportToConvert, wasDefault } : undefined;
            default:
                return undefined;
        }
    }

    function doChange(exportingSourceFile: SourceFile, program: Program, info: Info, changes: textChanges.ChangeTracker, cancellationToken: CancellationToken | undefined): void {
        changeExport(exportingSourceFile, info, changes);
        changeImports(exportingSourceFile, program, info, changes, cancellationToken);
    }

    function changeExport(exportingSourceFile: SourceFile, { wasDefault, exportNode }: Info, changes: textChanges.ChangeTracker): void {
        if (wasDefault) {
            changes.deleteNode(exportingSourceFile, Debug.assertDefined(findModifier(exportNode, SyntaxKind.DefaultKeyword)));
        }
        else {
            changes.insertNodeAfter(exportingSourceFile, Debug.assertDefined(findModifier(exportNode, SyntaxKind.ExportKeyword)), createToken(SyntaxKind.DefaultKeyword));
        }
    }

    function changeImports(exportingSourceFile: SourceFile, program: Program, { wasDefault, exportNode }: Info, changes: textChanges.ChangeTracker, cancellationToken: CancellationToken | undefined): void {
        const checker = program.getTypeChecker();
        const exportSymbol = Debug.assertDefined(checker.getSymbolAtLocation(exportNode.name));
        const exportName = exportNode.name.text;
        FindAllReferences.Core.eachExportReference(program.getSourceFiles(), checker, cancellationToken, exportSymbol, exportingSourceFile.symbol, exportName, wasDefault, ref => {
            const importingSourceFile = ref.getSourceFile();
            if (wasDefault) {
                changeDefaultToNamedImport(importingSourceFile, ref, changes, exportName);
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
                    changes.deleteNode(importingSourceFile, ref);
                    const quotePreference = isStringLiteral(clause.parent.moduleSpecifier) ? quotePreferenceFromString(clause.parent.moduleSpecifier, importingSourceFile) : QuotePreference.Double;
                    const newImport = makeImport(/*default*/ undefined, [makeImportSpecifier(exportName, ref.text)], clause.parent.moduleSpecifier, quotePreference);
                    changes.insertNodeAfter(importingSourceFile, clause.parent, newImport);
                }
                else {
                    // `import foo, { bar } from "./a"` --> `import { bar, foo } from "./a";`
                    changes.deleteNode(importingSourceFile, ref);
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
                        changes.deleteNodeInList(importingSourceFile, spec);
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
