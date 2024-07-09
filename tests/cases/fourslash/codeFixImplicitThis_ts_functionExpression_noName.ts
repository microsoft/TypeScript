/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////class C {
////    m() {
////        const f = function() {
////            this;
////        };
////    }
////}

verify.codeFix({
    description: "Convert function expression 'anonymous function' to arrow function",
    index: 0,
    newFileContent:
`class C {
    m() {
        const f = () => {
            this;
        };
    }
}`,
});
