import {
    ApplicableRefactorInfo,
    codefix,
    Debug,
    Diagnostics,
    emptyArray,
    fileShouldUseJavaScriptRequire,
    getLineAndCharacterOfPosition,
    getLocaleSpecificMessage,
    getQuotePreference,
    hostGetCanonicalFileName,
    isPrologueDirective,
    LanguageServiceHost,
    last,
    Program,
    RefactorContext,
    RefactorEditInfo,
    SourceFile,
    SyntaxKind,
    takeWhile,
    textChanges,
    UserPreferences,
} from "../_namespaces/ts";
import {
    addExports,
    addNewFileToTsconfig,
    createNewFileName,
    deleteMovedStatements,
    deleteUnusedOldImports,
    getStatementsToMove,
    getTargetFileImportsAndAddExportInOldFile,
    getUsageInfo,
    makeImportOrRequire,
    registerRefactor,
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
            const file = context.file;
            const affectedTextRange = {
                start: { line: getLineAndCharacterOfPosition(file, statements.all[0].getStart(file)).line, offset: getLineAndCharacterOfPosition(file, statements.all[0].getStart(file)).character },
                end: { line: getLineAndCharacterOfPosition(file, last(statements.all).end).line, offset: getLineAndCharacterOfPosition(file, last(statements.all).end).character },
            };
            return [{ name: refactorName, description, actions: [{ ...moveToNewFileAction, range: affectedTextRange }] }];
        }
        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{ name: refactorName, description, actions: [{ ...moveToNewFileAction, notApplicableReason: getLocaleSpecificMessage(Diagnostics.Selection_is_not_a_valid_statement_or_statements) }] }];
        }
        return emptyArray;
    },
    getEditsForAction: function getRefactorEditsToMoveToNewFile(context, actionName): RefactorEditInfo {
        Debug.assert(actionName === refactorName, "Wrong refactor invoked");
        const statements = Debug.checkDefined(getStatementsToMove(context));
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context, context.file, context.program, statements, t, context.host, context.preferences));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    },
});

function doChange(context: RefactorContext, oldFile: SourceFile, program: Program, toMove: ToMove, changes: textChanges.ChangeTracker, host: LanguageServiceHost, preferences: UserPreferences): void {
    const checker = program.getTypeChecker();
    const usage = getUsageInfo(oldFile, toMove.all, checker);
    const newFilename = createNewFileName(oldFile, program, host, toMove);
    const importAdderForOldFile = codefix.createImportAdder(oldFile, context.program, context.preferences, context.host);
    // If previous file was global, this is easy.
    changes.createNewFile(oldFile, newFilename, getNewStatementsAndRemoveFromOldFile(oldFile, usage, changes, toMove, program, host, newFilename, preferences, importAdderForOldFile));

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
    importAdderForOldFile?: codefix.ImportAdder,
) {
    const checker = program.getTypeChecker();
    const prologueDirectives = takeWhile(oldFile.statements, isPrologueDirective);
    if (oldFile.externalModuleIndicator === undefined && oldFile.commonJsModuleIndicator === undefined && usage.oldImportsNeededByTargetFile.size === 0) {
        deleteMovedStatements(oldFile, toMove.ranges, changes);
        return [...prologueDirectives, ...toMove.all];
    }

    const useEsModuleSyntax = !fileShouldUseJavaScriptRequire(newFilename, program, host, !!oldFile.commonJsModuleIndicator);
    const quotePreference = getQuotePreference(oldFile, preferences);
    makeImportOrRequire(oldFile, /*defaultImport*/ undefined, /*imports*/ [], newFilename, program, host, useEsModuleSyntax, quotePreference, Array.from(usage.oldFileImportsFromTargetFile), importAdderForOldFile, oldFile);
    if (importAdderForOldFile) {
        importAdderForOldFile.writeFixes(changes, quotePreference);
    }

    deleteUnusedOldImports(oldFile, toMove.all, changes, usage.unusedImportsFromOldFile, checker);
    deleteMovedStatements(oldFile, toMove.ranges, changes);
    updateImportsInOtherFiles(changes, program, host, oldFile, usage.movedSymbols, newFilename, quotePreference);

    const imports = getTargetFileImportsAndAddExportInOldFile(oldFile, newFilename, usage.oldImportsNeededByTargetFile, usage.targetFileImportsFromOldFile, changes, checker, program, host, useEsModuleSyntax, quotePreference);
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
