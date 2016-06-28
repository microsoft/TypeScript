/* @internal */
namespace ts {
    export interface CodeAction {
        name: string;
        errorCodes: string[];
        getTextChanges(context: CodeActionContext): FileTextChanges[];
    }

    export interface CodeActionContext {
        errorCode: string;
        sourceFile: SourceFile;
        span: TextSpan;
        checker: TypeChecker;
    }

    export namespace codeFix {
        var codeActions: Map<CodeAction[]> = {};

        export function registerCodeFix(fix: CodeAction) {
            forEach(fix.errorCodes, error => {
                let fixes = codeActions[error];
                if (!fixes) {
                    fixes = [];
                    codeActions[error] = fixes;
                }
                fixes.push(fix);
            });
        }

        export class CodeFixProvider {

            public static getSupportedErrorCodes() {
                return getKeys(codeActions);
            }

            public getFixes(context: CodeActionContext): CodeFix[] {
                const actions = codeActions[context.errorCode];
                const fixes: CodeFix[] = [];

                Debug.assert(actions && actions.length > 0, "No fixes found for error: '${errorCode}'.");

                forEach(actions, a => {
                    const textChanges = a.getTextChanges(context);
                    if (textChanges && textChanges.length > 0) {
                        fixes.push({ description: a.name, changes: textChanges });
                    }
                });

                return fixes;
            }
        }
    }
}