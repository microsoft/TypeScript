/// <reference path="fourslash.ts" />

////function topLevel() {}
////if (!!true) {
////  const blockScoped = 0;
////  export { /**/ };
////}

verify.completions({
  marker: "",
  exact: ["topLevel"]
});
