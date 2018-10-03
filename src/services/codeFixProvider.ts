/* @internal */
namespace ts {
    export interface CodeFixRegistration {
        errorCodes: number[];
        getCodeActions(context: CodeFixContext): CodeFixAction[] | undefined;
        fixIds?: string[];
        getAllCodeActions?(context: CodeFixAllContext): CombinedCodeActions;
    }

    export interface CodeFixContextBase extends textChanges.TextChangesContext {
        sourceFile: SourceFile;
        program: Program;
        cancellationToken: CancellationToken;
    }

    export interface CodeFixAllContext extends CodeFixContextBase {
        fixId: {};
    }

    export interface CodeFixContext extends CodeFixContextBase {
        errorCode: number;
        span: TextSpan;
    }

    export namespace codefix {
        const codeFixRegistrations: CodeFixRegistration[][] = [];
        const fixIdToRegistration = createMap<CodeFixRegistration>();

        export function registerCodeFix(reg: CodeFixRegistration) {
            for (const error of reg.errorCodes) {
                let registrations = codeFixRegistrations[error];
                if (!registrations) {
                    registrations = [];
                    codeFixRegistrations[error] = registrations;
                }
                registrations.push(reg);
            }
            if (reg.fixIds) {
                for (const fixId of reg.fixIds) {
                    Debug.assert(!fixIdToRegistration.has(fixId));
                    fixIdToRegistration.set(fixId, reg);
                }
            }
        }

        export function getSupportedErrorCodes() {
            return Object.keys(codeFixRegistrations);
        }

        export function getFixes(context: CodeFixContext): CodeFixAction[] {
            const fixes = codeFixRegistrations[context.errorCode];
            const allActions: CodeFixAction[] = [];

            forEach(fixes, f => {
                const actions = f.getCodeActions(context);
                if (actions && actions.length > 0) {
                    for (const action of actions) {
                        if (action === undefined) {
                            context.host.log(`Action for error code ${context.errorCode} added an invalid action entry; please log a bug`);
                        }
                        else {
                            allActions.push(action);
                        }
                    }
                }
            });

            return allActions;
        }

        export function getAllFixes(context: CodeFixAllContext): CombinedCodeActions {
            // Currently fixId is always a string.
            return fixIdToRegistration.get(cast(context.fixId, isString))!.getAllCodeActions!(context);
        }

        function createCombinedCodeActions(changes: FileTextChanges[], commands?: CodeActionCommand[]): CombinedCodeActions {
            return { changes, commands };
        }

        export function createFileTextChanges(fileName: string, textChanges: TextChange[]): FileTextChanges {
            return { fileName, textChanges };
        }

        export function codeFixAll(context: CodeFixAllContext, errorCodes: number[], use: (changes: textChanges.ChangeTracker, error: Diagnostic, commands: Push<CodeActionCommand>) => void): CombinedCodeActions {
            const commands: CodeActionCommand[] = [];
            const changes = textChanges.ChangeTracker.with(context, t =>
                eachDiagnostic(context, errorCodes, diag => use(t, diag, commands)));
            return createCombinedCodeActions(changes, commands.length === 0 ? undefined : commands);
        }

        function eachDiagnostic({ program, sourceFile }: CodeFixAllContext, errorCodes: number[], cb: (diag: Diagnostic) => void): void {
            for (const diag of program.getSemanticDiagnostics(sourceFile).concat(computeSuggestionDiagnostics(sourceFile, program))) {
                if (contains(errorCodes, diag.code)) {
                    cb(diag);
                }
            }
        }
    }
}
