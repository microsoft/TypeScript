/// <reference path="fourslash.ts" />

// @target: esnext

////class K {
////  #value: number;
////
////  foo() {
////     this.#va/**/
////  }
////}

verify.completions({
  marker: "",
  exact: [{
    name: "#value",
    insertText: undefined
  }, {
    name: "foo"
  }]
});
