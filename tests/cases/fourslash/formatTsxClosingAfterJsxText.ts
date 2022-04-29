/// <reference path="fourslash.ts"/>
// @Filename: foo.tsx
////
////const a = (
////    <div>
////        text
////               </div>
////)
////const b = (
////    <div>
////        text
////      twice
////               </div>
////)
////


format.document();
verify.currentFileContentIs(`
const a = (
    <div>
        text
    </div>
)
const b = (
    <div>
        text
        twice
    </div>
)
`);
