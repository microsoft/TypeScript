/* @internal */
namespace ts {
    export interface CodeAction {
        name: string;
        errorCodes: string[];
        getFix(sourceFile: SourceFile, start: number, end: number): TextChange[];
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

            public getFixes(errorCode: string, sourceFile: SourceFile, start: number, end: number): CodeFix {
                const fix = codeActions[errorCode];

                if (!fix || fix.length == 0) {
                    throw new Error("No fixes found for error: '${errorCode}'.");
                }

                return { name: fix[0].name, textChanges: fix[0].getFix(sourceFile, start, end) };
            }
        }
    }
}