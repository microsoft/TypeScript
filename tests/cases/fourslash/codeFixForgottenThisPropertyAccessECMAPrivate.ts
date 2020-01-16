/// <reference path="fourslash.ts" />

////class K {
////    #value: number;
////
////    foo() {
////        #value/**/;
////    }
////}

verify.codeFix({
  index: 0,
  description: "Add 'this.' to unresolved variable",
  newFileContent:
`class K {
    #value: number;

    foo() {
        this.#value;
    }
}`
});
