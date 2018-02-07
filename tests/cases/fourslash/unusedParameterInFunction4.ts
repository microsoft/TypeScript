/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////[|function greeter(x,y,z) |] {
////    use(x, z);
////}

verify.codeFix({
    description: "Remove declaration for: 'y'",
    index: 0,
    newRangeContent: "function greeter(x,z) ",
});
