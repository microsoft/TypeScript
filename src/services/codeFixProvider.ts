/* @internal */
namespace ts.codefix {
    const errorCodeToFixes = createMultiMap<CodeFixRegistration>();
    const fixIdToRegistration = new Map<string, CodeFixRegistration>();

    export type DiagnosticAndArguments = DiagnosticMessage | [DiagnosticMessage, string] | [DiagnosticMessage, string, string];
    function diagnosticToString(diag: DiagnosticAndArguments): string {
        return isArray(diag)
            ? formatStringFromArgs(getLocaleSpecificMessage(diag[0]), diag.slice(1) as readonly string[])
            : getLocaleSpecificMessage(diag);
    }

    export function createCodeFixActionWithoutFixAll(fixName: string, changes: FileTextChanges[], description: DiagnosticAndArguments) {
        return createCodeFixActionWorker(fixName, diagnosticToString(description), changes, /*fixId*/ undefined, /*fixAllDescription*/ undefined);
    }

    export function createCodeFixAction(fixName: string, changes: FileTextChanges[], description: DiagnosticAndArguments, fixId: {}, fixAllDescription: DiagnosticAndArguments, command?: CodeActionCommand): CodeFixAction {
        return createCodeFixActionWorker(fixName, diagnosticToString(description), changes, fixId, diagnosticToString(fixAllDescription), command);
    }

    function createCodeFixActionWorker(fixName: string, description: string, changes: FileTextChanges[], fixId?: {}, fixAllDescription?: string, command?: CodeActionCommand): CodeFixAction {
        return { fixName, description, changes, fixId, fixAllDescription, commands: command ? [command] : undefined };
    }

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

    export function getSupportedErrorCodes(): string[] {
        return arrayFrom(errorCodeToFixes.keys());
    }

    function removeFixIdIfFixAllUnavailable(registration: CodeFixRegistration, diagnostics: Diagnostic[]) {
        const { errorCodes } = registration;
        let maybeFixableDiagnostics = 0;
        for (const diag of diagnostics) {
            if (contains(errorCodes, diag.code)) maybeFixableDiagnostics++;
            if (maybeFixableDiagnostics > 1) break;
        }

        const fixAllUnavailable = maybeFixableDiagnostics < 2;
        return ({ fixId, fixAllDescription, ...action }: CodeFixAction): CodeFixAction => {
            return fixAllUnavailable ? action : { ...action, fixId, fixAllDescription };
        };
    }

    export function getFixes(context: CodeFixContext): readonly CodeFixAction[] {
        const diagnostics = getDiagnostics(context);
        const registrations = errorCodeToFixes.get(String(context.errorCode));
        return flatMap(registrations, f => map(f.getCodeActions(context), removeFixIdIfFixAllUnavailable(f, diagnostics)));
    }

    export function getAllFixes(context: CodeFixAllContext): CombinedCodeActions {
        // Currently fixId is always a string.
        return fixIdToRegistration.get(cast(context.fixId, isString))!.getAllCodeActions!(context);
    }

    export function createCombinedCodeActions(changes: FileTextChanges[], commands?: CodeActionCommand[]): CombinedCodeActions {
        return { changes, commands };
    }

    export function createFileTextChanges(fileName: string, textChanges: TextChange[]): FileTextChanges {
        return { fileName, textChanges };
    }

    export function codeFixAll(
        context: CodeFixAllContext,
        errorCodes: number[],
        use: (changes: textChanges.ChangeTracker, error: DiagnosticWithLocation, commands: Push<CodeActionCommand>) => void,
    ): CombinedCodeActions {
        const commands: CodeActionCommand[] = [];
        const changes = textChanges.ChangeTracker.with(context, t => eachDiagnostic(context, errorCodes, diag => use(t, diag, commands)));
        return createCombinedCodeActions(changes, commands.length === 0 ? undefined : commands);
    }

    export function eachDiagnostic(context: CodeFixAllContext, errorCodes: readonly number[], cb: (diag: DiagnosticWithLocation) => void): void {
        for (const diag of getDiagnostics(context)) {
            if (contains(errorCodes, diag.code)) {
                cb(diag as DiagnosticWithLocation);
            }
        }
    }

    function getDiagnostics({ program, sourceFile, cancellationToken }: CodeFixContextBase) {
        return [
            ...program.getSemanticDiagnostics(sourceFile, cancellationToken),
            ...program.getSyntacticDiagnostics(sourceFile, cancellationToken),
            ...computeSuggestionDiagnostics(sourceFile, program, cancellationToken)
        ];
    }
}
