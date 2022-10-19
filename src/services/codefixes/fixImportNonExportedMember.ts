/* @internal */
namespace ts.codefix {
const fixId = "fixImportNonExportedMember";
const errorCodes = [
    ts.Diagnostics.Module_0_declares_1_locally_but_it_is_not_exported.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span, program } = context;
        const info = getInfo(sourceFile, span.start, program);
        if (info === undefined) return undefined;

        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, program, info));
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Export_0_from_module_1, info.exportName.node.text, info.moduleSpecifier], fixId, ts.Diagnostics.Export_all_referenced_locals)];
    },
    getAllCodeActions(context) {
        const { program } = context;
        return ts.codefix.createCombinedCodeActions(ts.textChanges.ChangeTracker.with(context, changes => {
            const exports = new ts.Map<ts.SourceFile, ModuleExports>();

            ts.codefix.eachDiagnostic(context, errorCodes, diag => {
                const info = getInfo(diag.file, diag.start, program);
                if (info === undefined) return undefined;

                const { exportName, node, moduleSourceFile } = info;
                if (tryGetExportDeclaration(moduleSourceFile, exportName.isTypeOnly) === undefined && ts.canHaveExportModifier(node)) {
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
                    doChanges(changes, program, moduleSourceFile, moduleExports.typeOnlyExports, exportDeclaration);
                    doChanges(changes, program, moduleSourceFile, moduleExports.exports, tryGetExportDeclaration(moduleSourceFile, /*isTypeOnly*/ false));
                }
                else {
                    doChanges(changes, program, moduleSourceFile, [...moduleExports.exports, ...moduleExports.typeOnlyExports], exportDeclaration);
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
    node: ts.Identifier;
    isTypeOnly: boolean;
}

interface Info {
    exportName: ExportName;
    node: ts.Declaration | ts.VariableStatement;
    moduleSourceFile: ts.SourceFile;
    moduleSpecifier: string;
}

function getInfo(sourceFile: ts.SourceFile, pos: number, program: ts.Program): Info | undefined {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    if (ts.isIdentifier(token)) {
        const importDeclaration = ts.findAncestor(token, ts.isImportDeclaration);
        if (importDeclaration === undefined) return undefined;

        const moduleSpecifier = ts.isStringLiteral(importDeclaration.moduleSpecifier) ? importDeclaration.moduleSpecifier.text : undefined;
        if (moduleSpecifier === undefined) return undefined;

        const resolvedModule = ts.getResolvedModule(sourceFile, moduleSpecifier, /*mode*/ undefined);
        if (resolvedModule === undefined) return undefined;

        const moduleSourceFile = program.getSourceFile(resolvedModule.resolvedFileName);
        if (moduleSourceFile === undefined || ts.isSourceFileFromLibrary(program, moduleSourceFile)) return undefined;

        const moduleSymbol = moduleSourceFile.symbol;
        const locals = moduleSymbol.valueDeclaration?.locals;
        if (locals === undefined) return undefined;

        const localSymbol = locals.get(token.escapedText);
        if (localSymbol === undefined) return undefined;

        const node = getNodeOfSymbol(localSymbol);
        if (node === undefined) return undefined;

        const exportName = { node: token, isTypeOnly: ts.isTypeDeclaration(node) };
        return { exportName, node, moduleSourceFile, moduleSpecifier };
    }
    return undefined;
}

function doChange(changes: ts.textChanges.ChangeTracker, program: ts.Program, { exportName, node, moduleSourceFile }: Info) {
    const exportDeclaration = tryGetExportDeclaration(moduleSourceFile, exportName.isTypeOnly);
    if (exportDeclaration) {
        updateExport(changes, program, moduleSourceFile, exportDeclaration, [exportName]);
    }
    else if (ts.canHaveExportModifier(node)) {
        changes.insertExportModifier(moduleSourceFile, node);
    }
    else {
        createExport(changes, program, moduleSourceFile, [exportName]);
    }
}

function doChanges(changes: ts.textChanges.ChangeTracker, program: ts.Program, sourceFile: ts.SourceFile, moduleExports: ExportName[], node: ts.ExportDeclaration | undefined) {
    if (ts.length(moduleExports)) {
        if (node) {
            updateExport(changes, program, sourceFile, node, moduleExports);
        }
        else {
            createExport(changes, program, sourceFile, moduleExports);
        }
    }
}

function tryGetExportDeclaration(sourceFile: ts.SourceFile, isTypeOnly: boolean) {
    const predicate = (node: ts.Node): node is ts.ExportDeclaration =>
        ts.isExportDeclaration(node) && (isTypeOnly && node.isTypeOnly || !node.isTypeOnly);
    return ts.findLast(sourceFile.statements, predicate);
}

function updateExport(changes: ts.textChanges.ChangeTracker, program: ts.Program, sourceFile: ts.SourceFile, node: ts.ExportDeclaration, names: ExportName[]) {
    const namedExports = node.exportClause && ts.isNamedExports(node.exportClause) ? node.exportClause.elements : ts.factory.createNodeArray([]);
    const allowTypeModifier = !node.isTypeOnly && !!(program.getCompilerOptions().isolatedModules || ts.find(namedExports, e => e.isTypeOnly));
    changes.replaceNode(sourceFile, node,
        ts.factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly,
            ts.factory.createNamedExports(
                ts.factory.createNodeArray([...namedExports, ...createExportSpecifiers(names, allowTypeModifier)], /*hasTrailingComma*/ namedExports.hasTrailingComma)), node.moduleSpecifier, node.assertClause));
}

function createExport(changes: ts.textChanges.ChangeTracker, program: ts.Program, sourceFile: ts.SourceFile, names: ExportName[]) {
    changes.insertNodeAtEndOfScope(sourceFile, sourceFile,
        ts.factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false,
            ts.factory.createNamedExports(createExportSpecifiers(names, /*allowTypeModifier*/ !!program.getCompilerOptions().isolatedModules)), /*moduleSpecifier*/ undefined, /*assertClause*/ undefined));
}

function createExportSpecifiers(names: ExportName[], allowTypeModifier: boolean) {
    return ts.factory.createNodeArray(ts.map(names, n => ts.factory.createExportSpecifier(allowTypeModifier && n.isTypeOnly, /*propertyName*/ undefined, n.node)));
}

function getNodeOfSymbol(symbol: ts.Symbol) {
    if (symbol.valueDeclaration === undefined) {
        return ts.firstOrUndefined(symbol.declarations);
    }
    const declaration = symbol.valueDeclaration;
    const variableStatement = ts.isVariableDeclaration(declaration) ? ts.tryCast(declaration.parent.parent, ts.isVariableStatement) : undefined;
    return variableStatement && ts.length(variableStatement.declarationList.declarations) === 1 ? variableStatement : declaration;
}
}
