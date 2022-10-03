/// <reference path="fourslash.ts" />
////async function fn(a: Promise<{ x: string }>) {
////  a.x;
////}

verify.codeFix({
  description: ts.Diagnostics.Add_await.message,
  index: 0,
  newFileContent:
`async function fn(a: Promise<{ x: string }>) {
  (await a).x;
}`
});
