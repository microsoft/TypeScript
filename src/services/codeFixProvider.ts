/* @internal */
namespace ts {
    export interface CodeFixRegistration {
        errorCodes: number[];
        getCodeActions(context: CodeFixContext): CodeFix[] | undefined;
        groupIds: string[];
        fixAllInGroup(context: CodeFixAllContext): CodeActionAll;
    }

    export interface CodeFixContextBase extends textChanges.TextChangesContext {
        sourceFile: SourceFile;
        program: Program;
        host: LanguageServiceHost;
        cancellationToken: CancellationToken;
    }

    export interface CodeFixAllContext extends CodeFixContextBase {
        groupId: {};
    }

    export interface CodeFixContext extends CodeFixContextBase {
        errorCode: number;
        span: TextSpan;
    }

    export namespace codefix {
        const codeFixes: CodeFixRegistration[][] = [];
        const groups = createMap<CodeFixRegistration>();

        export function registerCodeFix(codeFix: CodeFixRegistration) {
            for (const error of codeFix.errorCodes) {
                let fixes = codeFixes[error];
                if (!fixes) {
                    fixes = [];
                    codeFixes[error] = fixes;
                }
                fixes.push(codeFix);
            }
            if (codeFix.groupIds) {
                for (const gid of codeFix.groupIds) {
                    Debug.assert(!groups.has(gid));
                    groups.set(gid, codeFix);
                }
            }
        }

        export function getSupportedErrorCodes() {
            return Object.keys(codeFixes);
        }

        export function getFixes(context: CodeFixContext): CodeFix[] {
            const fixes = codeFixes[context.errorCode];
            const allActions: CodeFix[] = [];

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

        export function getAllFixes(context: CodeFixAllContext): CodeActionAll {
            // Currently groupId is always a string.
            return groups.get(cast(context.groupId, isString)).fixAllInGroup!(context);
        }

        function createCodeActionAll(changes: FileTextChanges[], commands?: CodeActionCommand[]): CodeActionAll {
            return { changes, commands };
        }

        export function createFileTextChanges(fileName: string, textChanges: TextChange[]): FileTextChanges {
            return { fileName, textChanges };
        }

        export function codeFixAll(context: CodeFixAllContext, errorCodes: number[], use: (changes: textChanges.ChangeTracker, error: Diagnostic, commands: Push<CodeActionCommand>) => void): CodeActionAll {
            const commands: CodeActionCommand[] = [];
            const changes = textChanges.ChangeTracker.with(context, t =>
                eachDiagnostic(context, errorCodes, diag => use(t, diag, commands)));
            return createCodeActionAll(changes, commands.length === 0 ? undefined : commands);
        }

        export function codeFixAllWithTextChanges(context: CodeFixAllContext, errorCodes: number[], use: (changes: Push<TextChange>, error: Diagnostic) => void): CodeActionAll {
            const changes: TextChange[] = [];
            eachDiagnostic(context, errorCodes, diag => use(changes, diag));
            changes.sort((a, b) => b.span.start - a.span.start);
            return createCodeActionAll([createFileTextChanges(context.sourceFile.fileName, changes)]);
        }

        function eachDiagnostic({ program, sourceFile }: CodeFixAllContext, errorCodes: number[], cb: (diag: Diagnostic) => void): void {
            for (const diag of program.getSemanticDiagnostics(sourceFile)) {
                if (contains(errorCodes, diag.code)) {
                    cb(diag);
                }
            }
        }
    }
}
