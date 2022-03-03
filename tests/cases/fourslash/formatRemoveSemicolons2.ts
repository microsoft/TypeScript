/// <reference path="fourslash.ts" />

////namespace ts {
////    let x = 0;
////    //
////    interface I {
////        a: string;
////        /** @internal */
////        b: string;
////    }
////    let y = 0; //
////}
////let z = 0; //

format.setFormatOptions({ ...format.copyFormatOptions(), semicolons: ts.SemicolonPreference.Remove });
format.document();
verify.currentFileContentIs(`namespace ts {
    let x = 0
    //
    interface I {
        a: string
        /** @internal */
        b: string
    }
    let y = 0 //
}
let z = 0 //`);
