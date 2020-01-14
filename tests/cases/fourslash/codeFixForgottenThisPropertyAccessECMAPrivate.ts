////class K {
////    #value: number;
////    bar() { this.#value; }
////
////    foo() {
////        #value/**/;
////    }
////}

verify.codeFix({
  description: "Add 'this.' to unresolved variable",
  newFileContent:
`class K {
    #value: number;
    bar() { this.#value; }

    foo() {
        this.#value;
    }
}`
});
