/// <reference path='fourslash.ts' />

//// // https://github.com/microsoft/TypeScript/issues/56474
//// function test<First extends S/*1*/, Second>(a: First, b: Second) {}
//// type A1<K extends /*2*/, L> = K

verify.completions({
  marker: ["1"],
  includes: ["Second"],
  excludes: ["First"],
});

verify.completions({
  marker: ["2"],
  includes: ["L"],
  excludes: ["K"],
});
