/* @internal */
namespace ts.codefix {
    const fixId = "fixImportNonExportedMember";
    const errorCodes = [
        Diagnostics.Module_0_declares_1_locally_but_it_is_not_exported.code,
    ];

    registerCodeFix({
        errorCodes,
        fixIds: [fixId],
        getCodeActions(context) {
            const { sourceFile, span, program } = context;
            const info = getInfo(sourceFile, span.start, program);
            if (info === undefined) return undefined;

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, info));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Export_0_from_module_1, info.exportName.node.text, info.moduleSpecifier], fixId, Diagnostics.Export_all_missing_members)];
        },
        getAllCodeActions(context) {
            const { program } = context;
            return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
                const exports = new Map<SourceFile, ModuleExports>();

                eachDiagnostic(context, errorCodes, diag => {
                    const info = getInfo(diag.file, diag.start, program);
                    if (info === undefined) return undefined;

                    const { exportName, node, moduleSourceFile } = info;
                    if (tryGetExportDeclaration(moduleSourceFile, exportName.isTypeOnly) === undefined && canHaveExportModifier(node)) {
                        changes.insertExportModifier(moduleSourceFile, node);
                    }
                    else {
                        const moduleExports = exports.get(moduleSourceFile) || { typeOnlyExports: [], exports: [] };
                        if (exportName.isTypeOnly) {
                            moduleExports.typeOnlyExports.push(exportName);
                        }
                        else {
                            moduleExports.exports.push(exportName);
                        }
                        exports.set(moduleSourceFile, moduleExports);
                    }
                });

                exports.forEach((moduleExports, moduleSourceFile) => {
                    const exportDeclaration = tryGetExportDeclaration(moduleSourceFile, /*isTypeOnly*/ true);
                    if (exportDeclaration && exportDeclaration.isTypeOnly) {
                        doChanges(changes, moduleSourceFile, moduleExports.typeOnlyExports, exportDeclaration);
                        doChanges(changes, moduleSourceFile, moduleExports.exports, tryGetExportDeclaration(moduleSourceFile, /*isTypeOnly*/ false));
                    }
                    else {
                        doChanges(changes, moduleSourceFile, [...moduleExports.exports, ...moduleExports.typeOnlyExports], exportDeclaration);
                    }
                });
            }));
        }
    });

    interface ModuleExports {
        typeOnlyExports: ExportName[];
        exports: ExportName[];
    }

    interface ExportName {
        node: Identifier;
        isTypeOnly: boolean;
    }

    interface Info {
        exportName: ExportName;
        node: Declaration | VariableStatement;
        moduleSourceFile: SourceFile;
        moduleSpecifier: string;
    }

    function getInfo(sourceFile: SourceFile, pos: number, program: Program): Info | undefined {
        const token = getTokenAtPosition(sourceFile, pos);
        if (isIdentifier(token)) {
            const importDeclaration = findAncestor(token, isImportDeclaration);
            if (importDeclaration === undefined) return undefined;

            const moduleSpecifier = isStringLiteral(importDeclaration.moduleSpecifier) ? importDeclaration.moduleSpecifier.text : undefined;
            if (moduleSpecifier === undefined) return undefined;

            const resolvedModule = getResolvedModule(sourceFile, moduleSpecifier, /*mode*/ undefined);
            if (resolvedModule === undefined) return undefined;

            const moduleSourceFile = program.getSourceFile(resolvedModule.resolvedFileName);
            if (moduleSourceFile === undefined || isSourceFileFromLibrary(program, moduleSourceFile)) return undefined;

            const moduleSymbol = moduleSourceFile.symbol;
            const locals = moduleSymbol.valueDeclaration?.locals;
            if (locals === undefined) return undefined;

            const localSymbol = locals.get(token.escapedText);
            if (localSymbol === undefined) return undefined;

            const node = getNodeOfSymbol(localSymbol);
            if (node === undefined) return undefined;

            const exportName = { node: token, isTypeOnly: isTypeDeclaration(node) };
            return { exportName, node, moduleSourceFile, moduleSpecifier };
        }
        return undefined;
    }

    function doChange(changes: textChanges.ChangeTracker, { exportName, node, moduleSourceFile }: Info) {
        const exportDeclaration = tryGetExportDeclaration(moduleSourceFile, exportName.isTypeOnly);
        if (exportDeclaration) {
            updateExport(changes, moduleSourceFile, exportDeclaration, [exportName]);
        }
        else if (canHaveExportModifier(node)) {
            changes.insertExportModifier(moduleSourceFile, node);
        }
        else {
            createExport(changes, moduleSourceFile, [exportName]);
        }
    }

    function doChanges(changes: textChanges.ChangeTracker, sourceFile: SourceFile, moduleExports: ExportName[], node: ExportDeclaration | undefined) {
        if (node) {
            updateExport(changes, sourceFile, node, moduleExports);
        }
        else {
            createExport(changes, sourceFile, moduleExports);
        }
    }

    function tryGetExportDeclaration(sourceFile: SourceFile, isTypeOnly: boolean) {
        const predicate = (node: Node): node is ExportDeclaration =>
            isExportDeclaration(node) && (isTypeOnly && node.isTypeOnly || !node.isTypeOnly);
        return findLast(sourceFile.statements, predicate);
    }

    function updateExport(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: ExportDeclaration, names: ExportName[]) {
        const namedExports = node.exportClause && isNamedExports(node.exportClause) ? node.exportClause.elements : factory.createNodeArray([]);
        const exportNames = map(names, n => ({ ...n, isTypeOnly: node.isTypeOnly ? false : n.isTypeOnly }));
        changes.replaceNode(sourceFile, node,
            factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly,
                factory.createNamedExports(
                    factory.createNodeArray([...namedExports, ...createExportSpecifiers(exportNames)], /*hasTrailingComma*/ namedExports.hasTrailingComma)), node.moduleSpecifier, node.assertClause));
    }

    function createExport(changes: textChanges.ChangeTracker, sourceFile: SourceFile, names: ExportName[]) {
        changes.insertNodeAtEndOfScope(sourceFile, sourceFile,
            factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false,
                factory.createNamedExports(createExportSpecifiers(names)), /*moduleSpecifier*/ undefined, /*assertClause*/ undefined));
    }

    function createExportSpecifiers(names: ExportName[]) {
        return factory.createNodeArray(map(names, n => factory.createExportSpecifier(n.isTypeOnly, /*propertyName*/ undefined, n.node)));
    }

    function getNodeOfSymbol(symbol: Symbol) {
        if (symbol.valueDeclaration === undefined) {
            return firstOrUndefined(symbol.declarations);
        }
        const declaration = symbol.valueDeclaration;
        const variableStatement = isVariableDeclaration(declaration) ? tryCast(declaration.parent.parent, isVariableStatement) : undefined;
        return variableStatement && length(variableStatement.declarationList.declarations) === 1 ? variableStatement : declaration;
    }
}
