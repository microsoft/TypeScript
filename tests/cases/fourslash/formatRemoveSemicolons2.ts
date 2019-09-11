/// <reference path="fourslash.ts" />

////interface I {
////    a: string;
////    /** @internal */
////    b: string;
////}

format.setFormatOptions({ ...format.copyFormatOptions(), insertTrailingSemicolon: false });
format.document();
verify.currentFileContentIs(`interface I {
    a: string
    /** @internal */
    b: string
}`);
