/* @internal */
namespace ts {

    export interface QuickFix {
        name: string;
        errorCode: string;
        getFix(sourceFile: SourceFile, start: number, end: number, program?: Program): TextChange[];
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

        export function registerQuickFix(fix: QuickFix){
            quickFixes[fix.errorCode] = fix;
        }

        export class QuickFixProvider {
            // TODO: 
            //  Make the provider query the fixes for all the errorcodes they can fix
            //  and allow multiple fixes to fix the same error

            public static getSupportedErrorCodes() {

                return getKeys(quickFixes);
            }

            public fix(errorCode: string, sourceFile: SourceFile, start: number, end: number, program: Program): SuggestedFix{
                const fix = quickFixes[errorCode];

                if (!fix) {
                    throw new Error(`No fix found for error: '${errorCode}'`);
                }

                return { name: fix.name, textChanges: fix.getFix(sourceFile, start, end, program) };
            }
        }
    }
}