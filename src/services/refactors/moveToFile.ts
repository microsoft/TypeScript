import {
    AnyImportOrRequireStatement,
    append,
    ApplicableRefactorInfo,
    codefix,
    Debug,
    Diagnostics,
    emptyArray,
    getLocaleSpecificMessage,
    getQuotePreference,
    hasSyntacticModifier,
    hostGetCanonicalFileName,
    Identifier,
    insertImports,
    isPrologueDirective,
    LanguageServiceHost,
    ModifierFlags,
    nodeSeenTracker,
    Program,
    QuotePreference,
    RefactorContext,
    RefactorEditInfo,
    skipAlias,
    SourceFile,
    Symbol,
    SyntaxKind,
    takeWhile,
    textChanges,
    TypeChecker,
    UserPreferences,
} from "../_namespaces/ts";
import { addExports, addExportToChanges, addNewFileToTsconfig, createOldFileImportsFromNewFile, deleteMovedStatements, deleteUnusedOldImports, filterImport, forEachImportInStatement, getStatementsToMove, getTopLevelDeclarationStatement, getUsageInfo, isTopLevelDeclaration, makeImportOrRequire, moduleSpecifierFromImport, nameOfTopLevelDeclaration, ToMove, updateImportsInOtherFiles, UsageInfo } from "../moveToFileAndNewFile";
import { registerRefactor } from "../refactorProvider";

const refactorNameForMoveToFile = "Move to file";
const description = getLocaleSpecificMessage(Diagnostics.Move_to_file);

const moveToFileAction = {
    name: "Move to file",
    description,
    kind: "refactor.move.file",
};
registerRefactor(refactorNameForMoveToFile, {
    kinds: [moveToFileAction.kind],
    getAvailableActions: function getRefactorActionsToMoveToFile(context): readonly ApplicableRefactorInfo[] {
        const statements = getStatementsToMove(context);
        if (context.preferences.allowTextChangesInNewFiles && statements) {
            return [{ name: refactorNameForMoveToFile, description, actions: [moveToFileAction] }];
        }
        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{ name: refactorNameForMoveToFile, description, actions:
                [{ ...moveToFileAction, notApplicableReason: getLocaleSpecificMessage(Diagnostics.Selection_is_not_a_valid_statement_or_statements) }]
            }];
        }
        return emptyArray;
    },
    getEditsForAction: function getRefactorEditsToMoveToFile(context, actionName, newFile): RefactorEditInfo | undefined {
        Debug.assert(actionName === refactorNameForMoveToFile, "Wrong refactor invoked");
        const statements = Debug.checkDefined(getStatementsToMove(context));
        if (newFile) {
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context, context.file, newFile, context.program, statements, t, context.host, context.preferences));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
        return undefined;
    }
});

function doChange(context: RefactorContext, oldFile: SourceFile, newFile: string, program: Program, toMove: ToMove, changes: textChanges.ChangeTracker, host: LanguageServiceHost, preferences: UserPreferences): void {
    const checker = program.getTypeChecker();
    const usage = getUsageInfo(oldFile, toMove.all, checker);
    //creating a new file
    if (!host.fileExists(newFile) || host.fileExists(newFile) && program.getSourceFile(newFile)?.statements.length === 0) {
        changes.createNewFile(oldFile, newFile, getNewStatementsAndRemoveFromOldFile(oldFile, newFile, usage, changes, toMove, program, host, newFile, preferences, /*newFileExists*/ false));
        addNewFileToTsconfig(program, changes, oldFile.fileName, newFile, hostGetCanonicalFileName(host));
    }
    else {
        const sourceFile = program.getSourceFile(newFile);
        if (sourceFile) {
            const importAdder = codefix.createImportAdder(sourceFile, context.program, context.preferences, context.host);
            getNewStatementsAndRemoveFromOldFile(oldFile, newFile, usage, changes, toMove, program, host, newFile, preferences, /*newFileExists*/ true, importAdder);
        }
    }
}

