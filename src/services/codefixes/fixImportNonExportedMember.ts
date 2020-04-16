/* @internal */
namespace ts.codefix {
    const fixId = "importNonExportedMember";
    const errorCodes = [
        Diagnostics.Module_0_declares_1_locally_but_it_is_not_exported.code
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const info = getInfo(sourceFile, context, context.span.start);
            if (!info) {
                return undefined;
            }
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, info.originSourceFile, info.node));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Export_0_from_module_1, info.node.text, showModuleSpecifier(info.importDecl)], fixId, Diagnostics.Export_all_non_exported_member)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, context, diag.start);
            if (info) doChange(changes, info.originSourceFile, info.node);
        }),
    });

    interface Info {
        readonly node: Identifier;
        readonly importDecl: ImportDeclaration;
        readonly originSourceFile: SourceFile
    }

    function getInfo(sourceFile: SourceFile, context: CodeFixContext | CodeFixAllContext, pos: number): Info | undefined {
        const node = getTokenAtPosition(sourceFile, pos);
        if (node && isIdentifier(node)) {
            const importStart = getLineStartPositionForPosition(pos, sourceFile);
            const importDecl = tryGetImportFrom(getTokenAtPosition(sourceFile, importStart));
            if (!importDecl || !isStringLiteralLike(importDecl.moduleSpecifier)) {
                return undefined;
            }
            const resolvedModule = getResolvedModule(sourceFile, importDecl.moduleSpecifier.text);
            const originSourceFile = resolvedModule && context.program.getSourceFile(resolvedModule.resolvedFileName);
            if (!originSourceFile) {
                return undefined;
            }
            return { node, importDecl, originSourceFile };
        }
    }

    function tryGetImportFrom(token: Node): ImportDeclaration | undefined {
        return token.kind === SyntaxKind.ImportKeyword ? tryCast(token.parent, isImportDeclaration) : undefined;
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: Identifier): void {
        const exportSpecifier = createExportSpecifier(/*propertyName*/ undefined, node);
        const exportDeclaration = createExportDeclaration(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            createNamedExports([exportSpecifier]),
            /*moduleSpecifier*/ undefined,
            /*isTypeOnly*/ false);
        changes.insertNodeAtEndOfScope(sourceFile, sourceFile, exportDeclaration);
    }
}
