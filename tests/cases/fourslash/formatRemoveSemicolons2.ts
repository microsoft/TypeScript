/// <reference path="fourslash.ts" />

////namespace ts {
////    let x = 0;
////    interface I {
////        a: string;
////        /** @internal */
////        b: string;
////    }
////}

format.setFormatOptions({ ...format.copyFormatOptions(), insertTrailingSemicolon: false });
format.document();
verify.currentFileContentIs(`namespace ts {
    let x = 0
    interface I {
        a: string
        /** @internal */
        b: string
    }
}`);
