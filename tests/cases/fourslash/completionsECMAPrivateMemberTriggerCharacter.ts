/// <reference path="fourslash.ts" />

// @target: esnext

////class K {
////  #value: number;
////
////  foo() {
////     this.#/**/
////  }
////}

verify.completions(
    { marker: "", exact: ["#value", "foo"] },
    { marker: "", exact: ["#value", "foo"], triggerCharacter: "#" },
);