/// <reference path='fourslash.ts' />

////interface I {
////    a: {
////        x: number;
////        y: { z: string; };
////    }
////}
////[|const foo = {} satisfies I;|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo = {
    a: {
        x: 0,
        y: {
            z: ""
        }
    }
} satisfies I;`
});
