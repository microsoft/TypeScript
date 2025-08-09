import {
    createCodeFixAction,
    createCombinedCodeActions,
    eachDiagnostic,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    canHaveExportModifier,
    canHaveLocals,
    Declaration,
    Diagnostics,
    ExportDeclaration,
    factory,
    find,
    findAncestor,
    findLast,
    firstOrUndefined,
    getIsolatedModules,
    getTokenAtPosition,
    Identifier,
    isExportDeclaration,
    isIdentifier,
    isImportDeclaration,
    isNamedExports,
    isSourceFileFromLibrary,
    isStringLiteral,
    isTypeDeclaration,
    isVariableDeclaration,
    isVariableStatement,
    length,
    map,
    Node,
    Program,
    SourceFile,
    Symbol,
    textChanges,
    tryCast,
    VariableStatement,
} from "../_namespaces/ts.js";

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

        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, program, info));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Export_0_from_module_1, info.exportName.node.text, info.moduleSpecifier], fixId, Diagnostics.Export_all_referenced_locals)];
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
                    doChanges(changes, program, moduleSourceFile, moduleExports.typeOnlyExports, exportDeclaration);
                    doChanges(changes, program, moduleSourceFile, moduleExports.exports, tryGetExportDeclaration(moduleSourceFile, /*isTypeOnly*/ false));
                }
                else {
                    doChanges(changes, program, moduleSourceFile, [...moduleExports.exports, ...moduleExports.typeOnlyExports], exportDeclaration);
                }
            });
        }));
    },
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

        const moduleSpecifier = isStringLiteral(importDeclaration.moduleSpecifier) ? importDeclaration.moduleSpecifier : undefined;
        if (moduleSpecifier === undefined) return undefined;

        const resolvedModule = program.getResolvedModuleFromModuleSpecifier(moduleSpecifier, sourceFile)?.resolvedModule;
        if (resolvedModule === undefined) return undefined;

        const moduleSourceFile = program.getSourceFile(resolvedModule.resolvedFileName);
        if (moduleSourceFile === undefined || isSourceFileFromLibrary(program, moduleSourceFile)) return undefined;

        const moduleSymbol = moduleSourceFile.symbol;
        const locals = tryCast(moduleSymbol.valueDeclaration, canHaveLocals)?.locals;
        if (locals === undefined) return undefined;

        const localSymbol = locals.get(token.escapedText);
        if (localSymbol === undefined) return undefined;

        const node = getNodeOfSymbol(localSymbol);
        if (node === undefined) return undefined;

        const exportName = { node: token, isTypeOnly: isTypeDeclaration(node) };
        return { exportName, node, moduleSourceFile, moduleSpecifier: moduleSpecifier.text };
    }
    return undefined;
}

function doChange(changes: textChanges.ChangeTracker, program: Program, { exportName, node, moduleSourceFile }: Info) {
    const exportDeclaration = tryGetExportDeclaration(moduleSourceFile, exportName.isTypeOnly);
    if (exportDeclaration) {
        updateExport(changes, program, moduleSourceFile, exportDeclaration, [exportName]);
    }
    else if (canHaveExportModifier(node)) {
        changes.insertExportModifier(moduleSourceFile, node);
    }
    else {
        createExport(changes, program, moduleSourceFile, [exportName]);
    }
}

function doChanges(changes: textChanges.ChangeTracker, program: Program, sourceFile: SourceFile, moduleExports: ExportName[], node: ExportDeclaration | undefined) {
    if (length(moduleExports)) {
        if (node) {
            updateExport(changes, program, sourceFile, node, moduleExports);
        }
        else {
            createExport(changes, program, sourceFile, moduleExports);
        }
    }
}

function tryGetExportDeclaration(sourceFile: SourceFile, isTypeOnly: boolean) {
    const predicate = (node: Node): node is ExportDeclaration => isExportDeclaration(node) && (isTypeOnly && node.isTypeOnly || !node.isTypeOnly);
    return findLast(sourceFile.statements, predicate);
}

function updateExport(changes: textChanges.ChangeTracker, program: Program, sourceFile: SourceFile, node: ExportDeclaration, names: ExportName[]) {
    const namedExports = node.exportClause && isNamedExports(node.exportClause) ? node.exportClause.elements : factory.createNodeArray([]);
    const allowTypeModifier = !node.isTypeOnly && !!(getIsolatedModules(program.getCompilerOptions()) || find(namedExports, e => e.isTypeOnly));
    changes.replaceNode(
        sourceFile,
        node,
        factory.updateExportDeclaration(
            node,
            node.modifiers,
            node.isTypeOnly,
            factory.createNamedExports(
                factory.createNodeArray([...namedExports, ...createExportSpecifiers(names, allowTypeModifier)], /*hasTrailingComma*/ namedExports.hasTrailingComma),
            ),
            node.moduleSpecifier,
            node.attributes,
        ),
    );
}

function createExport(changes: textChanges.ChangeTracker, program: Program, sourceFile: SourceFile, names: ExportName[]) {
    changes.insertNodeAtEndOfScope(sourceFile, sourceFile, factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, factory.createNamedExports(createExportSpecifiers(names, /*allowTypeModifier*/ getIsolatedModules(program.getCompilerOptions()))), /*moduleSpecifier*/ undefined, /*attributes*/ undefined));
}

function createExportSpecifiers(names: ExportName[], allowTypeModifier: boolean) {
    return factory.createNodeArray(map(names, n => factory.createExportSpecifier(allowTypeModifier && n.isTypeOnly, /*propertyName*/ undefined, n.node)));
}

function getNodeOfSymbol(symbol: Symbol) {
    if (symbol.valueDeclaration === undefined) {
        return firstOrUndefined(symbol.declarations);
    }
    const declaration = symbol.valueDeclaration;
    const variableStatement = isVariableDeclaration(declaration) ? tryCast(declaration.parent.parent, isVariableStatement) : undefined;
    return variableStatement && length(variableStatement.declarationList.declarations) === 1 ? variableStatement : declaration;
}
