/* @internal */
namespace ts {
    export interface QuickFix {
        name: string;
        errorCodes: string[];
        getFix(sourceFile: SourceFile, start: number, end: number): TextChange[];
    }

    export interface SuggestedFix {
        name: string;
        textChanges: TextChange[];
    }

    export namespace quickFix {
        export const enum FixPriority {
            AboveNormal,
            Normal,
            BelowNormal,
        }

        var quickFixes: Map<QuickFix> = {};

        export function registerQuickFix(fix: QuickFix) {
            fix.errorCodes.forEach(error => quickFixes[error] = fix);
        }

        export class QuickFixProvider {

            public static getSupportedErrorCodes() {
                return getKeys(quickFixes);
            }

            public fix(errorCode: string, sourceFile: SourceFile, start: number, end: number): SuggestedFix {
                const fix = quickFixes[errorCode];

                if (!fix) {
                    throw new Error(`No fix found for error: '${errorCode}'.`);
                }

                return { name: fix.name, textChanges: fix.getFix(sourceFile, start, end) };
            }
        }
    }
}