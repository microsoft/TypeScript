import {
    append,
    ApplicableRefactorInfo,
    Debug,
    Diagnostics,
    emptyArray,
    fileShouldUseJavaScriptRequire,
    getBaseFileName,
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
    RefactorEditInfo,
    SourceFile,
    Symbol,
    SyntaxKind,
    takeWhile,
    textChanges,
    TypeChecker,
    UserPreferences,
} from "../_namespaces/ts";
import {
    addExports,
    addExportToChanges,
    addNewFileToTsconfig,
    createNewFileName,
    createOldFileImportsFromTargetFile,
    deleteMovedStatements,
    deleteUnusedOldImports,
    filterImport,
    forEachImportInStatement,
    getStatementsToMove,
    getTopLevelDeclarationStatement,
    getUsageInfo,
    isTopLevelDeclaration,
    makeImportOrRequire,
    moduleSpecifierFromImport,
    nameOfTopLevelDeclaration,
    registerRefactor,
    SupportedImportStatement,
    ToMove,
    updateImportsInOtherFiles,
    UsageInfo,
} from "../_namespaces/ts.refactor";

const refactorName = "Move to a new file";
const description = getLocaleSpecificMessage(Diagnostics.Move_to_a_new_file);

const moveToNewFileAction = {
    name: refactorName,
    description,
    kind: "refactor.move.newFile",
};
registerRefactor(refactorName, {
    kinds: [moveToNewFileAction.kind],
    getAvailableActions: function getRefactorActionsToMoveToNewFile(context): readonly ApplicableRefactorInfo[] {
        const statements = getStatementsToMove(context);
        if (context.preferences.allowTextChangesInNewFiles && statements) {
            return [{ name: refactorName, description, actions: [moveToNewFileAction] }];
        }
        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{ name: refactorName, description, actions: [{ ...moveToNewFileAction, notApplicableReason: getLocaleSpecificMessage(Diagnostics.Selection_is_not_a_valid_statement_or_statements) }] }];
        }
        return emptyArray;
    },
    getEditsForAction: function getRefactorEditsToMoveToNewFile(context, actionName): RefactorEditInfo {
        Debug.assert(actionName === refactorName, "Wrong refactor invoked");
        const statements = Debug.checkDefined(getStatementsToMove(context));
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, statements, t, context.host, context.preferences));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    },
});

function doChange(oldFile: SourceFile, program: Program, toMove: ToMove, changes: textChanges.ChangeTracker, host: LanguageServiceHost, preferences: UserPreferences): void {
    const checker = program.getTypeChecker();
    const usage = getUsageInfo(oldFile, toMove.all, checker);
    const newFilename = createNewFileName(oldFile, program, host, toMove);

    // If previous file was global, this is easy.
    changes.createNewFile(oldFile, newFilename, getNewStatementsAndRemoveFromOldFile(oldFile, usage, changes, toMove, program, host, newFilename, preferences));

    addNewFileToTsconfig(program, changes, oldFile.fileName, newFilename, hostGetCanonicalFileName(host));
}

function getNewStatementsAndRemoveFromOldFile(
    oldFile: SourceFile,
    usage: UsageInfo,
    changes: textChanges.ChangeTracker,
    toMove: ToMove,
    program: Program,
    host: LanguageServiceHost,
    newFilename: string,
    preferences: UserPreferences,
) {
    const checker = program.getTypeChecker();
    const prologueDirectives = takeWhile(oldFile.statements, isPrologueDirective);
    if (oldFile.externalModuleIndicator === undefined && oldFile.commonJsModuleIndicator === undefined && usage.oldImportsNeededByTargetFile.size === 0) {
        deleteMovedStatements(oldFile, toMove.ranges, changes);
        return [...prologueDirectives, ...toMove.all];
    }

    const useEsModuleSyntax = !fileShouldUseJavaScriptRequire(newFilename, program, host, !!oldFile.commonJsModuleIndicator);
    const quotePreference = getQuotePreference(oldFile, preferences);
    const importsFromNewFile = createOldFileImportsFromTargetFile(oldFile, usage.oldFileImportsFromTargetFile, newFilename, program, host, useEsModuleSyntax, quotePreference);
    if (importsFromNewFile) {
        insertImports(changes, oldFile, importsFromNewFile, /*blankLineBetween*/ true, preferences);
    }

    deleteUnusedOldImports(oldFile, toMove.all, changes, usage.unusedImportsFromOldFile, checker);
    deleteMovedStatements(oldFile, toMove.ranges, changes);
    updateImportsInOtherFiles(changes, program, host, oldFile, usage.movedSymbols, newFilename, quotePreference);

    const imports = getNewFileImportsAndAddExportInOldFile(oldFile, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, changes, checker, program, host, useEsModuleSyntax, quotePreference);
    const body = addExports(oldFile, toMove.all, usage.oldFileImportsFromTargetFile, useEsModuleSyntax);
    if (imports.length && body.length) {
        return [
            ...prologueDirectives,
            ...imports,
            SyntaxKind.NewLineTrivia as const,
            ...body,
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
    importsToCopy: Map<Symbol, boolean>,
    newFileImportsFromOldFile: Set<Symbol>,
    changes: textChanges.ChangeTracker,
    checker: TypeChecker,
    program: Program,
    host: LanguageServiceHost,
    useEsModuleSyntax: boolean,
    quotePreference: QuotePreference,
): readonly SupportedImportStatement[] {
    const copiedOldImports: SupportedImportStatement[] = [];
    for (const oldStatement of oldFile.statements) {
        forEachImportInStatement(oldStatement, i => {
            append(copiedOldImports, filterImport(i, moduleSpecifierFromImport(i), name => importsToCopy.has(checker.getSymbolAtLocation(name)!)));
        });
    }

    // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
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
            if (hasSyntacticModifier(decl, ModifierFlags.Default)) {
                oldFileDefault = name;
            }
            else {
                oldFileNamedImports.push(name.text);
            }
        }
    });

    append(copiedOldImports, makeImportOrRequire(oldFile, oldFileDefault, oldFileNamedImports, getBaseFileName(oldFile.fileName), program, host, useEsModuleSyntax, quotePreference));
    return copiedOldImports;
}
