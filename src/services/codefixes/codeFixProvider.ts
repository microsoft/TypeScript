/* @internal */
namespace ts {
    export interface CodeAction {
        name: string;
        errorCodes: string[];
        getTextChanges(sourceFile: SourceFile, start: number, end: number): TextChange[];
    }

    export namespace codeFix {
        var codeActions: Map<CodeAction[]> = {};

        export function registerCodeFix(fix: CodeAction) {
            fix.errorCodes.forEach(error => {
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

                if (!actions || actions.length == 0) {
                    throw new Error("No fixes found for error: '${errorCode}'.");
                }

                actions.forEach(a => {
                    const textChanges = a.getTextChanges(sourceFile, start, end);
                    if (textChanges && textChanges.length > 0) {
                        fixes.push({ name: a.name, textChanges: textChanges });
                    }
                });

                return fixes;
            }
        }
    }
}