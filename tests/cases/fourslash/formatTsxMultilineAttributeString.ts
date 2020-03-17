/// <reference path="fourslash.ts"/>

// @Filename: foo.tsx
////(
////    <input
////        value="x
////        x"
////    />
////);

format.document();
verify.currentFileContentIs(`(
    <input
        value="x
        x"
    />
);`);
