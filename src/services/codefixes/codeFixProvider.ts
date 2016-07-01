/* @internal */
namespace ts {
    export interface CodeFix {
        name: string;
        errorCodes: string[];
        getCodeActions(context: CodeFixContext): CodeAction[];
    }

    export interface CodeFixContext {
        errorCode: string;
        sourceFile: SourceFile;
        span: TextSpan;
        checker: TypeChecker;
    }

    export namespace codeFix {
        const codeFixes: Map<CodeFix[]> = {};

        export function registerCodeFix(action: CodeFix) {
            forEach(action.errorCodes, error => {
                let fixes = codeFixes[error];
                if (!fixes) {
                    fixes = [];
                    codeFixes[error] = fixes;
                }
                fixes.push(action);
            });
        }

        export class CodeFixProvider {
            public static getSupportedErrorCodes() {
                return getKeys(codeFixes);
            }

            public getFixes(context: CodeFixContext): CodeAction[] {
                const fixes = codeFixes[context.errorCode];
                let allActions: CodeAction[] = [];

                Debug.assert(fixes && fixes.length > 0, "No fixes found for error: '${errorCode}'.");

                forEach(fixes, f => {
                    const actions = f.getCodeActions(context);
                    if (actions && actions.length > 0) {
                        allActions = allActions.concat(actions);
                    }
                });

                return allActions;
            }
        }
    }
}