import { createMultiMap, CodeFixRegistration, createMap, DiagnosticMessage, isArray, formatStringFromArgs, getLocaleSpecificMessage, FileTextChanges, CodeActionCommand, CodeFixAction, Debug, arrayFrom, Diagnostic, contains, CodeFixContext, flatMap, map, CodeFixAllContext, CombinedCodeActions, cast, isString, TextChange, DiagnosticWithLocation, Push, CodeFixContextBase, computeSuggestionDiagnostics } from "./ts";
import { ChangeTracker } from "./ts.textChanges";
/* @internal */
const errorCodeToFixes = createMultiMap<CodeFixRegistration>();
/* @internal */
const fixIdToRegistration = createMap<CodeFixRegistration>();
/* @internal */
export type DiagnosticAndArguments = DiagnosticMessage | [DiagnosticMessage, string] | [DiagnosticMessage, string, string];
/* @internal */
function diagnosticToString(diag: DiagnosticAndArguments): string {
    return isArray(diag)
        ? formatStringFromArgs(getLocaleSpecificMessage(diag[0]), (diag.slice(1) as readonly string[]))
        : getLocaleSpecificMessage(diag);
}
/* @internal */
export function createCodeFixActionWithoutFixAll(fixName: string, changes: FileTextChanges[], description: DiagnosticAndArguments) {
    return createCodeFixActionWorker(fixName, diagnosticToString(description), changes, /*fixId*/ undefined, /*fixAllDescription*/ undefined);
}
/* @internal */
export function createCodeFixAction(fixName: string, changes: FileTextChanges[], description: DiagnosticAndArguments, fixId: {}, fixAllDescription: DiagnosticAndArguments, command?: CodeActionCommand): CodeFixAction {
    return createCodeFixActionWorker(fixName, diagnosticToString(description), changes, fixId, diagnosticToString(fixAllDescription), command);
}
/* @internal */
function createCodeFixActionWorker(fixName: string, description: string, changes: FileTextChanges[], fixId?: {}, fixAllDescription?: string, command?: CodeActionCommand): CodeFixAction {
    return { fixName, description, changes, fixId, fixAllDescription, commands: command ? [command] : undefined };
}
/* @internal */
export function registerCodeFix(reg: CodeFixRegistration) {
    for (const error of reg.errorCodes) {
        errorCodeToFixes.add(String(error), reg);
    }
    if (reg.fixIds) {
        for (const fixId of reg.fixIds) {
            Debug.assert(!fixIdToRegistration.has(fixId));
            fixIdToRegistration.set(fixId, reg);
        }
    }
}
/* @internal */
export function getSupportedErrorCodes(): string[] {
    return arrayFrom(errorCodeToFixes.keys());
}
/* @internal */
function removeFixIdIfFixAllUnavailable(registration: CodeFixRegistration, diagnostics: Diagnostic[]) {
    const { errorCodes } = registration;
    let maybeFixableDiagnostics = 0;
    for (const diag of diagnostics) {
        if (contains(errorCodes, diag.code))
            maybeFixableDiagnostics++;
        if (maybeFixableDiagnostics > 1)
            break;
    }
    const fixAllUnavailable = maybeFixableDiagnostics < 2;
    return ({ fixId, fixAllDescription, ...action }: CodeFixAction): CodeFixAction => {
        return fixAllUnavailable ? action : { ...action, fixId, fixAllDescription };
    };
}
/* @internal */
export function getFixes(context: CodeFixContext): readonly CodeFixAction[] {
    const diagnostics = getDiagnostics(context);
    const registrations = errorCodeToFixes.get(String(context.errorCode));
    return flatMap(registrations, f => map(f.getCodeActions(context), removeFixIdIfFixAllUnavailable(f, diagnostics)));
}
/* @internal */
export function getAllFixes(context: CodeFixAllContext): CombinedCodeActions {
    // Currently fixId is always a string.
    return fixIdToRegistration.get(cast(context.fixId, isString))!.getAllCodeActions!(context);
}
/* @internal */
export function createCombinedCodeActions(changes: FileTextChanges[], commands?: CodeActionCommand[]): CombinedCodeActions {
    return { changes, commands };
}
/* @internal */
export function createFileTextChanges(fileName: string, textChanges: TextChange[]): FileTextChanges {
    return { fileName, textChanges };
}
/* @internal */
export function codeFixAll(context: CodeFixAllContext, errorCodes: number[], use: (changes: ChangeTracker, error: DiagnosticWithLocation, commands: Push<CodeActionCommand>) => void): CombinedCodeActions {
    const commands: CodeActionCommand[] = [];
    const changes = ChangeTracker.with(context, t => eachDiagnostic(context, errorCodes, diag => use(t, diag, commands)));
    return createCombinedCodeActions(changes, commands.length === 0 ? undefined : commands);
}
/* @internal */
export function eachDiagnostic(context: CodeFixAllContext, errorCodes: readonly number[], cb: (diag: DiagnosticWithLocation) => void): void {
    for (const diag of getDiagnostics(context)) {
        if (contains(errorCodes, diag.code)) {
            cb((diag as DiagnosticWithLocation));
        }
    }
}
/* @internal */
function getDiagnostics({ program, sourceFile, cancellationToken }: CodeFixContextBase) {
    return program.getSemanticDiagnostics(sourceFile, cancellationToken).concat(computeSuggestionDiagnostics(sourceFile, program, cancellationToken));
}
