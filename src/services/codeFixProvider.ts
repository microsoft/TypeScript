/* @internal */
namespace ts {
    export interface CodeFixRegistration {
        errorCodes: ReadonlyArray<number>;
        getCodeActions(context: CodeFixContext): CodeFixAction[] | undefined;
        fixIds?: ReadonlyArray<string>;
        getAllCodeActions?(context: CodeFixAllContext): CombinedCodeActions;
    }

    export interface CodeFixContextBase extends textChanges.TextChangesContext {
        sourceFile: SourceFile;
        program: Program;
        cancellationToken: CancellationToken;
        preferences: UserPreferences;
    }

    export interface CodeFixAllContext extends CodeFixContextBase {
        fixId: {};
    }

    export interface CodeFixContext extends CodeFixContextBase {
        errorCode: number;
        span: TextSpan;
    }

    export namespace codefix {
        const errorCodeToFixes = createMultiMap<CodeFixRegistration>();
        const fixIdToRegistration = createMap<CodeFixRegistration>();

        export type DiagnosticAndArguments = DiagnosticMessage | [DiagnosticMessage, string] | [DiagnosticMessage, string, string];
        function diagnosticToString(diag: DiagnosticAndArguments): string {
            return isArray(diag)
                ? formatStringFromArgs(getLocaleSpecificMessage(diag[0]), diag.slice(1) as ReadonlyArray<string>)
                : getLocaleSpecificMessage(diag);
        }

        export function createCodeFixActionNoFixId(fixName: string, changes: FileTextChanges[], description: DiagnosticAndArguments) {
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

        export function getFixes(context: CodeFixContext): ReadonlyArray<CodeFixAction> {
            return flatMap(errorCodeToFixes.get(String(context.errorCode)) || emptyArray, f => f.getCodeActions(context));
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

        export function eachDiagnostic({ program, sourceFile, cancellationToken }: CodeFixAllContext, errorCodes: ReadonlyArray<number>, cb: (diag: DiagnosticWithLocation) => void): void {
            for (const diag of program.getSemanticDiagnostics(sourceFile, cancellationToken).concat(computeSuggestionDiagnostics(sourceFile, program, cancellationToken))) {
                if (contains(errorCodes, diag.code)) {
                    cb(diag as DiagnosticWithLocation);
                }
            }
        }
    }
}
