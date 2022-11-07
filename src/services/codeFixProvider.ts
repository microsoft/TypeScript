/* @internal */
namespace ts.codefix {
const errorCodeToFixes = ts.createMultiMap<ts.CodeFixRegistration>();
const fixIdToRegistration = new ts.Map<string, ts.CodeFixRegistration>();

export function createCodeFixActionWithoutFixAll(fixName: string, changes: ts.FileTextChanges[], description: ts.DiagnosticAndArguments) {
    return createCodeFixActionWorker(fixName, ts.diagnosticToString(description), changes, /*fixId*/ undefined, /*fixAllDescription*/ undefined);
}

export function createCodeFixAction(fixName: string, changes: ts.FileTextChanges[], description: ts.DiagnosticAndArguments, fixId: {}, fixAllDescription: ts.DiagnosticAndArguments, command?: ts.CodeActionCommand): ts.CodeFixAction {
    return createCodeFixActionWorker(fixName, ts.diagnosticToString(description), changes, fixId, ts.diagnosticToString(fixAllDescription), command);
}

export function createCodeFixActionMaybeFixAll(fixName: string, changes: ts.FileTextChanges[], description: ts.DiagnosticAndArguments, fixId?: {}, fixAllDescription?: ts.DiagnosticAndArguments, command?: ts.CodeActionCommand) {
    return createCodeFixActionWorker(fixName, ts.diagnosticToString(description), changes, fixId, fixAllDescription && ts.diagnosticToString(fixAllDescription), command);
}

function createCodeFixActionWorker(fixName: string, description: string, changes: ts.FileTextChanges[], fixId?: {}, fixAllDescription?: string, command?: ts.CodeActionCommand): ts.CodeFixAction {
    return { fixName, description, changes, fixId, fixAllDescription, commands: command ? [command] : undefined };
}

export function registerCodeFix(reg: ts.CodeFixRegistration) {
    for (const error of reg.errorCodes) {
        errorCodeToFixes.add(String(error), reg);
    }
    if (reg.fixIds) {
        for (const fixId of reg.fixIds) {
            ts.Debug.assert(!fixIdToRegistration.has(fixId));
            fixIdToRegistration.set(fixId, reg);
        }
    }
}

export function getSupportedErrorCodes(): string[] {
    return ts.arrayFrom(errorCodeToFixes.keys());
}

function removeFixIdIfFixAllUnavailable(registration: ts.CodeFixRegistration, diagnostics: ts.Diagnostic[]) {
    const { errorCodes } = registration;
    let maybeFixableDiagnostics = 0;
    for (const diag of diagnostics) {
        if (ts.contains(errorCodes, diag.code)) maybeFixableDiagnostics++;
        if (maybeFixableDiagnostics > 1) break;
    }

    const fixAllUnavailable = maybeFixableDiagnostics < 2;
    return ({ fixId, fixAllDescription, ...action }: ts.CodeFixAction): ts.CodeFixAction => {
        return fixAllUnavailable ? action : { ...action, fixId, fixAllDescription };
    };
}

export function getFixes(context: ts.CodeFixContext): readonly ts.CodeFixAction[] {
    const diagnostics = getDiagnostics(context);
    const registrations = errorCodeToFixes.get(String(context.errorCode));
    return ts.flatMap(registrations, f => ts.map(f.getCodeActions(context), removeFixIdIfFixAllUnavailable(f, diagnostics)));
}

export function getAllFixes(context: ts.CodeFixAllContext): ts.CombinedCodeActions {
    // Currently fixId is always a string.
    return fixIdToRegistration.get(ts.cast(context.fixId, ts.isString))!.getAllCodeActions!(context);
}

export function createCombinedCodeActions(changes: ts.FileTextChanges[], commands?: ts.CodeActionCommand[]): ts.CombinedCodeActions {
    return { changes, commands };
}

export function createFileTextChanges(fileName: string, textChanges: ts.TextChange[]): ts.FileTextChanges {
    return { fileName, textChanges };
}

export function codeFixAll(
    context: ts.CodeFixAllContext,
    errorCodes: number[],
    use: (changes: ts.textChanges.ChangeTracker, error: ts.DiagnosticWithLocation, commands: ts.Push<ts.CodeActionCommand>) => void,
): ts.CombinedCodeActions {
    const commands: ts.CodeActionCommand[] = [];
    const changes = ts.textChanges.ChangeTracker.with(context, t => eachDiagnostic(context, errorCodes, diag => use(t, diag, commands)));
    return createCombinedCodeActions(changes, commands.length === 0 ? undefined : commands);
}

export function eachDiagnostic(context: ts.CodeFixAllContext, errorCodes: readonly number[], cb: (diag: ts.DiagnosticWithLocation) => void): void {
    for (const diag of getDiagnostics(context)) {
        if (ts.contains(errorCodes, diag.code)) {
            cb(diag as ts.DiagnosticWithLocation);
        }
    }
}

function getDiagnostics({ program, sourceFile, cancellationToken }: ts.CodeFixContextBase) {
    return [
        ...program.getSemanticDiagnostics(sourceFile, cancellationToken),
        ...program.getSyntacticDiagnostics(sourceFile, cancellationToken),
        ...ts.computeSuggestionDiagnostics(sourceFile, program, cancellationToken)
    ];
}
}
