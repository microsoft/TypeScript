/* @internal */
namespace ts {
    export interface CodeFix {
        errorCodes: number[];
        getCodeActions(context: CodeFixContext): CodeAction[] | undefined;
    }

    export interface CodeFixContext extends textChanges.TextChangesContext {
        errorCode: number;
        sourceFile: SourceFile;
        span: TextSpan;
        program: Program;
        host: LanguageServiceHost;
        cancellationToken: CancellationToken;
    }

    export namespace codefix {
        const codeFixes: CodeFix[][] = [];

        export function registerCodeFix(codeFix: CodeFix) {
            forEach(codeFix.errorCodes, error => {
                let fixes = codeFixes[error];
                if (!fixes) {
                    fixes = [];
                    codeFixes[error] = fixes;
                }
                fixes.push(codeFix);
            });
        }

        export function getSupportedErrorCodes() {
            return Object.keys(codeFixes);
        }

        export function getFixes(context: CodeFixContext): CodeAction[] {
            const fixes = codeFixes[context.errorCode];
            const allActions: CodeAction[] = [];

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
    }
}
