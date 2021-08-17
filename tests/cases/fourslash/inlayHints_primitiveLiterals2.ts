/// <reference path="fourslash.ts" />

////function foo(
////    a: number[],
////    b: { x: number; y: number; },
////    c: () => void,
////    d: () => void,
////    e: RegExp,
////    f: string,
////    g: string
////) {}
////
////foo(
////    /*a*/[1],
////    /*b*/{ x: 1, y: 1 },
////    /*c*/() => {},
////    /*d*/function () {},
////    /*e*//foo/i,
////    /*f*/``
////    /*g*/`${1} ${2} ${3}`
////);

verify.getInlayHints([], undefined, {
    includeInlayParameterNameHints: "primitiveLiterals"
});
