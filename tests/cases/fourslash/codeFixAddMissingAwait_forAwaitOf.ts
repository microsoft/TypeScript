/// <reference path="fourslash.ts" />
// @lib: es2020
// @target: es2020
////async function* g() {}
////async function fn() {
////    for (const { } of g()) { }
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function* g() {}
async function fn() {
    for await (const { } of g()) { }
}`
});
