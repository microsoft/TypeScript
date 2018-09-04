/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////class C {
////    m() {
////        return function f() {
////            return this;
////        };
////    }
////}

verify.codeFix({
    description: "Convert function expression 'f' to arrow function",
    index: 0,
    newFileContent:
`class C {
    m() {
        return () => {
            return this;
        };
    }
}`,
});
