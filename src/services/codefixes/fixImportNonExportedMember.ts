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
            if (!info || info.originSourceFile.isDeclarationFile) {
                return undefined;
            }
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, info.originSourceFile, info.node));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Export_0_from_module_1, info.node.text, showModuleSpecifier(info.importDecl)], fixId, Diagnostics.Add_all_missing_exports)];
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
    function isImportDeclaration(node: Node): node is ImportDeclaration {
        return node.kind === SyntaxKind.ImportDeclaration;
    }

    function getInfo(sourceFile: SourceFile, context: CodeFixContext | CodeFixAllContext, pos: number): Info | undefined {
        const node = getTokenAtPosition(sourceFile, pos);
        if (node && isIdentifier(node)) {
            const importDecl = findAncestor(node, isImportDeclaration);
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

    function getNamedExportDeclaration(sourceFile: SourceFile): ExportDeclaration | undefined {
        let namedExport;
        const statements = sourceFile.statements.filter(isExportDeclaration);
        for (const statement of statements) {
            if (statement.exportClause && isNamedExports(statement.exportClause)) {
                namedExport = statement;
            }
        }
        return namedExport;
    }

    function compareIdentifiers(s1: Identifier, s2: Identifier) {
        return compareStringsCaseInsensitive(s1.text, s2.text);
    }

    function sortSpecifiers(specifiers: ExportSpecifier[]): readonly ExportSpecifier[] {
        return stableSort(specifiers, (s1, s2) => {
            return compareIdentifiers(s1.propertyName || s1.name, s2.propertyName || s2.name) ||
                compareIdentifiers(s1.name, s2.name);
        });
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: Identifier): void {
        const moduleSymbol = sourceFile.localSymbol || sourceFile.symbol;
        const localSymbol = moduleSymbol.valueDeclaration.locals?.get(node.escapedText);
        if (!localSymbol) {
            return;
        }
        if (isFunctionSymbol(localSymbol)) {
            const start = localSymbol.valueDeclaration.pos;
            changes.insertExportModifierAt(sourceFile, start ? start + 1 : 0);
            return;
        }

        const current: VariableDeclarationList | Node = localSymbol.valueDeclaration.parent;
        if (isVariableDeclarationList(current) && current.declarations.length <= 1) {
            const start = localSymbol.valueDeclaration.parent.pos;
            changes.insertExportModifierAt(sourceFile, start ? start + 1 : 0);
            return;
        }

        const namedExportDeclaration = getNamedExportDeclaration(sourceFile);
        const exportSpecifier = factory.createExportSpecifier(/*propertyName*/ undefined, node);
        if (namedExportDeclaration?.exportClause && isNamedExports(namedExportDeclaration.exportClause)) {
            const sortedExportSpecifiers = sortSpecifiers(namedExportDeclaration.exportClause.elements.concat(exportSpecifier));
            return changes.replaceNode(sourceFile, namedExportDeclaration, factory.updateExportDeclaration(
                namedExportDeclaration,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*isTypeOnly*/ false,
                factory.updateNamedExports(namedExportDeclaration.exportClause, sortedExportSpecifiers),
                /*moduleSpecifier*/ undefined
                ));
        }
        else {
            return changes.insertNodeAtEndOfScope(sourceFile, sourceFile, factory.createExportDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*isTypeOnly*/ false,
                factory.createNamedExports([exportSpecifier]),
                /*moduleSpecifier*/ undefined
                ));
        }
    }
}
