///<reference path='..\services.ts' />
///<reference path='superFixes.ts' />

/* @internal */
namespace ts.quickFix {

    export interface QuickFix {
        name: string;
        errorCode: string;
        getFix(sourceFile: SourceFile, start: number, end: number): TextChange[];
    }

    export class QuickFixProvider {
        // TODO: 
        //  Make the provider query the fixes for all the errorcodes they can fix
        //  and allow multiple fixes to fix the same error

        private static quickFixes: Map<QuickFix> = {
            [MissingSuperFix.errorCode]: MissingSuperFix,
            [SuperOrderFix.errorCode]: SuperOrderFix,
        };

        public static getSupportedErrorCodes() {
            return getKeys(QuickFixProvider.quickFixes);
        }

        public fix(errorCode: string, sourceFile: SourceFile, start: number, end: number) {
            const fix = QuickFixProvider.quickFixes[errorCode];

            if (!fix) {
                throw new Error(`No fix found for error: '${errorCode}'`);
            }

            return { name: fix.name, textChanges: fix.getFix(sourceFile, start, end) };
        }
    }
}