function getNewStatementsAndRemoveFromOldFile(
    oldFile: SourceFile, newFile: string, usage: UsageInfo, changes: textChanges.ChangeTracker, toMove: ToMove, program: Program, host: LanguageServiceHost, newFilename: string, preferences: UserPreferences, newFileExists: boolean, importAdder?: codefix.ImportAdder
) {
    const checker = program.getTypeChecker();
    const prologueDirectives = takeWhile(oldFile.statements, isPrologueDirective);
    if (oldFile.externalModuleIndicator === undefined && oldFile.commonJsModuleIndicator === undefined && usage.oldImportsNeededByNewFile.size === 0 && !newFileExists) {
        deleteMovedStatements(oldFile, toMove.ranges, changes);
        return [...prologueDirectives, ...toMove.all];
    }

    const useEsModuleSyntax = !!oldFile.externalModuleIndicator;
    const quotePreference = getQuotePreference(oldFile, preferences);
    const importsFromNewFile = createOldFileImportsFromNewFile(oldFile, usage.oldFileImportsFromNewFile, newFilename, program, host, useEsModuleSyntax, quotePreference);
    if (importsFromNewFile) {
        insertImports(changes, oldFile, importsFromNewFile, /*blankLineBetween*/ true, preferences);
    }

    deleteUnusedOldImports(oldFile, toMove.all, changes, usage.unusedImportsFromOldFile, checker);
    deleteMovedStatements(oldFile, toMove.ranges, changes);
    updateImportsInOtherFiles(changes, program, host, oldFile, usage.movedSymbols, newFilename, quotePreference);

    const imports = getNewFileImportsAndAddExportInOldFile(oldFile, newFile, usage.oldImportsNeededByNewFile, usage.newFileImportsFromOldFile, changes, checker, program, host, useEsModuleSyntax, quotePreference, importAdder);
    const body = addExports(oldFile, toMove.all, usage.oldFileImportsFromNewFile, useEsModuleSyntax);
    if (newFileExists) {
        const sourceFile = program.getSourceFile(newFile);
        if (sourceFile && sourceFile.statements.length > 0) {
            changes.insertNodesAfter(sourceFile, sourceFile.statements[sourceFile.statements.length - 1], body);
        }
        if (sourceFile && imports.length > 0) {
            insertImports(changes, sourceFile, imports, /*blankLineBetween*/ true, preferences);
        }
    }
    if (importAdder) {
        importAdder.writeFixes(changes);
    }
    if (imports.length && body.length) {
        return [
            ...prologueDirectives,
            ...imports,
            SyntaxKind.NewLineTrivia as const,
            ...body
        ];
    }

    return [
        ...prologueDirectives,
        ...imports,
        ...body,
    ];
}

function getNewFileImportsAndAddExportInOldFile(
    oldFile: SourceFile,
    newFile: string,
    importsToCopy: Map<Symbol, boolean>,
    newFileImportsFromOldFile: Set<Symbol>,
    changes: textChanges.ChangeTracker,
    checker: TypeChecker,
    program: Program,
    host: LanguageServiceHost,
    useEsModuleSyntax: boolean,
    quotePreference: QuotePreference,
    importAdder?: codefix.ImportAdder,
): readonly AnyImportOrRequireStatement[] {
    const copiedOldImports: AnyImportOrRequireStatement[] = [];
    if (importAdder) {
        importsToCopy.forEach((isValidTypeOnlyUseSite, symbol) => {
            importAdder.addImportFromExportedSymbol(skipAlias(symbol, checker), isValidTypeOnlyUseSite);
        });
    }
    else {
        for (const oldStatement of oldFile.statements) {
            forEachImportInStatement(oldStatement, i => {
                append(copiedOldImports, filterImport(i, moduleSpecifierFromImport(i), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
            });
        }
    }

    //Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
    const newFileSourceFile = program.getSourceFile(newFile);
    let oldFileDefault: Identifier | undefined;
    const oldFileNamedImports: string[] = [];
    const markSeenTop = nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
    newFileImportsFromOldFile.forEach(symbol => {
        if (!symbol.declarations) {
            return;
        }
        for (const decl of symbol.declarations) {
            if (!isTopLevelDeclaration(decl)) continue;
            const name = nameOfTopLevelDeclaration(decl);
            if (!name) continue;

            const top = getTopLevelDeclarationStatement(decl);
            if (markSeenTop(top)) {
                addExportToChanges(oldFile, top, name, changes, useEsModuleSyntax);
            }
            if (importAdder && symbol.parent !== undefined) {
                importAdder.addImportFromExportedSymbol(skipAlias(symbol, checker));
            }
            else {
                if (hasSyntacticModifier(decl, ModifierFlags.Default)) {
                    oldFileDefault = name;
                }
                else {
                    oldFileNamedImports.push(name.text);
                }
            }
        }
    });
    return (newFileSourceFile)
        ? append(copiedOldImports, makeImportOrRequire(newFileSourceFile, oldFileDefault, oldFileNamedImports, oldFile.fileName, program, host, useEsModuleSyntax, quotePreference))
        : append(copiedOldImports, makeImportOrRequire(oldFile, oldFileDefault, oldFileNamedImports, oldFile.fileName, program, host, useEsModuleSyntax, quotePreference));
}

