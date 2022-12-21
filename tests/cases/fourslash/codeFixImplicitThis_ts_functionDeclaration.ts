/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////class C {
////    m() {
////        function f() {
////            this;
////            f(); // self-reference OK
////        }
////    }
////}

verify.codeFix({
    description: "Convert function declaration 'f' to arrow function",
    index: 0,
    newFileContent:
`class C {
    m() {
        const f = () => {
            this;
            f(); // self-reference OK
        }
    }
}`,
});
