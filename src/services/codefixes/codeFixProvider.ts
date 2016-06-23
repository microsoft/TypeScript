/* @internal */
namespace ts {
    export interface CodeAction {
        name: string;
        errorCodes: string[];
        getTextChanges(sourceFile: SourceFile, start: number, end: number): FileTextChanges[];
    }

    export namespace codeFix {
        var codeActions: Map<CodeAction[]> = {};

        export function registerCodeFix(fix: CodeAction) {
            forEach( fix.errorCodes, error => {
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

            public getFixes(errorCode: string, sourceFile: SourceFile, start: number, end: number): CodeFix[] {
                const actions = codeActions[errorCode];
                const fixes: CodeFix[] = [];

                Debug.assert(actions && actions.length > 0, "No fixes found for error: '${errorCode}'.");

                forEach(actions, a => {
                    const textChanges = a.getTextChanges(sourceFile, start, end);
                    if (textChanges && textChanges.length > 0) {
                        fixes.push({ description: a.name, changes: textChanges });
                    }
                });

                return fixes;
            }
        }
    }
}