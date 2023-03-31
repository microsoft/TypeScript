/// <reference path='fourslash.ts' />

// @FileName: /mismatchedNames.tsx
////const A = thing;
////const B = thing;
////const jsx = (
////    </*8*/A>
////    </B>
////);

verify.jsxLinkedEdit( {
    "8": undefined,
}); 