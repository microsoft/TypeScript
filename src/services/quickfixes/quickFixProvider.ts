/* @internal */
namespace ts {
    export interface QuickFix {
        name: string;
        errorCodes: string[];
        getFix(sourceFile: SourceFile, start: number, end: number): TextChange[];
    }

    export namespace quickFix {
        export const enum FixPriority {
            AboveNormal,
            Normal,
            BelowNormal,
        }

        var quickFixes: Map<QuickFix[]> = {};

        export function registerQuickFix(fix: QuickFix) {
            fix.errorCodes.forEach(error => {
                let fixes = quickFixes[error];
                if (!fixes) {
                    fixes = [];
                    quickFixes[error] = fixes;
                }
                fixes.push(fix);
            });
        }

        export class QuickFixProvider {

            public static getSupportedErrorCodes() {
                return getKeys(quickFixes);
            }

            public getFixes(errorCode: string, sourceFile: SourceFile, start: number, end: number): SuggestedFix {
                const fix = quickFixes[errorCode];

                if (!fix || fix.length == 0) {
                    throw new Error(`No fixes found for error: '${errorCode}'.`);
                }

                return { name: fix[0].name, textChanges: fix[0].getFix(sourceFile, start, end) };
            }
        }
    }
}